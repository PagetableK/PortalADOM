
const API_GRADOS = 'services/public/grados_academicos_service.php', API_INSTITUCIONES = 'services/public/instituciones_service.php',
    API_CURRICULUM = 'services/public/curriculum_service.php';
// Se almacenan los contenedores principales de la página.
const CONTENEDOR_STEPPER = document.getElementById('contenedorStepper'),
    CONTENEDOR_OPCIONES_CV = document.getElementById('contenedorOpcionesCV');

const SELECT_GRADOS = document.getElementById('gradoAcademico'), SELECT_INSTITUCIONES = document.getElementById('institucion'),
    OTRA_INSTITUCION = document.getElementById('otraInstitucion'), SELECT_FECHA_ESTUDIO = document.getElementById('fechaFinal'),
    SELECT_FECHA_CERTIFICADO = document.getElementById('fechaFinalCertificado'), ESTADO_ESTUDIO = document.getElementById('estadoEstudio');

const CONTENEDOR_ESTUDIOS = document.getElementById('contenedorEstudios');

const FORM_ESTUDIO = document.getElementById('formAgregarEstudio');

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

    configurarSelectFecha(SELECT_FECHA_CERTIFICADO);

    configurarSelectFecha(SELECT_FECHA_ESTUDIO);
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


const getCurriculums = async () => {

    cargarEstudios();
}


const cargarEstudios = async () => {

    const DATA = await fetchData(API_CURRICULUM, 'obtenerEstudios');

    const DATA_GRADOS = await fetchData(API_GRADOS, 'readAll');

    const DATA_INSTITUCIONES = await fetchData(API_INSTITUCIONES, 'readAll');

    if (DATA.status) {

        console.log(DATA.dataset);

        CONTENEDOR_ESTUDIOS.innerHTML = '';

        const ROW = DATA.dataset;

        ROW.forEach(row => {
            CONTENEDOR_ESTUDIOS.innerHTML += `
            <div class="d-flex gap-2 contenedorEstudio rounded-5 p-2 align-items-center">
                <p class="psinmargen tex-center"><span class="fw-bold">${DATA_GRADOS.dataset.filter(function (entry) { return entry.ID === `${row.id_grado}`; })[0].NOMBRE}</span> en <span class="fw-bold">${row.titulo_estudio}</span> - <span class="fw-bold">${row.fecha_finalizacion_estudio != "" ? row.fecha_finalizacion_estudio : "Cursando"}</span></p>
                <i class="bi bi-x-square text-danger" onclick="eliminarEstudio('${row.identificador}')"></i>
            </div>`;
        });
    } else if(DATA.error == 'No se han agregado estudios'){
        CONTENEDOR_ESTUDIOS.innerHTML = '<p class="fw-semibold text-center psinmargen">Los estudios agregados se mostrarán aquí</p>';
    } else {

        sweetAlert(2, DATA.error, false);
    }
}


const eliminarEstudio = async () => {



}

// Función que configura las opciones del stepper.
function configurarStepper() {
    // Se almacena el stepper con las opciones en la variable.
    var stepperCv = new Stepper(document.querySelector('#stepperCv'), {
        linear: false,
        animation: true
    });
}

// Función que configura las fechas máximas y mínimas de los select relacionados con fechas.
function configurarSelectFecha(select) {

    var max = new Date().getFullYear();

    min = max - 74;

    for (var i = max; i >= min; i--) {

        var opt = document.createElement('option');

        opt.value = i;

        opt.innerHTML = i;

        select.appendChild(opt);
    }
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
    // Se agrega la opción por defecto a la opción.
    SELECT_GRADOS.innerHTML = '<option value="" selected>Seleccione una opción</option>';
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {

        DATA.dataset.forEach(row => {
            SELECT_GRADOS.innerHTML += `
                <option value="${row.ID}">${row.NOMBRE}</option>
            `;
        });
    } else {
        // Se muestra el error en consola.
        console.log(DATA.error);
    }
}


// Función que permite cargar las instituciones dentro del combobox.
const cargarInstituciones = async () => {
    // Se realiza la petición a la API para obtener las instituciones.
    const DATA = await fetchData(API_INSTITUCIONES, 'readAll');

    SELECT_INSTITUCIONES.innerHTML = '<option value="default" selected>Seleccione una opción</option>';

    SELECT_INSTITUCIONES.innerHTML += '<option value="0">Otra institución</option>';
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {

        DATA.dataset.forEach(row => {
            SELECT_INSTITUCIONES.innerHTML += `
                <option value="${row.id_institucion}">${row.nombre_institucion}</option>
            `;
        });
    } else {
        // Se muestra el error en consola.
        console.log(DATA.error);
    }
}

// Evento que se ejecuta al hacer click en el botón agregar estudio.
FORM_ESTUDIO.addEventListener('submit', async (e) => {
    // Se evita recargar la página web.
    e.preventDefault();

    if (SELECT_INSTITUCIONES.value == 'default') {

        sweetAlert(3, 'Asegúrese de seleccionar una institución de las opciones disponibles', false);

        SELECT_INSTITUCIONES.focus();
    }

    else if (SELECT_INSTITUCIONES.value == 0 && OTRA_INSTITUCION.value.trim() == '') {

        sweetAlert(3, 'Asegúrese de agregar la institución en el campo', false);

        OTRA_INSTITUCION.focus();
    } else if(SELECT_GRADOS.value != null && SELECT_GRADOS.value > 0) {

        const FORM = new FormData(FORM_ESTUDIO);

        if (ESTADO_ESTUDIO.checked) {

            FORM.append('booleanFecha', 1);
            FORM.append('fechaFinal', "0000")
        } else {

            FORM.append('booleanFecha', 0);
            FORM.append('estadoEstudio', 0)
        }

        if (SELECT_INSTITUCIONES.value == 0) {

            FORM.append('booleanoInstitucion', 1)
        } else {

            FORM.append('booleanoInstitucion', 0)
            FORM.append('otraInstitucion', '');
        }


        FORM.append("identificador", makeid(10));

        const DATA = await fetchData(API_CURRICULUM, 'almacenarEstudio', FORM);

        if (DATA.status) {

            FORM_ESTUDIO.reset();

            SELECT_FECHA_ESTUDIO.removeAttribute("disabled");

            OTRA_INSTITUCION.setAttribute('disabled', '');

            cargarEstudios();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    } else{
        sweetAlert(3, 'Asegúrese de seleccionar un grado académico de la lista de opciones', false);

        SELECT_GRADOS.focus();
    }
});

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

SELECT_INSTITUCIONES.addEventListener('change', () => {

    if (SELECT_INSTITUCIONES.value == 0) {

        OTRA_INSTITUCION.removeAttribute("disabled");
    } else {
        OTRA_INSTITUCION.setAttribute("disabled", "");
        OTRA_INSTITUCION.value = '';
    }
});


ESTADO_ESTUDIO.addEventListener('change', () => {

    if (ESTADO_ESTUDIO.checked == false) {

        SELECT_FECHA_ESTUDIO.removeAttribute("disabled");
    } else {

        SELECT_FECHA_ESTUDIO.setAttribute("disabled", "");
    }
});