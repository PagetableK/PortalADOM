
const API_GRADOS = 'services/public/grados_academicos_service.php', API_INSTITUCIONES = 'services/public/instituciones_service.php',
    API_CURRICULUM = 'services/public/curriculum_service.php', API_RUBROS = 'services/public/rubros_service.php',
    API_AREAS = 'services/public/areas_laborales_service.php', API_IDIOMAS = 'services/public/idiomas_service.php',
    API_HABILIDADES = 'services/public/habilidades_service.php';
// Se almacenan los contenedores principales de la página.
const CONTENEDOR_STEPPER = document.getElementById('contenedorStepper'),
    CONTENEDOR_OPCIONES_CV = document.getElementById('contenedorOpcionesCV');

const SELECT_GRADOS = document.getElementById('gradoAcademico'), SELECT_INSTITUCIONES = document.getElementById('institucion'),
    OTRA_INSTITUCION = document.getElementById('otraInstitucion'), SELECT_FECHA_ESTUDIO = document.getElementById('fechaFinal'),
    SELECT_FECHA_CERTIFICADO = document.getElementById('fechaFinalCertificado'), ESTADO_ESTUDIO = document.getElementById('estadoEstudio'),
    SELECT_AREAS = document.getElementById('area'), SELECT_RUBROS = document.getElementById('rubro'),
    TITULO_ESTUDIO = document.getElementById('titulo');

const ESTADO_EXPERIENCIA = document.getElementById('estadoExperiencia'), SELECT_MES_INICIO = document.getElementById('mesInicio'),
    SELECT_YEAR_INICIO = document.getElementById('yearInicio'), SELECT_MES_FINAL = document.getElementById('mesFinal'),
    SELECT_YEAR_FINAL = document.getElementById('yearFinal'), DESCRIPCION_PUESTO = document.getElementById('descripcion'),
    CARACTERES_RESTANTES = document.getElementById('caracteresRestantes'), TELEFONOS = document.querySelectorAll('.telefono');

const SELECT_IDIOMAS = document.getElementById('idioma');

const SELECT_HABILIDADES = document.getElementById('nombreHabilidad');

const CORREO_ASPIRANTE = document.getElementById('correo'), TELEFONO_MOVIL = document.getElementById('telefonoMovil'),
    IMAGEN = document.getElementById('archivoImagen'), TELEFONO_FIJO = document.getElementById('telefonoFijo');

const ARCHIVO_IMAGEN = document.getElementById('archivoImagen'), IMAGEN_ASPIRANTE = document.getElementById('imgAspirante');

const CONTENEDOR_ESTUDIOS = document.getElementById('contenedorEstudios'), CONTENEDOR_FORMACION_COMPLEMENTARIA = document.getElementById('contenedorFormacionComplementaria'),
    CONTENEDOR_EXPERIENCIAS = document.getElementById('contenedorExperiencias'), CONTENEDOR_REFERENCIAS = document.getElementById('contenedorReferencias'),
    CONTENEDOR_IDIOMAS = document.getElementById('contenedorIdiomas'), CONTENEDOR_HABILIDADES = document.getElementById('contenedorHabilidades');

const FORM_ESTUDIO = document.getElementById('formAgregarEstudio'), FORM_FORMACION_COMPLEMENTARIA = document.getElementById('formAgregarFormacionComplementaria'),
    FORM_EXPERIENCIA = document.getElementById('formAgregarExperiencia'), FORM_REFERENCIA = document.getElementById('formAgregarReferencia'),
    FORM_IDIOMA = document.getElementById('formAgregarIdioma'), FORM_HABILIDAD = document.getElementById('formAgregarHabilidad'),
    FORM_CURRICULUM = document.getElementById('agregarCurriculum');

const SIGUIENTE_PASO = document.querySelectorAll('.siguientePaso'), PASO_ANTERIOR = document.querySelectorAll('.pasoAnterior'),
    MENSAJE_INFO = document.querySelector('.textoInfo');

const STEP_EDUCACION = document.getElementById('educacion'), STEP_EXPERIENCIA = document.getElementById('experiencia'),
    STEP_CONTACTO = document.getElementById('contacto'), STEP_HABILIDAD = document.getElementById('habilidad');

const BOTON_EDITAR = document.getElementById('btnEditarCv'), BOTON_REGRESAR = document.getElementById('botonRegresar');

let errorCurriculum = false;

// Evento que se ejecuta al terminar de cargar los componentes.
document.addEventListener('DOMContentLoaded', async () => {
    // Se cambia el color del apartado donde se encuentra el usuario.
    cambiarColor('CV');
    // Llamada a la función para validar sesiones activas.
    const INFO = await cargarPlantilla();
    // Se verifica si el valor del índice es verdadero (Si es verdadero el aspirante ya agregó su currículum).
    if (INFO[1] != false) {
        // Se muestra el contenedor con las opciones.
        CONTENEDOR_OPCIONES_CV.classList.remove('d-none');
    } else {
        // Se muestra el contenedor con el stepper.
        CONTENEDOR_STEPPER.classList.remove('d-none');
        // Se manda a llamar la función para preparar la configuración general del stepper. 
        prepararStepper();
    }
});

