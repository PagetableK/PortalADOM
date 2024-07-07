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
    protected $fecha_nacimiento = null;
    protected $genero = null;
    protected $estado = null;

    /*
    *   Métodos para gestionar la cuenta del aspirante.
    */
    
    // La acción checkUser permite validar la cuenta de un usuario por medio del query en la función.
    public function checkUser($correo, $clave)
    {
        // Se establece la estructura del query.
        $sql = 'SELECT id_aspirante, clave_aspirante, estado_aspirante, nombre_aspirante, apellido_aspirante
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
                    return array($data['id_aspirante'], $correo, $data['nombre_aspirante'], $data['apellido_aspirante']);
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


    // Esta función selecciona los campos duplicados en base a un parámetro.
    public function checkDuplicate($value)
    {
        // Se establece la estructura de la sentencia.
        $sql = 'SELECT id_aspirante
                FROM aspirantes
                WHERE correo_aspirante = ?';
        // Se almacenan los parámetros en el array.
        $params = array($value);
        // Se obtiene la fila y se devuelve el dato.
        return Database::getRow($sql, $params);
    }

    // Esta función selecciona los campos duplicados en base a un parámetro y un id
    // este query se utiliza para excluir el registro del aspirante cuando se actualiza el registro.
    public function checkDuplicateWithId($value)
    {
        // Se establece la estructura de la sentencia.
        $sql = 'SELECT id_aspirante
                FROM aspirantes
                WHERE correo_aspirante AND id_aspirante != ?';
        // Se almacenan los parámetros en el array.
        $params = array($value, $this->id);
        // Se obtiene la fila y se devuelve el dato.
        return Database::getRow($sql, $params);
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */

    public function createRow()
    {
        $sql = 'CALL insertar_aspirante_validado(?,?,?,?,?,?)';
        $params = array($this->nombre, $this->apellido, $this->clave, $this->correo, $this->genero, $this->fecha_nacimiento) ;
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
            $this->fecha_nacimiento
            
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
        WHERE NOMBRE LIKE ? OR APELLIDO LIKE ? OR CORREO LIKE ?
        ORDER BY NOMBRE;';
        $params = array($value, $value, $value);
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
