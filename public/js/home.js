/*Comportamiento del navbar*/ 
import { navbarComponent } from "../components/navbar.js"
import { CustomCard } from "../components/card.js"

let navConteiner = document.querySelector('header')

window.addEventListener('load', ()=> {
    navConteiner.innerHTML = navbarComponent
})


/*const mostrarProductos = (productos) => {
    const contenedor = document.getElementById('json-container');
    productos.forEach(producto => {
      const cardHTML = CustomCard({
        img: producto.imagen,
        title: producto.nombre,
        desc: producto.desc,
        precio: producto.precio,
        productId: producto.id
      });
      contenedor.innerHTML += cardHTML;
    });
  };
  
  // Fetch para obtener los productos del archivo JSON
  fetch('/data/productos.json')
    .then(response => response.json())
    .then(data => {
      mostrarProductos(data);
    })
    .catch(error => console.error('Error al cargar los productos:', error));*/  