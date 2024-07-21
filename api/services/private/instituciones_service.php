<?php
// Se incluye la clase del modelo.
require_once('../../models/data/instituciones_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $instituciones = new InstitucionData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $instituciones->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$instituciones->setInstitucion($_POST['nombreInstitucion'])
                ) {
                    $result['error'] = $instituciones->getDataError();
                } elseif ($instituciones->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Institución agregada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear la institución';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $instituciones->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen instituciones registradas';
                }
                break;
            case 'readOne':
                if (!$instituciones->setId($_POST['idInstitucion'])) {
                    $result['error'] = $instituciones->getDataError();
                } elseif ($result['dataset'] = $instituciones->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Institución inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$instituciones->setId($_POST['idInstitucion']) or
                    !$instituciones->setInstitucion($_POST['nombreInstitucion'])
                ) {
                    $result['error'] = $instituciones->getDataError();
                } elseif ($instituciones->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Institución actualizada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la institución';
                }
                break;
            case 'cantidadInstituciones':
                if ($result['dataset'] = $instituciones->cantidadInstituciones()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se han registrado instituciones';
                }
                break;
            case 'deleteRow':
                if (
                    !$instituciones->setId($_POST['idInstitucion'])
                ) {
                    $result['error'] = $instituciones->getDataError();
                } elseif ($instituciones->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'institucion eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la institución';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
                break;
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
