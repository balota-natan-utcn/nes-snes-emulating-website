export function createGameButton(title, onClick) {
  const button = document.createElement('button');
  button.textContent = title;
  button.onclick = onClick;
  return button;
}
