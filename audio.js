// TEQUILA — Sintetizador de Audio Andino Colombiano

class SoundEffects {
    constructor() {
        this.ctx = null;
        this.bgmAudio = new Audio('Epidemia.mp3');
        this.bgmAudio.loop = true;
        this.bgmAudio.volume = 0.015; // Volumen bajo pero audible (1.5%)
        this.isPlayingBGM = false;
        this.isBGMMuted = false;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    // ══════════════════════════════════════════════════════
    // BGM PRINCIPAL — Reproducción de archivo MP3 (Epidemia.mp3)
    // ══════════════════════════════════════════════════════
    startBGM() {
        this.init();
        if (this.isBGMMuted) return;
        
        const lvl = (typeof currentLevel !== 'undefined') ? currentLevel : 1;
        const songFile = lvl === 3 ? 'Inri.mp3' : (lvl === 2 ? 'Relámpagos.mp3' : 'Epidemia.mp3');
        
        // If BGM is already playing but it is the wrong track, stop it first
        if (this.isPlayingBGM && !this.bgmAudio.src.endsWith(songFile)) {
            this.bgmAudio.pause();
            this.isPlayingBGM = false;
        }

        if (!this.isPlayingBGM) {
            this.bgmAudio.src = songFile;
            this.bgmAudio.volume = 0.015; // Asegurar volumen bajo pero audible al cambiar canción/src
            this.isPlayingBGM = true;
            this.bgmAudio.play().catch(err => {
                console.log("Audio play blocked by browser until user interaction: ", err);
            });
        }
    }

    toggleMute() {
        this.isBGMMuted = !this.isBGMMuted;
        if (this.isBGMMuted) {
            this.bgmAudio.pause();
            this.isPlayingBGM = false;
        } else {
            if (typeof gameState !== 'undefined' && gameState === "playing") {
                this.startBGM();
            }
        }
        return this.isBGMMuted;
    }

    stopBGM() {
        this.isPlayingBGM = false;
        this.bgmAudio.pause();
        this.bgmAudio.currentTime = 0;
    }

    playAndinoStep(step, time, dur) {
        if (!this.ctx) return;

        // ── BAJO DE CUMBIA (onda triangular cálida) ──
        // Progresión: Am - F - C - G (Modal andino)
        const bassLine = [
            220.0, 0,     220.0, 0,     174.6, 0,     174.6, 0,   // Am / F
            261.6, 0,     261.6, 0,     196.0, 0,     196.0, 0,   // C / G
            220.0, 0,     220.0, 246.9, 174.6, 0,     174.6, 196.0, // Am / F variado
            261.6, 0,     293.7, 0,     329.6, 0,     392.0, 0    // subida final
        ];
        if (bassLine[step] > 0) {
            this.playWarmBass(bassLine[step], time, dur * 0.85);
        }

        // ── MELODÍA PRINCIPAL (flauta de caña / quena sintética) ──
        // Escala pentatónica menor andina
        const melody = [
            0,     440.0, 0,     523.2, 0,     493.9, 440.0, 0,
            0,     349.2, 0,     392.0, 0,     440.0, 0,     392.0,
            0,     440.0, 0,     523.2, 587.3, 0,     659.3, 587.3,
            0,     523.2, 493.9, 0,     440.0, 0,     392.0, 0
        ];
        if (melody[step] > 0) {
            this.playFlute(melody[step], time, dur * 1.1);
        }

        // ── ARPA ANDINA (punteo de arpegios) ──
        const harp = [
            261.6, 0, 329.6, 0, 392.0, 0, 329.6, 0,
            261.6, 0, 220.0, 0, 261.6, 0, 0,     0,
            261.6, 0, 329.6, 0, 392.0, 0, 523.2, 0,
            493.9, 0, 440.0, 0, 392.0, 0, 329.6, 0
        ];
        if (harp[step] > 0) {
            this.playHarp(harp[step], time, dur * 0.4);
        }

        // ── PERCUSIÓN CUMBIA / TAMBOR ──
        // Kick en tiempo 1 y 3 (patrón típico cumbia)
        if (step % 16 === 0 || step % 16 === 8) {
            this.playKick(time);
        }
        // Caja en el tiempo 2 y 4
        if (step % 8 === 4) {
            this.playSnare(time);
        }
        // Hi-hat abierto cada 2 pasos
        if (step % 2 === 1) {
            this.playHiHat(time, 0.025);
        }
        // Hi-hat acentuado antes del tiempo (síncopa cumbia!)
        if (step % 8 === 6) {
            this.playHiHat(time, 0.05);
        }

        // ── MARIMBA SINTETIZADA (acorde relleno) ──
        // Toca cada 4 pasos, en posición sincopa
        if (step % 4 === 2) {
            const chords = [
                [261.6, 329.6, 392.0],   // C maj
                [220.0, 261.6, 329.6],   // Am
                [174.6, 220.0, 261.6],   // F maj
                [196.0, 246.9, 293.7],   // G maj
            ];
            const chord = chords[Math.floor(step / 8) % 4];
            chord.forEach(note => this.playMarimba(note, time, dur * 0.6));
        }
    }

    // ── Bajo cálido (ondas triangulares, cuerpo suave) ──
    playWarmBass(freq, time, dur) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.setValueAtTime(freq * 0.998, time + 0.01); // vibrato suave

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(600, time);
        filter.Q.value = 1;

        gain.gain.setValueAtTime(0.28, time);
        gain.gain.linearRampToValueAtTime(0.01, time + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + dur);
    }

