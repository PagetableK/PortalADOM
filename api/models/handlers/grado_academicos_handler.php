<?php
require_once('../../helpers/database.php');

class GradosAcademicosHandler {
    
    private $id;
    private $nombre;


    public function createRow() {
        $sql = 'INSERT INTO grados_academicos (nombre_grado , usos) VALUES (?, ?)';
        $params = array($this->nombre);
        return Database::executeRow($sql, $params);
    }

    public function updateRow() {
        $sql = 'UPDATE grados_academicos SET nombre_grado  = ?, usos = ? WHERE id = ?';
        $params = array($this->nombre, $this->id);
        return Database::executeRow($sql, $params);
    }


    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM grados_academicos
        WHERE nombre_grado  LIKE ?
        ORDER BY nombre_grado ;';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT * FROM grados_academicos
        ORDER BY nombre_grado ;';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_grado AS id,
        nombre_grado AS nombre
        FROM grados_academicos
        WHERE id_grado LIKE ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE
        FROM grados_academicos
        WHERE id_grado = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
?>
