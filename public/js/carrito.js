import { CarritoCard } from "../components/card.js";

const carritoContainer = document.getElementById('carrito-container');
const totalPrecioElement = document.getElementById('totalPrecio');
const cantidadProductosElement = document.getElementById('cantidadProductos');

const mostrarCarrito = (productos) => {
    carritoContainer.innerHTML = '';

    productos.forEach((producto) => {
        const { name, price, productId, image, quantity, talle } = producto;
        const cardHTML = CarritoCard({ image, name, price, quantity, productId, talle });
        carritoContainer.innerHTML += cardHTML;
    });

    const totalPrecio = productos.reduce((total, producto) => total + (producto.price * producto.quantity), 0);
    const cantidadProductos = productos.reduce((total, producto) => total + producto.quantity, 0);

    totalPrecioElement.textContent = `$${totalPrecio.toFixed(2)}`;
    cantidadProductosElement.textContent = cantidadProductos.toString();

    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', (event) => {
            const productId = boton.getAttribute('data-product-id');
            eliminarProducto(productId);
        });
    });
};


const eliminarProducto = (productId) => {
    let cartData = obtenerDatosLocalStorage();
    const nuevoCartData = cartData.filter(producto => parseInt(producto.productId) !== parseInt(productId));
    localStorage.setItem('cart', JSON.stringify(nuevoCartData));
    mostrarCarrito(nuevoCartData);
};

const obtenerDatosLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
};


// Obtener datos del localStorage y mostrarlos al cargar la página
const cartDataFromLocalStorage = obtenerDatosLocalStorage();
mostrarCarrito(cartDataFromLocalStorage);

//test
/*const carritoContainer = document.getElementById('carrito-container');
const totalPrecioElement = document.getElementById('totalPrecio');
const cantidadProductosElement = document.getElementById('cantidadProductos');
let cardIdCounter = 0; // Contador de IDs para las tarjetas

const mostrarCarrito = (productos) => {
    carritoContainer.innerHTML = '';

    productos.forEach((producto) => {
        const { name, price, productId, image, quantity, talle } = producto;
        const cardId = cardIdCounter++; // Generar un nuevo ID para la tarjeta
        const cardHTML = CarritoCard({ image, name, price, quantity, productId, talle, cardId });
        carritoContainer.innerHTML += cardHTML;
    });

    const totalPrecio = productos.reduce((total, producto) => total + (producto.price * producto.quantity), 0);
    const cantidadProductos = productos.reduce((total, producto) => total + producto.quantity, 0);

    totalPrecioElement.textContent = `$${totalPrecio.toFixed(2)}`;
    cantidadProductosElement.textContent = cantidadProductos.toString();

    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', (event) => {
            const cardId = boton.getAttribute('data-card-id');
            eliminarProducto(cardId);
        });
    });
};

const eliminarProducto = (cardId) => {
    let cartData = obtenerDatosLocalStorage();
    const nuevoCartData = cartData.filter((producto, index) => index !== parseInt(cardId));
    localStorage.setItem('cart', JSON.stringify(nuevoCartData));
    mostrarCarrito(nuevoCartData);
};

const obtenerDatosLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
};

// Obtener datos del localStorage y mostrarlos al cargar la página
const cartDataFromLocalStorage = obtenerDatosLocalStorage();
mostrarCarrito(cartDataFromLocalStorage);*/

