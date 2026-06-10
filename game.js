// TEQUILA - Hydrogen Adventure Game Engine
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let currentLang = 'es';
let currentLevel = 1;

const translations = {
    es: {
        subtitle: "",
        roleHades: "Geólogo",
        roleHera: "Geóloga",
        btnPlay: "&#9658; JUGAR",
        tapPrompt: "MUÉVETE CON A/D &middot; SALTA CON ESPACIO",
        instructions: "Recoge muestras · Al terminar el nivel, ¡tómate un café! ☕",
        gameOverReasonEnergy: "Te has quedado sin energía exploradora.",
        gameOverReasonPuddle: "Te has hundido en un charco de agua profundo por no saltarlo.",
        gameOverReasonGeyser: "",
        gameOverReasonQuiz: "Has respondido de manera incorrecta a una pregunta de geología.",
        gameOverReasonLives: "Te has quedado sin vidas exploradoras.",
        btnRetry: "▶ REINTENTAR",
        victoryTitle: "¡MISIÓN<br>COMPLETADA!",
        victoryDetails: `<p style="font-weight:bold; color:#3D7A1E; text-align:center; margin:10px 0;">Tienes conocimientos en geología, pasamos al siguiente nivel.</p>`,
        btnReplay: "▶ JUGAR OTRA VEZ",
        btnNextLevel: "▶ SIGUIENTE NIVEL",
        hudLives: "VIDAS",
        hudH2: "GAS H₂",
        hudGeo: "GEÓFONOS",
        hudRocks: "MUESTRAS",
        energyLabel: "ENERGÍA: ",
        faultLabel: "FALLA",
        newRockLabel: "[NUEVA MUESTRA]",
        skateboardUnlock: "<br><br><span style='color: #E67E22; font-weight: bold;'>🛹 ¡HAS DESBLOQUEADO UN NUEVO MODO DE TRANSPORTE POR TU RESPUESTA CORRECTA!</span>",
        correctTitle: "¡CORRECTO! 🎉",
        incorrectTitle: "INCORRECTO 😢",
        btnContinue: "CONTINUAR",
        questions: [
            {
                name: "Muestra 1: Tipo de rocas",
                question: "¿Cuáles son los tres tipos principales de rocas?",
                options: [
                    "a) Ígneas, sedimentarias y metamórficas",
                    "b) Plutónicas, volcánicas y sedimentarias",
                    "c) Ígneas, detríticas y cristalinas",
                    "d) Magmáticas, estratificadas y metamórficas"
                ],
                correctIndex: 0,
                correctFeedback: "¡Excelente! Has respondido de manera correcta.",
                incorrectFeedback: "Respuesta incorrecta. Tu exploración geológica ha terminado."
            },
            {
                name: "Muestra 2: ¿Qué es un mineral?",
                question: "¿Qué es un mineral?",
                options: [
                    "a) Sustancia natural, sólida, de origen orgánico o inorgánico, con composición química definida",
                    "b) Sustancia natural, sólida, inorgánica, con composición química definida y estructura cristalina",
                    "c) Sustancia natural, sólida, inorgánica, con composición química variable y estructura cristalina",
                    "d) Sustancia sintética o natural, sólida, inorgánica, con estructura cristalina"
                ],
                correctIndex: 1,
                correctFeedback: "¡Correcto! Muy bien contestado.",
                incorrectFeedback: "Respuesta incorrecta. Tu exploración geológica ha terminado."
            },
            {
                name: "Muestra 3: Proceso metamórfico",
                question: "¿Qué proceso origina una roca metamórfica?",
                options: [
                    "a) Enfriamiento lento del magma en el interior de la corteza",
                    "b) Acumulación y compactación de sedimentos en cuencas",
                    "c) Transformación de una roca preexistente por calor y presión sin llegar a fundirse",
                    "d) Transformación de una roca preexistente por fusión parcial del magma"
                ],
                correctIndex: 2,
                correctFeedback: "¡Exacto! Tienes buenos conocimientos de geología.",
                incorrectFeedback: "Respuesta incorrecta. Tu exploración geológica ha terminado."
            },
            {
                name: "Muestra 4: Escala de Mohs",
                question: "¿Qué mineral tiene dureza 10 en la escala de Mohs?",
                options: [
                    "a) Cuarzo",
                    "b) Corindón",
                    "c) Topacio",
                    "d) Diamante"
                ],
                correctIndex: 3,
                correctFeedback: "¡Correcto! Excelente respuesta.",
                incorrectFeedback: "Respuesta incorrecta. Tu exploración geológica ha terminado."
            },
            {
                name: "Muestra 5: Rocas plutónicas vs volcánicas",
                question: "¿Qué distingue una roca plutónica de una volcánica?",
                options: [
                    "a) La composición química: las plutónicas son más ricas en sílice",
                    "b) La velocidad de enfriamiento: las plutónicas se enfrían más lento y tienen cristales más grandes",
                    "c) La profundidad: las volcánicas se forman siempre bajo el océano",
                    "d) La edad: las plutónicas son siempre más antiguas que las volcánicas"
                ],
                correctIndex: 1,
                correctFeedback: "¡Excelente! Has superado esta pregunta.",
                incorrectFeedback: "Respuesta incorrecta. Tu exploración geológica ha terminado."
            }
        ],
        questionsLevel2: [
            {
                name: "Muestra 1: Cuantificación de H₂",
                question: "¿Qué hace especialmente complicado cuantificar los recursos mundiales de hidrógeno natural?",
                options: [
                    "a) Que la mayoría se encuentra disuelto en agua salina profunda, no en forma gaseosa libre",
                    "b) Que asciende tan rápido que se dispersa antes de poder medirse con precisión",
                    "c) Que gran parte es consumido por microorganismos quimiolitótrofos antes de acumularse",
                    "d) Que los sensores actuales no distinguen entre hidrógeno natural y el procedente de materia orgánica"
                ],
                correctIndex: 2,
                correctFeedback: "¡Excelente! Has respondido de manera correcta.",
                incorrectFeedback: "Respuesta incorrecta. Tu exploración geológica ha terminado."
            },
            {
                name: "Muestra 2: Química de la Serpentinización",
                question: "La serpentinización produce hidrógeno porque...",
                options: [
                    "a) El agua rompe los enlaces del olivino liberando hidrógeno del H₂O al oxidar el hierro ferroso a férrico",
                    "b) El agua disuelve el magnesio del olivino, liberando hidrógeno como subproducto ácido",
                    "c) La presión fractura el olivino y libera hidrógeno atrapado en su estructura cristalina",
                    "d) El hierro del olivino reacciona con el CO₂ profundo generando hidrógeno y carbonatos"
                ],
                correctIndex: 0,
                correctFeedback: "¡Correcto! Muy bien contestado.",
                incorrectFeedback: "Respuesta incorrecta. Tu exploración geológica ha terminado."
            },
            {
                name: "Muestra 3: Significado de Ofiolita",
                question: "¿Qué representa una ofiolita desde el punto de vista geológico?",
                options: [
                    "a) Un fragmento de corteza continental antigua obducido sobre otra placa continental",
                    "b) Una secuencia de rocas que representa corteza oceánica y manto superior emplazada sobre corteza continental",
                    "c) Una secuencia volcánica submarina generada en zonas de subducción intraoceánica",
                    "d) Un conjunto de rocas ultramáficas intruidas en la corteza continental durante colisiones"
                ],
                correctIndex: 1,
                correctFeedback: "¡Correcto! Muy bien contestado.",
                incorrectFeedback: "Respuesta incorrecta. Tu exploración geológica ha terminado."
            },
            {
                name: "Muestra 4: Secuencia Ofiolítica",
                question: "¿Cuál es el orden correcto de la secuencia ofiolítica de arriba a abajo?",
                options: [
                    "a) Sedimentos → basaltos en almohadilla → diabasas → gabros → peridotitas",
                    "b) Sedimentos → gabros → diabasas → basaltos en almohadilla → peridotitas",
                    "c) Peridotitas → gabros → diabasas → basaltos en almohadilla → sedimentos",
                    "d) Sedimentos → peridotitas → gabros → diabasas → basaltos en almohadilla"
                ],
                correctIndex: 0,
                correctFeedback: "¡Excelente! Has superado esta pregunta.",
                incorrectFeedback: "Respuesta incorrecta. Tu exploración geológica ha terminado."
            },
            {
                name: "Muestra 5: Mineral Guía",
                question: "¿Qué mineral es especialmente útil para determinar las condiciones de formación de una ofiolita?",
                options: [
                    "a) Olivino, porque su composición refleja directamente la temperatura del manto",
                    "b) Cromita, porque su química registra la temperatura y el grado de fusión del manto fuente",
                    "c) Piroxeno, porque su contenido en calcio indica la profundidad de cristalización",
                    "d) Plagioclasa, porque su proporción An/Ab varía según la presión de formación del magma"
                ],
                correctIndex: 1,
                correctFeedback: "¡Excelente! Has superado esta pregunta.",
                incorrectFeedback: "Respuesta incorrecta. Tu exploración geológica ha terminado."
            }
        ]
    },
    en: {
        subtitle: "",
        roleHades: "Geologist",
        roleHera: "Geologist",
        btnPlay: "&#9658; PLAY",
        tapPrompt: "MOVE WITH A/D &middot; JUMP WITH SPACE",
        instructions: "Collect samples · When you finish the level, enjoy a coffee! ☕",
        gameOverReasonEnergy: "You ran out of exploration energy.",
        gameOverReasonPuddle: "You sank into a deep puddle of water because you didn't jump over it.",
        gameOverReasonGeyser: "",
        gameOverReasonQuiz: "You answered a geology question incorrectly.",
        gameOverReasonLives: "You ran out of explorer lives.",
        btnRetry: "▶ RETRY",
        victoryTitle: "MISSION<br>COMPLETED!",
        victoryDetails: `<p style="font-weight:bold; color:#3D7A1E; text-align:center; margin:10px 0;">You have knowledge in geology, we move to the next level.</p>`,
        btnReplay: "▶ PLAY AGAIN",
        btnNextLevel: "▶ NEXT LEVEL",
        hudLives: "LIVES",
        hudH2: "GAS H₂",
        hudGeo: "GEOPHONES",
        hudRocks: "SAMPLES",
        energyLabel: "ENERGY: ",
        faultLabel: "FAULT",
        newRockLabel: "[NEW SAMPLE]",
        skateboardUnlock: "<br><br><span style='color: #E67E22; font-weight: bold;'>🛹 YOU HAVE UNLOCKED A NEW MODE OF TRANSPORT FOR YOUR CORRECT ANSWER!</span>",
        correctTitle: "CORRECT! 🎉",
        incorrectTitle: "INCORRECT 😢",
        btnContinue: "CONTINUE",
        questions: [
            {
                name: "Sample 1: Rock Types",
                question: "What are the three main types of rocks?",
                options: [
                    "a) Igneous, sedimentary, and metamorphic",
                    "b) Plutonic, volcanic, and sedimentary",
                    "c) Igneous, detrital, and crystalline",
                    "d) Magmatic, stratified, and metamorphic"
                ],
                correctIndex: 0,
                correctFeedback: "Excellent! You answered correctly.",
                incorrectFeedback: "Incorrect answer. Your geological exploration has ended."
            },
            {
                name: "Sample 2: What is a mineral?",
                question: "What is a mineral?",
                options: [
                    "a) Natural, solid substance, of organic or inorganic origin, with defined chemical composition",
                    "b) Natural, solid, inorganic substance, with defined chemical composition and crystalline structure",
                    "c) Natural, solid, inorganic substance, with variable chemical composition and crystalline structure",
                    "d) Synthetic or natural, solid, inorganic substance, with crystalline structure"
                ],
                correctIndex: 1,
                correctFeedback: "Correct! Well answered.",
                incorrectFeedback: "Incorrect answer. Your geological exploration has ended."
            },
            {
                name: "Sample 3: Metamorphic Process",
                question: "What process creates a metamorphic rock?",
                options: [
                    "a) Slow cooling of magma inside the crust",
                    "b) Accumulation and compaction of sediments in basins",
                    "c) Transformation of a pre-existing rock by heat and pressure without melting",
                    "d) Transformation of a pre-existing rock by partial melting of magma"
                ],
                correctIndex: 2,
                correctFeedback: "Exactly! You have good knowledge of geology.",
                incorrectFeedback: "Incorrect answer. Your geological exploration has ended."
            },
            {
                name: "Sample 4: Mohs Scale",
                question: "Which mineral has a hardness of 10 on the Mohs scale?",
                options: [
                    "a) Quartz",
                    "b) Corundum",
                    "c) Topaz",
                    "d) Diamond"
                ],
                correctIndex: 3,
                correctFeedback: "Correct! Excellent answer.",
                incorrectFeedback: "Incorrect answer. Your geological exploration has ended."
            },
            {
                name: "Sample 5: Plutonic vs Volcanic Rocks",
                question: "What distinguishes a plutonic rock from a volcanic rock?",
                options: [
                    "a) Chemical composition: plutonic rocks are richer in silica",
                    "b) Cooling rate: plutonic rocks cool slower and have larger crystals",
                    "c) Depth: volcanic rocks always form under the ocean",
                    "d) Age: plutonic rocks are always older than volcanic rocks"
                ],
                correctIndex: 1,
                correctFeedback: "Excellent! You passed this question.",
                incorrectFeedback: "Incorrect answer. Your geological exploration has ended."
            }
        ],
        questionsLevel2: [
            {
                name: "Sample 1: H₂ Quantification",
                question: "What makes it especially difficult to quantify global natural hydrogen resources?",
                options: [
                    "a) That most of it is dissolved in deep saline water, not in free gaseous form",
                    "b) That it ascends so quickly that it disperses before it can be measured accurately",
                    "c) That a large part is consumed by chemolithotrophic microorganisms before accumulating",
                    "d) That current sensors do not distinguish between natural hydrogen and that from organic matter"
                ],
                correctIndex: 2,
                correctFeedback: "Excellent! You answered correctly.",
                incorrectFeedback: "Incorrect answer. Your geological exploration has ended."
            },
            {
                name: "Sample 2: Chemistry of Serpentinization",
                question: "Serpentinization produces hydrogen because...",
                options: [
                    "a) Water breaks the bonds of olivine, releasing hydrogen from H₂O by oxidizing ferrous to ferric iron",
                    "b) Water dissolves magnesium from olivine, releasing hydrogen as an acid byproduct",
                    "c) Pressure fractures olivine and releases hydrogen trapped in its crystal structure",
                    "d) Iron in olivine reacts with deep CO₂, generating hydrogen and carbonates"
                ],
                correctIndex: 0,
                correctFeedback: "Correct! Well answered.",
                incorrectFeedback: "Incorrect answer. Your geological exploration has ended."
            },
            {
                name: "Sample 3: Meaning of Ophiolite",
                question: "What does an ophiolite represent from a geological point of view?",
                options: [
                    "a) A fragment of ancient continental crust obducted onto another continental plate",
                    "b) A sequence of rocks representing oceanic crust and upper mantle emplaced onto continental crust",
                    "c) A submarine volcanic sequence generated in intra-oceanic subduction zones",
                    "d) A set of ultramafic rocks intruded into continental crust during collisions"
                ],
                correctIndex: 1,
                correctFeedback: "Correct! Well answered.",
                incorrectFeedback: "Incorrect answer. Your geological exploration has ended."
            },
            {
                name: "Sample 4: Ophiolitic Sequence",
                question: "What is the correct order of the ophiolitic sequence from top to bottom?",
                options: [
                    "a) Sediments → pillow basalts → sheeted dykes → gabbros → peridotites",
                    "b) Sediments → gabbros → sheeted dykes → pillow basalts → peridotites",
                    "c) Peridotites → gabbros → sheeted dykes → pillow basalts → sediments",
                    "d) Sediments → peridotites → gabbros → sheeted dykes → pillow basalts"
                ],
                correctIndex: 0,
                correctFeedback: "Excellent! You passed this question.",
                incorrectFeedback: "Incorrect answer. Your geological exploration has ended."
            },
            {
                name: "Sample 5: Guide Mineral",
                question: "Which mineral is especially useful for determining the formation conditions of an ophiolite?",
                options: [
                    "a) Olivine, because its composition directly reflects the mantle temperature",
                    "b) Chromite, because its chemistry records the temperature and degree of melting of the source mantle",
                    "c) Pyroxene, because its calcium content indicates crystallization depth",
                    "d) Plagioclase, because its An/Ab ratio varies with magma formation pressure"
                ],
                correctIndex: 1,
                correctFeedback: "Excellent! You passed this question.",
                incorrectFeedback: "Incorrect answer. Your geological exploration has ended."
            }
        ]
    },
    fr: {
        subtitle: "",
        roleHades: "Géologue",
        roleHera: "Géologue",
        btnPlay: "&#9658; JOUER",
        tapPrompt: "BOUGEZ AVEC A/D &middot; SAUTEZ AVEC ESPACE",
        instructions: "Collecte des échantillons · Quand tu termines le niveau, bois un café ! ☕",
        gameOverReasonEnergy: "Vous avez manqué d'énergie d'exploration.",
        gameOverReasonPuddle: "Vous avez coulé dans une flaque d'eau profonde pour ne pas l'avoir sautée.",
        gameOverReasonGeyser: "",
        gameOverReasonQuiz: "Vous avez répondu incorrectement à une question de géologie.",
        gameOverReasonLives: "Vous n'avez plus de vies d'explorateur.",
        btnRetry: "▶ RÉESSAYER",
        victoryTitle: "MISSION<br>ACCOMPLIE!",
        victoryDetails: `<p style="font-weight:bold; color:#3D7A1E; text-align:center; margin:10px 0;">Vous avez des connaissances en géologie, nous passons au niveau suivant.</p>`,
        btnReplay: "▶ REJOUER",
        btnNextLevel: "▶ NIVEAU SUIVANT",
        hudLives: "VIES",
        hudH2: "GAZ H₂",
        hudGeo: "GÉOPHONES",
        hudRocks: "ÉCHANTILLONS",
        energyLabel: "ÉNERGIE: ",
        faultLabel: "FAILLE",
        newRockLabel: "[NOUVEL ÉCHANTILLON]",
        skateboardUnlock: "<br><br><span style='color: #E67E22; font-weight: bold;'>🛹 VOUS AVEZ DÉBLOQUÉ UN NOUVEAU MODE DE TRANSPORT POUR VOTRE BONNE RÉPONSE !</span>",
        correctTitle: "CORRECT ! 🎉",
        incorrectTitle: "INCORRECT 😢",
        btnContinue: "CONTINUER",
        questions: [
            {
                name: "Échantillon 1: Types de roches",
                question: "Quels sont les trois principaux types de roches ?",
                options: [
                    "a) Ignées, sédimentaires et métamorphiques",
                    "b) Plutoniques, volcaniques et sédimentaires",
                    "c) Ignées, détritiques et cristallines",
                    "d) Magmatiques, stratifiées et métamorphiques"
                ],
                correctIndex: 0,
                correctFeedback: "Excellent ! Vous avez répondu correctement.",
                incorrectFeedback: "Réponse incorrecte. Votre exploration géologique est terminée."
            },
            {
                name: "Échantillon 2: Qu'est-ce qu'un minéral ?",
                question: "Qu'est-ce qu'un minéral ?",
                options: [
                    "a) Substance naturelle, solide, d'origine organique ou inorganique, avec une composition chimique définie",
                    "b) Substance naturelle, solide, inorganique, avec une composition chimique définie et une structure cristalline",
                    "c) Substance naturelle, solide, inorganique, avec une composition chimique variable et une structure cristalline",
                    "d) Substance synthétique ou naturelle, solide, inorganique, avec une structure cristalline"
                ],
                correctIndex: 1,
                correctFeedback: "Correct ! Bien répondu.",
                incorrectFeedback: "Réponse incorrecte. Votre exploration géologique est terminée."
            },
            {
                name: "Échantillon 3: Processus métamorphique",
                question: "Quel processus donne naissance à une roche métamorphique ?",
                options: [
                    "a) Refroidissement lent du magma à l'intérieur de la croûte",
                    "b) Accumulation et compactage de sédiments dans des bassins",
                    "c) Transformation d'une roche préexistante par la chaleur et la pression sans fusion",
                    "d) Transformation d'une roche préexistante par fusion partielle de magma"
                ],
                correctIndex: 2,
                correctFeedback: "Exact ! Vous avez de bonnes connaissances en géologie.",
                incorrectFeedback: "Réponse incorrecte. Votre exploration géologique est terminée."
            },
            {
                name: "Échantillon 4: Échelle de Mohs",
                question: "Quel minéral a une dureté de 10 sur l'échelle de Mohs ?",
                options: [
                    "a) Quartz",
                    "b) Corindon",
                    "c) Topaze",
                    "d) Diamant"
                ],
                correctIndex: 3,
                correctFeedback: "Correct ! Excellente réponse.",
                incorrectFeedback: "Réponse incorrecte. Votre exploration géologique est terminée."
            },
            {
                name: "Échantillon 5: Roches plutoniques vs volcaniques",
                question: "Qu'est-ce qui distingue une roche plutonique d'une roche volcanique ?",
                options: [
                    "a) Composition chimique : les roches plutoniques sont plus riches en silice",
                    "b) Vitesse de refroidissement : les roches plutoniques refroidissent plus lentement et ont des cristaux plus grands",
                    "c) Profondeur : les roches volcaniques se forment toujours sous l'océan",
                    "d) Âge : les roches plutoniques sont toujours plus anciennes que les roches volcaniques"
                ],
                correctIndex: 1,
                correctFeedback: "Excellent ! Vous avez réussi cette question.",
                incorrectFeedback: "Réponse incorrecte. Votre exploration géologique est terminée."
            }
        ],
        questionsLevel2: [
            {
                name: "Échantillon 1 : Quantification de l'H₂",
                question: "Qu'est-ce qui rend particulièrement difficile la quantification des ressources mondiales en hydrogène naturel ?",
                options: [
                    "a) Que la majeure partie est dissoute dans l'eau salée profonde, non sous forme gazeuse libre",
                    "b) Qu'il monte si vite qu'il se disperse avant de pouvoir être mesuré avec précision",
                    "c) Qu'une grande partie est consommée par des micro-organismes chimiolithotrophes avant de s'accumuler",
                    "d) Que les capteurs actuels ne distinguent pas l'hydrogène naturel de celui issu de la matière organique"
                ],
                correctIndex: 2,
                correctFeedback: "Excellent ! Vous avez répondu correctement.",
                incorrectFeedback: "Réponse incorrecte. Votre exploration géologique est terminée."
            },
            {
                name: "Échantillon 2 : Chimie de la serpentinisation",
                question: "La serpentinisation produit de l'hydrogène car...",
                options: [
                    "a) L'eau brise les liaisons de l'olivine, libérant l'hydrogène de l'H₂O en oxydant le fer ferreux en fer ferrique",
                    "b) L'eau dissout le magnésium de l'olivine, libérant de l'hydrogène comme sous-produit acide",
                    "c) La pression fracture l'olivine et libère l'hydrogène piégé dans sa structure cristalline",
                    "d) Le fer de l'olivine réagit avec le CO₂ profond, générant de l'hydrogène et des carbonates"
                ],
                correctIndex: 0,
                correctFeedback: "Correct ! Bien répondu.",
                incorrectFeedback: "Réponse incorrecte. Votre exploration géologique est terminée."
            },
            {
                name: "Échantillon 3 : Signification d'ophiolite",
                question: "Que représente une ophiolite d'un point de vue géologique ?",
                options: [
                    "a) Un fragment de croûte continentale ancienne obduit sur une autre plaque continentale",
                    "b) Une séquence de roches représentant la croûte océanique et le manteau supérieur mise en place sur la croûte continentale",
                    "c) Une séquence volcanique sous-marine générée dans des zones de subduction intra-océanique",
                    "d) Un ensemble de roches ultramafiques intrudées dans la croûte continentale lors de collisions"
                ],
                correctIndex: 1,
                correctFeedback: "Correct ! Bien répondu.",
                incorrectFeedback: "Réponse incorrecte. Votre exploration géologique est terminée."
            },
            {
                name: "Échantillon 4 : Séquence ophiolitique",
                question: "Quel est l'ordre correct de la séquence ophiolitique de haut en bas ?",
                options: [
                    "a) Sédiments → basaltes en coussins → filons en feuillets → gabbros → péridotites",
                    "b) Sédiments → gabbros → filons en feuillets → basaltes en coussins → péridotites",
                    "c) Péridotites → gabbros → filons en feuillets → basaltes en coussins → sédiments",
                    "d) Sédiments → péridotites → gabbros → filons en feuillets → basaltes en coussins"
                ],
                correctIndex: 0,
                correctFeedback: "Excellent ! Vous avez réussi cette question.",
                incorrectFeedback: "Réponse incorrecte. Votre exploration géologique est terminée."
            },
            {
                name: "Échantillon 5 : Minéral guide",
                question: "Quel minéral est particulièrement utile pour déterminer les conditions de formation d'une ophiolite ?",
                options: [
                    "a) L'olivine, car sa composition reflète directement la température du manteau",
                    "b) La chromite, car sa chimie enregistre la température et le degré de fusion du manteau source",
                    "c) Le pyroxène, car sa teneur en calcium indique la profondeur de cristallisation",
                    "d) Le plagioclase, car son rapport An/Ab varie avec la pression de formation du magma"
                ],
                correctIndex: 1,
                correctFeedback: "Excellent ! Vous avez réussi cette question.",
                incorrectFeedback: "Réponse incorrecte. Votre exploration géologique est terminée."
            }
        ]
    }
};

