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
    public function checkUser($mail, $password)
    {
        $sql = 'SELECT id_cliente, correo_cliente, contra_cliente, estado_cliente
                FROM clientes
                WHERE correo_cliente = ?';
        $params = array($mail);
        $data = Database::getRow($sql, $params);
        if (password_verify($password, $data['contra_cliente'])) {
            $this->id = $data['id_cliente'];
            $this->correo = $data['correo_cliente'];
            $this->estado = $data['estado_cliente'];
            return true;
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
