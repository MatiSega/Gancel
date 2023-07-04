fetch("data.json")
  .then((res) => res.json())
  .then((productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    const tablaCarrito = document.getElementById("tabla");
    const totalElement = document.getElementById("total");
    const nombreInput = document.getElementById("nombreInput");
    const apellidoInput = document.getElementById("apellidoInput");
    const botonFinalizar = document.getElementById("finalizarButton");
    const botonBorrar = document.getElementById("resetButton");
    const cartelito = document.getElementById("cartelito");

    let carrito = [];

    // Intentar cargar datos del carrito desde el localStorage al inicio
    cargarCarritoDesdeLocalStorage();

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
            <button class="btn btn-primary" id="BotonComprar_${producto.id}" type="button">Agregar al Carrito</button>
          </div>
        </div>
      `;
      contenedorProductos.appendChild(card);
    });

    const botonesAgregar = document.querySelectorAll("#contenedorProductos .btn");

    botonesAgregar.forEach((boton, index) => {
      boton.addEventListener("click", () => {
        agregarAlCarrito(productos[index]);
      });
    });

    function agregarAlCarrito(producto) {
      const index = carrito.findIndex((p) => p.id === producto.id);

      if (index !== -1) {
        carrito[index].cantidad += 1;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }

      // Guardar el carrito en el localStorage
      guardarCarritoEnLocalStorage();

      actualizarCarrito();
    }

    function actualizarCarrito() {
      tablaCarrito.innerHTML = "";
      let total = 0;

      carrito.forEach((producto) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td><img src="${producto.imagen}" alt="${producto.nombre}" width="50"></td>
          <td>${producto.cantidad}</td>
          <td>${producto.valor}</td>
          <td>${producto.cantidad * parseFloat(producto.valor.slice(1))}</td>
        `;
        tablaCarrito.appendChild(fila);

        total += producto.cantidad * parseFloat(producto.valor.slice(1));
      });

      if (carrito.length === 0) {
        totalElement.textContent = "Total: $0";
      } else {
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
      }
    }

    botonesAgregar.forEach((boton) => {
      boton.addEventListener("click", (event) => {
        const id = event.target.id.split("_")[1];
        const productoSeleccionado = productos.find((producto) => producto.id === parseInt(id));
        mostrarProductoEnCartelito(productoSeleccionado);
      });
    });

    function mostrarProductoEnCartelito(producto) {
      cartelito.textContent = `Producto agregado al carrito: ${producto.nombre}`;
      cartelito.style.display = "block";

      setTimeout(() => {
        cartelito.style.display = "none";
      }, 3000);
    }

    botonFinalizar.addEventListener("click", finalizarCompra);

    function finalizarCompra() {
      Swal.fire({
        title: "Completar compra",
        text: "¿Desea continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, ir a pagar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const nombre = nombreInput.value.trim();
          const apellido = apellidoInput.value.trim();

          if (nombre === "" || apellido === "") {
            Swal.fire({
              title: "Error",
              text: "Por favor ingrese su nombre y apellido",
              icon: "error",
              confirmButtonText: "Ok",
            });
          } else {
            Swal.fire({
              title: "¡Compra realizada!",
              text: "Gracias por su compra, " + nombre + " " + apellido + "!",
              icon: "success",
              confirmButtonText: "Ok",
            });
            resetearCarrito();
          }
        }
      });
    }

    botonBorrar.addEventListener("click", resetearCarrito);

    function resetearCarrito() {
      carrito = [];
      actualizarCarrito();
      nombreInput.value = "";
      apellidoInput.value = "";

      // Borrar los datos del carrito en el localStorage
      localStorage.removeItem("carrito");
    }

    function cargarCarritoDesdeLocalStorage() {
      const carritoGuardado = localStorage.getItem("carrito");
      if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
      }
    }

    function guardarCarritoEnLocalStorage() {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  });
