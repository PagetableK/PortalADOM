<?php
// Se incluye la clase para trabajar con la base de datos.
require_once ('../../helpers/database.php');
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
    protected $id_aspirante = null;
    protected $nombre_aspirante = null;
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
        array_push($_SESSION['estudios'], json_decode('{"identificador": "' . $this->identificador . '", "id_grado":' . $this->id_grado . ', "titulo_estudio": "' . $this->titulo_estudio . '", "id_institucion": ' . $this->id_institucion . ', 
        "nombre_institucion": "' . $this->nombre_institucion . '", "fecha_finalizacion_estudio": "' . $this->fecha_finalizacion_estudio . '"}', true));

        // var_dump($_SESSION['estudios']); 

        return true;
    }

    public function createRow()
{
    $sql = 'INSERT INTO curriculum_aspirantes(id_aspirante, nombre_aspirante)
            VALUES (?, ?)';
    $params = array($this->id_aspirante, $this->nombre_aspirante);
    return Database::executeRow($sql, $params);
}

    public function readAll()
    {
        $sql = 'SELECT a.id_aspirante, a.nombre_aspirante
            FROM aspirantes a
            JOIN curriculum_aspirantes ca ON a.id_aspirante = ca.id_aspirante
            ORDER BY a.nombre_aspirante';

        return Database::getRows($sql);
    }
    public function readOne()
    {
        $sql = 'SELECT a.id_aspirante, a.nombre_aspirante
            FROM aspirantes a
            JOIN curriculum_aspirantes ca ON a.id_aspirante = ca.id_aspirante
            WHERE a.id_aspirante = ?
            ORDER BY a.nombre_aspirante';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
    public function updateRow()
    {
        $sql = 'UPDATE aspirantes a
                JOIN curriculum_aspirantes c ON a.id_aspirante = c.id_aspirante
                SET a.nombre_aspirante = ?
                WHERE c.id_curriculum = ?';
        $params = array($this->nombre_aspirante, $this->id_aspirante);
        return Database::executeRow($sql, $params);
    }
}
