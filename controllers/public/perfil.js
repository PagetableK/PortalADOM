// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_PERFIL = document.getElementById('idPerfil'),
    NOMBRE_PERFIL = document.getElementById('nombrePerfil'),
    APELLIDO_PERFIL = document.getElementById('apellidoPerfil'),
    CORREO_PERFIL = document.getElementById('correoPerfil'),
    FECHA_PERFIL = document.getElementById('fechanacimientoPerfil');

document.addEventListener('DOMContentLoaded', async () => {
    // Se cambia el color del apartado donde se encuentra el usuario y se restablecen los otros colores.
    cambiarColor('Perfil');
    // Llamada a la función para validar sesiones activas.
    cargarPlantilla();
});


const openEdit = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Editar perfil';
    // Se prepara el formulario.
    SAVE_FORM.reset();
}