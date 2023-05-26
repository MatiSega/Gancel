alert("Bienvenidos a Gancel")
let nombre = prompt("Ingrese su nombre")

// Variables de precios
const PRECIO_KILO_ENVUELTO = 1400
const PRECIO_CAJA_X40 = 1200
const PRECIO_KILO_SIN_ENVOLVER = 1100
const precios = [
  { nombre: 'PRECIO_KILO_ENVUELTO', valor: PRECIO_KILO_ENVUELTO },
  { nombre: 'PRECIO_CAJA_X40', valor: PRECIO_CAJA_X40 },
  { nombre: 'PRECIO_KILO_SIN_ENVOLVER', valor: PRECIO_KILO_SIN_ENVOLVER }
]

console.log(precios)

// Búsqueda de un precio por nombre
const nombreBuscado = 'PRECIO_CAJA_X40'
const precioEncontrado = precios.find(precio => precio.nombre === nombreBuscado)
console.log(precioEncontrado) 

// Filtrado de precios por valor
const precioMinimo = 1200
const preciosFiltrados = precios.filter(precio => precio.valor >= precioMinimo)
console.log(preciosFiltrados) 

// Variables para acumular cantidad de artículos y costo total
let cantidadArticulos = 0
let costoTotal = 0

function calcularCostoTotal(cantidad, precio) {
  return cantidad * precio
}

let seleccionValida = false
let seleccion
while (!seleccionValida) {
  seleccion = parseInt(prompt("Seleccione 1 para Kilo Envuelto, 2 para Caja x40, 3 para Kilo sin envolver"))

  switch (seleccion) {
    case 1:
      alert("Kilo Envuelto seleccionado")
      let cantidadKiloEnvuelto = parseInt(prompt("Ingrese la cantidad de kilos envueltos que desea"))
      cantidadArticulos += cantidadKiloEnvuelto
      costoTotal += calcularCostoTotal(cantidadKiloEnvuelto, precioEncontrado.valor)
      seleccionValida = true
      break
    case 2:
      alert("Caja x40 seleccionada")
      let cantidadCajaX40 = parseInt(prompt("Ingrese la cantidad de cajas x40 que desea"))
      cantidadArticulos += cantidadCajaX40
      costoTotal += calcularCostoTotal(cantidadCajaX40, precioEncontrado.valor)
      seleccionValida = true
      break
    case 3:
      alert("Kilo sin envolver seleccionado")
      let cantidadKiloSinEnvolver = parseInt(prompt("Ingrese la cantidad de kilos sin envolver que desea"))
      cantidadArticulos += cantidadKiloSinEnvolver
      costoTotal += calcularCostoTotal(cantidadKiloSinEnvolver, precioEncontrado.valor)
      seleccionValida = true
      break
    default:
      alert("Por favor, seleccione una opción válida.")
      break
  }
}
function mostrarResumenPedido() {
  alert(nombre + ", usted ha seleccionado " + cantidadArticulos + " artículo(s) por un total de $" + costoTotal)
}

mostrarResumenPedido()


