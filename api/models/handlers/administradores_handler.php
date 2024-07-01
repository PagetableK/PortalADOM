<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla ADMINISTRADOR.
 */
class AdministradoresHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $correo = null;
    protected $clave = null;

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */

    // La acción checkUser permite validar la cuenta de un usuario por medio del query en la función.
    public function checkUser($correo, $clave)
    {
        // Se establece la estructura del query.
        $sql = 'SELECT id_administrador, clave_administrador, estado_administrador
                FROM administradores
                WHERE correo_administrador = ?';
        // Se agrega el parámetro en el array.
        $params = array($correo);
        // Se ejecuta la sentencia en la base y se capturan los datos en la variable $data. 
        $data = Database::getRow($sql, $params);

        // Se valida que el query retorne un registro de la tabla.
        if ($data) {
            // Se valida que la contraseña ingresada en el campo de login convertida a hash
            // sea igual a la contraseña almacenada en la bd.
            if (password_verify($clave, $data['clave_administrador'])) {
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
