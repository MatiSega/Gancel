alert("Bienvenidos a Gancel");
let nombre = prompt("Ingrese su nombre");

// Variables de precios
const PRECIO_KILO_ENVUELTO = 1400;
const PRECIO_CAJA_X40 = 1200;
const PRECIO_KILO_SIN_ENVOLVER = 1100;
const precios = [
  { nombre: 'PRECIO_KILO_ENVUELTO', valor: PRECIO_KILO_ENVUELTO },
  { nombre: 'PRECIO_CAJA_X40', valor: PRECIO_CAJA_X40 },
  { nombre: 'PRECIO_KILO_SIN_ENVOLVER', valor: PRECIO_KILO_SIN_ENVOLVER }
];

console.log(precios);

// Variables para acumular cantidad de artículos y costo total
let cantidadArticulos = 0;
let costoTotal = 0;

function calcularCostoTotal(cantidad, precio) {
  return cantidad * precio;
}

let seleccionValida = false;
let seleccion;
while (!seleccionValida) {
  seleccion = parseInt(prompt("Seleccione 1 para Kilo Envuelto, 2 para Caja x40, 3 para Kilo sin envolver"));

  let precioEncontrado; // Precio encontrado para el producto seleccionado

  switch (seleccion) {
    case 1:
      alert("Kilo Envuelto seleccionado");
      precioEncontrado = precios.find(precio => precio.nombre === 'PRECIO_KILO_ENVUELTO').valor;
      let cantidadKiloEnvuelto = parseInt(prompt("Ingrese la cantidad de kilos envueltos que desea"));
      cantidadArticulos += cantidadKiloEnvuelto;
      costoTotal += calcularCostoTotal(cantidadKiloEnvuelto, precioEncontrado);
      seleccionValida = true;
      break;
    case 2:
      alert("Caja x40 seleccionada");
      precioEncontrado = precios.find(precio => precio.nombre === 'PRECIO_CAJA_X40').valor;
      let cantidadCajaX40 = parseInt(prompt("Ingrese la cantidad de cajas x40 que desea"));
      cantidadArticulos += cantidadCajaX40;
      costoTotal += calcularCostoTotal(cantidadCajaX40, precioEncontrado);
      seleccionValida = true;
      break;
    case 3:
      alert("Kilo sin envolver seleccionado");
      precioEncontrado = precios.find(precio => precio.nombre === 'PRECIO_KILO_SIN_ENVOLVER').valor;
      let cantidadKiloSinEnvolver = parseInt(prompt("Ingrese la cantidad de kilos sin envolver que desea"));
      cantidadArticulos += cantidadKiloSinEnvolver;
      costoTotal += calcularCostoTotal(cantidadKiloSinEnvolver, precioEncontrado);
      seleccionValida = true;
      break;
    default:
      alert("Por favor, seleccione una opción válida.");
      break;
  }
}

function mostrarResumenPedido() {
  alert(nombre + ", usted ha seleccionado " + cantidadArticulos + " artículo(s) por un total de $" + costoTotal);
}

mostrarResumenPedido();

// Local Storage para mostrar el carrito con boton
const datosCarrito = {
  usuarioX: nombre,
  cantidadArticulos: cantidadArticulos,
  costoTotal: costoTotal
};

localStorage.setItem("datosCarrito", JSON.stringify(datosCarrito));

let boton = document.getElementById("boton");
boton.addEventListener("click", mostrarContenidoLocalStorage);

function mostrarContenidoLocalStorage() {
  const datosGuardadosJSON = localStorage.getItem("datosCarrito");
  const datosGuardados = JSON.parse(datosGuardadosJSON);

  let dato1LS = document.getElementById("dato1");
  dato1LS.innerHTML = datosGuardados.usuarioX + " usted ha seleccionado: " + datosGuardados.cantidadArticulos + " artículo(s) con un costo total: $" + datosGuardados.costoTotal;
}

let botonReset = document.getElementById("reset");
botonReset.addEventListener("click", resetearCarrito);

// Función para resetear el carrito
function resetearCarrito() {
  // Restablecer valores a cero
  cantidadArticulos = 0;
  costoTotal = 0;

  // Limpiar almacenamiento local
  localStorage.removeItem("datosCarrito");

  // Actualizar el contenido del párrafo con los valores reseteados
  let dato1LS = document.getElementById("dato1");
  dato1LS.innerHTML = "El carrito está vacío";
}
