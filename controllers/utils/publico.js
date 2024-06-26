/*
    Controlador general que se utiliza en sitio público.
*/

// Se declara la constante donde se almacena el resto de la url de la API. 
const USER_API = 'services/public/aspirantes_service.php';
// Declarar constante para asignar el contenido de la etiqueta main.
const MAIN = document.querySelector('main');
// Variables que permiten cambiar el color del apartado donde se encuentra el usuario.
let colorInicio = "", colorCV = "", colorPerfil = "";

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
            if(location.pathname.endsWith("index.html")){
                location.href = "inicio.html";
            }
            // Se inserta el menú lateral.
            MAIN.insertAdjacentHTML('beforebegin', `
            <nav class="navbar navbar-expand-lg bg-orange">
                <div class="container-fluid d-flex">
                    <div class="d-flex align-items-center gap-3 col-lg-4">
                        <img src="../../resources/img/logo.png" class="img-fluid" width="75px" height="75px">
                        <h2 class="text-light">ADOM</h2>
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse me-lg-5" id="navbarNav">
                        <ul class="navbar-nav column-gap-5 me-lg-5">
                            <li class="nav-item">
                                <a class="nav-link fw-bold fs-5 text-center ${colorInicio}" href="inicio.html">
                                    <i class="bi bi-house"></i>
                                    Inicio
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fw-bold fs-5 text-center ${colorCV}" href="curriculum.html">
                                    <i class="bi bi-file-earmark-person-fill"></i>
                                    Currículum
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fw-bold fs-5 text-center ${colorPerfil}" href="perfil.html">
                                    <i class="bi bi-person-fill"></i>
                                    Perfil
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fw-bold fs-5 text-center text-danger cerrar-sesion" onclick="logOut()">
                                    <i class="bi bi-box-arrow-left"></i>
                                    Cerrar sesión
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>`
            );
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
            sweetAlert(3, 'No existe una sesión activa', false);
        }
    }
}

// La función cambiarColor permite cambiar el color del apartado actual
// donde se encuentra el usuario
function cambiarColor(apartado) {
    if (apartado == 'Inicio') {
        colorInicio = 'text-light';
        colorPerfil = '';
        colorCV = '';
    } else if (apartado == 'CV') {
        colorCV = 'text-light';
        colorPerfil = '';
        colorInicio = '';
    } else {
        colorPerfil = 'text-light';
        colorInicio = '';
        colorCV = '';
    }
}