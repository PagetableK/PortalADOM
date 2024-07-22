<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handlers/areas_laborales_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla AREAS_LABORALES.
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
            $this->data_error = 'El identificador del área es incorrecto';
            return false;
        }
    }

    public function setArea($value, $min = 2, $max = 150)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre del área debe ser un valor alfanumérico';
            return false;
        }
        elseif (AreaslaboralesHandler::checkDuplicateWithId($value)) {
            $this->data_error = 'El área laboral ya ha sido agregada';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->area = $value;
            return true;
        } else {
            $this->data_error = 'El nombre del área debe tener una longitud entre ' . $min . ' y ' . $max;
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
