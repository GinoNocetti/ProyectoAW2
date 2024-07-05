import { readFile } from 'fs/promises' 

const fileProductos = await readFile('./data/productos.json', 'utf-8') 
const productosItems = JSON.parse(fileProductos) 

export const get_producto_byId = (Id, productosItems)=>{
    return productosItems.find(e => e.id === Id)
}

export const leerJsonProductos = async () => {
    try {   
        const fileProductos = await readFile('./data/productos.json', 'utf-8');
        const productosItems = JSON.parse(fileProductos); 
        return productosItems;
    } catch (error){
        console.log('Error al leer el archivo de productos:', error);
        throw error;
    }
}