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
	correo_aspirante VARCHAR(30) NOT NULL,
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

CREATE TABLE areas_laborales(
	id_area INT PRIMARY KEY AUTO_INCREMENT,
	nombre_area VARCHAR(60) NOT NULL 
);

CREATE TABLE rubros_empresas(
	id_rubro INT PRIMARY KEY AUTO_INCREMENT,
	nombre_rubro VARCHAR(60) NOT NULL 
);

CREATE TABLE idiomas(
	id_idioma INT PRIMARY KEY AUTO_INCREMENT,
	nombre_idioma VARCHAR(30) NOT NULL 
);

CREATE TABLE curriculum_aspirante(
	id_curriculum INT PRIMARY KEY AUTO_INCREMENT,
	id_aspirante INT NOT NULL,
	
);

CREATE TABLE estudios_aspirante(
	id_estudio INT PRIMARY KEY AUTO_INCREMENT,
	titulo_estudio VARCHAR(60)
	id_grado INT NOT NULL,
	id_curriculum INT NOT NULL,
	CONSTRAINT fk_grado_estudio
	FOREIGN KEY (id_grado)
	REFERENCES grados(id_grado),
	CONSTRAINT fk_curriculum_estudio
	FOREIGN KEY (id_curriculum)
	REFERENCES estudios(id_curriculum)
);
