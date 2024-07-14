<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla CURRICULUM_ASPIRANTES.
*/
class CurriculumHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;

    protected $id_estudio = null;
    protected $id_grado = null;
    protected $titulo_estudio = null;
    protected $id_institucion = null;
    protected $nombre_institucion = null;
    protected $fecha_finalizacion_estudio = null;
    protected $id_certificado = null;
    protected $titulo_certificado = null;
    protected $institucion_certificado = null;
    protected $fecha_finalizacion_certificado = null;
    protected $identificador = null;
    protected $id_rubro = null;
    protected $empresa = null;
    protected $cargo = null;
    protected $id_area = null;
    protected $mes_inicio = null;
    protected $mes_final = null;
    protected $year_inicio = null;
    protected $year_final = null;
    protected $descripcion = null;
    protected $nombre_referencia = null;
    protected $apellido_referencia = null;
    protected $puesto_referencia = null;
    protected $telefono_referencia = null;

    //Función para agregar un estudio dentro de la variable de sesión.
    public function agregarEstudio()
    {
        // echo $this->identificador.$this->id_grado.$this->titulo_estudio.$this->id_institucion.$this->nombre_institucion.$this->fecha_finalizacion_estudio;
        array_push($_SESSION['estudios'], json_decode('{"identificador": "' . $this->identificador . '", "id_grado":' . $this->id_grado . ', "titulo_estudio": "' . $this->titulo_estudio . '", "id_institucion": ' . $this->id_institucion . ', 
        "nombre_institucion": "' . $this->nombre_institucion . '", "fecha_finalizacion_estudio": "' . $this->fecha_finalizacion_estudio . '"}', true));

        // var_dump($_SESSION['estudios']); 

        return true;
    }


    public function eliminarEstudio()
    {
        // https://stackoverflow.com/questions/3474381/removing-array-from-multidimensional-array

        foreach ($_SESSION["estudios"] as $key => $val) {

            if ($val["identificador"] == $this->identificador) {

                unset($_SESSION["estudios"][$key]);
            }
        }

        return true;

        // var_dump($_SESSION['estudios']);
    }

    public function agregarFormacionComplementaria()
    {
        // echo $this->identificador.$this->titulo_certificado.$this->institucion_certificado.$this->fecha_finalizacion_certificado;
        array_push($_SESSION['formacionComplementaria'], json_decode('{"identificador": "' . $this->identificador . '", "titulo_certificado": "' . $this->titulo_certificado . '", "institucion_certificado": "' . $this->institucion_certificado . '", 
                    "fecha_finalizacion": "' . $this->fecha_finalizacion_certificado . '"}', true));

        // var_dump($_SESSION['formacionComplementaria']); 
        return true;
    }


    public function eliminarFormacionComplementaria()
    {
        foreach ($_SESSION["formacionComplementaria"] as $key => $val) {

            if ($val["identificador"] == $this->identificador) {

                unset($_SESSION["formacionComplementaria"][$key]);
            }
        }

        return true;
    }

    public function agregarExperiencia()
    {
        // echo $this->identificador.$this->empresa.$this->cargo.$this->id_rubro.$this->mes_inicio.$this->year_inicio.$this->mes_final.$this->year_final;
        array_push($_SESSION['experiencias'], json_decode('{"identificador": "' . $this->identificador . '", "empresa": "' . $this->empresa . '", "cargo": "' . $this->cargo . '", 
                    "rubro": "' . $this->id_rubro . '", "mes_inicio": "' . $this->mes_inicio . '", "year_inicio": "' . $this->year_inicio . '", "mes_final": "' . $this->mes_final . '",
                    "year_final": "' . $this->year_final . '" }', true));

        // var_dump($_SESSION['experiencias']); 
        return true;
    }

    public function eliminarExperiencia()
    {
        // https://stackoverflow.com/questions/3474381/removing-array-from-multidimensional-array

        foreach ($_SESSION["experiencias"] as $key => $val) {

            if ($val["identificador"] == $this->identificador) {

                unset($_SESSION["experiencias"][$key]);
            }
        }

        return true;
    }

    public function agregarReferencia()
    {
        // echo $this->identificador.$this->empresa.$this->cargo.$this->id_rubro.$this->mes_inicio.$this->year_inicio.$this->mes_final.$this->year_final;
        array_push($_SESSION['referencias'], json_decode('{"identificador": "' . $this->identificador . '", "nombre": "' . $this->nombre_referencia . '", "apellido": "' . $this->apellido_referencia . '", 
        "puesto": "' . $this->puesto_referencia . '", "telefono": "' . $this->telefono_referencia . '" }', true));

        // var_dump($_SESSION['experiencias']); 
        return true;
    }

    public function eliminarReferencia()
    {
        // https://stackoverflow.com/questions/3474381/removing-array-from-multidimensional-array

        foreach ($_SESSION["referencias"] as $key => $val) {

            if ($val["identificador"] == $this->identificador) {

                unset($_SESSION["referencias"][$key]);
            }
        }

        return true;
    }
}
