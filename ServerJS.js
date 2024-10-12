// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve les fichiers statiques
app.use(express.static('public'));

let tanks = [];
let bullets = [];

io.on('connection', (socket) => 
console.log("Le script game.js est chargé."); // Message pour confirmer que le JS est chargé


    // Ajouter un nouveau tank
    const newTank = { id: socket.id, x: 100, y: 100, angle: 0 };
    tanks.push(newTank);

    // Envoyer la liste des tanks au nouveau joueur
    socket.emit('init', { tanks });

    // Envoyer les tanks aux autres joueurs
    socket.broadcast.emit('newTank', newTank);

    socket.on('disconnect', () => {
        console.log('Un joueur s\'est déconnecté');
        tanks = tanks.filter(tank => tank.id !== socket.id);
        io.emit('removeTank', socket.id);
    });

    // Gérer les mouvements du tank
    socket.on('move', (data) => {
        const tank = tanks.find(t => t.id === socket.id);
        if (tank) {
            tank.x += data.dx;
            tank.y += data.dy;
            tank.angle = data.angle;
            io.emit('updateTank', tank);
        }
    });

    // Gérer le tir
    socket.on('fire', () => {
        const tank = tanks.find(t => t.id === socket.id);
        if (tank) {
            const bullet = {
                id: socket.id,
                x: tank.x,
                y: tank.y,
                angle: tank.angle
            };
            bullets.push(bullet);
            io.emit('newBullet', bullet);
        }
    });
});

// Démarrer le serveur
server.listen(3000, () => {
    console.log('Le serveur est en cours d\'exécution sur le port 3000');
});
