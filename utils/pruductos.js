import { readFile  } from 'fs/promises' 

const fileProductos = await readFile('./data/productos.json', 'utf-8') 
const productosItems = JSON.parse(fileProductos) 

export const get_producto_byId = (Id)=>{
    return productosItems.find(e => e.id === Id)
}
