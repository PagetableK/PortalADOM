<?php
// Se incluye la clase del modelo.
require_once('../../models/data/grados_academicos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    $_SESSION['idAdministrador'] = 1;
    $_SESSION['correoAdministrador'] = 'correo@gmail.com';
    // Se instancia la clase correspondiente.
    $grado = new GradoData;
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
                } elseif ($result['dataset'] = $grado->searchRows()) {
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
                    !$grado->setNombre($_POST['nombreGrado'])  
                ) {
                    $result['error'] = $grado->getDataError();
                } elseif ($grado->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Grado académico creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el grado académico';
                }
                break;
                // Ver todo
            case 'readAll':
                if ($result['dataset'] = $grado->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen grados académicos registrados';
                }
                break;
                // Ver uno
            case 'readOne':
                if (!$grado->setId($_POST['idGrado'])) {
                    $result['error'] = 'Grado académico incorrecto';
                } elseif ($result['dataset'] = $grado->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Grado académico inexistente';
                }
                break;
                 // Actualizar
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$grado->setId($_POST['idGrado']) or
                    !$grado->setNombre($_POST['nombreGrado']) 
                ) {
                    $result['error'] = $grado->getDataError();
                } elseif ($grado->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Grado académico modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el grado académico';
                }
                break;
                // Eliminar
            case 'deleteRow':
                if (
                    !$grado->setId($_POST['idGrado'])
                ) {
                    $result['error'] = $grado->getDataError();
                } elseif ($grado->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Grado académico eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el grado académico';
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