    // ── Flauta / quena (onda senoidal con vibrato) ──
    playFlute(freq, time, dur) {
        const osc = this.ctx.createOscillator();
        const vibratoOsc = this.ctx.createOscillator();
        const vibratoGain = this.ctx.createGain();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);

        // Vibrato característico de quena
        vibratoOsc.frequency.setValueAtTime(5.5, time);
        vibratoGain.gain.setValueAtTime(0, time);
        vibratoGain.gain.linearRampToValueAtTime(4, time + 0.08);

        vibratoOsc.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);

        gain.gain.setValueAtTime(0.0, time);
        gain.gain.linearRampToValueAtTime(0.13, time + 0.03); // ataque suave
        gain.gain.setValueAtTime(0.10, time + dur * 0.7);
        gain.gain.linearRampToValueAtTime(0.0, time + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        vibratoOsc.start(time);
        osc.stop(time + dur);
        vibratoOsc.stop(time + dur);
    }

    // ── Arpa (onda triangular breve con decay rápido) ──
    playHarp(freq, time, dur) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + dur);
    }

    // ── Marimba (percusión melódica: sine + decay) ──
    playMarimba(freq, time, dur) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.setValueAtTime(freq * 0.99, time + 0.01);

        gain.gain.setValueAtTime(0.07, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + dur);
    }

    // ── Kick de tambor cumbia (grave, corto) ──
    playKick(time) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(180, time);
        osc.frequency.exponentialRampToValueAtTime(45, time + 0.08);
        gain.gain.setValueAtTime(0.25, time);
        gain.gain.linearRampToValueAtTime(0.001, time + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.08);
    }

    // ── Caja / snare (ruido filtrado suave) ──
    playSnare(time) {
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.06);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1500, time);
        filter.Q.value = 1.5;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.06, time);
        gain.gain.linearRampToValueAtTime(0.001, time + 0.06);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start(time);
    }

    // ── Hi-hat (ruido agudo breve) ──
    playHiHat(time, vol) {
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.02);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.setValueAtTime(8000, time);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(vol, time);
        gain.gain.linearRampToValueAtTime(0.001, time + 0.02);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start(time);
    }

    // ── SFX: Salto ──
    playJump() {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(180, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(700, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    // ── SFX: Recolectar H2 (arpeggio pentatónico) ──
    playCollect() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = "sine";
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.1, now + i * 0.05);
            gain.gain.linearRampToValueAtTime(0.001, now + i * 0.05 + 0.08);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + i * 0.05);
            osc.stop(now + i * 0.05 + 0.08);
        });
    }

    // ── SFX: Rugido de dinosaurio ──
    playRoar() {
        this.init();
        if (!this.ctx) return;
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.4);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(500, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.4);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start();
    }

    // ── SFX: Surf ──
    playSurf() {
        this.init();
        if (!this.ctx) return;
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.3);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(300, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.15);
        filter.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.3);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start();
    }

    // ── SFX: Perforadora ──
    playDrill() {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(60, this.ctx.currentTime);
        for (let i = 0; i < 8; i++) {
            osc.frequency.setValueAtTime(80, this.ctx.currentTime + i * 0.04);
            osc.frequency.setValueAtTime(50, this.ctx.currentTime + i * 0.04 + 0.02);
        }
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.35);
    }

    // ── SFX: Geófono ──
    playGeophone() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.setValueAtTime(1760, now + 0.08);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.18);
    }

    // ── SFX: Victoria — fanfarria andina ──
    playStageClear() {
        this.stopBGM();
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        // Melodía andina ascendente
        const notes = [392, 440, 523, 659, 784, 880, 1046];
        notes.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = i % 2 === 0 ? "sine" : "triangle";
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.12, now + i * 0.12);
            gain.gain.linearRampToValueAtTime(0.01, now + i * 0.12 + 0.18);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + i * 0.12);
            osc.stop(now + i * 0.12 + 0.2);
        });
    }

    // ── SFX: Game Over — descenso dramático andino ──
    playGameOver() {
        this.stopBGM();
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        // Melodía descendente triste
        const notes = [
            [523, 0.0,  0.22],
            [440, 0.25, 0.22],
            [392, 0.5,  0.22],
            [349, 0.75, 0.22],
            [293, 1.0,  0.22],
            [261, 1.25, 0.5]
        ];
        notes.forEach(([freq, start, dur]) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(freq, now + start);
            osc.frequency.linearRampToValueAtTime(freq * 0.85, now + start + dur);
            gain.gain.setValueAtTime(0.1, now + start);
            gain.gain.linearRampToValueAtTime(0.001, now + start + dur);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + start);
            osc.stop(now + start + dur + 0.05);
        });
    }
}

const AudioSFX = new SoundEffects();

function toggleMute() {
    const muted = AudioSFX.toggleMute();
    const btn = document.getElementById("btn-mute");
    if (btn) {
        btn.innerHTML = muted ? "🔇" : "🔊";
        btn.style.borderColor = muted ? "#E74C3C" : "#2C2C2C";
    }
}