function setLanguage(lang) {
    currentLang = lang;
    
    // Update active class on buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
    });
    
    // Update DOM texts
    const t = translations[lang];
    if (document.getElementById('title-subtitle')) document.getElementById('title-subtitle').innerHTML = t.subtitle;
    document.getElementById('char-hades-role').innerHTML = t.roleHades;
    document.getElementById('char-hera-role').innerHTML = t.roleHera;
    document.getElementById('btn-play').innerHTML = t.btnPlay;
    if (document.getElementById('tap-prompt')) document.getElementById('tap-prompt').innerHTML = t.tapPrompt;
    if (document.getElementById('instructions-text')) document.getElementById('instructions-text').innerHTML = t.instructions;
    document.getElementById('btn-retry').innerHTML = t.btnRetry;
    document.getElementById('victory-title').innerHTML = t.victoryTitle;
    document.getElementById('victory-details').innerHTML = t.victoryDetails;
    document.getElementById('btn-replay').innerHTML = currentLevel === 1 ? t.btnNextLevel : t.btnReplay;
    document.getElementById('btn-continue').innerHTML = t.btnContinue;
    
    // Update HUD labels (we preserve the spans!)
    const livesSpan = document.getElementById("hud-lives") ? document.getElementById("hud-lives").outerHTML : `<span id="hud-lives">${"♥".repeat(Math.max(0, player.lives))}</span>`;
    const h2Span = document.getElementById("hud-h2") ? document.getElementById("hud-h2").outerHTML : `<span id="hud-h2">${Math.floor(player.h2Collected)}/60</span>`;
    const geoSpan = document.getElementById("hud-geo") ? document.getElementById("hud-geo").outerHTML : `<span id="hud-geo">${player.geophonesPlaced}/3</span>`;
    const rocksSpan = document.getElementById("hud-rocks") ? document.getElementById("hud-rocks").outerHTML : `<span id="hud-rocks">${rockSamples.filter(r => r.discovered).length}/5</span>`;

    document.getElementById('hud-label-lives').innerHTML = `${t.hudLives} ${livesSpan}`;
    document.getElementById('hud-label-h2').innerHTML = `${t.hudH2} ${h2Span}`;
    document.getElementById('hud-label-geo').innerHTML = `${t.hudGeo} ${geoSpan}`;
    document.getElementById('hud-label-rocks').innerHTML = `${t.hudRocks} ${rocksSpan}`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Game States
