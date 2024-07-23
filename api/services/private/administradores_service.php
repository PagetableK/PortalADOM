<?php
// Se incluye la clase del modelo.
require_once('../../models/data/administradores_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $administradores = new AdministradoresData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'correoAdmin' => null, 'nombre' => null, 'apellido' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se cambia el valor de la session, 1 = sesión iniciada.
        $result['session'] = 1;
        // Se verifica la acción a realizar.
        switch ($_GET['action']) {
                // Buscar
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $administradores->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
                // Agregar
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administradores->setNombre($_POST['nombreAdministrador']) or
                    !$administradores->setApellido($_POST['apellidoAdministrador']) or
                    !$administradores->setClave($_POST['claveAdministrador']) or
                    !$administradores->setCorreo($_POST['correoAdministrador'], 0) 
                ) {
                    $result['error'] = $administradores->getDataError();
                } elseif ($_POST['claveAdministrador'] != $_POST['repetirClaveAdministrador']) {
                    $result['error'] = 'Las contraseñas son diferentes';
                } elseif ($administradores->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el administrador';
                }
                break;
                // Ver todo
            case 'readAll':
                if ($result['dataset'] = $administradores->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen administradores registrados';
                }
                break;
                // Ver uno
            case 'readOne':
                if (!$administradores->setId($_POST['idAdministrador'])) {
                    $result['error'] = 'Administrador incorrecto';
                } elseif ($result['dataset'] = $administradores->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Administrador inexistente';
                }
                break;
                 // Actualizar
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administradores->setId($_POST['idAdministrador']) or
                    !$administradores->setNombre($_POST['nombreAdministrador']) or
                    !$administradores->setApellido($_POST['apellidoAdministrador']) or
                    !$administradores->setCorreo($_POST['correoAdministrador'], 1) 
                ) {
                    $result['error'] = $administradores->getDataError();
                } elseif ($administradores->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el administrador';
                }
                break;
                // Eliminar
            case 'deleteRow':
                if ($_POST['idAdministrador'] == $_SESSION['idAdministrador']) {
                    $result['error'] = 'No se puede eliminar a sí mismo';
                } elseif (
                    !$administradores->setId($_POST['idAdministrador'])
                ) {
                    $result['error'] = $administradores->getDataError();
                } elseif ($administradores->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el administrador';
                }
                break;
                // Estado
            case 'changeState':
                if ($_POST['idAdministrador'] == $_SESSION['idAdministrador']) {
                    $result['error'] = 'No se puede bloquear a sí mismo';
                } elseif (
                    !$administradores->setId($_POST['idAdministrador'])
                ) {
                    $result['error'] = $administradores->getDataError();
                } elseif ($administradores->changeState()) {
                    $result['status'] = 1;
                    $result['message'] = 'Estado de administrador cambiado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al alterar el estado del administrador';
                }
                break;
                // La acción getUser valida que se haya iniciado sesión.
            case 'getUser':
                if (isset($_SESSION['correoAdministrador'])) {
                    $result['status'] = 1;
                    $result['correoAdmin'] = $_SESSION['correoAdministrador'];
                    $result['nombre'] = $_SESSION['nombreAdmin'];
                    $result['apellido'] = $_SESSION['apellidoAdmin'];
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
                break;
        }
    } else {
        // Se compara la acción a realizar cuando un administrador no ha iniciado sesión.
        switch ($_GET['action']) {
                // La acción logIn verifica las credenciales del administrador para poder ingresar al programa.
            case 'logIn':
                // Se eliminan los campos vacíos que se encuentran en los elementos del array $_POST.
                $_POST = Validator::validateForm($_POST);
                // Se valida el estado del administrador.
                if ($administradores->checkUser($_POST['correo'], $_POST['clave']) == 'Estado inactivo') {
                    // Si el estado del administrador es inactivo se muestra un mensaje con el error.
                    $result['error'] = 'Su cuenta ha sido desactivada';
                } elseif ($administradores->checkUser($_POST['correo'], $_POST['clave'])) {
                    // Si el estado del administrador es activo se ejecuta el código.
                    // Se asigna el valor de status.
                    $result['status'] = 1;
                    // Se almacena el conjunto de datos proveniente de la función dentro de la variable $info.
                    $info = $administradores->checkUser($_POST['correo'], $_POST['clave']);
                    // Se asigna el id del administrador proveniente de la función checkUser()
                    // dentro del array de la sesión $_SESSION.
                    $_SESSION['idAdministrador'] = $info[0];
                    // Se asigna el correo del administrador proveniente de la función checkUser()
                    // dentro del array de la sesión $_SESSION.
                    $_SESSION['correoAdministrador'] = $info[1];
                    // Se asigna el nombre y el apellido del administrador proveniente de la función checkUser()
                    // dentro del array de la sesión $_SESSION.
                    $_SESSION['nombreAdmin'] = $info[2];
                    $_SESSION['apellidoAdmin'] = $info[3];
                    // Se devuelve el mensaje del resultado de la acción logIn.
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'Credenciales incorrectas';
                }
                break;
                // La acción signUp permite registrar el primer administrador del programa.
            case 'signUp':
                // Se eliminan los campos vacíos que se encuentran en los elementos del array $_POST.
                $_POST = Validator::validateForm($_POST);
                if(
                    !$administradores->setNombre($_POST['nombre']) or
                    !$administradores->setApellido($_POST['apellido']) or
                    !$administradores->setCorreo($_POST['correoSignup']) or
                    !$administradores->setClave($_POST['claveSignup'])
                ) {
                    $result['error'] = $administradores->getDataError();
                } elseif($administradores->signUp()){
                    $result['status'] = 1;
                } else{
                    $result['error'] = 'Ocurrió un error al completar el registro';
                }
                break;
            case 'readUsers':
                if($administradores->readUsers()){
                    $result['status'] = 1;
                } else{
                    $result['message'] = 'No se han registrado administradores';
                }
                break;
                // Si el usuario no ha iniciado sesión no permite realizar las acciones updateRow, createRow,
                // deleteRow (Acciones que si están permitidas cuando el usuario ha iniciado sesión).
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
                break;
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
