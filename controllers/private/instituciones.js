// Constante para completar la ruta de la API.
const INSTITUCION_API = 'services/private/instituciones_service.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm'), BUSCADOR = document.getElementById('buscador');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tabla_instituciones');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_INSTITUCION = document.getElementById('idInstitucion'),
    NOMBRE_INSTITUCION = document.getElementById('nombreInstitucion'),
    BOTON_AGREGAR = document.getElementById('btnAgregar'),
    BOTON_ACTUALIZAR = document.getElementById('btnActualizar');

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
    if (BUSCADOR.value == "") {
        // Se muestra el mensaje.
        sweetAlert(3, 'Ingrese un valor en la búsqueda para filtrar las instituciones', false);
    } else{
        // Constante tipo objeto con los datos del formulario.
        const FORM = new FormData(SEARCH_FORM);
        // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
        fillTable(FORM);
    }
});

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_INSTITUCION.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(INSTITUCION_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else if (DATA.exception != null && (DATA.exception.includes("Integrity constraint") || DATA.exception.includes("Duplicate entry"))) {

        await sweetAlert(3, 'La institución ya ha sido agregada', false);

        SAVE_MODAL.hide();
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
    (form) ? action = 'searchRows' : action = 'cantidadInstituciones';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(INSTITUCION_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.nombre_institucion}</td>
                    <td>${row.veces_utilizadas}</td>
                    <td>
                        <button type="button" class="btn btn-outline-success" onclick="openUpdate(${row.id_institucion})">
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger" onclick="openDelete(${row.id_institucion})">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } else {
        // Se muestra el mensaje.
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
    MODAL_TITLE.textContent = 'Agregar institución';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    // Se muestra el botón de agregar y se oculta el de actualizar.
    BOTON_ACTUALIZAR.classList.add('d-none');
    BOTON_AGREGAR.classList.remove('d-none');
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idInstitucion', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(INSTITUCION_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar institución';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_INSTITUCION.value = ROW.id_institucion;
        NOMBRE_INSTITUCION.value = ROW.nombre_institucion;
        // Se muestra el botón de actualizar y se oculta el de agregar.
        BOTON_AGREGAR.classList.add('d-none');
        BOTON_ACTUALIZAR.classList.remove('d-none');
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
    const RESPONSE = await confirmAction('¿Desea eliminar la institución de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idInstitucion', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(INSTITUCION_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else if (DATA.exception != null && (DATA.exception.includes("Integrity constraint") || DATA.exception.includes("constraint fails"))) {
            sweetAlert(3, 'No se puede eliminar la institución porque está asociada a un currículum', false);
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}
