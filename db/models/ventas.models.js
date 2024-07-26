import { connectToDatabase } from "../connection.js";
import Venta from "../schemas/ventas.schemas.js";

export const createVenta = async (ventaData) => {
    try {
        await connectToDatabase();
        const nuevaVenta = await Venta.create(ventaData);
        return JSON.parse(JSON.stringify(nuevaVenta));
    } catch (error) {
        console.log(error);
        throw new Error('Error al agregar la venta');
    }
};

export const getVentaById = async (id) => {
    try {
        await connectToDatabase();
        const venta = await Venta.findById(id).populate('id_usuario').populate('productos.id');
        if (!venta) {
            throw new Error('Venta no encontrada');
        }
        return JSON.parse(JSON.stringify(venta));
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener la venta');
    }
};

export const getVentasByUsuario = async (id_usuario) => {
    try {
        await connectToDatabase();
        const ventas = await Venta.find({ id_usuario }).populate('id_usuario').populate('productos.id');
        return JSON.parse(JSON.stringify(ventas));
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener las ventas del usuario');
    }
};

export const obtenerDetallesVenta = async (ventaId) => {
    try {
        await connectToDatabase();
        const venta = await Venta.findById(ventaId).populate('productos.id'); // Ajusta según tu esquema
        if (!venta) {
            throw new Error('Venta no encontrada');
        }

        const detalles = {
            total: venta.total,
            productos: venta.productos.map(producto => ({
                id: producto.id,
                cantidad: producto.cantidad,
                talles: producto.talles
            }))
        };

        return detalles;
    } catch (error) {
        console.error('Error al obtener los detalles de la venta:', error);
        throw new Error('Error al obtener los detalles de la venta');
    }
};

export const actualizarDireccionVenta = async (ventaId, nuevaDireccion) => {
    try {
        await connectToDatabase();
        const ventaActualizada = await Venta.findByIdAndUpdate(
            ventaId,
            { dirección: nuevaDireccion },
            { new: true }
        );
        console.log('Venta actualizada:', ventaActualizada);
        return ventaActualizada;
    } catch (error) {
        console.error("Error al actualizar la dirección de la venta:", error);
        throw new Error('Error al actualizar la dirección de la venta');
    }
};