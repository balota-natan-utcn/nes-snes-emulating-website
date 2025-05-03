import { GameButton } from './components/GameButton.js';

const games = [
  { title: 'From Below (NES)', path: 'roms/Metroid.nes' }
];

const nes = new jsnes.NES({
  onFrame: function(frameBuffer) {
    const canvas = document.getElementById('nes-canvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, 256, 240);
    for (let i = 0; i < frameBuffer.length; i++) {
      imageData.data[i] = frameBuffer[i];
    }
    ctx.putImageData(imageData, 0, 0);
  },
  onAudioSample: function() {
    // Audio handling can be implemented here
  }
});

function loadGame(romPath) {
  fetch(romPath)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      nes.loadROM(buffer);
      nes.start();
    })
    .catch(err => console.error('Failed to load ROM:', err));
}

function init() {
  const gameList = document.getElementById('game-list');
  games.forEach(game => {
    const button = GameButton(game.title, game.path, loadGame);
    gameList.appendChild(button);
  });
}

init();
