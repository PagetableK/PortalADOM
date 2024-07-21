<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handlers/habilidades_handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla HABILIDADES.
 */
class HabilidadesData extends HabilidadesHandler
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
            $this->info_error = 'El identificador de la habilidad es correcto';
            return false;
        }
    }

    public function setNombre($valor, $min = 1, $max = 75)
    {
        if (HabilidadesHandler::checkDuplicate($valor)) {
            $this->info_error = 'La habilidad ya ha sido agregada';
            return false;
        }elseif (Validator::validateLength($valor, $min, $max)) {
            $this->nombre = $valor;
            return true;
        } else {
            $this->info_error = 'El nombre de la habilidad debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function getDataError()
    {
        return $this->info_error;
    }
}
