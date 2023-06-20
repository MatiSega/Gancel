const PRECIO_FRUTILLITAS = 1400;
const PRECIO_CAJITA = 1200;
const PRECIO_KILO = 1100;

let cantidadArticulos = 0;
let costoTotal = 0;
let nombreUsuario = '';

const usuarioInput = document.getElementById('floatingInputGroup1');
const productosSelect = document.getElementById('productos');
const cantidadSelect = document.getElementById('cantidad');
const agregarCarritoBtn = document.getElementById('agregarCarrito');
const tablaBody = document.getElementById('tabla');
const totalP = document.getElementById('total');
const resetButton = document.getElementById('resetButton');

agregarCarritoBtn.addEventListener('click', () => {
  const usuario = usuarioInput.value;
  const producto = productosSelect.value;
  const cantidad = parseInt(cantidadSelect.value);

  if (!usuario || !producto || isNaN(cantidad) || cantidad <= 0) {
    alert('Por favor, complete todos los campos correctamente.');
    return;
  }

  let precio, nombreProducto;
  switch (producto) {
    case 'frutillitas':
      precio = PRECIO_FRUTILLITAS;
      nombreProducto = 'Frutillitas';
      break;
    case 'cajita':
      precio = PRECIO_CAJITA;
      nombreProducto = 'Cajita';
      break;
    case 'kilo':
      precio = PRECIO_KILO;
      nombreProducto = 'Kilo';
      break;
    default:
      alert('Por favor, seleccione un producto válido.');
      return;
  }

  const subtotal = cantidad * precio;

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${cantidadArticulos + 1}</td>
    <td>${cantidad}</td>
    <td>${precio}</td>
    <td>${subtotal}</td>
  `;
  tablaBody.appendChild(row);

  cantidadArticulos += 1;
  costoTotal += subtotal;
  nombreUsuario = usuario;

  totalP.textContent = `Total a pagar de ${nombreUsuario}: $${costoTotal}`;

  usuarioInput.value = '';
  productosSelect.selectedIndex = 0;
  cantidadSelect.selectedIndex = 0;
});

resetButton.addEventListener('click', () => {
  tablaBody.innerHTML = '';
  cantidadArticulos = 0;
  costoTotal = 0;
  nombreUsuario = '';
  totalP.textContent = 'Total: $0';
});
