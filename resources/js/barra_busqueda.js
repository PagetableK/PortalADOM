document.addEventListener('DOMContentLoaded', function () {
    const searchBarTemplate = `
        <!-- Este div crea una fila dentro de Bootstrap -->
    <div class="row mb-3 row-gap-3 pe-2 ps-2 d-flex align-items-center">
        <div class="col-12">
            <h4 class="text-start fw-semibold">Estudiantes</h4>
        </div>
        <div class="col-12 col-lg-9">
            <div class="row d-flex contenedor-form">
                <!-- Este select crea un menú desplegable para filtrar estudiantes -->
                <select class="col-12 col-sm-2 form-select-sm elemento-form">
                    <option selected>Todos</option>
                    <option>A-z</option>
                </select>
                <!-- Este div contiene la barra de búsqueda -->
                <div class="col d-flex container-fluid" id="container_busqueda">
                    <div class="d-flex">
                        <!-- Este span muestra un ícono de búsqueda -->
                        <span class="input-group-text elemento-form" id="btnBuscarEstudiante"><i
                                class="bi bi-search"></i></span>
                    </div>
                    <!-- Este input crea la barra de búsqueda -->
                    <input type="search" class="form-control elemento-form" placeholder="Buscar..."
                        id="boton_buscar_estudiante">
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-3 d-flex justify-content-center">
            <!-- Este botón redirige a la página de agregar estudiante cuando se hace clic -->
            <div type="button" onclick="location.href='/vistas/paginas/estudiantes/agregar_estudiante.html'"
                class="btn btn-primary h-100 w-100 d-flex align-items-center justify-content-center gap-2 contenedor-form">
                <i class="bi bi-mortarboard-fill"></i></i>Agregar 
            </div>
        </div>
    </div>
    `;

    document.querySelector('.search-bar').innerHTML = searchBarTemplate;
});
    