import { CustomCard } from "../components/card.js";
import { addToCart, getCartData } from "../utils/cart.controller.js";
import { mostrarMensaje } from '../components/mensaje.js';

window.addEventListener('load', () => {
    const selectCategoria = document.getElementById('selectCategoria');
    const btnFiltrar = document.getElementById('btnFiltrar');
    const productosContainer = document.getElementById('json-container');
  
    btnFiltrar.addEventListener('click', async () => {
        const categoriaSeleccionada = selectCategoria.value;
        try {
            const response = await fetch(`http://localhost:5000/productos/categoria/${encodeURIComponent(categoriaSeleccionada)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Error al cargar los productos');
            }
            const productos = await response.json();
            mostrarProductos(productos);
        } catch (error) {
            console.error('Error:', error);
        }
    });
  
    const mostrarProductos = (productos) => {
        productosContainer.innerHTML = ''; // Limpiar contenedor antes de agregar nuevas tarjetas
        productos.forEach(producto => {
            const cardHtml = CustomCard({
            img: producto.imagen,
            title: producto.nombre,
            desc: producto.desc,
            precio: producto.precio,
            productId: producto.id,
            talles: producto.talle
        });
        productosContainer.innerHTML += cardHtml; // Agregar nueva tarjeta al contenedor
        });
    };
});

document.getElementById('json-container').addEventListener('click', (event) => {
    const miBoton = event.target.closest('.btn-carrito');
    
    if (miBoton) {
        const card = miBoton.closest('.card');
        const productId = card.id;

        const productImage = card.querySelector('.card-img-top').getAttribute('src'); 
        const productName = card.querySelector('.card-title').innerText;
        const productPriceElement = card.querySelector('.card-price');  
        const productPrice = productPriceElement ? parseFloat(productPriceElement.innerText.replace('$', '').trim()) : 0;
        const productQuantity = parseInt(card.querySelector('#quantity').value);
        const selectedTalle = card.querySelector('#talle').value;


        const product = {
            productId,
            image: productImage,
            name: productName,
            price: productPrice,
            quantity: productQuantity,
            talle: selectedTalle,
        };

        addToCart(product);
        console.log('¡Producto agregado!');
        mostrarMensaje('Producto agregado al carrito', '#2ecc71', 2000);
    }
});