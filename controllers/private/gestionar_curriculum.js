
const API_GRADOS = 'services/private/grados_academicos_service.php', API_INSTITUCIONES = 'services/private/instituciones_service.php',
    API_CURRICULUM = 'services/private/curriculum_service.php', API_RUBROS = 'services/private/rubros_service.php',
    API_AREAS = 'services/private/areas_laborales_service.php', API_IDIOMAS = 'services/private/idiomas_service.php',
    API_HABILIDADES = 'services/private/habilidades_service.php';

const STEP_EDUCACION = document.getElementById('educacion'), STEP_EXPERIENCIA = document.getElementById('experiencia'),
    STEP_CONTACTO = document.getElementById('contacto'), STEP_HABILIDAD = document.getElementById('habilidad');

const SIGUIENTE_PASO = document.querySelectorAll('.siguientePaso'), PASO_ANTERIOR = document.querySelectorAll('.pasoAnterior');

const CONTENEDOR_ESTUDIOS = document.getElementById('contenedorEstudios'), CONTENEDOR_FORMACION_COMPLEMENTARIA = document.getElementById('contenedorFormacionComplementaria'),
    CONTENEDOR_EXPERIENCIAS = document.getElementById('contenedorExperiencias'), CONTENEDOR_REFERENCIAS = document.getElementById('contenedorReferencias'),
    CONTENEDOR_IDIOMAS = document.getElementById('contenedorIdiomas'), CONTENEDOR_HABILIDADES = document.getElementById('contenedorHabilidades');

const FORM_ESTUDIO = document.getElementById('formAgregarEstudio'), FORM_FORMACION_COMPLEMENTARIA = document.getElementById('formAgregarFormacionComplementaria'),
    FORM_EXPERIENCIA = document.getElementById('formAgregarExperiencia'), FORM_REFERENCIA = document.getElementById('formAgregarReferencia'),
    FORM_IDIOMA = document.getElementById('formAgregarIdioma'), FORM_HABILIDAD = document.getElementById('formAgregarHabilidad'),
    FORM_CURRICULUM = document.getElementById('agregarCurriculum');

const ESTADO_EXPERIENCIA = document.getElementById('estadoExperiencia'), SELECT_MES_INICIO = document.getElementById('mesInicio'),
    SELECT_YEAR_INICIO = document.getElementById('yearInicio'), SELECT_MES_FINAL = document.getElementById('mesFinal'),
    SELECT_YEAR_FINAL = document.getElementById('yearFinal'), DESCRIPCION_PUESTO = document.getElementById('descripcion'),
    CARACTERES_RESTANTES = document.getElementById('caracteresRestantes');

const SELECT_GRADOS = document.getElementById('gradoAcademico'), SELECT_INSTITUCIONES = document.getElementById('institucion'),
    OTRA_INSTITUCION = document.getElementById('otraInstitucion'), SELECT_FECHA_ESTUDIO = document.getElementById('fechaFinal'),
    SELECT_FECHA_CERTIFICADO = document.getElementById('fechaFinalCertificado'), ESTADO_ESTUDIO = document.getElementById('estadoEstudio'),
    SELECT_AREAS = document.getElementById('area'), SELECT_RUBROS = document.getElementById('rubro'),
    TITULO_ESTUDIO = document.getElementById('titulo'), TELEFONOS = document.querySelectorAll('.telefono'),
    SELECT_ASPIRANTES = document.getElementById('aspirante');

const ARCHIVO_IMAGEN = document.getElementById('archivoImagen'), IMAGEN_ASPIRANTE = document.getElementById('imgAspirante'),
    CORREO_ASPIRANTE = document.getElementById('correo'), TELEFONO_MOVIL = document.getElementById('telefonoMovil'),
    TELEFONO_FIJO = document.getElementById('telefonoFijo');

const SELECT_IDIOMAS = document.getElementById('idioma'), SELECT_HABILIDADES = document.getElementById('nombreHabilidad');

const CONTENEDOR_ASPIRANTES = document.getElementById('contenedorAspirantes');

const ESTUDIOS = [], CERTIFICADOS = [], EXPERIENCIAS = [], REFERENCIAS = [], IDIOMAS = [], HABILIDADES = [];

