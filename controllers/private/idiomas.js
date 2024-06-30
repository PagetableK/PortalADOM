document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para validar sesiones activas.
    cargarPlantilla();
});


// Función para cargar el modal de agregar
const cargarModalAgregar = () => {
    // Obtener el contenedor del modal
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
        <div class="modal fade" id="agregarModal" tabindex="-1" aria-labelledby="agregarModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="agregarModalLabel">Agregar grado académico</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Aquí va el contenido del formulario o lo que desees mostrar en el modal -->
                        <form id="formularioAgregar">
                            <div class="mb-3">
                                <label for="nombreIdioma" class="form-label">Idioma</label>
                                <input type="text" class="form-control" id="nombreIdioma" required>
                            </div>
                            <!-- Otros campos del formulario -->
                        <div class="mb-3">
                                <label for="Usos" class="form-label">Usos</label>
                                <input type="text" class="form-control" id="usos" required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Agregar el modal al body del documento
    document.body.appendChild(modalContainer);

    // Inicializar el modal usando Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('agregarModal'));

    // Manejar el evento click del botón Agregar para mostrar el modal
    const botonAgregar = document.getElementById('botonAgregar');
    botonAgregar.addEventListener('click', () => {
        modal.show();
    });
};




// Función para cargar el modal de editar
const cargarModalEditar = () => {
    // Obtener el contenedor del modal
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
        <div class="modal fade" id="editarModal" tabindex="-1" aria-labelledby="editarModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editarModalLabel">Editar idioma</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                       <!-- Aquí va el contenido del formulario o lo que desees mostrar en el modal -->
                        <form id="formularioEditar">
                            <div class="mb-3">
                                <label for="nombreIdioma" class="form-label">Idioma</label>
                                <input type="text" class="form-control" id="nombreIdioma" required>
                            </div>
                            <!-- Otros campos del formulario -->
                        <div class="mb-3">
                                <label for="Usos" class="form-label">Usos</label>
                                <input type="text" class="form-control" id="usos" required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary">Guardar cambios</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Agregar el modal al body del documento
    document.body.appendChild(modalContainer);

    // Inicializar el modal usando Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('editarModal'));

    // Manejar el evento click del botón Editar para mostrar el modal
    const botonEditar = document.getElementById('botonEditar');
    botonEditar.addEventListener('click', () => {
        modal.show();
    });
};

// Llamar a las funciones para cargar los modales cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    cargarModalAgregar();
    cargarModalEditar();
});