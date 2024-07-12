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
    protected $estado_estudio = null;
    protected $id_certificado = null;
    protected $titulo_certificado = null;
    protected $institucion_certificado = null;
    protected $fecha_finalizacion_certificado = null;
    protected $identificador = null;

    //Función para agregar un estudio dentro de la variable de sesión.
    public function agregarEstudio()
    {
        // echo $this->identificador.$this->id_grado.$this->titulo_estudio.$this->id_institucion.$this->nombre_institucion.$this->fecha_finalizacion_estudio;
        array_push($_SESSION['estudios'], json_decode('{"identificador": "'.$this->identificador.'", "id_grado":' .$this->id_grado. ', "titulo_estudio": "' .$this->titulo_estudio. '", "id_institucion": ' .$this->id_institucion. ', 
        "nombre_institucion": "'.$this->nombre_institucion.'", "fecha_finalizacion_estudio": "'.$this->fecha_finalizacion_estudio.'"}', true));

        // var_dump($_SESSION['estudios']); 
        
        return true;
    }
}
