// Variables pour le tank
let tankPosition = { x: 400, y: 300 }; // Position initiale au centre du canvas
const tankSpeed = 5;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playButton = document.getElementById('playButton');

// Fonction d'initialisation
function setup() {
    playButton.addEventListener("click", startGame); // Écoute le clic sur le bouton "Jouer"
}

// Démarrer le jeu
function startGame() {
    playButton.style.display = 'none'; // Cacher le bouton "Jouer"
    document.getElementById("welcomeText").style.display = 'none'; // Cacher le texte de bienvenue
    canvas.style.display = 'block'; // Afficher le canvas
    document.addEventListener("keydown", handleKeyPress); // Activer les contrôles
    requestAnimationFrame(gameLoop); // Lancer la boucle de jeu

    // Pour vérifier si la fonction est appelée
    console.log("Le jeu a commencé !");
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

// Initialisation
setup();

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve les fichiers statiques
app.use(express.static('public')); // Assure-toi que c'est bien le nom du dossier

// Autres configurations et routes ici...

