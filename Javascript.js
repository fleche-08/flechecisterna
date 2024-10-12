// game.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Fonction de rendu
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas
    ctx.fillStyle = 'green'; // Couleur du tank
    ctx.fillRect(100, 100, 40, 20); // Dessiner le tank à une position fixe
}

// Démarrer le rendu
render();
