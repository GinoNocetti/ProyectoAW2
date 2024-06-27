import { addSession } from "../utils/sessionstorage.controller.js";
import { mostrarMensaje } from "../components/mensaje.js";

const btnLogin = document.getElementById('btnLogin')

const auth = async ({ email, password }) => {
    try {
        console.log('Datos enviados:', { email, password });
        const response = await fetch('http://localhost:5000/usuarios/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "Email": email, "Contraseña": password }) // Usar "Contraseña" en lugar de "password"
        });
        
        if (!response.ok) {
            throw new Error("Error en la petición");
        }
        
        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Error en la autenticación:", error); // Cambiar el mensaje de error para ser más descriptivo
        throw new Error("Error en la autenticación: " + error.message); // Proporcionar un mensaje de error más descriptivo
    }
};

btnLogin.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Email ingresado:', email); 
    console.log('Contraseña ingresada:', password);

    if(email !== '' && password !== ''){
        try{
            const user = await auth({email, password});
            console.log('Usuario autenticado:', user);
            addSession(user);
            window.location.href = "./pages/home.html";
            console.log('Se ha iniciado sesión!');
        }catch(error){ 
            console.error(error); 
            mostrarMensaje('No se encontró al usuario', '#e74c3c', 5000);
        }
    }else{
        mostrarMensaje('Usuario o contraseña invalida', '#e74c3c', 5000);
    }
});

/*document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/usuarios/iniciarSesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: email, Contraseña: password })
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.mensaje);
            //window.location.href = "./pages/home.html";
        } else {
            const errorData = await response.json();
            alert(errorData.mensaje);
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
});
*/