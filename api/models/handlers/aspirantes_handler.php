<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla ASPIRANTES.
*/
class AspirantesHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $correo = null;
    protected $clave = null;
    protected $estado = null;

    /*
    *   Métodos para gestionar la cuenta del aspirante.
    */
    
    // La acción checkUser permite validar la cuenta de un usuario por medio del query en la función.
    public function checkUser($correo, $clave)
    {
        // Se establece la estructura del query.
        $sql = 'SELECT id_aspirante, clave_aspirante, estado_aspirante
                FROM aspirantes
                WHERE correo_aspirante = ?';
        // Se agrega el parámetro en el array.
        $params = array($correo);
        // Se ejecuta la sentencia en la base y se capturan los datos en la variable $data. 
        $data = Database::getRow($sql, $params);

        // Se valida que el query retorne un registro de la tabla.
        if ($data) {
            // Se valida que la contraseña ingresada en el campo de login convertida a hash
            // sea igual a la contraseña almacenada en la bd.
            if (password_verify($clave, $data['clave_aspirante'])) {
                // Se valida el estado del aspirante.
                if ($data['estado_aspirante'] == '0') {
                    // Si estado_aspirante = 0 el estado es inactivo: Se devuelve el string.
                    return 'Estado inactivo';
                } else {
                    // Si estado_aspirante = 1 el estado es activo: Se devuelve el array.
                    return array($data['id_aspirante'], $correo);
                }
            } else {
                // Si la contraseña no es correcta se devuelve false.
                return false;
            }
        } else {
            return false;
        }
    }
    public function checkStatus()
    {
        if ($this->estado) {
            $_SESSION['idCliente'] = $this->id;
            $_SESSION['correoCliente'] = $this->correo;
            return true;
        } else {
            return false;
        }
    }

    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_cliente
                FROM clientes
                WHERE dui_cliente = ? OR correo_cliente = ? OR telefono_movil = ? OR telefono_fijo = ?';
        $params = array($value, $value, $value, $value);
        return Database::getRow($sql, $params);
    }

    public function checkDuplicateWithId($value)
    {
        $sql = 'SELECT id_cliente
                FROM clientes
                WHERE (dui_cliente = ? OR correo_cliente = ? OR telefono_movil = ? OR telefono_fijo = ?) AND id_cliente != ?';
        $params = array($value, $value, $value, $value, $this->id);
        return Database::getRow($sql, $params);
    }
}
