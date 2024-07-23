<?php
// Se incluye la clase del modelo.
require_once('../../models/data/idiomas_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $idioma = new IdiomasData;
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
                } elseif ($result['dataset'] = $idioma->searchRows()) {
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
                    !$idioma->setNombre($_POST['nombreIdioma'])
                ) {
                    $result['error'] = $idioma->getDataError();
                } elseif ($idioma->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Idioma creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el idioma';
                }
                break;
                // Ver todo
            case 'readAll':
                if ($result['dataset'] = $idioma->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen idiomas registrados';
                }
                break;
                // Ver uno
            case 'readOne':
                if (!$idioma->setId($_POST['idIdioma'])) {
                    $result['error'] = 'Idioma incorrecto';
                } elseif ($result['dataset'] = $idioma->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Idioma inexistente';
                }
                break;
                // Actualizar
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$idioma->setId($_POST['idIdioma']) or
                    !$idioma->setNombre($_POST['nombreIdioma'])
                ) {
                    $result['error'] = $idioma->getDataError();
                } elseif ($idioma->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Idioma modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el idioma';
                }
                break;
                // Eliminar
            case 'deleteRow':
                if (
                    !$idioma->setId($_POST['idIdioma'])
                ) {
                    $result['error'] = $idioma->getDataError();
                } elseif ($idioma->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Idioma eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el idioma';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
                break;
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
