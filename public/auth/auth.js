import { addSession } from "../utils/sessionstorage.controller.js";

const btnLogin = document.getElementById('btnLogin')

/*const auth = async ({ email, password }) => {
    try {
        const response = await fetch('http://localhost:5000/usuarios/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "Email": email, "Contraseña": password })
        });
        
        if (!response.ok) {
            throw new Error("Error en la petición");
        }
        
        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Error:", error);
        throw new Error("Error en la petición");
    }
};*/
const auth = async ({ email, password }) => {
    try {
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


btnLogin.addEventListener('click', async ()=>{
    event.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if(email !== '' && password !== ''){
        try{
            const user = await auth({email, password})
            addSession(user)
            window.location.href = "./pages/home.html"
            console.log('Se ha iniciado sesión!')
        }catch{
            alert('No se encontró al usuario')
        }
    }else{
        alert('Invalid username or password')
    }
})

/*const auth = async({email, password}) =>{
    const user = await fetch('http://localhost:5000/usuarios/login',{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"Email":email, "Contraseña":password})
    }).then((res)=> {
        if(!res.ok){
            throw new Error("Error en la petición");
        }
        return res.json()
    }).catch(error =>{
        console.error("Error:", error)
        throw new Error("Error en la petición")
    });
    return user
}*/

/*btnLogin.addEventListener('click', ()=>{
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if(email !== '' && password !== ''){
        alert('Correct username or password')
    }else{
        alert('Invalid username or password')
    }
})*/

/*const auth = async ({ email, password }) => {
    try {
        const response = await fetch('http://localhost:5000/usuarios/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }) // Usando destructuring y camelCase
        });
        
        if (!response.ok) {
            throw new Error("Error en la petición"); // Lanza el error original
        }
        
        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Error:", error);
        throw new Error("Error en la petición: " + error.message); // Mensaje de error más descriptivo
    }
};*/


/*const auth = async ({ email, password }) => {
    try {
        const response = await fetch('http://localhost:5000/usuarios/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "Email": email, "Contraseña": password })
        });
        
        if (!response.ok) {
            throw new Error("Error en la petición");
        }
        
        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Error:", error);
        throw new Error("Error en la petición");
    }
};

btnLogin.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevenir el envío del formulario
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email !== '' && password !== '') {
        try {
            const user = await auth({ email, password });
            if (user.status) {
                alert(`¡Bienvenido ${user.name} ${user.Apellido}!`);
                // Aquí puedes redirigir al usuario a otra página o hacer lo que necesites
            } else {
                document.getElementById('error-message').style.display = 'block';
            }
        } catch (error) {
            document.getElementById('error-message').style.display = 'block';
        }
    } else {
        alert('Invalid username or password');
    }
});*/


