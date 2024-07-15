A<?php
// Se incluye la clase del modelo.
require_once('../../models/data/aspirantes_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    $_SESSION['idAdministrador'] = 1;
    $_SESSION['correoAdministrador'] = 'correo@gmail.com';
    // Se instancia la clase correspondiente.
    $aspirante = new AspirantesData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'correoAdmin' => null);
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
                } elseif ($result['dataset'] = $aspirante->searchRows()) {
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
                    !$aspirante->setNombre($_POST['nombreAspirante']) or
                    !$aspirante->setApellido($_POST['apellidoAspirante']) or
                    !$aspirante->setClave($_POST['claveAspirante']) or
                    !$aspirante->setCorreo($_POST['correoAspirante'], 0) or
                    !$aspirante->setGenero($_POST['generoAspirante']) or
                    !$aspirante->setFechaNacimiento($_POST['fechanacimientoAspirante']) 
                ) {
                    $result['error'] = $aspirante->getDataError();
                } elseif ($_POST['claveAspirante'] != $_POST['repetirClaveAspirante']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($aspirante->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Aspirante creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el aspirante';
                }
                break;
                // Ver todo
            case 'readAll':
                if ($result['dataset'] = $aspirante->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen aspirantes registrados';
                }
                break;
                // Ver uno
            case 'readOne':
                if (!$aspirante->setId($_POST['idAspirante'])) {
                    $result['error'] = 'Aspirante incorrecto';
                } elseif ($result['dataset'] = $aspirante->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Aspirante inexistente';
                }
                break;
                 // Actualizar
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$aspirante->setId($_POST['idAspirante']) or
                    !$aspirante->setNombre($_POST['nombreAspirante']) or
                    !$aspirante->setApellido($_POST['apellidoAspirante']) or
                    !$aspirante->setCorreo($_POST['correoAspirante'], 1) or
                    !$aspirante->setFechaNacimiento($_POST['fechanacimientoAspirante']) or
                    !$aspirante->setGenero($_POST['generoAspirante']) 
                ) {
                    $result['error'] = $aspirante->getDataError();
                } elseif ($aspirante->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Aspirante modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el aspirante';
                }
                break;
                // Eliminar
            case 'deleteRow':
                if (
                    !$aspirante->setId($_POST['idAspirante'])
                ) {
                    $result['error'] = $aspirante->getDataError();
                } elseif ($aspirante->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Aspirante eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el aspirante';
                }
                break;
                // Estado
            case 'changeState':
                if (
                    !$aspirante->setId($_POST['idAspirante'])
                ) {
                    $result['error'] = $aspirante->getDataError();
                } elseif ($aspirante->changeState()) {
                    $result['status'] = 1;
                    $result['message'] = 'Estado del aspirante cambiado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al alterar el estado del aspirante';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        print(json_encode('Acceso denegado'));
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