// Función que prepara el stepper para su funcionamiento.
const prepararStepper = async () => {
    // Función para obtener los datos del currículum almacenados en la cookie. 
    getCurriculums();
    // Se llama a la función para configurar el botón del stepper.
    configurarStepper();
    // Se manda a llamar a la función para cargar los grados académicos dentro del combobox.
    cargarGrados();
    // Se manda a llamar a la función para cargar las instituciones dentro del combobox.
    cargarInstituciones();
    // Se manda a llamar a la función para cargar los rubros dentro del combobox.
    cargarRubros();
    // Se manda a llamar a la función para cargar las áreas laborales dentro del combobox.
    cargarAreas();
    // Se manda a llamar a la función para cargar los idiomas dentro del combobox.
    cargarIdiomas();
    // Se manda a llamar a la función para cargar las habilidades dentro del combobox.
    cargarHabilidades();
    // Se manda a llamar a la función para cargar los años menores al año actual y el año actual dentro del select.
    configurarSelectYears(SELECT_YEAR_INICIO);
    // Se manda a llamar a la función para cargar los años menores al año actual y el año actual dentro del select.
    configurarSelectYears(SELECT_YEAR_FINAL);
    // Se manda a llamar a la función para cargar los años menores al año actual y el año actual dentro del select.
    configurarSelectYears(SELECT_FECHA_CERTIFICADO);
    // Se manda a llamar a la función para cargar los años menores al año actual y el año actual dentro del select.
    configurarSelectYears(SELECT_FECHA_ESTUDIO);
    // Se manda a llamar a la función para cargar los meses del año dentro del select.
    configurarSelectMeses(SELECT_MES_INICIO);
    // Se manda a llamar a la función para cargar los meses del año dentro del select.
    configurarSelectMeses(SELECT_MES_FINAL);
    // Se manda a llamar a la función para agregar el texto mask dentro de los campos de teléfono.
    configurarTelefonos();
}


const getCurriculums = async () => {

    cargarEstudios();

    cargarFormacionComplementaria();

    cargarExperiencias();

    cargarReferencias();

    cargarIdiomasCV();

    cargarHabilidadesCV();
}

const openReport = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/public/curriculum_formato_one.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}


const cargarEstudios = async () => {

    const DATA = await fetchData(API_CURRICULUM, 'obtenerEstudios');

    const DATA_GRADOS = await fetchData(API_GRADOS, 'readAll');

    const DATA_INSTITUCIONES = await fetchData(API_INSTITUCIONES, 'readAll');

    if (DATA.status) {

        CONTENEDOR_ESTUDIOS.innerHTML = '';

        const ROW = DATA.dataset;

        Object.values(ROW).forEach(row => {

            let institucion = '';

            row.nombre_institucion != "" ? institucion = row.nombre_institucion : institucion = DATA_INSTITUCIONES.dataset.filter(function (entry) { return entry.id_institucion === row.id_institucion })[0].nombre_institucion;

            CONTENEDOR_ESTUDIOS.innerHTML += `
            <div class="d-flex gap-2 contenedorElementoCV rounded-5 p-2 align-items-center">
                <p class="psinmargen tex-center"><span class="fw-bold">${DATA_GRADOS.dataset.filter(function (entry) { return entry.ID === row.id_grado; })[0].NOMBRE}</span> en <span class="fw-bold"> <span class="fw-bold">${row.titulo_estudio}</span>, ${institucion}</span> - <span class="fw-bold">${row.fecha_finalizacion_estudio != "" ? row.fecha_finalizacion_estudio : "Cursando"}</span></p>
                <i class="bi bi-x-square text-danger" onclick="eliminarEstudio('${row.identificador}')"></i>
            </div>`;
        });
    } else if (DATA.error == 'No se han agregado estudios') {

        CONTENEDOR_ESTUDIOS.innerHTML = '<p class="fw-semibold text-center psinmargen">Los estudios agregados se mostrarán aquí</p>';
    } else {

        sweetAlert(2, DATA.error, false);
    }
}


const cargarFormacionComplementaria = async () => {

    const DATA = await fetchData(API_CURRICULUM, 'obtenerFormacionComplementaria');

    if (DATA.status) {

        CONTENEDOR_FORMACION_COMPLEMENTARIA.innerHTML = '';

        const ROW = DATA.dataset;

        Object.values(ROW).forEach(row => {

            CONTENEDOR_FORMACION_COMPLEMENTARIA.innerHTML += `
            <div class="d-flex gap-2 contenedorElementoCV rounded-5 p-2 align-items-center">
                <p class="psinmargen tex-center"><span class="fw-bold">${row.titulo_certificado}</span> en <span class="fw-bold">${row.institucion_certificado}</span> - <span class="fw-bold">${row.fecha_finalizacion}</span></p>
                <i class="bi bi-x-square text-danger" onclick="eliminarFormacionComplementaria('${row.identificador}')"></i>
            </div>`;
        });
    } else if (DATA.error == 'No se ha agregado formación complementaria') {

        CONTENEDOR_FORMACION_COMPLEMENTARIA.innerHTML = '<p class="fw-semibold text-center psinmargen">La formación complementaria agregada se mostrará aquí</p>';
    } else {

        sweetAlert(2, DATA.error, false);
    }
}


const cargarExperiencias = async () => {

    const DATA = await fetchData(API_CURRICULUM, 'obtenerExperiencias');

    if (DATA.status) {

        CONTENEDOR_EXPERIENCIAS.innerHTML = '';

        const ROW = DATA.dataset;

        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        Object.values(ROW).forEach(row => {

            let fecha_duracion;

            row.mes_final != "" ? fecha_duracion = "<span class='fw-bold'>" + meses[row.mes_inicio - 1] + " " + row.year_inicio + "</span> - <span class='fw-bold'>" + meses[row.mes_final - 1] + " " + row.year_final + "</span>" : fecha_duracion = "<span class='fw-bold'>" + meses[row.mes_inicio] + " " + row.year_inicio + "</span> - <span class='fw-bold'>Trabajo actual</span>";

            CONTENEDOR_EXPERIENCIAS.innerHTML += `
            <div class="d-flex gap-2 contenedorElementoCV rounded-5 p-2 align-items-center">
                <p class="psinmargen tex-center"><span class="fw-bold">${row.cargo}</span> en <span class="fw-bold">${row.empresa}</span>, ${fecha_duracion} </p>
                <i class="bi bi-x-square text-danger" onclick="eliminarExperiencia('${row.identificador}')"></i>
            </div>`;
        });
    } else if (DATA.error = 'No se han agregado experiencias') {

        CONTENEDOR_EXPERIENCIAS.innerHTML = '<p class="fw-semibold text-center psinmargen">Las experiencias agregadas se mostrarán aquí</p>';
    } else {

        sweetAlert(2, DATA.error, false);
    }
}


