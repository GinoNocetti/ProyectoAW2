import { Router } from 'express'
import { readFile, writeFile } from 'fs/promises'
import { get_user_byId } from '../utils/usuarios.js'

const router = Router()

/* Rutas de usuarios */
const fileUsuarios = await readFile('./data/usuarios.json', 'utf-8') 
const usuariosItems = JSON.parse(fileUsuarios) 

const fileVentas= await readFile('./data/ventas.json', 'utf-8') 
const VentasItems = JSON.parse(fileVentas) 

router.get('/porID/:Id', (req, res)=>{
    const id = parseInt(req.params.Id)

    const result = get_user_byId(id)
    if(result){
        res.status(200).json(result)
    }
    else{
        res.status(400).json(`${id} no se encuentra`)
    }
})

router.get('/porNombre/:nombre', (req, res) => {
    const nombre = req.params.nombre.toLowerCase();

    const results = usuariosItems.filter(user => user.Nombre.toLowerCase().includes(nombre));
    if (results.length > 0) {
        res.status(200).json(results);
    } else {
        res.status(400).json(`No se encontraron usuarios con el nombre ${nombre}`);
    }
});


router.post('/login', (req, res) => {
    const correo = req.body.Email;
    const contraseña = req.body.Contraseña;

    const result = usuariosItems.find(e => e.Email === correo && e.Contraseña === contraseña);
    if (result) {
        res.status(200).json(`¡Bienvenido ${result.Nombre} ${result.Apellido}!`);
    } else {
        res.status(400).json(`${correo} no se encuentra`);
    }
});

router.put('/apellido/update/:userID', (req, res)=>{
    const id = parseInt(req.params.userID)
    const nuevoApellido = req.body.Apellido
    try{
        const index = usuariosItems.findIndex(e => e.Id == id)
        if(index !== -1){
            usuariosItems[index].Apellido = nuevoApellido
            writeFile('./data/usuarios.json', JSON.stringify(usuariosItems, null, 2))
            res.status(200).json('Apellido actualizado correctamente.')
        }else{
            res.status(400).json('No se encontró al usuario.')
        }
    }catch(error){
        res.send(500).json('Surgió un error al actualizar el apellido.')
    }
})

router.delete('/borrarUsuario/:userID', (req, res)=>{
    const user_id = parseInt(req.params.userID)
    try{
        const index = usuariosItems.findIndex(e => e.Id === user_id)
        if(index !== -1){
            usuariosItems.splice(index, 1)

            const ventasFiltradas = VentasItems.filter(venta => venta.id_usuario !== user_id)
            const ventasEliminadas = VentasItems.length !== ventasFiltradas.length

            writeFile('./data/usuarios.json', JSON.stringify(usuariosItems, null, 2))
            writeFile('./data/ventas.json', JSON.stringify(ventasFiltradas, null, 2))

            if (ventasEliminadas) {
                res.status(200).json(`Usuario y sus ventas asociadas fueron eliminados correctamente.`)
            } else {
                res.status(200).json('Usuario eliminado correctamente.')
            }
        }else{
            res.status(400).json('No se encontró al usuario.')
        }
    }catch(error){
        res.send(500).json('Surgió un error al eliminar al usuario.')
    }
})

export default router