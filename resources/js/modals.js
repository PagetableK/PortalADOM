document.addEventListener('DOMContentLoaded', () => {
    
    const addModalTemplate = `
        <div id="addModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('addModal')">&times;</span>
                <h2>Agregar Aspirante</h2>
                <form id="addForm">
                    <label for="addNombre">Nombre:</label>
                    <input type="text" id="addNombre" name="nombre" placeholder="Your Name" required>
                    <label for="addApellido">Apellido:</label>
                    <input type="text" id="addApellido" name="apellido" placeholder="Your Surname" required>
                    <label for="addCorreo">Correo:</label>
                    <input type="email" id="addCorreo" name="correo" placeholder="Your Email" required>
                    <label for="addEstado">Estado:</label>
                    <select id="addEstado" name="estado">
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                    <button type="submit">Agregar</button>
                </form>
            </div>
        </div>`;
    
    const editModalTemplate = `
        <div id="editModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('editModal')">&times;</span>
                <h2>Editar Aspirante</h2>
                <form id="editForm">
                    <input type="hidden" id="editId" name="id">
                    <label for="editNombre">Nombre:</label>
                    <input type="text" id="editNombre" name="nombre" placeholder="Your Name" required>
                    <label for="editApellido">Apellido:</label>
                    <input type="text" id="editApellido" name="apellido" placeholder="Your Surname" required>
                    <label for="editCorreo">Correo:</label>
                    <input type="email" id="editCorreo" name="correo" placeholder="Your Email" required>
                    <label for="editEstado">Estado:</label>
                    <select id="editEstado" name="estado">
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                    <button type="submit">Guardar cambios</button>
                </form>
            </div>
        </div>`;

    // Append modals to the body
    document.body.insertAdjacentHTML('beforeend', addModalTemplate);
    document.body.insertAdjacentHTML('beforeend', editModalTemplate);

    const addForm = document.getElementById('addForm');
    const editForm = document.getElementById('editForm');
    let aspirantes = [];

    // Open modal
    window.openModal = (modalId) => {
        document.getElementById(modalId).style.display = "flex";
    }

    // Close modal
    window.closeModal = (modalId) => {
        document.getElementById(modalId).style.display = "none";
    }

    
});