const cargarReferencias = async () => {

    const DATA = await fetchData(API_CURRICULUM, 'obtenerReferencias');

    if (DATA.status) {

        CONTENEDOR_REFERENCIAS.innerHTML = '';

        const ROW = DATA.dataset;

        Object.values(ROW).forEach(row => {

            CONTENEDOR_REFERENCIAS.innerHTML += `
            <div class="d-flex gap-2 contenedorElementoCV rounded-5 p-2 align-items-center">
                <p class="psinmargen tex-center"><span class="fw-bold">${row.nombre} ${row.apellido}</span>, <span class="fw-bold">${row.puesto}</span>, N. Teléfono: <span class="fw-bold">${row.telefono}</span></p>
                <i class="bi bi-x-square text-danger" onclick="eliminarReferencia('${row.identificador}')"></i>
            </div>`;
        });
    } else if (DATA.error == 'No se han agregado referencias') {

        CONTENEDOR_REFERENCIAS.innerHTML = '<p class="fw-semibold text-center psinmargen">Las referencias agregadas se mostrarán aquí</p>';
    } else {

        sweetAlert(2, DATA.error, false);
    }
}


const cargarIdiomasCV = async () => {

    const DATA = await fetchData(API_CURRICULUM, 'obtenerIdiomas');

    const DATA_IDIOMAS = await fetchData(API_IDIOMAS, 'readAll');

    if (DATA.status) {

        CONTENEDOR_IDIOMAS.innerHTML = '';

        const ROW = DATA.dataset;

        Object.values(ROW).forEach(row => {

            CONTENEDOR_IDIOMAS.innerHTML += `
            <div class="d-flex gap-2 contenedorElementoCV rounded-5 p-2 align-items-center">
                <p class="psinmargen tex-center"><span class="fw-bold">${DATA_IDIOMAS.dataset.filter(function (entry) { return entry.ID === row.idioma; })[0].NOMBRE}</span> - <span class="fw-bold">${row.nivel}</span></p>
                <i class="bi bi-x-square text-danger" onclick="eliminarIdioma('${row.identificador}')"></i>
            </div>`;
        });
    } else if (DATA.error == 'No se han agregado idiomas') {

        CONTENEDOR_IDIOMAS.innerHTML = '<p class="fw-semibold text-center psinmargen">Los idiomas agregados se mostrarán aquí</p>';
    } else {

        sweetAlert(2, DATA.error, false);
    }
}

const cargarHabilidadesCV = async () => {

    const DATA = await fetchData(API_CURRICULUM, 'obtenerHabilidades');

    const DATA_HABILIDADES = await fetchData(API_HABILIDADES, 'readAll');

    if (DATA.status) {

        CONTENEDOR_HABILIDADES.innerHTML = '';

        const ROW = DATA.dataset;

        Object.values(ROW).forEach(row => {
            CONTENEDOR_HABILIDADES.innerHTML += `
            <div class="d-flex gap-2 contenedorElementoCV rounded-5 p-2 align-items-center">
                <p class="psinmargen tex-center"><span class="fw-bold">${DATA_HABILIDADES.dataset.filter(function (entry) { return entry.id_habilidad === row.habilidad; })[0].nombre_habilidad}</span> - <span class="fw-bold">${row.nivel}</span></p>
                <i class="bi bi-x-square text-danger" onclick="eliminarHabilidad('${row.identificador}')"></i>
            </div>`;
        });
    } else if (DATA.error == 'No se han agregado habilidades') {

        CONTENEDOR_HABILIDADES.innerHTML = '<p class="fw-semibold text-center psinmargen">Las habilidades agregadas se mostrarán aquí</p>';
    } else {

        sweetAlert(2, DATA.error, false);
    }
}

// Función que permite eliminar un estudio de la sesión.
const eliminarEstudio = async (identificador) => {

    const FORM = new FormData();

    FORM.append('identificador', identificador);

    const DATA = await fetchData(API_CURRICULUM, 'eliminarEstudio', FORM);

    if (DATA.status) {

        cargarEstudios();
    } else {

        sweetAlert(2, DATA.error, false);
    }
}

// Función que permite eliminar una formación complementaria de la sesión.
const eliminarFormacionComplementaria = async (identificador) => {

    const FORM = new FormData();

    FORM.append('identificador', identificador);

    const DATA = await fetchData(API_CURRICULUM, 'eliminarFormacionComplementaria', FORM);

    if (DATA.status) {

        cargarFormacionComplementaria();
    } else {

        sweetAlert(2, DATA.error, false);
    }
}

// Función que permite eliminar una experiencia de la sesión.
const eliminarExperiencia = async (identificador) => {

    const FORM = new FormData();

    FORM.append('identificador', identificador);

    const DATA = await fetchData(API_CURRICULUM, 'eliminarExperiencia', FORM);

    if (DATA.status) {

        cargarExperiencias();
    } else {

        sweetAlert(2, DATA.error, false);
    }
}

