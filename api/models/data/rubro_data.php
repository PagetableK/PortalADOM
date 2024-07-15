<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handlers/rubro_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla RUBROS_EMPRESAS.
 */
class RubroData extends RubroHandler
{
    /*
     *  Atributos adicionales.
     */
    private $info_error = null;

    /*
     *  Métodos para validar y establecer los datos.
     */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->info_error = 'El identificador del rubro es incorrecto';
            return false;
        }
    }

    public function setRubro($value, $min = 2, $max = 150)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->info_error = 'El nombre debe ser un valor alfanumérico';
            return false;
        }elseif (RubroHandler::checkDuplicateWithId($value)) {
            $this->info_error = 'El nombre del rubro ya ha sido registrado';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->rubro = $value;
            return true;
        } else {
            $this->info_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

   
    /*
     *  Métodos para obtener el valor de los atributos adicionales.
     */
    public function getDataError()
    {
        return $this->info_error;
    }

}
