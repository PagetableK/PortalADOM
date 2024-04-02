DROP DATABASE IF EXISTS BADOM;
CREATE DATABASE IF NOT EXISTS BADOM;

USE BADOM;

CREATE TABLE administradores(
	id_administrador INT PRIMARY KEY AUTO_INCREMENT,
	correo_administrador VARCHAR(100) UNIQUE NOT NULL,
	clave_administrador VARCHAR(64) UNIQUE NOT NULL
);

CREATE TABLE departamentos(
	id_departamento INT PRIMARY KEY AUTO_INCREMENT,
	nombre_departamento VARCHAR(30) NOT NULL
);

CREATE TABLE municipios(
	id_municipio INT PRIMARY KEY AUTO_INCREMENT,
	nombre_municipio VARCHAR(30) NOT NULL,
	id_departamento INT NOT NULL,
	CONSTRAINT fk_departamentos_muni
	FOREIGN KEY (id_departamento) 
	REFERENCES departamentos(id_departamento)
);

CREATE TABLE aspirantes(
	id_aspirante INT PRIMARY KEY AUTO_INCREMENT,
	nombre_aspirante VARCHAR(30) NOT NULL,
	apellido_aspirante VARCHAR(30) NOT NULL,
	correo_aspirante VARCHAR(50) NOT NULL,
	clave_aspirante VARCHAR(64) NOT NULL,
	fecha_nacimiento DATE NOT NULL,
	genero_aspirante ENUM('Hombre','Mujer') NOT NULL,
	direccion_aspirante VARCHAR(150) NOT NULL,
	id_municipio INT NOT NULL,
	CONSTRAINT fk_municipios_asp
	FOREIGN KEY (id_municipio)
	REFERENCES municipios(id_municipio)
);

CREATE TABLE grados_academicos(
	id_grado INT PRIMARY KEY AUTO_INCREMENT,
	nombre_grado VARCHAR(60) NOT NULL 
);

CREATE TABLE instituciones(
	id_institucion INT PRIMARY KEY AUTO_INCREMENT,
	nombre_institucion VARCHAR(100) NOT NULL 
);

CREATE TABLE idiomas(
	id_idioma INT PRIMARY KEY AUTO_INCREMENT,
	nombre_idioma VARCHAR(30) NOT NULL 
);

CREATE TABLE rubros_empresas(
	id_rubro INT PRIMARY KEY AUTO_INCREMENT,
	nombre_rubro VARCHAR(40) NOT NULL
);

CREATE TABLE areas_laborales(
	id_area INT PRIMARY KEY AUTO_INCREMENT,
	nombre_area VARCHAR(40),
	id_rubro INT NOT NULL,
	CONSTRAINT fk_rubro_area
	FOREIGN KEY (id_rubro)
	REFERENCES rubros_empresas(id_rubro)
);

CREATE TABLE curriculum_aspirantes(
	id_curriculum INT PRIMARY KEY AUTO_INCREMENT,
	imagen_aspirante VARCHAR(200),
	telefono_fijo VARCHAR(9) NOT NULL,
	telefono_movil VARCHAR(9) NOT NULL,
	correo_aspirante VARCHAR(50) NOT NULL,
	id_aspirante INT NOT NULL,
	CONSTRAINT fk_aspirante_cv
	FOREIGN KEY (id_aspirante)
	REFERENCES aspirantes(id_aspirante)
);

CREATE TABLE estudios_aspirantes(
	id_estudio INT PRIMARY KEY AUTO_INCREMENT,
	titulo_estudio VARCHAR(60) NOT NULL,
	id_grado INT NOT NULL,
	id_curriculum INT NOT NULL,
	CONSTRAINT fk_grado_estudio
	FOREIGN KEY (id_grado)
	REFERENCES grados_academicos(id_grado),
	CONSTRAINT fk_curriculum_estudio
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
	id_area INT NOT NULL,
	CONSTRAINT fk_area_asp
	FOREIGN KEY (id_area)
	REFERENCES areas_laborales(id_area)
);

CREATE TABLE idiomas_aspirantes(
	id_parler INT PRIMARY KEY AUTO_INCREMENT,
	nivel_idioma ENUM('Básico', 'Intermedio', 'Avanzado') NOT NULL,
	id_idioma INT NOT NULL,
	CONSTRAINT fk_idioma_parle
	FOREIGN KEY (id_idioma)
	REFERENCES idiomas(id_idioma)
);

CREATE TABLE habilidades_aspirantes(
	id_habilidad INT PRIMARY KEY AUTO_INCREMENT,
	nombre_habilidad VARCHAR(30) NOT NULL
);