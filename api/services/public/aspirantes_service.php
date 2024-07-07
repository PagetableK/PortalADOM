<?php
// Se incluye la clase del modelo.
require_once('../../models/data/aspirantes_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // session_destroy();
    // Se instancia la clase correspondiente.
    $aspirantes = new AspirantesData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'recaptcha' => 0, 'message' => null, 'error' => null, 'exception' => null, 'username' => null, 'nombre' => null);
    // Se verifica si existe una sesión iniciada como aspirante para realizar las acciones correspondientes.
    if (isset($_SESSION['idAspirante'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un aspirante ha iniciado sesión.
        switch ($_GET['action']) {
                // La acción getUser retorna el correo del aspirante y valida que ya se haya iniciado sesión.
            case 'getUser':
                // Se valida que exista el valor del correo dentro del array asociativo.
                if (isset($_SESSION['correoAspirante'])) {
                    // Se retorna el éxito de la acción junto con el correo y el nombre del usuario.
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['correoAspirante'];
                    $result['nombre'] = $_SESSION['nombreAspirante'] . " " . $_SESSION['apellidoAspirante'];
                } else {
                    // Se retorna el error.
                    $result['error'] = 'Correo de usuario indefinido';
                }
                break;
                // La acción logOut permite cerrar la sesión del usuario.
            case 'logOut':
                // Se elimina la sesión.
                if (session_destroy()) {
                    // Se retorna el éxito de la acción junto con el mensaje.
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    // Se retorna el error.
                    $result['error'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
                // Si no se encuentra la acción se retorna el error.
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando el aspirante no ha iniciado sesión.
        switch ($_GET['action']) {
                // La acción signUp permite registrar un usuario.
            case 'signUp':
                // Se validan los campos provenientes del FORM almacenados en el array $_POST.
                $_POST = Validator::validateForm($_POST);
                // Se establece la clave secreta para el reCAPTCHA de acuerdo con la cuenta de Google.
                $secretKey = '6Ld0LwYqAAAAAKZJwIxCYiyCaWftoZvvMDTT0C0g';
                // Se establece la dirección IP del servidor.
                $ip = $_SERVER['REMOTE_ADDR'];
                // Se establecen los datos del raCAPTCHA.
                $data = array('secret' => $secretKey, 'response' => $_POST['gRecaptchaResponse'], 'remoteip' => $ip);
                // Se establecen las opciones del reCAPTCHA.
                $options = array(
                    'http' => array('header' => 'Content-type: application/x-www-form-urlencoded\r\n', 'method' => 'POST', 'content' => http_build_query($data)),
                    'ssl' => array('verify_peer' => false, 'verify_peer_name' => false)
                );

                $url = 'https://www.google.com/recaptcha/api/siteverify';
                $context = stream_context_create($options);
                $response = file_get_contents($url, false, $context);
                $captcha = json_decode($response, true);

                // Se valida la respuesta del recaptcha.
                if (!$captcha['success']) {
                    $result['recaptcha'] = 1;
                    $result['error'] = 'No se pudo verificar si es humano';
                } 
                // Se verifica que el checkbox "condicion" haya sido seleccionado.
                elseif (!isset($_POST['condicion'])) {
                    $result['error'] = 'Debe marcar la aceptación de términos y condiciones';
                } 
                // Se validan los datos por medio del DATA.
                elseif (
                    !$aspirantes->setNombre($_POST['nombres']) or
                    !$aspirantes->setApellido($_POST['apellidos']) or
                    !$aspirantes->setCorreo($_POST['correo'], 0) or
                    !$aspirantes->setGenero($_POST['genero']) or
                    !$aspirantes->setFechaNacimiento($_POST['fechaNacimiento']) or
                    !$aspirantes->setClave($_POST['clave'])
                ) {
                    // Si ocurre un error se devuelve en el array.
                    $result['error'] = $aspirantes->getDataError();
                } 
                // Si se ejecuta la función correctamente se ejecuta el código.
                elseif ($aspirantes->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cuenta registrada correctamente';
                } 
                // Si ocurre un error se devuelve en el array.
                else {
                    $result['error'] = 'Ocurrió un problema al registrar la cuenta';
                }
                break;
                // La acción logIn verifica las credenciales del aspirante para poder ingresar al programa.
            case 'logIn':
                // Se validan los campos del form que se encuentran en el array $_POST.
                $_POST = Validator::validateForm($_POST);
                // Se valida el estado del aspirante.
                if ($aspirantes->checkUser($_POST['correo'], $_POST['clave']) == 'Estado inactivo') {
                    // Si el estado del aspirante es inactivo se muestra un mensaje con el error.
                    $result['error'] = 'Su cuenta ha sido desactivada';
                } elseif ($aspirantes->checkUser($_POST['correo'], $_POST['clave'])) {
                    // Si el estado del aspirante es activo se ejecuta el código.
                    // Se asigna el valor de status.
                    $result['status'] = 1;
                    // Se asigna el id del aspirante proveniente de la función checkUser()
                    // dentro del array de la sesión $_SESSION.
                    $_SESSION['idAspirante'] = $aspirantes->checkUser($_POST['correo'], $_POST['clave'])[0];
                    // Se asigna el correo del aspirante proveniente de la función checkUser()
                    // dentro del array de la sesión $_SESSION.
                    $_SESSION['correoAspirante'] = $aspirantes->checkUser($_POST['correo'], $_POST['clave'])[1];
                    // Se asigna el nombre del aspirante proveniente de la función checkUser()
                    // dentro del array de la sesión $_SESSION.
                    $_SESSION['nombreAspirante'] = $aspirantes->checkUser($_POST['correo'], $_POST['clave'])[2];
                    // Se asigna el apellido del aspirante proveniente de la función checkUser()
                    // dentro del array de la sesión $_SESSION.
                    $_SESSION['apellidoAspirante'] = $aspirantes->checkUser($_POST['correo'], $_POST['clave'])[3];
                    // Se devuelve el mensaje del resultado de la acción logIn.
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'Credenciales incorrectas';
                }
                break;
                // Si no se encuentra la acción se retorna el error.
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
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
