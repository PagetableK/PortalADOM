<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla ASPIRANTES.
*/
class GradoHandler
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
        $sql = 'CALL insertar_grado_validado(?)';
        $params = array($this->nombre) ;
        return Database::executeRow($sql, $params);
    }

     //Función para actualizar un admministrador.
    public function updateRow()
    {
        $sql = 'CALL actualizar_grado_validado(?,?);';
        $params = array(
            $this->id,
            $this->nombre
            
        );
        return Database::executeRow($sql, $params);
    }

    //funcion leer una linea
    public function readOne()
    {
        $sql = 'SELECT id_grado AS ID,
        nombre_grado AS NOMBRE
        FROM grados_academicos
        WHERE id_grado LIKE ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    // Función para buscar un grado académico
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_grado as ID, nombre_grado as NOMBRE, (SELECT COUNT(estudios_aspirantes.id_grado) FROM estudios_aspirantes WHERE estudios_aspirantes.id_grado = grados_academicos.id_grado) AS usos 
	            FROM grados_academicos
                WHERE nombre_grado LIKE ?';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    //Función para leer todos los admministradores.
    public function readAll()
    {
        $sql = 'SELECT id_grado as ID, nombre_grado as NOMBRE, (SELECT COUNT(estudios_aspirantes.id_grado) FROM estudios_aspirantes WHERE estudios_aspirantes.id_grado = grados_academicos.id_grado) AS usos 
	            FROM grados_academicos';
        return Database::getRows($sql);
    }

     //Función para eliminar un admministrador.
    public function deleteRow()
    {
        $sql = 'CALL eliminar_grado(?);';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
 
}
