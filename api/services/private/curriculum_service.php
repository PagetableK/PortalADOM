<?php
// Se incluye la clase del modelo.
require_once('../../models/data/curriculum_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $curriculum = new CurriculumData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            // case 'searchRows':
            //     if (!Validator::validateSearch($_POST['search'])) {
            //         $result['error'] = Validator::getSearchError();
            //     } elseif ($result['dataset'] = $curriculum->searchRows()) {
            //         $result['status'] = 1;
            //         $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
            //     } else {
            //         $result['error'] = 'No hay coincidencias';
            //     }
            //     break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$curriculum->setNombre($_POST['nombreAspirante']) or
                    !$curriculum->setIdAspirante($_POST['idAspirante']) 
                ) {
                    $result['error'] = $area->getDataError();
                } elseif ($area->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'aspirante agregada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear la area';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $curriculum->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen áreas laborales registradas';
                }
                break;
            case 'readOne':
                if (!$curriculum->setId($_POST['idAspirante'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($result['dataset'] = $curriculum->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'aspirante inexistente';
                }
                break;
            case 'readOneData':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($result['dataset'] = $curriculum->readOneData()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'aspirante inexistente';
                }
                break;
            case 'readOneDataExperiencias':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($result['dataset'] = $curriculum->readOneDataExperiencias()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'aspirante inexistente';
                }
                break;
            case 'readOneDataEstudios':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();                                                                                                                                 
                } elseif ($result['dataset'] = $curriculum->readOneDataEstudios()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'aspirante inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$curriculum->setIdAspirante($_POST['idAspirante']) or
                    !$curriculum->setNombre($_POST['nombreAspirante']) 
                ) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'curriculum modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la area';
                }
                break;
            case 'deleteRow':
                if (
                    !$curriculum->setId($_POST['idCurriculum']) 
                ) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'curriculum eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la area';
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
