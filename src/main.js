import './style.css';
import { renderApp } from './ui.js';
import { subscribe } from './store.js';

const root = document.querySelector('#app');

let renderTerjadwal = false;

function render() {
  renderApp(root);
}

render();

// Setiap perubahan storage memicu render ulang, digabung per microtask
// agar satu aksi tidak menghasilkan banyak render.
subscribe(() => {
  if (renderTerjadwal) return;
  renderTerjadwal = true;
  queueMicrotask(() => {
    renderTerjadwal = false;
    render();
  });
});
