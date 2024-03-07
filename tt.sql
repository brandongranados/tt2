CREATE DATABASE tt;

USE tt;

CREATE TABLE estudiante
(
	id_est BIGINT PRIMARY KEY IDENTITY,
	num_boleta BIGINT NOT NULL UNIQUE DEFAULT 0,
	porcentaje_carrera FLOAT NOT NULL DEFAULT 0,
	curp VARCHAR(18) NOT NULL DEFAULT '' 
		CONSTRAINT curp_tam CHECK ( LEN(curp) = 18 ),
	nombres TEXT NOT NULL DEFAULT CAST('' AS TEXT),
	apellido_paterno TEXT NOT NULL DEFAULT CAST('' AS TEXT),
	apellido_materno TEXT NOT NULL DEFAULT CAST('' AS TEXT),
	promedio FLOAT NOT NULL DEFAULT 0,
	correo_electronico TEXT NOT NULL DEFAULT CAST('' AS TEXT),
	sexo SMALLINT NOT NULL DEFAULT 1,
	fecha_nacimiento DATE NOT NULL DEFAULT GETDATE()
);

CREATE TABLE carrera
(
	id_carrera BIGINT PRIMARY KEY IDENTITY,
	nom_carrera TEXT NOT NULL DEFAULT '',
	total_creditos FLOAT NOT NULL DEFAULT 0
);

CREATE TABLE periodo
(
	id_periodo BIGINT PRIMARY KEY IDENTITY,
	nom_periodo TEXT NOT NULL DEFAULT ''
);

CREATE TABLE plan_estudios
(
	id_plan BIGINT PRIMARY KEY IDENTITY,
	nombre_plan TEXT NOT NULL DEFAULT '',
);

