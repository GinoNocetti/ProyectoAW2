import { connectToDatabase } from "../connection.js";
import Usuario from "../schemas/usuarios.schemas.js";
import Venta from "../schemas/ventas.schemas.js"
import bcrypt from 'bcrypt';

export const createUsuario = async({ nombre, apellido, email, contraseña }) => {
    try {
        await connectToDatabase();
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const res = await Usuario.create({ nombre, apellido, email, contraseña: hashedPassword });
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.log(error);
    }
};

/*Este anda a la perfección */
/*export const loginUsuario = async (email, contraseña) => {
    try {
        await connectToDatabase();
        const user = await Usuario.findOne({ email });

        if (user) {
            const match = await bcrypt.compare(contraseña, user.contraseña);
            if (match) {
                // Devuelve solo los campos necesarios
                const userData = {
                    id_usuario: user._id,
                    nombre: user.nombre,
                    apellido: user.apellido
                };
                return userData;
            } else {
                throw new Error('Usuario o contraseña incorrectos');
            }
        } else {
            throw new Error('El usuario no existe.');
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error interno del servidor');
    }
};*/

export const loginUsuario = async ({ email, contraseña }) => {
    try {
        await connectToDatabase();

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }
        const userData = {
            id_usuario: usuario._id,
            nombre: usuario.nombre,
            apellido: usuario.apellido
        };
        return userData;
    } catch (error) {
        throw error;
    }
};

export const findAllUsuarios = async() => {
    try {
        await connectToDatabase();
        const res = await Usuario.find({});
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.log(error);
    }
};

export const findByEmail = async(email) => {
    try {
        await connectToDatabase();
        const res = await Usuario.findOne({ email }, 'nombre apellido email contrasena');
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.log(error);
    }
};

export const findById = async(id) => {
    try {
        await connectToDatabase();
        const user = await Usuario.findById(id, 'email nombre apellido contrasena');
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log(error);
        throw new Error('Error al buscar usuario por ID');
    }
};

export const actualizarApellidoUsuario = async (id, nuevoApellido) => {
    try {
        await connectToDatabase();
        const usuario = await Usuario.findByIdAndUpdate(
            id,
            { apellido: nuevoApellido },
            { new: true }
        );
        return usuario;
    } catch (error) {
        console.error('Error actualizando el apellido:', error);
        throw new Error('Error al actualizar el apellido del usuario');
    }
};

export const borrarUsuarioYVentas = async (id) => {
    try {
        await connectToDatabase();
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);
        if (usuarioEliminado) {
            await Venta.deleteMany({ id_usuario: id });
        }
        return usuarioEliminado;
    } catch (error) {
        console.error('Error eliminando usuario y sus ventas:', error);
        throw new Error('Error al eliminar el usuario y sus ventas');
    }
};