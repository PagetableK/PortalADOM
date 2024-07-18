<?php
// Se incluye la clase del modelo.
require_once('../../models/data/rubro_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $rubro = new RubroData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $rubro->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$rubro->setRubro($_POST['nombreRubro'])
                ) {
                    $result['error'] = $rubro->getDataError();
                } elseif ($rubro->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'rubro agregada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el rubro';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $rubro->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen rubros registrados';
                }
                break;

            case 'readOne':
                if (!$rubro->setId($_POST['idRubro'])) {
                    $result['error'] = $rubro->getDataError();
                } elseif ($result['dataset'] = $rubro->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Institucion inexistente';
                }
                break;

            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$rubro->setId($_POST['idRubro']) or
                    !$rubro->setRubro($_POST['nombreRubro'])
                ) {
                    $result['error'] = $rubro->getDataError();
                } elseif ($rubro->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Rubro modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el rubro';
                }
                break;

            case 'cantidadRubros':
                if ($result['dataset'] = $rubro->cantidadRubros()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No hay rubros registrados';
                }
                break;
            case 'deleteRow':
                if (
                    !$rubro->setId($_POST['idRubro'])
                ) {
                    $result['error'] = $rubro->getDataError();
                } elseif ($rubro->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Rubro eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el rubro';
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
