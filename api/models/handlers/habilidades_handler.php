<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla HABILIDADES.
*/
class HabilidadesHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $nombre = null;

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */

    public function createRow()
    {
        $sql = 'INSERT INTO habilidades(nombre_habilidad) VALUES(?)';
        $params = array($this->nombre) ;
        return Database::executeRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE habilidades SET nombre_habilidad = ? WHERE id_habilidad = ?;';
        $params = array(
            $this->nombre,
            $this->id
        );
        return Database::executeRow($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_habilidad AS ID,
        nombre_habilidad AS NOMBRE
        FROM habilidades
        WHERE id_habilidad = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function checkDuplicate($nombre)
    {
        $sql = 'SELECT id_habilidad
                FROM habilidades
                WHERE nombre_habilidad = ?';
        $params = array($nombre);
        return Database::getRow($sql, $params);
    }

    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM habilidades
        WHERE nombre_habilidad LIKE ?;';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT * FROM habilidades;';
        return Database::getRows($sql);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM habilidades WHERE id_habilidad = ?;';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
 
}
