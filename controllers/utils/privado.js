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
    // const DATA = await fetchData(USER_API, 'getUser');
    // Si existe una sesión activa se ejecuta el código.

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
                    <a href="../../views/private/administrador.html" class="sidebar-link">
                        <i class="bi bi-person"></i>
                        <span>Administrador</span>
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
                        data-bs-target="#formularios" aria-expanded="false" aria-controls="pagos">
                        <i class="bi bi-receipt"></i>
                        <span>Formularios</span>
                    </a>
                    <!-- Submenú de Formularios -->
                    <ul id="formularios" class="sidebar-dropdown collapse" data-bs-parent="#sidebar">
                        <li class="sidebar-item">
                            <a href="#" class="sidebar-link">Rubros de empresas</a>
                        </li>
                        <li class="sidebar-item">
                            <a href="#" class="sidebar-link">Áreas laborales</a>
                        </li>
                        <li class="sidebar-item">
                            <a href="#" class="sidebar-link">Instituciones</a>
                        </li>
                        <li class="sidebar-item">
                            <a href="#" class="sidebar-link">Grados académicos</a>
                        </li>
                        <li class="sidebar-item">
                            <a href="idiomas.html" class="sidebar-link">Idiomas</a>
                        </li>
                        <li class="sidebar-item">
                            <a href="aspirante.html" class="sidebar-link">Usuarios</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>`
        );
        // Se inserta el header.
        MAIN.insertAdjacentHTML('afterbegin', `
        <header class="py-3">
            <div class="col d-flex flex-row align-items-center">
                <button class="toggle-btn" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="back" class="bi bi-text-left"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                    </svg>
                </button>
                <div class="ps-5">
                    <h1 class="text-center fw-bold" id="tituloPrincipal">Administrador</h1>
                </div>
            </div>
        </header>`
        );

        // Función que despliega el menú lateral al hacer click en la imagen.
        // Se guarda el elemento con la clase especificada.
        const hamBurger = document.querySelectorAll(".toggle-btn");
        // Se realiza una iteración para agregar el evento click en todos los elementos con la clase especificada.
        for (let i = 0; i < hamBurger.length; i++) {
            // Se agrega el evento click que se ejecutará al hacer click en el elemento.
            hamBurger[i].addEventListener("click", function () {
                // Se cambia el estado de la barra lateral.
                document.querySelector("#sidebar").classList.toggle("expand");
            });
        }
    /*if (DATA.session) {
        // Si la respuesta es satisfactoria se ejecuta el código.
        if (DATA.status) {
            
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
    }*/
}
