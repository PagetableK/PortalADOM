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
    $result = array('status' => 0, 'session' => 0, 'recaptcha' => 0, 'message' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como aspirante para realizar las acciones correspondientes.
    if (isset($_SESSION['idAspirante'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un aspirante ha iniciado sesión.
        switch ($_GET['action']) {
            // La acción almacenarEstudio almacena un estudio.
            case 'almacenarEstudio':
                // Se eliminan los espacios en blancos de los valores dentor del array.
                $_POST = Validator::validateForm($_POST);
                // Se valida que el conjunto de datos que retorna la función se almacena en el array.
                if (
                    !$curriculum->setIdGrado($_POST['gradoAcademico']) or 
                    !$curriculum->setTitulo($_POST['titulo']) or
                    !$curriculum->setIdInstitucion($_POST['institucion'], $_POST['booleanoInstitucion']) or
                    !$curriculum->setNombreInstitucion($_POST['otraInstitucion']) or
                    !$curriculum->setFechaFinalizacionEstudio($_POST['fechaFinal'], $_POST['booleanFecha']) or
                    !$curriculum->setEstadoEstudio($_POST['estadoEstudio']) or
                    !$curriculum->setIdentificador($_POST['identificador'])
                ) {
                    // Se retorna el error proveniente de la clase DATA.
                    $result['error'] = $curriculum->getDataError();
                } elseif(
                    $curriculum->agregarEstudio()
                ){
                    $result['status'] = 1;
                } else {
                    // Se retorna el error.
                    $result['error'] = 'Ocurrió un error al agregar el estudio';
                }
                break;

            case 'obtenerEstudios':
                if(empty($_SESSION['estudios'])){
                    // Se retorna el error.
                    $result['error'] = 'No se han agregado estudios';
                } elseif($result['dataset'] = $_SESSION['estudios']){
                    $result['status'] = 1;
                } else{
                    // Se retorna el error.
                    $result['error'] = 'Ocurrió un error al obtener los estudios';
                }
                break;
            // Si no se encuentra la acción se retorna el error.
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
