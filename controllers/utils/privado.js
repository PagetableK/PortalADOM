/*
    Controlador general que se utiliza en sitio privado.
*/

// Se declara la constante donde se almacena el resto de la url de la API. 
const USER_API = 'services/private/administradores_service.php';
// Declarar constante para asignar el contenido de la etiqueta main.
const MAIN = document.querySelector('main');

// La función cargarPlantilla se utiliza en todas las páginas del sitio privado,
// permite verificar si existe una sesión activa, en tal caso se muestran los componentes necesarios.
const cargarPlantilla = async () => {
    // Se realiza una petición para validar si existe una sesión activa.
    const DATA = await fetchData(USER_API, 'getUser');
    // Si existe una sesión activa se ejecuta el código.
    if (DATA.session) {
        // Si la respuesta es satisfactoria se ejecuta el código.
        if (DATA.status) {
            // Si el usuario tiene una sesión activa y se encuentra en la interfaz "Inicio de sesión" se redirige hacia la interfaz "Inicio".
            if (location.pathname.endsWith("index.html")) {
                location.href = "inicio.html";
            }
            // Se inserta el menú lateral.
            MAIN.insertAdjacentHTML('beforebegin', `
            <aside id="sidebar" class="pt-3">
                <!-- Encabezado del sidebar -->
                <div class="d-flex">
                    <!-- Botón para alternar el sidebar -->
                    <button class="toggle-btn" type="button">
                        <img src="../../resources/img/maletin_blanco.png" class="img-fluid" alt="maletinADOM">
                    </button>
                    <!-- Logo del sidebar -->
                    <div class="sidebar-logo">
                        <a href="#"></a>
                    </div>
                </div>

                <!-- Navegación del sidebar -->
                <ul class="sidebar-nav">
                    <!-- Elemento de navegación - Inicio -->
                    <li class="sidebar-item">
                        <a href="../../views/private/inicio.html" class="sidebar-link">
                            <i class="bi bi-house-door"></i>
                            <span>Inicio</span>
                        </a>
                    </li>

                    <!-- Elemento de navegación - Administrador -->
                    <li class="sidebar-item">
                        <a href="../../views/private/administradores.html" class="sidebar-link">
                            <i class="bi bi-person"></i>
                            <span>Administradores</span>
                        </a>
                    </li>

                    <!-- Elemento de navegación - Currículums -->
                    <li class="sidebar-item">
                        <a href="../../views/private/curriculums.html" class="sidebar-link">
                            <i class="bi bi-file-earmark-post"></i>
                            <span>Currículums</span>
                        </a>
                    </li>
                    <!-- Elemento de navegación de Formularios -->
                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                            data-bs-target="#formularios" aria-expanded="false">
                            <i class="bi bi-receipt"></i>
                            <span>Formularios</span>
                        </a>
                        <!-- Submenú de Formularios -->
                        <ul id="formularios" class="sidebar-dropdown collapse" data-bs-parent="#sidebar">
                            <li class="sidebar-item">
                                <a href="rubro_empresa.html" class="sidebar-link">Rubros de empresas</a>
                            </li>
                            <li class="sidebar-item">
                                <a href="areas_laborales.html" class="sidebar-link">Áreas laborales</a>
                            </li>
                            <li class="sidebar-item">
                                <a href="instituciones.html" class="sidebar-link">Instituciones</a>
                            </li>
                            <li class="sidebar-item">
                                <a href="grados_academicos.html" class="sidebar-link">Grados académicos</a>
                            </li>
                            <li class="sidebar-item">
                                <a href="idiomas.html" class="sidebar-link">Idiomas</a>
                            </li>
                            <li class="sidebar-item">
                                <a href="habilidades.html" class="sidebar-link">Habilidades</a>
                            </li>
                            <li class="sidebar-item">
                                <a href="aspirantes.html" class="sidebar-link">Aspirantes</a>
                            </li>
                        </ul>
                    </li>
                    
                    <!-- Botón para cerrar sesión -->
                    <li class="sidebar-item">
                        <a class="sidebar-link text-light bg-danger" onclick="logOut()">
                            <i class="bi bi-box-arrow-left"></i>
                            <span>Cerrar sesión</span>
                        </a>
                    </li>
                </ul>
            </aside>`
            );
            // Se inserta el header.
            MAIN.insertAdjacentHTML('afterbegin', `
            <header class="py-3">
                <div class="col d-flex flex-row align-items-center">
                    <button class="toggle-btn" type="button">
                        <i class="bi bi-text-left text-dark fs-1"></i>
                    </button>
                    <div class="ps-5">
                        <h1 class="text-center fw-bold" id="tituloPrincipal"></h1>
                    </div>
                </div>
            </header>`
            );

            // Función que despliega el menú lateral al hacer click en la imagen.
            // Se guarda el elemento con la clase especificada.
            const HAMBURGUER = document.querySelectorAll(".toggle-btn");
            // Se realiza una iteración para agregar el evento click en todos los elementos con la clase especificada.
            for (let i = 0; i < HAMBURGUER.length; i++) {
                // Se agrega el evento click que se ejecutará al hacer click en el elemento.
                HAMBURGUER[i].addEventListener("click", function () {
                    // Se cambia el estado de la barra lateral.
                    document.querySelector("#sidebar").classList.toggle("expand");
                });
            }
            const TITULO = document.getElementById('tituloPrincipal');

            // Se valida el nombre del archivo para determinar el título principal.
            if (location.pathname.endsWith('inicio.html')) {
                TITULO.textContent = "Inicio";
            }
            else if (location.pathname.endsWith('areas_laborales.html')) {
                TITULO.textContent = "Áreas laborales";
            }
            else if (location.pathname.endsWith('curriculums.html')) {
                TITULO.textContent = "Currículums";
            }
            else if (location.pathname.endsWith('instituciones.html')) {
                TITULO.textContent = "Instituciones";
            }
            else if (location.pathname.endsWith('rubro_empresa.html')) {
                TITULO.textContent = "Rubros empresa";
            }
            else if (location.pathname.endsWith('aspirantes.html')) {
                TITULO.textContent = "Aspirantes";
            }
            else if (location.pathname.endsWith('idiomas.html')) {
                TITULO.textContent = "Idiomas";
            }
            else if(location.pathname.endsWith('habilidades.html')){
                TITULO.textContent = "Habilidades";
            }
            else if (location.pathname.endsWith('grados_academicos.html')) {
                TITULO.textContent = "Grados académicos";
            }
            else if (location.pathname.endsWith('administradores.html')) {
                TITULO.textContent = "Administradores";
            }

        } else {
            // De lo contrario se muestra el error y se redirige al inicio de sesión.
            sweetAlert(3, DATA.error, false, 'index.html');
        }
    } else {
        // Si no existe una sesión activa y la página actual no es el inicio de sesión se redirige al index.
        if (!location.pathname.endsWith('index.html')) {
            location.href = 'index.html';
        }
        else {
        }
    }
}
