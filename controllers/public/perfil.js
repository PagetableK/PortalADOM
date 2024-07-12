const PERFIL_API = 'services/public/aspirantes_service.php';
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_PERFIL = document.getElementById('idPerfil'),
    NOMBRE_PERFIL = document.getElementById('nombrePerfil'),
    APELLIDO_PERFIL = document.getElementById('apellidoPerfil'),
    CORREO_PERFIL = document.getElementById('correoPerfil'),
    GENERO_PERFIL = document.getElementById('generoPerfil'),
    FECHA_PERFIL = document.getElementById('fechanacimientoPerfil');

document.addEventListener('DOMContentLoaded', async () => {
    openProfile();
    // Se cambia el color del apartado donde se encuentra el usuario y se restablecen los otros colores.
    cambiarColor('Perfil');
    // Llamada a la función para validar sesiones activas.
    cargarPlantilla();  
});

async function openProfile() {
    // Petición para solicitar los datos del usuario seleccionado.
    const DATA = await fetchData(PERFIL_API, 'readProfile');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se colocan los datos en la página web de acuerdo con el usuario seleccionado previamente.
        document.getElementById('nombres').value = DATA.dataset.NOMBRE;
        document.getElementById('apellidos').value = DATA.dataset.APELLIDO;
        document.getElementById('fechaNacimiento').value = DATA.dataset.FECHA;
        document.getElementById('correo').value = DATA.dataset.CORREO;
    } else {
    }
}

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PERFIL_API, 'editProfile', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        openProfile();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

const lista_datos = [
    {
        genero: "Hombre",
        id: "Hombre",
    },
    {
        genero: 'Mujer',
        id: 'Mujer',
    }
];

// Función para poblar un combobox (select) con opciones quemadas
const fillSelected = (data, action, selectId, selectedValue = null) => {
    const selectElement = document.getElementById(selectId);

    // Limpiar opciones previas del combobox
    selectElement.innerHTML = '';

    // Crear opción por defecto
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Selecciona a el género';
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


const openEdit = async (id) => {


    try {
        // Se define un objeto con los datos del registro seleccionado.
        // Petición para obtener los datos del registro solicitado.
        const DATA = await fetchData(PERFIL_API, 'readOne');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra la caja de diálogo con su título.
            SAVE_MODAL.show();
            MODAL_TITLE.textContent = 'Editar perfil';
            // Se restauran los elementos del formulario.
            SAVE_FORM.reset();
            // Se inicializan los campos con los datos.
            const ROW = DATA.dataset;
            NOMBRE_PERFIL.value = ROW.NOMBRE;
            APELLIDO_PERFIL.value = ROW.APELLIDO;
            CORREO_PERFIL.value = ROW.CORREO;
            FECHA_PERFIL.value = ROW.FECHA;
            fillSelected(lista_datos, 'readAll', 'generoPerfil', ROW.GENERO);
        } else {
            sweetAlert(2, DATA.error, false);
        }
    } catch (Error) {
        console.log(Error);
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Editar perfil';
    }
}