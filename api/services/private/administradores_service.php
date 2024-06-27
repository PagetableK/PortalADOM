<?php
// Se incluye la clase del modelo.
require_once('../../models/data/administradores_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    $_SESSION['idAdministrador'] = 1;
    $_SESSION['correoAdministrador'] = 'correo@gmail.com';
    // Se instancia la clase correspondiente.
    $administradores = new AdministradoresData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'correoAdmin' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se cambia el valor de la session, 1 = sesión iniciada.
        $result['session'] = 1;
        // Se verifica la acción a realizar.
        switch ($_GET['action']) {
                // La acción getUser valida que se haya iniciado sesión.
            case 'getUser':
                if (isset($_SESSION['correoAdministrador'])) {
                    $result['status'] = 1;
                    $result['correoAdmin'] = $_SESSION['correoAdministrador'];
                } else {
                    $result['error'] = 'Correo no definido';
                }
                break;
                // La acción logOut permite cerrar la sesión de administrador.
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando un administrador no ha iniciado sesión.
        switch ($_GET['action']) {
                // La acción logIn verifica las credenciales del administrador para poder ingresar al programa.
            case 'logIn':
                // Se validan los campos del form que se encuentran en el array $_POST.
                $_POST = Validator::validateForm($_POST);
                // Se valida el estado del administrador.
                if ($administradores->checkUser($_POST['CorreoAdmin'], $_POST['ContraAdmin']) == 'Estado inactivo') {
                    // Si el estado del administrador es inactivo se muestra un mensaje con el error.
                    $result['error'] = 'Su cuenta ha sido desactivada por un administrador';
                } elseif ($administradores->checkUser($_POST['CorreoAdmin'], $_POST['ContraAdmin'])) {
                    // Si el estado del administrador es activo se ejecuta el código.
                    // Se asigna el valor de status.
                    $result['status'] = 1;
                    // Se asigna el id del administrador proveniente de la función checkUser()
                    // dentro del array de la sesión $_SESSION.
                    $_SESSION['idAdministrador'] = $administradores->checkUser($_POST['CorreoAdmin'], $_POST['ContraAdmin'])[0];
                    // Se asigna el correo del administrador proveniente de la función checkUser()
                    // dentro del array de la sesión $_SESSION.
                    $_SESSION['correoAdministrador'] = $administradores->checkUser($_POST['CorreoAdmin'], $_POST['ContraAdmin'])[1];
                    // Se devuelve el mensaje del resultado de la acción logIn.
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'Credenciales incorrectas';
                }
                break;
                // Si el usuario no ha iniciado sesión no permite realizar las acciones updateRow, createRow,
                // deleteRow (Acciones que si están permitidas cuando el usuario ha iniciado sesión).
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
