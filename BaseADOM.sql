DROP DATABASE IF EXISTS dbadom;

CREATE DATABASE IF NOT EXISTS dbadom;

USE dbadom;

CREATE TABLE administradores(
	id_administrador INT PRIMARY KEY AUTO_INCREMENT,
	correo_administrador VARCHAR(100) UNIQUE NOT NULL,
	clave_administrador VARCHAR(100) NOT NULL,
	nombre_administrador VARCHAR(50) NOT NULL,
	apellido_administrador VARCHAR(50) NOT NULL,
	estado_administrador TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE aspirantes(
	id_aspirante INT PRIMARY KEY AUTO_INCREMENT,
	nombre_aspirante VARCHAR(50) NOT NULL,
	apellido_aspirante VARCHAR(50) NOT NULL,
	correo_aspirante VARCHAR(100) UNIQUE NOT NULL,
	clave_aspirante VARCHAR(100) NOT NULL,
	fecha_nacimiento DATE NOT NULL,
	genero_aspirante ENUM('Hombre','Mujer') NOT NULL,
	estado_aspirante TINYINT(1) NOT NULL DEFAULT 1,
	id_administrador INT NULL,
	CONSTRAINT fk_admin_asp
	FOREIGN KEY (id_administrador)
	REFERENCES administradores(id_administrador)
);

CREATE TABLE grados_academicos(
	id_grado INT PRIMARY KEY AUTO_INCREMENT,
	nombre_grado VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE instituciones(
	id_institucion INT PRIMARY KEY AUTO_INCREMENT,
	nombre_institucion VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE idiomas(
	id_idioma INT PRIMARY KEY AUTO_INCREMENT,
	nombre_idioma VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE rubros_empresas(
	id_rubro INT PRIMARY KEY AUTO_INCREMENT,
	nombre_rubro VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE areas_laborales(
	id_area INT PRIMARY KEY AUTO_INCREMENT,
	nombre_area VARCHAR(40) UNIQUE,
	id_rubro INT NOT NULL,
	CONSTRAINT fk_rubro_area
	FOREIGN KEY (id_rubro)
	REFERENCES rubros_empresas(id_rubro)
);

CREATE TABLE curriculum_aspirantes(
	id_curriculum INT PRIMARY KEY AUTO_INCREMENT,
	imagen_aspirante VARCHAR(200) NULL,
	telefono_fijo VARCHAR(9) UNIQUE NOT NULL,
	telefono_movil VARCHAR(9) UNIQUE NOT NULL,
	correo_aspirante VARCHAR(50) UNIQUE NOT NULL,
	id_aspirante INT NOT NULL,
	CONSTRAINT fk_aspirante_cv
	FOREIGN KEY (id_aspirante)
	REFERENCES aspirantes(id_aspirante)
);

CREATE TABLE estudios_aspirantes(
	id_estudio INT PRIMARY KEY AUTO_INCREMENT,
	titulo_estudio VARCHAR(70) NOT NULL,
	id_grado INT NOT NULL,
	fecha_finalizacion DATE NULL,
	nombre_institucion VARCHAR(100) NULL,
	estado_estudio ENUM('Cursando', 'Finalizado', 'Incompleto'),
	id_institucion INT NULL,
	id_curriculum INT NOT NULL,
	CONSTRAINT fk_grado_estudio
	FOREIGN KEY (id_grado)
	REFERENCES grados_academicos(id_grado),
	CONSTRAINT fk_curriculum_estudio
	FOREIGN KEY (id_curriculum)
	REFERENCES curriculum_aspirantes(id_curriculum),
	CONSTRAINT fk_institucion_estudio
	FOREIGN KEY (id_institucion)
	REFERENCES instituciones(id_institucion)
);

CREATE TABLE certificados_aspirantes(
	id_certificado INT PRIMARY KEY AUTO_INCREMENT,
	titulo_certificado VARCHAR(70) NOT NULL,
	institucion_certificado VARCHAR(70) NOT NULL,
	fecha_finalizacion DATE NOT NULL,
	id_curriculum INT NOT NULL,
	CONSTRAINT fk_curriculum_certif
	FOREIGN KEY (id_curriculum)
	REFERENCES curriculum_aspirantes(id_curriculum)
);

CREATE TABLE experiencias_aspirantes(
	id_experiencia INT PRIMARY KEY AUTO_INCREMENT,
	nombre_empresa VARCHAR(50) NOT NULL,
	nombre_cargo VARCHAR(50) NOT NULL,
	fecha_inicio DATE NOT NULL,
	fecha_fin DATE NULL,
	descripcion_puesto VARCHAR(300) NOT NULL,
	estado_experiencia ENUM('Antiguo trabajo', 'Trabajo actual') NOT NULL,
	id_area INT NOT NULL,
	id_rubro INT NOT NULL,
	id_curriculum INT NOT NULL,
	CONSTRAINT fk_area_asp
	FOREIGN KEY (id_area)
	REFERENCES areas_laborales(id_area),
	CONSTRAINT fk_rubro_aspirante
	FOREIGN KEY (id_rubro)
	REFERENCES rubros_empresas(id_rubro),
	CONSTRAINT fk_curr_exp
	FOREIGN KEY (id_curriculum)
	REFERENCES curriculum_aspirantes (id_curriculum)
);

CREATE TABLE idiomas_aspirantes(
	id_idioma_aspirante INT PRIMARY KEY AUTO_INCREMENT,
	nivel_idioma ENUM('Básico', 'Intermedio', 'Avanzado') NOT NULL,
	id_idioma INT NOT NULL,
	id_curriculum INT NOT NULL,
	CONSTRAINT fk_idioma_aspirante
	FOREIGN KEY (id_idioma)
	REFERENCES idiomas(id_idioma),
	CONSTRAINT fk_curriculum_aspirante
	FOREIGN KEY (id_curriculum)
	REFERENCES curriculum_aspirantes(id_curriculum)
);

CREATE TABLE habilidades_aspirantes(
	id_habilidad INT PRIMARY KEY AUTO_INCREMENT,
	nombre_habilidad VARCHAR(30) NOT NULL,
	id_curriculum INT NOT NULL,
	CONSTRAINT fk_curriculum_habilidad
	FOREIGN KEY (id_curriculum)
	REFERENCES curriculum_aspirantes(id_curriculum)
);

CREATE TABLE referencias_aspirantes(
	id_referencia INT PRIMARY KEY AUTO_INCREMENT,
	nombre_referencia VARCHAR(40) NOT NULL,
	apellido_referencia VARCHAR(40) NOT NULL,
	puesto_trabajo VARCHAR(50) NOT NULL,
	telefono_referencia VARCHAR(9) UNIQUE NOT NULL,
	id_curriculum INT NOT NULL,
	CONSTRAINT fk_curriculum_refer
	FOREIGN KEY (id_curriculum)
	REFERENCES curriculum_aspirantes(id_curriculum)
);


-- PROCEDIMIENTO

-- PROCEDIMIENTOS AGREGAR ADMINISTRADOR

DROP PROCEDURE IF EXISTS insertar_administrador_validado;
DELIMITER $$
CREATE PROCEDURE insertar_administrador_validado(
   IN p_nombre_administrador VARCHAR(50),
   IN p_apellido_administrador VARCHAR(50),
   IN p_clave_administrador VARCHAR(100),
   IN p_correo_administrador VARCHAR(100)
)
BEGIN
    IF p_correo_administrador REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
            INSERT INTO administradores (nombre_administrador, apellido_administrador, clave_administrador, correo_administrador)
            VALUES(p_nombre_administrador, p_apellido_administrador, p_clave_administrador, p_correo_administrador);
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Formato de correo electrónico no válido';
    END IF;
END;
$$

-- PROCEDIMIENTO ACTUALIZAR ADMINISTRADOR


DROP PROCEDURE IF EXISTS actualizar_administrador_validado;
DELIMITER $$
CREATE PROCEDURE actualizar_administrador_validado(
   IN p_id_administrador INT,
   IN p_nombre_administrador VARCHAR(50),
   IN p_apellido_administrador VARCHAR(50),
   IN p_correo_administrador VARCHAR(100)
)
BEGIN
    IF p_correo_administrador REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
            UPDATE administradores SET nombre_administrador = p_nombre_administrador, 
            apellido_administrador = p_apellido_administrador, 
            correo_administrador = p_correo_administrador
            WHERE id_administrador = p_id_administrador;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Formato de correo electrónico no válido';
    END IF;
END;
$$

-- PROCEDIMINETO ELIMINAR ADMINISTRADOR

DROP PROCEDURE IF EXISTS eliminar_administrador;
DELIMITER $$
CREATE PROCEDURE eliminar_administrador(
    IN p_id_administrador INT
)
BEGIN
	DELETE FROM administradores
	WHERE id_administrador = p_id_administrador;
END;
$$

-- PROCEDIMIENTO Agregar aspirante
ca
DROP PROCEDURE IF EXISTS insertar_aspirante_validado;
DELIMITER $$
CREATE PROCEDURE insertar_aspirante_validado(
   IN p_nombre_aspirante VARCHAR(50),
   IN p_apellido_aspirante VARCHAR(50),
   IN p_clave_aspirante VARCHAR(100),
   IN p_correo_aspirante VARCHAR(100),
   IN p_genero_aspirante VARCHAR(10),
   IN p_fecha_nacimiento_aspirante DATE
)
BEGIN
    -- Validar el formato del correo electrónico
    IF p_correo_aspirante REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        -- Validar el género
        IF p_genero_aspirante IN ('Hombre', 'Mujer') THEN
            INSERT INTO aspirantes (
                nombre_aspirante, 
                apellido_aspirante, 
                clave_aspirante, 
                correo_aspirante, 
                genero_aspirante, 
                fecha_nacimiento
            )
            VALUES (
                p_nombre_aspirante, 
                p_apellido_aspirante, 
                p_clave_aspirante, 
                p_correo_aspirante, 
                p_genero_aspirante, 
                p_fecha_nacimiento_aspirante
            );
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Género no válido';
        END IF;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Formato de correo electrónico no válido';
    END IF;
END;
$$
DELIMITER ;

-- PROCEDIMIENTO actualizar aspirante 
DROP PROCEDURE IF EXISTS actualizar_aspirante_validado;
DELIMITER $$
CREATE PROCEDURE actualizar_aspirante_validado(
   IN p_id_aspirante INT,
   IN p_nombre_aspirante VARCHAR(50),
   IN p_apellido_aspirante VARCHAR(50),
   IN p_correo_aspirante VARCHAR(100),
   IN p_genero_aspirante ENUM('Hombre','Mujer'),
   IN p_fecha_nacimiento_aspirante DATE
   
)
BEGIN
    IF p_correo_aspirante REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
		IF p_genero_aspirante IN ('Hombre', 'Mujer') THEN
			UPDATE aspirantes SET nombre_aspirante = p_nombre_aspirante, apellido_aspirante = p_apellido_aspirante, 
			correo_aspirante = p_correo_aspirante, fecha_nacimiento = p_fecha_nacimiento_aspirante,
			genero_aspirante = p_genero_aspirante
			WHERE id_aspirante = p_id_aspirante;
		ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Género no válido';
        END IF;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Formato de correo electrónico no válido';
    END IF;
END;
$$

-- PROCEDIMINETO ELIMINAR apirante

DROP PROCEDURE IF EXISTS eliminar_aspirante;
DELIMITER $$
CREATE PROCEDURE eliminar_aspirante(
    IN p_id_aspirante INT
)
BEGIN
	DELETE FROM aspirantes
	WHERE id_aspirante = p_id_aspirante;
END;
$$

-- PROCEDIMIENTOS AGREGAR idiomas

DROP PROCEDURE IF EXISTS insertar_idioma_validado;
DELIMITER $$
CREATE PROCEDURE insertar_idioma_validado(
   IN p_nombre_idioma VARCHAR(30)
)
BEGIN
	INSERT INTO idiomas (nombre_idioma)
	VALUES(p_nombre_idioma);
END;
$$


-- PROCEDIMIENTO ACTUALIZAR idioma

DROP PROCEDURE IF EXISTS actualizar_idioma_validado;
DELIMITER $$
CREATE PROCEDURE actualizar_idioma_validado(
   IN p_id_idioma INT,
   IN p_nombre_idioma VARCHAR(30)
)
BEGIN
	UPDATE idiomas SET nombre_idioma = p_nombre_idioma
	WHERE id_idioma = p_id_idioma;
END;
$$

-- PROCEDIMINETO ELIMINAR idioma 
DROP PROCEDURE IF EXISTS eliminar_idioma;
DELIMITER $$
CREATE PROCEDURE eliminar_idioma(
    IN p_id_idioma INT
)
BEGIN
	DELETE FROM idiomas
	WHERE id_idioma = p_id_idioma;
END;
$$


-- PROCEDIMIENTOS AGREGAR grado academico

DROP PROCEDURE IF EXISTS insertar_grado_validado;
DELIMITER $$
CREATE PROCEDURE insertar_grado_validado(
   IN p_nombre_grado VARCHAR(60)
)
BEGIN
	INSERT INTO grados_academicos (nombre_grado)
	VALUES(p_nombre_grado);
END;
$$


-- PROCEDIMIENTO ACTUALIZAR grado

DROP PROCEDURE IF EXISTS actualizar_grado_validado;
DELIMITER $$
CREATE PROCEDURE actualizar_grado_validado(
   IN p_id_grado INT,
   IN p_nombre_grado VARCHAR(60)
)
BEGIN
	UPDATE grados_academicos SET nombre_grado = p_nombre_grado
	WHERE id_grado = p_id_grado;
END;
$$

-- PROCEDIMINETO ELIMINAR grado
DROP PROCEDURE IF EXISTS eliminar_grado;
DELIMITER $$
CREATE PROCEDURE eliminar_grado(
    IN p_id_grado INT
)
BEGIN
	DELETE FROM grados_academicos
	WHERE id_grado = p_id_grado;
END;
$$




-- VISTA

-- VISTA para tabla administradores
DROP VIEW IF EXISTS vista_tabla_administradores;
DELIMITER $$
CREATE VIEW vista_tabla_administradores AS
SELECT id_administrador AS 'ID', 
		nombre_administrador AS 'NOMBRE',
        apellido_administrador AS 'APELLIDO',
		correo_administrador AS 'CORREO', 
    CASE 
        WHEN estado_administrador = 1 THEN 'Activo'
        WHEN estado_administrador = 0 THEN 'Bloqueado'
    END AS 'ESTADO'
FROM administradores;
$$ 

-- VISTA para tabla aspirante
DROP VIEW IF EXISTS vista_tabla_aspirantes;
DELIMITER $$
CREATE VIEW vista_tabla_aspirantes AS
SELECT id_aspirante AS 'ID', 
		nombre_aspirante AS 'NOMBRE',
        apellido_aspirante AS 'APELLIDO',
		correo_aspirante AS 'CORREO', 
        fecha_nacimiento AS 'FECHA',
        genero_aspirante AS 'GENERO',
    CASE 
        WHEN estado_aspirante = 1 THEN 'Activo'
        WHEN estado_aspirante = 0 THEN 'Bloqueado'
    END AS 'ESTADO'
FROM aspirantes;
$$ 

-- VISTA para tabla idioma
DROP VIEW IF EXISTS vista_tabla_idiomas;
DELIMITER $$
CREATE VIEW vista_tabla_idiomas AS
SELECT id_idioma AS 'ID', 
		nombre_idioma AS 'NOMBRE'
FROM idiomas;
$$ 

-- VISTA para tabla grado
DROP VIEW IF EXISTS vista_tabla_grado;
DELIMITER $$
CREATE VIEW vista_tabla_grado AS
SELECT id_grado AS 'ID', 
		nombre_grado AS 'NOMBRE'
FROM grados_academicos;
$$ 
