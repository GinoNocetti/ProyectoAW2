import { addSession } from "../utils/sessionstorage.controller.js";
import { mostrarMensaje } from "../components/mensaje.js";

window.addEventListener('load', () => {
    sessionStorage.clear();
});

document.getElementById('loginForm').addEventListener('submit', async (event) => {
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
});