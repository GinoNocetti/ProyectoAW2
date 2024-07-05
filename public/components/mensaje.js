export const mostrarMensaje = (mensajeTexto, color = '#2ecc71', duracion = 2000) => {
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-agregado');
    mensaje.textContent = mensajeTexto;

    mensaje.style.backgroundColor = color;

    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.classList.add('fade-out');
    }, duracion - 500);

    setTimeout(() => {
        mensaje.remove();
    }, duracion);
};
