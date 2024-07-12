
const API_GRADOS = 'services/public/grados_academicos_service.php', API_INSTITUCIONES = 'services/public/instituciones_service.php';
// Se almacenan los contenedores principales de la página.
const CONTENEDOR_STEPPER = document.getElementById('contenedorStepper'),
    CONTENEDOR_OPCIONES_CV = document.getElementById('contenedorOpcionesCV');

const SELECT_GRADOS = document.getElementById('gradoAcademico'), SELECT_INSTITUCIONES = document.getElementById('institucion');

const SIGUIENTE_PASO_EDUCACION = document.getElementById('btnSiguientePasoEducacion');

// Evento que se ejecuta al terminar de cargar los componentes.
document.addEventListener('DOMContentLoaded', async () => {
    // Se cambia el color del apartado donde se encuentra el usuario.
    cambiarColor('CV');
    // Se llama a la función para configurar el botón del stepper.
    configurarStepper();
    // Se manda a llamar a la función para cargar los grados académicos dentro del combobox.
    cargarGrados();
    // Se manda a llamar a la función para cargar las instituciones dentro del combobox.
    cargarInstituciones();
    // Llamada a la función para validar sesiones activas.
    const INFO = await cargarPlantilla();
    // Se verifica si el valor del índice es falso.
    if (INFO[1] != false) {
        // Se muestra el contenedor con las opciones.
        CONTENEDOR_OPCIONES_CV.classList.remove('d-none');
    } else {
        // Se muestra el contenedor con el stepper.
        CONTENEDOR_STEPPER.classList.remove('d-none');
        // Función para obtener los datos del currículum almacenados en la cookie. 
        getCurriculums();
    }
});

// Función que configura las opciones del stepper.
function configurarStepper() {
    // Se almacena el stepper con las opciones en la variable.
    var stepperCv = new Stepper(document.querySelector('#stepperCv'), {
        linear: false,
        animation: true
    });
}

// Evento que se ejecuta al hacer click en el botón siguiente apartado desde el apartado de educación.
SIGUIENTE_PASO_EDUCACION.addEventListener('click', () => {
    // Se almacena el stepper con las opciones en la variable.
    var stepperCv = new Stepper(document.querySelector('#stepperCv'), {
        linear: false,
        animation: true
    });
    // Se traslada hacia el siguiente apartado del stepper.
    stepperCv.next();
});

// Función que permite cargar los grados académicos dentro del combobox.
const cargarGrados = async () => {
    // Se realiza la petición a la API para obtener los grados académicos.
    const DATA = await fetchData(API_GRADOS, 'readAll');
    // Si la respuesta es satisfactoria se ejecuta el código.
    if(DATA.status){

        SELECT_GRADOS.innerHTML = '<option value="" selected>Seleccione una opción</option>';

        DATA.dataset.forEach(row => {
            SELECT_GRADOS.innerHTML += `
                <option value="${row.ID}">${row.NOMBRE}</option>
            `;
        });
    } else{
        // Se muestra el error en consola.
        console.log(DATA.error);
    }
}

// Función que permite cargar las instituciones dentro del combobox.
const cargarInstituciones = async () => {
    // Se realiza la petición a la API para obtener las instituciones.
    const DATA = await fetchData(API_INSTITUCIONES, 'readAll');
    // Si la respuesta es satisfactoria se ejecuta el código.
    if(DATA.status){

        SELECT_INSTITUCIONES.innerHTML = '<option value="" selected>Seleccione una opción</option>';

        DATA.dataset.forEach(row => {
            SELECT_INSTITUCIONES.innerHTML += `
                <option value="${row.ID}">${row.NOMBRE}</option>
            `;
        });
        
        SELECT_INSTITUCIONES.innerHTML += '<option value="0" selected>Otra institución</option>';
    } else{
        // Se muestra el error en consola.
        console.log(DATA.error);
    }
}


const getCurriculums = async () => {

}