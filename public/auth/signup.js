import { mostrarMensaje } from '../components/mensaje.js';

/*Función desde los json*/
/*document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        mostrarMensaje('Las contraseñas ingresadas no coinciden.', '#e74c3c', 3000);
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/usuarios/agregarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nombre: nombre,
                Apellido: apellido,
                Email: email,
                Contraseña: password
            })
        });

        const result = await response.json();

        if (response.status === 201) {
            mostrarMensaje('Registro exitoso. Ahora puedes iniciar sesión.', '#2ecc71', 3000);
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 2000);       
        } else {
            mostrarMensaje('Error al intentar registrar usuario.', '#e74c3c', 3000);
        }
    } catch (error) {
        console.error('Error en la solicitud de registro:', error);
        mostrarMensaje('No se ha podido registrar el usuario.', '#e74c3c', 3000);
    }
});*/

/*Desde la BD*/
document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        mostrarMensaje('Las contraseñas ingresadas no coinciden.', '#e74c3c', 3000);
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/usuarios/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                apellido: apellido,
                email: email,
                contraseña: password
            })
        });

        const result = await response.json();

        if (response.status === 201) {
            mostrarMensaje('Registro exitoso. Ahora puedes iniciar sesión.', '#2ecc71', 3000);
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 2000);       
        } else {
            mostrarMensaje(result.message || 'Error al intentar registrar usuario.', '#e74c3c', 3000);
        }
    } catch (error) {
        console.error('Error en la solicitud de registro:', error);
        mostrarMensaje('No se ha podido registrar el usuario.', '#e74c3c', 3000);
    }
});