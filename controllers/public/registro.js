// Se almacena la ruta de la API del aspirante para realizar consultas.
const API_USUARIO = 'services/public/aspirantes_service.php';
// Se almacenan las credenciales del aspirante.
const CONTRA_ASPIRANTE = document.getElementById('clave');
// Se almacenan los íconos que se muestran en el campo "Contraseña".
const VER_ICONO = document.getElementById('verIcono'), OCULTAR_ICONO = document.getElementById('ocultarIcono');
// Se almacenan los campos de la información personal del aspirante.
const FECHA_NACIMIENTO = document.getElementById('fechaNacimiento');
// Se almacena el formulario de registro en la constante.
const FORM_REGISTRO = document.getElementById('form_registro');

// Se declara la variable global que se utiliza para cambiar la visibilidad del campo "Contraseña".
var verContra = false;

document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para validar sesiones activas.
    cargarPlantilla();
    // Se crea la variable que almacenará los valores mínimos y máximos para el input "Fecha de nacimiento".
    var fechaMaxima = new Date();
    // Se calcula la diferencia de la fecha actual - 18 años (La persona debe ser mayor de edad para registrarse).
    fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 18);
    // Se configura la fecha máxima del date picker.
    FECHA_NACIMIENTO.max = fechaMaxima.toISOString().substring(0, 10);
    // Se calcula la diferencia de la fecha actual - 18 años - 42 (60 años es la edad máxima para registrarse).
    fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 42);
    // Se configura la fecha mínima del date picker.
    FECHA_NACIMIENTO.min = fechaMaxima.toISOString().substring(0, 10);
    // LLamada a la función para asignar el token del reCAPTCHA al formulario.
    reCAPTCHA();
});

// Esta función permite mostrar y ocultar la contraseña del campo contraAspirante.
function mostrarContra() {
    // Si el valor es verdadero se oculta la contraseña.
    if (verContra) {
        // Se oculta la contraseña.
        CONTRA_ASPIRANTE.type = "password";
        // Se invierte el valor de la variable.
        verContra = !verContra;
        // Se muestra el ícono.
        OCULTAR_ICONO.classList.remove('d-none');
        // Se oculta el ícono.
        VER_ICONO.classList.add('d-none');
        // Se centra el input de contraseña.
        CONTRA_ASPIRANTE.focus();
    } else {
        // Se oculta la contraseña.
        CONTRA_ASPIRANTE.type = "text";
        // Se invierte el valor de la variable.
        verContra = !verContra;
        // Se muestra el ícono.
        VER_ICONO.classList.remove('d-none');
        // Se oculta el ícono.
        OCULTAR_ICONO.classList.add('d-none');
        // Se centra el input de contraseña.
        CONTRA_ASPIRANTE.focus();
    }
}

// El evento submit desencadena que el usuario pueda registrarse si los campos son válidos.
FORM_REGISTRO.addEventListener('submit', async (e) => {
    // Se evita recargar la página.
    e.preventDefault();
    // Se guardan los datos del formulario en la constante.
    const FORM = new FormData(FORM_REGISTRO);
    // Se realiza una petición a la API para guardar los datos.
    const DATA = await fetchData(API_USUARIO, 'signUp', FORM);

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con el error.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'index.html');
    } else if (DATA.recaptcha) {
        sweetAlert(2, DATA.error, false);
    } else {
        sweetAlert(2, DATA.error, false);
        // Se genera un nuevo token cuando ocurre un problema.
        reCAPTCHA();
    }
});

/*
*   Función para obtener un token del reCAPTCHA y asignarlo al formulario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
function reCAPTCHA() {
    // Método para generar el token del reCAPTCHA.
    grecaptcha.ready(() => {
        // Constante para establecer la llave pública del reCAPTCHA.
        const PUBLIC_KEY = '6Ld0LwYqAAAAAM8M32bIDiZlEsMLe902FQWCLa1P';
        // Se obtiene un token para la página web mediante la llave pública.
        grecaptcha.execute(PUBLIC_KEY, { action: 'homepage' }).then((token) => {
            // Se asigna el valor del token al campo oculto del formulario
            document.getElementById('gRecaptchaResponse').value = token;
        });
    });
}