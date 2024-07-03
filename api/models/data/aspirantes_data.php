<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handlers/aspirantes_handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla ADMINISTRADOR.
 */
class AspirantesData extends AspirantesHandler
{
    // Atributo para el manejo de errores.
    private $info_error = null;

    /*
    *  Métodos para validar y asignar los valores de los atributos.
    */
    public function setId($valor)
    {
        if(Validator::validateNaturalNumber($valor)){
            $this->id = $valor;
            return true;
        }
        else{
            $this->info_error = 'El identificador del aspirante es correcto';
            return false;
        }
    }

    public function setNombre($valor, $min = 4, $max = 50)
    {
        if (!Validator::validateAlphabetic($valor)) {
            $this->info_error = 'El nombre debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($valor, $min, $max)) {
            $this->nombre = $valor;
            return true;
        } else {
            $this->info_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    
    public function setApellido($valor, $min = 4, $max = 50)
    {
        if (!Validator::validateAlphabetic($valor)) {
            $this->info_error = 'El apellido debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($valor, $min, $max)) {
            $this->apellido = $valor;
            return true;
        } else {
            $this->info_error = 'El apellido debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    // Validación y asignación del correo del administrador.
    public function setCorreo($value, $min = 8, $max = 100)
    {
        if (!Validator::validateEmail($value)) {
            $this->data_error = 'El correo no es válido';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->correo = $value;
            return true;
        } else {
            $this->data_error = 'El correo debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setClave($value)
    {
        if (Validator::validatePassword($value)) {
            $this->clave = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            $this->data_error = Validator::getPasswordError();
            return false;
        }
    }

    // Validación y asignación de la fecha de nacimiento del administrador.
    public function setNacimiento($value)
    {
        if (Validator::validateDateBirthday($value)) {
            $this->nacimiento = $value;
            return true;
        } else {
            $this->data_error = 'La fecha de nacimiento no es valida, debe ser mayor de edad y menor a 122 años';
            return false;
        }
    }

    public function setGenero($value)
    {
        if (Validator::validateString($value)) {
            $this->genero = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del género es incorrecto';
            return false;
        }
    }


    public function setEstado($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->estado = $value;
            return true;
        } else {
            $this->info_error = 'Estado incorrecto';
            return false;
        }
    }

    public function getDataError()
    {
        return $this->info_error;
    }
}