// Función que permite eliminar una referencia de la sesión.
const eliminarReferencia = async (identificador) => {

    const FORM = new FormData();

    FORM.append('identificador', identificador);

    const DATA = await fetchData(API_CURRICULUM, 'eliminarReferencia', FORM);

    if (DATA.status) {

        cargarReferencias();
    } else {

        sweetAlert(2, DATA.error, false);
    }
}

// Función que permite eliminar un idioma de la sesión.
const eliminarIdioma = async (identificador) => {

    const FORM = new FormData();

    FORM.append('identificador', identificador);

    const DATA = await fetchData(API_CURRICULUM, 'eliminarIdioma', FORM);

    if (DATA.status) {

        cargarIdiomasCV();
    } else {

        sweetAlert(2, DATA.error, false);
    }
}

// Función que permite eliminar una habilidad de la sesión.
const eliminarHabilidad = async (identificador) => {

    const FORM = new FormData();

    FORM.append('identificador', identificador);

    const DATA = await fetchData(API_CURRICULUM, 'eliminarHabilidad', FORM);

    if (DATA.status) {

        await cargarHabilidadesCV();
    } else {

        sweetAlert(2, DATA.error, false);
    }
}

// Función que configura las opciones del stepper.
function configurarStepper() {
    // Se almacena el stepper con las opciones en la variable.
    var stepperCv = new Stepper(document.querySelector('#stepperCv'), {
        linear: false,
        animation: true
    });

    SIGUIENTE_PASO.forEach(boton => {
        // Evento que se ejecuta al hacer click en el botón siguiente apartado.
        boton.addEventListener('click', () => {
            // Se traslada hacia el siguiente apartado del stepper.
            stepperCv.next();
            // Se restablece el scroll de la pantalla.
            window.scrollTo(0, 0);
        });
    });


    PASO_ANTERIOR.forEach(boton => {
        // Evento que se ejecuta al hacer click en el botón apartado anterior.
        boton.addEventListener('click', () => {
            // Se traslada hacia el anterior apartado del stepper.
            stepperCv.previous();
            // Se restablece el scroll de la pantalla.
            window.scrollTo(0, 0);
        });
    });

    document.getElementById('stepperCv').addEventListener('show.bs-stepper', function (event) {

        if (event.detail.indexStep == 0) {

            MENSAJE_INFO.classList.remove('d-none');
            STEP_EDUCACION.classList.remove('d-none');
            STEP_EXPERIENCIA.classList.add('d-none');
            STEP_HABILIDAD.classList.add('d-none');
            STEP_CONTACTO.classList.add('d-none');
            // Se restablece el scroll de la pantalla.
            window.scrollTo(0, 0);
        } else if (event.detail.indexStep == 1) {

            MENSAJE_INFO.classList.remove('d-none');
            STEP_EDUCACION.classList.add('d-none');
            STEP_EXPERIENCIA.classList.remove('d-none');
            STEP_HABILIDAD.classList.add('d-none');
            STEP_CONTACTO.classList.add('d-none');
            // Se restablece el scroll de la pantalla.
            window.scrollTo(0, 0);
        } else if (event.detail.indexStep == 2) {

            MENSAJE_INFO.classList.remove('d-none');
            STEP_EDUCACION.classList.add('d-none');
            STEP_EXPERIENCIA.classList.add('d-none');
            STEP_HABILIDAD.classList.remove('d-none');
            STEP_CONTACTO.classList.add('d-none');
            // Se restablece el scroll de la pantalla.
            window.scrollTo(0, 0);
        } else {

            MENSAJE_INFO.classList.add('d-none');
            STEP_EDUCACION.classList.add('d-none');
            STEP_EXPERIENCIA.classList.add('d-none');
            STEP_HABILIDAD.classList.add('d-none');
            STEP_CONTACTO.classList.remove('d-none');
            // Se restablece el scroll de la pantalla.
            window.scrollTo(0, 0);
        }
    });
}

// Función que configura las fechas máximas y mínimas de los select relacionados con años.
function configurarSelectYears(select) {

    var max = new Date().getFullYear();

    min = max - 74;

    for (var i = max; i >= min; i--) {

        var opt = document.createElement('option');

        opt.value = i;

        opt.innerHTML = i;

        select.appendChild(opt);
    }
}


function configurarSelectMeses(select) {

    var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    for (var i = 0; i < meses.length; i++) {

        var opt = document.createElement('option');

        opt.value = i + 1;

        opt.innerHTML = meses[i];

        select.appendChild(opt);
    }
}


function configurarTelefonos() {

    TELEFONOS.forEach(telefono => {

        telefono.addEventListener('input', (e) => {
            // Función para que sea número nacional.
            var telefono = e.target.value.replace(/\D/g, '');
            var formattedTelefono = '';

            // Para el guión.
            for (var i = 0; i < telefono.length; i++) {
                if (i === 4) {
                    formattedTelefono += '-';
                }
                formattedTelefono += telefono[i];
            }

            // Que los digitos sean de 9 caracteres con el guión.
            e.target.value = formattedTelefono.substring(0, 9);
        });
    });
}

