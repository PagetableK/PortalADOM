
// Se almacenan las credenciales del aspirante.
const CONTRA_ASPIRANTE = document.getElementById('contraAspirante');
// Se almacenan los íconos que se muestran en el campo "Contraseña".
const VER_ICONO = document.getElementById('verIcono'), OCULTAR_ICONO = document.getElementById('ocultarIcono');
// Se almacenan los campos de la información personal del aspirante.
const FECHA_NACIMIENTO = document.getElementById('fechaNacimiento');

// Se declara la variable global que se utiliza para cambiar la visibilidad del campo "Contraseña".
var verContra = false;

document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para validar sesiones activas.
    cargarPlantilla();
    // Petición para consultar el correo y el id del aspirante.
    const DATA = await fetchData(USER_API, 'getUser');
    // Se comprueba si existe una sesión, de lo contrario se muestra el contenido de la página.
    if(DATA.session){
        // Se direcciona a la página web de bienvenida.
        location.href = 'inicio.html';
    } else{
    }

    // Se crea la variable que almacenará los valores mínimos y máximos para el input "Fecha de nacimiento".
    var fechaMaxima = new Date();
    // Se calcula la diferencia de la fecha actual - 18 años (La persona debe ser mayor de edad para registrarse).
    fechaMaxima.setFullYear(fechaMaxima.getFullYear() -18);
    // Se configura la fecha máxima del date picker.
    FECHA_NACIMIENTO.max = fechaMaxima.toISOString().substring(0, 10);
    // Se calcula la diferencia de la fecha actual - 18 años - 42 (60 años es la edad máxima para registrarse).
    fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 42);
    // Se configura la fecha mínima del date picker.
    FECHA_NACIMIENTO.min = fechaMaxima.toISOString().substring(0, 10);
});

function mostrarContra(){
    // Si el valor es verdadero se oculta la contraseña.
    if(verContra){
        // Se oculta la contraseña.
        CONTRA_ASPIRANTE.type = "password";
        // Se invierte el valor de la variable.
        verContra = !verContra;
        // Se muestra el ícono.
        OCULTAR_ICONO.classList.remove('d-none');
        // Se oculta el ícono.
        VER_ICONO.classList.add('d-none');
    } else{
        // Se oculta la contraseña.
        CONTRA_ASPIRANTE.type = "text";
        // Se invierte el valor de la variable.
        verContra = !verContra;
        // Se muestra el ícono.
        VER_ICONO.classList.remove('d-none');
        // Se oculta el ícono.
        OCULTAR_ICONO.classList.add('d-none');
    }
}