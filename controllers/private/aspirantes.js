

document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para validar sesiones activas.
    cargarPlantilla();
});

// Función para cargar el modal de agregar
const cargarModalAgregar = () => {
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
        <div class="modal fade" id="agregarModal">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Agregar aspirante</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formularioAgregar">
                        <div class="modal-body">
                                <div class="row mb-3 row-gap-4">
                                    <div class="col-12 col-lg-6">
                                        <label for="nombreAspirante" class="form-label">Nombre</label>
                                        <input type="text" class="form-control" id="nombreAspirante" required>
                                    </div>
                                    <div class="col-12 col-lg-6">
                                        <label for="apellidoAspirante" class="form-label">Apellido</label>
                                        <input type="text" class="form-control" id="apellidoAspirante" required>
                                    </div>
                                    <div class="col-12 col-lg-6">
                                        <label for="correoAspirante" class="form-label">Correo</label>
                                        <input type="email" class="form-control" id="correoAspirante" required>
                                    </div>
                                    <div class="col-12 col-lg-6">
                                        <label for="estadoAspirante" class="form-label">Estado</label>
                                        <select class="form-select" id="estadoAspirante">
                                            <option value="1">
                                                Activo
                                            </option>
                                            <option value="2">
                                                Inactivo
                                            </option>
                                        </select>
                                    </div>
                                </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-center">
                            <button type="submit" class="btn btn-primary">Guardar</button>
                        </div>
                    </form>
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
        <div class="modal fade" id="editarModal">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar aspirante</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formularioEditar">
                        <div class="modal-body">
                                <div class="row mb-3 row-gap-4">
                                    <div class="col-12 col-lg-6">
                                        <label for="nombreAspirante" class="form-label">Nombre</label>
                                        <input type="text" class="form-control" id="nombreAspirante" required>
                                    </div>
                                    <div class="col-12 col-lg-6">
                                        <label for="apellidoAspirante" class="form-label">Apellido</label>
                                        <input type="text" class="form-control" id="apellidoAspirante" required>
                                    </div>
                                    <div class="col-12 col-lg-6">
                                        <label for="correoAspirante" class="form-label">Correo</label>
                                        <input type="email" class="form-control" id="correoAspirante" required>
                                    </div>
                                    <div class="col-12 col-lg-6">
                                        <label for="estadoAspirante" class="form-label">Estado</label>
                                        <select class="form-select" id="estadoAspirante">
                                            <option value="1">
                                                Activo
                                            </option>
                                            <option value="2">
                                                Inactivo
                                            </option>
                                        </select>
                                    </div>
                                </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-center">
                            <button type="submit" class="btn btn-primary">Guardar</button>
                        </div>
                    </form>
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