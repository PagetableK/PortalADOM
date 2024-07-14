
const API_GRADOS = 'services/public/grados_academicos_service.php', API_INSTITUCIONES = 'services/public/instituciones_service.php',
    API_CURRICULUM = 'services/public/curriculum_service.php', API_RUBROS = 'services/public/rubros_service.php',
    API_AREAS = 'services/public/areas_laborales_service.php';
// Se almacenan los contenedores principales de la página.
const CONTENEDOR_STEPPER = document.getElementById('contenedorStepper'),
    CONTENEDOR_OPCIONES_CV = document.getElementById('contenedorOpcionesCV');

const SELECT_GRADOS = document.getElementById('gradoAcademico'), SELECT_INSTITUCIONES = document.getElementById('institucion'),
    OTRA_INSTITUCION = document.getElementById('otraInstitucion'), SELECT_FECHA_ESTUDIO = document.getElementById('fechaFinal'),
    SELECT_FECHA_CERTIFICADO = document.getElementById('fechaFinalCertificado'), ESTADO_ESTUDIO = document.getElementById('estadoEstudio'),
    SELECT_AREAS = document.getElementById('area'), SELECT_RUBROS = document.getElementById('rubro');

const ESTADO_EXPERIENCIA = document.getElementById('estadoExperiencia'), SELECT_MES_INICIO = document.getElementById('mesInicio'),
    SELECT_YEAR_INICIO = document.getElementById('yearInicio'), SELECT_MES_FINAL = document.getElementById('mesFinal'),
    SELECT_YEAR_FINAL = document.getElementById('yearFinal'), DESCRIPCION_PUESTO = document.getElementById('descripcion'),
    CARACTERES_RESTANTES = document.getElementById('caracteresRestantes'), TELEFONO_REFERENCIA = document.getElementById('telefonoReferencia');

const CONTENEDOR_ESTUDIOS = document.getElementById('contenedorEstudios'), CONTENEDOR_FORMACION_COMPLEMENTARIA = document.getElementById('contenedorFormacionComplementaria'),
    CONTENEDOR_EXPERIENCIAS = document.getElementById('contenedorExperiencias'), CONTENEDOR_REFERENCIAS = document.getElementById('contenedorReferencias');

const FORM_ESTUDIO = document.getElementById('formAgregarEstudio'), FORM_FORMACION_COMPLEMENTARIA = document.getElementById('formAgregarFormacionComplementaria'),
    FORM_EXPERIENCIA = document.getElementById('formAgregarExperiencia'), FORM_REFERENCIA = document.getElementById('formAgregarReferencia');

const SIGUIENTE_PASO_EDUCACION = document.getElementById('btnSiguientePasoEducacion'), SIGUIENTE_PASO_EXPERIENCIA = document.getElementById('btnSiguientePasoExperiencia'),
    SIGUIENTE_PASO_HABILIDAD = document.getElementById('btnSiguientePasoHabilidad');

const STEP_EDUCACION = document.getElementById('educacion'), STEP_EXPERIENCIA = document.getElementById('experiencia'),
    STEP_CONTACTO = document.getElementById('contacto');

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
    // Se manda a llamar a la función para cargar los rubros dentro del combobox.
    cargarRubros();
    // Se manda a llamar a la función para cargar las áreas laborales dentro del combobox.
    cargarAreas();
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

    cargarFormacionComplementaria();

    cargarExperiencias();

    cargarReferencias();
}


