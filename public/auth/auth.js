import { addSession } from "../utils/sessionstorage.controller.js";
import { mostrarMensaje } from "../components/mensaje.js";

window.addEventListener('load', () => {
    sessionStorage.clear();
});

/*Función para los json*/
/*document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: email, Contraseña: password })
        });

        const result = await response.json();

        if (response.status === 200) {
            addSession(result);
            console.log('Usuario:', result);
            window.location.href = "./pages/home.html";
        } else {
            mostrarMensaje('No se encontró al usuario', '#e74c3c', 3000);
        }
    } catch (error) {
        mostrarMensaje('Usuario o contraseña invalida', '#e74c3c', 5000);
    }
});*/
/*este anda con el error del principio*/
/*document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/usuarios/loginBD', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, contraseña: password })
        });

        const result = await response.json();

        if (response.status === 200) {
            addSession(result);
            console.log('Usuario:', result);
            window.location.href = "./pages/home.html";
        } else {
            mostrarMensaje('No se encontró al usuario', '#e74c3c', 3000);
        }
    } catch (error) {
        mostrarMensaje('Usuario o contraseña invalida', '#e74c3c', 5000);
    }
});*/

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await fetch('http://localhost:5000/usuarios/wake-up');
        console.log('Servidor despertado');
    } catch (error) {
        console.error('Error al despertar el servidor:', error);
    }
});

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/usuarios/loginDB', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, contraseña: password })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setTimeout(async () => {
            const result = await response.json();
            addSession(result);
            console.log('Usuario:', result);
            window.location.href = "./pages/home.html";
        }, 1500);
        /*const result = await response.json();
        addSession(result);
        console.log('Usuario:', result);
        window.location.href = "./pages/home.html";*/
    } catch (error) {
        console.error('Error de conexión o de servidor:', error);
        mostrarMensaje('Usuario o contraseña inválida', '#e74c3c', 5000);
    }
});
