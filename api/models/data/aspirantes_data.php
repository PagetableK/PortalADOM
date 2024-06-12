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
            $this->info_error = 'El identificador del administrador es correcto';
            return false;
        }
    }

    public function setNombre($valor, $min = 4, $max = 20)
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

    
    public function setApellido($valor, $min = 4, $max = 20)
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

    public function setCorreo($valor, $boolean, $min = 8, $max = 100)
    {
        if (!Validator::validateEmail($valor)) {
            $this->info_error = 'El correo no es válido';
            return false;
        } else if($boolean and !$this->checkDuplicateWithId($valor)){
            $this->correo = $valor;
            return true;
        } else if($this->checkDuplicate($valor)){
            $this->info_error = 'El correo ya está siendo usado por otro usuario';
            return false;
        } elseif (Validator::validateLength($valor, $min, $max)) {
            $this->correo = $valor;
            return true;
        } else {
            $this->info_error = 'El correo debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setClave($valor)
    {
        if (Validator::validatePassword($valor)) {
            $this->clave = password_hash($valor, PASSWORD_DEFAULT);
            return true;
        } else {
            $this->info_error = Validator::getPasswordError();
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
