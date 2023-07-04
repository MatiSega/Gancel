fetch("data.json")
  .then((res) => res.json())
  .then((productos) => {
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

    let carrito = [];

    function agregarAlCarrito(producto) {
      const index = carrito.findIndex((p) => p.id === producto.id);

      if (index !== -1) {
        carrito[index].cantidad += 1;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }

      actualizarCarrito();
    }

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
          <td>${producto.cantidad * parseFloat(producto.valor.slice(1))}</td>
        `;
        tablaCarrito.appendChild(fila);

        total += producto.cantidad * parseFloat(producto.valor.slice(1));
      });

      const totalElement = document.getElementById("total");
      totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    const botonesAgregar1 = document.querySelectorAll("#contenedorProductos .btn");

    botonesAgregar1.forEach((boton) => {
      boton.addEventListener("click", (event) => {
        const id = event.target.id.split("_")[1];
        const productoSeleccionado = productos.find((producto) => producto.id === parseInt(id));
        mostrarProductoEnCartelito(productoSeleccionado);
      });
    });

    function mostrarProductoEnCartelito(producto) {
      const cartelito = document.getElementById("cartelito");
      cartelito.textContent = `Producto agregado al carrito: ${producto.nombre}`;
      cartelito.style.display = "block";

      setTimeout(() => {
        cartelito.style.display = "none";
      }, 3000);
    }

    const botonFinalizar = document.getElementById("finalizarButton");
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
          Swal.fire({
            title: "Aceptado",
            text: "Gracias por confiar en nosotros",
            icon: "success",
          }).then(() => {
            window.location.href = "https://www.facebook.com/GolosinasGancel";
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "Cancelado",
            text: "Esperamos que vuelva pronto",
            icon: "error",
          });
        }
      });
    }
  })
  .catch((error) => {
    console.log("Error al cargar los productos:", error);
  });
