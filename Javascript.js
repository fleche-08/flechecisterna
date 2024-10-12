// game.js

// Variables pour le tank
let tankPosition = { x: 100, y: 100 };
const tankSpeed = 5;

function setup() {
    console.log("Le jeu est prêt !");
    document.addEventListener("keydown", handleKeyPress);
    // Initialiser le canvas ou d'autres éléments de jeu ici
}

function handleKeyPress(event) {
    switch (event.key) {
        case "z": // Avancer
            tankPosition.y -= tankSpeed;
            break;
        case "s": // Reculer
            tankPosition.y += tankSpeed;
            break;
        case "q": // Gauche
            tankPosition.x -= tankSpeed;
            break;
        case "d": // Droite
            tankPosition.x += tankSpeed;
            break;
    }
    console.log(`Position du tank : ${tankPosition.x}, ${tankPosition.y}`);
}

setup();
