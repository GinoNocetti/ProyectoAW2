// public/js/categoria.js

import { CustomCard } from '../components/card.js';
import { addToCart } from '../utils/cart.controller.js';
/*Desde aquí*/

const obtenerProductos = async () => {
  const productos = await fetch('http://localhost:5000/productos/todos', {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
  }).then((res) => {
      if (!res.ok) {
          throw new Error("Error en la petición");
      }
      return res.json();
  }).catch(error => {
      console.error("Error:", error);
      throw new Error("Error en la petición");
  });

  return productos;
};

/*document.addEventListener('DOMContentLoaded', async () => {
  const productosContainer = document.getElementById('productos-container');

  try {
      const productos = await obtenerProductos();
      console.log("Productos recibidos:", productos); // Añade este console.log

      productos.forEach(producto => {
          const { id, nombre, desc, precio, imagen, talle } = producto;

          const cardHtml = CustomCard({
              img: imagen,
              title: nombre,
              desc: desc,
              precio: precio,
              productId: id,
              talles: talle
          });

          productosContainer.innerHTML += cardHtml;
      });
  } catch (error) {
      console.error('Error al obtener los productos:', error);
  }
});*/



const mostrarProductos = (productos) => {
  const contenedor = document.getElementById('productos-container'); // Ajusta según el ID del contenedor
  productos.forEach(producto => {
      const cardHtml = CustomCard({
          img: producto.imagen,
          title: producto.nombre,
          desc: producto.desc,
          precio: producto.precio,
          productId: producto.id,
          talles: producto.talle
      });
      contenedor.innerHTML += cardHtml; // Append the card HTML to the container
  });
};

// Obtener y mostrar productos
obtenerProductos().then(productos => {
  mostrarProductos(productos);
}).catch(error => {
  console.error('Error al obtener los productos:', error);
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
  }
});