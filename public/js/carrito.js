import { CarritoCard } from "../components/card.js";
import { mostrarMensaje } from '../components/mensaje.js';

const carritoContainer = document.getElementById('carrito-container');
const totalPrecioElement = document.getElementById('totalPrecio');
const cantidadProductosElement = document.getElementById('cantidadProductos');

const mostrarCarrito = (productos) => {
    carritoContainer.innerHTML = '';

    productos.forEach((producto, index) => {
        const { name, price, productId, image, quantity, talle } = producto;
        const cardHTML = CarritoCard({ image, name, price, quantity, productId, talle, index });
        carritoContainer.innerHTML += cardHTML;
    });

    const totalPrecio = productos.reduce((total, producto) => total + (producto.price * 1 /*producto.quantity*/), 0);
    const cantidadProductos = productos.reduce((total, producto) => total + producto.quantity, 0);

    totalPrecioElement.textContent = `$${totalPrecio.toFixed(2)}`;
    cantidadProductosElement.textContent = cantidadProductos.toString();

    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', (event) => {
            const index = boton.getAttribute('data-index');
            eliminarProducto(index);
            mostrarMensaje('El producto ha sido eliminado del carrito', '#e74c3c', 2000);
        });
    });
};

const obtenerDatosLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
};

let cartData = obtenerDatosLocalStorage(); 

const eliminarProducto = (index) => {
    cartData.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cartData));
    mostrarCarrito(cartData);
};

const cartDataFromLocalStorage = obtenerDatosLocalStorage();
mostrarCarrito(cartDataFromLocalStorage);

document.getElementById('comprarProductos').addEventListener('click', async () => {
    const userSession = JSON.parse(sessionStorage.getItem('user')); 
    const userId = userSession?.Id;
    const fecha = new Date().toISOString(); 
    const direccion = document.getElementById('direccion').value; 
    const cartData = JSON.parse(localStorage.getItem('cart')) || []; 

    if (!userId) {
        alert('Usuario no identificado. Por favor, inicia sesión.');
        return;
    }

    if (!direccion) {
        alert('Por favor, ingresa tu dirección');
        return;
    }

    const total = cartData.reduce((acc, producto) => acc + (producto.price * 1 /*producto.quantity*/), 0);

    const productos = cartData.reduce((acc, producto) => { //acc = acumulador
        let prodIndex = acc.findIndex(p => p.id === producto.productId);
        if (prodIndex === -1) {
            acc.push({
                id: producto.productId,
                cantidad: producto.quantity,
                talles: [
                    {
                        talle: producto.talle,
                        cant: producto.quantity
                    }
                ]
            });
        } else {
            acc[prodIndex].cantidad += producto.quantity;
            let talleIndex = acc[prodIndex].talles.findIndex(t => t.talle === producto.talle);
            if (talleIndex === -1) {
                acc[prodIndex].talles.push({
                    talle: producto.talle,
                    cant: producto.quantity
                });
            } else {
                acc[prodIndex].talles[talleIndex].cant += producto.quantity;
            }
        }
        return acc;
    }, []);

    try {
        // Con esta llamada obtengo el último ID de ventas
        let response = await fetch('http://localhost:5000/ventas/ultimoIdVenta', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Error al obtener el último ID de venta');
        }
        
        let data = await response.json();
        let lastId = parseInt(data.ultimoId, 10);
        console.log('Ultimo id:', lastId)

        const nuevaVenta = {
            id: lastId + 1, 
            id_usuario: userId,
            fecha: fecha,
            total: total.toFixed(2),
            dirección: direccion,
            productos: productos
        };

        response = await fetch('http://localhost:5000/ventas/nuevaVenta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaVenta)
        });

        if (response.ok) {
            mostrarMensaje('Compra realizada con éxito', '#3498db', 5000);
            localStorage.removeItem('cart');
            document.getElementById('direccion').value = '';
            mostrarCarrito([]);
        } else {
            const errorData = await response.json();
            alert('Error al realizar la compra: ' + errorData.mensaje);
        }
    } catch (error) {
        console.error('Error al realizar la compra:', error);
        mostrarMensaje('Error al realizar la compra. Por favor, inténtalo de nuevo.', '#e74c3c', 5000);
    }
});

document.getElementById('eliminarProductos').addEventListener('click', async () => {
    localStorage.removeItem('cart');
    mostrarCarrito([]);
    mostrarMensaje('Todos los productos han sido eliminados del carrito', '#e74c3c', 5000);
})