// Función que permite cargar los grados académicos dentro del combobox.
const cargarGrados = async () => {
    // Se realiza la petición a la API para obtener los grados académicos.
    const DATA = await fetchData(API_GRADOS, 'readAll');
    // Se agrega la opción por defecto.
    SELECT_GRADOS.innerHTML = '<option value="" selected>Seleccione una opción</option>';
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {
        // Se recorren las entradas del conjunto de datos y se agrega una opción dentro del select por cada una.
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
    // Se inicializan los valores del combobox.
    SELECT_INSTITUCIONES.innerHTML = '<option value="default" selected>Seleccione una opción</option>';
    SELECT_INSTITUCIONES.innerHTML += '<option value="0">Otra institución</option>';
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {
        // Se recorren las entradas del conjunto de datos y se agrega una opción dentro del select por cada una.
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

// Función que permite cargar los rubros dentro del combobox.
const cargarRubros = async () => {
    // Se realiza la petición a la API para obtener los rubros.
    const DATA = await fetchData(API_RUBROS, 'readAll');
    // Se agrega la opción por defecto.
    SELECT_RUBROS.innerHTML = '<option value="default" selected>Seleccione una opción</option>';
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {
        // Se recorren las entradas del conjunto de datos y se agrega una opción dentro del select por cada una.
        DATA.dataset.forEach(row => {
            SELECT_RUBROS.innerHTML += `
            <option value="${row.id_rubro}">${row.nombre_rubro}</option>`;
        });
    }
}

// Función que permite cargar las áreas dentro del combobox.
const cargarAreas = async () => {
    // Se realiza la petición a la API para obtener las áreas.
    const DATA = await fetchData(API_AREAS, 'readAll');
    // Se agrega la opción por defecto.
    SELECT_AREAS.innerHTML = '<option value="default" selected>Seleccione una opción</option>';
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {
        // Se recorren las entradas del conjunto de datos y se agrega una opción dentro del select por cada una.
        DATA.dataset.forEach(row => {
            SELECT_AREAS.innerHTML += `
                    <option value="${row.id_area}">${row.nombre_area}</option>
                `;
        });
    }
}

// Función que permite cargar los idiomas dentro del combobox.
const cargarIdiomas = async () => {
    // Se realiza la petición a la API para obtener los idiomas.
    const DATA = await fetchData(API_IDIOMAS, 'readAll');
    // Se agrega la opción por defecto.
    SELECT_IDIOMAS.innerHTML = '<option value="default" selected>Seleccione una opción</option>';
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {
        // Se recorren las entradas del conjunto de datos y se agrega una opción dentro del select por cada una.
        DATA.dataset.forEach(row => {
            SELECT_IDIOMAS.innerHTML += `
                    <option value="${row.ID}">${row.NOMBRE}</option>
                `;
        });
    }
}


const cargarHabilidades = async () => {
    // Se realiza la petición a la API para obtener las habilidades.
    const DATA = await fetchData(API_HABILIDADES, 'readAll');
    // Se agrega la opción por defecto.
    SELECT_HABILIDADES.innerHTML = '<option value="default" selected>Seleccione una opción</option>';
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {
        // Se recorren las entradas del conjunto de datos y se agrega una opción dentro del select por cada una.
        DATA.dataset.forEach(row => {
            SELECT_HABILIDADES.innerHTML += `
                    <option value="${row.id_habilidad}">${row.nombre_habilidad}</option>
                `;
        });
    }
}

// Evento que se ejecuta al hacer click en el botón agregar estudio.
FORM_ESTUDIO.addEventListener('submit', async (e) => {
    // Se evita recargar la página web.
    e.preventDefault();

    if (SELECT_GRADOS.value == null || SELECT_GRADOS.value == 0) {
        await sweetAlert(3, 'Asegúrese de seleccionar un grado académico de la lista de opciones', false);

        SELECT_GRADOS.focus();
    }
    else if (TITULO_ESTUDIO.value.trim() == "") {

        await sweetAlert(3, 'Asegúrese de agregar el título del estudio', false);

        TITULO_ESTUDIO.focus();
    }
    else if (SELECT_INSTITUCIONES.value == 'default') {

        await sweetAlert(3, 'Asegúrese de seleccionar una institución de las opciones disponibles', false);

        SELECT_INSTITUCIONES.focus();
    }
    else if (SELECT_INSTITUCIONES.value == 0 && OTRA_INSTITUCION.value.trim() == '') {

        await sweetAlert(3, 'Asegúrese de agregar la institución en el campo', false);

        OTRA_INSTITUCION.focus();
    } else {

        const FORM = new FormData(FORM_ESTUDIO);

        if (ESTADO_ESTUDIO.checked) {

            FORM.append('booleanFecha', 1);
            FORM.append('fechaFinal', "0000");
        } else {

            FORM.append('booleanFecha', 0);
        }

        if (SELECT_INSTITUCIONES.value == 0) {

            FORM.append('booleanoInstitucion', 1)
        } else {

            FORM.append('booleanoInstitucion', 0)
            FORM.append('otraInstitucion', '');
        }


        FORM.append("identificador", crearId(10));

        const DATA = await fetchData(API_CURRICULUM, 'almacenarEstudio', FORM);

        if (DATA.status) {

            FORM_ESTUDIO.reset();

            SELECT_FECHA_ESTUDIO.removeAttribute("disabled");

            OTRA_INSTITUCION.setAttribute('disabled', '');

            cargarEstudios();

            sweetAlert(1, 'Estudio agregado', false);
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
});


FORM_FORMACION_COMPLEMENTARIA.addEventListener('submit', async (e) => {

    e.preventDefault();

    const FORM = new FormData(FORM_FORMACION_COMPLEMENTARIA);

    FORM.append("identificador", crearId(10));

    const DATA = await fetchData(API_CURRICULUM, 'almacenarFormacionComplementaria', FORM);

    if (DATA.status) {

        FORM_FORMACION_COMPLEMENTARIA.reset();

        cargarFormacionComplementaria();

        sweetAlert(1, 'Certificado agregado', false);
    } else {

        sweetAlert(2, DATA.error, false);
    }

});


FORM_EXPERIENCIA.addEventListener('submit', async (e) => {

    e.preventDefault();

    if (SELECT_RUBROS.value == "default") {

        sweetAlert(3, "Asegúrese de seleccionar un rubro", false);

        SELECT_RUBROS.focus();
    } else if (SELECT_AREAS.value == "default") {

        sweetAlert(3, "Asegúrese de seleccionar un área");

        SELECT_AREAS.focus();
    } else {
        const FORM = new FormData(FORM_EXPERIENCIA);

        if (ESTADO_EXPERIENCIA.checked) {

            FORM.append('booleanFecha', 1);
            FORM.append('mesFinal', "0");
            FORM.append('yearFinal', "0000");
        } else {

            FORM.append('booleanFecha', 0);
        }

        FORM.append('identificador', crearId(10));

        const DATA = await fetchData(API_CURRICULUM, 'almacenarExperiencia', FORM);

        if (DATA.status) {

            FORM_EXPERIENCIA.reset();

            SELECT_MES_INICIO.removeAttribute("disabled");

            SELECT_MES_FINAL.removeAttribute("disabled");

            SELECT_YEAR_INICIO.removeAttribute("disabled");

            SELECT_YEAR_FINAL.removeAttribute("disabled");

            CARACTERES_RESTANTES.textContent = "Caracteres restantes: 300";

            cargarExperiencias();

            sweetAlert(1, 'Experiencia agregada', false);
        } else if (DATA.error == 'La fecha de la experiencia no es válida') {

            sweetAlert(3, 'Las fechas no coinciden', false);

            SELECT_MES_INICIO.focus();
        } else {

            sweetAlert(2, DATA.error, false);
        }
    }
});


FORM_REFERENCIA.addEventListener('submit', async (e) => {

    e.preventDefault();

    const FORM = new FormData(FORM_REFERENCIA);

    FORM.append('identificador', crearId(10));

    const DATA = await fetchData(API_CURRICULUM, 'almacenarReferencia', FORM);

    if (DATA.status) {

        FORM_REFERENCIA.reset();

        cargarReferencias();

        sweetAlert(1, 'Referencia agregada', false);
    } else if (DATA.error == 'El teléfono digitado ya ha sido agregado en otra referencia') {

        sweetAlert(3, DATA.error, false);
    } else {

        sweetAlert(2, DATA.error, false);
    }
});


FORM_IDIOMA.addEventListener('submit', async (e) => {

    e.preventDefault();

    if (SELECT_IDIOMAS.value == "default") {

        sweetAlert(3, "Asegúrese de seleccionar un idioma", false);

        SELECT_IDIOMAS.focus();
    } else {

        const FORM = new FormData(FORM_IDIOMA);

        FORM.append('identificador', crearId(10));

        const DATA = await fetchData(API_CURRICULUM, 'almacenarIdioma', FORM);

        if (DATA.status) {

            FORM_IDIOMA.reset();

            cargarIdiomasCV();

            sweetAlert(1, 'Idioma agregado', false);
        } else if (DATA.error == "El idioma ya ha sido agregado") {

            sweetAlert(3, DATA.error, false);
        } else {

            sweetAlert(2, DATA.error, false);
        }
    }
});


FORM_HABILIDAD.addEventListener('submit', async (e) => {

    e.preventDefault();

    if (SELECT_HABILIDADES.value == "default") {

        sweetAlert(3, 'Asegúrese de seleccionar una habilidad');

        SELECT_HABILIDADES.focus();
    } else {

        const FORM = new FormData(FORM_HABILIDAD);

        FORM.append('identificador', crearId(10));

        const DATA = await fetchData(API_CURRICULUM, 'almacenarHabilidad', FORM);

        if (DATA.status) {

            FORM_HABILIDAD.reset();

            cargarHabilidadesCV();

            sweetAlert(1, 'Habilidad agregada', false);
        } else if (DATA.error == "La habilidad ya ha sido agregada") {

            sweetAlert(3, DATA.error, false);
        } else {

            sweetAlert(2, DATA.error, false);
        }
    }
});


FORM_CURRICULUM.addEventListener('submit', async (e) => {

    e.preventDefault();

    if (IMAGEN.value == "") {

        await sweetAlert(3, "Asegúrese de seleccionar la imagen que se mostrará en el currículum", false);

        IMAGEN.focus();
    } else if (TELEFONO_MOVIL.value == "") {

        await sweetAlert(3, "Asegúrese de agregar el teléfono móvil", false);

        TELEFONO_MOVIL.focus();
    } else if (CORREO_ASPIRANTE.value.trim() == "") {

        await sweetAlert(3, "Asegúrese de agregar el correo electrónico", false);

        CORREO_ASPIRANTE.focus();
    } else {

        const FORM = new FormData(FORM_CURRICULUM);

        const DATA = await fetchData(API_CURRICULUM, 'agregarCurriculum', FORM);

        if (DATA.status) {

            const DATA_APARTADOS = await fetchData(API_CURRICULUM, 'obtenerApartados');

            await agregarEstudios(DATA_APARTADOS.dataset[5]);

            DATA_APARTADOS.dataset[0] == false ? "" : await agregarCertificados(DATA_APARTADOS.dataset[5]);

            DATA_APARTADOS.dataset[1] == false ? "" : await agregarExperiencias(DATA_APARTADOS.dataset[5]);

            DATA_APARTADOS.dataset[4] == false ? "" : await agregarReferencias(DATA_APARTADOS.dataset[5]);

            DATA_APARTADOS.dataset[2] == false ? "" : await agregarIdiomas(DATA_APARTADOS.dataset[5]);

            DATA_APARTADOS.dataset[3] == false ? "" : await agregarHabilidades(DATA_APARTADOS.dataset[5]);

            errorCurriculum ? async () => {
                await sweetAlert(1, 'Currículum agregado correctamente');
                sweetAlert(3, 'Es posible que los apartados no se hayan agregado correctamente, se recomienda verificar el currículum', false);
            } : sweetAlert(1, 'Currículum agregado correctamente', true, 'curriculum.html');
        } else if (DATA.error == "Debe agregar por lo menos 1 estudio a su currículum") {

            sweetAlert(3, DATA.error, false);

            var stepperCv = new Stepper(document.querySelector('#stepperCv'), {
                linear: false,
                animation: true
            });

            stepperCv.to(1);
        } else if (DATA.error == "El teléfono móvil ya está siendo utilizado en otro currículum") {

            await sweetAlert(3, DATA.error + ". Digite un número de teléfono diferente", false);

            TELEFONO_MOVIL.focus();
        } else if (DATA.error == "El correo ya está siendo utilizado en otro currículum") {

            await sweetAlert(3, DATA.error + ". Digite un correo diferente", false);

            CORREO_ASPIRANTE.focus();
        } else if (DATA.error == "El teléfono fijo ya está siendo utilizado en otro currículum") {

            await sweetAlert(3, DATA.error + ". Digite un número de teléfono diferente", false);

            TELEFONO_FIJO.focus();
        } else if (DATA.error == "Los teléfonos no pueden ser iguales") {

            await sweetAlert(3, "El teléfono fijo no puede ser el mismo número que el teléfono móvil", false);

            TELEFONO_FIJO.focus();
        } else if (DATA.error == "El tipo de imagen debe ser jpg o png") {

            sweetAlert(3, "La imagen debe ser formato .jpg o .png", false)

            IMAGEN.focus();
        } else {

            sweetAlert(2, DATA.error, false);
        }
    }
});


const agregarEstudios = async (idCv) => {

    const FORM = new FormData();

    FORM.append('idCurriculum', idCv);

    const DATA = await fetchData(API_CURRICULUM, 'agregarEstudios', FORM);

    if (DATA.status) {

        console.log(DATA.status);
    } else {

        errorCurriculum = true;
    }
}

const agregarCertificados = async (idCv) => {

    const FORM = new FormData();

    FORM.append('idCurriculum', idCv);

    const DATA = await fetchData(API_CURRICULUM, 'agregarCertificados', FORM);

    if (DATA.status) {

    } else {

        errorCurriculum = true;
    }
}


const agregarExperiencias = async (idCv) => {

    const FORM = new FormData();

    FORM.append('idCurriculum', idCv);

    const DATA = await fetchData(API_CURRICULUM, 'agregarExperiencias', FORM);

    if (DATA.status) {

    } else {

        errorCurriculum = true;
    }
}


const agregarReferencias = async (idCv) => {

    const FORM = new FormData();

    FORM.append('idCurriculum', idCv);

    const DATA = await fetchData(API_CURRICULUM, 'agregarReferencias', FORM);

    if (DATA.status) {

    } else {

        errorCurriculum = true;
    }
}


const agregarIdiomas = async (idCv) => {

    const FORM = new FormData();

    FORM.append('idCurriculum', idCv);

    const DATA = await fetchData(API_CURRICULUM, 'agregarIdiomas', FORM);

    if (DATA.status) {

    } else {

        errorCurriculum = true;
    }
}


const agregarHabilidades = async (idCv) => {

    const FORM = new FormData();

    FORM.append('idCurriculum', idCv);

    const DATA = await fetchData(API_CURRICULUM, 'agregarHabilidades', FORM);

    if (DATA.status) {

    } else {

        errorCurriculum = true;
    }
}


function crearId(longitud) {

    let resultado = '';

    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const longitudCaracteres = caracteres.length;

    let contador = 0;

    while (contador < longitud) {

        resultado += caracteres.charAt(Math.floor(Math.random() * longitudCaracteres));

        contador += 1;
    }

    return resultado;
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


ESTADO_EXPERIENCIA.addEventListener('change', () => {

    if (ESTADO_EXPERIENCIA.checked == false) {

        SELECT_MES_FINAL.removeAttribute("disabled");

        SELECT_YEAR_FINAL.removeAttribute("disabled");
    } else {

        SELECT_MES_FINAL.setAttribute("disabled", "");

        SELECT_YEAR_FINAL.setAttribute("disabled", "");
    }
});


ARCHIVO_IMAGEN.addEventListener('change', (e) => {
    try {
        // Se almacena el archivo cargado en la variable archivoSeleccionado.
        var archivoSeleccionado = e.target.files[0];
        // Se crea el objeto reader.
        var reader = new FileReader();
        // Se define una variable con el mismo valor que la constante IMAGEN_ASPIRANTE.
        var imgtag = IMAGEN_ASPIRANTE;
        // El reader lee la cadena de caracteres.
        reader.readAsDataURL(archivoSeleccionado);
        // Cuando el reader termina de leer la cadena de caracteres se 
        // dispara el evento que configura la imagen en la etiqueta img.
        reader.onload = function (e) {
            imgtag.src = e.target.result;
        };
    } catch (error) {
        console.log("No se seleccionó una imagen");
    }
});


DESCRIPCION_PUESTO.addEventListener('input', () => {

    CARACTERES_RESTANTES.textContent = 'Caracteres restantes: ' + (300 - DESCRIPCION_PUESTO.value.length);
});

// Evento que se ejecuta al hacer click en el botón editar currículum.
BOTON_EDITAR.addEventListener('click', async () => {
    // Se realiza la petición a la API para limpiar los apartados del currículum de la variable de sesión.
    await fetchData(API_CURRICULUM, 'limpiarApartados');
    // Se realiza una petición a la API para obtener la información general del currículum.
    const DATA = await fetchData(API_CURRICULUM, 'getCurriculum');
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {
        // Se inicializa la constante dónde se almacenará el idCurriculum.
        const FORM = new FormData();
        // Se almacena el idCurriculum en la constante.
        FORM.append('idCurriculum', DATA.dataset.id_curriculum);

        const DATA_ESTUDIOS = await fetchData(API_CURRICULUM, 'getEstudios', FORM);

        const DATA_CERTIFICADOS = await fetchData(API_CURRICULUM, 'getCertificados', FORM);

        const DATA_EXPERIENCIAS = await fetchData(API_CURRICULUM, 'getExperiencias', FORM);

        const DATA_REFERENCIAS = await fetchData(API_CURRICULUM, 'getReferencias', FORM);

        const DATA_IDIOMAS = await fetchData(API_CURRICULUM, 'getIdiomas', FORM);

        const DATA_HABILIDADES = await fetchData(API_CURRICULUM, 'getHabilidades', FORM);

        await almacenarEstudios(DATA_ESTUDIOS.dataset);

        await almacenarCertificados(DATA_CERTIFICADOS.dataset);

        await almacenarExperiencias(DATA_EXPERIENCIAS.dataset);

        // Se realiza la petición a la API para cargar los apartados del currículum en la variable de sesión.
        // const DATA_CURRICULUM = await fetchData(API_CURRICULUM, 'cargarApartados', FORM);
        // Se prepara el stepper para su funcionamiento general.
        prepararStepper();
        // Se oculta el contenedor con las opciones.
        CONTENEDOR_OPCIONES_CV.classList.add('d-none');
        // Se muestra el contenedor con el stepper.
        CONTENEDOR_STEPPER.classList.remove('d-none');
        // Si la respuesta no es satisfactoria se ejecuta el código.
        if (!DATA.status) {
            // Se muestra la advertencia.
            sweetAlert(3, 'Es posible que algunos apartados no contengan la información real del currículum', false);
        }
    } else {
        // Se muestra el error.
        sweetAlert(2, DATA.error, false);
    }
});

const almacenarEstudios = async (arrayEstudios) => {

    for (const row of arrayEstudios) {

        const FORM = new FormData();

        if (row.fecha_finalizacion == null) {

            FORM.append('booleanFecha', 1);
            FORM.append('fechaFinal', "0000");
        } else {

            FORM.append("fechaFinal", row.fecha_finalizacion);
            FORM.append('booleanFecha', 0);
        }

        if (row.id_institucion == null) {

            FORM.append('booleanoInstitucion', 1)
            FORM.append('otraInstitucion', row.nombre_institucion);
        } else {

            FORM.append('institucion', row.id_institucion);
            FORM.append('booleanoInstitucion', 0)
            FORM.append('otraInstitucion', '');
        }

        FORM.append('gradoAcademico', row.id_grado);

        FORM.append('titulo', row.titulo_estudio);

        FORM.append('identificador', crearId(10));

        const DATA = await fetchData(API_CURRICULUM, 'almacenarEstudio', FORM);

        console.log(DATA.status);

        if (!DATA.status) {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const almacenarCertificados = async (arrayCertificados) => {

    for (const row of arrayCertificados) {

        const FORM = new FormData();

        FORM.append("tituloCertificado", row.titulo_certificado);
        FORM.append("institucionCertificado", row.institucion_certificado);
        FORM.append("fechaFinalCertificado", row.fecha_finalizacion);

        FORM.append("identificador", crearId(10));

        const DATA = await fetchData(API_CURRICULUM, 'almacenarFormacionComplementaria', FORM);

        if (DATA.status) {

            FORM_FORMACION_COMPLEMENTARIA.reset();

            cargarFormacionComplementaria();

            sweetAlert(1, 'Certificado agregado', false);
        } else {

            sweetAlert(2, DATA.error, false);
        }
    }
}

const almacenarExperiencias = async (arrayExperiencias) => {

    for (const row of arrayExperiencias) {


        const FORM = new FormData();

        if (ESTADO_EXPERIENCIA.checked) {

            FORM.append('booleanFecha', 1);
            FORM.append('mesFinal', "0");
            FORM.append('yearFinal', "0000");
        } else {

            FORM.append('booleanFecha', 0);
        }

        FORM.append('identificador', crearId(10));

        const DATA = await fetchData(API_CURRICULUM, 'almacenarExperiencia', FORM);

        if (DATA.status) {

            FORM_EXPERIENCIA.reset();

            SELECT_MES_INICIO.removeAttribute("disabled");

            SELECT_MES_FINAL.removeAttribute("disabled");

            SELECT_YEAR_INICIO.removeAttribute("disabled");

            SELECT_YEAR_FINAL.removeAttribute("disabled");

            CARACTERES_RESTANTES.textContent = "Caracteres restantes: 300";

            cargarExperiencias();

            sweetAlert(1, 'Experiencia agregada', false);
        } else if (DATA.error == 'La fecha de la experiencia no es válida') {

            sweetAlert(3, 'Las fechas no coinciden', false);

            SELECT_MES_INICIO.focus();
        } else {

            sweetAlert(2, DATA.error, false);
        }
    }
}

BOTON_REGRESAR.addEventListener('click', async () => {

    // Se oculta el contenedor con las opciones.
    CONTENEDOR_OPCIONES_CV.classList.remove('d-none');
    // Se muestra el contenedor con el stepper.
    CONTENEDOR_STEPPER.classList.add('d-none');
});