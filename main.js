import { createGameButton } from './components/GameButton.js';

const romList = [
  { name: 'Game 1', file: 'test.nes' },
  { name: 'Game 2', file: 'Metroid.nes' }
];

const nes = new jsnes.NES({
  onFrame: function(frameBuffer) {
    const canvas = document.getElementById('nes-canvas');
    const context = canvas.getContext('2d');
    const imageData = context.createImageData(256, 240);
    for (let i = 0; i < frameBuffer.length; i++) {
      imageData.data[i] = frameBuffer[i];
    }
    context.putImageData(imageData, 0, 0);
  }
});

function loadROM(file) {
  fetch(`roms/${file}`)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const base64ROM = arrayBufferToBase64(buffer);
      nes.loadROM(base64ROM); // jsNES expects a base64 string
      nes.start();
    });
}

function arrayBufferToBase64(buffer) {
  const binary = new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '');
  return btoa(binary);
}


const buttonsDiv = document.getElementById('buttons');
romList.forEach(rom => {
  const btn = createGameButton(rom.name, () => loadROM(rom.file));
  buttonsDiv.appendChild(btn);
});
