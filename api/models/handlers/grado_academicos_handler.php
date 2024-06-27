<?php
require_once('../../helpers/database.php');

class GradosAcademicosData {
    private $id;
    private $nombre;
    private $usos;
    private $error;

    public function setId($id) {
        if (Validator::validateNaturalNumber($id)) {
            $this->id = $id;
            return true;
        } else {
            $this->error = 'ID inválido';
            return false;
        }
    }

    public function setNombre($nombre) {
        if (Validator::validateAlphabetic($nombre)) {
            $this->nombre = $nombre;
            return true;
        } else {
            $this->error = 'Nombre inválido';
            return false;
        }
    }

    public function setUsos($usos) {
        if (Validator::validateAlphabetic($usos)) {
            $this->usos = $usos;
            return true;
        } else {
            $this->error = 'Usos inválidos';
            return false;
        }
    }

    public function getDataError() {
        return $this->error;
    }

    public function createRow() {
        $sql = 'INSERT INTO grados_academicos (nombre, usos) VALUES (?, ?)';
        $params = array($this->nombre, $this->usos);
        return Database::executeRow($sql, $params);
    }

    public function updateRow() {
        $sql = 'UPDATE grados_academicos SET nombre = ?, usos = ? WHERE id = ?';
        $params = array($this->nombre, $this->usos, $this->id);
        return Database::executeRow($sql, $params);
    }
}
?>
