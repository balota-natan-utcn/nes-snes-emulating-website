export function GameButton(title, romPath, loadGameFn) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-light m-2';
    btn.textContent = title;
    btn.onclick = () => loadGameFn(romPath);
    return btn;
  }
  