// Selectores para la pantalla de Iniciar Sesion
export const NOMBREUSUARIO = "#user-name";
export const CLAVE = "#password";
export const BOTON_INGRESAR = "#login-button";
export const TITULOPRODUCTOS = '[data-test="title"]';
export const MENSAJEERROR = '[data-test="error"]';
export const LOGO = ".login_logo";
export const CONTENEDOR_NEGRO = ".login_credentials_wrap-inner";
export const CONTENEDOR_ERROR = ".login-box .error-message-container.error";
export const CREDENCIALES_USUARIOS = "#login_credentials";
export const CREDENCIALES_CLAVES = '[data-test="login-password"]';
export const ICONO_CARRITO = '[data-test="shopping-cart-link"]';

//Selectores para la pantalla de Compra
export const BOTON_AGREGAR_MOCHILA = "#add-to-cart-sauce-labs-backpack";
export const BOTON_REMOVER_MOCHILA = "#remove-sauce-labs-backpack";
export const BOTON_AGREGAR_MAMELUCO = "#add-to-cart-sauce-labs-onesie";
export const BOTON_REMOVER_MAMELUCO = "#remove-sauce-labs-onesie";
export const BOTON_AGREGAR_CHAQUETA = "#add-to-cart-sauce-labs-fleece-jacket";
export const BOTON_REMOVER_CHAQUETA = "#remove-sauce-labs-fleece-jacket";
export const NOMBRE_PRODUCTO_MOCHILA = '.inventory_item:has(#remove-sauce-labs-backpack) [data-test="inventory-item-name"]';
export const PRECIO_PRODUCTO_MOCHILA = '[data-test="inventory-item-price"]:has(+ #remove-sauce-labs-backpack)';
export const NOMBRE_PRODUCTO_MAMELUCO = '.inventory_item:has(#remove-sauce-labs-onesie) [data-test="inventory-item-name"]';
export const PRECIO_PRODUCTO_MAMELUCO = '[data-test="inventory-item-price"]:has(+ #remove-sauce-labs-onesie)';
export const NOMBRE_PRODUCTO_CHAQUETA = '.inventory_item:has(#remove-sauce-labs-fleece-jacket) [data-test="inventory-item-name"]';
export const PRECIO_PRODUCTO_CHAQUETA = '[data-test="inventory-item-price"]:has(+ #remove-sauce-labs-fleece-jacket)';
export const NOMBRE_CARRITO_MOCHILA = '.cart_item_label:has(#remove-sauce-labs-backpack) [data-test="inventory-item-name"';
export const PRECIO_CARRITO_MOCHILA = '.cart_item_label:has(#remove-sauce-labs-backpack) [data-test="inventory-item-price"]';
export const NOMBRE_CARRITO_MAMELUCO = '.cart_item_label:has(#remove-sauce-labs-onesie) [data-test="inventory-item-name"';
export const PRECIO_CARRITO_MAMELUCO = '.cart_item_label:has(#remove-sauce-labs-onesie) [data-test="inventory-item-price"]';
export const NOMBRE_CARRITO_CHAQUETA = '.cart_item_label:has(#remove-sauce-labs-fleece-jacket) [data-test="inventory-item-name"';
export const PRECIO_CARRITO_CHAQUETA = '.cart_item_label:has(#remove-sauce-labs-fleece-jacket) [data-test="inventory-item-price"]';