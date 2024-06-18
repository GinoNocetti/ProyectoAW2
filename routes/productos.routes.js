import { Router } from 'express'
import { readFile, writeFile } from 'fs/promises'
import { get_producto_byId } from '../utils/pruductos.js'

const router = Router()

/* Rutas de usuarios */
const fileProductos = await readFile('./data/productos.json', 'utf-8') 
const productosItems = JSON.parse(fileProductos) 

router.get('/todos', (req, res) => {
    try{
        res.status(200).json(productosItems);
    }catch(error){
        res.status(500).json({ error: 'Error al leer los datos de los productos' })
    }
});

router.get('/categoria/:categoria', async (req, res) => {
    const categoria = req.params.categoria;
    try {
        const productosFiltrados = productosItems.filter(producto => producto.categoria === categoria);
        res.status(200).json(productosFiltrados);
    } catch (error) {
        res.status(500).json({ error: 'Error al filtrar los productos por categoría' });
    }
});

router.get('/porID/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const result = get_producto_byId(id);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json(`${id} no se encuentra`);
    }
});

router.get('/porPrecio/:precio', (req, res) => {
    const precio = parseFloat(req.params.precio);

    const results = productosItems.filter(producto => producto.precio === precio);
    if (results.length > 0) {
        res.status(200).json(results);
    } else {
        res.status(400).json(`No se encontraron productos con el precio ${precio}`);
    }
});

router.post('/BuscarProducto', (req, res) => {
    const nombreProducto = req.body.nombre;

    const producto = productosItems.find(e => e.nombre === nombreProducto);
    if (producto) {
        res.status(200).json(producto);
    } else {
        res.status(400).json(`Producto ${nombreProducto} no encontrado`);
    }
});

router.put('/precio/update/:productID', (req, res) => {
    const Id = parseInt(req.params.productID);
    const nuevoPrecio = req.body.precio;

    try {
        const index = productosItems.findIndex(e => e.id === Id);
        if (index !== -1) {
            productosItems[index].precio = nuevoPrecio;
            writeFile('./data/productos.json', JSON.stringify(productosItems, null, 2));
            res.status(200).json('Precio actualizado correctamente.');
        } else {
            res.status(400).json('No se encontró el producto.');
        }
    } catch (error) {
        res.status(500).json('Surgió un error al actualizar el precio.');
    }
});

export default router