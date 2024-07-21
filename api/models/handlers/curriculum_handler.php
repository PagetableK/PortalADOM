<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *	Clase para manejar el comportamiento de los datos de la tabla CURRICULUM_ASPIRANTES.
 */
class CurriculumHandler
{
    /*
     *   Declaración de atributos para el manejo de datos.
     */
    protected $id = null;

    protected $id_estudio = null;
    protected $id_aspirante = null;
    protected $nombre_aspirante = null;
    protected $id_grado = null;
    protected $titulo_estudio = null;
    protected $id_institucion = null;
    protected $nombre_institucion = null;
    protected $fecha_finalizacion_estudio = null;
    protected $id_certificado = null;
    protected $titulo_certificado = null;
    protected $institucion_certificado = null;
    protected $fecha_finalizacion_certificado = null;
    protected $identificador = null;
    protected $id_rubro = null;
    protected $empresa = null;
    protected $cargo = null;
    protected $id_area = null;
    protected $mes_inicio = null;
    protected $mes_final = null;
    protected $year_inicio = null;
    protected $year_final = null;
    protected $descripcion = null;
    protected $nombre_referencia = null;
    protected $apellido_referencia = null;
    protected $puesto_referencia = null;
    protected $telefono_referencia = null;
    protected $id_idioma = null;
    protected $nivel_idioma = null;
    protected $id_habilidad = null;
    protected $nivel_habilidad = null;
    protected $imagen = null;
    protected $telefono_movil = null;
    protected $telefono_fijo = null;
    protected $correo = null;


    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/aspirantes/';

