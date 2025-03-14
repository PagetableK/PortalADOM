<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla ASPIRANTES.
*/
class RubroHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $rubro = null;


    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */

    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_rubro, nombre_rubro, (SELECT COUNT(experiencias_aspirantes.id_rubro) FROM experiencias_aspirantes WHERE experiencias_aspirantes.id_rubro = rubros_empresas.id_rubro) AS usos 
	            FROM rubros_empresas
                WHERE nombre_rubro LIKE ?';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO rubros_empresas(nombre_rubro)
                VALUES(?)';
        $params = array($this->rubro);
        return Database::executeRow($sql, $params);
    }

    //Función para leer todos los admministradores.
    public function readAll()
    {
        $sql = 'SELECT id_rubro, nombre_rubro
        FROM rubros_empresas';
        return Database::getRows($sql);
    }

    //funcion leer una linea
    public function readOne()
    {
        $sql = 'SELECT id_rubro, nombre_rubro 
                    FROM rubros_empresas
                    WHERE id_rubro = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }


    //Función para actualizar un admministrador.
    public function updateRow()
    {
        $sql = 'UPDATE rubros_empresas
                 SET nombre_rubro = ?
                 WHERE id_rubro = ?';
        $params = array($this->rubro, $this->id);
        return Database::executeRow($sql, $params);
    }

    //Función para eliminar un admministrador.
    public function deleteRow()
    {
        $sql = 'DELETE FROM rubros_empresas 
                 WHERE id_rubro = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function cantidadRubros()
    {
        $sql = 'SELECT id_rubro, nombre_rubro, (SELECT COUNT(experiencias_aspirantes.id_rubro) FROM experiencias_aspirantes WHERE experiencias_aspirantes.id_rubro = rubros_empresas.id_rubro) AS usos 
	            FROM rubros_empresas';
        return Database::getRows($sql);
    }

    public function checkDuplicateWithId($rubro)
    {
        if ($this->id == null) {
            $sql = 'SELECT id_rubro
                    FROM rubros_empresas
                    WHERE nombre_rubro = ?';
            $params = array($rubro);
        } else {
            $sql = 'SELECT id_rubro
                    FROM rubros_empresas
                    WHERE nombre_rubro = ? AND id_rubro != ?';
            $params = array($rubro, $this->id);
        }
        return Database::getRow($sql, $params);
    }
}
