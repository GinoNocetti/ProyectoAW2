import { Router } from 'express'
import { readFile, writeFile } from 'fs/promises'
import { get_user_byId, leerJsonUsuarios} from '../utils/usuarios.js'
import { leerJsonVentas } from '../utils/ventas.js'
import { loginUsuario, createUsuario, findById, findByEmail, findAllUsuarios, actualizarApellidoUsuario, borrarUsuarioYVentas } from '../db/models/usuarios.models.js';
import bcrypt from 'bcrypt';

const router = Router()

/* Rutas de usuarios */
/* const fileUsuarios = await readFile('./data/usuarios.json', 'utf-8') 
const usuariosItems = JSON.parse(fileUsuarios) 

const fileVentas= await readFile('./data/ventas.json', 'utf-8') 
const VentasItems = JSON.parse(fileVentas) */

/*Endpoints desde la BD*/

router.get('/wake-up', (req, res) => {
    res.status(200).send('Server is awake');
});

//PRIMER INTENTO
router.post('/create', async (req, res) => {
    const { nombre, apellido, email, contraseña } = req.body;
    try {
        const result = await createUsuario({ nombre, apellido, email, contraseña });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error al crear usuario' });
    }
});


/*router.post('/loginBD', async (req, res) => {
    const { email, contraseña } = req.body;
    try {
        const userData = await loginUsuario(email, contraseña);
        res.status(200).json(userData);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});*/

router.post('/loginDB', async (req, res) => {
    const { email, contraseña } = req.body;
    try {
        const result = await loginUsuario({ email, contraseña });
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ status: false, message: error.message });
    }
});

router.get('/findAll', async (req, res) => {
    try {
        const result = await findAllUsuarios();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: 'Error al obtener los usuarios' });
    }
});

router.get('/findByEmail/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const result = await findByEmail(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: 'Error al encontrar el usuario' });
    }
});

router.get('/buscarPorId/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await findById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error al buscar usuario por ID' });
    }
});

router.put('/actualizarApellido/:id', async (req, res) => {
    const { id } = req.params;
    const { apellido } = req.body;

    try {
        const usuarioActualizado = await actualizarApellidoUsuario(id, apellido);
        if (usuarioActualizado) {
            res.status(200).json({ message: 'Apellido actualizado con éxito', usuario: usuarioActualizado });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el apellido del usuario', error: error.message });
    }
});

router.delete('/borrarUsuarioBD/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const usuarioEliminado = await borrarUsuarioYVentas(id);
        if (usuarioEliminado) {
            res.status(200).json({ message: 'Usuario y sus ventas asociadas fueron eliminados correctamente' });
        } else {
            res.status(404).json({ message: 'No se encontró al usuario' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Surgió un error al eliminar al usuario y sus ventas', error: error.message });
    }
});

/*Endpoints desde el json*/
const obtenerSiguienteId = async () => {
    const usuariosItems = await leerJsonUsuarios();
    const maxId = usuariosItems.reduce((max, user) => (user.Id > max ? user.Id : max), 0);
    return maxId + 1;
};

router.get('/porID/:Id', async (req, res)=>{
    const id = parseInt(req.params.Id)
    const usuariosItems = await leerJsonUsuarios();
    const result = get_user_byId(id, usuariosItems)
    if(result){
        res.status(200).json(result)
    }
    else{
        res.status(400).json(`${id} no se encuentra`)
    }
})

router.get('/porNombre/:nombre', async (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    const usuariosItems = await leerJsonUsuarios();

    const results = usuariosItems.filter(user => user.Nombre.toLowerCase().includes(nombre));
    if (results.length > 0) {
        res.status(200).json(results);
    } else {
        res.status(400).json(`No se encontraron usuarios con el nombre ${nombre}`);
    }
});

router.post('/login', async (req, res) => {
    const { Email, Contraseña } = req.body;

    try {
        const usuariosItems = await leerJsonUsuarios();
        const usuario = usuariosItems.find(user => user.Email === Email);

        if (usuario) {        
            const match = await bcrypt.compare(Contraseña, usuario.Contraseña);

            if (match) {
                const data = {
                    Id: usuario.Id,
                    Nombre: usuario.Nombre,
                    Apellido: usuario.Apellido,
                    status: true
                };
                res.status(200).json(data);
            } else {
                res.status(401).json({ message: 'Correo o contraseña incorrectos' });
            }
        } else {
            res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al intentar iniciar sesión' });
    }
});

router.post('/agregarUsuario', async (req, res) => {
    const { Nombre, Apellido, Email, Contraseña } = req.body;

    try {
        const usuariosItems = await leerJsonUsuarios();
        const hashedPassword = await bcrypt.hash(Contraseña, 10);

        const nuevoId = await obtenerSiguienteId();

        const nuevoUsuario = {
            Id: nuevoId,
            Nombre,
            Apellido,
            Email,
            Contraseña: hashedPassword
        };
        usuariosItems.push(nuevoUsuario);

        await writeFile('./data/usuarios.json', JSON.stringify(usuariosItems, null, 2));

        res.status(201).json({ status: true, message: 'Usuario agregado correctamente.', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        res.status(500).json({ status: false, message: 'Error interno del servidor.' });
    }
});

router.put('/apellido/update/:userID', async (req, res)=>{
    const id = parseInt(req.params.userID)
    const nuevoApellido = req.body.Apellido
    try{
        const usuariosItems = await leerJsonUsuarios();
        const index = usuariosItems.findIndex(e => e.Id == id)
        if(index !== -1){
            usuariosItems[index].Apellido = nuevoApellido
            await writeFile('./data/usuarios.json', JSON.stringify(usuariosItems, null, 2))
            res.status(200).json('Apellido actualizado correctamente.')
        }else{
            res.status(400).json('No se encontró al usuario.')
        }
    }catch(error){
        res.send(500).json('Surgió un error al actualizar el apellido.')
    }
})

router.delete('/borrarUsuario/:userID', async (req, res)=>{
    const user_id = parseInt(req.params.userID)
    try{
        const usuariosItems = await leerJsonUsuarios();
        const VentasItems = await leerJsonVentas();
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