const cargarEstudios = async () => {

    const DATA = await fetchData(API_CURRICULUM, 'obtenerEstudios');

    const DATA_GRADOS = await fetchData(API_GRADOS, 'readAll');

    const DATA_INSTITUCIONES = await fetchData(API_INSTITUCIONES, 'readAll');

    if (DATA.status) {

        CONTENEDOR_ESTUDIOS.innerHTML = '';

        const ROW = DATA.dataset;

        ROW.forEach(row => {

            let institucion = '';

            row.nombre_institucion != "" ? institucion = row.nombre_institucion : institucion = DATA_INSTITUCIONES.dataset.filter(function (entry) { return entry.id_institucion === row.id_institucion })[0].nombre_institucion;

            CONTENEDOR_ESTUDIOS.innerHTML += `
            <div class="d-flex gap-2 contenedorEstudio rounded-5 p-2 align-items-center">
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

        ROW.forEach(row => {

            CONTENEDOR_FORMACION_COMPLEMENTARIA.innerHTML += `
            <div class="d-flex gap-2 contenedorEstudio rounded-5 p-2 align-items-center">
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

        ROW.forEach(row => {

            let fecha_duracion;

            row.mes_inicio != "" ? fecha_duracion = "<span class='fw-bold'>" + meses[row.mes_inicio - 1] + " " + row.year_inicio + "</span> - <span class='fw-bold'>" + meses[row.mes_final - 1] + " " + row.year_final + "</span>" : fecha_duracion = "<span class='fw-bold'>Trabajo actual</span>";

            CONTENEDOR_EXPERIENCIAS.innerHTML += `
            <div class="d-flex gap-2 contenedorEstudio rounded-5 p-2 align-items-center">
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

        ROW.forEach(row => {

            CONTENEDOR_REFERENCIAS.innerHTML += `
            <div class="d-flex gap-2 contenedorEstudio rounded-5 p-2 align-items-center">
                <p class="psinmargen tex-center"><span class="fw-bold">${row.nombre} ${row.apellido}</span>, <span class="fw-bold">${row.puesto}</span>, N. Teléfono: <span class="fw-bold">${row.telefono}</span></p>
                <i class="bi bi-x-square text-danger" onclick="eliminarReferencia('${row.identificador}')"></i>
            </div>`;
        });
    } else if (DATA.error = 'No se han agregado referencias') {

        CONTENEDOR_REFERENCIAS.innerHTML = '<p class="fw-semibold text-center psinmargen">Las referencias agregadas se mostrarán aquí</p>';
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

    if(DATA.status){

        cargarReferencias();
    } else{

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

    document.getElementById('stepperCv').addEventListener('show.bs-stepper', function (event) {

        if (event.detail.indexStep == 0) {

            STEP_EDUCACION.classList.remove('d-none');
            STEP_EXPERIENCIA.classList.add('d-none');
            STEP_CONTACTO.classList.add('d-none');
        } else if (event.detail.indexStep == 1) {

            STEP_EDUCACION.classList.add('d-none');
            STEP_EXPERIENCIA.classList.remove('d-none');
            STEP_CONTACTO.classList.add('d-none');
        } else {

            STEP_EDUCACION.classList.add('d-none');
            STEP_EXPERIENCIA.classList.add('d-none');
            STEP_CONTACTO.classList.remove('d-none');
        }
        console.warn(event.detail.indexStep)
    })
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
    } else if (SELECT_GRADOS.value != null && SELECT_GRADOS.value > 0) {

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
    } else {
        sweetAlert(3, 'Asegúrese de seleccionar un grado académico de la lista de opciones', false);

        SELECT_GRADOS.focus();
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

    const FORM = new FormData(FORM_EXPERIENCIA);

    if (ESTADO_EXPERIENCIA.checked) {

        FORM.append('booleanFecha', 1);
        FORM.append('mesInicio', "0");
        FORM.append('mesFinal', "0");
        FORM.append('yearInicio', "0000");
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
    } else {

        sweetAlert(2, DATA.error, false);
    }
});

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

        SELECT_MES_INICIO.removeAttribute("disabled");

        SELECT_YEAR_INICIO.removeAttribute("disabled");

        SELECT_MES_FINAL.removeAttribute("disabled");

        SELECT_YEAR_FINAL.removeAttribute("disabled");
    } else {

        SELECT_MES_INICIO.setAttribute("disabled", "");

        SELECT_YEAR_INICIO.setAttribute("disabled", "");

        SELECT_MES_FINAL.setAttribute("disabled", "");

        SELECT_YEAR_FINAL.setAttribute("disabled", "");
    }
});


DESCRIPCION_PUESTO.addEventListener('input', () => {

    CARACTERES_RESTANTES.textContent = 'Caracteres restantes: ' + (300 - DESCRIPCION_PUESTO.value.length);
});


TELEFONO_REFERENCIA.addEventListener('input', (e) => {
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