    //Función para agregar un estudio dentro de la variable de sesión.
    public function agregarEstudio()
    {
        array_push($_SESSION['estudios'], json_decode('{"identificador": "' . $this->identificador . '", "id_grado":' . $this->id_grado . ', "titulo_estudio": "' . $this->titulo_estudio . '", "id_institucion": ' . $this->id_institucion . ', 
        "nombre_institucion": "' . $this->nombre_institucion . '", "fecha_finalizacion_estudio": "' . $this->fecha_finalizacion_estudio . '"}', true));

        return true;
    }


    public function eliminarEstudio()
    {
        // https://stackoverflow.com/questions/3474381/removing-array-from-multidimensional-array

        foreach ($_SESSION["estudios"] as $key => $val) {

            if ($val["identificador"] == $this->identificador) {

                unset($_SESSION["estudios"][$key]);
            }
        }

        return true;
    }

    public function agregarFormacionComplementaria()
    {
        array_push($_SESSION['formacionComplementaria'], json_decode('{"identificador": "' . $this->identificador . '", "titulo_certificado": "' . $this->titulo_certificado . '", "institucion_certificado": "' . $this->institucion_certificado . '", 
                    "fecha_finalizacion": "' . $this->fecha_finalizacion_certificado . '"}', true));

        return true;
    }

    public function eliminarFormacionComplementaria()
    {
        foreach ($_SESSION["formacionComplementaria"] as $key => $val) {

            if ($val["identificador"] == $this->identificador) {

                unset($_SESSION["formacionComplementaria"][$key]);
            }
        }

        return true;
    }

    public function agregarExperiencia()
    {
        array_push($_SESSION['experiencias'], json_decode('{"identificador": "' . $this->identificador . '", "empresa": "' . $this->empresa . '", "cargo": "' . $this->cargo . '", 
                    "rubro": "' . $this->id_rubro . '", "area": "' . $this->id_area . '", "mes_inicio": "' . $this->mes_inicio . '", "year_inicio": "' . $this->year_inicio . '", "mes_final": "' . $this->mes_final . '",
                    "year_final": "' . $this->year_final . '", "descripcion": "' . $this->descripcion . '" }', true));

        return true;
    }

    public function eliminarExperiencia()
    {
        // https://stackoverflow.com/questions/3474381/removing-array-from-multidimensional-array

        foreach ($_SESSION["experiencias"] as $key => $val) {

            if ($val["identificador"] == $this->identificador) {

                unset($_SESSION["experiencias"][$key]);
            }
        }

        return true;
    }

    public function agregarReferencia()
    {
        array_push($_SESSION['referencias'], json_decode('{"identificador": "' . $this->identificador . '", "nombre": "' . $this->nombre_referencia . '", "apellido": "' . $this->apellido_referencia . '", 
        "puesto": "' . $this->puesto_referencia . '", "telefono": "' . $this->telefono_referencia . '" }', true));

        return true;
    }

    public function verificarTelefono($telefono)
    {
        foreach ($_SESSION["referencias"] as $key => $val) {

            if ($val["telefono"] == $telefono) {

                return true;
            }
        }

        return false;
    }

    public function eliminarReferencia()
    {
        // https://stackoverflow.com/questions/3474381/removing-array-from-multidimensional-array

        foreach ($_SESSION["referencias"] as $key => $val) {

            if ($val["identificador"] == $this->identificador) {

                unset($_SESSION["referencias"][$key]);
            }
        }

        return true;
    }

    public function agregarIdioma()
    {
        array_push($_SESSION['idiomas'], json_decode('{"identificador": "' . $this->identificador . '", "idioma": ' . $this->id_idioma . ', "nivel": "' . $this->nivel_idioma . '" }', true));

        return true;
    }

    public function eliminarIdioma()
    {
        // https://stackoverflow.com/questions/3474381/removing-array-from-multidimensional-array

        foreach ($_SESSION["idiomas"] as $key => $val) {

            if ($val["identificador"] == $this->identificador) {

                unset($_SESSION["idiomas"][$key]);
            }
        }

        return true;
    }

    public function verificarIdioma()
    {
        foreach ($_SESSION["idiomas"] as $key => $val) {
            if ($val["idioma"] == $this->id_idioma) {
                return false;
            }
        }

        return true;
    }

    public function agregarHabilidad()
    {
        array_push($_SESSION['habilidades'], json_decode('{"identificador": "' . $this->identificador . '", "habilidad": ' . $this->id_habilidad . ', "nivel": "' . $this->nivel_habilidad . '" }', true));

        // var_dump($_SESSION['experiencias']); 
        return true;
    }

    public function eliminarHabilidad()
    {
        // https://stackoverflow.com/questions/3474381/removing-array-from-multidimensional-array

        foreach ($_SESSION["habilidades"] as $key => $val) {

            if ($val["identificador"] == $this->identificador) {

                unset($_SESSION["habilidades"][$key]);

                return true;
            }
        }

        return false;
    }

    public function verificarHabilidad()
    {
        foreach ($_SESSION["habilidades"] as $key => $val) {
            if ($val["habilidad"] == $this->id_habilidad) {
                return false;
            }
        }

        return true;
    }

    // Esta función selecciona los campos duplicados en base a un parámetro.
    public function checkDuplicate($value)
    {
        // Se establece la estructura de la sentencia.
        $sql = 'SELECT id_curriculum
                FROM curriculum_aspirantes
                WHERE correo_curriculum = ? OR telefono_movil = ? OR telefono_fijo = ?';
        // Se almacenan los parámetros en el array.
        $params = array($value, $value, $value);
        // Se obtiene la fila y se devuelve el dato.
        return Database::getRow($sql, $params);
    }

    // Esta función selecciona los campos duplicados en base a un parámetro excluyendo un registro.
    public function checkDuplicateWithId($value)
    {
        // Se establece la estructura de la sentencia.
        $sql = 'SELECT id_curriculum
                FROM curriculum_aspirantes
                WHERE (correo_curriculum = ? OR telefono_movil = ? OR telefono_fijo = ?) AND id_curriculum != ?';
        // Se almacenan los parámetros en el array.
        $params = array($value, $value, $value, $this->id);
        // Se obtiene la fila y se devuelve el dato.
        return Database::getRow($sql, $params);
    }

    // Esta función permite agregar un currículum.
    public function agregarCurriculum()
    {
        // Si el atributo no tiene un valor asignado se ejecuta el código.
        if (!empty($this->telefono_fijo)) {
            // Se establece la estructura de la sentencia.
            $sql = "INSERT INTO curriculum_aspirantes (imagen_aspirante, telefono_fijo, telefono_movil, correo_curriculum, id_aspirante)
                VALUES(?, ?, ?, ?, ?)";
            // Se almacenan los parámetros en el array.
            $params = array($this->imagen, $this->telefono_fijo, $this->telefono_movil, $this->correo, $_SESSION['idAspirante']);
        }
        // De lo contrario se ejecuta el código.
        else {
            // Se establece la estructura de la sentencia.
            $sql = "INSERT INTO curriculum_aspirantes (imagen_aspirante, telefono_movil, correo_curriculum, id_aspirante)
                VALUES(?, ?, ?, ?)";
            // Se almacenan los parámetros en el array.
            $params = array($this->imagen, $this->telefono_movil, $this->correo, $_SESSION['idAspirante']);
        }
        // Se ejecuta la sentencia.
        return Database::executeRow($sql, $params);
    }

    // Esta función permite agregar un currículum asignándoselo a un aspirante.
    public function agregarYAsignarCurriculum()
    {
        // Si el atributo no tiene un valor asignado se ejecuta el código.
        if (!empty($this->telefono_fijo)) {
            // Se establece la estructura de la sentencia.
            $sql = "INSERT INTO curriculum_aspirantes (imagen_aspirante, telefono_fijo, telefono_movil, correo_curriculum, id_aspirante)
                    VALUES(?, ?, ?, ?, ?)";
            // Se almacenan los parámetros en el array.
            $params = array($this->imagen, $this->telefono_fijo, $this->telefono_movil, $this->correo, $this->id_aspirante);
        }
        // De lo contrario se ejecuta el código.
        else {
            // Se establece la estructura de la sentencia.
            $sql = "INSERT INTO curriculum_aspirantes (imagen_aspirante, telefono_movil, correo_curriculum, id_aspirante)
                    VALUES(?, ?, ?, ?)";
            // Se almacenan los parámetros en el array.
            $params = array($this->imagen, $this->telefono_movil, $this->correo, $this->id_aspirante);
        }
        // Se ejecuta la sentencia.
        return Database::executeRow($sql, $params);
    }

    // Esta función permite agregar un currículum.
    public function actualizarCurriculum()
    {
        // Si los atributos de imagen y teléfono fijo no tienen un valor asignado se ejecuta el código.
        if (empty($this->telefono_fijo) && empty($this->imagen)) {
            // Se establece la estructura de la sentencia.
            $sql = "UPDATE curriculum_aspirantes 
                    SET telefono_movil = ?, correo_curriculum = ?
                    WHERE id_aspirante = ?";
            // Se almacenan los parámetros en el array.
            $params = array($this->telefono_movil, $this->correo, $_SESSION['idAspirante']);
        } elseif (empty($this->telefono_fijo) && !empty($this->imagen)) {
            // Se establece la estructura de la sentencia.
            $sql = "UPDATE curriculum_aspirantes 
                    SET telefono_movil = ?, correo_curriculum = ?, imagen_aspirante = ?
                    WHERE id_aspirante = ?";
            // Se almacenan los parámetros en el array.
            $params = array($this->telefono_movil, $this->correo, $this->imagen, $_SESSION['idAspirante']);
        } elseif (!empty($this->telefono_fijo) && empty($this->imagen)) {
            // Se establece la estructura de la sentencia.
            $sql = "UPDATE curriculum_aspirantes 
                    SET telefono_movil = ?, correo_curriculum = ?, telefono_fijo = ?
                    WHERE id_aspirante = ?";
            // Se almacenan los parámetros en el array.
            $params = array($this->telefono_movil, $this->correo, $this->telefono_fijo, $_SESSION['idAspirante']);
        }
        // De lo contrario se ejecuta el código.
        else {
            // Se establece la estructura de la sentencia.
            $sql = "UPDATE curriculum_aspirantes 
                    SET telefono_movil = ?, correo_curriculum = ?, telefono_fijo = ?, imagen_aspirante = ?
                    WHERE id_aspirante = ?";
            // Se almacenan los parámetros en el array.
            $params = array($this->telefono_movil, $this->correo, $this->telefono_fijo, $this->imagen, $_SESSION['idAspirante']);
        }
        // Se ejecuta la sentencia.
        return Database::executeRow($sql, $params);
    }

    // Esta función permite agregar un currículum.
    public function actualizarYAsignarCurriculum()
    {
        // Si los atributos de imagen y teléfono fijo no tienen un valor asignado se ejecuta el código.
        if (empty($this->telefono_fijo) && empty($this->imagen)) {
            // Se establece la estructura de la sentencia.
            $sql = "UPDATE curriculum_aspirantes 
                        SET telefono_movil = ?, correo_curriculum = ?, telefono_fijo = null
                        WHERE id_curriculum = ?";
            // Se almacenan los parámetros en el array.
            $params = array($this->telefono_movil, $this->correo, $this->id);
        } elseif (empty($this->telefono_fijo) && !empty($this->imagen)) {
            // Se establece la estructura de la sentencia.
            $sql = "UPDATE curriculum_aspirantes 
                        SET telefono_movil = ?, correo_curriculum = ?, imagen_aspirante = ?, telefono_fijo = null
                        WHERE id_curriculum = ?";
            // Se almacenan los parámetros en el array.
            $params = array($this->telefono_movil, $this->correo, $this->imagen, $this->id);
        } elseif (!empty($this->telefono_fijo) && empty($this->imagen)) {
            // Se establece la estructura de la sentencia.
            $sql = "UPDATE curriculum_aspirantes 
                        SET telefono_movil = ?, correo_curriculum = ?, telefono_fijo = ?
                        WHERE id_curriculum = ?";
            // Se almacenan los parámetros en el array.
            $params = array($this->telefono_movil, $this->correo, $this->telefono_fijo, $this->id);
        }
        // De lo contrario se ejecuta el código.
        else {
            // Se establece la estructura de la sentencia.
            $sql = "UPDATE curriculum_aspirantes 
                        SET telefono_movil = ?, correo_curriculum = ?, telefono_fijo = ?, imagen_aspirante = ?
                        WHERE id_curriculum = ?";
            // Se almacenan los parámetros en el array.
            $params = array($this->telefono_movil, $this->correo, $this->telefono_fijo, $this->imagen, $this->id);
        }
        // Se ejecuta la sentencia.
        return Database::executeRow($sql, $params);
    }

    // Devuelve el id_curriculum de un un currículum asignado al aspirante con la sesión activa.
    public function obtenerIdCv()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'SELECT id_curriculum FROM curriculum_aspirantes WHERE id_aspirante = ?';
        // Se almacena el parámetro en el array.
        $params = array($_SESSION['idAspirante']);
        // Se obtiene la fila y se devuelve el dato.
        return Database::getRow($sql, $params)['id_curriculum'];
    }

    // Devuelve el id_curriculum de un un currículum asignado a un aspirante específico.
    public function getIdCv()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'SELECT id_curriculum FROM curriculum_aspirantes WHERE id_aspirante = ?';
        // Se almacena el parámetro en el array.
        $params = array($this->id_aspirante);
        // Se obtiene la fila y se devuelve el dato.
        return Database::getRow($sql, $params)['id_curriculum'];
    }

    public function agregarEstudios()
    {
        foreach ($_SESSION['estudios'] as $key => $value) {
            foreach ($value as $llave => $valor) {
                if ($llave == 'titulo_estudio') {
                    $titulo_estudio = $valor;
                } else if ($llave == 'id_grado') {
                    $id_grado = $valor;
                } else if ($llave == 'fecha_finalizacion_estudio') {
                    $fecha_finalizacion = $valor;
                } else if ($llave == 'nombre_institucion') {
                    $nombre_institucion = $valor;
                } else if ($llave == 'id_institucion') {
                    $id_institucion = $valor;
                }
            }

            // Caso en que el aspirante cursa el estudio y no se seleccionó una opción de las instituciones.
            if ($fecha_finalizacion == "" and $id_institucion == 0) {
                // Se establece la estructura de la sentencia.
                $sql = 'INSERT INTO estudios_aspirantes (titulo_estudio, id_grado, nombre_institucion, id_curriculum)
                        VALUES(?, ?, ?, ?)';
                // Se almacenan los parámetros en el array.
                $params = array($titulo_estudio, $id_grado, $nombre_institucion, $this->id);
                // Se ejecuta la sentencia.
                Database::executeRow($sql, $params);
            }
            // Caso en que el aspirante finalizó el estudio y no se seleccionó una opción de las instituciones.
            elseif ($fecha_finalizacion != "" and $id_institucion == 0) {
                // Se establece la estructura de la sentencia.
                $sql = 'INSERT INTO estudios_aspirantes (titulo_estudio, id_grado, fecha_finalizacion, nombre_institucion, id_curriculum)
                        VALUES(?, ?, ?, ?, ?)';
                // Se almacenan los parámetros en el array.
                $params = array($titulo_estudio, $id_grado, $fecha_finalizacion, $nombre_institucion, $this->id);
                // Se ejecuta la sentencia.
                Database::executeRow($sql, $params);
            }
            // Caso en que el aspirante cursa el estudio y se seleccionó una opción de las instituciones. 
            elseif ($fecha_finalizacion == "" and $id_institucion != 0) {
                // Se establece la estructura de la sentencia.
                $sql = 'INSERT INTO estudios_aspirantes (titulo_estudio, id_grado, id_institucion, id_curriculum)
                        VALUES(?, ?, ?, ?)';
                // Se almacenan los parámetros en el array.
                $params = array($titulo_estudio, $id_grado, $id_institucion, $this->id);
                // Se ejecuta la sentencia.
                Database::executeRow($sql, $params);
            }
            // Caso en que el aspirante finalizó el estudio y se seleccionó una opción de las instituciones. 
            else {
                // Se establece la estructura de la sentencia.
                $sql = 'INSERT INTO estudios_aspirantes (titulo_estudio, id_grado, fecha_finalizacion, id_institucion, id_curriculum)
                        VALUES(?, ?, ?, ?, ?)';
                // Se almacenan los parámetros en el array.
                $params = array($titulo_estudio, $id_grado, $fecha_finalizacion, $id_institucion, $this->id);
                // Se ejecuta la sentencia.
                Database::executeRow($sql, $params);
            }
        }

        // Se inicializa el array que almacena los estudios del currículum.
        $_SESSION['estudios'] = array();

        return true;
    }

    public function registrarEstudio()
    {
        // Caso en que el aspirante cursa el estudio y no se seleccionó una opción de las instituciones.
        if ($this->fecha_finalizacion_estudio == "" and $this->id_institucion == 0) {
            // Se establece la estructura de la sentencia.
            $sql = 'INSERT INTO estudios_aspirantes (titulo_estudio, id_grado, nombre_institucion, id_curriculum)
                                VALUES(?, ?, ?, ?)';
            // Se almacenan los parámetros en el array.
            $params = array($this->titulo_estudio, $this->id_grado, $this->nombre_institucion, $this->id);
            // Se ejecuta la sentencia.
            return Database::executeRow($sql, $params);
        }
        // Caso en que el aspirante finalizó el estudio y no se seleccionó una opción de las instituciones.
        elseif ($this->fecha_finalizacion_estudio != "" and $this->id_institucion == 0) {
            // Se establece la estructura de la sentencia.
            $sql = 'INSERT INTO estudios_aspirantes (titulo_estudio, id_grado, fecha_finalizacion, nombre_institucion, id_curriculum)
                                VALUES(?, ?, ?, ?, ?)';
            // Se almacenan los parámetros en el array.
            $params = array($this->titulo_estudio, $this->id_grado, $this->fecha_finalizacion_estudio, $this->nombre_institucion, $this->id);
            // Se ejecuta la sentencia.
            return Database::executeRow($sql, $params);
        }
        // Caso en que el aspirante cursa el estudio y se seleccionó una opción de las instituciones. 
        elseif ($this->fecha_finalizacion_estudio == "" and $this->id_institucion != 0) {
            // Se establece la estructura de la sentencia.
            $sql = 'INSERT INTO estudios_aspirantes (titulo_estudio, id_grado, id_institucion, id_curriculum)
                                VALUES(?, ?, ?, ?)';
            // Se almacenan los parámetros en el array.
            $params = array($this->titulo_estudio, $this->id_grado, $this->id_institucion, $this->id);
            // Se ejecuta la sentencia.
            return Database::executeRow($sql, $params);
        }
        // Caso en que el aspirante finalizó el estudio y se seleccionó una opción de las instituciones. 
        else {
            // Se establece la estructura de la sentencia.
            $sql = 'INSERT INTO estudios_aspirantes (titulo_estudio, id_grado, fecha_finalizacion, id_institucion, id_curriculum)
                                VALUES(?, ?, ?, ?, ?)';
            // Se almacenan los parámetros en el array.
            $params = array($this->titulo_estudio, $this->id_grado, $this->fecha_finalizacion_estudio, $this->id_institucion, $this->id);
            // Se ejecuta la sentencia.
            return Database::executeRow($sql, $params);
        }
    }

    public function agregarCertificados()
    {
        foreach ($_SESSION['formacionComplementaria'] as $key => $value) {
            foreach ($value as $llave => $valor) {
                if ($llave == 'titulo_certificado') {
                    $titulo_certificado = $valor;
                } else if ($llave == 'institucion_certificado') {
                    $institucion_certificado = $valor;
                } else if ($llave == 'fecha_finalizacion') {
                    $fecha_finalizacion = $valor;
                }
            }

            // Se establece la estructura de la sentencia.
            $sql = 'INSERT INTO certificados_aspirantes (titulo_certificado, institucion_certificado, fecha_finalizacion, id_curriculum)
                    VALUES(?, ?, ?, ?)';
            // Se almacenan los parámetros en el array.
            $params = array($titulo_certificado, $institucion_certificado, $fecha_finalizacion, $this->id);
            // Se ejecuta la sentencia.
            Database::executeRow($sql, $params);
        }

        // Se inicializa el array que almacena la formación complementaria del currículum.
        $_SESSION['formacionComplementaria'] = array();

        return true;
    }

    public function registrarCertificado()
    {

        // Se establece la estructura de la sentencia.
        $sql = 'INSERT INTO certificados_aspirantes (titulo_certificado, institucion_certificado, fecha_finalizacion, id_curriculum)
                    VALUES(?, ?, ?, ?)';
        // Se almacenan los parámetros en el array.
        $params = array($this->titulo_certificado, $this->institucion_certificado, $this->fecha_finalizacion_certificado, $this->id);
        // Se ejecuta la sentencia.
        return Database::executeRow($sql, $params);
    }

    public function agregarExperiencias()
    {
        foreach ($_SESSION['experiencias'] as $key => $value) {
            foreach ($value as $llave => $valor) {
                if ($llave == 'empresa') {
                    $empresa = $valor;
                } else if ($llave == 'cargo') {
                    $cargo = $valor;
                } else if ($llave == 'rubro') {
                    $rubro = $valor;
                } else if ($llave == 'area') {
                    $area = $valor;
                } else if ($llave == 'mes_inicio') {
                    $mes_inicio = $valor;
                } else if ($llave == 'year_inicio') {
                    $year_inicio = $valor;
                } else if ($llave == 'mes_final') {
                    $mes_final = $valor;
                } else if ($llave == 'year_final') {
                    $year_final = $valor;
                } else if ($llave == 'descripcion') {
                    $descripcion = $valor;
                }
            }

            // Se concatena el año de inicio con el mes en la variable.
            $fecha_inicio = "$year_inicio-$mes_inicio-01";
            // Se concatena el año de finalización con el mes en la variable.
            $fecha_fin = "$year_final-$mes_final-01";

            // Caso en que el aspirante trabaja actualmente en la experiencia.
            if ($mes_final == "") {
                // Se establece la estructura de la sentencia.
                $sql = 'INSERT INTO experiencias_aspirantes (nombre_empresa, nombre_cargo, fecha_inicio, descripcion_puesto, id_area, id_rubro, id_curriculum)
                        VALUES(?, ?, ?, ?, ?, ?, ?)';
                // Se almacenan los parámetros en el array.
                $params = array($empresa, $cargo, $fecha_inicio, $descripcion, $area, $rubro, $this->id);
                // Se ejecuta la sentencia.
                Database::executeRow($sql, $params);
            }
            // Caso en que el aspirante no trabaja en la experiencia. 
            else {
                // Se establece la estructura de la sentencia.
                $sql = 'INSERT INTO experiencias_aspirantes (nombre_empresa, nombre_cargo, fecha_inicio, fecha_fin, descripcion_puesto, id_area, id_rubro, id_curriculum)
                        VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
                // Se almacenan los parámetros en el array.
                $params = array($empresa, $cargo, $fecha_inicio, $fecha_fin, $descripcion, $area, $rubro, $this->id);
                // Se ejecuta la sentencia.
                Database::executeRow($sql, $params);
            }
        }

        // Se inicializa el array que almacena las experiencias laborales del currículum.
        $_SESSION['experiencias'] = array();

        return true;
    }

    public function registrarExperiencia()
    {
        // Se concatena el año de inicio con el mes en la variable.
        $fecha_inicio = "$this->year_inicio-$this->mes_inicio-01";
        // Se concatena el año de finalización con el mes en la variable.
        $fecha_fin = "$this->year_final-$this->mes_final-01";

        // Caso en que el aspirante trabaja actualmente en la experiencia.
        if ($this->mes_final == "") {
            // Se establece la estructura de la sentencia.
            $sql = 'INSERT INTO experiencias_aspirantes (nombre_empresa, nombre_cargo, fecha_inicio, descripcion_puesto, id_area, id_rubro, id_curriculum)
                        VALUES(?, ?, ?, ?, ?, ?, ?)';
            // Se almacenan los parámetros en el array.
            $params = array($this->empresa, $this->cargo, $fecha_inicio, $this->descripcion, $this->id_area, $this->id_rubro, $this->id);
            // Se ejecuta la sentencia.
            return Database::executeRow($sql, $params);
        }
        // Caso en que el aspirante no trabaja en la experiencia. 
        else {
            // Se establece la estructura de la sentencia.
            $sql = 'INSERT INTO experiencias_aspirantes (nombre_empresa, nombre_cargo, fecha_inicio, fecha_fin, descripcion_puesto, id_area, id_rubro, id_curriculum)
                        VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
            // Se almacenan los parámetros en el array.
            $params = array($this->empresa, $this->cargo, $fecha_inicio, $fecha_fin, $this->descripcion, $this->id_area, $this->id_rubro, $this->id);
            // Se ejecuta la sentencia.
            return Database::executeRow($sql, $params);
        }
    }

    public function agregarReferencias()
    {
        foreach ($_SESSION['referencias'] as $key => $value) {
            foreach ($value as $llave => $valor) {
                if ($llave == 'nombre') {
                    $nombre = $valor;
                } else if ($llave == 'apellido') {
                    $apellido = $valor;
                } else if ($llave == 'puesto') {
                    $puesto = $valor;
                } else if ($llave == 'telefono') {
                    $telefono = $valor;
                }
            }

            // Se establece la estructura de la sentencia.
            $sql = 'INSERT INTO referencias_aspirantes (nombre_referencia, apellido_referencia, puesto_trabajo, telefono_referencia, id_curriculum)
                    VALUES(?, ?, ?, ?, ?)';
            // Se almacenan los parámetros en el array.
            $params = array($nombre, $apellido, $puesto, $telefono, $this->id);
            // Se ejecuta la sentencia.
            Database::executeRow($sql, $params);
        }

        // Se inicializa el array que almacena las referencias laborales del currículum.
        $_SESSION['referencias'] = array();

        return true;
    }

    public function registrarReferencia()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'INSERT INTO referencias_aspirantes (nombre_referencia, apellido_referencia, puesto_trabajo, telefono_referencia, id_curriculum)
                    VALUES(?, ?, ?, ?, ?)';
        // Se almacenan los parámetros en el array.
        $params = array($this->nombre_referencia, $this->apellido_referencia, $this->puesto_referencia, $this->telefono_referencia, $this->id);
        // Se ejecuta la sentencia.
        return Database::executeRow($sql, $params);
    }

    public function agregarIdiomas()
    {
        foreach ($_SESSION['idiomas'] as $key => $value) {
            foreach ($value as $llave => $valor) {
                if ($llave == 'idioma') {
                    $idioma = $valor;
                } else if ($llave == 'nivel') {
                    $nivel = $valor;
                }
            }

            // Se establece la estructura de la sentencia.
            $sql = 'INSERT INTO idiomas_aspirantes (nivel_idioma, id_idioma, id_curriculum)
                    VALUES(?, ?, ?)';
            // Se almacenan los parámetros en el array.
            $params = array($nivel, $idioma, $this->id);
            // Se ejecuta la sentencia.
            Database::executeRow($sql, $params);
        }

        // Se inicializa el array que almacena los idiomas del currículum.
        $_SESSION['idiomas'] = array();

        return true;
    }

    public function registrarIdioma()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'INSERT INTO idiomas_aspirantes (nivel_idioma, id_idioma, id_curriculum)
                    VALUES(?, ?, ?)';
        // Se almacenan los parámetros en el array.
        $params = array($this->nivel_idioma, $this->id_idioma, $this->id);
        // Se ejecuta la sentencia.
        return Database::executeRow($sql, $params);
    }

