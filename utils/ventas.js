import { readFile  } from 'fs/promises' 

const fileVentas= await readFile('./data/ventas.json', 'utf-8') 
const VentasItems = JSON.parse(fileVentas) 

export const get_ventas_byId = (Id, VentasItems)=>{
    return VentasItems.find(e => e.id === Id)
}

export const leerJsonVentas = async () => {
    try {   
        const fileVentas = await readFile('./data/ventas.json', 'utf-8')
        const ventasItems = JSON.parse(fileVentas) 
        return ventasItems
    } catch (error){
        console.log('Error al leer el archivo de ventas:', error)
        throw error;
    }
}

//test
export const guardarJsonVentas = async (ventas) => {
    try {
        await writeFile(fileVentas, JSON.stringify(ventas, null, 2));
    } catch (error) {
        console.log('Error al escribir en el archivo de ventas:', error);
        throw error;
    }
}
