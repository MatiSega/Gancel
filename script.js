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

const guardarLocal =(clave, valor)=> {localStorage.setItem(clave, valor)}

for(const productoJSON of productos ){
    guardarLocal(productoJSON.id, JSON.stringify(productoJSON))
}
 
const contenedorProductos = document.getElementById("contenedorProductos");

let botonComprar = document.getElementById("BotonComprar")

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
  <button class="btn btn-primary" id="BotonComprar" type="button">Agregar al Carrito</button>
</div>
    </div>
  `;
  contenedorProductos.appendChild(card);
});

// Variable para almacenar los productos seleccionados en el carrito
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  const index = carrito.findIndex((p) => p.id === producto.id);

  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
}

// Función para actualizar la tabla del carrito
function actualizarCarrito() {
  const tablaCarrito = document.getElementById("tabla");
  tablaCarrito.innerHTML = "";

  let total = 0;

  carrito.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${producto.imagen}" alt="${producto.nombre}" width="50"></td>
      <td>${producto.cantidad}</td>
      <td>${producto.valor}</td>
      <td>${(producto.cantidad * parseFloat(producto.valor.slice(1))).toFixed(2)}</td>
    `;
    tablaCarrito.appendChild(fila);

    total += producto.cantidad * parseFloat(producto.valor.slice(1));
  });

  const totalElement = document.getElementById("total");
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}
// Obtener los botones "Agregar al Carrito" generados dinámicamente
const botonesAgregar = document.querySelectorAll("#contenedorProductos .btn");

botonesAgregar.forEach((boton, index) => {
  boton.addEventListener("click", () => {
    agregarAlCarrito(productos[index]);
  });
});

// Obtener el botón "Finalizar"
const finalizarButton = document.getElementById("finalizarButton");

// Agregar event listener al botón "Finalizar"
finalizarButton.addEventListener("click", finalizarCompra);

// Función para finalizar la compra
// Función para finalizar la compra
function finalizarCompra() {
  const nombreInput = document.getElementById("nombreInput");
  const apellidoInput = document.getElementById("apellidoInput");
  const nombre = nombreInput.value;
  const apellido = apellidoInput.value;

  let mensaje = `${nombre} ${apellido} ha comprado:`;

  carrito.forEach((producto) => {
    mensaje += `\n- ${producto.nombre} (Cantidad: ${producto.cantidad})`;
  });

  const totalElement = document.getElementById("total");
  const total = carrito.reduce((acc, producto) => acc + producto.cantidad * parseFloat(producto.valor.slice(1)), 0);
  mensaje += `\nTotal a pagar: $${total.toFixed(2)}`;
  totalElement.textContent = mensaje;
}



// Obtener el botón "Borrar"
const resetButton = document.getElementById("resetButton");

// Agregar event listener al botón "Borrar"
resetButton.addEventListener("click", borrarCarrito);

// Función para vaciar el carrito
function borrarCarrito() {
  carrito = []; // Reiniciar el carrito
  actualizarCarrito(); // Actualizar la tabla del carrito
}




/* console.log(productos)

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
 */