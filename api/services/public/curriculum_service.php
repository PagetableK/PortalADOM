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
    $result = array('status' => 0, 'session' => 0, 'recaptcha' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como aspirante para realizar las acciones correspondientes.
    if (isset($_SESSION['idAspirante'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un aspirante ha iniciado sesión.
        switch ($_GET['action']) {
                // La acción almacenarEstudio almacena un estudio.
            case 'almacenarEstudio':
                // Se eliminan los espacios en blancos de los valores dentro del array.
                $_POST = Validator::validateForm($_POST);
                // Se valida que el conjunto de datos que retorna la función se almacena en el array.
                if (
                    !$curriculum->setIdGrado($_POST['gradoAcademico']) or
                    !$curriculum->setTitulo($_POST['titulo']) or
                    !$curriculum->setIdInstitucion($_POST['institucion'], $_POST['booleanoInstitucion']) or
                    !$curriculum->setNombreInstitucion($_POST['otraInstitucion']) or
                    !$curriculum->setFechaFinalizacionEstudio($_POST['fechaFinal'], $_POST['booleanFecha']) or
                    !$curriculum->setIdentificador($_POST['identificador'])
                ) {
                    // Se retorna el error proveniente de la clase DATA.
                    $result['error'] = $curriculum->getDataError();
                } elseif (
                    $curriculum->agregarEstudio()
                ) {
                    $result['status'] = 1;
                } else {
                    // Se retorna el error.
                    $result['error'] = 'Ocurrió un error al agregar el estudio';
                }
                break;

            case 'obtenerEstudios':
                if (empty($_SESSION['estudios'])) {
                    // Se retorna el error.
                    $result['error'] = 'No se han agregado estudios';
                } elseif ($result['dataset'] = $_SESSION['estudios']) {
                    $result['status'] = 1;
                } else {
                    // Se retorna el error.
                    $result['error'] = 'Ocurrió un error al obtener los estudios';
                }
                break;

            case 'eliminarEstudio':
                if (!$curriculum->setIdentificador($_POST['identificador'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->eliminarEstudio()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al eliminar el estudio';
                }
                break;

            case 'obtenerFormacionComplementaria':
                if (empty($_SESSION['formacionComplementaria'])) {
                    // Se retorna el error.
                    $result['error'] = 'No se ha agregado formación complementaria';
                } elseif ($result['dataset'] = $_SESSION['formacionComplementaria']) {
                    $result['status'] = 1;
                } else {
                    // Se retorna el error.
                    $result['error'] = 'Ocurrió un error al obtener la información complementaria';
                }
                break;

            case 'almacenarFormacionComplementaria':
                // Se eliminan los espacios en blancos de los valores dentro del array.
                $_POST = Validator::validateForm($_POST);
                if (
                    !$curriculum->setTituloCertificado($_POST['tituloCertificado']) or
                    !$curriculum->setInstitucionCertificado($_POST['institucionCertificado']) or
                    !$curriculum->setFechaFinalizacionCertificado($_POST['fechaFinalCertificado']) or
                    !$curriculum->setIdentificador($_POST['identificador'])
                ) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->agregarFormacionComplementaria()) {
                    $result['status'] = 1;
                } else {
                    // Se retorna el error.
                    $result['error'] = 'Ocurrió un error al agregar la formación complementaria';
                }
                break;

            case 'eliminarFormacionComplementaria':
                if (!$curriculum->setIdentificador($_POST['identificador'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->eliminarFormacionComplementaria()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al eliminar la formación complementaria';
                }
                break;

            case 'obtenerExperiencias':
                if (empty($_SESSION['experiencias'])) {
                    // Se retorna el error.
                    $result['error'] = 'No se han agregado experiencias';
                } elseif ($result['dataset'] = $_SESSION['experiencias']) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al obtener las experiencias';
                }
                break;

            case 'almacenarExperiencia':
                // Se eliminan los espacios en blancos de los valores dentro del array.
                $_POST = Validator::validateForm($_POST);
                // Se valida que el conjunto de datos que retorna la función se almacena en el array.
                if (
                    !$curriculum->setEmpresa($_POST['empresa']) or
                    !$curriculum->setCargo($_POST['cargo']) or
                    !$curriculum->setIdRubro($_POST['rubro']) or
                    !$curriculum->setIdArea($_POST['area']) or
                    !$curriculum->setMesInicio($_POST['mesInicio']) or
                    !$curriculum->setMesFinal($_POST['mesFinal'], $_POST['booleanFecha']) or
                    !$curriculum->setYearInicio($_POST['yearInicio']) or
                    !$curriculum->setYearFinal($_POST['yearFinal'], $_POST['booleanFecha']) or
                    !$curriculum->validarLapso() or
                    !$curriculum->setDescripcion($_POST['descripcion']) or
                    !$curriculum->setIdentificador($_POST['identificador'])
                ) {
                    // Se retorna el error proveniente de la clase DATA.
                    $result['error'] = $curriculum->getDataError();
                } elseif (
                    $curriculum->agregarExperiencia()
                ) {
                    $result['status'] = 1;
                } else {
                    // Se retorna el error.
                    $result['error'] = 'Ocurrió un error al agregar la experiencia';
                }
                break;

            case 'eliminarExperiencia':
                if (!$curriculum->setIdentificador($_POST['identificador'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->eliminarExperiencia()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al eliminar la experiencia';
                }
                break;

            case 'obtenerReferencias':
                if (empty($_SESSION['referencias'])) {
                    // Se retorna el error.
                    $result['error'] = 'No se han agregado referencias';
                } elseif ($result['dataset'] = $_SESSION['referencias']) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al obtener las referencias';
                }
                break;

            case 'almacenarReferencia':
                if (
                    !$curriculum->setNombreReferencia($_POST['nombre']) or
                    !$curriculum->setApellidoReferencia($_POST['apellido']) or
                    !$curriculum->setPuesto($_POST['puesto']) or
                    !$curriculum->setTelefonoReferencia($_POST['telefonoReferencia']) or
                    !$curriculum->setIdentificador($_POST['identificador'])
                ) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->agregarReferencia()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al agregar la referencia';
                }
                break;

            case 'eliminarReferencia':
                if (!$curriculum->setIdentificador($_POST['identificador'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->eliminarReferencia()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al eliminar la referencia';
                }
                break;

            case 'obtenerIdiomas':
                if (empty($_SESSION['idiomas'])) {
                    // Se retorna el error.
                    $result['error'] = 'No se han agregado idiomas';
                } elseif ($result['dataset'] = $_SESSION['idiomas']) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al obtener los idiomas';
                }
                break;

            case 'almacenarIdioma':
                if (
                    !$curriculum->setIdIdioma($_POST['idioma']) or
                    !$curriculum->setNivelIdioma($_POST['nivelIdioma']) or
                    !$curriculum->setIdentificador($_POST['identificador']) or
                    !$curriculum->validarIdioma()
                ) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->agregarIdioma()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al agregar el idioma';
                }
                break;

            case 'eliminarIdioma':
                if (!$curriculum->setIdentificador($_POST['identificador'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->eliminarIdioma()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al eliminar el idioma';
                }
                break;

            case 'obtenerHabilidades':
                if (empty($_SESSION['habilidades'])) {
                    // Se retorna el error.
                    $result['error'] = 'No se han agregado habilidades';
                } elseif ($result['dataset'] = (array) $_SESSION['habilidades']) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al obtener las habilidades';
                }
                break;

            case 'almacenarHabilidad':
                if (
                    !$curriculum->setIdHabilidad($_POST['nombreHabilidad']) or
                    !$curriculum->setNivelHabilidad($_POST['nivelHabilidad']) or
                    !$curriculum->setIdentificador($_POST['identificador']) or
                    !$curriculum->validarHabilidad()
                ) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->agregarHabilidad()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al agregar el idioma';
                }
                break;

            case 'eliminarHabilidad':
                if (!$curriculum->setIdentificador($_POST['identificador'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->eliminarHabilidad()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al eliminar la habilidad';
                }
                break;

            case 'agregarCurriculum':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$curriculum->verificarEstudio() or
                    !$curriculum->setImagen($_FILES['archivoImagen'], 0) or
                    !$curriculum->setTelefonoMovil($_POST['telefonoMovil']) or
                    !$curriculum->setTelefonoFijo($_POST['telefonoFijo']) or
                    !$curriculum->setCorreo($_POST['correo'])
                ) {
                    $result['error'] = $curriculum->getDataError();
                } else if ($curriculum->agregarCurriculum()) {
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['archivoImagen'], $curriculum::RUTA_IMAGEN);
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al agregar el currículum';
                }
                break;

            case 'actualizarCurriculum':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$curriculum->verificarEstudio() or
                    !$curriculum->setImagen($_FILES['archivoImagen'], $_POST['booleanImagen']) or
                    !$curriculum->setTelefonoMovil($_POST['telefonoMovil']) or
                    !$curriculum->setTelefonoFijo($_POST['telefonoFijo']) or
                    !$curriculum->setCorreo($_POST['correo'])
                ) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($_POST['booleanImagen'] and $curriculum->actualizarCurriculum()) {
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['archivoImagen'], $curriculum::RUTA_IMAGEN);
                    $result['status'] = 1;
                } elseif ($curriculum->actualizarCurriculum()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al actualizar el currículum';
                }
                break;

            case 'obtenerApartados':
                $result['dataset'] = array(!empty($_SESSION['formacionComplementaria']), !empty($_SESSION['experiencias']), !empty($_SESSION['idiomas']), !empty($_SESSION['habilidades']), !empty($_SESSION['referencias']), $curriculum->obtenerIdCv());
                $result['status'] = 1;
                break;

            case 'agregarEstudios':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->agregarEstudios()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al agregar los estudios';
                }
                break;

            case 'agregarCertificados':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->agregarCertificados()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al agregar los certificados';
                }
                break;

            case 'agregarExperiencias':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->agregarExperiencias()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al agregar las experiencias';
                }
                break;

            case 'agregarIdiomas':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->agregarIdiomas()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al agregar los idiomas';
                }
                break;

            case 'agregarHabilidades':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->agregarHabilidades()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al agregar las habilidades';
                }
                break;

            case 'agregarReferencias':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->agregarReferencias()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al agregar las referencias';
                }
                break;

            case 'getCurriculum':
                if ($result['dataset'] = $curriculum->getCurriculum()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'El currículum aún no ha sido agregado';
                }
                break;

            case 'limpiarApartados':

                // Se vacían los apartados de la variable de sesión.
                $_SESSION['estudios'] = array();
                $_SESSION['formacionComplementaria'] = array();
                $_SESSION['experiencias'] = array();
                $_SESSION['referencias'] = array();
                $_SESSION['idiomas'] = array();
                $_SESSION['habilidades'] = array();
                // Se retorna el valor.
                $result['status'] = 1;

                break;

            case 'eliminarApartados':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif (
                    $curriculum->eliminarEstudios() and
                    $curriculum->eliminarCertificados() and
                    $curriculum->eliminarExperiencias() and
                    $curriculum->eliminarReferencias() and
                    $curriculum->eliminarIdiomas() and
                    $curriculum->eliminarHabilidades()
                ) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error en el proceso de actualizar los apartados';
                }
                break;

            case 'getEstudios':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($result['dataset'] = $curriculum->getEstudios()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al obtener los estudios';
                }
                break;

            case 'getCertificados':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($result['dataset'] = $curriculum->getCertificados()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se han agregado certificados';
                }
                break;

            case 'getExperiencias':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($result['dataset'] = $curriculum->getExperiencias()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se han agregado experiencias';
                }
                break;

            case 'getReferencias':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($result['dataset'] = $curriculum->getReferencias()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se han agregado referencias';
                }
                break;

            case 'getIdiomas':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($result['dataset'] = $curriculum->getIdiomas()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se han agregado idiomas';
                }
                break;

            case 'getHabilidades':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($result['dataset'] = $curriculum->getHabilidades()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se han agregado habilidades';
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
