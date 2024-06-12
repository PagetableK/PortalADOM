<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */
class AdministradoresHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $correo = null;
    protected $contra = null;

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */
    public function checkUser($correo, $contra)
    {
        $sql = 'SELECT id_administrador, nombre_administrador, contra_administrador, estado_administrador
                FROM administradores
                WHERE correo_administrador = ?';
        $params = array($correo);
        $data = Database::getRow($sql, $params);

        // Se valida que el query retorne un registro de la tabla.
        if ($data) {
            // Se valida que la contraseña ingresada en el campo de login convertida a hash
            // sea igual a la contraseña almacenada en la bd.
            if (password_verify($contra, $data['contra_administrador'])) {
                // Se valida el estado del administrador.
                if ($data['estado_administrador'] == '0') {
                    // Si estado_administrador = 0 el estado es inactivo: Se devuelve el string.
                    return 'Estado inactivo';
                } else {
                    // Si estado_administrador = 1 el estado es activo: Se devuelve el array.
                    return array($data['id_administrador'], $correo);
                }
            } else {
                // Si la contraseña no es correcta se devuelve false.
                return false;
            }
        } else {
            return false;
        }
    }
    
    public function searchEmail($correo)
    {
        $sql = 'SELECT nombre_administrador FROM administradores
                WHERE correo_administrador = ?';
        $params = array($correo);
        return Database::getRow($sql, $params);
    }

    public function checkDuplicateWithId($value)
    {
        $sql = 'SELECT id_administrador
                FROM administradores
                WHERE (correo_administrador = ?) AND id_administrador != ?';
        $params = array($value, $this->id);
        return Database::getRow($sql, $params);
    }
}
