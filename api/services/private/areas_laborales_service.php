<?php
// Se incluye la clase del modelo.
require_once('../../models/data/areas_laborales_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $area = new AreaslaboralesData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $area->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$area->setArea($_POST['nombreArea']) 
                ) {
                    $result['error'] = $area->getDataError();
                } elseif ($area->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Área agregada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el área';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $area->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen áreas laborales registradas';
                }
                break;
            case 'readOne':
                if (!$area->setId($_POST['idArea'])) {
                    $result['error'] = $area->getDataError();
                } elseif ($result['dataset'] = $area->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Área inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$area->setId($_POST['idArea']) or
                    !$area->setArea($_POST['nombreArea']) 
                ) {
                    $result['error'] = $area->getDataError();
                } elseif ($area->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Área modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el área';
                }
                break;
            case 'deleteRow':
                if (
                    !$area->setId($_POST['idArea']) 
                ) {
                    $result['error'] = $area->getDataError();
                } elseif ($area->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Área eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el área';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
