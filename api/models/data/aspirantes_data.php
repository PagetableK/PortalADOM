<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handlers/aspirantes_handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla ASPIRANTE.
 */
class AspirantesData extends AspirantesHandler
{
    // Atributo para el manejo de errores.
    private $info_error = null;

    /*
    *  Métodos para validar y asignar los valores de los atributos.
    */

    // Esta función permite validar el campo ID_ASPIRANTE.
    public function setId($valor)
    {
        // Se verifica que la variable sea de tipo numérico entero.
        if(Validator::validateNaturalNumber($valor)){
            $this->id = $valor;
            return true;
        }
        // Si la variable no es un numéro entero se devuelve el error.
        else{
            $this->info_error = 'El identificador del aspirante es incorrecto';
            return false;
        }
    }

    // Esta función permite validar el campo NOMBRE_ASPIRANTE.
    public function setNombre($valor, $min = 3, $max = 50)
    {
        // Si la variable contiene caracteres que no son de tipo alfabético se devuelve el error.
        if (!Validator::validateAlphabetic($valor)) {
            $this->info_error = 'El nombre debe ser un valor alfabético';
            return false;
        } 
        // Si la variable es de tipo alfabético se ejecuta el código.
        elseif (Validator::validateLength($valor, $min, $max)) {
            $this->nombre = $valor;
            return true;
        } 
        // Si la variable no cumple la longitud de caracteres se devuelve el error.
        else {
            $this->info_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    // Esta función permite validar el campo APELLIDO_ASPIRANTE.
    public function setApellido($valor, $min = 3, $max = 50)
    {
        // Si la variable contiene caracteres que no son de tipo alfabético se devuelve el error.
        if (!Validator::validateAlphabetic($valor)) {
            $this->info_error = 'El apellido debe ser un valor alfabético';
            return false;
        } 
        // Si la variable es de tipo alfabético se ejecuta el código.
        elseif (Validator::validateLength($valor, $min, $max)) {
            $this->apellido = $valor;
            return true;
        } 
        // Si la variable no cumple la longitud de caracteres se devuelve el error.
        else {
            $this->info_error = 'El apellido debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    // Esta función permite validar el campo CORREO_ASPIRANTE.
    public function setCorreo($value, $boolean = null, $min = 8, $max = 100)
    {
        if (!Validator::validateEmail($value)) {
            $this->info_error = 'El correo no es válido';
            return false;
        } elseif ($boolean and !$this->checkDuplicateWithId($value)) {
            $this->correo = $value;
            return true;
        } elseif ($this->checkDuplicate($value)) {
            $this->info_error = 'El correo ya está siendo utilizado por otro aspirante';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->correo = $value;
            return true;
        } else {
            $this->info_error = 'El correo debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setVerificarCorreo($value)
    {
        if (!Validator::validateEmail($value)) {
            $this->info_error = 'El correo no es válido';
            return false;
        } else {
            $this->correo = $value;
            return true;
        }
    }
  
    // Esta función permite validar el campo CLAVE_ASPIRANTE.
    public function setClave($valor)
    {
        // Se valida la longitud de la contraseña y se ejecuta el código.
        if (Validator::validatePassword($valor)) {
            $this->clave = password_hash($valor, PASSWORD_DEFAULT);
            return true;
        } 
        // Si la variable no cumple con la longitud de caracteres se devuelve el error.
        else {
            $this->info_error = Validator::getPasswordError();
            return false;
        }
    }

    // Esta función permite validar el campo FECHA_NACIMIENTO.
    public function setFechaNacimiento($valor){
        // Se valida que la variable sea de tipo Date y se ejecuta el código.
        if (Validator::validateDateBirthday($valor)) {
            $this->fecha_nacimiento = $valor;
            return true;
        } else {
            $this->info_error = 'La fecha de nacimiento no es válida, debe ser mayor de edad y menor a 122 años';
            return false;
        }
    }

    // Esta función permite validar el campo GENERO_ASPIRANTE.
    public function setGenero($valor)
    {
        // Se valida que la variable sea de tipo alfabética y se ejecuta el código.
        if (Validator::validateAlphabetic($valor)) {
            $this->genero = $valor;
            return true;
        } 
        // Si la variable no es de tipo alfabética se devuelve el error.
        else {
            $this->info_error = 'El género del estudiante es incorrecto';
            return false;
        }
    }

    // Esta función permite validar el campo ESTADO_ASPIRANTE.
    public function setEstado($valor)
    {
        // Se valida que la variable sea de tipo Booleana y se ejecuta el código.
        if (Validator::validateBoolean($valor)) {
            $this->estado = $valor;
            return true;
        } 
        // Si la variable no es de tipo booleana se devuelve el error.
        else {
            $this->info_error = 'El estado del estudiante es incorrecto';
            return false;
        }
    }

    public function getDataError()
    {
        return $this->info_error;
    }
}
