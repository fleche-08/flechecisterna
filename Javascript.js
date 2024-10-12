const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let tanks = []; // Pour stocker les tanks des joueurs
let bullets = []; // Pour stocker les projectiles

const socket = io();

class Tank {
    constructor(id, x, y, angle) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.angle = angle;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = 'green'; // Couleur du tank
        ctx.fillRect(-25, -15, 50, 30); // Dessin du tank
        ctx.restore();
    }

    update(data) {
        this.x = data.x;
        this.y = data.y;
        this.angle = data.angle;
    }
}

class Bullet {
    constructor(id, x, y, angle) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 5; // Vitesse de la balle
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = 'red'; // Couleur de la balle
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Fonction pour dessiner tout
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    tanks.forEach(tank => tank.draw());
    bullets.forEach(bullet => bullet.draw());
}

// Boucle de jeu
function gameLoop() {
    draw();
    bullets.forEach(bullet => bullet.update());
    requestAnimationFrame(gameLoop);
}

// Initialisation du jeu
socket.on('init', (data) => {
    tanks = data.tanks.map(t => new Tank(t.id, t.x, t.y, t.angle));
});

socket.on('newTank', (tankData) => {
    tanks.push(new Tank(tankData.id, tankData.x, tankData.y, tankData.angle));
});

socket.on('removeTank', (id) => {
    tanks = tanks.filter(tank => tank.id !== id);
});

socket.on('updateTank', (tankData) => {
    const tank = tanks.find(t => t.id === tankData.id);
    if (tank) {
        tank.update(tankData);
    }
});

socket.on('newBullet', (bulletData) => {
    bullets.push(new Bullet(bulletData.id, bulletData.x, bulletData.y, bulletData.angle));
});

// Gestion des contrôles
document.addEventListener('keydown', (event) => {
    let dx = 0;
    let dy = 0;

    if (event.key === 'z') { // Avancer
        dy = -5;
    }
    if (event.key === 's') { // Reculer
        dy = 5;
    }
    if (event.key === 'q') { // Tourner à gauche
        // Note : implémenter une logique de rotation
    }
    if (event.key === 'd') { // Tourner à droite
        // Note : implémenter une logique de rotation
    }

    // Émettre les mouvements
    socket.emit('move', { dx, dy, angle: tanks[0]?.angle });
});

// Gestion de la souris pour viser et tirer
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculer l'angle vers la souris
    if (tanks.length > 0) {
        const tank = tanks[0]; // Le tank du joueur
        const dx = mouseX - tank.x;
        const dy = mouseY - tank.y;
        tank.angle = Math.atan2(dy, dx);
    }
});

canvas.addEventListener('click', () => {
    socket.emit('fire');
});

// Initialisation et démarrage de la boucle de jeu
gameLoop();
