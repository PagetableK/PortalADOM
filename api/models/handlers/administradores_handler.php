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
    protected $nombre = null;
    protected $apellido = null;

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */

    // La acción checkUser permite validar la cuenta de un usuario por medio del query en la función.
    public function checkUser($correo, $clave)
    {
        // Se establece la estructura del query.
        $sql = 'SELECT id_administrador, clave_administrador, estado_administrador, nombre_administrador, apellido_administrador
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
                    return array($data['id_administrador'], $correo, $data['nombre_administrador'], $data['apellido_administrador']);
                }
            } else {
                // Si la contraseña no es correcta se devuelve false.
                return false;
            }
        } else {
            return false;
        }
    }

    // La función checkDuplicate permite buscar un correo específico de la tabla.
    public function checkDuplicate($correo)
    {
        $sql = 'SELECT id_administrador
                FROM administradores
                WHERE correo_administrador = ?';
        $params = array($correo);
        return Database::getRow($sql, $params);
    }

    // La función checkDuplicateWithId permite buscar un correo específico de la tabla excluyendo un registro específico.
    public function checkDuplicateWithId($correo)
    {
        $sql = 'SELECT id_administrador
                FROM administradores
                WHERE correo_administrador = ? AND id_administrador != ?';
        $params = array($correo, $this->id);
        return Database::getRow($sql, $params);
    }


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    //Función para buscar un admministrador o varios.
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM vista_tabla_administradores
        WHERE NOMBRE LIKE ? OR CORREO LIKE ? OR APELLIDO LIKE ?';
        $params = array($value, $value, $value);
        return Database::getRows($sql, $params);
    }

    //Función para insertar un admministrador.
    public function createRow()
    {
        $sql = 'CALL insertar_administrador_validado(?,?,?,?);';
        $params = array(
            $this->nombre,
            $this->apellido,
            $this->clave,
            $this->correo
        );
        return Database::executeRow($sql, $params);
    }

    //Función para leer todos los admministradores.
    public function readAll()
    {
        $sql = 'SELECT * FROM vista_tabla_administradores
        ORDER BY NOMBRE;';
        return Database::getRows($sql);
    }

    //Función para leer un administrador.
    public function readOne()
    {
        $sql = 'SELECT id_administrador AS ID,
        nombre_administrador AS NOMBRE,
        apellido_administrador AS APELLIDO,
        correo_administrador AS CORREO,
        clave_administrador AS CLAVE
        FROM administradores
        WHERE id_administrador LIKE ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    //Función para actualizar un admministrador.
    public function updateRow()
    {
        $sql = 'CALL actualizar_administrador_validado(?,?,?,?);';
        $params = array(
            $this->id,
            $this->nombre,
            $this->apellido,
            $this->correo
        );
        return Database::executeRow($sql, $params);
    }

    //Función para eliminar un admministrador.
    public function deleteRow()
    {
        $sql = 'CALL eliminar_administrador(?);';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    //Función para cambiar el estado de un admministrador.
    public function changeState()
    {
        $sql = 'UPDATE administradores SET estado_administrador = NOT estado_administrador WHERE id_administrador = ?;';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    // Función que permite verificar si se han registrado administradores.
    public function readUsers()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'SELECT * FROM administradores LIMIT 1';
        // Se ejecuta el query y se retorna el conjunto de datos.
        return Database::getRow($sql);
    }

    // Función que permite registrar el primer administrador.
    public function signUp()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'INSERT INTO administradores(nombre_administrador, apellido_administrador, correo_administrador, clave_administrador) 
                VALUES(?, ?, ?, ?)';
        // Se almacenan los parámetros en el array.
        $params = array($this->nombre, $this->apellido, $this->correo, $this->clave);    
        // Se ejecuta la sentencia y se retorna el estado del query.
        return Database::executeRow($sql, $params);
    }
}
