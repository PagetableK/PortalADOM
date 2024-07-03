<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handlers/idiomas_handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla ADMINISTRADOR.
 */
class idiomasData extends IdiomasHandler
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
            $this->info_error = 'El identificador del idioma es correcto';
            return false;
        }
    }

    public function setNombre($valor, $min = 2, $max = 30)
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

    public function getDataError()
    {
        return $this->info_error;
    }
}
