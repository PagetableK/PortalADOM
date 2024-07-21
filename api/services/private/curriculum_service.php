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
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $curriculum->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;

            case 'readAll':
                if ($result['dataset'] = $curriculum->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No se han agregado currículums';
                }
                break;

            case 'readOne':
                if (!$curriculum->setId($_POST['idAspirante'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($result['dataset'] = $curriculum->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Aspirante inexistente';
                }
                break;

            case 'readOneData':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($result['dataset'] = $curriculum->readOneData()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Aspirante inexistente';
                }
                break;
            case 'readCurriculums':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($result['dataset'] = $curriculum->readCurriculums()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Currículum inexistente';
                }
                break;
            case 'readOneDataExperiencias':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($result['dataset'] = $curriculum->readOneDataExperiencias()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se han agregado experiencias';
                }
                break;

            case 'readOneDataEstudios':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($result['dataset'] = $curriculum->readOneDataEstudios()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se han agregado estudios';
                }
                break;

            case 'deleteRow':
                if (
                    !$curriculum->setId($_POST['idCurriculum'])
                ) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Currículum eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el currículum';
                }
                break;

            case 'validarEstudio':
                // Se eliminan los espacios en blancos de los valores dentro del array.
                $_POST = Validator::validateForm($_POST);
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
                } else {
                    $result['status'] = 1;
                }
                break;

            case 'validarCertificado':
                // Se eliminan los espacios en blancos de los valores dentro del array.
                $_POST = Validator::validateForm($_POST);
                if (
                    !$curriculum->setTituloCertificado($_POST['tituloCertificado']) or
                    !$curriculum->setInstitucionCertificado($_POST['institucionCertificado']) or
                    !$curriculum->setFechaFinalizacionCertificado($_POST['fechaFinalCertificado']) or
                    !$curriculum->setIdentificador($_POST['identificador'])
                ) {
                    $result['error'] = $curriculum->getDataError();
                } else {
                    $result['status'] = 1;
                }
                break;

            case 'validarExperiencia':
                // Se eliminan los espacios en blancos de los valores dentro del array.
                $_POST = Validator::validateForm($_POST);
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
                    $result['error'] = $curriculum->getDataError();
                } else {
                    $result['status'] = 1;
                }
                break;

            case 'validarReferencia':
                // Se eliminan los espacios en blancos de los valores dentro del array.
                $_POST = Validator::validateForm($_POST);
                if (
                    !$curriculum->setNombreReferencia($_POST['nombre']) or
                    !$curriculum->setApellidoReferencia($_POST['apellido']) or
                    !$curriculum->setPuesto($_POST['puesto']) or
                    !$curriculum->setTelefonoReferencia($_POST['telefonoReferencia'], 0) or
                    !$curriculum->setIdentificador($_POST['identificador'])
                ) {
                    $result['error'] = $curriculum->getDataError();
                } else {
                    $result['status'] = 1;
                }
                break;

            case 'validarIdioma':
                // Se eliminan los espacios en blancos de los valores dentro del array.
                $_POST = Validator::validateForm($_POST);
                if (
                    !$curriculum->setIdIdioma($_POST['idioma']) or
                    !$curriculum->setNivelIdioma($_POST['nivelIdioma']) or
                    !$curriculum->setIdentificador($_POST['identificador'])
                ) {
                    $result['error'] = $curriculum->getDataError();
                } else {
                    $result['status'] = 1;
                }
                break;

            case 'validarHabilidad':
                // Se eliminan los espacios en blancos de los valores dentro del array.
                $_POST = Validator::validateForm($_POST);
                if (
                    !$curriculum->setIdHabilidad($_POST['nombreHabilidad']) or
                    !$curriculum->setNivelHabilidad($_POST['nivelHabilidad']) or
                    !$curriculum->setIdentificador($_POST['identificador'])
                ) {
                    $result['error'] = $curriculum->getDataError();
                } else {
                    $result['status'] = 1;
                }
                break;

            case 'readAspirantes':
                if ($result['dataset'] = $curriculum->readAspirantes()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al obtener los aspirantes';
                }
                break;

            case 'agregarCurriculum':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$curriculum->setImagen($_FILES['archivoImagen'], 0) or
                    !$curriculum->setTelefonoMovil($_POST['telefonoMovil']) or
                    !$curriculum->setTelefonoFijo($_POST['telefonoFijo']) or
                    !$curriculum->setCorreo($_POST['correo']) or
                    !$curriculum->setIdAspirante($_POST['idAspirante'])
                ) {
                    $result['error'] = $curriculum->getDataError();
                } else if ($curriculum->agregarYAsignarCurriculum()) {
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
                    !$curriculum->setImagen($_FILES['archivoImagen'], $_POST['booleanImagen']) or
                    !$curriculum->setTelefonoMovil($_POST['telefonoMovil'], 1) or
                    !$curriculum->setTelefonoFijo($_POST['telefonoFijo'], 1) or
                    !$curriculum->setCorreo($_POST['correo'], 1)
                ) {
                    $result['error'] = $curriculum->getDataError();
                } elseif (!$_POST['booleanImagen'] and $curriculum->actualizarCurriculum()) {
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['archivoImagen'], $curriculum::RUTA_IMAGEN);
                    $result['status'] = 1;
                } elseif ($curriculum->actualizarCurriculum()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al actualizar el currículum';
                }
                break;

            case 'actualizarYAsignarCurriculum':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$curriculum->setId($_POST['idCurriculum']) or
                    !$curriculum->setImagen($_FILES['archivoImagen'], $_POST['booleanImagen']) or
                    !$curriculum->setTelefonoMovil($_POST['telefonoMovil'], 1) or
                    !$curriculum->setTelefonoFijo($_POST['telefonoFijo'], 1) or
                    !$curriculum->setCorreo($_POST['correo'], 1)
                ) {
                    $result['error'] = $curriculum->getDataError();
                } elseif (!$_POST['booleanImagen'] and $curriculum->actualizarYAsignarCurriculum()) {
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['archivoImagen'], $curriculum::RUTA_IMAGEN);
                    $result['status'] = 1;
                } elseif ($curriculum->actualizarYAsignarCurriculum()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al actualizar el currículum';
                }
                break;

            case 'getIdCv':
                if (!$curriculum->setIdAspirante($_POST['idAspirante'])) {
                    $result['error'] = $curriculum->getDataError();
                } else if ($result['dataset'] = $curriculum->getIdCv()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al obtener el id del currículum';
                }
                break;

            case 'agregarEstudio':
                // Se eliminan los espacios en blancos de los valores dentro del array.
                $_POST = Validator::validateForm($_POST);
                if (
                    !$curriculum->setId($_POST['idCurriculum']) or
                    !$curriculum->setIdGrado($_POST['gradoAcademico']) or
                    !$curriculum->setTitulo($_POST['titulo']) or
                    !$curriculum->setIdInstitucion($_POST['institucion'], $_POST['booleanoInstitucion']) or
                    !$curriculum->setNombreInstitucion($_POST['otraInstitucion']) or
                    !$curriculum->setFechaFinalizacionEstudio($_POST['fechaFinal'], $_POST['booleanFecha'])
                ) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->registrarEstudio()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al agregar el estudio';
                }
                break;

            case 'agregarCertificado':
                // Se eliminan los espacios en blancos de los valores dentro del array.
                $_POST = Validator::validateForm($_POST);
                if (
                    !$curriculum->setId($_POST['idCurriculum']) or
                    !$curriculum->setTituloCertificado($_POST['tituloCertificado']) or
                    !$curriculum->setInstitucionCertificado($_POST['institucionCertificado']) or
                    !$curriculum->setFechaFinalizacionCertificado($_POST['fechaFinalCertificado'])
                ) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->registrarCertificado()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al agregar el certificado';
                }
                break;

            case 'agregarExperiencia':
                // Se eliminan los espacios en blancos de los valores dentro del array.
                $_POST = Validator::validateForm($_POST);
                if (
                    !$curriculum->setId($_POST['idCurriculum']) or
                    !$curriculum->setEmpresa($_POST['empresa']) or
                    !$curriculum->setCargo($_POST['cargo']) or
                    !$curriculum->setIdRubro($_POST['rubro']) or
                    !$curriculum->setIdArea($_POST['area']) or
                    !$curriculum->setMesInicio($_POST['mesInicio']) or
                    !$curriculum->setMesFinal($_POST['mesFinal'], $_POST['booleanFecha']) or
                    !$curriculum->setYearInicio($_POST['yearInicio']) or
                    !$curriculum->setYearFinal($_POST['yearFinal'], $_POST['booleanFecha']) or
                    !$curriculum->validarLapso() or
                    !$curriculum->setDescripcion($_POST['descripcion'])
                ) {
                    // Se retorna el error proveniente de la clase DATA.
                    $result['error'] = $curriculum->getDataError();
                } elseif (
                    $curriculum->registrarExperiencia()
                ) {
                    $result['status'] = 1;
                } else {
                    // Se retorna el error.
                    $result['error'] = 'Ocurrió un error al agregar la experiencia';
                }
                break;

            case 'agregarReferencia':
                if (
                    !$curriculum->setId($_POST['idCurriculum']) or
                    !$curriculum->setNombreReferencia($_POST['nombre']) or
                    !$curriculum->setApellidoReferencia($_POST['apellido']) or
                    !$curriculum->setPuesto($_POST['puesto']) or
                    !$curriculum->setTelefonoReferencia($_POST['telefonoReferencia'], 0)
                ) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->registrarReferencia()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al agregar la referencia';
                }
                break;

            case 'agregarIdioma':
                if (
                    !$curriculum->setId($_POST['idCurriculum']) or
                    !$curriculum->setIdIdioma($_POST['idioma']) or
                    !$curriculum->setNivelIdioma($_POST['nivelIdioma'])
                ) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->registrarIdioma()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al agregar el idioma';
                }
                break;

            case 'agregarHabilidad':
                if (
                    !$curriculum->setId($_POST['idCurriculum']) or
                    !$curriculum->setIdHabilidad($_POST['nombreHabilidad']) or
                    !$curriculum->setNivelHabilidad($_POST['nivelHabilidad'])
                ) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($curriculum->registrarHabilidad()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al agregar la habilidad';
                }
                break;

            case 'readCurriculum':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($result['dataset'] = $curriculum->readCurriculum()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al leer el currículum';
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

            case 'seleccionarIdAspirante':
                if (!$curriculum->setId($_POST['idCurriculum'])) {
                    $result['error'] = $curriculum->getDataError();
                } elseif ($result['status'] = $curriculum->seleccionarIdAspirante()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un error al obtener el id del aspirante';
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
