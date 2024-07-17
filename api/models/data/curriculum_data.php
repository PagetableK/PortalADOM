<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handlers/curriculum_handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CURRICULUM_ASPIRANTES.
 */
class CurriculumData extends CurriculumHandler
{
    // Atributo para el manejo de errores.
    private $info_error = null;

    /*
    *  Métodos para validar y asignar los valores de los atributos.
    */

    public function setIdAspirante($valor)
    {
        // Se valida que el valor sea de tipo numérico entero.
        if (Validator::validateNaturalNumber($valor)) {
            // Se asigna el valor del atributo.
            $this->id_grado = $valor;
            return true;
        } else {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El identificador del aspirante es incorrecto';
            return false;
        }
    }


    // Función que permite validar el valor del id_curriculum.
    public function setId($valor)
    {
        // Se valida que el valor sea de tipo numérico entero.
        if (Validator::validateNaturalNumber($valor)) {
            // Se asigna el valor del atributo.
            $this->id = $valor;
            return true;
        } else {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El identificador del currículum es incorrecto';
            return false;
        }
    }

    // Función que permite validar el valor del id_grado.
    public function setIdGrado($valor)
    {
        // Se valida que el valor sea de tipo numérico entero.
        if (Validator::validateNaturalNumber($valor)) {
            // Se asigna el valor del atributo.
            $this->id_grado = $valor;
            return true;
        } else {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El identificador del grado es incorrecto';
            return false;
        }
    }