    public function agregarHabilidades()
    {
        foreach ($_SESSION['habilidades'] as $key => $value) {
            foreach ($value as $llave => $valor) {
                if ($llave == 'habilidad') {
                    $habilidad = $valor;
                } else if ($llave == 'nivel') {
                    $nivel = $valor;
                }
            }

            // Se establece la estructura de la sentencia.
            $sql = 'INSERT INTO habilidades_aspirantes (nivel_habilidad, id_habilidad, id_curriculum)
                    VALUES(?, ?, ?)';
            // Se almacenan los parámetros en el array.
            $params = array($nivel, $habilidad, $this->id);
            // Se ejecuta la sentencia.
            Database::executeRow($sql, $params);
        }

        // Se inicializa el array que almacena las habilidades del currículum.
        $_SESSION['habilidades'] = array();

        return true;
    }

    public function registrarHabilidad()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'INSERT INTO habilidades_aspirantes (nivel_habilidad, id_habilidad, id_curriculum)
                    VALUES(?, ?, ?)';
        // Se almacenan los parámetros en el array.
        $params = array($this->nivel_habilidad, $this->id_habilidad, $this->id);
        // Se ejecuta la sentencia.
        return Database::executeRow($sql, $params);
    }

    public function eliminarEstudios()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'DELETE FROM estudios_aspirantes WHERE id_curriculum = ?';
        // Se almacena el parámetro en el array.
        $params = array($this->id);
        // Se ejecuta la sentencia y se retorna el estado del query.
        return Database::executeRow($sql, $params);
    }

    public function eliminarCertificados()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'DELETE FROM certificados_aspirantes WHERE id_curriculum = ?';
        // Se almacena el parámetro en el array.
        $params = array($this->id);
        // Se ejecuta la sentencia y se retorna el estado del query.
        return Database::executeRow($sql, $params);
    }

    public function eliminarExperiencias()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'DELETE FROM experiencias_aspirantes WHERE id_curriculum = ?';
        // Se almacena el parámetro en el array.
        $params = array($this->id);
        // Se ejecuta la sentencia y se retorna el estado del query.
        return Database::executeRow($sql, $params);
    }

    public function eliminarReferencias()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'DELETE FROM referencias_aspirantes WHERE id_curriculum = ?';
        // Se almacena el parámetro en el array.
        $params = array($this->id);
        // Se ejecuta la sentencia y se retorna el estado del query.
        return Database::executeRow($sql, $params);
    }

    public function eliminarIdiomas()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'DELETE FROM idiomas_aspirantes WHERE id_curriculum = ?';
        // Se almacena el parámetro en el array.
        $params = array($this->id);
        // Se ejecuta la sentencia y se retorna el estado del query.
        return Database::executeRow($sql, $params);
    }

    public function eliminarHabilidades()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'DELETE FROM habilidades_aspirantes WHERE id_curriculum = ?';
        // Se almacena el parámetro en el array.
        $params = array($this->id);
        // Se ejecuta la sentencia y se retorna el estado del query.
        return Database::executeRow($sql, $params);
    }

    public function getCurriculum()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'SELECT * FROM curriculum_aspirantes WHERE id_aspirante = ?';
        // Se almacena el parámetro en el array.
        $params = array($_SESSION['idAspirante']);
        // Se obtiene la fila y se devuelve el dato.
        return Database::getRow($sql, $params);
    }

    public function readCurriculum()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'SELECT * FROM curriculum_aspirantes WHERE id_curriculum = ?';
        // Se almacena el parámetro en el array.
        $params = array($this->id);
        // Se obtiene la fila y se devuelve el dato.
        return Database::getRow($sql, $params);
    }

    public function seleccionarIdAspirante()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'SELECT id_aspirante FROM curriculum_aspirantes WHERE id_curriculum = ?';
        // Se almacena el parámetro en el array.
        $params = array($this->id);
        // Se obtiene la fila y se devuelve el dato.
        return Database::getRow($sql, $params);
    }

    public function getEstudios()
    {
        $sql = 'SELECT * FROM estudios_aspirantes WHERE id_curriculum = ?';

        $params = array($this->id);

        return Database::getRows($sql, $params);
    }

    public function getCertificados()
    {
        $sql = 'SELECT * FROM certificados_aspirantes WHERE id_curriculum = ?';

        $params = array($this->id);

        return Database::getRows($sql, $params);
    }

    public function getExperiencias()
    {
        $sql = 'SELECT * FROM experiencias_aspirantes WHERE id_curriculum = ?';

        $params = array($this->id);

        return Database::getRows($sql, $params);
    }

    public function getReferencias()
    {
        $sql = 'SELECT * FROM referencias_aspirantes WHERE id_curriculum = ?';

        $params = array($this->id);

        return Database::getRows($sql, $params);
    }

    public function getIdiomas()
    {
        $sql = 'SELECT * FROM idiomas_aspirantes WHERE id_curriculum = ?';

        $params = array($this->id);

        return Database::getRows($sql, $params);
    }

    public function getHabilidades()
    {
        $sql = 'SELECT * FROM habilidades_aspirantes WHERE id_curriculum = ?';

        $params = array($this->id);

        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO curriculum_aspirantes(id_aspirante, nombre_aspirante)
              VALUES (?, ?)';
        $params = array($this->id_aspirante, $this->nombre_aspirante);
        return Database::executeRow($sql, $params);
    }
    public function readAll()
    {
        $sql = "SELECT 
        a.id_aspirante, 
        ca.imagen_aspirante AS IMAGEN, 
        ca.id_curriculum,
        CONCAT(a.nombre_aspirante, ' ', a.apellido_aspirante) AS NOMBRE,
        (SELECT COUNT(*) FROM estudios_aspirantes ea WHERE ea.id_curriculum = ca.id_curriculum) AS estudios,
        (SELECT COUNT(*) FROM experiencias_aspirantes exa WHERE exa.id_curriculum = ca.id_curriculum) AS experiencias,
        (SELECT COUNT(*) FROM idiomas_aspirantes ia WHERE ia.id_curriculum = ca.id_curriculum) AS idiomas
    FROM 
        aspirantes a
    JOIN 
        curriculum_aspirantes ca ON a.id_aspirante = ca.id_aspirante
    ORDER BY 
        a.nombre_aspirante;
    ";

        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT a.id_aspirante, a.nombre_aspirante
            FROM aspirantes a
            JOIN curriculum_aspirantes ca ON a.id_aspirante = ca.id_aspirante
            WHERE a.id_aspirante = ?
            ORDER BY a.nombre_aspirante';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readOneData()
    {
        $sql = 'SELECT 
                    a.nombre_aspirante,
                    a.apellido_aspirante,
                    TIMESTAMPDIFF(YEAR, a.fecha_nacimiento, CURDATE()) AS Edad,
                    a.genero_aspirante,
                    c.telefono_fijo,
                    c.telefono_movil,
                    c.correo_curriculum,
                    c.imagen_aspirante
                FROM 
                    curriculum_aspirantes c
                    JOIN aspirantes a ON c.id_aspirante = a.id_aspirante
                WHERE 
                    c.id_curriculum = ?;
                ';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }


    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM vista_tabla_curriculum_privado
        WHERE NOMBRE LIKE ? OR nombre_institucion_estudio LIKE ? OR titulo_certificado LIKE ? OR nombre_empresa LIKE ? OR nombre_cargo LIKE ? OR descripcion_puesto LIKE ? OR nombre_area LIKE ? OR nombre_idioma LIKE ? OR nombre_habilidad LIKE ? OR correo_aspirante LIKE ? OR APELLIDO LIKE ? OR NOMBRE LIKE ? OR titulo_certificado LIKE ? OR titulo_estudio LIKE ? OR nombre_grado LIKE ? OR puesto_trabajo LIKE ?';
        $params = array($value, $value, $value, $value, $value, $value, $value, $value, $value, $value, $value, $value, $value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }




    public function readCurriculums()
    {
        $sql = 'SELECT * FROM vista_tabla_curriculum
        WHERE ID LIKE ?';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    public function readOneDataExperiencias()
    {
        $sql = 'SELECT ea.*, al.nombre_area, re.nombre_rubro
        
                FROM experiencias_aspirantes ea
                JOIN areas_laborales al ON ea.id_area = al.id_area
                JOIN rubros_empresas re ON ea.id_rubro = re.id_rubro
                WHERE ea.id_curriculum = ?;';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    public function readOneDataEstudios()
    {
        $sql = "SELECT es.titulo_estudio, es.fecha_finalizacion, es.id_estudio, es.id_grado, es.id_institucion, es.id_curriculum,  ga.nombre_grado, es.nombre_institucion AS otra_institucion ,ins.nombre_institucion AS institucion_estudio
        FROM 
            estudios_aspirantes es
        JOIN 
            grados_academicos ga ON es.id_grado = ga.id_grado
        LEFT JOIN 
            instituciones ins ON es.id_institucion = ins.id_institucion
        WHERE 
            es.id_curriculum =?";
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE aspirantes a
                JOIN curriculum_aspirantes c ON a.id_aspirante = c.id_aspirante
                SET a.nombre_aspirante = ?
                WHERE c.id_curriculum = ?';
        $params = array($this->nombre_aspirante, $this->id_aspirante);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = "SET @id_curriculum = ?;
                DELETE FROM estudios_aspirantes WHERE id_curriculum = @id_curriculum;
                DELETE FROM certificados_aspirantes WHERE id_curriculum = @id_curriculum;
                DELETE FROM experiencias_aspirantes WHERE id_curriculum = @id_curriculum;
                DELETE FROM idiomas_aspirantes WHERE id_curriculum = @id_curriculum;
                DELETE FROM habilidades_aspirantes WHERE id_curriculum = @id_curriculum;
                DELETE FROM referencias_aspirantes WHERE id_curriculum = @id_curriculum;
                DELETE FROM curriculum_aspirantes WHERE id_curriculum = @id_curriculum;";
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readAspirantes()
    {
        // Se establece la estructura de la sentencia.
        $sql = 'SELECT aspirantes.id_aspirante, nombre_aspirante, apellido_aspirante, correo_aspirante
	            FROM aspirantes
	            WHERE NOT EXISTS (SELECT 1 FROM curriculum_aspirantes WHERE curriculum_aspirantes.id_aspirante = aspirantes.id_aspirante);';
        // Se ejecuta el query y se retorna el conjunto de datos.
        return Database::getRows($sql);
    }
}
