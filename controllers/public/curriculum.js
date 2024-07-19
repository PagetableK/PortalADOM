
const API_GRADOS = 'services/public/grados_academicos_service.php', API_INSTITUCIONES = 'services/public/instituciones_service.php',
    API_CURRICULUM = 'services/public/curriculum_service.php', API_RUBROS = 'services/public/rubros_service.php',
    API_AREAS = 'services/public/areas_laborales_service.php', API_IDIOMAS = 'services/public/idiomas_service.php',
    API_HABILIDADES = 'services/public/habilidades_service.php';
const API_ASPIRANTE = 'services/public/aspirantes_service.php';
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

const SELECT_IDIOMAS = document.getElementById('idioma'), SELECT_HABILIDADES = document.getElementById('nombreHabilidad');

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

const BOTON_EDITAR = document.getElementById('btnEditarCv'), BOTON_REGRESAR = document.getElementById('botonRegresar'),
    BOTON_CURRICULUM = document.getElementById('btnCurriculum'), TEXTO_BOTON = document.getElementById('textoBoton'),
    ICONO_AGREGAR = document.getElementById('iconoAgregar'), ICONO_EDITAR = document.getElementById('iconoEditar'),
    CONTENEDOR_BOTON = document.getElementById('contenedorBtnRegresar'), CONTENEDOR_MENSAJE = document.getElementById('contenedorMensaje');

let errorCurriculum = false, editarCv = false;

// Se inicializa y agrega el diseño del elemento select2.
$(".select2-single").select2({
    theme: "bootstrap",
    placeholder: "Seleccione una institución",
    maximumSelectionSize: 6,
    containerCssClass: ':all:',
    "language": {
        "noResults": function(){
            return "No se encontraron resultados";
        }
    },
});

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


