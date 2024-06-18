import { CustomCard } from "../components/card.js";
import { addToCart, getCartData } from "../utils/cart.controller.js";

document.addEventListener('DOMContentLoaded', () => {
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
/*const AgregarProductomsj = () => {
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-agregado');
    mensaje.textContent = 'Producto agregado al carrito';
  
    document.body.appendChild(mensaje);
  
    setTimeout(() => {
      mensaje.remove();
    }, 2000);
};*/

const AgregarProductomsj = () => {
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-agregado');
    mensaje.textContent = 'Producto agregado al carrito';

    // Estilos para el mensaje (opcional, para que se vea bien)
    mensaje.style.position = 'fixed';
    mensaje.style.bottom = '20px'; // Separación desde el límite inferior
    mensaje.style.left = '50%';
    mensaje.style.transform = 'translateX(-50%)'; // Centrar horizontalmente
    mensaje.style.backgroundColor = '#2ecc71';
    mensaje.style.color = 'white';
    mensaje.style.padding = '10px';
    mensaje.style.borderRadius = '5px';
    mensaje.style.zIndex = '1000';
    mensaje.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Sombra opcional

    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 2000);
};

/*Nuevo codigo*/

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
        AgregarProductomsj(product);
    }
});

/*Hasta aquí */

/*document.getElementById('json-container').addEventListener('click', (event) => {
    const miBoton = event.target.closest('.btn-carrito');
    if (miBoton) {
        console.log("Artículo/s agregados al carrito");
        AgregarProductomsj();
    }
});*/