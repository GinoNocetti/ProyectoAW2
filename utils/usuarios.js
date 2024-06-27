import { readFile  } from 'fs/promises' 

const fileUsuarios = await readFile('./data/usuarios.json', 'utf-8') 
const usuariosItems = JSON.parse(fileUsuarios) 

export const get_user_byId = (id, usuariosItems)=>{
    return usuariosItems.find(e => e.Id === id)
}

export const leerJsonUsuarios = async () => {
    try {   
        const fileUsuarios = await readFile('./data/usuarios.json', 'utf-8')
        const usuariosItems = JSON.parse(fileUsuarios) 
        return usuariosItems
    } catch (error){
        console.log('Error al leer el archivo de usuarios:', error)
        throw error;
    }
}
