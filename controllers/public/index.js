

document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para validar sesiones activas.
    cargarPlantilla();
    // Petición para consultar el correo y el id del aspirante.
    const DATA = await fetchData(USER_API, 'getUser');
    // Se comprueba si existe una sesión, de lo contrario se requiere iniciar sesión.
    if(DATA.session){
        // Se direcciona a la página web de bienvenida.
        location.href = 'inicio.html';
    } else{
    }
});