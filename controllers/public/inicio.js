// Se almacena la ruta de la API del aspirante para realizar consultas.
const API_USUARIO = 'services/public/aspirantes_service.php';
// Se almacena el elemento donde se cargará el nombre del aspirante.
const NOMBRE_USUARIO = document.getElementById('nombre');

document.addEventListener('DOMContentLoaded', async () => {
    // Se cambia el color del apartado donde se encuentra el usuario y se restablecen los otros colores.
    cambiarColor('Inicio');
    // Llamada a la función para validar sesiones activas.
    await cargarPlantilla();
    // Se carga el nombre del usuario en el elemento de texto.
    NOMBRE_USUARIO.textContent = nombreUsuario;
});