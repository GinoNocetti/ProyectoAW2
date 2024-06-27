/*export const mostrarMensaje = (mensajeTexto, color = '#2ecc71', duracion = 2000) => {
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-personalizado');
    mensaje.textContent = mensajeTexto;

    /*mensaje.style.backgroundColor = color;
    mensaje.style.position = 'fixed';
    mensaje.style.bottom = '20px';
    mensaje.style.left = '50%';
    mensaje.style.transform = 'translateX(-50%)';
    mensaje.style.color = 'white';
    mensaje.style.padding = '10px';
    mensaje.style.borderRadius = '5px';
    mensaje.style.zIndex = '1000';
    mensaje.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.classList.add('fade-out');
    }, duracion - 500);

    setTimeout(() => {
        mensaje.remove();
    }, duracion);
};*/

// mensaje.js
export const mostrarMensaje = (mensajeTexto, color = '#2ecc71', duracion = 2000) => {
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-agregado');
    mensaje.textContent = mensajeTexto;

    mensaje.style.backgroundColor = color;

    document.body.appendChild(mensaje);

    // Aplicar la clase fade-out después de un tiempo
    setTimeout(() => {
        mensaje.classList.add('fade-out');
    }, duracion - 500); // Restar 500 ms para la transición

    // Eliminar el mensaje después de la duración completa
    setTimeout(() => {
        mensaje.remove();
    }, duracion);
};