CREATE TABLE ets
(
	id_ets BIGINT PRIMARY KEY IDENTITY,
	fecha_aplicacion DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE grupo
(
	id_grupo BIGINT PRIMARY KEY IDENTITY,
	nom_grupo CHAR(10) NOT NULL DEFAULT ''
);

CREATE TABLE creditos
(
	id_creditos BIGINT PRIMARY KEY IDENTITY,
	cant_creditos FLOAT NOT NULL DEFAULT 0
);

CREATE TABLE bitacora_gestion
(
	id_bitacora BIGINT PRIMARY KEY IDENTITY,
	fecha_resgistro_bd DATETIME NOT NULL DEFAULT GETDATE(),
	fecha_solicitud DATETIME NOT NULL DEFAULT GETDATE(),
	fecha_entrega DATETIME NOT NULL DEFAULT GETDATE(),
	estado SMALLINT NOT NULL DEFAULT 0
);

CREATE TABLE tipo_solicitud
(
	id_tipo_solicitud BIGINT PRIMARY KEY IDENTITY,
	nombre_solicitud TEXT NOT NULL DEFAULT CAST('' AS TEXT)
);

CREATE TABLE usuario
(
	id_usuario BIGINT PRIMARY KEY IDENTITY,
	nombre_usuario TEXT NOT NULL DEFAULT '',
	contrasena TEXT NOT NULL DEFAULT ''
);

CREATE TABLE roles
(
	id_rol BIGINT PRIMARY KEY IDENTITY,
	nombre_rol TEXT NOT NULL DEFAULT ''
);

CREATE TABLE puestos
(
	id_puesto BIGINT PRIMARY KEY IDENTITY,
	nombre_puesto TEXT NOT NULL DEFAULT ''
);

CREATE TABLE departamento
(
	id_depto BIGINT PRIMARY KEY IDENTITY,
	nombre_depto TEXT NOT NULL DEFAULT ''
);

CREATE TABLE personal
(
	id_personal BIGINT PRIMARY KEY IDENTITY,
	nombres TEXT NOT NULL DEFAULT '',
	apellido_paterno TEXT NOT NULL DEFAULT '',
	apellido_materno TEXT NOT NULL DEFAULT ''
);

CREATE TABLE semestre_activo
(
	id_semestre_activo BIGINT PRIMARY KEY IDENTITY,
	nombre_semestre TEXT DEFAULT '',
	fecha_inicio DATETIME DEFAULT GETDATE(),
	fecha_fin DATETIME DEFAULT GETDATE(),
	estado SMALLINT DEFAULT 0
);

CREATE TABLE unidad_aprendizaje
(
	id_uni_apren BIGINT PRIMARY KEY IDENTITY,
	id_uni_apren_equi BIGINT,
	id_creditos BIGINT,
	nom_uni_apren TEXT DEFAULT '',
	FOREIGN KEY(id_uni_apren_equi) REFERENCES unidad_aprendizaje(id_uni_apren)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY(id_creditos) REFERENCES creditos(id_creditos)
	    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE uni_apren_inscrita
(
	id_uni_apren_inscrita BIGINT PRIMARY KEY IDENTITY,
	id_uni_apren BIGINT,
	id_est BIGINT,
	FOREIGN KEY(id_uni_apren) REFERENCES unidad_aprendizaje(id_uni_apren)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(id_est) REFERENCES estudiante(id_est)
	    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE uni_apren_cursada
(
	id_uni_apren_cursada BIGINT PRIMARY KEY IDENTITY,
	id_uni_apren BIGINT,
	id_est BIGINT,
	FOREIGN KEY(id_uni_apren) REFERENCES unidad_aprendizaje(id_uni_apren)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(id_est) REFERENCES estudiante(id_est)
	    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE uni_apren_reprobada
(
	id_uni_apren_reprobada BIGINT PRIMARY KEY IDENTITY,
	id_uni_apren BIGINT,
	id_est BIGINT,
	FOREIGN KEY(id_uni_apren) REFERENCES unidad_aprendizaje(id_uni_apren)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(id_est) REFERENCES estudiante(id_est)
	 ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE uni_apren_desfasada
(
	id_uni_apren_desfasada BIGINT PRIMARY KEY IDENTITY,
	id_uni_apren BIGINT,
	id_est BIGINT,
	FOREIGN KEY(id_uni_apren) REFERENCES unidad_aprendizaje(id_uni_apren)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(id_est) REFERENCES estudiante(id_est)
	 ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE estudiante_carrera
(
	id_estudiante_carrera BIGINT PRIMARY KEY IDENTITY,
	id_est BIGINT,
	id_carrera BIGINT,
	FOREIGN KEY (id_est) REFERENCES estudiante(id_est)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_carrera) REFERENCES carrera(id_carrera)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE uni_apren_plan_per_car
(
	id_uni_apren_plan_per_car BIGINT PRIMARY KEY IDENTITY,
	id_uni_apren BIGINT,
	id_plan BIGINT,
	id_periodo BIGINT,
	id_carrera BIGINT,
	FOREIGN KEY (id_uni_apren) REFERENCES unidad_aprendizaje(id_uni_apren)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_plan) REFERENCES plan_estudios(id_plan)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_periodo) REFERENCES periodo(id_periodo)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_carrera) REFERENCES carrera(id_carrera)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE per_plan_grup_car
(
	id_per_plan_grup_car BIGINT PRIMARY KEY IDENTITY,
	id_plan BIGINT,
	id_periodo BIGINT,
	id_carrera BIGINT,
	id_grupo BIGINT,
	FOREIGN KEY (id_grupo) REFERENCES grupo(id_grupo)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_plan) REFERENCES plan_estudios(id_plan)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_periodo) REFERENCES periodo(id_periodo)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_carrera) REFERENCES carrera(id_carrera)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ets_plan_uni_apren_est_car
(
	id_ets_plan_uni_apren_est_car BIGINT PRIMARY KEY IDENTITY,
	id_ets BIGINT,
	id_plan BIGINT,
	id_uni_apren_inscrita BIGINT,
	id_est BIGINT,
	id_carrera BIGINT,
	FOREIGN KEY (id_plan) REFERENCES plan_estudios(id_plan)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_carrera) REFERENCES carrera(id_carrera)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_uni_apren_inscrita) REFERENCES uni_apren_inscrita(id_uni_apren_inscrita)
		ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY (id_est) REFERENCES estudiante(id_est)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_ets) REFERENCES ets(id_ets)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE est_tip_sol_bit_gestion
