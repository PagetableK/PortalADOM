<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla ASPIRANTES.
*/
class CurriculumHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $curriculum = null;
    

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */

    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_institucion, nombre_institucion
                FROM instituciones
                WHERE nombre_institucion LIKE ? 
                ORDER BY nombre_institucion';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO aspirantes(nombre_aspirante)
                VALUES(?)';
        $params = array($this->curriculum);
        return Database::executeRow($sql, $params);
    }

    //Función para leer todos los admministradores.
    public function readAll()
    {
        $sql = 'SELECT id_aspirante, nombre_aspirante
        FROM instituciones
        WHERE id_institucion';
        return Database::getRows($sql);
    }

        //funcion leer una linea
        public function readOne()
        {
            $sql = 'SELECT id_institucion, nombre_institucion 
                    FROM instituciones
                    WHERE id_institucion = ?';
            $params = array($this->id);
            return Database::getRow($sql, $params);
        }
        

     //Función para actualizar un admministrador.
     public function updateRow()
     {
         $sql = 'UPDATE instituciones
                 SET nombre_institucion = ?
                 WHERE id_institucion = ?';
         $params = array($this->instituciones, $this->id );
         return Database::executeRow($sql, $params);
     }

     //Función para eliminar un admministrador.
     public function deleteRow()
     {
         $sql = 'DELETE FROM instituciones 
                 WHERE id_institucion = ?';
         $params = array($this->id);
         return Database::executeRow($sql, $params);
     }

     public function cantidadInstituciones()
     {
         $sql = 'SELECT i.id_institucion, i.nombre_institucion,
                COUNT(e.id_institucion) AS veces_utilizadas FROM instituciones i
                LEFT JOIN estudios_aspirantes e ON i.id_institucion = e.id_institucion
                GROUP BY i.id_institucion, i.nombre_institucion;';
         return Database::getRows($sql);
     }
     
}