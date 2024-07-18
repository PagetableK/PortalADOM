
// Constante para completar la ruta de la API.
const CURRICULUM_API = 'services/private/curriculum_service.php';

// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tabla_aspirante'),
    ROWS_FOUND = document.getElementById('filasEncontradas');
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
    ROWS_FOUND.textContent = '';
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
                    <td><img class="rounded-circle" src="${SERVER_URL}images/aspirantes/${row.imagen_aspirante}" height="50"></td>
                    <td>${row.nombre}</td>
                    <td>${row.estudios}</td>
                    <td>${row.experiencias}</td>
                    <td>${row.idiomas}</td>
                    <td>   
                        <button type="button" class="btn btn-outline-primary" onclick="openVerCurriculum(${row.id_curriculum})">
                            <i class="bi bi-info-circle"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger" onclick="openDelete(${row.id_curriculum})">
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
