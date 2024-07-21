// Se almacena la ruta de la API del administrador para realizar consultas.
const API_USUARIO = 'services/private/administradores_service.php';
// Se almacena el formulario de login.
const FORM_LOGIN = document.getElementById('formLogin'), FORM_SIGNUP = document.getElementById('formSignUp');
// Se almacenan los elementos en las constantes.
const CONTENEDOR_LOGIN = document.getElementById('contenedorLogin'), CONTENEDOR_SIGNUP = document.getElementById('contenedorSignUp');
// Se almacenan las credenciales del aspirante.
const CONTRA = document.getElementById('claveSignup');
// Se almacenan los íconos que se muestran en el campo "Contraseña".
const VER_ICONO = document.getElementById('verIcono'), OCULTAR_ICONO = document.getElementById('ocultarIcono');

// Se declara la variable global que se utiliza para cambiar la visibilidad del campo "Contraseña".
var verContra = false;

document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para validar sesiones activas.
    cargarPlantilla();
    // Se verifica que la ruta actual sea el archivo index.html.
    if (location.href.substring(42) != 'index.html') {
        location.href = 'index.html';
    }
    // Petición para consultar los usuarios registrados.
    const DATA = await fetchData(API_USUARIO, 'readUsers');
    // Si la respuesta es satisfactoria se ejecuta el código.
    if(DATA.status){
        // Se muestra el form para iniciar sesión.
        CONTENEDOR_LOGIN.classList.remove('d-none');
    } else{
        // Se muestra el form para registrarse.
        CONTENEDOR_SIGNUP.classList.remove('d-none');
    }
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
    // Si se muestra el error se ejecuta el código.
    else if (DATA.error == "Credenciales incorrectas") {
        sweetAlert(3, DATA.error, false);
    }
    // Si la respuesta no es satisfactoria se muestra el error.
    else {
        sweetAlert(2, DATA.error, false);
    }
});

FORM_SIGNUP.addEventListener('submit', async(event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORM_SIGNUP);
    // Petición para iniciar sesión.
    const DATA = await fetchData(API_USUARIO, 'signUp', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {

        sweetAlert(1, "Registro completado", true, 'index.html');
    }
    // Si la respuesta no es satisfactoria se muestra el error.
    else {
        sweetAlert(2, DATA.error, false);
    }
});

// Esta función permite mostrar y ocultar la contraseña del campo claveSignUp.
function mostrarContra() {
    // Si el valor es verdadero se oculta la contraseña.
    if (verContra) {
        // Se oculta la contraseña.
        CONTRA.type = "password";
        // Se invierte el valor de la variable.
        verContra = !verContra;
        // Se centra el input de contraseña.
        CONTRA.focus();
        // Se muestra el ícono.
        VER_ICONO.classList.remove('d-none');
        // Se oculta el ícono.
        OCULTAR_ICONO.classList.add('d-none');
    } else {
        // Se oculta la contraseña.
        CONTRA.type = "text";
        // Se invierte el valor de la variable.
        verContra = !verContra;
        // Se muestra el ícono.
        OCULTAR_ICONO.classList.remove('d-none');
        // Se oculta el ícono.
        VER_ICONO.classList.add('d-none');
        // Se centra el input de contraseña.
        CONTRA.focus();
    }
}