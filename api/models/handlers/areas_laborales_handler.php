<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla ASPIRANTES.
*/
class AreaslaboralesHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $area = null;
    protected $id_area = null;
    protected $id_rubro = null;



    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */

    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_area, nombre_area, (SELECT COUNT(experiencias_aspirantes.id_area) FROM experiencias_aspirantes WHERE experiencias_aspirantes.id_area = areas_laborales.id_area) AS usos 
	            FROM areas_laborales
                WHERE nombre_area LIKE ?';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO areas_laborales(nombre_area)
                VALUES(?)';
        $params = array($this->area);
        return Database::executeRow($sql, $params);
    }

    //Función para leer todos los admministradores.
    public function readAll()
    {
        $sql = 'SELECT id_area, nombre_area, (SELECT COUNT(experiencias_aspirantes.id_area) FROM experiencias_aspirantes WHERE experiencias_aspirantes.id_area = areas_laborales.id_area) AS usos 
	            FROM areas_laborales';
        return Database::getRows($sql);
    }

    //funcion leer una linea
    public function readOne()
    {
        $sql = 'SELECT a.id_area, a.nombre_area
                FROM areas_laborales a
                WHERE id_area = ?
                ORDER BY a.nombre_area';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }


    //Función para actualizar un admministrador.
    public function updateRow()
    {
        $sql = 'UPDATE areas_laborales
                 SET nombre_area = ?
                 WHERE id_area = ?';
        $params = array($this->area, $this->id);
        return Database::executeRow($sql, $params);
    }

    //Función para eliminar un admministrador.
    public function deleteRow()
    {
        $sql = 'DELETE FROM areas_laborales 
                 WHERE id_area = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function checkDuplicateWithId($area)
    {
        $sql = 'SELECT id_area
                 FROM areas_laborales
                 WHERE nombre_area = ?';
        $params = array($area);
        return Database::getRow($sql, $params);
    }
}
