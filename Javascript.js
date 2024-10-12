// game.js

// Variables pour le tank
let tankPosition = { x: 400, y: 300 }; // Position initiale au centre du canvas
const tankSpeed = 5;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Fonction d'initialisation
function setup() {
    console.log("Le jeu est prêt !");
    document.addEventListener("keydown", handleKeyPress);
    requestAnimationFrame(gameLoop); // Lancer la boucle de jeu
}

// Fonction de gestion des touches
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
}

// Fonction principale de la boucle de jeu
function gameLoop() {
    update(); // Mettre à jour la logique du jeu
    render(); // Dessiner le tank
    requestAnimationFrame(gameLoop); // Redémarrer la boucle
}

// Fonction de mise à jour (logique du jeu)
function update() {
    // Ici, vous pouvez ajouter la logique pour gérer les collisions ou d'autres éléments de jeu
}

// Fonction de rendu (dessin)
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas
    ctx.fillStyle = 'green'; // Couleur du tank
    ctx.fillRect(tankPosition.x, tankPosition.y, 40, 20); // Dessiner le tank
}

// Démarrer le jeu
setup();