let gameState = "select"; // select, playing, gameover, victory
let selectedChar = "male"; // male, female
let keys = {};

// Game Constants
const GRAVITY = 0.5;
const GROUND_Y = 400;
const LEVEL_WIDTH = 4200; // Total length of the stage

// Camera
let cameraX = 0;

// Player Properties
let player = {
    x: 100,
    y: 200,
    width: 24,
    height: 48,
    vx: 0,
    vy: 0,
    speed: 4,
    jumpForce: -11,
    isGrounded: false,
    direction: 1, // 1 = right, -1 = left
    lives: 3,
    energy: 100, // Energy counts down like Adventure Island
    h2Collected: 0, // Sniffing soil gas
    geophonesPlaced: 0, // Geophysics seismic network (needs 3)
    drilledH2Percent: 0, // Drilling at the end
    vehicle: null, // null, "dinosaur", "surfboard"
    dinoNearby: null, // Ref to dinosaur near player
    isSniffing: false,
    isDrilling: false,
    correctAnswersCount: 0
};

// Game Entities
let dinosaurs = [];
let hazards = [];
let fairyCircles = [];
let fractures = [];
let geophones = [];
let fruits = [];
let ambientParticles = [];
let rockSamples = [];
let seaBubbles = [];
let puddles = [];

function getGroundHeight(x) {
    let base = GROUND_Y;
    
    // Hill 1
    if (x > 800 && x < 1300) {
        let pct = (x - 800) / 500;
        base -= Math.sin(pct * Math.PI) * 70;
    }
    // Hill 2
    if (x > 1700 && x < 2300) {
        let pct = (x - 1700) / 600;
        base -= Math.sin(pct * Math.PI) * 90;
    }
    // Hill 3
    if (x > 2800 && x < 3300) {
        let pct = (x - 2800) / 500;
        base -= Math.sin(pct * Math.PI) * 60;
    }
    
    return base;
}
let bubbleFloatingTexts = [];
let frailejones = [];  // Frailejones del páramo colombiano
let activeEducationalModal = false;
let activeRockSample = null;
let drillRig = { x: 3850, y: 150, width: 120, height: 250, drillingDone: false };

// Character Select Screen handler
function selectCharacter(gender) {
    selectedChar = gender;
    document.getElementById("char-hades").classList.toggle("selected", gender === 'male');
    document.getElementById("char-hera").classList.toggle("selected", gender === 'female');
}

// Custom Rock Question handlers
function showQuestionModal(rock) {
    activeRockSample = rock;
    gameState = "quiz";
    
    document.getElementById("question-title").textContent = rock.question;
    const optionsDiv = document.getElementById("question-options");
    optionsDiv.innerHTML = ""; // Clear existing options
    
    rock.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "btn-option";
        btn.textContent = opt;
        btn.onclick = () => answerQuestion(idx);
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById("rock-question-screen").style.display = "flex";
}

function answerQuestion(optionIndex) {
    document.getElementById("rock-question-screen").style.display = "none";
    
    const resultScreen = document.getElementById("rock-result-screen");
    const resultTitle = document.getElementById("result-title");
    const resultSubtitle = document.getElementById("result-subtitle");
    const snoopyImg = document.getElementById("snoopy-img");
    
    const isCorrect = (optionIndex === activeRockSample.correctIndex);
    activeRockSample.wasAnsweredCorrectly = isCorrect;
    
    if (isCorrect) {
        resultTitle.textContent = translations[currentLang].correctTitle;
        resultTitle.style.color = "#3D7A1E";
        resultSubtitle.innerHTML = activeRockSample.correctFeedback;
        snoopyImg.src = "Happy_snoopy.webp";
        
        player.correctAnswersCount = (player.correctAnswersCount || 0) + 1;
        if (player.correctAnswersCount === 2) {
            player.vehicle = currentLevel === 2 ? "dinosaur" : "skateboard";
            let unlockMsg = translations[currentLang].skateboardUnlock;
            if (currentLevel === 2) {
                unlockMsg = unlockMsg
                    .replace("🛹", "🦖")
                    .replace("TRANSPORTE", "TRANSPORTE: ¡DINOSAURIO!");
            }
            resultSubtitle.innerHTML += unlockMsg;
        }
    } else {
        resultTitle.textContent = translations[currentLang].incorrectTitle;
        resultTitle.style.color = "#E74C3C";
        resultSubtitle.textContent = activeRockSample.incorrectFeedback;
        snoopyImg.src = "giphy_snoopysad.gif";
    }
    
    resultScreen.style.display = "flex";
}

function closeRockResult() {
    document.getElementById("rock-result-screen").style.display = "none";
    
    if (activeRockSample) {
        if (activeRockSample.wasAnsweredCorrectly) {
            activeRockSample.discovered = true;
            
            gameState = "playing";
        } else {
            // Si responde mal, es Game Over
            triggerGameOver(translations[currentLang].gameOverReasonQuiz);
        }
    }
}



function startGame() {
    AudioSFX.init();
    AudioSFX.startBGM();
    gameState = "playing";
    document.getElementById("character-select-screen").style.display = "none";
    document.getElementById("game-hud").style.display = "flex";
    
    // Apply unique geologist abilities
    if (selectedChar === "male") { // Hades
        player.lives = 4; // Resilient tank (4 lives)
        player.speed = 4.2;
        player.jumpForce = -11;
    } else { // Hera
        player.lives = 3;
        player.speed = 5.2; // High mobility speed!
        player.jumpForce = -12.8; // High exploration jumps!
    }
    
    player.correctAnswersCount = 0;
    player.celebrating = false;
    player.celebrationTimer = 0;
    initLevel();
}

function handleVictoryButtonClick() {
    if (currentLevel === 1) {
        currentLevel = 2;
    } else {
        currentLevel = 1;
    }
    restartGame();
}

function restartGame() {
    document.getElementById("gameover-screen").style.display = "none";
    document.getElementById("victory-screen").style.display = "none";
    document.getElementById("game-hud").style.display = "flex";
    
    // Reset Player
    player.x = 100;
    player.y = 200;
    player.vx = 0;
    player.vy = 0;
    player.energy = 100;
    player.h2Collected = 0;
    player.geophonesPlaced = 0;
    player.drilledH2Percent = 0;
    player.vehicle = null;
    player.isSniffing = false;
    player.isDrilling = false;
    player.correctAnswersCount = 0;
    player.celebrating = false;
    player.celebrationTimer = 0;
    
    // Re-apply unique geologist abilities
    if (selectedChar === "male") { // Hades
        player.lives = 4;
        player.speed = 4.2;
        player.jumpForce = -11;
    } else { // Hera
        player.lives = 3;
        player.speed = 5.2;
        player.jumpForce = -12.8;
    }
    
    cameraX = 0;
    activeEducationalModal = false;
    activeRockSample = null;
    seaBubbles = [];
    bubbleFloatingTexts = [];
    
    AudioSFX.startBGM();
    gameState = "playing";
    initLevel();
}

function initLevel() {
    dinosaurs = [];

    if (currentLevel === 2) {
        // Nivel 2: no hay charcos (desierto seco), solo peligros de cañón
        puddles = [];
        hazards = [
            { x: 900,  y: getGroundHeight(900)  - 20, width: 25, height: 20, type: "geyser", isErupting: false, timer: 0 },
            { x: 2200, y: getGroundHeight(2200) - 20, width: 25, height: 20, type: "geyser", isErupting: false, timer: 80 },
            { x: 3100, y: getGroundHeight(3100) - 20, width: 25, height: 20, type: "geyser", isErupting: false, timer: 40 }
        ];
        // Dinosaurios salvajes en el mapa del nivel 2
        dinosaurs = [
            { x: 1200, y: getGroundHeight(1200), width: 50, height: 40, active: true },
            { x: 2600, y: getGroundHeight(2600), width: 50, height: 40, active: true }
        ];
    } else {
        puddles = [
            { x: 1050, width: 70 },
            { x: 1750, width: 80 },
            { x: 2550, width: 75 }
        ];
        hazards = [
            { x: 850, y: getGroundHeight(850) - 20, width: 25, height: 20, type: "geyser", isErupting: false, timer: 0 },
            { x: 2680, y: getGroundHeight(2680) - 20, width: 25, height: 20, type: "geyser", isErupting: false, timer: 100 }
        ];
    }

    fairyCircles = [];
    if (document.getElementById("hud-label-h2")) {
        document.getElementById("hud-label-h2").style.display = "none";
    }

    // Fractures/Faults for Seismic sensors placement
    geophones = [];
    fractures  = []; // Sin geófonos

    // Scattered energy fruits (MODIS Bananas, VIIRS Cherries, H2 Canisters)
    fruits = [
        { x: 300, y: 250, type: "banana" },
        { x: 450, y: 220, type: "cherry" },
        { x: 900, y: 260, type: "banana" },
        { x: 1150, y: 220, type: "cherry" },
        { x: 1750, y: 260, type: "banana" },
        { x: 2050, y: 210, type: "cherry" },
        { x: 2850, y: 200, type: "banana" },
        { x: 3250, y: 220, type: "cherry" },
        { x: 3825, y: GROUND_Y - 22, type: "canister" } // Tinto final en la mesa
    ];

    // Cargar preguntas según nivel (geología básica en Nivel 1, hidrógeno en Nivel 2)
    const activeQuestions = currentLevel === 1 ? translations[currentLang].questions : translations[currentLang].questionsLevel2;
    const baseQuestions = JSON.parse(JSON.stringify(activeQuestions));
    shuffleArray(baseQuestions);

    const rockXPositions = [650, 1350, 2100, 2850, 3500];
    const rockColors = ["#84cc16", "#3f3f46", "#fca5a5", "#e2e8f0", "#fbbf24"];

    rockSamples = baseQuestions.map((q, idx) => {
        const x = rockXPositions[idx];
        const y = getGroundHeight(x) - 30;

        // Shuffle the options of the question, keeping track of the correct answer
        const correctText = q.options[q.correctIndex];
        shuffleArray(q.options);
        const newCorrectIndex = q.options.indexOf(correctText);

        return {
            x: x,
            y: y,
            width: 30,
            height: 30,
            name: q.name,
            discovered: false,
            color: rockColors[idx % rockColors.length],
            question: q.question,
            options: q.options,
            correctIndex: newCorrectIndex,
            correctFeedback: q.correctFeedback,
            incorrectFeedback: q.incorrectFeedback
        };
    });

    // Generar frailejones del páramo a lo largo del nivel
    frailejones = [];
    const frailejonesPositions = [
        150, 380, 560, 820, 1050, 1850, 2080, 2300, 2700, 2950, 3200, 3550, 3750
    ];
    frailejonesPositions.forEach((fx, i) => {
        frailejones.push({
            x: fx,
            height: 55 + (i % 3) * 20,   // variedad de alturas
            hasFlower: i % 2 === 0,
            scale: 0.85 + (i % 4) * 0.12
        });
    });

    // Generate stunning bio-energy background particles
    ambientParticles = [];
    for (let i = 0; i < 45; i++) {
        ambientParticles.push({
            x: Math.random() * LEVEL_WIDTH,
            y: Math.random() * 380,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 0.4 - 0.2,
            speedY: -Math.random() * 0.3 - 0.1,
            color: Math.random() > 0.5 ? "rgba(20, 184, 166, 0.45)" : "rgba(251, 191, 36, 0.35)"
        });
    }
}