let editarCv = false, errorCurriculum = false;

// Se inicializan y agregan los diseños de los elementos select2.
$("#aspirante").select2({
    theme: "bootstrap",
    placeholder: "Seleccione un aspirante",
    maximumSelectionSize: 6,
    containerCssClass: ':all:',
    "language": {
        "noResults": function () {
            return "No se encontraron resultados";
        }
    },
});

$("#institucion").select2({
    theme: "bootstrap",
    placeholder: "Seleccione una institución",
    maximumSelectionSize: 6,
    containerCssClass: ':all:',
    "language": {
        "noResults": function () {
            return "No se encontraron resultados";
        }
    },
});

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    await cargarPlantilla();
    // Se almacena la etiqueta de texto en la constante.
    const TITULO = document.getElementById('tituloPrincipal');
    // Se almacena la url en la variable.
    var url = document.URL;
    // Se almacena el parámetro en la variable.
    var parametro = new URL(url).searchParams.get("id");
    // Si se encuentra el parámetro se ejecuta el código.
    if (parametro != null) {
        // Se configura el título del elemento y del documento.
        TITULO.textContent = "Editar currículum";
        document.title = "Editar currículum";
    } else {
        // Se configura el título del elemento y del documento.
        TITULO.textContent = "Agregar currículum";
        document.title = "Agregar currículum";
        // Se muestra el select con la lista de aspirantes sin currículum asignado.
        CONTENEDOR_ASPIRANTES.classList.remove('d-none');
        // Se cargan los aspirantes dentro del select.
        cargarAspirantes();
    }
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
    // Se manda a llamar a la función para rellenar los contenedores de los apartados del currículum.
    configurarContenedores();
});


