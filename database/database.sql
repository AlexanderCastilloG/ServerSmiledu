DROP DATABASE IF EXISTS db_smiledu;
CREATE DATABASE db_smiledu;

USE db_smiledu;

CREATE TABLE cargos (
    id int(11) AUTO_INCREMENT NOT NULL,
    cargo varchar(255) NOT NULL,
    CONSTRAINT pk_cargos PRIMARY KEY(id)
)ENGINE=InnoDb;

INSERT INTO cargos (cargo) VALUES ('Docente');
INSERT INTO cargos (cargo) VALUES ('Director');
INSERT INTO cargos (cargo) VALUES ('Auxiliar');
INSERT INTO cargos (cargo) VALUES ('Coordinador');


CREATE TABLE colaboradores(
    id INT(11) AUTO_INCREMENT NOT NULL,
    nombres VARCHAR(180) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    salario DECIMAL(10, 2) NOT NULL,
    estado varchar(20) NOT NULL,
    cargo_id int(11) NOT NULL,
    correo varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(correo),
    CONSTRAINT pk_colaboradores PRIMARY KEY(id),
    CONSTRAINT fk_colaboradoress_cargos FOREIGN KEY(cargo_id) REFERENCES cargos(id)
)ENGINE=InnoDb;


INSERT INTO colaboradores (nombres, apellidos, salario, estado, cargo_id, correo) VALUES ('Alexander', 'castillo gonzales', 1600,'Alto', 1, 'gcastilloale@gmail.com');
INSERT INTO colaboradores (nombres, apellidos, salario, estado, cargo_id, correo) VALUES ('Elena maria', 'Mena castro', 1000,'Bajo', 2, 'menae@gmail.com');
INSERT INTO colaboradores (nombres, apellidos, salario, estado, cargo_id, correo) VALUES ('andres matias', 'bustamante ramirez', 2000,'Muy Alto', 3, 'bustamanetea@gmail.com');
INSERT INTO colaboradores (nombres, apellidos, salario, estado, cargo_id, correo) VALUES ('pablo julian', 'lopez dias', 1500,'Medio', 1, 'lopezp@gmail.com');
INSERT INTO colaboradores (nombres, apellidos, salario, estado, cargo_id, correo) VALUES ('andrea', 'ramirez salazar', 1200,'Medio', 2, 'ramirez@gmail.com');
INSERT INTO colaboradores (nombres, apellidos, salario, estado, cargo_id, correo) VALUES ('ana', 'ceballos gonzales', 1100,'Medio', 3, 'ceballos@gmail.com');
INSERT INTO colaboradores (nombres, apellidos, salario, estado, cargo_id, correo) VALUES ('dayan estrella', 'gonzales robles', 1200,'Medio', 1, 'gonzales@gmail.com');
INSERT INTO colaboradores (nombres, apellidos, salario, estado, cargo_id, correo) VALUES ('jesus ramon', 'acuña mendoza', 500,'Bajo', 2, 'mendozaj@gmail.com');