import { readFile  } from 'fs/promises' 

const fileUsuarios = await readFile('./data/usuarios.json', 'utf-8') 
const usuariosItems = JSON.parse(fileUsuarios) 

export const get_user_byId = (id)=>{
    return usuariosItems.find(e => e.Id === id)
}