const openReport = async () => {
    console.log("openReport llamado");
    // Asegúrate de que la biblioteca jsPDF esté cargada
    const { jsPDF } = window.jspdf;

    // Crear un nuevo documento PDF
    const doc = new jsPDF('p', 'mm', 'a4');


    // Fetch data from your API or data source
    const dataCurriculum = await fetchData(API_ASPIRANTE, 'reallCurriculum', {});

    if (dataCurriculum.status) {
        dataCurriculum.dataset.forEach(rowCurriculum => {
            // Definir colores
            const primaryColor = [225, 235, 247];  // Color primario (azul claro)
            const secondaryColor = [0, 52, 99];  // Color secundario (negro)

            // Dibujar fondo azul claro
            doc.setFillColor(...primaryColor);
            doc.rect(0, 0, 60, 297, 'F');

            // Añadir foto del perfil
            const imgData = `../../api/images/aspirantes/${rowCurriculum['IMAGEN']}`; // Reemplaza con los datos de la imagen en base64
            doc.addImage(imgData, 'JPEG', 10, 10, 40, 40);

            // Añadir nombre y título
            doc.setFont('Times', 'bold');
            doc.setFontSize(28);
            doc.setTextColor(...secondaryColor);
            doc.text(rowCurriculum['NOMBRE'], 70, 20, {maxWidth: 140});
            doc.setFontSize(16);
            doc.setTextColor(0, 0, 0);

            // Añadir sección de contacto
            doc.setFontSize(12);
            doc.setTextColor(...secondaryColor);
            doc.text('CONTACTO', 10, 60);
            doc.setDrawColor(...secondaryColor);
            doc.setLineWidth(0.5);
            doc.line(10, 62, 50, 62);

            doc.setFont('Times', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            const contactFields = [
                rowCurriculum['correo_aspirante'],
                `(+503) ${rowCurriculum['telefono_movil']}`
            ];
            let yPositionC = 70;
            contactFields.forEach(field => {
                doc.text(field, 10, yPositionC);
                yPositionC += 6;
            });

            // Añadir sección de idiomas
            // Filtrar idiomas únicos asociados al currículum actual
            const idiomas = dataCurriculum.dataset.filter(item => item['id_curriculum'] === rowCurriculum['id_curriculum']);

            // Verificar si hay datos válidos para mostrar la sección de idiomas
            if (idiomas.length > 0 && idiomas.some(idioma => idioma['nombre_idioma'] && idioma['nivel_idioma'])) {
                doc.setFontSize(12);
                doc.setTextColor(...secondaryColor);
                doc.text('IDIOMAS', 10, yPositionC + 10);
                doc.line(10, yPositionC + 12, 50, yPositionC + 12);

                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0);

                let idiomasMostrados = new Set(); // Usar un Set para almacenar idiomas únicos
                let yPositionIdiomas = yPositionC + 18;

                idiomas.forEach(idioma => {
                    const nombreIdioma = idioma['nombre_idioma'];
                    const nivelIdioma = idioma['nivel_idioma'];

                    if (nombreIdioma && nivelIdioma && !idiomasMostrados.has(nombreIdioma)) {
                        const field = `. ${nombreIdioma}: ${nivelIdioma}`;
                        const lines = doc.splitTextToSize(field, 50);
                        lines.forEach(line => {
                            if (yPositionIdiomas <= 297) {
                                doc.text(line, 10, yPositionIdiomas);
                                yPositionIdiomas += 6;
                            }
                        });
                        idiomasMostrados.add(nombreIdioma); // Agregar idioma al Set para evitar duplicados
                    }
                });

                // Actualizar yPositionC al final de la sección de idiomas
                yPositionC = yPositionIdiomas + 10;
            }

            yPositionC = yPositionC + 10;

            // Añadir sección de habilidades debajo de los idiomas
            const primaryColorRectWidth = 50; // Ancho del rectángulo azul claro

            // Filtrar habilidades únicas asociadas al currículum actual
            const habilidades = dataCurriculum.dataset.filter(item => item['id_curriculum'] === rowCurriculum['id_curriculum'])
                .map(item => ({
                    nombre: item['nombre_habilidad'],
                    nivel: item['nivel_habilidad']
                }));

            // Verificar si hay datos válidos para mostrar la sección de habilidades
            if (habilidades.length > 0 && habilidades.some(habilidad => habilidad['nombre'] && habilidad['nivel'])) {
                doc.setFont('Times', 'bold');
                doc.setFontSize(12);
                doc.setTextColor(...secondaryColor);
                doc.text('HABILIDADES', 10, yPositionC);
                doc.line(10, yPositionC + 2, 50, yPositionC + 2); // Usar el ancho del rectángulo azul claro

                doc.setFont('Times', 'normal');
                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0);

                let habilidadesMostradas = new Set(); // Usar un Set para almacenar habilidades únicas
                let yPositionHabilidades = yPositionC + 10;

                habilidades.forEach(habilidad => {
                    const habilidadString = `. ${habilidad['nombre']}: ${habilidad['nivel']}`;
                    if (habilidad['nombre'] && habilidad['nivel'] && !habilidadesMostradas.has(habilidadString)) {
                        const lines = doc.splitTextToSize(habilidadString, primaryColorRectWidth - 10); // Ajustar al ancho del rectángulo
                        lines.forEach(line => {
                            if (yPositionHabilidades <= 297) {
                                doc.text(line, 10, yPositionHabilidades);
                                yPositionHabilidades += 6;
                            }
                        });
                        habilidadesMostradas.add(habilidadString); // Agregar habilidad al Set para evitar duplicados
                    }
                });

                // Actualizar yPositionC al final de la sección de habilidades
                yPositionC = Math.max(yPositionC, yPositionHabilidades + 10);
            }

            // Obtener referencias únicas del conjunto de datos
            const referencias = new Set();
            dataCurriculum.dataset.forEach(item => {
                if (item['id_curriculum'] === rowCurriculum['id_curriculum'] &&
                    item['APELLIDO'] && item['puesto_trabajo'] && item['telefono_referencia']) {
                    const referencia = `. ${item['APELLIDO']},\n${item['puesto_trabajo']},\n(+503) ${item['telefono_referencia']}`;
                    referencias.add(referencia);
                }
            });

            // Verificar si hay datos válidos para mostrar la sección de referencias
            if (referencias.size > 0) {
                doc.setFont('Times', 'bold');
                doc.setFontSize(12);
                doc.setTextColor(...secondaryColor);
                doc.text('REFERENCIA', 10, yPositionC);
                doc.line(10, yPositionC + 2, primaryColorRectWidth, yPositionC + 2); // Usar el ancho del rectángulo azul claro

                doc.setFont('Times', 'normal');
                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0);
                let yPositionReferencias = yPositionC + 10;

                // Mostrar referencias únicas en el PDF
                referencias.forEach(referencia => {
                    const lines = doc.splitTextToSize(referencia, primaryColorRectWidth - 10); // Ajustar al ancho del rectángulo
                    lines.forEach(line => {
                        if (yPositionReferencias <= 297) {
                            doc.text(line, 10, yPositionReferencias);
                            yPositionReferencias += 6;
                        }
                    });
                });

                // Actualizar yPositionC al final de la sección de referencias
                yPositionC = Math.max(yPositionC, yPositionReferencias + 10);
            }



            let yPositionV = 50;
            const allExperiencias = dataCurriculum.dataset.filter(item =>
                item['id_curriculum'] === rowCurriculum['id_curriculum'] &&
                item['nombre_cargo'] &&
                item['nombre_empresa'] &&
                item['fecha_inicio'] &&
                item['descripcion_puesto']
            ).map(item => {
                // Función para formatear la fecha en 'yyyy, mm, dd' usando split
                const formatDate = (dateString) => {
                    const [year, month] = dateString.split('-');
                    return `${year}, ${month}`;
                };
            
                return {
                    title: `${item['nombre_cargo']}`,
                    company: `${item['nombre_empresa']} | ${formatDate(item['fecha_inicio'])} - ${item['fecha_fin'] ? formatDate(item['fecha_fin']) : 'Trabajo actual'}`,
                    details: `${item['descripcion_puesto']}`
                };
            });
            
            

            if (allExperiencias.length > 0 && allExperiencias.some(exp => exp.title && exp.company && exp.details)) {

                doc.setFont('Times', 'bold');
                doc.setFontSize(12);
                doc.setTextColor(...secondaryColor);
                doc.text('EXPERIENCIA PROFESIONAL', 70, yPositionV);
                doc.line(70, yPositionV + 2, 200, yPositionV + 2);

                doc.setFont('Times', 'normal');
                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0);

                const experienciasSet = new Set();
                let expY = yPositionV + 8;

                allExperiencias.forEach(exp => {
                    const experienciaString = `${exp.title} ${exp.company} ${exp.details}`;
                    if (!experienciasSet.has(experienciaString)) {
                        doc.setFont('Times', 'normal');
                        doc.text(exp.title, 70, expY);
                        doc.text(exp.company, 70, expY + 6);
                        expY += 12;

                        const detalles = exp.details.split('\n');
                        detalles.forEach(detail => {
                            doc.text(`- ${detail}`, 70, expY, {maxWidth :140});
                            expY += 6;
                        });

                        expY += 6; // Espacio adicional entre experiencias
                        experienciasSet.add(experienciaString);

                    }
                });
                yPositionV = Math.max(yPositionV, expY + 10);
            }


            // Filtrar y mapear las formaciones únicas
            const allFormaciones = dataCurriculum.dataset.filter(item =>
                item['id_curriculum'] === rowCurriculum['id_curriculum'] &&
                item['nombre_grado'] &&
                item['titulo_estudio']
            ).map(item => `. ${item['nombre_grado']}, ${item['titulo_estudio']}, ${item['nombre_institucion'] ? item['nombre_institucion'] : ''} ${item['nombre_institucion_estudio'] ? item['nombre_institucion_estudio'] : ''} ${item['fecha_finalizacion_estudio'] ? item['fecha_finalizacion_estudio'] : 'Cursando'}`);


            // Verificar si hay formaciones para mostrar
            if (allFormaciones.length > 0 && allFormaciones.some(formacion => formacion.trim() !== '.')) {
                doc.setFont('Times', 'bold');
                doc.setFontSize(12);
                doc.setTextColor(...secondaryColor);
                doc.text('FORMACIÓN', 70, yPositionV);
                doc.line(70, yPositionV + 2, 200, yPositionV + 2);

                doc.setFont('Times', 'normal');
                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0);

                const formacionesSet = new Set();
                let formY = yPositionV + 8; // Posición inicial vertical para los detalles de formación

                allFormaciones.forEach(formacion => {
                    if (!formacionesSet.has(formacion)) {
                        const lines = doc.splitTextToSize(formacion, 120); // Ajusta el ancho si es necesario
                        lines.forEach(line => {
                            if (formY <= 297) {
                                doc.text(line, 70, formY);
                                formY += 6;
                            }
                        });
                        formacionesSet.add(formacion); // Agregar formación al Set para evitar duplicados
                    }
                });

                // Actualizar yPositionV al final de la sección de formación
                yPositionV = Math.max(yPositionV, formY + 10);
            }




            // Filtrar y mapear los certificados únicos asociados al currículum actual
            const allCertificados = dataCurriculum.dataset.filter(item =>
                item['id_curriculum'] === rowCurriculum['id_curriculum'] &&
                item['titulo_certificado'] &&
                item['institucion_certificado'] &&
                item['fecha_finalizacion_certificado']
            ).map(item => `${item['titulo_certificado']}, ${item['institucion_certificado']} ${item['fecha_finalizacion_certificado']}`);

            // Verificar si hay certificados para mostrar
            if (allCertificados.length > 0) {
                doc.setFont('Times', 'bold');
                doc.setFontSize(12);
                doc.setTextColor(...secondaryColor);
                doc.text('CERTIFICADOS', 70, yPositionV);
                doc.line(70, yPositionV + 2, 200, yPositionV + 2);

                doc.setFont('Times', 'normal');
                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0);

                const certificadosSet = new Set();
                let certY = yPositionV + 8; // Posición inicial vertical para los detalles de certificados

                allCertificados.forEach(certificado => {
                    if (!certificadosSet.has(certificado)) {
                        const lines = doc.splitTextToSize(certificado, 120); // Ajusta el ancho si es necesario
                        lines.forEach(line => {
                            if (certY <= 297) {
                                doc.text(line, 70, certY);
                                certY += 6;
                            }
                        });
                        certificadosSet.add(certificado); // Agregar certificado al Set para evitar duplicados
                    }
                });

                // Actualizar yPositionV al final de la sección de certificados
                yPositionV = Math.max(yPositionV, certY + 10);
            }

            

            const pdfOutput = doc.output('dataurlnewwindow'); // Genera un Blob en lugar de una URL

            // Crear una URL del Blob
            const blobURL = URL.createObjectURL(pdfOutput);

            // Abrir el PDF en una nueva pestaña o ventana
            if (!window.pdfWindow || window.pdfWindow.closed) {
                window.pdfWindow = window.open(blobURL, '_blank');
            } else {
                window.pdfWindow.location.href = blobURL; // Actualiza la URL existente
            }

            // Limpiar la URL del Blob después de abrir la nueva pestaña
            URL.revokeObjectURL(blobURL);

            if (yPositionC > 260) {
                doc.addPage(); // Agregar una nueva página
                yPositionC = 10; // Reiniciar la posición vertical para el contenido
            }

        });
    } else {
        doc.text('No hay información para mostrar', 10, 10);
    }
};




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

            $("#institucion").val('').trigger('change');

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

        await sweetAlert(3, "Asegúrese de seleccionar un rubro", false);

        SELECT_RUBROS.focus();
    } else if (SELECT_AREAS.value == "default") {

        await sweetAlert(3, "Asegúrese de seleccionar un área");

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

        await sweetAlert(3, "Asegúrese de seleccionar un idioma", false);

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

        await sweetAlert(3, 'Asegúrese de seleccionar una habilidad');

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

    if (IMAGEN.value == "" && !editarCv) {

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

        let accion;

        editarCv ? accion = 'actualizarCurriculum' : accion = 'agregarCurriculum';

        IMAGEN.value != "" ? FORM.append("booleanImagen", 0) : FORM.append("booleanImagen", 1);

        const DATA = await fetchData(API_CURRICULUM, accion, FORM);

        if (DATA.status && editarCv) {

            const DATA_APARTADOS = await fetchData(API_CURRICULUM, 'obtenerApartados');

            const FORM = new FormData();

            FORM.append('idCurriculum', DATA_APARTADOS.dataset[5]);

            await fetchData(API_CURRICULUM, 'eliminarApartados', FORM);

            await agregarEstudios(FORM);

            DATA_APARTADOS.dataset[0] == false ? "" : await agregarCertificados(FORM);

            DATA_APARTADOS.dataset[1] == false ? "" : await agregarExperiencias(FORM);

            DATA_APARTADOS.dataset[4] == false ? "" : await agregarReferencias(FORM);

            DATA_APARTADOS.dataset[2] == false ? "" : await agregarIdiomas(FORM);

            DATA_APARTADOS.dataset[3] == false ? "" : await agregarHabilidades(FORM);

            errorCurriculum ? async () => {
                await sweetAlert(1, 'Currículum actualizado correctamente');
                await sweetAlert(3, 'Es posible que los apartados no se hayan actualizado correctamente, se recomienda verificar el currículum', false, 'curriculum.html');
            } : sweetAlert(1, 'Currículum actualizado correctamente', false, 'curriculum.html');
        }
        else if (DATA.status) {

            const DATA_APARTADOS = await fetchData(API_CURRICULUM, 'obtenerApartados');

            const FORM = new FormData();

            FORM.append('idCurriculum', DATA_APARTADOS.dataset[5]);

            await agregarEstudios(FORM);

            DATA_APARTADOS.dataset[0] == false ? "" : await agregarCertificados(FORM);

            DATA_APARTADOS.dataset[1] == false ? "" : await agregarExperiencias(FORM);

            DATA_APARTADOS.dataset[4] == false ? "" : await agregarReferencias(FORM);

            DATA_APARTADOS.dataset[2] == false ? "" : await agregarIdiomas(FORM);

            DATA_APARTADOS.dataset[3] == false ? "" : await agregarHabilidades(FORM);

            errorCurriculum ? async () => {
                await sweetAlert(1, 'Currículum agregado correctamente');
                await sweetAlert(3, 'Es posible que los apartados no se hayan agregado correctamente, se recomienda verificar el currículum', false, 'curriculum.html');
            } : sweetAlert(1, 'Currículum agregado correctamente', true, 'curriculum.html');
        } else if (DATA.error == "Debe agregar por lo menos 1 estudio a su currículum") {

            sweetAlert(3, DATA.error, false);

            var stepperCv = new Stepper(document.querySelector('#stepperCv'), {
                linear: false,
                animation: true
            });

            stepperCv.to(1);
            
            // Se restablece el scroll de la pantalla.
            window.scrollTo(0, 0);
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


const agregarEstudios = async (FORM) => {

    const DATA = await fetchData(API_CURRICULUM, 'agregarEstudios', FORM);

    if (DATA.status) {

    } else {

        errorCurriculum = true;
    }
}

const agregarCertificados = async (FORM) => {

    const DATA = await fetchData(API_CURRICULUM, 'agregarCertificados', FORM);

    if (DATA.status) {

    } else {

        errorCurriculum = true;
    }
}


const agregarExperiencias = async (FORM) => {

    const DATA = await fetchData(API_CURRICULUM, 'agregarExperiencias', FORM);

    if (DATA.status) {

    } else {

        errorCurriculum = true;
    }
}


const agregarReferencias = async (FORM) => {

    const DATA = await fetchData(API_CURRICULUM, 'agregarReferencias', FORM);

    if (DATA.status) {

    } else {

        errorCurriculum = true;
    }
}


const agregarIdiomas = async (FORM) => {

    const DATA = await fetchData(API_CURRICULUM, 'agregarIdiomas', FORM);

    if (DATA.status) {

    } else {

        errorCurriculum = true;
    }
}


const agregarHabilidades = async (FORM) => {

    const DATA = await fetchData(API_CURRICULUM, 'agregarHabilidades', FORM);

    if (DATA.status) {

    } else {

        errorCurriculum = true;
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

// Evento que se ejecuta al cambiar la opción seleccionada.
$('#institucion').on('change', function (e) {
    // Se verifica si el array está vacío.
    if($("#institucion").select2('data').length == 0){
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

// Evento que se ejecuta al hacer click en el botón editar currículum.
BOTON_EDITAR.addEventListener('click', async () => {
    // Se realiza la petición a la API para limpiar los apartados del currículum de la variable de sesión.
    await fetchData(API_CURRICULUM, 'limpiarApartados');
    // Se realiza una petición a la API para obtener la información general del currículum.
    const DATA = await fetchData(API_CURRICULUM, 'getCurriculum');
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {
        // Se muestra el contenedor con el botón para regresar.
        CONTENEDOR_BOTON.classList.remove('d-none');
        // Se oculta el mensaje.
        CONTENEDOR_MENSAJE.classList.add('d-none');
        // Se cambia el valor de la variable global (Se utiliza en el evento submit del FORM_CURRICULUM);
        editarCv = true;
        // Se inicializa la constante dónde se almacenará el idCurriculum.
        const FORM = new FormData();
        // Se almacena el idCurriculum en la constante.
        FORM.append('idCurriculum', DATA.dataset.id_curriculum);
        // Se realiza una petición a la API para obtener los estudios agregados en el currículum.
        const DATA_ESTUDIOS = await fetchData(API_CURRICULUM, 'getEstudios', FORM);
        // Se realiza una petición a la API para obtener los certificados agregados en el currículum.
        const DATA_CERTIFICADOS = await fetchData(API_CURRICULUM, 'getCertificados', FORM);
        // Se realiza una petición a la API para obtener las experiencias agregadas en el currículum.
        const DATA_EXPERIENCIAS = await fetchData(API_CURRICULUM, 'getExperiencias', FORM);
        // Se realiza una petición a la API para obtener las referencias agregadas en el currículum.
        const DATA_REFERENCIAS = await fetchData(API_CURRICULUM, 'getReferencias', FORM);
        // Se realiza una petición a la API para obtener los idiomas agregados en el currículum.
        const DATA_IDIOMAS = await fetchData(API_CURRICULUM, 'getIdiomas', FORM);
        // Se realiza una petición a la API para obtener las habilidades agregadas en el currículum.
        const DATA_HABILIDADES = await fetchData(API_CURRICULUM, 'getHabilidades', FORM);
        // Se ejecuta la función que agrega los estudios dentro de la variable de sesión para luego mostrarlos al usuario.
        await almacenarEstudios(DATA_ESTUDIOS.dataset);
        // Se ejecuta la función que agrega los certificados dentro de la variable de sesión para luego mostrarlos al usuario.
        await almacenarCertificados(DATA_CERTIFICADOS.dataset);
        // Se ejecuta la función que agrega las experiencias dentro de la variable de sesión para luego mostrarlos al usuario.
        await almacenarExperiencias(DATA_EXPERIENCIAS.dataset);
        // Se ejecuta la función que agrega las referencias dentro de la variable de sesión para luego mostrarlos al usuario.
        await almacenarReferencias(DATA_REFERENCIAS.dataset);
        // Se ejecuta la función que agrega los idiomas dentro de la variable de sesión para luego mostrarlos al usuario.
        await almacenarIdiomas(DATA_IDIOMAS.dataset);
        // Se ejecuta la función que agrega las habilidades dentro de la variable de sesión para luego mostrarlos al usuario.
        await almacenarHabilidades(DATA_HABILIDADES.dataset);
        // Se carga el número de teléfono en el campo.
        TELEFONO_MOVIL.value = DATA.dataset.telefono_movil;
        // Se carga el número de teléfono en el campo.
        TELEFONO_FIJO.value = DATA.dataset.telefono_fijo;
        // Se carga el correo del currículum en el campo.
        CORREO_ASPIRANTE.value = DATA.dataset.correo_curriculum;
        // Se define la ruta de la imagen almacenada en la API.
        IMAGEN_ASPIRANTE.src = "../../api/images/aspirantes/" + DATA.dataset.imagen_aspirante;
        // Se desactiva el atributo required del input imgAspirante.
        ARCHIVO_IMAGEN.required = false;
        // Se quita el color naranja del botón.
        BOTON_CURRICULUM.classList.remove('bg-orange');
        // Se configura el texto del botón.
        TEXTO_BOTON.textContent = 'Editar currículum';
        // Se prepara el stepper para su funcionamiento general.
        prepararStepper();
        // Se oculta el contenedor con las opciones.
        CONTENEDOR_OPCIONES_CV.classList.add('d-none');
        // Se muestra el contenedor con el stepper.
        CONTENEDOR_STEPPER.classList.remove('d-none');
        // Se oculta el ícono de agregar.
        ICONO_AGREGAR.classList.add('d-none');
        // Se muestra el ícono de edición.
        ICONO_EDITAR.classList.remove('d-none');
        // Si la respuesta no es satisfactoria se ejecuta el código.
        if (!DATA.status) {
            // Se muestra la advertencia.
            sweetAlert(3, 'Es posible que algunos apartados no contengan la información exacta del currículum', true);
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

            FORM.append('institucion', 0);
            FORM.append('booleanoInstitucion', 1);
            FORM.append('otraInstitucion', row.nombre_institucion);
        } else {

            FORM.append('institucion', row.id_institucion);
            FORM.append('booleanoInstitucion', 0);
            FORM.append('otraInstitucion', '');
        }

        FORM.append('gradoAcademico', row.id_grado);

        FORM.append('titulo', row.titulo_estudio);

        FORM.append('identificador', crearId(10));

        const DATA = await fetchData(API_CURRICULUM, 'almacenarEstudio', FORM);

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

        if (!DATA.status) {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const almacenarExperiencias = async (arrayExperiencias) => {

    for (const row of arrayExperiencias) {

        const FORM = new FormData();

        if (row.fecha_fin == null) {

            FORM.append('booleanFecha', 1);
            FORM.append('mesFinal', "0");
            FORM.append('yearFinal', "0000");
        } else {

            let fecha_fin = row.fecha_fin.split("-");

            FORM.append('mesFinal', parseInt(fecha_fin[1]));
            FORM.append('yearFinal', parseInt(fecha_fin[0]));
            FORM.append('booleanFecha', 0);
        }

        let fecha_inicio = row.fecha_inicio.split("-");

        FORM.append("mesInicio", parseInt(fecha_inicio[1]));
        FORM.append("yearInicio", parseInt(fecha_inicio[0]));
        FORM.append('empresa', row.nombre_empresa);
        FORM.append('cargo', row.nombre_cargo);
        FORM.append('rubro', row.id_rubro);
        FORM.append('area', row.id_area);
        FORM.append('descripcion', row.descripcion_puesto);

        FORM.append('identificador', crearId(10));

        const DATA = await fetchData(API_CURRICULUM, 'almacenarExperiencia', FORM);

        if (!DATA.status) {

            sweetAlert(2, DATA.error, false);
        }
    }
}


const almacenarReferencias = async (arrayReferencias) => {

    for (const row of arrayReferencias) {

        const FORM = new FormData();

        FORM.append('nombre', row.nombre_referencia);
        FORM.append('apellido', row.apellido_referencia);
        FORM.append('puesto', row.puesto_trabajo);
        FORM.append('telefonoReferencia', row.telefono_referencia);

        FORM.append('identificador', crearId(10));

        const DATA = await fetchData(API_CURRICULUM, 'almacenarReferencia', FORM);

        if (!DATA.status) {

            sweetAlert(2, DATA.error, false);
        }
    }
}

const almacenarIdiomas = async (arrayIdiomas) => {

    for (const row of arrayIdiomas) {

        const FORM = new FormData();

        FORM.append('idioma', row.id_idioma);
        FORM.append('nivelIdioma', row.nivel_idioma);

        FORM.append('identificador', crearId(10));

        const DATA = await fetchData(API_CURRICULUM, 'almacenarIdioma', FORM);

        if (!DATA.status) {

            sweetAlert(2, DATA.error, false);
        }
    }
}

const almacenarHabilidades = async (arrayHabilidades) => {

    for (const row of arrayHabilidades) {

        const FORM = new FormData();

        FORM.append('nombreHabilidad', row.id_habilidad);
        FORM.append('nivelHabilidad', row.nivel_habilidad);

        FORM.append('identificador', crearId(10));

        const DATA = await fetchData(API_CURRICULUM, 'almacenarHabilidad', FORM);

        if (!DATA.status) {

            sweetAlert(2, DATA.error, false);
        }
    }
}

BOTON_REGRESAR.addEventListener('click', async () => {

    const RESPONSE = await confirmAction('¿Está seguro que desea regresar?\nSe perderán los cambios realizados');
    // Se verifica la opción seleccionada (true si selecciona sí).
    if (RESPONSE) {
        // Se oculta el contenedor con las opciones.
        CONTENEDOR_OPCIONES_CV.classList.remove('d-none');
        // Se muestra el contenedor con el stepper.
        CONTENEDOR_STEPPER.classList.add('d-none');
    }
});