(
	id_est_tip_sol_bit_gestion BIGINT PRIMARY KEY IDENTITY,
	id_est BIGINT,
	id_tipo_solicitud BIGINT,
	id_bitacora BIGINT,
	FOREIGN KEY (id_est) REFERENCES estudiante(id_est)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_tipo_solicitud) REFERENCES tipo_solicitud(id_tipo_solicitud)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_bitacora) REFERENCES bitacora_gestion (id_bitacora)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE expediente_est
(
	id_expediente_est BIGINT PRIMARY KEY IDENTITY,
	id_est BIGINT,
	id_tipo_solicitud BIGINT,
	ruta TEXT NOT NULL DEFAULT '',
	FOREIGN KEY (id_est) REFERENCES estudiante(id_est)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_tipo_solicitud) REFERENCES tipo_solicitud(id_tipo_solicitud)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE rol_usuario_est
(
	id_rol_usuario_est BIGINT PRIMARY KEY IDENTITY,
	id_rol BIGINT,
	id_usuario BIGINT,
	id_est BIGINT,
	FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_est) REFERENCES estudiante(id_est)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE rol_personal_usuario
(
	id_rol_personal_usuario BIGINT PRIMARY KEY IDENTITY,
	id_personal BIGINT,
	id_rol BIGINT,
	id_usuario BIGINT,
	FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_personal) REFERENCES personal(id_personal)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE depto_personal_puesto
(
	id_depto_personal_puesto BIGINT PRIMARY KEY IDENTITY,
	id_puesto BIGINT,
	id_depto BIGINT,
	id_personal BIGINT,
	FOREIGN KEY (id_puesto) REFERENCES puestos(id_puesto)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_depto) REFERENCES departamento(id_depto)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_personal) REFERENCES personal(id_personal)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE grupo_est
(
    id_grupo_est BIGINT PRIMARY KEY IDENTITY,
    id_grupo BIGINT,
    id_est BIGINT,
    FOREIGN KEY(id_grupo) REFERENCES grupo(id_grupo)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(id_est) REFERENCES estudiante(id_est)
        ON DELETE CASCADE ON UPDATE CASCADE
);

/* BITACORAS */


CREATE TABLE bit_ets
(
    id_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_ets BIGINT,
	fecha_aplicacion DATETIME NOT NULL DEFAULT GETDATE(),

    id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_ets_plan_uni_apren_est_car
(
    id_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_ets_plan_uni_apren_est_car BIGINT,
	id_ets BIGINT,
	id_plan BIGINT,
	id_uni_apren_inscrita BIGINT,
	id_est BIGINT,
	id_carrera BIGINT,

    id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_carrera
(
    id_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_carrera BIGINT,
	nom_carrera TEXT DEFAULT '',
	total_creditos FLOAT DEFAULT 0,

    id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_plan_estudios
(
    id_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_plan BIGINT,
	nombre_plan TEXT DEFAULT '',

    id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_unidad_aprendizaje
(
    id_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_uni_apren BIGINT,
	id_uni_apren_equi BIGINT,
	id_creditos BIGINT,
	nom_uni_apren TEXT DEFAULT '',
	
    id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_grupo_est
(
    id_bitacora BIGINT PRIMARY KEY IDENTITY,

    id_grupo_est BIGINT,
    id_grupo BIGINT,
    id_est BIGINT,
    
    id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

