// Se almacena la ruta de la API del aspirante para realizar consultas.
const API_USUARIO = 'services/public/aspirantes_service.php';
// Se almacena el elemento donde se cargará el nombre del aspirante.
const NOMBRE_USUARIO = document.getElementById('nombre');
// Se almacena el elemnento donde se cargará la bienvenida.
const BIENVENIDA = document.getElementById('bienvenida');

document.addEventListener('DOMContentLoaded', async () => {
    // Se cambia el color del apartado donde se encuentra el usuario y se restablecen los otros colores.
    cambiarColor('Inicio');
    // Llamada a la función para validar sesiones activas.
    const INFO = await cargarPlantilla();    
    // Se verifica el género del usuario.
    if(INFO[2] == "Mujer"){
        // Se muestra el mensaje.
        BIENVENIDA.textContent = "¡Bienvenida";
    } else{
        // Se muestra el mensaje.
        BIENVENIDA.textContent = "¡Bienvenido";
    }
    // Se carga el nombre del usuario en el elemento de texto.
    NOMBRE_USUARIO.textContent = INFO[0];
});