// Se almacena la ruta de la API del administrador para realizar consultas.
const API_USUARIO = 'services/private/administradores_service.php';
// Se almacena el formulario de login.
const FORM_LOGIN = document.getElementById('formLogin');

document.addEventListener('DOMContentLoaded', async () => {
    // Se verifica que la ruta actual sea el archivo index.html.
    if (location.href != 'http://localhost/portaladom/views/private/index.html') {
        location.href = 'index.html';
    }
    // Llamada a la función para validar sesiones activas.
    cargarPlantilla();
});

// Método del evento para cuando se envía el formulario de inicio de sesión.
FORM_LOGIN.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORM_LOGIN);
    // Petición para iniciar sesión.
    const DATA = await fetchData(API_USUARIO, 'logIn', FORM);

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'inicio.html');
    }
    // Si se muestra el error se ejecuta el código.
    else if (DATA.error == "Su cuenta ha sido desactivada por un administrador") {
        sweetAlert(3, DATA.error, false);
    }
    // Si la respuesta no es satisfactoria se muestra el error.
    else {
        sweetAlert(2, DATA.error, false);
    }
});
