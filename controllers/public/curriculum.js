
const CONTENEDOR_STEPPER = document.getElementById('contenedorStepper'),
    CONTENEDOR_OPCIONES_CV = document.getElementById('contenedorOpcionesCV');

document.addEventListener('DOMContentLoaded', async () => {
    // Se cambia el color del apartado donde se encuentra el usuario.
    cambiarColor('CV');
    // Llamada a la función para validar sesiones activas.
    const INFO = await cargarPlantilla();
    // Se verifica si el valor del índice es falso.
    if(INFO[1] != false){
        // Se muestra el contenedor con las opciones.
        CONTENEDOR_OPCIONES_CV.classList.remove('d-none');
    } else{
        // Se muestra el contenedor con el stepper.
        CONTENEDOR_STEPPER.classList.remove('d-none');
    }
});