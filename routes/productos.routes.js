import { Router } from 'express'
import { readFile, writeFile } from 'fs/promises'
import { get_producto_byId, leerJsonProductos } from '../utils/pruductos.js'
import { createProd, findAll, findById, findByCategory, buscarProductoPorNombre, actualizarPrecioProducto } from '../db/models/productos.models.js'

const router = Router()

/* Rutas de usuarios */
/*const fileProductos = await readFile('./data/productos.json', 'utf-8') 
const productosItems = JSON.parse(fileProductos)*/

/*EndPoints desde MongoDB*/
router.post('/NuevoProdDB', async (req, res) => {
    const { nombre, desc, precio, categoria, imagen, talle } = req.body;

    try {
        const result = await createProd({ nombre, desc, precio, categoria, imagen, talle });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(400).json({ message: 'Error al crear el producto' });
    }
});

router.get('/todosDB', async (req, res) => {
    try {
        const result = await findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json()
    }
});

router.get('/ByIdDB/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await findById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json()
    }
});

router.get('/PorCategoriaDB/:categoria', async (req, res) => {
    const categoria = req.params.categoria
    try {
        const result = await findByCategory(categoria);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json()
    }
});

router.post('/BuscarProductoBD', async (req, res) => {
    const { nombre } = req.body;

    try {
        const producto = await buscarProductoPorNombre(nombre);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ message: `Producto ${nombre} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el producto', error: error.message });
    }
});


router.put('/precio/updateDB/:productId', async (req, res) => {
    const productId = req.params.productId;
    const { precio } = req.body;

    try {
        const productoActualizado = await actualizarPrecioProducto(productId, precio);
        if (productoActualizado) {
            res.status(200).json('Precio actualizado correctamente.');
        } else {
            res.status(404).json('No se encontró el producto.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Surgió un error al actualizar el precio.', error: error.message });
    }
});

/*EndPoints desde json*/
router.get('/todos', async (req, res) => {
    try {
        const productosItems = await leerJsonProductos();
        res.status(200).json(productosItems);
    } catch (error) {
        res.status(500).json({ error: 'Error al leer los datos de los productos' });
    }
});

router.get('/categoria/:categoria', async (req, res) => {
    const categoria = req.params.categoria;
    try {
        const productosItems = await leerJsonProductos();
        const productosFiltrados = productosItems.filter(producto => producto.categoria === categoria);
        res.status(200).json(productosFiltrados);
    } catch (error) {
        res.status(500).json({ error: 'Error al filtrar los productos por categoría' });
    }
});

router.get('/porID/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const productosItems = await leerJsonProductos()
    const result = get_producto_byId(id, productosItems);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json(`${id} no se encuentra`);
    }
});

router.get('/porPrecio/:precio', async (req, res) => {
    const precio = parseFloat(req.params.precio);

    try {
        const productosItems = await leerJsonProductos();
        const results = productosItems.filter(producto => producto.precio >= precio);
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(400).json(`No se encontraron productos con el precio ${precio}`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos por precio' });
    }
});

router.post('/BuscarProducto', async (req, res) => {
    const nombreProducto = req.body.nombre;

    try {
        const productosItems = await leerJsonProductos();
        const producto = productosItems.find(e => e.nombre === nombreProducto);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(400).json(`Producto ${nombreProducto} no encontrado`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el producto' });
    }
});

router.put('/precio/update/:productID', async (req, res) => {
    const Id = parseInt(req.params.productID);
    const nuevoPrecio = req.body.precio;

    try {
        const productosItems = await leerJsonProductos();
        const index = productosItems.findIndex(e => e.id === Id);
        if (index !== -1) {
            productosItems[index].precio = nuevoPrecio;
            await writeFile('./data/productos.json', JSON.stringify(productosItems, null, 2));
            res.status(200).json('Precio actualizado correctamente.');
        } else {
            res.status(400).json('No se encontró el producto.');
        }
    } catch (error) {
        res.status(500).json('Surgió un error al actualizar el precio.');
    }
});

export default router