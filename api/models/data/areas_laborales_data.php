<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handlers/areas_laborales_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class AreaslaboralesData extends AreaslaboralesHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *  Métodos para validar y establecer los datos.
     */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la area es incorrecto';
            return false;
        }
    }

    public function setArea($value, $min = 2, $max = 150)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El area debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->area = $value;
            return true;
        } else {
            $this->data_error = 'El area debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setIdArea($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_area = $value;
            return true;
        } else {
            $this->data_error = 'error ID';
            return false;
        }
    }

    public function setIdRubro($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_rubro = $value;
            return true;
        } else {
            $this->data_error = 'error ID';
            return false;
        }
    }
   
    /*
     *  Métodos para obtener el valor de los atributos adicionales.
     */
    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }
}