const configurarContenedores = async () => {

    cargarEstudios();

    cargarFormacionComplementaria();

    cargarExperiencias();

    cargarReferencias();

    cargarIdiomasCV();

    cargarHabilidadesCV();
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
            MAIN.scrollTo(0, 0);
        });
    });


    PASO_ANTERIOR.forEach(boton => {
        // Evento que se ejecuta al hacer click en el botón apartado anterior.
        boton.addEventListener('click', async () => {
            // Se traslada hacia el anterior apartado del stepper.
            await stepperCv.previous();
            // Se restablece el scroll de la pantalla.
            MAIN.scrollTo(0, 0);
        });
    });

    document.getElementById('stepperCv').addEventListener('show.bs-stepper', function (event) {

        if (event.detail.indexStep == 0) {

            STEP_EDUCACION.classList.remove('d-none');
            STEP_EXPERIENCIA.classList.add('d-none');
            STEP_HABILIDAD.classList.add('d-none');
            STEP_CONTACTO.classList.add('d-none');
            // Se restablece el scroll de la pantalla.
            window.scrollTo(0, 0);
        } else if (event.detail.indexStep == 1) {

            STEP_EDUCACION.classList.add('d-none');
            STEP_EXPERIENCIA.classList.remove('d-none');
            STEP_HABILIDAD.classList.add('d-none');
            STEP_CONTACTO.classList.add('d-none');
            // Se restablece el scroll de la pantalla.
            window.scrollTo(0, 0);
        } else if (event.detail.indexStep == 2) {

            STEP_EDUCACION.classList.add('d-none');
            STEP_EXPERIENCIA.classList.add('d-none');
            STEP_HABILIDAD.classList.remove('d-none');
            STEP_CONTACTO.classList.add('d-none');
            // Se restablece el scroll de la pantalla.
            window.scrollTo(0, 0);
        } else {

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

// Función que permite cargar aspirantes sin un currículum asignado en el select.
const cargarAspirantes = async () => {
    // Se realiza la petición a la API para obtener los aspirantes sin currículum.
    const DATA = await fetchData(API_CURRICULUM, 'readAspirantes');
    // Se inicializa el contenido del select.
    SELECT_ASPIRANTES.innerHTML = '<option value="" selected>Seleccione una opción</option>';
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {
        // Se recorren las entradas del conjunto de datos y se agrega una opción dentro del select por cada una.
        DATA.dataset.forEach(row => {
            SELECT_ASPIRANTES.innerHTML += `
                <option value="${row.id_aspirante}">${row.nombre_aspirante} ${row.apellido_aspirante} - ${row.correo_aspirante}</option>
            `;
        });
    } else {
        // Se muestra el error en consola.
        console.log(DATA.error);
    }
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
    SELECT_INSTITUCIONES.innerHTML = '<option value="-1" selected>Seleccione una opción</option>';
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
    } else {
        console.log(DATA.error);
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
    } else {
        console.log(DATA.error);
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
    } else {
        console.log(DATA.error);
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
    } else {
        console.log(DATA.error);
    }
}

// Evento que se ejecuta al cambiar la opción seleccionada.
$('#institucion').on('change', function (e) {
    // Se verifica si el array está vacío.
    if ($("#institucion").select2('data').length == 0) {
    }
    // Si el valor seleccionado es 0 se ejecuta el código.
    else if ($("#institucion").select2('data')[0].id == 0) {

        OTRA_INSTITUCION.removeAttribute("disabled");
    } else {
        // Se activa el campo de otra institución.
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


const cargarEstudios = async () => {

    const DATA = ESTUDIOS;

    const DATA_GRADOS = await fetchData(API_GRADOS, 'readAll');

    const DATA_INSTITUCIONES = await fetchData(API_INSTITUCIONES, 'readAll');

    if (DATA.length > 0) {

        CONTENEDOR_ESTUDIOS.innerHTML = '';

        DATA.forEach(row => {

            let institucion = '';

            row.nombre_institucion != "" ? institucion = row.nombre_institucion : institucion = DATA_INSTITUCIONES.dataset.filter(function (entry) { return entry.id_institucion === parseInt(row.id_institucion) })[0].nombre_institucion;

            CONTENEDOR_ESTUDIOS.innerHTML += `
            <div class="d-flex gap-2 contenedorElementoCV rounded-5 p-2 align-items-center">
                <p class="psinmargen tex-center"><span class="fw-bold">${DATA_GRADOS.dataset.filter(function (entry) { return entry.ID === parseInt(row.id_grado); })[0].NOMBRE}</span> en <span class="fw-bold"> <span class="fw-bold">${row.titulo_estudio}</span>, ${institucion}</span> - <span class="fw-bold">${row.fecha_finalizacion_estudio != "" ? row.fecha_finalizacion_estudio : "Cursando"}</span></p>
                <i class="bi bi-x-square text-danger" onclick="eliminarEstudio('${row.identificador}')"></i>
            </div>`;
        });
    } else {

        CONTENEDOR_ESTUDIOS.innerHTML = '<p class="fw-semibold text-center psinmargen">Los estudios agregados se mostrarán aquí</p>';
    }
}


const cargarFormacionComplementaria = async () => {

    const DATA = CERTIFICADOS;

    if (DATA.length > 0) {

        CONTENEDOR_FORMACION_COMPLEMENTARIA.innerHTML = '';

        Object.values(DATA).forEach(row => {

            CONTENEDOR_FORMACION_COMPLEMENTARIA.innerHTML += `
            <div class="d-flex gap-2 contenedorElementoCV rounded-5 p-2 align-items-center">
                <p class="psinmargen tex-center"><span class="fw-bold">${row.titulo_certificado}</span> en <span class="fw-bold">${row.institucion_certificado}</span> - <span class="fw-bold">${row.fecha_finalizacion}</span></p>
                <i class="bi bi-x-square text-danger" onclick="eliminarFormacionComplementaria('${row.identificador}')"></i>
            </div>`;
        });
    } else {

        CONTENEDOR_FORMACION_COMPLEMENTARIA.innerHTML = '<p class="fw-semibold text-center psinmargen">La formación complementaria agregada se mostrará aquí</p>';
    }
}


const cargarExperiencias = async () => {

    const DATA = EXPERIENCIAS;

    if (DATA.length > 0) {

        CONTENEDOR_EXPERIENCIAS.innerHTML = '';

        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        DATA.forEach(row => {

            let fecha_duracion;

            row.mes_final != "" ? fecha_duracion = "<span class='fw-bold'>" + meses[row.mes_inicio - 1] + " " + row.year_inicio + "</span> - <span class='fw-bold'>" + meses[row.mes_final - 1] + " " + row.year_final + "</span>" : fecha_duracion = "<span class='fw-bold'>" + meses[row.mes_inicio] + " " + row.year_inicio + "</span> - <span class='fw-bold'>Trabajo actual</span>";

            CONTENEDOR_EXPERIENCIAS.innerHTML += `
            <div class="d-flex gap-2 contenedorElementoCV rounded-5 p-2 align-items-center">
                <p class="psinmargen tex-center"><span class="fw-bold">${row.cargo}</span> en <span class="fw-bold">${row.empresa}</span>, ${fecha_duracion} </p>
                <i class="bi bi-x-square text-danger" onclick="eliminarExperiencia('${row.identificador}')"></i>
            </div>`;
        });
    } else {

        CONTENEDOR_EXPERIENCIAS.innerHTML = '<p class="fw-semibold text-center psinmargen">Las experiencias agregadas se mostrarán aquí</p>';
    }
}


const cargarReferencias = async () => {

    const DATA = REFERENCIAS;

    if (DATA.length > 0) {

        CONTENEDOR_REFERENCIAS.innerHTML = '';

        DATA.forEach(row => {

            CONTENEDOR_REFERENCIAS.innerHTML += `
            <div class="d-flex gap-2 contenedorElementoCV rounded-5 p-2 align-items-center">
                <p class="psinmargen tex-center"><span class="fw-bold">${row.nombre} ${row.apellido}</span>, <span class="fw-bold">${row.puesto}</span>, N. Teléfono: <span class="fw-bold">${row.telefono}</span></p>
                <i class="bi bi-x-square text-danger" onclick="eliminarReferencia('${row.identificador}')"></i>
            </div>`;
        });
    } else {

        CONTENEDOR_REFERENCIAS.innerHTML = '<p class="fw-semibold text-center psinmargen">Las referencias agregadas se mostrarán aquí</p>';
    }
}


const cargarIdiomasCV = async () => {

    const DATA = IDIOMAS;

    const DATA_IDIOMAS = await fetchData(API_IDIOMAS, 'readAll');

    if (DATA.length > 0) {

        CONTENEDOR_IDIOMAS.innerHTML = '';

        DATA.forEach(row => {

            CONTENEDOR_IDIOMAS.innerHTML += `
            <div class="d-flex gap-2 contenedorElementoCV rounded-5 p-2 align-items-center">
                <p class="psinmargen tex-center"><span class="fw-bold">${DATA_IDIOMAS.dataset.filter(function (entry) { return entry.ID === parseInt(row.idioma); })[0].NOMBRE}</span> - <span class="fw-bold">${row.nivel}</span></p>
                <i class="bi bi-x-square text-danger" onclick="eliminarIdioma('${row.identificador}')"></i>
            </div>`;
        });
    } else {

        CONTENEDOR_IDIOMAS.innerHTML = '<p class="fw-semibold text-center psinmargen">Los idiomas agregados se mostrarán aquí</p>';
    }
}

const cargarHabilidadesCV = async () => {

    const DATA = HABILIDADES;

    const DATA_HABILIDADES = await fetchData(API_HABILIDADES, 'readAll');

    if (DATA.length > 0) {

        CONTENEDOR_HABILIDADES.innerHTML = '';

        DATA.forEach(row => {

            CONTENEDOR_HABILIDADES.innerHTML += `
            <div class="d-flex gap-2 contenedorElementoCV rounded-5 p-2 align-items-center">
                <p class="psinmargen tex-center"><span class="fw-bold">${DATA_HABILIDADES.dataset.filter(function (entry) { return entry.id_habilidad === parseInt(row.habilidad); })[0].nombre_habilidad}</span> - <span class="fw-bold">${row.nivel}</span></p>
                <i class="bi bi-x-square text-danger" onclick="eliminarHabilidad('${row.identificador}')"></i>
            </div>`;
        });
    } else {

        CONTENEDOR_HABILIDADES.innerHTML = '<p class="fw-semibold text-center psinmargen">Las habilidades agregadas se mostrarán aquí</p>';
    }
}

// Función que permite crear un id para los apartados del currículum.
function crearId(longitud) {
    // Variable donde se almacenará el id.
    let resultado = '';
    // Se definen los caracteres que se utilizarán en el id.
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // Se almacena la longitud de la cadena de caracteres en el string.
    const longitudCaracteres = caracteres.length;
    // Se inicializa la variable.
    let contador = 0;
    // Se realiza una iteración para obtener un nuevo caracter por cada iteración.
    while (contador < longitud) {
        // Se almacena el caracter random en la variable.
        resultado += caracteres.charAt(Math.floor(Math.random() * longitudCaracteres));
        contador += 1;
    }
    // Se retorna el id.
    return resultado;
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

        let fechaFinal;

        if (ESTADO_ESTUDIO.checked) {

            FORM.append('booleanFecha', 1);
            FORM.append('fechaFinal', "0000");
            fechaFinal = "";
        } else {

            fechaFinal = FORM_ESTUDIO.elements['fechaFinal'].value;
            FORM.append('booleanFecha', 0);
        }

        if (SELECT_INSTITUCIONES.value == 0) {

            FORM.append('booleanoInstitucion', 1)
        } else {

            FORM.append('booleanoInstitucion', 0)
            FORM.append('otraInstitucion', '');
        }

        const IDENTIFICADOR = crearId(10);

        FORM.append("identificador", IDENTIFICADOR);

        const DATA = await fetchData(API_CURRICULUM, 'validarEstudio', FORM);

        if (DATA.status) {

            ESTUDIOS.push({
                identificador: IDENTIFICADOR, id_grado: FORM_ESTUDIO.elements['gradoAcademico'].value, titulo_estudio: FORM_ESTUDIO.elements['titulo'].value, id_institucion: FORM_ESTUDIO.elements['institucion'].value,
                nombre_institucion: FORM_ESTUDIO.elements['otraInstitucion'].value, fecha_finalizacion_estudio: fechaFinal
            });

            FORM_ESTUDIO.reset();

            SELECT_FECHA_ESTUDIO.removeAttribute("disabled");

            OTRA_INSTITUCION.setAttribute('disabled', '');

            $("#institucion").val('').trigger('change');

            cargarEstudios();

            sweetAlert(1, 'Estudio agregado', false);
        } else {

            sweetAlert(2, DATA.error, false);
        }
    }
});

const eliminarEstudio = async (id) => {

    ESTUDIOS.forEach(row => {

        var indice = ESTUDIOS.indexOf(row);

        if (row.identificador == id) {

            ESTUDIOS.splice(indice, 1);
        }
    });

    cargarEstudios();
}

FORM_FORMACION_COMPLEMENTARIA.addEventListener('submit', async (e) => {

    e.preventDefault();

    const FORM = new FormData(FORM_FORMACION_COMPLEMENTARIA);

    const IDENTIFICADOR = crearId(10);

    FORM.append("identificador", IDENTIFICADOR);

    const DATA = await fetchData(API_CURRICULUM, 'validarCertificado', FORM);

    if (DATA.status) {

        CERTIFICADOS.push({
            identificador: IDENTIFICADOR, titulo_certificado: FORM_FORMACION_COMPLEMENTARIA['tituloCertificado'].value, institucion_certificado: FORM_FORMACION_COMPLEMENTARIA['institucionCertificado'].value,
            fecha_finalizacion: FORM_FORMACION_COMPLEMENTARIA['fechaFinalCertificado'].value
        });

        FORM_FORMACION_COMPLEMENTARIA.reset();

        cargarFormacionComplementaria();

        sweetAlert(1, 'Certificado agregado', false);
    } else {

        sweetAlert(2, DATA.error, false);
    }

});


const eliminarFormacionComplementaria = async (id) => {

    CERTIFICADOS.forEach(row => {

        var indice = CERTIFICADOS.indexOf(row);

        if (row.identificador == id) {

            CERTIFICADOS.splice(indice, 1);
        }
    });

    cargarFormacionComplementaria();
}

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

        var mesFinal;

        var yearFinal;

        if (ESTADO_EXPERIENCIA.checked) {

            FORM.append('booleanFecha', 1);
            FORM.append('mesFinal', "0");
            FORM.append('yearFinal', "0000");
            mesFinal = "";
            yearFinal = "";
        } else {

            mesFinal = FORM_EXPERIENCIA['mesFinal'].value;
            yearFinal = FORM_EXPERIENCIA['yearFinal'].value;
            FORM.append('booleanFecha', 0);
        }

        const IDENTIFICADOR = crearId(10);

        FORM.append('identificador', IDENTIFICADOR);

        const DATA = await fetchData(API_CURRICULUM, 'validarExperiencia', FORM);

        if (DATA.status) {

            EXPERIENCIAS.push({
                identificador: IDENTIFICADOR, empresa: FORM_EXPERIENCIA['empresa'].value, cargo: FORM_EXPERIENCIA['cargo'].value, rubro: FORM_EXPERIENCIA['rubro'].value, area: FORM_EXPERIENCIA['area'].value,
                mes_inicio: FORM_EXPERIENCIA['mesInicio'].value, year_inicio: FORM_EXPERIENCIA['yearInicio'].value, mes_final: mesFinal, year_final: yearFinal,
                descripcion: FORM_EXPERIENCIA['descripcion']
            });

            FORM_EXPERIENCIA.reset();

            SELECT_MES_FINAL.removeAttribute("disabled");

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


const eliminarExperiencia = async (id) => {

    EXPERIENCIAS.forEach(row => {

        var indice = EXPERIENCIAS.indexOf(row);

        if (row.identificador == id) {

            EXPERIENCIAS.splice(indice, 1);
        }
    });

    cargarExperiencias();
}

FORM_REFERENCIA.addEventListener('submit', async (e) => {

    e.preventDefault();

    if (!(FORM_REFERENCIA['telefonoReferencia'].value.length == 9)) {

        await sweetAlert(3, 'El teléfono de la referencia debe tener 8 digitos y seguir el formato ####-####', false);

        FORM_REFERENCIA['telefonoReferencia'].focus();
    } else {

        var telefonoReferencia;

        if (REFERENCIAS.length == 0) {

            telefonoReferencia = [];
        } else {

            telefonoReferencia = REFERENCIAS.filter(function (entry) { return entry.telefono === FORM_REFERENCIA['telefonoReferencia'].value });
        }

        const FORM = new FormData(FORM_REFERENCIA);

        const IDENTIFICADOR = crearId(10);

        FORM.append('identificador', IDENTIFICADOR);

        const DATA = await fetchData(API_CURRICULUM, 'validarReferencia', FORM);

        if (DATA.status && telefonoReferencia.length == 0) {

            REFERENCIAS.push({
                identificador: IDENTIFICADOR, nombre: FORM_REFERENCIA['nombre'].value, apellido: FORM_REFERENCIA['apellido'].value, puesto: FORM_REFERENCIA['puesto'].value,
                telefono: FORM_REFERENCIA['telefonoReferencia'].value
            });

            FORM_REFERENCIA.reset();

            cargarReferencias();

            sweetAlert(1, 'Referencia agregada', false);
        } else if (telefonoReferencia.length > 0) {

            sweetAlert(3, "El teléfono digitado ya ha sido agregado en otra referencia.\nDigite un número diferente.", false);
        } else {

            sweetAlert(2, DATA.error, false);
        }
    }
});


const eliminarReferencia = async (id) => {

    REFERENCIAS.forEach(row => {

        var indice = REFERENCIAS.indexOf(row);

        if (row.identificador == id) {

            REFERENCIAS.splice(indice, 1);
        }
    });

    cargarReferencias();
}

FORM_IDIOMA.addEventListener('submit', async (e) => {

    e.preventDefault();

    if (SELECT_IDIOMAS.value == "default") {

        sweetAlert(3, "Asegúrese de seleccionar un idioma", false);

        SELECT_IDIOMAS.focus();
    } else {

        var idioma;

        if (IDIOMAS.length == 0) {

            idioma = [];
        } else {

            idioma = IDIOMAS.filter(function (entry) { return entry.idioma === FORM_IDIOMA['idioma'].value });
        }

        const FORM = new FormData(FORM_IDIOMA);

        const IDENTIFICADOR = crearId(10);

        FORM.append('identificador', IDENTIFICADOR);

        const DATA = await fetchData(API_CURRICULUM, 'validarIdioma', FORM);

        if (DATA.status && idioma.length == 0) {

            IDIOMAS.push({ identificador: IDENTIFICADOR, idioma: FORM_IDIOMA['idioma'].value, nivel: FORM_IDIOMA['nivelIdioma'].value });

            FORM_IDIOMA.reset();

            cargarIdiomasCV();

            sweetAlert(1, 'Idioma agregado', false);
        } else if (idioma.length > 0) {

            sweetAlert(3, "El idioma ya ha sido agregado", false);
        } else {

            sweetAlert(2, DATA.error, false);
        }
    }
});


const eliminarIdioma = async (id) => {

    IDIOMAS.forEach(row => {

        var indice = IDIOMAS.indexOf(row);

        if (row.identificador == id) {

            IDIOMAS.splice(indice, 1);
        }
    });

    cargarIdiomasCV();
}

FORM_HABILIDAD.addEventListener('submit', async (e) => {

    e.preventDefault();

    if (SELECT_HABILIDADES.value == "default") {

        await sweetAlert(3, 'Asegúrese de seleccionar una habilidad');

        SELECT_HABILIDADES.focus();
    } else {

        var habilidad;

        if (HABILIDADES.length == 0) {

            habilidad = [];
        } else {

            habilidad = HABILIDADES.filter(function (entry) { return entry.habilidad === FORM_HABILIDAD['nombreHabilidad'].value });
        }

        const FORM = new FormData(FORM_HABILIDAD);

        const IDENTIFICADOR = crearId(10);

        FORM.append('identificador', IDENTIFICADOR);

        const DATA = await fetchData(API_CURRICULUM, 'validarHabilidad', FORM);

        if (DATA.status && habilidad.length == 0) {

            HABILIDADES.push({ identificador: IDENTIFICADOR, habilidad: FORM_HABILIDAD['nombreHabilidad'].value, nivel: FORM_HABILIDAD['nivelHabilidad'].value });

            FORM_HABILIDAD.reset();

            cargarHabilidadesCV();

            sweetAlert(1, 'Habilidad agregada', false);
        } else if (habilidad.length > 0) {

            sweetAlert(3, "La habilidad ya ha sido agregada", false);
        } else {

            sweetAlert(2, DATA.error, false);
        }
    }
});


const eliminarHabilidad = async (id) => {

    HABILIDADES.forEach(row => {

        var indice = HABILIDADES.indexOf(row);

        if (row.identificador == id) {

            HABILIDADES.splice(indice, 1);
        }
    });

    cargarHabilidadesCV();
}


FORM_CURRICULUM.addEventListener('submit', async (e) => {

    e.preventDefault();

    let estudio = ESTUDIOS.length;

    if (ARCHIVO_IMAGEN.value == "" && !editarCv) {

        await sweetAlert(3, "Asegúrese de seleccionar la imagen que se mostrará en el currículum", false);

        ARCHIVO_IMAGEN.focus();
    } else if (TELEFONO_MOVIL.value == "") {

        await sweetAlert(3, "Asegúrese de agregar el teléfono móvil", false);

        TELEFONO_MOVIL.focus();
    } else if (CORREO_ASPIRANTE.value.trim() == "") {

        await sweetAlert(3, "Asegúrese de agregar el correo electrónico", false);

        CORREO_ASPIRANTE.focus();
    } else if (!($("#aspirante").select2('data')[0].id > 0)) {

        await sweetAlert(3, 'Asegúrese de seleccionar un aspirante de la lista de opciones', false);

        SELECT_ASPIRANTES.focus();
    } else if (estudio > 0) {

        const FORM = new FormData(FORM_CURRICULUM);

        const FORM_ASPIRANTE = new FormData();

        let accion;

        editarCv ? accion = 'actualizarCurriculum' : accion = 'agregarCurriculum';

        ARCHIVO_IMAGEN.value != "" ? FORM.append("booleanImagen", 0) : FORM.append("booleanImagen", 1);

        FORM.append('idAspirante', parseInt($("#aspirante").select2('data')[0].id));

        FORM_ASPIRANTE.append('idAspirante', parseInt($("#aspirante").select2('data')[0].id));

        const DATA = await fetchData(API_CURRICULUM, accion, FORM);

        const DATA_ASPIRANTE = await fetchData(API_CURRICULUM, 'getIdCv', FORM_ASPIRANTE);

        if (DATA.status && DATA_ASPIRANTE.status && editarCv) {

            const DATA_APARTADOS = await fetchData(API_CURRICULUM, 'obtenerApartados');

            const FORM = new FormData();
            // Se almacena la url en la variable.
            var url = document.URL;
            // Se almacena el parámetro en la variable.
            var parametro = new URL(url).searchParams.get("id");
            // Se almacena el id del currículum en el parámetro.
            FORM.append('idCurriculum', parametro);

            await fetchData(API_CURRICULUM, 'eliminarApartados', FORM);

            await agregarEstudios(FORM);

            DATA_APARTADOS.dataset[0] == false ? "" : await agregarCertificados(FORM);

            DATA_APARTADOS.dataset[1] == false ? "" : await agregarExperiencias(FORM);

            DATA_APARTADOS.dataset[4] == false ? "" : await agregarReferencias(FORM);

            DATA_APARTADOS.dataset[2] == false ? "" : await agregarIdiomas(FORM);

            DATA_APARTADOS.dataset[3] == false ? "" : await agregarHabilidades(FORM);

            errorCurriculum ? async () => {
                await sweetAlert(1, 'Currículum actualizado correctamente');
                sweetAlert(3, 'Es posible que los apartados no se hayan actualizado correctamente, se recomienda verificar el currículum', false);
            } : sweetAlert(1, 'Currículum actualizado correctamente', true, 'curriculums.html');
        }
        else if (DATA.status && DATA_ASPIRANTE.status) {

            const FORM = new FormData();

            FORM.append('idCurriculum', DATA_ASPIRANTE.dataset);

            agregarEstudios(FORM);

            // CERTIFICADOS.length > 0 ? "" : await agregarCertificados(FORM);

            // EXPERIENCIAS.length > 0 ? "" : await agregarExperiencias(FORM);

            // REFERENCIAS.length > 0 ? "" : await agregarReferencias(FORM);

            // IDIOMAS.length > 0 ? "" : await agregarIdiomas(FORM);

            // HABILIDADES.length > 0 ? "" : await agregarHabilidades(FORM);

            errorCurriculum ? async () => {
                await sweetAlert(1, 'Currículum agregado correctamente');
                await sweetAlert(3, 'Es posible que los apartados no se hayan agregado correctamente, se recomienda verificar el currículum', false, 'curriculums.html');
            } : sweetAlert(1, 'Currículum agregado correctamente', false, 'curriculums.html');
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

            ARCHIVO_IMAGEN.focus();
        } else {

            sweetAlert(2, DATA.error, false);
        }
    } else {

        sweetAlert(3, "Debe agregar por lo menos 1 estudio al currículum", false);

        var stepperCv = new Stepper(document.querySelector('#stepperCv'), {
            linear: false,
            animation: true
        });

        stepperCv.to(1);

        MAIN.scrollTo(0, 0);

        document.querySelector('.bs-stepper-header').scrollTo(0, 0);
    }
});


const agregarEstudios = async (form) => {

    for (let i = 0; i < ESTUDIOS.length; i++) {

        console.log(ESTUDIOS[i]);
        
        form.append('gradoAcademico', ESTUDIOS[i].id_grado);

        form.append('titulo', ESTUDIOS[i].titulo_estudio);
        
        if (ESTUDIOS[i].fecha_finalizacion_estudio == "") {

            form.append('booleanFecha', 1);
            form.append('fechaFinal', "0000");
        } else {

            form.append("fechaFinal", ESTUDIOS[i].fecha_finalizacion_estudio);
            form.append('booleanFecha', 0);
        }

        if (ESTUDIOS[i].id_institucion == "0") {

            form.append('institucion', 0);
            form.append('booleanoInstitucion', 1);
            form.append('otraInstitucion', ESTUDIOS[i].nombre_institucion);
        } else {

            form.append('institucion', ESTUDIOS[i].id_institucion);
            form.append('booleanoInstitucion', 0)
            form.append('otraInstitucion', '');
        }

        const DATA = await fetchData(API_CURRICULUM, 'agregarEstudio', form);

        if(DATA.status){
        } else{

            errorCurriculum = true;
        }

    }
}