import * as Selector from "../support/selectores";

describe("Flujos de Iniciar Sesion", () => {
   // Variables para almacenar información de los productos
  let productosSeleccionados = [];
  let precioTotal = 0;
  
  beforeEach(() => {
    cy.visit("");
    // Validación de que la URL contiene "saucedemo"
    cy.url().should("include", "saucedemo");
    // Uso de fixture para cargar datos de usuario
    cy.fixture("fx_DatosIniciarSesion").as("usuario");
  });

  it("Inicio de sesión fallido con credenciales inválidas o vacías", function () {
    // Comando para prevalidaciones e inicio de sesión con datos inválidos
    cy.co_PreValidaciones();
    cy.co_IniciarSesion(this.usuario.nombreUsuarioInv, this.usuario.claveInv);
    // Validaciones: Mensaje de error y URL
    cy.get(Selector.MENSAJEERROR).should("exist").and("be.visible");
    cy.get(Selector.CONTENEDOR_ERROR).should("have.css", "background-color", "rgb(226, 35, 26)");
    cy.url().should("include", "");
  });

  it("Inicio de sesión exitoso con credenciales válidas", function () {
    // Usar comando para prevalidaciones e inicio de sesión con datos válidos
    cy.co_PreValidaciones();
    cy.co_IniciarSesion(this.usuario.nombreUsuario, this.usuario.clave);
    // Validación: URL, título de productos y icono del carrito
    cy.url().should("include", "/inventory.html");
    cy.get(Selector.TITULOPRODUCTOS).should("exist").and("be.visible");
    cy.get(Selector.ICONO_CARRITO).should("exist").and("be.visible");
  });

  it("Agregar productos al carrito de compras", function () {
    // Usar comando para iniciar sesión con datos válidos
    cy.co_IniciarSesion(this.usuario.nombreUsuario, this.usuario.clave);
    // Adición de tres productos al carrito
    cy.get(Selector.BOTON_AGREGAR_MOCHILA).click();
    cy.get(Selector.BOTON_AGREGAR_CHAQUETA).click();
    cy.get(Selector.BOTON_AGREGAR_MAMELUCO).click();
    //Validación: Verificar que los productos agregados al carrito cambien de estado a "Remove"
    cy.get(Selector.BOTON_REMOVER_MOCHILA).should("exist").and("be.visible");
    cy.get(Selector.BOTON_REMOVER_CHAQUETA).should("exist").and("be.visible");
    cy.get(Selector.BOTON_REMOVER_MAMELUCO).should("exist").and("be.visible");
    // Usar comando para obtener nombre y precio de los productos pagina principal
    cy.co_NombrePrecioProducto("mochila", Selector.NOMBRE_PRODUCTO_MOCHILA, Selector.PRECIO_PRODUCTO_MOCHILA);
    cy.co_NombrePrecioProducto("chaqueta", Selector.NOMBRE_PRODUCTO_CHAQUETA, Selector.PRECIO_PRODUCTO_CHAQUETA);
    cy.co_NombrePrecioProducto("mameluco", Selector.NOMBRE_PRODUCTO_MAMELUCO, Selector.PRECIO_PRODUCTO_MAMELUCO);
    // Navegación al carrito de compras
    cy.get(Selector.ICONO_CARRITO).click();
    cy.url().should("include", "/cart.html");
    // Usar comando para comparar nombre y precio de los productos en el carrito
    // MOCHILA
    cy.co_CompararTextoProducto("@mochilaNombre", Selector.NOMBRE_CARRITO_MOCHILA);
    cy.co_CompararTextoProducto("@mochilaPrecio", Selector.PRECIO_CARRITO_MOCHILA);
    // CHAQUETA
    cy.co_CompararTextoProducto("@chaquetaNombre", Selector.NOMBRE_CARRITO_CHAQUETA);
    cy.co_CompararTextoProducto("@chaquetaPrecio", Selector.PRECIO_CARRITO_CHAQUETA);
    // MAMELUCO
    cy.co_CompararTextoProducto("@mamelucoNombre", Selector.NOMBRE_CARRITO_MAMELUCO);
    cy.co_CompararTextoProducto("@mamelucoPrecio", Selector.PRECIO_CARRITO_MAMELUCO);

  });


  it("Completar el proceso de checkout exitosamente", function () {
    cy.log("**INICIO: Proceso de Checkout**");

    // 1. Iniciar sesión con datos válidos
    cy.co_IniciarSesion(this.usuario.nombreUsuario, this.usuario.clave);
    cy.url().should("include", "/inventory.html");

    // 2. Agregar productos al carrito (reutilizando la lógica existente)
    cy.get(Selector.BOTON_AGREGAR_MOCHILA).click();
    cy.get(Selector.BOTON_AGREGAR_CHAQUETA).click();
    cy.get(Selector.BOTON_AGREGAR_MAMELUCO).click();

    // 3. Validar que los productos están agregados
    cy.get(Selector.BOTON_REMOVER_MOCHILA).should("exist").and("be.visible");
    cy.get(Selector.BOTON_REMOVER_CHAQUETA).should("exist").and("be.visible");
    cy.get(Selector.BOTON_REMOVER_MAMELUCO).should("exist").and("be.visible");

    // 4. Ir al carrito de compras
    cy.get(Selector.ICONO_CARRITO).click();
    cy.url().should("include", "/cart.html");
    cy.get(Selector.TITULOPRODUCTOS).should("contain", "Your Cart");

    // 5. Validar que hay 3 productos en el carrito
    cy.get(".cart_item").should("have.length", 3);

    // 6. Iniciar proceso de checkout
    cy.get(Selector.BOTON_CHECKOUT)
      .should("be.visible")
      .and("contain", "Checkout")
      .click();

    // 7. Validar que estamos en la página de información
    cy.url().should("include", "/checkout-step-one.html");
    cy.get(Selector.TITULOPRODUCTOS).should(
      "contain",
      "Checkout: Your Information"
    );

    // 8. Cargar datos de checkout desde fixture
    cy.fixture("fx_DatosCheckout").then((datosCheckout) => {
      // 9. Llenar el formulario de checkout
      cy.co_LlenarFormularioCheckout(
        datosCheckout.nombre,
        datosCheckout.apellido,
        datosCheckout.codigoPostal
      );
    });

    // 10. Validar que estamos en la página de resumen
    cy.url().should("include", "/checkout-step-two.html");

    // 11. Validar elementos del resumen de compra
    cy.co_ValidarResumenCompra();

    // 12. Validar que los 3 productos están en el resumen
    cy.get(".cart_item").should("have.length", 3);

    // 13. Validar nombres de productos visibles en resumen
    cy.get('[data-test="inventory-item-name"]').should("have.length", 3);
    cy.get('[data-test="inventory-item-name"]').each(($nombre) => {
      cy.wrap($nombre).should("be.visible");
    });

    // 14. Validar precios visibles en resumen
    cy.get('[data-test="inventory-item-price"]').should("have.length", 3);
    cy.get('[data-test="inventory-item-price"]').each(($precio) => {
      cy.wrap($precio).should("be.visible");
      const precio = parseFloat($precio.text().replace("$", ""));
      expect(precio).to.be.greaterThan(0);
    });

    // 15. Validar cálculo del total
    cy.co_ValidarTotalCompra();

    // 16. Finalizar la compra
    cy.get(Selector.BOTON_FINISH).click();

    // 17. Validar confirmación de compra exitosa
    cy.co_ValidarConfirmacionCompra();

    cy.log("**FIN: Proceso de Checkout Completado Exitosamente**");
  });

});
