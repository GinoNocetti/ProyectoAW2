import { Router } from 'express'
import { readFile, writeFile } from 'fs/promises'
import { get_ventas_byId, leerJsonVentas } from '../utils/ventas.js'

const router = Router()

/* Rutas de usuarios */
/*const fileVentas= await readFile('./data/ventas.json', 'utf-8') 
const VentasItems = JSON.parse(fileVentas) */

router.get('/porID/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const result = get_ventas_byId(id)
    /*const result = ventasItems.find(venta => venta.id === id);*/
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json(`No se encontró la venta con el ID ${id}`);
    }
});

router.get('/porUsuario/:id_usuario', async (req, res) => {
    const id_usuario = parseInt(req.params.id_usuario);
    const ventasItems = await leerJsonVentas()
    const result = ventasItems.filter(venta => venta.id_usuario === id_usuario);

    if (result.length > 0) {
        res.status(200).json(result);
    } else {
        res.status(400).json(`No se encontraron ventas para el usuario con el ID ${id_usuario}`);
    }
});

router.get('/ultimoIdVenta', async (req, res) => {
    try {
        const VentasItems = await leerJsonVentas();
        const lastId = VentasItems.length > 0 ? VentasItems[VentasItems.length - 1].id : 0;
        res.status(200).json({ ultimoId: lastId });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el último ID de venta', error });
    }
});

router.post('/detalles', (req, res) => {
    const id = parseInt(req.body.id);

    const venta = get_ventas_byId(id)
    if (venta) {
        const detalles = {
            total: venta.total,
            productos: venta.productos
        };
        res.status(200).json(detalles);
    } else {
        res.status(400).json(`No se encontró la venta con el ID ${id}`);
    }
});

router.post('/nuevaVenta', async (req, res) => {
    const nuevaVenta = req.body;

    try {
        const VentasItems = await leerJsonVentas();
        
        const ventaExistente = VentasItems.find(venta => venta.id === nuevaVenta.id);
        if (ventaExistente) {
            return res.status(400).json({ mensaje: 'El ID de la venta ya existe' });
        }
        
        VentasItems.push(nuevaVenta);
        writeFile('./data/ventas.json', JSON.stringify(VentasItems, null, 2));
        res.status(201).json({ mensaje: 'Venta agregada exitosamente', venta: nuevaVenta });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al agregar la venta', error });
    }
});

router.put('/direccion/update/:id', (req, res) => {
    const Id = parseInt(req.params.id);
    const nuevaDireccion = req.body.dirección;

    const index = VentasItems.findIndex(venta => venta.id === Id);
    if (index !== -1) {
        VentasItems[index].dirección = nuevaDireccion;

        try {
            writeFile('./data/ventas.json', JSON.stringify(VentasItems, null, 2));
            res.status(200).json(`La dirección del ID ${Id} se actualizó correctamente.`);
        } catch (error) {
            res.status(500).json('Error al guardar los cambios en la venta.');
        }
    } else {
        res.status(400).json(`No se encontró la venta con el ID ${id}`);
    }
});

export default router  