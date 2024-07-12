<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla ASPIRANTES.
*/
class IdiomasHandler
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
        $sql = 'CALL insertar_idioma_validado(?)';
        $params = array($this->nombre) ;
        return Database::executeRow($sql, $params);
    }

     //Función para actualizar un admministrador.
    public function updateRow()
    {
        $sql = 'CALL actualizar_idioma_validado(?,?);';
        $params = array(
            $this->id,
            $this->nombre
            
        );
        return Database::executeRow($sql, $params);
    }

    //funcion leer una linea
    public function readOne()
    {
        $sql = 'SELECT id_idioma AS ID,
        nombre_idioma AS NOMBRE
        FROM idiomas
        WHERE id_idioma LIKE ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function checkDuplicateWithId($nombre)
    {
        $sql = 'SELECT id_idioma
                FROM idiomas
                WHERE nombre_idioma = ?';
        $params = array($nombre);
        return Database::getRow($sql, $params);
    }

    // Función para buscar un idioma
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM vista_tabla_idiomas
        WHERE NOMBRE LIKE ?
        ORDER BY NOMBRE;';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    //Función para leer todos los admministradores.
    public function readAll()
    {
        $sql = 'SELECT * FROM vista_tabla_idiomas
        ORDER BY NOMBRE;';
        return Database::getRows($sql);
    }

     //Función para eliminar un admministrador.
    public function deleteRow()
    {
        $sql = 'CALL eliminar_idioma(?);';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
 
}