    // Función que permite validar el valor del titulo_estudio.
    public function setTitulo($valor, $min = 4, $max = 70)
    {
        // Se valida que el valor sea de tipo alfanumérico.
        if (!Validator::validateAlphanumeric($valor)) {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El título debe ser un valor alfanumérico';
            return false;
        }
        // Se valida la longitud máxima y mínima de la cadena de caracteres.
        elseif (Validator::validateLength($valor, $min, $max)) {
            // Se asigna el valor del atributo.
            $this->titulo_estudio = $valor;
            return true;
        } else {
            // En caso de no cumplir con la longitud requerida se devuelve el error.
            $this->info_error = 'El título debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    // Función que permite validar el valor del id_institucion.
    public function setIdInstitucion($valor, $boolean)
    {
        // Se verifica el valor del parámetro.
        if ($boolean) {
            // Se asigna el valor del atributo.
            $this->id_institucion = 0;
            return true;
        }
        // Se valida que el valor sea de tipo numérico entero.
        elseif (Validator::validateNaturalNumber($valor)) {
            // Se asigna el valor del atributo.
            $this->id_institucion = $valor;
            return true;
        } else {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El identificador de la institución es incorrecto';
            return false;
        }
    }

    // Función que permite validar el valor del id_institucion.
    public function setNombreInstitucion($valor, $min = 4, $max = 100)
    {
        // Se verifica que el id_institucion no haya sido agregado.
        if ($this->id_institucion != null) {
            // Se devuelve el booleano.
            return true;
        }
        // Se valida que el valor sea de tipo alfanumérico.
        elseif (!Validator::validateAlphanumeric($valor)) {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El nombre de la institución debe ser un valor alfanumérico';
            return false;
        }
        // Se valida la longitud máxima y mínima de la cadena de caracteres.
        elseif (Validator::validateLength($valor, $min, $max)) {
            // Se asigna el valor del atributo.
            $this->nombre_institucion = $valor;
            return true;
        } else {
            // En caso de no cumplir con la longitud requerida se devuelve el error.
            $this->info_error = 'El nombre de la institución debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    // Función que permite validar el valor de la fecha_finalizacion del estudio.
    public function setFechaFinalizacionEstudio($valor, $boolean)
    {
        // Se verifica el valor del parámetro.
        if ($boolean) {
            // Se devuelve el Booleano.
            return true;
        }
        // Se valida el año de finalización.
        elseif (Validator::validateYear($valor)) {
            // Se asigna el valor del atributo.
            $this->fecha_finalizacion_estudio = $valor;
            return true;
        } else {
            // En caso de no cumplir con el formato de fecha se devuelve el error.
            $this->info_error = 'El año de finalización no es válido';
            return false;
        }
    }

    // Función que permite validar el identificador de un registro del currículum (Para más información véase la clase CurriculumHandler).
    public function setIdentificador($valor)
    {
        // Se verifica que el parámetro sea de tipo alfanumérico.
        if (Validator::validateAlphanumeric($valor)) {
            // Se asigna el valor del atributo.
            $this->identificador = $valor;
            return true;
        } else {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El identificador es incorrecto';
            return false;
        }
    }

    // Función que permite validar el campo titulo_certificado.
    public function setTituloCertificado($valor,  $min = 4, $max = 100)
    {
        // Se valida que el valor sea de tipo alfanumérico.
        if (!Validator::validateAlphanumeric($valor)) {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El título del certificado debe ser un valor alfanumérico';
            return false;
        }
        // Se valida la longitud máxima y mínima de la cadena de caracteres.
        elseif (Validator::validateLength($valor, $min, $max)) {
            // Se asigna el valor del atributo.
            $this->titulo_certificado = $valor;
            return true;
        } else {
            // En caso de no cumplir con la longitud requerida se devuelve el error.
            $this->info_error = 'El título debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    // Función que permite validar el campo institucion_certificado.
    public function setInstitucionCertificado($valor, $min = 4, $max = 70)
    {
        // Se valida que el valor sea de tipo alfanumérico.
        if (!Validator::validateAlphanumeric($valor)) {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El nombre de la institución debe ser un valor alfanumérico';
            return false;
        }
        // Se valida la longitud máxima y mínima de la cadena de caracteres.
        elseif (Validator::validateLength($valor, $min, $max)) {
            // Se asigna el valor del atributo.
            $this->institucion_certificado = $valor;
            return true;
        } else {
            // En caso de no cumplir con la longitud requerida se devuelve el error.
            $this->info_error = 'El nombre de la institución debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    // Función que permite validar el campo fecha_finalizacion.
    public function setFechaFinalizacionCertificado($valor)
    {
        // Se valida el año de finalización.
        if (Validator::validateYear($valor)) {
            // Se asigna el valor del atributo.
            $this->fecha_finalizacion_certificado = $valor;
            return true;
        } else {
            // En caso de no cumplir con el formato de fecha se devuelve el error.
            $this->info_error = 'El año de finalización no es válido';
            return false;
        }
    }

    // Función que permite validar el campo id_rubro.
    public function setIdRubro($valor)
    {
        // Se valida que el valor sea de tipo numérico entero.
        if (Validator::validateNaturalNumber($valor)) {
            // Se asigna el valor del atributo.
            $this->id_rubro = $valor;
            return true;
        } else {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El identificador del rubro es incorrecto';
            return false;
        }
    }

    // Función que permite validar el campo nombre_empresa.
    public function setEmpresa($valor, $min = 3, $max = 100)
    {
        // Se valida que el valor sea de tipo alfanumérico.
        if (!Validator::validateAlphanumeric($valor)) {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El nombre de la empresa debe ser un valor alfanumérico';
            return false;
        }
        // Se valida la longitud máxima y mínima de la cadena de caracteres.
        elseif (Validator::validateLength($valor, $min, $max)) {
            // Se asigna el valor del atributo.
            $this->empresa = $valor;
            return true;
        } else {
            // En caso de no cumplir con la longitud requerida se devuelve el error.
            $this->info_error = 'El nombre de la empresa debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    // Función que permite validar el campo nombre_cargo.
    public function setCargo($valor, $min = 3, $max = 100)
    {
        // Se valida que el valor sea de tipo alfanumérico.
        if (!Validator::validateAlphanumeric($valor)) {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El nombre del cargo debe ser un valor alfanumérico';
            return false;
        }
        // Se valida la longitud máxima y mínima de la cadena de caracteres.
        elseif (Validator::validateLength($valor, $min, $max)) {
            // Se asigna el valor del atributo.
            $this->cargo = $valor;
            return true;
        } else {
            // En caso de no cumplir con la longitud requerida se devuelve el error.
            $this->info_error = 'El nombre del cargo debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    // Función que permite validar el campo id_area.
    public function setIdArea($valor)
    {
        // Se valida que el valor sea de tipo numérico entero.
        if (Validator::validateNaturalNumber($valor)) {
            // Se asigna el valor del atributo.
            $this->id_area = $valor;
            return true;
        } else {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El identificador del área es incorrecto';
            return false;
        }
    }

    // Función que permite validar el mes de inicio de una experiencia.
    public function setMesInicio($valor)
    {
        // Se valida que el valor sea un mes del año.
        if (Validator::validateMonth($valor)) {
            // Se asigna el valor del atributo.
            $this->mes_inicio = $valor;
            return true;
        } else {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El mes de inicio es incorrecto';
            return false;
        }
    }

    // Función que permite validar el mes de finalización de una experiencia.
    public function setMesFinal($valor, $boolean)
    {
        // Se verifica el valor del parámetro.
        if ($boolean) {
            // Se devuelve el Booleano.
            return true;
        }
        // Se valida que el valor sea un mes del año.
        elseif (Validator::validateMonth($valor)) {
            // Se asigna el valor del atributo.
            $this->mes_final = $valor;
            return true;
        } else {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El mes de finalización es incorrecto';
            return false;
        }
    }

    // Función que permite validar el año de inicio de una experiencia.
    public function setYearInicio($valor)
    {
        // Se valida el año de finalización.
        if (Validator::validateYear($valor)) {
            // Se asigna el valor del atributo.
            $this->year_inicio = $valor;
            return true;
        } else {
            // En caso de no cumplir con el formato de fecha se devuelve el error.
            $this->info_error = 'El año de inicio no es válido';
            return false;
        }
    }

    // Función que permite validar el año de finalización de una experiencia.
    public function setYearFinal($valor, $boolean)
    {
        // Se verifica el valor del parámetro.
        if ($boolean) {
            // Se devuelve el Booleano.
            return true;
        }
        // Se valida el año de finalización.
        elseif (Validator::validateYear($valor)) {
            // Se asigna el valor del atributo.
            $this->year_final = $valor;
            return true;
        } else {
            // En caso de no cumplir con el formato de fecha se devuelve el error.
            $this->info_error = 'El año de finalización no es válido';
            return false;
        }
    }

    // Función que permite validar el campo descripcion_puesto.
    public function setDescripcion($valor, $min = 20, $max = 300)
    {
        // Se valida que el valor sea de tipo alfanumérico.
        if (!Validator::validateAlphanumeric($valor)) {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'La descripción solo puede contener caracteres alfanuméricos';
            return false;
        }
        // Se valida la longitud máxima y mínima de la cadena de caracteres.
        elseif (Validator::validateLength($valor, $min, $max)) {
            // Se asigna el valor del atributo.
            $this->descripcion = $valor;
            return true;
        } else {
            // En caso de no cumplir con la longitud requerida se devuelve el error.
            $this->info_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    // Función que permite validar el lapso de tiempo que va desde el inicio de la experiencia hasta su finalización.
    public function validarLapso()
    {
        // Se almacena en la variable la fecha de inicio en format unix.
        $fecha_inicio = strtotime("$this->year_inicio-$this->mes_inicio");
        // Se almacena en la variable la fecha de finalización en formato unix.
        $fecha_final = strtotime("$this->year_final-$this->mes_final");
        // Se verifica que se haya agrega el año de finalización (Si no se ha agregado el año de finalización la experiencia agregada es trabajo actual del aspirante).
        if ($this->year_final == null) {
            return true;
        }
        // Si la fecha de inicio es mayor a la fecha de finalización se ejecuta el código.
        elseif ($fecha_inicio > $fecha_final) {
            // Se devuelve el error.
            $this->info_error = 'La fecha de la experiencia no es válida';
            return false;
        }
        // Si la fecha de finalización es mayor o igual a la fecha de inicio se devuelve true;
        else {
            return true;
        }
    }

    // Función que permite validar el campo nombre_referencia.
    public function setNombreReferencia($valor, $min = 3, $max = 40)
    {
        // Se valida que el valor sea de tipo alfabético.
        if (!Validator::validateAlphabetic($valor)) {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El nombre de la referencia solo puede contener caracteres alfabéticos';
            return false;
        }
        // Se valida la longitud máxima y mínima de la cadena de caracteres.
        elseif (Validator::validateLength($valor, $min, $max)) {
            // Se asigna el valor del atributo.
            $this->nombre_referencia = $valor;
            return true;
        } else {
            // En caso de no cumplir con la longitud requerida se devuelve el error.
            $this->info_error = 'El nombre de la referencia debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    // Función que permite validar el campo apellido_referencia.
    public function setApellidoReferencia($valor, $min = 3, $max = 40)
    {
        // Se valida que el valor sea de tipo alfabético.
        if (!Validator::validateAlphabetic($valor)) {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El apellido de la referencia solo puede contener caracteres alfabéticos';
            return false;
        }
        // Se valida la longitud máxima y mínima de la cadena de caracteres.
        elseif (Validator::validateLength($valor, $min, $max)) {
            // Se asigna el valor del atributo.
            $this->apellido_referencia = $valor;
            return true;
        } else {
            // En caso de no cumplir con la longitud requerida se devuelve el error.
            $this->info_error = 'El apellido de la referencia debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    // Función que permite validar el campo puesto_trabajo.
    public function setPuesto($valor, $min = 4, $max = 50)
    {
        // Se valida que el valor sea de tipo alfabético.
        if (!Validator::validateAlphanumeric($valor)) {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El puesto de trabajo de la referencia solo puede contener caracteres alfanuméricos';
            return false;
        }
        // Se valida la longitud máxima y mínima de la cadena de caracteres.
        elseif (Validator::validateLength($valor, $min, $max)) {
            // Se asigna el valor del atributo.
            $this->puesto_referencia = $valor;
            return true;
        } else {
            // En caso de no cumplir con la longitud requerida se devuelve el error.
            $this->info_error = 'El puesto de trabajo de la referencia debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }


    // Función que permite validar el campo telefono_referencia.
    public function setTelefonoReferencia($valor)
    {
        // Se valida que la cadena de caracteres tenga el formato de teléfono.
        if (!Validator::validatePhone($valor)) {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El teléfono debe iniciar con el formato ####-####';
            return false;
        }
        // Se valida que el teléfono no haya sido agregado anteriormente.
        elseif ($this->verificarTelefono($valor)) {
            // En caso de haberlo agregado se devuelve el error.
            $this->info_error = 'El teléfono digitado ya ha sido agregado en otra referencia';
            return false;
        } else {
            // Se asigna el valor del atributo
            $this->telefono_referencia = $valor;
            return true;
        }
    }

    // Función que permite validar el campo id_idioma.
    public function setIdIdioma($valor)
    {
        // Se valida que el valor sea de tipo numérico entero.
        if (Validator::validateNaturalNumber($valor)) {
            // Se asigna el valor del atributo.
            $this->id_idioma = $valor;
            return true;
        } else {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El identificador del idioma es incorrecto';
            return false;
        }
    }

    // Función que permite validar el campo nivel_idioma.
    public function setNivelIdioma($valor)
    {
        // Se valida que el valor del parámetro sea uno de los tres niveles.
        if ($valor == "Básico" or $valor == "Intermedio" or $valor == "Avanzado") {
            // Se asigna el valor del atributo.
            $this->nivel_idioma = $valor;
            return true;
        } else {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El nivel del idioma es incorrecto';
            return false;
        }
    }

    // Función que verifica que el idioma no haya sido agregado aún.
    public function validarIdioma()
    {
        // Se verifica que el idioma no haya sido agregado.
        if ($this->verificarIdioma()) {
            // Se devuelve true.
            return true;
        } else {
            // En caso de haberse agregado se devuelve el error.
            $this->info_error = 'El idioma ya ha sido agregado';
            return false;
        }
    }

    // Función que permite validar el campo id_habilidad.
    public function setIdHabilidad($valor)
    {
        // Se valida que el valor sea de tipo numérico entero.
        if (Validator::validateNaturalNumber($valor)) {
            // Se asigna el valor del atributo.
            $this->id_habilidad = $valor;
            return true;
        } else {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El identificador de la habilidad es incorrecto';
            return false;
        }
    }

    // Función que permite validar el campo nivel_habilidad.
    public function setNivelHabilidad($valor)
    {
        // Se valida que el valor del parámetro sea uno de los tres niveles.
        if ($valor == "Básico" or $valor == "Intermedio" or $valor == "Avanzado") {
            // Se asigna el valor del atributo.
            $this->nivel_habilidad = $valor;
            return true;
        } else {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El nivel de la habilidad es incorrecto';
            return false;
        }
    }

    // Función que permite validar la imagen de perfil del currículum.
    public function setImagen($file, $boolean)
    {
        if ($boolean) {
            return true;
        } elseif (Validator::validateImageFile($file)) {

            $this->imagen = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()) {

            $this->info_error = Validator::getFileError();
            return false;
        } else {

            $this->info_error = 'La imagen no cumple con el formato válido';
            return true;
        }
    }

    // Función que permite validar el campo telefono_movil.
    public function setTelefonoMovil($valor, $boolean = null)
    {
        // Se valida que la cadena de caracteres tenga el formato de teléfono.
        if (!Validator::validatePhone($valor)) {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El teléfono debe iniciar con el formato ####-####';
            return false;
        } elseif ($boolean and !$this->checkDuplicate($valor)) {
            $this->correo = $valor;
            return true;
        } elseif ($this->checkDuplicate($valor)) {
            $this->info_error = 'El teléfono móvil ya está siendo utilizado en otro currículum';
            return false;
        } else {
            // Se asigna el valor del atributo
            $this->telefono_movil = $valor;
            return true;
        }
    }

    // Función que permite validar el campo telefono_fijo.
    public function setTelefonoFijo($valor, $boolean = null)
    {
        // Se verifica si el parámetro está vacío.
        if (empty($valor)) {
            // Se devuelve true.
            return true;
        }
        // Se verifica que el teléfono fijo no sea el mismo que el teléfono móvil.
        elseif ($valor == $this->telefono_movil) {
            // En caso de que los teléfonos sean iguales se devuelve el error.
            $this->info_error = 'Los teléfonos no pueden ser iguales';
            return false;
        }
        // Se valida que la cadena de caracteres tenga el formato de teléfono.
        elseif (!Validator::validatePhone($valor)) {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El teléfono debe iniciar con el formato ####-####';
            return false;
        } elseif ($boolean and !$this->checkDuplicateWithId($valor)) {
            $this->correo = $valor;
            return true;
        } elseif ($this->checkDuplicate($valor)) {
            $this->info_error = 'El teléfono fijo ya está siendo utilizado en otro currículum';
            return false;
        } else {
            // Se asigna el valor del atributo
            $this->telefono_fijo = $valor;
            return true;
        }
    }

    // Esta función permite validar el campo CORREO_ASPIRANTE.
    public function setCorreo($valor, $boolean = null, $min = 8, $max = 100)
    {
        if (!Validator::validateEmail($valor)) {
            $this->info_error = 'El correo no es válido';
            return false;
        } elseif ($boolean and !$this->checkDuplicateWithId($valor)) {
            $this->correo = $valor;
            return true;
        } elseif ($this->checkDuplicate($valor)) {
            $this->info_error = 'El correo ya está siendo utilizado en otro currículum';
            return false;
        } elseif (Validator::validateLength($valor, $min, $max)) {
            $this->correo = $valor;
            return true;
        } else {
            $this->info_error = 'El correo debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    // Función que verifica que la habilidad no haya sido agregada aún.
    public function validarHabilidad()
    {
        // Se verifica que la habilidad no haya sido agregada.
        if ($this->verificarHabilidad()) {
            // Se devuelve true.
            return true;
        } else {
            // En caso de haberse agregado se devuelve el error.
            $this->info_error = 'La habilidad ya ha sido agregada';
            return false;
        }
    }

    // Función que verifica que se haya agregado un estudio/s.
    public function verificarEstudio()
    {
        // Se verifica si el array está vacío.
        if (empty($_SESSION['estudios'])) {
            // En caso de haber agregado por lo menos 1 estudio se devuelve el error.
            $this->info_error = 'Debe agregar por lo menos 1 estudio a su currículum';
            // Se devuelve false.
            return false;
        } else {
            return true;
        }
    }


    public function getDataError()
    {
        return $this->info_error;
    }
}
