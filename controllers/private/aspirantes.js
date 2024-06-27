document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para validar sesiones activas.
    cargarPlantilla();
});

// Función para cargar el modal de agregar
const cargarModalAgregar = () => {
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
                        <form id="formularioAgregar">
                            <div class="row mb-3">
                                <div class="col-6">
                                    <label for="nombreAspirante" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="nombreAspirante" required>
                                </div>
                                <div class="col-6">
                                    <label for="apellidoAspirante" class="form-label">Apellido</label>
                                    <input type="text" class="form-control" id="apellidoAspirante" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-6">
                                    <label for="correoAspirante" class="form-label">Correo</label>
                                    <input type="email" class="form-control" id="correoAspirante" required>
                                </div>
                                <div class="col-6">
                                    <label for="estadoAspirante" class="form-label">Estado</label>
                                    <input type="text" class="form-control" id="estadoAspirante" required>
                                </div>
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

    document.body.appendChild(modalContainer);

    const modal = new bootstrap.Modal(document.getElementById('agregarModal'));
    const botonAgregar = document.getElementById('botonAgregar');
    botonAgregar.addEventListener('click', () => {
        modal.show();
    });
};

// Función para cargar el modal de editar
const cargarModalEditar = () => {
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
        <div class="modal fade" id="editarModal" tabindex="-1" aria-labelledby="editarModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editarModalLabel">Editar grado académico</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formularioEditar">
                            <div class="row mb-3">
                                <div class="col-6">
                                    <label for="nombreAspiranteEditar" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="nombreAspiranteEditar" required>
                                </div>
                                <div class="col-6">
                                    <label for="apellidoAspiranteEditar" class="form-label">Apellido</label>
                                    <input type="text" class="form-control" id="apellidoAspiranteEditar" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-6">
                                    <label for="correoAspiranteEditar" class="form-label">Correo</label>
                                    <input type="email" class="form-control" id="correoAspiranteEditar" required>
                                </div>
                                <div class="col-6">
                                    <label for="estadoAspiranteEditar" class="form-label">Estado</label>
                                    <input type="text" class="form-control" id="estadoAspiranteEditar" required>
                                </div>
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

    document.body.appendChild(modalContainer);

    const modal = new bootstrap.Modal(document.getElementById('editarModal'));
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