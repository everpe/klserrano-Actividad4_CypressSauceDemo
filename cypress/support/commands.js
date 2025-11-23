import * as Selectores from "./selectores";

// Comando personalizado para pre-validaciones del inicio de sesión
Cypress.Commands.add("co_PreValidaciones", () => {
  cy.get(Selectores.LOGO).should("exist").and("be.visible");
  cy.get(Selectores.CONTENEDOR_NEGRO).should("have.css", "background-color","rgb(19, 35, 34)");
  cy.get(Selectores.CREDENCIALES_USUARIOS).should("exist").and("be.visible");
  cy.get(Selectores.CREDENCIALES_CLAVES).should("exist").and("be.visible");
});

// Comando personalizado para iniciar sesión
Cypress.Commands.add("co_IniciarSesion", (nombreUsuario, clave) => {
  cy.get(Selectores.NOMBREUSUARIO).type(nombreUsuario);
  cy.get(Selectores.CLAVE).type(clave);
  cy.get(Selectores.BOTON_INGRESAR).click();
});

// Comando para obtener nombre y precio del producto con alias dinámico
Cypress.Commands.add("co_NombrePrecioProducto", (aliasProducto, selectorNombre, selectorPrecio) => {
  cy.get(selectorNombre).invoke("text").then((texto) => {
      cy.wrap(texto.trim()).as(`${aliasProducto}Nombre`);
    });
  cy.get(selectorPrecio).invoke("text").then((texto) => {
      cy.wrap(texto.trim()).as(`${aliasProducto}Precio`);
    });
});

// Comando personalizado para comparar texto del producto en el carrito
Cypress.Commands.add("co_CompararTextoProducto", (alias, selector) => {
  cy.get(alias).then((textoGuardado) => {
    cy.get(selector).invoke("text").then((textoActualProceso) => {
        expect(textoActualProceso.trim()).to.eq(textoGuardado.trim());
      });
  });
});




// Comando personalizado para llenar el formulario de checkout
Cypress.Commands.add("co_LlenarFormularioCheckout", (nombre, apellido, codigoPostal) => {
  cy.get(Selectores.INPUT_NOMBRE).should("be.visible").type(nombre);
  cy.get(Selectores.INPUT_APELLIDO).should("be.visible").type(apellido);
  cy.get(Selectores.INPUT_CODIGO_POSTAL).should("be.visible").type(codigoPostal);
  cy.get(Selectores.BOTON_CONTINUE).should("be.visible").click();
});

// Comando personalizado para validar elementos del resumen de compra
Cypress.Commands.add("co_ValidarResumenCompra", () => {
  cy.get(Selectores.TITULO_RESUMEN).should("contain", "Checkout: Overview");
  cy.get(Selectores.SUBTOTAL_LABEL).should("be.visible");
  cy.get(Selectores.TAX_LABEL).should("be.visible");
  cy.get(Selectores.TOTAL_LABEL).should("be.visible");
  cy.get(Selectores.INFO_PAGO).should("be.visible");
  cy.get(Selectores.INFO_ENVIO).should("be.visible");
  cy.get(Selectores.BOTON_FINISH).should("be.visible").and("contain", "Finish");
  cy.get(Selectores.BOTON_CANCEL).should("be.visible").and("contain", "Cancel");
});

// Comando personalizado para calcular y validar el total
Cypress.Commands.add("co_ValidarTotalCompra", () => {
  let sumaPrecios = 0;
  
  // Obtener todos los precios de los productos en el resumen
  cy.get('[data-test="inventory-item-price"]').each(($precio) => {
    const precioNumerico = parseFloat($precio.text().replace('$', ''));
    sumaPrecios += precioNumerico;
  }).then(() => {
    // Validar que el subtotal mostrado coincide con la suma
    cy.get(Selectores.SUBTOTAL_LABEL)
      .invoke('text')
      .then((subtotalTexto) => {
        const subtotalMostrado = parseFloat(subtotalTexto.replace('Item total: $', ''));
        cy.log(`Suma calculada: $${sumaPrecios.toFixed(2)}`);
        cy.log(`Subtotal mostrado: $${subtotalMostrado.toFixed(2)}`);
        expect(subtotalMostrado).to.equal(parseFloat(sumaPrecios.toFixed(2)));
      });
    
    // Validar que el tax es mayor a 0
    cy.get(Selectores.TAX_LABEL)
      .invoke('text')
      .then((taxTexto) => {
        const tax = parseFloat(taxTexto.replace('Tax: $', ''));
        expect(tax).to.be.greaterThan(0);
        cy.log(`Tax: $${tax.toFixed(2)}`);
      });
  });
});

// Comando personalizado para validar la confirmación final
Cypress.Commands.add("co_ValidarConfirmacionCompra", () => {
  cy.url().should("include", "/checkout-complete.html");
  cy.get(Selectores.TITULO_COMPLETO).should("contain", "Checkout: Complete!");
  cy.get(Selectores.MENSAJE_CONFIRMACION)
    .should("be.visible")
    .and("contain", "Thank you for your order!");
  cy.get(Selectores.TEXTO_CONFIRMACION)
    .should("be.visible")
    .and("contain", "Your order has been dispatched");
  cy.get(Selectores.IMAGEN_CONFIRMACION).should("be.visible");
  cy.get(Selectores.BOTON_BACK_HOME)
    .should("be.visible")
    .and("contain", "Back Home");
});