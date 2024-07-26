import { connectToDatabase } from "../connection.js"
import Productos from "../schemas/productos.schemas.js"

export const createProd = async ({ nombre, desc, precio, categoria, imagen, talle }) => {
    try {
        await connectToDatabase();
        const res = await Productos.create({ nombre, desc, precio, categoria, imagen, talle });
        
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.log(error);
    }
}

export const findAll = async()=> {
   try {
        await connectToDatabase();
        const res = await Productos.find().populate({path:"categoria"})
        return JSON.parse(JSON.stringify(res))
   } catch (error) {
        console.log(error)
   } 
}

export const findById = async(id)=> {
    try {
        await connectToDatabase();
        const res = await Productos.findById(id).populate({path:"categoria"})
        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    } 
 }

 export const findByCategory = async(categoria)=> {
    try {
        await connectToDatabase();
        const res = await Productos.find({categoria}).populate({path:"categoria"})
        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    } 
 }

 export const buscarProductoPorNombre = async (nombre) => {
    try {
        await connectToDatabase();
        const producto = await Productos.findOne({ nombre });
        return producto;
    } catch (error) {
        console.error('Error al buscar el producto:', error);
        throw new Error('Error al buscar el producto');
    }
};

export const actualizarPrecioProducto = async (productId, nuevoPrecio) => {
    try {
        await connectToDatabase();
        const productoActualizado = await Productos.findByIdAndUpdate(
            productId,
            { precio: nuevoPrecio },
            { new: true }
        );
        return productoActualizado;
    } catch (error) {
        console.error('Error al actualizar el precio del producto:', error);
        throw new Error('Error al actualizar el precio del producto');
    }
};