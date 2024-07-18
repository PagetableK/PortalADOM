
// Constante para completar la ruta de la API.
const CURRICULUM_API = 'services/private/curriculum_service.php';

// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tabla_aspirante');
// Constantes para establecer los elementos del componente Modal.
//const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_CURRICULUM = document.getElementById('idCurriculum'),
    NOMBRE_ASPIRANTE = document.getElementById('nombreAspirante');

const CURRICULUM_MODAL = new bootstrap.Modal('#curriculumModalViewer'),
    CM_IMAGEN = document.getElementById("curriculumModalImagen"),
    CM_NOMBRE = document.getElementById("curriculumModalNombre"),
    CM_EDAD = document.getElementById("curriculumModalEdad"),
    CM_GENERO = document.getElementById("curriculumModalGenero"),
    CM_TELEFONO_FIJO = document.getElementById("curriculumModalTelefonoFijo"),
    CM_TELEFONO_MOVIL = document.getElementById("curriculumModalTelefono"),
    CM_EMAIL = document.getElementById("curriculumModalEmail"),

    CM_TB_EXPERIENCIA = document.getElementById("curriculumModalExperienciaLaboral"),
    CM_TB_ESTUDIOS = document.getElementById("curriculumModalEstudios");

    CM_ELIMINAR = document.getElementById("cmEliminarBoton");
    

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla();
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_FORM.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica que el campo de búsqueda no esté vacío.
    if(SEARCH_FORM['search'].value.trim() != ""){
        // Constante tipo objeto con los datos del formulario.
        const FORM = new FormData(SEARCH_FORM);
        // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
        fillTable(FORM);
    } else{
        sweetAlert(3, 'Ingrese un valor para buscar', false);
    }
});

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (CURRICULUM_API.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(AREA_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(CURRICULUM_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {

            if(row.imagen_aspirante == null){
                row.imagen_aspirante = "default.webp"
            }

            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td><img class="rounded-circle" src="${SERVER_URL}images/aspirantes/${row.IMAGEN}" height="50"></td>
                    <td>${row.NOMBRE}</td>
                    <td>${row.estudios}</td>
                    <td>${row.experiencias}</td>
                    <td>${row.idiomas}</td>
                    <td>   
                        <button type="button" class="btn btn-outline-primary" onclick="openVerCurriculum(${row.id_curriculum})">
                            <i class="bi bi-info-circle"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger" onclick="openReport(${row.id_curriculum})">
                            <i class="bi bi-filetype-pdf"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } else {
        sweetAlert(3, DATA.error, true);
    }
}

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear area';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    fillSelect(RUBRO_API, 'readAll', 'idRubro');
}

const openVerCurriculum = async (id) => {

    const FORM = new FormData();
    FORM.append('idCurriculum', id);
    const DATA = await fetchData(CURRICULUM_API, 'readOneData', FORM);

    CM_ELIMINAR.classList.remove("d-none")
    CM_ELIMINAR.addEventListener('click', function() {
        openDelete(id);
        CURRICULUM_MODAL.hide();
    })

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        
        const ROW = DATA.dataset;
        CM_IMAGEN.src= SERVER_URL+"images/aspirantes/"+ROW.imagen_aspirante;
        if(ROW.imagen_aspirante == null){
            CM_IMAGEN.src= SERVER_URL+"images/aspirantes/default.webp";
        }
        CM_NOMBRE.textContent = ROW.nombre_aspirante +" "+ ROW.apellido_aspirante;
        CM_EDAD.textContent = ROW.Edad;
        CM_GENERO.textContent = ROW.genero_aspirante;
        CM_TELEFONO_MOVIL.textContent = ROW.telefono_movil;
        CM_TELEFONO_FIJO.textContent = ROW.telefono_fijo;
        document.getElementById("cmTelefonoFijoContainer").classList.remove("d-none")
        CM_EMAIL.textContent = ROW.correo_curriculum;


        const FORME = new FormData();
        FORME.append('idCurriculum', id);
        const DATAE = await fetchData(CURRICULUM_API, 'readOneDataExperiencias', FORME);

        if(DATAE.status){
            DATAE.dataset.forEach(row => {
                CM_TB_EXPERIENCIA.innerHTML += `
                <div> 
                <p><strong>${row.nombre_empresa} - ${row.nombre_cargo}</strong></p>
                <p>Rubro de la empresa: ${row.nombre_rubro}</p>
                <p>${row.fecha_inicio} hasta ${row.fecha_fin}</p>
                </div>`;
            })
        }

        const FORMS = new FormData();
        FORMS.append('idCurriculum', id);
        const DATAS = await fetchData(CURRICULUM_API, 'readOneDataEstudios', FORMS);

        if(DATAS.status){ 
            DATAS.dataset.forEach(row => {
                CM_TB_ESTUDIOS.innerHTML += `
                <div>
                <p><strong>${row.nombre_institucion}</strong></p>
                <p>${row.estado_egreso} - ${row.titulo_estudio}</p>
                <p>${row.fecha_finalizacion}</p>
                </div>`;
            })
        }

        CURRICULUM_MODAL.show(); 

    } else {
        sweetAlert(2, DATA.error, false);
    }


    
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idArea', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(AREA_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar área';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_AREA.value = ROW.id_area;
        NOMBRE_AREA.value = ROW.nombre_area;
        fillSelect(RUBRO_API, 'readAll', 'idRubro', ROW.id_rubro);

    } else {
        sweetAlert(2, DATA.error, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el curriculum de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idCurriculum', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(CURRICULUM_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const openReport = async (id) => {
    console.log("openReporta llamado");
    // Asegúrate de que la biblioteca jsPDF esté cargada
    const { jsPDF } = window.jspdf;

    // Crear un nuevo documento PDF
    const doc = new jsPDF('p', 'mm', 'a4');

    const FORM = new FormData();

    FORM.append('idCurriculum', id);

    // Fetch data from your API or data source
    const dataCurriculum = await fetchData(CURRICULUM_API, 'readCurriculum', FORM);

    if (dataCurriculum.status) {
        console.log(dataCurriculum.dataset + "asd");
        dataCurriculum.dataset.forEach(rowCurriculum => {
            // Definir colores
            const primaryColor = [225, 235, 247];  // Color primario (azul claro)
            const secondaryColor = [0, 52, 99];  // Color secundario (negro)

            // Dibujar fondo azul claro
            doc.setFillColor(...primaryColor);
            doc.rect(0, 0, 60, 297, 'F');

            // Añadir foto del perfil
            const imgData = `../../api/images/aspirantes/${rowCurriculum['imagen_aspirante']}`; // Reemplaza con los datos de la imagen en base64
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
                rowCurriculum['correo_curriculum'],
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
            if (idiomas.length > 0 && idiomas.some(idioma => idioma['NOMBRE'] && idioma['nivel_idioma'])) {
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