// Side Guides Sidebar Highlighter (kept for compatibility, sidebar hidden via CSS)
function updateSidebarGuide(activeId) {
    document.querySelectorAll(".op-card").forEach(card => card.classList.remove("active"));
    const activeCard = document.getElementById(activeId);
    if (activeCard) activeCard.classList.add("active");
}

// Update DOM HUD elements (Flappy Facho style)
function updateHUD() {
    const livesEl   = document.getElementById("hud-lives");
    const h2El      = document.getElementById("hud-h2");
    const geoEl     = document.getElementById("hud-geo");
    const rocksEl   = document.getElementById("hud-rocks");
    if (!livesEl) return;
    livesEl.textContent  = "♥".repeat(Math.max(0, player.lives));
    h2El.textContent     = `${Math.floor(player.h2Collected)}/60`;
    geoEl.textContent    = `${player.geophonesPlaced}/3`;
    rocksEl.textContent  = `${rockSamples.filter(r => r.discovered).length}/5`;
}

// Keyboard Input Handlers
window.addEventListener("keydown", (e) => {
    keys[e.code] = true;
});
window.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

// ── Touch Controls (Mobile) ──
(function initTouchControls() {
    const touchMap = {
        'touch-left': 'KeyA',
        'touch-right': 'KeyD',
        'touch-jump': 'Space'
    };

    Object.entries(touchMap).forEach(([btnId, keyCode]) => {
        const btn = document.getElementById(btnId);
        if (!btn) return;

        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keys[keyCode] = true;
            btn.classList.add('active');
        }, { passive: false });

        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            keys[keyCode] = false;
            btn.classList.remove('active');
        }, { passive: false });

        btn.addEventListener('touchcancel', (e) => {
            keys[keyCode] = false;
            btn.classList.remove('active');
        });
    });

    // Prevent default touch behavior on canvas to avoid scrolling while playing
    const canvas = document.getElementById('gameCanvas');
    canvas.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
})();

// Physics and game update logic
function update() {
    if (gameState !== "playing") return;

    // Controlar animación de celebración (saltos y confeti de colores)
    if (player.celebrating) {
        player.vx = 0;
        
        // Caminar automáticamente hacia la puerta de la tienda (el centro está en shopX + 37)
        let targetX = drillRig.x + 37;
        if (player.x < targetX) {
            player.x += 1.0; // Avanzar lentamente a la derecha
            player.direction = 1;
            if (player.isGrounded) {
                player.vy = -3.5; // Animación de saltitos de felicidad
                player.isGrounded = false;
            }
        } else {
            // Ya llegó a la puerta: Entrar a la tienda (comienza desvanecimiento en drawGeologist)
            player.enteringShop = true;
        }
        
        // Generar partículas de confeti de colores alrededor del jugador
        if (Math.random() < 0.45) {
            ambientParticles.push({
                x: player.x + 12 + Math.random() * 30 - 15,
                y: player.y + 10,
                size: Math.random() * 4 + 2,
                speedX: Math.random() * 4 - 2,
                speedY: -Math.random() * 4 - 3,
                color: `hsl(${Math.random() * 360}, 100%, 55%)`,
                isConfetti: true,
                life: 90
            });
        }
        
        player.celebrationTimer--;
        if (player.celebrationTimer <= 0) {
            player.celebrating = false;
            player.enteringShop = false;
            triggerVictory();
        }
        
        // Aplicar gravedad y actualizar posición durante la celebración
        player.vy += GRAVITY;
        player.y += player.vy;
        let currentGround = getGroundHeight(player.x);
        if (player.y >= currentGround - player.height) {
            player.y = currentGround - player.height;
            player.vy = 0;
            player.isGrounded = true;
        }
        
        // Actualizar partículas de confeti durante la celebración
        for (let i = ambientParticles.length - 1; i >= 0; i--) {
            let p = ambientParticles[i];
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.isConfetti) {
                p.speedY += 0.08;
                p.life--;
                if (p.life <= 0) {
                    ambientParticles.splice(i, 1);
                }
            }
        }
        return;
    }

    // Handle active educational rock discovery modal freeze
    if (activeEducationalModal) {
        if (keys["Enter"] || keys["Space"] || keys["KeyZ"] || keys["KeyX"] || keys["KeyC"]) {
            activeEducationalModal = false;
            if (activeRockSample) {
                activeRockSample.discovered = true;
            }
            keys["Enter"] = false;
            keys["Space"] = false;
            keys["KeyZ"] = false;
            keys["KeyX"] = false;
            keys["KeyC"] = false;
        }
        return;
    }

    // Slow energy drain (Hades has 25% slower energy drain!)
    let drainRate = selectedChar === "male" ? 0.03 : 0.04;
    player.energy -= drainRate;
    if (player.energy <= 0) {
        triggerGameOver(translations[currentLang].gameOverReasonEnergy);
        return;
    }

    // Check if player is inside a mud puddle (charco)
    let inPuddle = false;
    puddles.forEach(pud => {
        let playerMidX = player.x + player.width / 2;
        if (playerMidX > pud.x && playerMidX < pud.x + pud.width && player.y >= getGroundHeight(player.x) - player.height - 5) {
            inPuddle = true;
        }
    });

    if (inPuddle) {
        triggerGameOver(translations[currentLang].gameOverReasonPuddle);
        return;
    }

    // 1. Horizontal Movement (Skateboard has speed boost!)
    let currentSpeed = player.speed;
    if (player.vehicle === "skateboard") currentSpeed = player.speed * 1.8;

    if (keys["ArrowRight"] || keys["KeyD"]) {
        player.vx = currentSpeed;
        player.direction = 1;
    } else if (keys["ArrowLeft"] || keys["KeyA"]) {
        player.vx = -currentSpeed;
        player.direction = -1;
    } else {
        player.vx = 0;
    }

    // 2. Jump (Spacebar, Up Arrow, or W key!)
    let isJumpKeyPressed = keys["Space"] || keys["ArrowUp"] || keys["KeyW"];
    if (isJumpKeyPressed && player.isGrounded) {
        let jumpPower = player.jumpForce;
        if (player.vehicle === "skateboard") jumpPower = player.jumpForce * 1.25;
        
        player.vy = jumpPower;
        player.isGrounded = false;
        AudioSFX.playJump();
    }

    // Apply gravity
    player.vy += GRAVITY;

    // Update position
    player.x += player.vx;
    player.y += player.vy;

    // Camera follow player
    cameraX = player.x - 200;
    if (cameraX < 0) cameraX = 0;
    if (cameraX > LEVEL_WIDTH - canvas.width) cameraX = LEVEL_WIDTH - canvas.width;

    // Terrain boundaries
    if (player.x < 10) player.x = 10;
    if (player.x > LEVEL_WIDTH - 24) player.x = LEVEL_WIDTH - 24;

    // 3. Collision with Ground & Geologic Layers (Dynamic Height Map)
    let currentGround = getGroundHeight(player.x);
    if (player.y >= currentGround - player.height) {
        player.y = currentGround - player.height;
        player.vy = 0;
        player.isGrounded = true;
    }

    // Spawn rising deep-sea hydrogen bubbles (desactivado para más adelante)
    if (false) {
        if (Math.random() < 0.09) {
            seaBubbles.push({
                x: 1150 + Math.random() * 560,
                y: GROUND_Y + 60,
                vy: -Math.random() * 1.5 - 1.2,
                size: Math.random() * 5 + 4,
                freq: Math.random() * 0.04 + 0.01,
                spawnTime: Date.now()
            });
        }

        // Update rising bubbles and check surfboard collision to measure them
        for (let b = seaBubbles.length - 1; b >= 0; b--) {
            let bubble = seaBubbles[b];
            bubble.y += bubble.vy;
            bubble.x += Math.sin((Date.now() - bubble.spawnTime) * bubble.freq) * 0.4;

            // Check boundary limits
            if (bubble.y < 50) {
                seaBubbles.splice(b, 1);
                continue;
            }

            // Collision with player
            let dx = Math.abs(player.x + player.width/2 - bubble.x);
            let dy = Math.abs(player.y + player.height/2 - bubble.y);
            if (dx < 35 && dy < 48) {
                seaBubbles.splice(b, 1);
                
                // Add to measured gas count
                player.h2Collected += 1.5;
                AudioSFX.playCollect();

                // Spawn floating text showing measured concentration
                let measuredPPM = Math.floor(Math.random() * 10 + 6);
                bubbleFloatingTexts.push({
                    x: bubble.x,
                    y: bubble.y - 10,
                    text: `+${measuredPPM} ppm H₂`,
                    timer: 45
                });
            }
        }

        // Update floating measurement text particles
        for (let f = bubbleFloatingTexts.length - 1; f >= 0; f--) {
            let ft = bubbleFloatingTexts[f];
            ft.y -= 1.0;
            ft.timer--;
            if (ft.timer <= 0) {
                bubbleFloatingTexts.splice(f, 1);
            }
        }
    }

    // 4. Exploration operations & keys
    player.isSniffing = false;
    player.isDrilling = false;

    // Active Sniffing H2 in Fairy circles
    fairyCircles.forEach(circle => {
        if (player.x > circle.x && player.x < circle.x + circle.width && Math.abs(player.y - (getGroundHeight(player.x) - player.height)) < 20) {
            if (keys["KeyZ"]) {
                player.isSniffing = true;
                if (circle.h2Level > 0) {
                    let sniffSpeed = selectedChar === "female" ? 1.6 : 0.8;
                    let sniffH2 = selectedChar === "female" ? 0.4 : 0.2;
                    circle.h2Level -= sniffSpeed;
                    player.h2Collected += sniffH2;
                    AudioSFX.playCollect();
                    if (player.h2Collected >= 30 && player.geophonesPlaced < 3) {
                        updateSidebarGuide("op-seismic");
                    }
                }
            }
        }
    });


    // Perforadora: no requiere geófonos

    // Check for educational rock samples collisions/discoveries
    rockSamples.forEach(rock => {
        if (!rock.discovered && Math.abs(player.x - rock.x) < 50 && Math.abs(player.y - rock.y) < 50) {
            showQuestionModal(rock);
            AudioSFX.playGeophone(); // Satisfying discovery chime!
        }
    });



    // 5. Dinosaur interaction (Mounting dinosaur - made MUCH easier: automatically mounts upon contact!)
    player.dinoNearby = null;
    dinosaurs.forEach(dino => {
        if (dino.active && Math.abs(player.x - dino.x) < 65 && Math.abs(player.y - (getGroundHeight(dino.x) - dino.height)) < 70) {
            player.dinoNearby = dino;
            if (player.vehicle !== "dinosaur") {
                player.vehicle = "dinosaur";
                dino.active = false;
                AudioSFX.playRoar();
            }
        }
    });

    // Press C to dismount Dinosaur
    if (keys["KeyC"] && player.vehicle === "dinosaur" && !player.dinoNearby) {
        player.vehicle = null;
        // Spawn dinosaur back
        let spawnX = player.x + player.direction * 40;
        dinosaurs.push({ x: spawnX, y: getGroundHeight(spawnX), width: 50, height: 40, active: true });
        AudioSFX.playRoar();
    }

    // 6. Food and canister collection
    fruits.forEach((fruit, idx) => {
        if (Math.abs(player.x - fruit.x) < 30 && Math.abs(player.y - fruit.y) < 50) {
            if (fruit.type === "canister") {
                const discoveredCount = rockSamples.filter(r => r.discovered).length;
                if (discoveredCount >= 5) {
                    fruits.splice(idx, 1);
                    player.celebrating = true;
                    player.celebrationTimer = 150; // 150 frames (~2.5s) de celebración
                    AudioSFX.playStageClear();
                }
            } else {
                fruits.splice(idx, 1);
                player.energy = Math.min(100, player.energy + 15);
                AudioSFX.playCollect();
            }
        }
    });

    // 7. Hazard and obstacles collision
    hazards.forEach(haz => {
        // Update geyser eruption timers
        if (haz.type === "geyser") {
            haz.timer++;
            if (haz.timer % 150 === 0) {
                haz.isErupting = !haz.isErupting;
            }
        }

        // Damage Collision checks
        let currentGroundHeight = getGroundHeight(player.x);
        let isColliding = Math.abs(player.x - haz.x) < 25 && player.y >= currentGroundHeight - player.height - 10;
        if (haz.type === "geyser" && !haz.isErupting) isColliding = false; // geysers only hurt when erupting

        if (isColliding) {
            if (haz.type === "geyser") {
                triggerGameOver(translations[currentLang].gameOverReasonGeyser);
                return;
            }
            if (player.vehicle === "dinosaur") {
                // Dinosaur blocks the hit and gets dismounted
                player.vehicle = null;
                haz.x -= 100; // Push hazard back
                player.x += player.direction * -60;
                AudioSFX.playRoar();
            } else {
                // Direct player hit
                player.lives--;
                player.energy -= 10;
                player.x += player.direction * -80; // Knockback
                AudioSFX.playGameOver();
                if (player.lives <= 0) {
                    triggerGameOver(translations[currentLang].gameOverReasonLives);
                }
            }
        }
    });



    // 8. Update ambient background particles
    for (let i = ambientParticles.length - 1; i >= 0; i--) {
        let p = ambientParticles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.isConfetti) {
            p.speedY += 0.08; // Caída por gravedad
            p.life--;
            if (p.life <= 0) {
                ambientParticles.splice(i, 1);
            }
        } else {
            if (p.y < 0) {
                p.y = 380;
                p.x = Math.random() * LEVEL_WIDTH;
            }
        }
    }
}

