<?php
// Se incluye la clase del modelo.
require_once('../../models/data/aspirantes_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // $_SESSION['idAspirante'] = 1;
    // $_SESSION['correoAspirante'] = 'john.doe@example.com';
    // Se instancia la clase correspondiente.
    $aspirantes = new AspirantesData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'recaptcha' => 0, 'message' => null, 'error' => null, 'exception' => null, 'username' => null);
    // Se verifica si existe una sesión iniciada como aspirante para realizar las acciones correspondientes.
    if (isset($_SESSION['idAspirante'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un aspirante ha iniciado sesión.
        switch ($_GET['action']) {
            // La acción getUser retorna el correo del aspirante y valida que ya se haya iniciado sesión.
            case 'getUser':
                // Se valida que exista el valor del correo dentro del array asociativo.
                if (isset($_SESSION['correoAspirante'])) {
                    // Se retorna el éxito de la acción junto con el correo.
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['correoAspirante'];
                } else {
                    // Se retorna el error.
                    $result['error'] = 'Correo de usuario indefinido';
                }
                break;
            // La acción logOut permite cerrar la sesión del usuario.
            case 'logOut':
                // Se elimina la sesión.
                if (session_destroy()) {
                    // Se retorna el éxito de la acción junto con el mensaje.
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    // Se retorna el error.
                    $result['error'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            // Si no se encuentra la acción se retorna el error.
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando el aspirante no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'signUp':
                break;
            case 'logIn':
                break;
            // Si no se encuentra la acción se retorna el error.
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
