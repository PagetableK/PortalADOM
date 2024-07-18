// Constante para completar la ruta de la API.
const ASPIRANTE_API = 'services/private/aspirante_service.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tabla_aspirante'),
    ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_ASPIRANTE = document.getElementById('idAspirante'),
    NOMBRE_ASPIRANTE = document.getElementById('nombreAspirante'),
    APELLIDO_ASPIRANTE = document.getElementById('apellidoAspirante'),
    CORREO_ASPIRANTE = document.getElementById('correoAspirante'),
    FECHA_ASPIRANTE = document.getElementById('fechanacimientoAspirante'),
    GENERO_ASPIRANTE = document.getElementById('generoAspirante'),
    CLAVE_ASPIRANTE = document.getElementById('claveAspirante'),
    CONFIRMAR_CLAVE_ASPIRANTE = document.getElementById('repetirClaveAspirante'),
    BOTON_AGREGAR = document.getElementById('btnAgregar'),
    BOTON_ACTUALIZAR = document.getElementById('btnActualizar');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla();
    // Se crea la variable que almacenará los valores mínimos y máximos para el input "Fecha de nacimiento".
    var fechaMaxima = new Date();
    // Se calcula la diferencia de la fecha actual - 18 años (La persona debe ser mayor de edad para registrarse).
    fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 18);
    fechaMaxima.setHours(fechaMaxima.getHours() - 24);
    // Se configura la fecha máxima del date picker.
    FECHA_ASPIRANTE.max = fechaMaxima.toISOString().substring(0, 10);
    // Se calcula la diferencia de la fecha actual - 18 años - 42 (60 años es la edad máxima para registrarse).
    fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 42);
    // Se configura la fecha mínima del date picker.
    FECHA_ASPIRANTE.min = fechaMaxima.toISOString().substring(0, 10);

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
    (ID_ASPIRANTE.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ASPIRANTE_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else if (DATA.exception != null && (DATA.exception.includes ("Integrity constraint") || DATA.exception.includes ("Duplicate entry"))) {
        sweetAlert(3, 'El correo del aspirante ya está siendo utilizado', false);
    } else if(DATA.error == "El correo ya está siendo utilizado por otro aspirante"){
        sweetAlert(3, DATA.error, false);
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
    const DATA = await fetchData(ASPIRANTE_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr class="${getRowBackgroundColor(row.ESTADO)}">
                    <td>${row.NOMBRE}</td>
                    <td>${row.APELLIDO}</td>
                    <td>${row.CORREO}</td>
                    <td>${row.FECHA}</td>
                    <td>${row.GENERO}</td>
                    <td class="${getRowColor(row.ESTADO)}">${row.ESTADO}</td>
                    <td>
                        <button type="button" class="btn btn-outline-primary" onclick="openState(${row.ID})">
                            <i class="bi bi-exclamation-octagon"></i>
                        </button>    
                        <button type="button" class="btn btn-outline-success" onclick="openUpdate(${row.ID})">
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger" onclick="openDelete(${row.ID})">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } else {
        sweetAlert(3, DATA.error, true);
    }
}

const lista_datos = [
    {
        genero: "Hombre",
        id: "Hombre",
    },
    {
        genero: "Mujer",
        id: "Mujer",
    }
];

// Función para poblar un combobox (select) con opciones quemadas
const Selected = (data, action, selectId, selectedValue = null) => {
    const selectElement = document.getElementById(selectId);

    // Limpiar opciones previas del combobox
    selectElement.innerHTML = '';

    // Crear opción por defecto
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione el género';
    selectElement.appendChild(defaultOption);

    // Llenar el combobox con los datos proporcionados
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id; // Suponiendo que hay una propiedad 'id' en los datos
        option.textContent = item.genero; // Cambia 'horario' al nombre de la propiedad que deseas mostrar en el combobox
        selectElement.appendChild(option);
    });

    // Seleccionar el valor especificado si se proporciona
    if (selectedValue !== null) {
        selectElement.value = selectedValue;
    }
};

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear aspirante';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    CLAVE_ASPIRANTE.disabled = false;
    CONFIRMAR_CLAVE_ASPIRANTE.disabled = false;
    Selected(lista_datos, 'readAll', 'generoAspirante');
    // Se muestra el botón de agregar y se oculta el de actualizar.
    BOTON_ACTUALIZAR.classList.add('d-none');
    BOTON_AGREGAR.classList.remove('d-none');
}

function getRowColor(estado) {
    switch (estado) {
        case 'Bloqueado':
            return 'text-danger';
        case 'Activo':
            return 'text-success';
        default:
            return '';
    }
}

function getRowBackgroundColor(estado) {
    switch (estado) {
        case 'Bloqueado':
            return 'border-danger';
        case 'Activo':
            return 'border-success';
        default:
            return '';
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
    FORM.append('idAspirante', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ASPIRANTE_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar aspirante';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        CLAVE_ASPIRANTE.disabled = true;
        CONFIRMAR_CLAVE_ASPIRANTE.disabled = true;
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_ASPIRANTE.value = ROW.ID;
        NOMBRE_ASPIRANTE.value = ROW.NOMBRE;
        APELLIDO_ASPIRANTE.value = ROW.APELLIDO;
        CORREO_ASPIRANTE.value = ROW.CORREO;
        FECHA_ASPIRANTE.value = ROW.FECHA;
        Selected(lista_datos, 'readAll', 'generoAspirante', ROW.GENERO);
        // Se muestra el botón de actualizar y se oculta el de agregar.
        BOTON_AGREGAR.classList.add('d-none');
        BOTON_ACTUALIZAR.classList.remove('d-none');
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

//funcion para cambiar estado
const openState = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea cambiar el estado del aspirante?');
    try {
        // Se verifica la respuesta del mensaje.
        if (RESPONSE) {
            // Se define una constante tipo objeto con los datos del registro seleccionado.
            const FORM = new FormData();
            FORM.append('idAspirante', id);
            // Petición para eliminar el registro seleccionado.
            const DATA = await fetchData(ASPIRANTE_API, 'changeState', FORM);
            console.log(DATA.status);
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
    catch (Error) {
        console.log(Error + ' Error al cargar el mensaje');
    }

}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el aspirante de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idAspirante', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(ASPIRANTE_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else if (DATA.exception != null && (DATA.exception.includes ("Integrity constraint") || DATA.exception.includes ("constraint fails"))) {
            sweetAlert(3, 'No se puede eliminar el aspirante porque está asociado a un currículum', false);
        }else {
            sweetAlert(2, DATA.error, false);
        }
    }
}