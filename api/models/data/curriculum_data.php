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
            $this->info_error = 'El identificador del currículum es incorrecto';
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

    // Función que permite validar el valor del estado del estudio (Ligado con fecha_finalizacion).
    public function setEstadoEstudio($valor)
    {
        // Se verifica que la fecha_finalizacion_estudio no haya sido agregada.
        if ($this->fecha_finalizacion_estudio != null) {
            // Se devuelve el booleano.
            return true;
        }
        // Se valida que la variable sea de tipo Booleana.
        elseif ($valor === 'on') {
            // Se asigna el valor del atributo.
            $this->estado_estudio = $valor;
            return true;
        } else {
            // En caso de no serlo se devuelve el error.
            $this->info_error = 'El estado del estudio es incorrecto';
            return false;
        }
    }


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

    public function getDataError()
    {
        return $this->info_error;
    }
}