function triggerGameOver(reason) {
    gameState = "gameover";
    AudioSFX.playGameOver();
    // Congelar pantalla con overlay oscuro dramatico
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Texto GAME OVER en el canvas
    ctx.font = "bold 36px 'Press Start 2P', monospace";
    ctx.fillStyle = "#E74C3C";
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 12;
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = "10px 'Press Start 2P', monospace";
    ctx.fillStyle = "#fff";
    ctx.fillText(reason, canvas.width / 2, canvas.height / 2 + 20);
    ctx.shadowBlur = 0;
    ctx.textAlign = "left";
    ctx.restore();
    // Mostrar overlay DOM después de un breve delay dramático
    setTimeout(() => {
        document.getElementById("gameover-reason").innerText = reason;
        document.getElementById("gameover-screen").style.display = "flex";
        document.getElementById("game-hud").style.display = "none";
    }, 1200);
}

function triggerVictory() {
    gameState = "victory";
    document.getElementById("game-hud").style.display = "none";
    document.getElementById("victory-screen").style.display = "flex";
    AudioSFX.playStageClear();
}

/// RENDER GAME GRAPHICS — Flappy Facho Daytime Style
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ── Sky gradient ──
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    if (currentLevel === 2) {
        gradient.addColorStop(0,   "#2E1A47"); // deep purple sunset
        gradient.addColorStop(0.5, "#D35400"); // bright orange
        gradient.addColorStop(1,   "#F39C12"); // sunset yellow
    } else {
        gradient.addColorStop(0,   "#5B8FBF"); // azul páramo profundo
        gradient.addColorStop(0.5, "#88C0D8"); // azul cielo andino
        gradient.addColorStop(1,   "#C5E8F0"); // horizonte pálido
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ── White/Pinkish clouds parallax (capa 1 — lentas) ──
    ctx.fillStyle = currentLevel === 2 ? "rgba(244, 143, 177, 0.55)" : "rgba(255, 255, 255, 0.82)";
    let cloudOffset1 = (cameraX * 0.12) % canvas.width;
    let cloudSeeds1 = [60, 200, 370, 520, 680];
    cloudSeeds1.forEach(cx => {
        let x = (cx - cloudOffset1 + canvas.width * 2) % (canvas.width + 160) - 80;
        drawCloud(ctx, x, 60, 1.0);
    });

    // ── Sol ──
    let sunX = 680 - (cameraX * 0.05) % 800;
    if (currentLevel === 2) {
        // Large majestic sunset sun near the horizon (no face)
        ctx.fillStyle = "rgba(243, 156, 18, 0.25)";
        ctx.beginPath();
        ctx.arc(sunX, 290, 85, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#E67E22";
        ctx.beginPath();
        ctx.arc(sunX, 290, 55, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#D35400";
        ctx.lineWidth = 4;
        ctx.stroke();
    } else {
        // Halo
        ctx.fillStyle = "rgba(255, 235, 100, 0.18)";
        ctx.beginPath();
        ctx.arc(sunX, 68, 42, 0, Math.PI * 2);
        ctx.fill();
        // Cuerpo del sol
        ctx.fillStyle = "#FFD93D";
        ctx.beginPath();
        ctx.arc(sunX, 68, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#F4A100";
        ctx.lineWidth = 3;
        ctx.stroke();
        // Cara del sol (Flappy Bird style)
        ctx.fillStyle = "#F4A100";
        ctx.beginPath(); ctx.arc(sunX - 9, 62, 4, 0, Math.PI * 2); ctx.fill(); // ojo izq
        ctx.beginPath(); ctx.arc(sunX + 9, 62, 4, 0, Math.PI * 2); ctx.fill(); // ojo der
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.arc(sunX - 9, 62, 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(sunX + 9, 62, 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#F4A100";
        // Sonrisa
        ctx.beginPath();
        ctx.arc(sunX, 70, 10, 0.2, Math.PI - 0.2);
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#C17900";
        ctx.stroke();
    }

    // ── Nubes capa 2 — más rápidas ──
    ctx.fillStyle = currentLevel === 2 ? "rgba(255, 171, 145, 0.45)" : "rgba(255, 255, 255, 0.65)";
    let cloudOffset2 = (cameraX * 0.22) % canvas.width;
    let cloudSeeds2 = [130, 310, 490, 700];
    cloudSeeds2.forEach(cx => {
        let x = (cx - cloudOffset2 + canvas.width * 2) % (canvas.width + 160) - 80;
        drawCloud(ctx, x, 110, 0.7);
    });

    // ── Parallax mountains / canyon walls ──
    if (currentLevel === 2) {
        // Reddish-orange canyon walls / flat-topped mesas
        let hillOff = (cameraX * 0.18) % 360;
        ctx.fillStyle = "#7E3D2F";  // dark clay brown
        for (let i = -1; i < 4; i++) {
            let hx = i * 360 - hillOff;
            ctx.beginPath();
            ctx.moveTo(hx, GROUND_Y + 10);
            ctx.lineTo(hx + 80, GROUND_Y - 90);
            ctx.lineTo(hx + 280, GROUND_Y - 90);
            ctx.lineTo(hx + 360, GROUND_Y + 10);
            ctx.closePath();
            ctx.fill();
        }
        ctx.fillStyle = "#5C2B20";  // darker background layer
        let hillOff2 = (cameraX * 0.26) % 260;
        for (let i = -1; i < 5; i++) {
            let hx = i * 260 - hillOff2;
            ctx.beginPath();
            ctx.moveTo(hx, GROUND_Y + 14);
            ctx.lineTo(hx + 60, GROUND_Y - 50);
            ctx.lineTo(hx + 200, GROUND_Y - 50);
            ctx.lineTo(hx + 260, GROUND_Y + 14);
            ctx.closePath();
            ctx.fill();
        }
    } else {
        // Green Paramo hills
        let hillOff = (cameraX * 0.18) % 360;
        ctx.fillStyle = "#4A7C3F";  // verde páramo oscuro
        for (let i = -1; i < 4; i++) {
            let hx = i * 360 - hillOff;
            ctx.beginPath();
            ctx.arc(hx + 180, GROUND_Y + 10, 140, Math.PI, 0);
            ctx.fill();
        }
        ctx.fillStyle = "#3A6030";  // segunda capa, más oscura
        let hillOff2 = (cameraX * 0.26) % 260;
        for (let i = -1; i < 5; i++) {
            let hx = i * 260 - hillOff2;
            ctx.beginPath();
            ctx.arc(hx + 130, GROUND_Y + 14, 90, Math.PI, 0);
            ctx.fill();
        }
    }

    ctx.save();
    ctx.translate(-cameraX, 0);

    // Draw active ground particles (ambient & confetti)
    ambientParticles.forEach(p => {
        ctx.fillStyle = p.color;
        if (p.isConfetti) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.life * 0.08);
            ctx.fillRect(-p.size, -p.size / 2, p.size * 2, p.size);
            ctx.restore();
        } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size + 0.5, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    // ── GROUND ──
    // Soil base
    ctx.fillStyle = currentLevel === 2 ? "#A04000" : "#8D6239"; // red-orange clay vs dark brown dirt
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for (let x = 0; x <= LEVEL_WIDTH; x += 15) {
        ctx.lineTo(x, getGroundHeight(x));
    }
    ctx.lineTo(LEVEL_WIDTH, canvas.height);
    ctx.closePath();
    ctx.fill();

    // Ground surface crust
    ctx.strokeStyle = currentLevel === 2 ? "#D35400" : "#5E9E3E"; // bright orange crust vs green grass
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(0, getGroundHeight(0));
    for (let x = 0; x <= LEVEL_WIDTH; x += 15) {
        ctx.lineTo(x, getGroundHeight(x));
    }
    ctx.stroke();

    // Draw puddles (charcos de agua)
    puddles.forEach(pud => {
        let py = getGroundHeight(pud.x);
        ctx.fillStyle = "#4FA9E6";
        ctx.strokeStyle = "#2980B9";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(pud.x + pud.width/2, py, pud.width/2, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    });

    // ── VEGETATION (Frailejones / Wax Palms) ──
    frailejones.forEach(fr => {
        if (currentLevel === 2) {
            drawPalmaDeCera(ctx, fr.x, getGroundHeight(fr.x), fr.height, fr.scale);
        } else {
            drawFrailejón(ctx, fr.x, getGroundHeight(fr.x), fr.height, fr.hasFlower, fr.scale);
        }
    });

    // ── TEXTOS FLOTANTES de medición ppm ──
    bubbleFloatingTexts.forEach(ft => {
        ctx.save();
        ctx.font = "bold 9px 'Press Start 2P', monospace";
        ctx.fillStyle = `rgba(0, 100, 200, ${ft.timer / 45})`;
        ctx.shadowColor = "rgba(255,255,255,0.8)";
        ctx.shadowBlur = 3;
        ctx.fillText(ft.text, ft.x - 14, ft.y);
        ctx.restore();
    });

    // ── FAIRY CIRCLES (círculos de hadas) — colores vivos de día ──
    fairyCircles.forEach(circle => {
        // Zona amarilla viva sobre el suelo
        ctx.fillStyle = "rgba(241, 196, 15, 0.25)";
        ctx.fillRect(circle.x, GROUND_Y - 6, circle.width, 12);
        ctx.strokeStyle = "#E6AC00";
        ctx.lineWidth = 3;
        ctx.strokeRect(circle.x, GROUND_Y - 6, circle.width, 12);
        // Etiqueta
        ctx.font = "5px 'Press Start 2P'";
        ctx.fillStyle = "#7A5500";
        ctx.fillText("H₂", circle.x + circle.width/2 - 8, GROUND_Y - 10);

        // Burbujas doradas flotando hacia arriba
        if (circle.h2Level > 0) {
            for (let b = 0; b < 4; b++) {
                let bx = circle.x + 12 + (b * 22) + Math.sin(Date.now() / 150 + b) * 5;
                let by = GROUND_Y - 14 - ((Date.now() / 7 + b * 30) % 90);
                ctx.fillStyle = "#F1C40F";
                ctx.beginPath();
                ctx.arc(bx, by, 4 + b * 0.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "rgba(255,255,255,0.7)";
                ctx.beginPath();
                ctx.arc(bx - 1, by - 1, 1.2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    });

    // ── FRACTURAS / FALLAS TECTÓNICAS — rojo vivo de día ──
    fractures.forEach(frac => {
        ctx.fillStyle = "rgba(231, 76, 60, 0.3)";
        ctx.fillRect(frac.x, GROUND_Y - 6, frac.width, 12);
        ctx.strokeStyle = "#E74C3C";
        ctx.lineWidth = 3;
        let pulseOffset = Math.sin(Date.now() / 80) * 2;
        ctx.beginPath();
        ctx.moveTo(frac.x + 30 + pulseOffset, GROUND_Y + 6);
        ctx.lineTo(frac.x + 10, GROUND_Y + 100);
        ctx.moveTo(frac.x + 50 - pulseOffset, GROUND_Y + 6);
        ctx.lineTo(frac.x + 65, GROUND_Y + 80);
        ctx.stroke();
        // Etiqueta
        ctx.font = "5px 'Press Start 2P'";
        ctx.fillStyle = "#8B0000";
        ctx.fillText(translations[currentLang].faultLabel, frac.x + 12, GROUND_Y - 10);
    });

    // ── GEÓFONOS DESPLEGADOS — verde vivo ──
    geophones.forEach(geo => {
        // Base verde sólida
        ctx.fillStyle = "#27AE60";
        ctx.fillRect(geo.x - 7, geo.y - 12, 14, 12);
        ctx.fillStyle = "#2ECC71";
        ctx.fillRect(geo.x - 4, geo.y - 15, 8, 4);
        // Antena
        ctx.strokeStyle = "#27AE60";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(geo.x, geo.y - 15);
        ctx.lineTo(geo.x, geo.y - 28);
        ctx.stroke();
        // LED parpadeante
        let blinkColor = (Math.floor(Date.now() / 200) % 2 === 0) ? "#E74C3C" : "#2ECC71";
        ctx.fillStyle = blinkColor;
        ctx.beginPath();
        ctx.arc(geo.x, geo.y - 28, 4, 0, Math.PI * 2);
        ctx.fill();
    });

    // ── FRUTAS & CANISTERS — vivos como sprites de Flappy Bird ──
    fruits.forEach(fruit => {
        if (fruit.type === "canister") {
            // Dibujar taza de café caliente (tinto)
            ctx.save();
            ctx.fillStyle = "#E67E22"; // Taza color terracota/cerámica
            // Cuerpo de la taza
            ctx.beginPath();
            ctx.arc(fruit.x, fruit.y + 2, 7, 0, Math.PI);
            ctx.lineTo(fruit.x - 7, fruit.y - 4);
            ctx.lineTo(fruit.x + 7, fruit.y - 4);
            ctx.closePath();
            ctx.fill();
            
            // Asa/oreja de la taza
            ctx.strokeStyle = "#E67E22";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(fruit.x + 7, fruit.y - 1, 3.5, -Math.PI/2, Math.PI/2);
            ctx.stroke();

            // Líquido de café marrón oscuro
            ctx.fillStyle = "#5C3A21";
            ctx.beginPath();
            ctx.ellipse(fruit.x, fruit.y - 4, 6, 2, 0, 0, Math.PI * 2);
            ctx.fill();

            // Vapor de café caliente
            ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
            ctx.lineWidth = 1.5;
            let steamOffset = Math.sin(Date.now() / 150) * 1.5;
            ctx.beginPath();
            ctx.moveTo(fruit.x - 3, fruit.y - 7);
            ctx.quadraticCurveTo(fruit.x - 3 + steamOffset, fruit.y - 12, fruit.x - 1, fruit.y - 16);
            ctx.moveTo(fruit.x + 2, fruit.y - 7);
            ctx.quadraticCurveTo(fruit.x + 2 + steamOffset, fruit.y - 12, fruit.x + 4, fruit.y - 16);
            ctx.stroke();
            ctx.restore();
        } else {
            // Frutas: círculos vivos con sombra sólida
            let fruitColor = fruit.type === "cherry" ? "#E74C3C" : "#F1C40F";
            let shadowColor = fruit.type === "cherry" ? "#922B21" : "#D4AC0D";
            ctx.fillStyle = shadowColor;
            ctx.beginPath();
            ctx.arc(fruit.x + 2, fruit.y + 2, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = fruitColor;
            ctx.beginPath();
            ctx.arc(fruit.x, fruit.y, 9, 0, Math.PI * 2);
            ctx.fill();
            // Brillo
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.beginPath();
            ctx.arc(fruit.x - 3, fruit.y - 3, 3, 0, Math.PI * 2);
            ctx.fill();
            // Tallo
            ctx.strokeStyle = "#27AE60";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(fruit.x, fruit.y - 7);
            ctx.quadraticCurveTo(fruit.x + 4, fruit.y - 14, fruit.x + 8, fruit.y - 11);
            ctx.stroke();
        }
    });

    // DRAW EDUCATIONAL ROCK SAMPLES
    rockSamples.forEach(rock => {
        if (!rock.discovered) {
            // Glowing aura
            ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
            ctx.beginPath();
            ctx.arc(rock.x + 15, rock.y + 15, 30, 0, Math.PI * 2);
            ctx.fill();

            // Draw a beautiful multi-faceted crystalline structure
            ctx.fillStyle = rock.color;
            ctx.beginPath();
            ctx.moveTo(rock.x + 15, rock.y);
            ctx.lineTo(rock.x + 30, rock.y + 10);
            ctx.lineTo(rock.x + 25, rock.y + 25);
            ctx.lineTo(rock.x + 5, rock.y + 25);
            ctx.lineTo(rock.x, rock.y + 10);
            ctx.closePath();
            ctx.fill();

            // Facet highlight lines
            ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(rock.x + 15, rock.y);
            ctx.lineTo(rock.x + 15, rock.y + 25);
            ctx.moveTo(rock.x, rock.y + 10);
            ctx.lineTo(rock.x + 30, rock.y + 10);
            ctx.stroke();

            // Floating sign above undiscovered rock
            ctx.font = "6px 'Press Start 2P'";
            ctx.fillStyle = "#fbbf24";
            ctx.fillText(translations[currentLang].newRockLabel, rock.x - 22, rock.y - 12);
        } else {
            // Discovered rock stays as a beautiful faded crystal specimen on the ground
            ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
            ctx.beginPath();
            ctx.moveTo(rock.x + 15, rock.y + 10);
            ctx.lineTo(rock.x + 25, rock.y + 18);
            ctx.lineTo(rock.x + 20, rock.y + 25);
            ctx.lineTo(rock.x + 10, rock.y + 25);
            ctx.lineTo(rock.x + 5, rock.y + 18);
            ctx.closePath();
            ctx.fill();
        }
    });

    // ── OBSTÁCULOS / HAZARDS — colores contrastantes de día ──
    hazards.forEach(haz => {
        if (haz.type === "geyser") {
            // Base del géiser: rojo ladrillo
            ctx.fillStyle = "#C0392B";
            ctx.fillRect(haz.x, GROUND_Y - 16, haz.width, 16);
            ctx.fillStyle = "#E74C3C";
            ctx.fillRect(haz.x + 2, GROUND_Y - 14, haz.width - 4, 10);

            if (haz.isErupting) {
                // Columna de vapor viva
                let grad = ctx.createLinearGradient(haz.x, GROUND_Y - 130, haz.x, GROUND_Y);
                grad.addColorStop(0, "rgba(255,255,255,0)");
                grad.addColorStop(0.3, "rgba(249,115,22,0.7)");
                grad.addColorStop(0.7, "rgba(253,224,71,0.9)");
                grad.addColorStop(1, "#E74C3C");
                ctx.fillStyle = grad;
                ctx.fillRect(haz.x - 5, GROUND_Y - 130, haz.width + 10, 115);
                // Partículas de vapor
                ctx.fillStyle = "#FEF08A";
                for (let p = 0; p < 3; p++) {
                    ctx.beginPath();
                    ctx.arc(haz.x + Math.random()*haz.width, GROUND_Y - 30 - Math.random()*70, Math.random()*4+2, 0, Math.PI*2);
                    ctx.fill();
                }
            }
        } else if (haz.type === "spikes") {
            // Pinchos grises con contorno oscuro
            ctx.fillStyle = "#7F8C8D";
            ctx.beginPath();
            for(let s = 0; s < haz.width; s += 9) {
                ctx.moveTo(haz.x + s, GROUND_Y + 2);
                ctx.lineTo(haz.x + s + 4, GROUND_Y - 22);
                ctx.lineTo(haz.x + s + 8, GROUND_Y + 2);
            }
            ctx.fill();
            ctx.strokeStyle = "#2C3E50";
            ctx.lineWidth = 1;
            ctx.stroke();
        } else if (haz.type === "rock") {
            // Roca marrón con silueta definida
            ctx.fillStyle = "#795548";
            ctx.beginPath();
            ctx.moveTo(haz.x, GROUND_Y + 2);
            ctx.lineTo(haz.x + 8, GROUND_Y - 24);
            ctx.lineTo(haz.x + 22, GROUND_Y - 22);
            ctx.lineTo(haz.x + 30, GROUND_Y + 2);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = "#4E342E";
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    });

    // ── DINOSAURIOS — verdes vivos estilo Mario Bros ──
    dinosaurs.forEach(dino => {
        if (dino.active) {
            let walkCycle = Math.sin(Date.now() / 150) * 8;
            // Cuerpo verde vivo
            ctx.fillStyle = "#27AE60";
            ctx.fillRect(dino.x - 10, dino.y - 32, 32, 24);
            // Vientre más claro
            ctx.fillStyle = "#A9DFBF";
            ctx.fillRect(dino.x - 4, dino.y - 26, 18, 14);
            // Pinchos dorsales dorados
            ctx.fillStyle = "#F1C40F";
            for(let s = 0; s < 3; s++) {
                ctx.beginPath();
                ctx.moveTo(dino.x - 8 + s*10, dino.y - 32);
                ctx.lineTo(dino.x - 3 + s*10, dino.y - 42);
                ctx.lineTo(dino.x + 2 + s*10, dino.y - 32);
                ctx.fill();
            }
            // Cabeza
            ctx.fillStyle = "#27AE60";
            ctx.fillRect(dino.x + 15, dino.y - 42, 18, 18);
            // Ojo
            ctx.fillStyle = "#000";
            ctx.fillRect(dino.x + 26, dino.y - 38, 4, 4);
            ctx.fillStyle = "#fff";
            ctx.fillRect(dino.x + 27, dino.y - 37, 2, 2);
            // Cola
            ctx.fillStyle = "#1E8449";
            ctx.beginPath();
            ctx.moveTo(dino.x - 10, dino.y - 28);
            ctx.lineTo(dino.x - 30, dino.y - 10 + walkCycle/2);
            ctx.lineTo(dino.x - 10, dino.y - 18);
            ctx.fill();
            // Patas
            ctx.fillStyle = "#1E8449";
            ctx.fillRect(dino.x - 6, dino.y - 8, 7, 14);
            ctx.fillRect(dino.x + 12, dino.y - 8, 7, 14);
            // Silla naranja
            ctx.fillStyle = "#E67E22";
            ctx.fillRect(dino.x + 1, dino.y - 34, 14, 4);
        }
    });

    // ── TIENDA DE BARRIO AL ESTILO COLOMBIANO (LA ESQUINA DE LA FORTUNA) ──
    const shopX = drillRig.x;
    const shopY = GROUND_Y;
    
    ctx.save();
    // 1. Paredes de la tienda (Estructura principal)
    ctx.fillStyle = currentLevel === 2 ? "#D35400" : "#F5F5F5"; // Adobe/Terracota vs Blanco
    ctx.fillRect(shopX, shopY - 100, 130, 100);
    ctx.strokeStyle = "#2C2C2C";
    ctx.lineWidth = 3;
    ctx.strokeRect(shopX, shopY - 100, 130, 100);

    // Zócalo de color rojo (típico de fachadas colombianas)
    ctx.fillStyle = currentLevel === 2 ? "#873600" : "#C0392B"; // Marrón arcilla vs Rojo
    ctx.fillRect(shopX + 1.5, shopY - 20, 127, 18.5);
    ctx.beginPath();
    ctx.moveTo(shopX, shopY - 20);
    ctx.lineTo(shopX + 130, shopY - 20);
    ctx.strokeStyle = "#2C2C2C";
    ctx.lineWidth = 3;
    ctx.stroke();

    // 2. Puerta abierta grande mostrando estantería
    ctx.fillStyle = "#3E2723"; // Interior oscuro
    ctx.fillRect(shopX + 15, shopY - 70, 45, 70);
    ctx.strokeStyle = "#2C2C2C";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(shopX + 15, shopY - 70, 45, 70);

    // Estanterías con productos de colores
    ctx.fillStyle = "#D7CCC8"; // Madera de estantes
    ctx.fillRect(shopX + 18, shopY - 50, 39, 3);
    ctx.fillRect(shopX + 18, shopY - 30, 39, 3);
    
    // Mini píxeles de productos
    ctx.fillStyle = "#F1C40F"; ctx.fillRect(shopX + 22, shopY - 57, 4, 7); // Papas Fritas
    ctx.fillStyle = "#E74C3C"; ctx.fillRect(shopX + 28, shopY - 55, 3, 5); // Gaseosa roja
    ctx.fillStyle = "#2ECC71"; ctx.fillRect(shopX + 35, shopY - 58, 5, 8); // Bolsa
    ctx.fillStyle = "#3498DB"; ctx.fillRect(shopX + 24, shopY - 37, 4, 7); // Tarro azul
    ctx.fillStyle = "#E67E22"; ctx.fillRect(shopX + 32, shopY - 38, 5, 8); // Paquete naranja

    // Ventana con rejas de seguridad
    ctx.fillStyle = "#1E272C";
    ctx.fillRect(shopX + 75, shopY - 60, 40, 35);
    ctx.strokeStyle = "#2C2C2C";
    ctx.strokeRect(shopX + 75, shopY - 60, 40, 35);
    ctx.strokeStyle = "#7F8C8D";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let wx = 83; wx < 115; wx += 8) {
        ctx.moveTo(shopX + wx, shopY - 60);
        ctx.lineTo(shopX + wx, shopY - 25);
    }
    ctx.stroke();

    // 3. Techo de teja roja que sobresale
    ctx.fillStyle = "#B03A2E"; // Rojo arcilla
    ctx.beginPath();
    ctx.moveTo(shopX - 15, shopY - 100);
    ctx.lineTo(shopX + 145, shopY - 100);
    ctx.lineTo(shopX + 135, shopY - 85);
    ctx.lineTo(shopX - 5, shopY - 85);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#2C2C2C";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Toldo frontal
    let awningWidth = 160;
    let awningStart = shopX - 15;
    ctx.fillStyle = currentLevel === 2 ? "#8E44AD" : "#F1C40F"; // Morado vs Amarillo
    ctx.fillRect(awningStart, shopY - 85, awningWidth, 12);
    ctx.fillStyle = currentLevel === 2 ? "#E67E22" : "#C0392B"; // Naranja vs Rojo
    for (let rx = 0; rx < awningWidth; rx += 20) {
        ctx.fillRect(awningStart + rx, shopY - 85, 10, 12);
    }
    ctx.strokeStyle = "#2C2C2C";
    ctx.lineWidth = 2;
    ctx.strokeRect(awningStart, shopY - 85, awningWidth, 12);

    // 4. Letrero comercial de la tienda
    ctx.fillStyle = "#FFF";
    ctx.fillRect(shopX + 10, shopY - 95, 110, 14);
    ctx.strokeStyle = "#2C2C2C";
    ctx.lineWidth = 2;
    ctx.strokeRect(shopX + 10, shopY - 95, 110, 14);
    
    ctx.font = "bold 5px 'Press Start 2P', monospace";
    ctx.fillStyle = "#E74C3C";
    ctx.textAlign = "center";
    ctx.fillText("SANDRISTAS", shopX + 65, shopY - 86);
    ctx.textAlign = "left";

    // 5. Mesas y sillas plásticas afuera
    // Silla izquierda
    ctx.fillStyle = currentLevel === 2 ? "#F1C40F" : "#FFFFFF"; // Amarillo plástico vs Blanco
    ctx.fillRect(shopX - 52, shopY - 12, 10, 12); // Base asiento
    ctx.fillRect(shopX - 52, shopY - 22, 10, 3);  // Espaldar
    ctx.strokeStyle = "#2C2C2C";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(shopX - 52, shopY - 12, 10, 12);
    ctx.strokeRect(shopX - 52, shopY - 22, 10, 3);
    
    // Mesa de plástico
    ctx.fillStyle = currentLevel === 2 ? "#E67E22" : "#27AE60"; // Naranja/Marrón vs Verde
    ctx.fillRect(shopX - 35, shopY - 15, 20, 3); // Tapa
    ctx.fillRect(shopX - 27, shopY - 12, 4, 12); // Pata central
    ctx.strokeRect(shopX - 35, shopY - 15, 20, 3);
    ctx.strokeRect(shopX - 27, shopY - 12, 4, 12);

    // Silla derecha
    ctx.fillStyle = currentLevel === 2 ? "#F1C40F" : "#FFFFFF";
    ctx.fillRect(shopX - 10, shopY - 12, 10, 12);
    ctx.fillRect(shopX - 10, shopY - 22, 10, 3);
    ctx.strokeRect(shopX - 10, shopY - 12, 10, 12);
    ctx.strokeRect(shopX - 10, shopY - 22, 10, 3);

    // 6. Indicador de texto al llegar
    if (player.x > shopX - 80 && player.x < shopX + 180) {
        const discoveredCount = rockSamples.filter(r => r.discovered).length;
        if (discoveredCount < 5) {
            ctx.fillStyle = "rgba(0,0,0,0.75)";
            ctx.fillRect(shopX + 10, shopY - 122, 110, 15);
            ctx.strokeStyle = "#FFF";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(shopX + 10, shopY - 122, 110, 15);
            
            ctx.font = "bold 4.5px 'Press Start 2P', monospace";
            ctx.fillStyle = "#FFF";
            ctx.fillText("BUSCA LAS 5 MUESTRAS", shopX + 14, shopY - 112);
        }
    }
    ctx.restore();

    // DRAW THE PLAYER
    let px = player.x;
    let py = player.y;
    let pw = player.width;
    let ph = player.height;

    // ── VEHÍCULOS ──
    if (player.vehicle === "skateboard") {
        ctx.save();
        // Sombra
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.beginPath();
        ctx.ellipse(px + pw/2, py + ph, 22, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Tabla del skate
        ctx.fillStyle = "#E67E22"; // Color madera retro
        ctx.strokeStyle = "#2C2C2C";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(px + pw/2 - 20, py + ph - 4, 40, 5);
        ctx.fill();
        ctx.stroke();

        // Ejes y ruedas
        ctx.fillStyle = "#F5F5F5";
        ctx.strokeStyle = "#2C2C2C";
        ctx.lineWidth = 1.5;
        // Rueda izquierda
        ctx.beginPath();
        ctx.arc(px + pw/2 - 12, py + ph + 3, 4, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        // Rueda derecha
        ctx.beginPath();
        ctx.arc(px + pw/2 + 12, py + ph + 3, 4, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        ctx.restore();
    }

    if (player.vehicle === "dinosaur") {
        ctx.save();
        let walkCycle = Math.sin(Date.now() / 150) * 8;
        let dx = px;
        let dy = py + ph;
        
        ctx.translate(dx + pw/2, dy - 12);
        if (player.direction < 0) {
            ctx.scale(-1, 1);
        }
        
        // Cuerpo verde vivo
        ctx.fillStyle = "#27AE60";
        ctx.fillRect(-16, -10, 32, 24);
        // Vientre más claro
        ctx.fillStyle = "#A9DFBF";
        ctx.fillRect(-10, -4, 18, 14);
        // Pinchos dorsales dorados
        ctx.fillStyle = "#F1C40F";
        for(let s = 0; s < 3; s++) {
            ctx.beginPath();
            ctx.moveTo(-14 + s*10, -10);
            ctx.lineTo(-9 + s*10, -20);
            ctx.lineTo(-4 + s*10, -10);
            ctx.fill();
        }
        // Cabeza
        ctx.fillStyle = "#27AE60";
        ctx.fillRect(9, -20, 18, 18);
        // Ojo
        ctx.fillStyle = "#000";
        ctx.fillRect(20, -16, 4, 4);
        ctx.fillStyle = "#fff";
        ctx.fillRect(21, -15, 2, 2);
        // Cola
        ctx.fillStyle = "#1E8449";
        ctx.beginPath();
        ctx.moveTo(-16, -6);
        ctx.lineTo(-36, 12 + walkCycle/2);
        ctx.lineTo(-16, 4);
        ctx.fill();
        // Patas
        ctx.fillStyle = "#1E8449";
        ctx.fillRect(-12, 14, 7, 14);
        ctx.fillRect(6, 14, 7, 14);
        // Silla naranja
        ctx.fillStyle = "#E67E22";
        ctx.fillRect(-5, -12, 14, 4);
        
        ctx.restore();
    }

    // ── SNIFFER TUBE ──
    if (player.isSniffing) {
        ctx.strokeStyle = "#F1C40F";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(px + pw/2, py + ph/2);
        ctx.lineTo(px + (player.direction * 28), py + ph + 6);
        ctx.stroke();
        ctx.lineCap = "butt";
        // Punta de la sonda
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#F1C40F";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(px + (player.direction * 28), py + ph + 6, 5, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        // Gas sampleando
        ctx.fillStyle = "rgba(241,196,15,0.4)";
        ctx.beginPath();
        ctx.arc(px + (player.direction * 28), py + ph + 6, 9, 0, Math.PI * 2);
        ctx.fill();
    }

    // ══════════════════════════════════════════════════
    // GEÓLOGO FLAPPY-STYLE — sprite redondo y expresivo
    // ══════════════════════════════════════════════════
    drawGeologist(ctx, px, py, player.direction, selectedChar);

    ctx.restore();

    // ── RAIN (Lluvia de atardecer en Nivel 2) ──
    if (currentLevel === 2) {
        if (!window._rainDrops || window._rainDrops.length === 0) {
            window._rainDrops = [];
            for (let i = 0; i < 80; i++) {
                window._rainDrops.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    speed: 4 + Math.random() * 4,
                    length: 12 + Math.random() * 10
                });
            }
        }
        ctx.save();
        ctx.strokeStyle = "rgba(174, 214, 241, 0.45)";
        ctx.lineWidth = 1.2;
        window._rainDrops.forEach(drop => {
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x - 3, drop.y + drop.length);
            ctx.stroke();
            drop.y += drop.speed;
            if (drop.y > canvas.height + 20) {
                drop.y = -20;
                drop.x = Math.random() * canvas.width;
            }
        });
        ctx.restore();
    } else {
        window._rainDrops = [];
    }

    // ── HUD EN CANVAS: solo barra de energía (el resto va en DOM) ──
    // Fondo de la barra
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(10, canvas.height - 22, canvas.width - 20, 12);
    // Energía
    let energyColor = player.energy > 50 ? "#27AE60" : (player.energy > 25 ? "#F39C12" : "#E74C3C");
    ctx.fillStyle = energyColor;
    ctx.fillRect(10, canvas.height - 22, ((player.energy / 100) * (canvas.width - 20)), 12);
    // Borde
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, canvas.height - 22, canvas.width - 20, 12);
    // Texto
    ctx.font = "7px 'Press Start 2P'";
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "#000"; ctx.shadowOffsetX = 1; ctx.shadowOffsetY = 1;
    ctx.fillText(`${translations[currentLang].energyLabel}${Math.floor(player.energy)}%`, 18, canvas.height - 13);
    ctx.shadowColor = "transparent";

    // Actualizar HUD DOM (score boxes)
    updateHUD();

    // ── MODAL ENCICLOPEDIA GEOLÓGICA — estilo panel arcade blanco ──
    if (activeEducationalModal && activeRockSample) {
        // Overlay semitransparente cielo
        ctx.fillStyle = "rgba(112, 197, 206, 0.88)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Panel blanco con borde oscuro grueso
        let mx = 100, my = 80, mw = 600, mh = 320;
        // Sombra del panel
        ctx.fillStyle = "#2C2C2C";
        ctx.fillRect(mx + 5, my + 5, mw, mh);
        // Panel principal
        ctx.fillStyle = "#FFFDE7";
        ctx.fillRect(mx, my, mw, mh);
        ctx.strokeStyle = "#2C2C2C";
        ctx.lineWidth = 4;
        ctx.strokeRect(mx, my, mw, mh);

        // Banda de encabezado verde
        ctx.fillStyle = "#5E9E3E";
        ctx.fillRect(mx, my, mw, 48);
        ctx.font = "9px 'Press Start 2P'";
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#000"; ctx.shadowOffsetX = 2; ctx.shadowOffsetY = 2;
        ctx.fillText("🔬 REGISTRO GEOLÓGICO", mx + 24, my + 30);
        ctx.shadowColor = "transparent";

        // Nombre de la muestra
        ctx.font = "bold 15px 'Outfit', sans-serif";
        ctx.fillStyle = "#1A1A1A";
        ctx.fillText(activeRockSample.name, mx + 24, my + 80);

        // Mini muestra cristalina con color del rock
        ctx.fillStyle = activeRockSample.color;
        ctx.strokeStyle = "#2C2C2C";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mx + mw - 65, my + 62);
        ctx.lineTo(mx + mw - 38, my + 78);
        ctx.lineTo(mx + mw - 42, my + 108);
        ctx.lineTo(mx + mw - 78, my + 108);
        ctx.lineTo(mx + mw - 82, my + 78);
        ctx.closePath();
        ctx.fill(); ctx.stroke();

        // Línea divisoria
        ctx.strokeStyle = "#5E9E3E";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mx + 24, my + 98);
        ctx.lineTo(mx + mw - 24, my + 98);
        ctx.stroke();

        // Propiedades geológicas
        ctx.font = "11px 'Inter', sans-serif";
        let pyLine = my + 130;
        activeRockSample.properties.forEach((prop, index) => {
            ctx.fillStyle = "#27AE60";
            ctx.fillText("▶", mx + 28, pyLine + index * 32);
            ctx.fillStyle = "#1A1A1A";
            ctx.fillText(prop, mx + 50, pyLine + index * 32);
        });

        // Prompt parpadeante estilo Flappy Facho
        ctx.font = "7px 'Press Start 2P'";
        let pulseColor = (Math.floor(Date.now() / 400) % 2 === 0) ? "#2C2C2C" : "rgba(44,44,44,0.4)";
        ctx.fillStyle = pulseColor;
        ctx.fillText("PRESIONA ESPACIO O ENTER PARA CONTINUAR", mx + 55, my + mh - 20);
    }
}

// ── Helper: dibujar nube blanca ──
function drawCloud(ctx, x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.arc(0,   0, 20, Math.PI, 0);
    ctx.arc(25, -8, 26, Math.PI, 0);
    ctx.arc(55,  0, 18, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    // Contorno sutil
    ctx.strokeStyle = "rgba(200,220,255,0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
}

// ═══════════════════════════════════════════════════════════
// FRAILEJÓN — planta icónica del páramo colombiano (Espeletia)
// ═══════════════════════════════════════════════════════════
function drawFrailejón(ctx, x, groundY, height, hasFlower, scale) {
    ctx.save();
    ctx.translate(x, groundY);
    ctx.scale(scale, scale);

    let trunkH = height;
    let trunkW = 14;

    // Sombra en el suelo
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.beginPath();
    ctx.ellipse(0, 4, 18, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tronco cubierto de hojas secas (marrón característico)
    ctx.fillStyle = "#6D4C2A";
    ctx.strokeStyle = "#3E2A10";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(-trunkW/2, -trunkH, trunkW, trunkH, 4);
    ctx.fill();
    ctx.stroke();

    // Textura de hojas muertas en el tronco
    ctx.fillStyle = "#8D6239";
    for (let ty = -trunkH + 6; ty < 0; ty += 8) {
        ctx.fillRect(-trunkW/2 + 1, ty, trunkW - 2, 3);
    }

    // Roseta de hojas verdes plateadas en la cima
    let leafCount = 9;
    let leafLen = 22;
    for (let li = 0; li < leafCount; li++) {
        let angle = (li / leafCount) * Math.PI * 2;
        let lx = Math.cos(angle) * leafLen;
        let ly = Math.sin(angle) * leafLen * 0.55;

        ctx.save();
        ctx.translate(0, -trunkH);
        ctx.rotate(angle);

        // Hoja principal (plateada/verde)
        ctx.fillStyle = li % 2 === 0 ? "#9DB87A" : "#B8CC8A";
        ctx.strokeStyle = "#5A7A40";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(leafLen * 0.5, 0, leafLen * 0.52, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Línea central de la hoja
        ctx.strokeStyle = "rgba(90,120,60,0.6)";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(leafLen, 0);
        ctx.stroke();

        ctx.restore();
    }

    // Centro de la roseta
    ctx.fillStyle = "#C8DFA0";
    ctx.strokeStyle = "#5A7A40";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, -trunkH, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Flor amarilla (si tiene)
    if (hasFlower) {
        let stalkH = 28;
        // Tallo floral
        ctx.strokeStyle = "#6A8040";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(0, -trunkH - 2);
        ctx.lineTo(0, -trunkH - stalkH);
        ctx.stroke();

        // Pétalos amarillos
        let petalCount = 8;
        let petalLen = 10;
        ctx.fillStyle = "#F4D03F";
        ctx.strokeStyle = "#C7A800";
        ctx.lineWidth = 1;
        for (let pi = 0; pi < petalCount; pi++) {
            let pa = (pi / petalCount) * Math.PI * 2;
            ctx.save();
            ctx.translate(0, -trunkH - stalkH);
            ctx.rotate(pa);
            ctx.beginPath();
            ctx.ellipse(petalLen * 0.55, 0, petalLen * 0.55, 3.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
        // Centro dorado
        ctx.fillStyle = "#E67E22";
        ctx.strokeStyle = "#A04000";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, -trunkH - stalkH, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    ctx.restore();
}

// ═══════════════════════════════════════════════════════════
// PALMA DE CERA — planta nacional de Colombia (Valle de Cocora)
// ═══════════════════════════════════════════════════════════
function drawPalmaDeCera(ctx, x, groundY, height, scale) {
    ctx.save();
    ctx.translate(x, groundY);
    ctx.scale(scale, scale);

    // Las palmas de cera son extremadamente altas
    let trunkH = height * 1.8;
    let trunkW = 5.5;

    // Sombra
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.beginPath();
    ctx.ellipse(0, 4, 11, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tronco blanquecino/grisáceo
    ctx.fillStyle = "#F2F4F4";
    ctx.strokeStyle = "#7F8C8D";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(-trunkW/2, -trunkH, trunkW, trunkH, 1.5);
    ctx.fill();
    ctx.stroke();

    // Anillos oscuros en el tronco
    ctx.strokeStyle = "#BDC3C7";
    ctx.lineWidth = 0.8;
    for (let ty = -trunkH + 8; ty < 0; ty += 12) {
        ctx.beginPath();
        ctx.moveTo(-trunkW/2, ty);
        ctx.lineTo(trunkW/2, ty);
        ctx.stroke();
    }

    // Base de tierra/raiz
    ctx.fillStyle = "#5D4037";
    ctx.fillRect(-trunkW/2 - 1, -4, trunkW + 2, 4);

    // Penacho de hojas en el ápice
    ctx.save();
    ctx.translate(0, -trunkH);
    ctx.fillStyle = "#1E8449";
    ctx.strokeStyle = "#145A32";
    ctx.lineWidth = 0.8;

    let leafCount = 8;
    for (let i = 0; i < leafCount; i++) {
        let angle = (i / leafCount) * Math.PI * 2 + (Date.now() / 900 * 0.15); // oscilación suave por el viento
        ctx.save();
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(8, 2, 10, 2.5, 0.18, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    ctx.restore();

    ctx.restore();
}

// ═══════════════════════════════════════════════════════════
// GEÓLOGO — sprite estilo Flappy Facho: redondo, expresivo,
// con contornos negros y colores colombianos.
// ═══════════════════════════════════════════════════════════
function drawGeologist(ctx, px, py, dir, charType) {
    ctx.save();

    if (player.vehicle === "dinosaur") {
        py -= 14;
    }

    // Si está entrando a la tienda, se desvanece gradualmente
    if (player.enteringShop) {
        let alpha = Math.max(0, Math.min(1, player.celebrationTimer / 90));
        ctx.globalAlpha = alpha;
    }

    if (gameState === "gameover") {
        ctx.translate(px + 12, py + 40);
        ctx.rotate(dir > 0 ? Math.PI / 2 : -Math.PI / 2);
        ctx.translate(-(px + 12), -(py + 40));
    }

    const isMale      = charType === 'male';
    const shirtColor  = isMale ? '#E74C3C' : '#E91E8B';
    const hairColor   = '#6D3B1E';
    const vestColor   = '#1565C0';
    const helmetColor = '#F5F5F5';
    const skinColor   = '#FFCBA4';
    const outline     = '#2C2C2C';

    let cx    = px + 12;
    let headY = py + 8;

    // Sombra en el suelo
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.beginPath();
    ctx.ellipse(cx, py + 50, 14, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // MOCHILA
    let bpX = dir > 0 ? px - 4 : px + 20;
    ctx.fillStyle = "#795548"; ctx.strokeStyle = outline; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(bpX, py + 16, 7, 16, 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#6D4C41"; ctx.fillRect(bpX + 1, py + 20, 5, 9);

    // BOTAS
    ctx.fillStyle = "#4E342E"; ctx.strokeStyle = outline; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(px, py + 42, 11, 7, 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(px + 13, py + 42, 11, 7, 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#6D4C41";
    ctx.beginPath(); ctx.roundRect(px + 1, py + 34, 9, 10, 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(px + 14, py + 34, 9, 10, 2); ctx.fill(); ctx.stroke();

    // PANTALON
    ctx.fillStyle = "#BF8A30"; ctx.strokeStyle = outline; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(px + 3, py + 28, 18, 8, 2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = "rgba(0,0,0,0.25)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx, py + 28); ctx.lineTo(cx, py + 36); ctx.stroke();

    // CUERPO / CHALECO
    ctx.fillStyle = vestColor; ctx.strokeStyle = outline; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(px + 2, py + 14, 20, 16, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = shirtColor;
    ctx.beginPath(); ctx.roundRect(px + 8, py + 14, 8, 16, 2); ctx.fill();
    // Brazos
    ctx.fillStyle = vestColor; ctx.strokeStyle = outline; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(px - 3, py + 15, 6, 12, 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(px + 21, py + 15, 6, 12, 2); ctx.fill(); ctx.stroke();
    // Manos
    ctx.fillStyle = skinColor;
    ctx.beginPath(); ctx.arc(px, py + 27, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(px + 24, py + 27, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    // Bolsillos
    ctx.fillStyle = "#0D47A1"; ctx.strokeStyle = outline; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(px + 3, py + 20, 5, 5, 1); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(px + 16, py + 20, 5, 5, 1); ctx.fill(); ctx.stroke();

    // CUELLO
    ctx.fillStyle = skinColor; ctx.strokeStyle = outline; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(cx - 4, py + 9, 8, 7, 2); ctx.fill(); ctx.stroke();

    // ── CABELLO (diferenciado por genero) ──
    if (!isMale) {
        // HERA: mechones que caen a los lados desde debajo del casco
        ctx.strokeStyle = hairColor;
        ctx.lineCap = 'round';

        // Mechon izquierdo (3 lineas curvas que bajan)
        ctx.lineWidth = 5;
        ctx.strokeStyle = hairColor;
        ctx.beginPath();
        ctx.moveTo(cx - 9, headY + 3);
        ctx.quadraticCurveTo(cx - 16, headY + 14, cx - 14, headY + 24);
        ctx.stroke();

        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx - 11, headY + 4);
        ctx.quadraticCurveTo(cx - 20, headY + 16, cx - 17, headY + 28);
        ctx.stroke();

        // Mechon derecho (espejo)
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(cx + 9, headY + 3);
        ctx.quadraticCurveTo(cx + 16, headY + 14, cx + 14, headY + 24);
        ctx.stroke();

        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx + 11, headY + 4);
        ctx.quadraticCurveTo(cx + 20, headY + 16, cx + 17, headY + 28);
        ctx.stroke();

        ctx.lineCap = 'butt';
    } else {
        // HADES: pelo corto masculino
        ctx.fillStyle = hairColor; ctx.strokeStyle = outline; ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, headY - 5, 12, Math.PI + 0.5, Math.PI * 2 - 0.5);
        ctx.fill(); ctx.stroke();
    }

    // CARA
    ctx.fillStyle = skinColor; ctx.strokeStyle = outline; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, headY, 12, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // OJOS (grandes, expresivos - mismo para ambos)
    let eyeX = dir > 0 ? cx + 4 : cx - 4;
    ctx.fillStyle = '#fff'; ctx.strokeStyle = outline; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(eyeX, headY - 1, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#1A1A1A';
    ctx.beginPath(); ctx.arc(eyeX + (dir > 0 ? 1 : -1), headY - 0.5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(eyeX + (dir > 0 ? 1.8 : -1.8), headY - 1.8, 1.2, 0, Math.PI * 2); ctx.fill();

    // Sonrisa
    ctx.strokeStyle = "#8B4513"; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx + (dir > 0 ? 1 : -1), headY + 4, 4, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // CASCO
    ctx.fillStyle = helmetColor; ctx.strokeStyle = outline; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, headY - 2, 13, Math.PI, 0); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#D0D0D0"; ctx.strokeStyle = outline; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.rect(cx - 14, headY - 2, 28, 4); ctx.fill(); ctx.stroke();

    // Linterna
    let isLampOn = (Math.floor(Date.now() / 300) % 2 === 0);
    let lampX = dir > 0 ? cx + 7 : cx - 7;
    ctx.fillStyle = isLampOn ? '#FFFDE7' : '#FFF176';
    ctx.strokeStyle = outline; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(lampX, headY - 8, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    if (isLampOn) {
        ctx.fillStyle = "rgba(255, 253, 180, 0.18)";
        ctx.beginPath();
        ctx.moveTo(lampX + dir * 4, headY - 8);
        ctx.lineTo(lampX + dir * 55, headY - 20);
        ctx.lineTo(lampX + dir * 55, headY + 4);
        ctx.closePath(); ctx.fill();
    }

    ctx.restore();
}

// MAIN CORE LOOP
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start Bucle
setLanguage('es');
gameLoop();
