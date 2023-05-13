alert("Bienvenidos a Gancel")
let nombre = prompt("Ingrese su nombre")

// Variables de precios
const PRECIO_KILO_ENVUELTO = 1400
const PRECIO_CAJA_X40 = 1200
const PRECIO_KILO_SIN_ENVOLVER = 1100

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
      costoTotal += calcularCostoTotal(cantidadKiloEnvuelto, PRECIO_KILO_ENVUELTO)
      seleccionValida = true
      break
    case 2:
      alert("Caja x40 seleccionada")
      let cantidadCajaX40 = parseInt(prompt("Ingrese la cantidad de cajas x40 que desea"))
      cantidadArticulos += cantidadCajaX40
      costoTotal += calcularCostoTotal(cantidadCajaX40, PRECIO_CAJA_X40)
      seleccionValida = true
      break
    case 3:
      alert("Kilo sin envolver seleccionado")
      let cantidadKiloSinEnvolver = parseInt(prompt("Ingrese la cantidad de kilos sin envolver que desea"))
      cantidadArticulos += cantidadKiloSinEnvolver
      costoTotal += calcularCostoTotal(cantidadKiloSinEnvolver, PRECIO_KILO_SIN_ENVOLVER)
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
