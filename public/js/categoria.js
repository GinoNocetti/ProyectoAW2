import { CustomCard } from '../components/card.js';
import { addToCart } from '../utils/cart.controller.js';
import { mostrarMensaje } from '../components/mensaje.js';
import { obtenerProductos, obtenerProductosPorCategoria } from './api.js';

window.addEventListener('load', () => {
    mostrarMensaje('Las secciones de productos están deshabilitadas temporalmente.', '#f1c40f', 2000)

    const mostrarProductos = (productos) => {
        const contenedor = document.getElementById('productos-container');
        contenedor.innerHTML = '';
        productos.forEach(producto => {
            const cardHtml = CustomCard({
                img: producto.imagen,
                title: producto.nombre,
                desc: producto.desc,
                precio: producto.precio,
                productId: producto.id,
                talles: producto.talle
                });
            contenedor.innerHTML += cardHtml;
        });
    };

    const inicializarEventos = () => {
        document.getElementById('btnTodos').addEventListener('click', async () => {
            const productos = await obtenerProductos();
            mostrarProductos(productos);
        });

        document.getElementById('btnPrendasSuperiores').addEventListener('click', async () => {
            const productos = await obtenerProductosPorCategoria('Prendas superiores');
            mostrarProductos(productos);
        });

        document.getElementById('btnPrendasInferiores').addEventListener('click', async () => {
            const productos = await obtenerProductosPorCategoria('Prendas inferiores');
            mostrarProductos(productos);
        });

        document.getElementById('btnJoyeria').addEventListener('click', async () => {
            const productos = await obtenerProductosPorCategoria('Joyería');
            mostrarProductos(productos);
        });
    };
  // Cargar todos los productos inicialmente
  /*obtenerProductos().then(productos => {
      mostrarProductos(productos);
  }).catch(error => {
      console.error('Error al obtener los productos:', error);
  });*/

  // Inicializar eventos
  inicializarEventos();
});

document.getElementById('productos-container').addEventListener('click', (event) => {
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

      const totalPrice = (productPrice * productQuantity).toFixed(2);

      const product = {
          productId,
          image: productImage,
          name: productName,
          price: totalPrice,
          quantity: productQuantity,
          talle: selectedTalle
      };

      addToCart(product);
      console.log('¡Producto agregado!');
      mostrarMensaje('Producto agregado al carrito', '#2ecc71', 2000);
  }
});
