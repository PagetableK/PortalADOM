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
    protected $nacimiento = null;
    protected $genero = null;
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

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */

    public function createRow()
    {
        $sql = 'CALL insertar_aspirante_validado(?,?,?,?,?,?)';
        $params = array($this->nombre, $this->apellido, $this->clave, $this->correo, $this->genero, $this->nacimiento) ;
        return Database::executeRow($sql, $params);
    }

     //Función para actualizar un admministrador.
    public function updateRow()
    {
        $sql = 'CALL actualizar_aspirante_validado(?,?,?,?,?,?);';
        $params = array(
            $this->id,
            $this->nombre,
            $this->apellido,
            $this->correo,
            $this->genero,
            $this->nacimiento
            
        );
        return Database::executeRow($sql, $params);
    }

    //funcion leer una linea
    public function readOne()
    {
        $sql = 'SELECT id_aspirante AS ID,
        nombre_aspirante AS NOMBRE,
        apellido_aspirante AS APELLIDO,
        correo_aspirante AS CORREO,
        fecha_nacimiento AS FECHA,
        genero_aspirante AS GENERO,
        clave_aspirante AS CLAVE
        FROM aspirantes
        WHERE id_aspirante LIKE ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    // Función para buscar un cliente
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM vista_tabla_aspirantes
        WHERE NOMBRE LIKE ?
        ORDER BY NOMBRE;';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    //Función para leer todos los admministradores.
    public function readAll()
    {
        $sql = 'SELECT * FROM vista_tabla_aspirantes
        ORDER BY NOMBRE;';
        return Database::getRows($sql);
    }

     //Función para eliminar un admministrador.
     public function deleteRow()
     {
         $sql = 'CALL eliminar_aspirante(?);';
         $params = array($this->id);
         return Database::executeRow($sql, $params);
     }
 
     //Función para cambiar el estado de un admministrador.
     public function changeState()
     {
         $sql = 'UPDATE aspirantes SET estado_aspirante = NOT estado_aspirante WHERE id_aspirante = ?;';
         $params = array($this->id);
         return Database::executeRow($sql, $params);
     }
}
