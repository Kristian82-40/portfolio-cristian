// Calculadora funcional moderna
const pantalla = document.querySelector('.pantalla');
const botones = document.querySelectorAll('.btn');
let operacion = '';
let resetPantalla = false;

function actualizarPantalla(valor) {
  if (pantalla.textContent === '0' || resetPantalla) {
    pantalla.textContent = valor;
    resetPantalla = false;
  } else {
    pantalla.textContent += valor;
  }
}

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const valor = boton.textContent;
    if (valor >= '0' && valor <= '9' || valor === '.') {
      actualizarPantalla(valor);
    } else if (valor === 'C') {
      pantalla.textContent = '0';
      operacion = '';
    } else if (valor === '←') {
      pantalla.textContent = pantalla.textContent.slice(0, -1) || '0';
    } else if (valor === '=') {
      try {
        pantalla.textContent = eval(pantalla.textContent.replace(/[^-()*/+.\d]/g, ''));
        resetPantalla = true;
      } catch {
        pantalla.textContent = 'Error';
        resetPantalla = true;
      }
    } else {
      if (!resetPantalla) {
        pantalla.textContent += valor;
      } else {
        pantalla.textContent = valor;
        resetPantalla = false;
      }
    }
    // Animación de botón
    boton.classList.add('pressed');
    setTimeout(() => boton.classList.remove('pressed'), 120);
  });
});
// Soporte teclado físico
window.addEventListener('keydown', e => {
  const key = e.key;
  const map = {'Enter': '=', 'Backspace': '←', 'Delete': 'C'};
  const val = map[key] || key;
  [...botones].forEach(boton => {
    if (boton.textContent === val) boton.click();
  });
});
