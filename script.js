const productos = [
      {

        id: 1,
        nombre: "Cajita",
        imagen: "./img/cajita.png",
        valor: "$1250",

      },

      {

        id: 2,
        nombre: "Kilo sin envolver",
        imagen: "./img/kilossin.png",
        valor: "$1100",

      },

      {

        id: 3,
        nombre: "Frutillitas",
        imagen: "./img/frutillas.sueltas.webp.png",
        valor: "$1150",

      },

      {

        id: 4,
        nombre: "Kilo bombom Manzana",
        imagen: "./img/bombon.Manzana.jpg.png",
        valor: "$1150",
      },

      {

        id: 5,
        nombre: "Kilo bombom Limon",
        imagen: "./img/bombon.Limon.webp.png",
        valor: "$1150",

      },

      {

        id: 6,
        nombre: "Kilo bombom Uva",
        imagen: "./img/bombon.Uva.webp.png",
        valor: "$1150",
      },

      {

        id: 7,
        nombre: " Kilo bombom frutilla",
        imagen: "./img/bonbon.cereza.webp.png",
        valor: "$1150",

      },

      {

        id: 8,
        nombre: "Kilo bombom Naranja",
        imagen: "./img/bombon.Naranja.jpg.png",
        valor: "$1150",

      },

      {

        id: 9,
        nombre: "Alfajor Don Salvador Negro",
        imagen: "./img/alfajor-negro.webp.png",
        valor: "$4500",

      },

      {
        id: 10,
        nombre: "Alfajor Don Salvador Blanco",
        imagen: "./img/alfajor-blanco.webp.png",
        valor: "$4500"

      }

]

const contenedorProductos = document.getElementById("contenedorProductos");

productos.forEach((producto) => {
  const card = document.createElement("div");
  card.classList.add("col");
  card.innerHTML = `
    <div class="card h-100">
      <img src="${producto.imagen}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <h5>${producto.valor}</h5>
      </div>
      <div class="d-grid gap-2">
  <button class="btn btn-primary" type="button">Agregar al Carrito</button>
</div>
    </div>
  `;
  contenedorProductos.appendChild(card);
});



console.log(productos)

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
