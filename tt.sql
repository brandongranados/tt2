CREATE DATABASE tt;

USE tt;

CREATE TABLE estudiante
(
	id_est BIGINT PRIMARY KEY IDENTITY,
	num_boleta BIGINT NOT NULL UNIQUE DEFAULT 0,
	porcentaje_carrera FLOAT NOT NULL DEFAULT 0,
	curp VARCHAR(18) NOT NULL DEFAULT '------------------'
		CONSTRAINT curp_tam CHECK ( LEN(curp) = 18 ),
	nombres VARCHAR(MAX) NOT NULL DEFAULT '',
	apellido_paterno VARCHAR(MAX) NOT NULL DEFAULT '',
	apellido_materno VARCHAR(MAX) NOT NULL DEFAULT '',
	promedio FLOAT NOT NULL DEFAULT 0,
	correo_electronico VARCHAR(MAX) NOT NULL DEFAULT '',
	sexo SMALLINT NOT NULL DEFAULT 1,
	fecha_nacimiento DATE NOT NULL DEFAULT GETDATE()
);

CREATE TABLE carrera
(
	id_carrera BIGINT PRIMARY KEY IDENTITY,
	nom_carrera VARCHAR(MAX) NOT NULL DEFAULT '',
	total_creditos FLOAT NOT NULL DEFAULT 0
);

CREATE TABLE periodo
(
	id_periodo BIGINT PRIMARY KEY IDENTITY,
	nom_periodo VARCHAR(MAX) NOT NULL DEFAULT ''
);

CREATE TABLE plan_estudios
(
	id_plan BIGINT PRIMARY KEY IDENTITY,
	nombre_plan VARCHAR(MAX) NOT NULL DEFAULT '',
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
	nombre_solicitud VARCHAR(MAX) NOT NULL DEFAULT ''
);

CREATE TABLE usuario
(
	id_usuario BIGINT PRIMARY KEY IDENTITY,
	nombre_usuario VARCHAR(MAX) NOT NULL DEFAULT '',
	contrasena VARCHAR(MAX) NOT NULL DEFAULT ''
);

CREATE TABLE roles
(
	id_rol BIGINT PRIMARY KEY IDENTITY,
	nombre_rol VARCHAR(MAX) NOT NULL DEFAULT ''
);

CREATE TABLE puestos
(
	id_puesto BIGINT PRIMARY KEY IDENTITY,
	nombre_puesto VARCHAR(MAX) NOT NULL DEFAULT ''
);

CREATE TABLE departamento
(
	id_depto BIGINT PRIMARY KEY IDENTITY,
	nombre_depto VARCHAR(MAX) NOT NULL DEFAULT ''
);

CREATE TABLE personal
(
	id_personal BIGINT PRIMARY KEY IDENTITY,
	nombres VARCHAR(MAX) NOT NULL DEFAULT '',
	apellido_paterno VARCHAR(MAX) NOT NULL DEFAULT '',
	apellido_materno VARCHAR(MAX) NOT NULL DEFAULT ''
);

CREATE TABLE semestre_activo
(
	id_semestre_activo BIGINT PRIMARY KEY IDENTITY,
	nombre_semestre VARCHAR(MAX) DEFAULT '',
	fecha_inicio DATETIME DEFAULT GETDATE(),
	fecha_fin DATETIME DEFAULT GETDATE(),
	estado SMALLINT DEFAULT 0
);

CREATE TABLE unidad_aprendizaje
(
	id_uni_apren BIGINT PRIMARY KEY IDENTITY,
	id_uni_apren_equi BIGINT,
	id_creditos BIGINT,
	nom_uni_apren VARCHAR(MAX) DEFAULT '',
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
	ruta VARCHAR(MAX) NOT NULL DEFAULT '',
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

CREATE TABLE validacion_correos
(
	id_validacion_correos BIGINT PRIMARY KEY IDENTITY,
	id_usuario BIGINT,
	fecha_solicitud DATETIME NOT NULL DEFAULT GETDATE(),
	fecha_expiracion DATETIME NOT NULL DEFAULT GETDATE(),
	token VARCHAR(MAX) NOT NULL DEFAULT '',
	FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE restablecer_contrasena
(
	id_restablecer_contrasena BIGINT PRIMARY KEY IDENTITY,
	id_usuario BIGINT,
	fecha_solicitud DATETIME NOT NULL DEFAULT GETDATE(),
	fecha_expiracion DATETIME NOT NULL DEFAULT GETDATE(),
	token VARCHAR(MAX) NOT NULL DEFAULT '',
	FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario)
		ON DELETE CASCADE ON UPDATE CASCADE
);

/* BITACORAS TABLAS */


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
	nom_carrera VARCHAR(MAX) DEFAULT '',
	total_creditos FLOAT DEFAULT 0,

    id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_plan_estudios
(
    id_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_plan BIGINT,
	nombre_plan VARCHAR(MAX) DEFAULT '',

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
	nom_uni_apren VARCHAR(MAX) DEFAULT '',
	
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

CREATE TABLE bit_grupo
(
	id_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_grupo BIGINT,
	nom_grupo CHAR(10) DEFAULT '',

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_estudiante_carrera
(
	id_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_estudiante_carrera BIGINT,
	id_est BIGINT,
	id_carrera BIGINT,

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_est_tip_sol_bit_gestion
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_est_tip_sol_bit_gestion BIGINT,
	id_est BIGINT,
	id_tipo_solicitud BIGINT,
	id_bitacora BIGINT,

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_bitacora_gestion
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_bitacora BIGINT ,
	fecha_resgistro_bd DATETIME ,
	fecha_solicitud DATETIME ,
	fecha_entrega DATETIME ,
	estado SMALLINT ,

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_uni_apren_inscrita
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_uni_apren_inscrita BIGINT,
	id_uni_apren BIGINT,
	id_est BIGINT,

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_roles
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_rol BIGINT,
	nombre_rol VARCHAR(MAX),

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_uni_apren_desfasada
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_uni_apren_desfasada BIGINT,
	id_uni_apren BIGINT,
	id_est BIGINT,

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_rol_personal_usuario
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_rol_personal_usuario BIGINT,
	id_personal BIGINT,
	id_rol BIGINT,
	id_usuario BIGINT,

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_personal
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_personal BIGINT,
	nombres VARCHAR(MAX),
	apellido_paterno VARCHAR(MAX),
	apellido_materno VARCHAR(MAX),

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_expediente_est
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_expediente_est BIGINT,
	id_est BIGINT,
	id_tipo_solicitud BIGINT,
	ruta VARCHAR(MAX),

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_rol_usuario_est
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_rol_usuario_est BIGINT,
	id_rol BIGINT,
	id_usuario BIGINT,
	id_est BIGINT,

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_uni_apren_reprobada
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_uni_apren_reprobada BIGINT,
	id_uni_apren BIGINT,
	id_est BIGINT,

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_depto_personal_puesto
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_depto_personal_puesto BIGINT,
	id_puesto BIGINT,
	id_depto BIGINT,
	id_personal BIGINT,

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_departamento
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_depto BIGINT,
	nombre_depto VARCHAR(MAX),

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_uni_apren_cursada
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_uni_apren_cursada BIGINT,
	id_uni_apren BIGINT,
	id_est BIGINT,

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_usuario
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_usuario BIGINT,
	nombre_usuario VARCHAR(MAX),
	contrasena VARCHAR(MAX),
	autenticado SMALLINT,

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_puestos
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_puesto BIGINT,
	nombre_puesto VARCHAR(MAX),

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_tipo_solicitud
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_tipo_solicitud BIGINT,
	nombre_solicitud VARCHAR(MAX),

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_estudiante
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_est BIGINT,
	num_boleta BIGINT,
	porcentaje_carrera FLOAT,
	curp VARCHAR(18),
	nombres VARCHAR(MAX),
	apellido_paterno VARCHAR(MAX),
	apellido_materno VARCHAR(MAX),
	promedio FLOAT,
	correo_electronico VARCHAR(MAX),
	sexo SMALLINT,
	fecha_nacimiento DATE,

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/********************************** DISPARADORES ******************************************/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
CREATE TRIGGER d_ets
	ON ets
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_ets
			(
				id_ets,
				fecha_aplicacion,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_ets,
                    deleted.fecha_aplicacion,
                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_ets_plan_uni_apren_est_car
	ON ets_plan_uni_apren_est_car
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_ets_plan_uni_apren_est_car
			(
				id_ets_plan_uni_apren_est_car,
				id_ets,
				id_plan,
				id_uni_apren_inscrita,
				id_est,
				id_carrera,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_ets_plan_uni_apren_est_car,
                    deleted.id_ets,
					deleted.id_plan,
					deleted.id_uni_apren_inscrita,
					deleted.id_est,
					deleted.id_carrera,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_carrera
	ON carrera
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_carrera
			(
				id_carrera,
				nom_carrera,
				total_creditos,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_carrera,
                    deleted.nom_carrera,
					deleted.total_creditos,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_plan_estudios
	ON plan_estudios
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_plan_estudios
			(
				id_plan,
				nombre_plan,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_plan,
                    deleted.nombre_plan,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_unidad_aprendizaje
	ON unidad_aprendizaje
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_unidad_aprendizaje
			(
				id_uni_apren,
				id_uni_apren_equi,
				id_creditos,
				nom_uni_apren,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_uni_apren,
                    deleted.id_uni_apren_equi,
					deleted.id_creditos,
					deleted.nom_uni_apren,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_grupo_est
	ON grupo_est
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_grupo_est
			(
				id_grupo_est,
				id_grupo,
				id_est,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_grupo_est,
                    deleted.id_grupo,
					deleted.id_est,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_grupo
	ON grupo
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_grupo
			(
				id_grupo,
				nom_grupo,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_grupo,
                    deleted.nom_grupo,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_estudiante_carrera
	ON estudiante_carrera
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_estudiante_carrera
			(
				id_estudiante_carrera,
				id_est,
				id_carrera,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_estudiante_carrera,
                    deleted.id_est,
					deleted.id_carrera,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_est_tip_sol_bit_gestion
	ON est_tip_sol_bit_gestion
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_est_tip_sol_bit_gestion
			(
				id_est_tip_sol_bit_gestion,
				id_est,
				id_tipo_solicitud,
				id_bitacora,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_est_tip_sol_bit_gestion,
                    deleted.id_est,
					deleted.id_tipo_solicitud,
					deleted.id_bitacora,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_bitacora_gestion
	ON bitacora_gestion
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_bitacora_gestion
			(
				id_bitacora,
				fecha_resgistro_bd,
				fecha_solicitud,
				fecha_entrega,
				estado,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_bitacora,
                    deleted.fecha_resgistro_bd,
					deleted.fecha_solicitud,
					deleted.fecha_entrega,
					deleted.estado,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_uni_apren_inscrita
	ON uni_apren_inscrita
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_uni_apren_inscrita
			(
				id_uni_apren_inscrita,
				id_uni_apren,
				id_est,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_uni_apren_inscrita,
                    deleted.id_uni_apren,
					deleted.id_est,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_roles
	ON roles
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_roles
			(
				id_rol,
				nombre_rol,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_rol,
                    deleted.nombre_rol,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_uni_apren_desfasada
	ON uni_apren_desfasada
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_uni_apren_desfasada
			(
				id_uni_apren_desfasada,
				id_uni_apren,
				id_est,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_uni_apren_desfasada,
                    deleted.id_uni_apren,
					deleted.id_est,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_rol_personal_usuario
	ON rol_personal_usuario
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_rol_personal_usuario
			(
				id_rol_personal_usuario,
				id_personal,
				id_rol,
				id_usuario,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_rol_personal_usuario,
                    deleted.id_personal,
					deleted.id_rol,
					deleted.id_usuario,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_personal
	ON personal
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_personal
			(
				id_personal,
				nombres,
				apellido_paterno,
				apellido_materno,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_personal,
                    deleted.nombres,
					deleted.apellido_paterno,
					deleted.apellido_materno,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_expediente_est
	ON expediente_est
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_expediente_est
			(
				id_expediente_est,
				id_est,
				id_tipo_solicitud,
				ruta,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_expediente_est,
                    deleted.id_est,
					deleted.id_tipo_solicitud,
					deleted.ruta,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_uni_apren_reprobada
	ON uni_apren_reprobada
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_uni_apren_reprobada
			(
				id_uni_apren_reprobada,
				id_uni_apren,
				id_est,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_uni_apren_reprobada,
                    deleted.id_uni_apren,
					deleted.id_est,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_depto_personal_puesto
	ON depto_personal_puesto
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_depto_personal_puesto
			(
				id_depto_personal_puesto,
				id_puesto,
				id_depto,
				id_personal,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_depto_personal_puesto,
                    deleted.id_puesto,
					deleted.id_depto,
					deleted.id_personal,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_departamento
	ON departamento
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_departamento
			(
				id_depto,
				nombre_depto,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_depto,
                    deleted.nombre_depto,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_uni_apren_cursada
	ON uni_apren_cursada
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_uni_apren_cursada
			(
				id_uni_apren_cursada,
				id_uni_apren,
				id_est,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_uni_apren_cursada,
                    deleted.id_uni_apren,
					deleted.id_est,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_puestos
	ON puestos
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_puestos
			(
				id_puesto,
				nombre_puesto,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_puesto,
                    deleted.nombre_puesto,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_tipo_solicitud
	ON tipo_solicitud
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_tipo_solicitud
			(
				id_tipo_solicitud,
				nombre_solicitud,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_tipo_solicitud,
                    deleted.nombre_solicitud,

                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


CREATE TRIGGER d_estudiante
	ON estudiante
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_estudiante
			(
				id_est,
				num_boleta,
				porcentaje_carrera,
				curp,
				nombres,
				apellido_paterno,
				apellido_materno,
				promedio,
				correo_electronico,
				sexo,
				fecha_nacimiento,

				id_user_ejecuta,
				tip_ejec
			)
            SELECT deleted.id_est,
                    deleted.num_boleta,
                    deleted.porcentaje_carrera,
                    deleted.curp,
                    deleted.nombres,
                    deleted.apellido_paterno,
                    deleted.apellido_materno,
                    deleted.promedio,
                    deleted.correo_electronico,
                    deleted.sexo,
                    deleted.fecha_nacimiento,
                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;



CREATE TRIGGER d_usuario
	ON usuario
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_usuario
			(
				id_usuario,
				nombre_usuario,
				contrasena,

				id_user_ejecuta ,
				tip_ejec
			)
            SELECT deleted.id_usuario,
                    deleted.nombre_usuario,
                    deleted.contrasena,
                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;



CREATE TRIGGER d_rol_usuario_est
	ON rol_usuario_est
	AFTER UPDATE, DELETE
	AS BEGIN

		DECLARE @tipo SMALLINT;

		SET @tipo = 0;

		IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*actuAlizacion*/
			SET @tipo = 2;

		END
		ELSE IF NOT EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
		BEGIN

			/*REGISTRO ELIMNADO*/
			SET @tipo = 3;

		END

		BEGIN TRY

			INSERT INTO bit_rol_usuario_est
			(
				id_rol_usuario_est,
				id_rol,
				id_usuario,
				id_est ,

				id_user_ejecuta ,
				tip_ejec
			)
            SELECT deleted.id_rol_usuario_est,
                    deleted.id_rol,
                    deleted.id_usuario,
                    deleted.id_est,
                    ( SELECT TOP 1 id_usuario FROM #usuario_sesion ),
                    @tipo AS tipo
            FROM deleted

		END TRY
		BEGIN CATCH

			SET @tipo = 0;

		END CATCH

	END;


/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/********************************** VISTAS ******************************************/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/


CREATE VIEW v_inicio_sesion AS
	SELECT u.contrasena,
			u.nombre_usuario,
			r.nombre_rol
		FROM rol_usuario_est rue
			INNER JOIN estudiante e
				ON rue.id_est = e.id_est
			INNER JOIN roles r
				ON rue.id_rol = r.id_rol
			INNER JOIN usuario u
				ON rue.id_usuario = u.id_usuario;


CREATE VIEW v_obtener_correos AS
	SELECT u.nombre_usuario,
			e.correo_electronico
		FROM rol_usuario_est rue
			INNER JOIN estudiante e
				ON rue.id_est = e.id_est
			INNER JOIN roles r
				ON rue.id_rol = r.id_rol
			INNER JOIN usuario u
				ON rue.id_usuario = u.id_usuario;


/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/********************** PROCEDIMIENTOS ALMACENADOS******************************************/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/


/* SESIONES DE ESTUDIANTES*/

CREATE PROCEDURE sp_registrar_estudiante
	@num_boleta BIGINT,
	@nombre_usuario VARCHAR(MAX),
	@correo_electronico VARCHAR(MAX),
	@contrasena VARCHAR(MAX),
	@token VARCHAR(MAX),
	@bool SMALLINT OUTPUT
	AS BEGIN

		DECLARE @estudiante BIGINT;
		DECLARE @user BIGINT;
		DECLARE @sal SMALLINT;

		IF EXISTS( SELECT * FROM usuario 
					WHERE nombre_usuario = @nombre_usuario )
		BEGIN
			SET @bool = 2;
			RETURN;
		END

		BEGIN TRY

			INSERT INTO estudiante
			(
				num_boleta,
				correo_electronico

			) VALUES
			(
				@num_boleta,
				@correo_electronico
			);

			SET @estudiante = SCOPE_IDENTITY();

			INSERT INTO usuario
			(
				nombre_usuario,
				contrasena
			) VALUES 
			(
				@nombre_usuario,
				@contrasena
			);

			SET @user = SCOPE_IDENTITY();

			INSERT INTO rol_usuario_est
			(
				id_rol,
				id_usuario,
				id_est
			)
			VALUES
			(
				(
					SELECT TOP 1 id_rol FROM roles 
					WHERE nombre_rol = 'ROLE_ESTUDIANTE'
				), 
				@user,
				@estudiante
			);

			EXEC sp_almacena_autenticar_token
				@nombre_usuario,
				@token,
				@sal OUTPUT;

			IF @sal <> 1
			BEGIN

				SET @bool = 3;
				RETURN;

			END

			SET @bool = 1;

		END TRY
		BEGIN CATCH

			SET @bool = 4;
			
		END CATCH

	END;



CREATE PROCEDURE sp_almacena_autenticar_token
	@usuario VARCHAR(MAX),
	@token VARCHAR(MAX),
	@bool SMALLINT OUTPUT
	AS BEGIN

		DECLARE @user VARCHAR(MAX);
		DECLARE @fecha DATETIME;

		SET @fecha = GETDATE();

		SELECT @user = id_usuario FROM usuario 
		WHERE nombre_usuario = @usuario;

		BEGIN TRY

			DELETE FROM validacion_correos
			WHERE id_usuario IN (
				SELECT id_usuario FROM usuario 
				WHERE nombre_usuario = @usuario
			);

			INSERT INTO validacion_correos
			(
				id_usuario,
				fecha_solicitud,
				fecha_expiracion,
				token
			)VALUES
			(
				@user, @fecha, 
				DATEADD(MINUTE, 30, @fecha),
				@token
			);

			SET @bool = 1;

		END TRY
		BEGIN CATCH

			SET @bool = 5;

		END CATCH

	END;



CREATE PROCEDURE sp_valida_token
	@usuario VARCHAR(MAX),
	@token VARCHAR(MAX),
	@bool SMALLINT OUTPUT
	AS BEGIN

		DECLARE @fecha_solicitud DATETIME;
		DECLARE @fecha_expiracion DATETIME;

		SELECT TOP 1 @fecha_solicitud = v.fecha_solicitud,
				@fecha_expiracion = v.fecha_expiracion
			FROM validacion_correos v
				INNER JOIN usuario u
					ON v.id_usuario = u.id_usuario
			WHERE u.nombre_usuario = @usuario AND
					v.token = @token;		

		IF NOT EXISTS
			( 
				SELECT * FROM validacion_correos v
					INNER JOIN usuario u
					 ON v.id_usuario = u.id_usuario
				WHERE u.nombre_usuario = @usuario AND
					    v.token = @token
			)
		BEGIN
			SET @bool = 6;
			RETURN;
		END

		IF @fecha_solicitud >= @fecha_expiracion
		BEGIN
			SET @bool = 7;
			RETURN;
		END

		BEGIN TRY

			DELETE FROM validacion_correos
			WHERE id_validacion_correos IN(
				SELECT id_validacion_correos
				FROM validacion_correos v
					INNER JOIN usuario u
						ON v.id_usuario = u.id_usuario
				WHERE u.nombre_usuario = @usuario
			);

			SET @bool = 1;

		END TRY
		BEGIN CATCH

			SET @bool = 8;
			RETURN;

		END CATCH

	END;


CREATE PROCEDURE sp_registra_restablece_contrasena
	@usuario VARCHAR(MAX),
	@token VARCHAR(MAX),
	@bool SMALLINT OUTPUT
	AS BEGIN

		DECLARE @fecha DATETIME;

		SET @fecha = GETDATE();

		IF NOT EXISTS (
			SELECT * FROM usuario
			WHERE nombre_usuario = @usuario
		)
		BEGIN

			SET @bool = 9;
			RETURN;

		END

		BEGIN TRY

			DELETE FROM restablecer_contrasena
			WHERE id_restablecer_contrasena IN(
				SELECT id_restablecer_contrasena
				FROM restablecer_contrasena r
					INNER JOIN usuario u
						ON r.id_usuario = u.id_usuario
				WHERE u.nombre_usuario = @usuario
			);

			INSERT INTO restablecer_contrasena
			(
				id_usuario,
				fecha_solicitud,
				fecha_expiracion,
				token
			)
			VALUES
			(
				( SELECT TOP 1 id_usuario
					FROM usuario
					WHERE nombre_usuario = @usuario ),
				@fecha,
				DATEADD(MINUTE, 30, @fecha),
				@token
			);

		END TRY
		BEGIN CATCH

			SET @bool = 11;
			RETURN;

		END CATCH

	END



CREATE PROCEDURE sp_valida_restablece_contrasena
	@usuario VARCHAR(MAX),
	@token VARCHAR(MAX),
	@bool SMALLINT OUTPUT
	AS BEGIN

		DECLARE @fecha_solicitud DATETIME;
		DECLARE @fecha_expiracion DATETIME;

		SELECT TOP 1 @fecha_solicitud = r.fecha_solicitud,
				@fecha_expiracion = r.fecha_expiracion
			FROM restablecer_contrasena r
				INNER JOIN usuario u
					ON r.id_usuario = u.id_usuario
			WHERE u.nombre_usuario = @usuario AND
					r.token = @token;		

		IF NOT EXISTS (

			SELECT * FROM restablecer_contrasena r
				INNER JOIN usuario u
					ON r.id_usuario = u.id_usuario
			WHERE u.nombre_usuario = @usuario AND
					r.token = @token
		)
		BEGIN
			SET @bool = 6;
			RETURN;
		END

		IF @fecha_solicitud >= @fecha_expiracion
		BEGIN
			SET @bool = 7;
			RETURN;
		END

		BEGIN TRY

			DELETE FROM restablecer_contrasena
			WHERE id_restablecer_contrasena IN(
				SELECT id_restablecer_contrasena
				FROM restablecer_contrasena r
					INNER JOIN usuario u
						ON r.id_usuario = u.id_usuario
				WHERE u.nombre_usuario = @usuario
			);

			SET @bool = 1;

		END TRY
		BEGIN CATCH

			SET @bool = 8;
			RETURN;

		END CATCH

	END

/* PAAE */


CREATE PROCEDURE sp_alta_estudiante
	@paterno VARCHAR(MAX),
	@materno VARCHAR(MAX),
	@nombre VARCHAR(MAX),
	@curp VARCHAR(MAX),
	@sexo SMALLINT,
	@fecha_nacimiento DATE,
	@boleta BIGINT,
	@usuario_alta VARCHAR(MAX),
	@bool SMALLINT OUTPUT
	AS BEGIN

	DECLARE @id_est BIGINT;

	/* CREACION DE TABLA TEMPORAL */
	DECLARE @id BIGINT;

	SELECT TOP 1 @id = id_usuario FROM
	(
		SELECT id_usuario, 
				nombre_usuario
				FROM usuario

		UNION

		SELECT id_usuario,
				nombre_usuario
				FROM bit_usuario
	) AS usuarios
	WHERE nombre_usuario = @usuario_alta;

	BEGIN TRY

		CREATE TABLE #usuario_sesion
		(
			id INTEGER PRIMARY KEY IDENTITY,
			id_usuario BIGINT
		);

		INSERT INTO #usuario_sesion
		( id_usuario )VALUES( @id );

		SET @bool = 1;

	END TRY
	BEGIN CATCH

		SET @bool = 6;

	END CATCH
	/* TERMINA CREACION DE TABLA TEMPORAL */

	SELECT TOP 1 @id_est = id_est 
	    FROM estudiante
	WHERE num_boleta = @boleta;

	IF EXISTS( SELECT * FROM estudiante WHERE num_boleta = @boleta ) AND @bool = 1
    BEGIN
		BEGIN TRY
			
			UPDATE estudiante
			SET num_boleta = @boleta,
				curp = @curp,
				nombres = @nombre,
				apellido_paterno = @paterno,
				apellido_materno = @materno,
				sexo = @sexo,
				fecha_nacimiento = @fecha_nacimiento
			WHERE id_est = @id_est ;

			SET @bool = 1;

		END TRY
		BEGIN CATCH

			SET @bool = 12;

		END CATCH

	END
	ELSE
	BEGIN

		SET @bool = 12;

	END

	/* ELIMINACION DE TABLA TEMPORAL */
	BEGIN TRY

		DROP TABLE #usuario_sesion;

	END TRY
	BEGIN CATCH

		SET @bool = 7;

	END CATCH
	/* ELIMINACION DE TABLA TEMPORAL */

END

CREATE PROCEDURE sp_edita_estudiante
	@paterno VARCHAR(MAX),
	@materno VARCHAR(MAX),
	@nombre VARCHAR(MAX),
	@curp VARCHAR(MAX),
	@sexo SMALLINT,
	@fecha_nacimiento DATE,
	@boleta BIGINT,
	@carrera VARCHAR(MAX),
	@semestre INTEGER,
	@nomPeriodo VARCHAR(MAX),
	@correo VARCHAR(MAX),
	@usuario_resp_edicion VARCHAR(MAX),
	@bool SMALLINT OUTPUT
	AS BEGIN

	DECLARE @id_est BIGINT;
	DECLARE @id_carrera BIGINT;
	DECLARE @id_periodo BIGINT;

	/* CREACION DE TABLA TEMPORAL */
	DECLARE @id BIGINT;

	SELECT TOP 1 @id = id_usuario FROM
	(
		SELECT id_usuario, 
				nombre_usuario
				FROM usuario

		UNION

		SELECT id_usuario,
				nombre_usuario
				FROM bit_usuario
	) AS usuarios
	WHERE nombre_usuario = @usuario_resp_edicion;

	BEGIN TRY

		CREATE TABLE #usuario_sesion
		(
			id INTEGER PRIMARY KEY IDENTITY,
			id_usuario BIGINT
		);

		INSERT INTO #usuario_sesion
		( id_usuario )VALUES( @id );

		SET @bool = 1;

	END TRY
	BEGIN CATCH

		SET @bool = 6;

	END CATCH
	/* TERMINA CREACION DE TABLA TEMPORAL */

	SELECT TOP 1 @id_est = id_est 
	    FROM estudiante
	WHERE num_boleta = @boleta;

	SELECT TOP 1 @id_carrera = carrera 
		FROM carrera
	WHERE nom_carrera = @carrera;

	SELECT TOP 1 @id_periodo = id_periodo
		FROM periodo
	WHERE nom_periodo = @nomPeriodo;

	IF @id_est IS NOT NULL AND @id_carrera IS NOT NULL AND @id_periodo IS NOT NULL AND @bool = 1
    BEGIN
		BEGIN TRY
			
			UPDATE estudiante
			SET num_boleta = @boleta,
				curp = @curp,
				nombres = @nombre,
				apellido_paterno = @paterno,
				apellido_materno = @materno,
				sexo = @sexo,
				fecha_nacimiento = @fecha_nacimiento,
				correo_electronico = @correo,
				sexo = @sexo
			WHERE id_est = @id_est ;

			IF NOT EXISTS ( SELECT * FROM estudiante_carrera WHERE id_est =  @id_est )
			BEGIN
				INSERT INTO estudiante_carrera
				(
					id_est,
					id_carrera
				)VALUES
				(
					@id_est,
					@id_carrera
				);
			ELSE
			BEGIN
				UPDATE estudiante_carrera
					SET id_carrera = @id_carrera
				WHERE id_est =  @id_est;
			END

			SET @bool = 1;

		END TRY
		BEGIN CATCH

			SET @bool = 12;

		END CATCH

	END
	ELSE
	BEGIN

		SET @bool = 12;

	END

	/* ELIMINACION DE TABLA TEMPORAL */
	BEGIN TRY

		DROP TABLE #usuario_sesion;

	END TRY
	BEGIN CATCH

		SET @bool = 7;

	END CATCH
	/* ELIMINACION DE TABLA TEMPORAL */

END
/*

CODIGO DE ERRORES BASE DE DATOS

	1: OPERACION EXITOSA OK
	2: USUARIO DE REGISTRO DUPLICADO
	3: ERROR AL ALMACENAR LSO DATOS DE AUTETICACION DEL TOKEN
	4: ERROR AL REGISTRAR AL ESTUDIANTE CON SUS DATOS DE REGISTRO
	5: RELACIONADO AL ERROR 3
	6: NO EXISTE EL REGISTRO ACTIVO CON EL TOKEN, USUARIO ESPECIFICADOS
	7: EL TOKEN EXPIRO 
	8: ERROR AL INTENTAR ACTULIZAR ESTADO DEL TOKEN AUTENTICADO
	9: el usuario no existe al intentar restablecer contrasena
	10:Error al eliminar token antiguo de restablecer contrasena
	11:Error al mintentrar ingresar el nuevo token mde restablcer contrasena
	12:ERROR AL ACTULIZAR AL ESTUDANITE DESDE UN USUARIO PAAE

*/

/*
	PARA ABRIR ARCHIVOS openssl rsa -in hola.key -text
*/


/***********************************************************************/

INSERT INTO roles(nombre_rol)
VALUES(
	'ROLE_ESTUDIANTE'
);

/***********************************************************************/


SELECT * FROM estudiante;

SELECT * FROM bit_estudiante;

SELECT * FROM usuario;



DECLARE @bool SMALLINT;

EXEC sp_alta_estudiante
'CASIANO',
'GRANADOS',
'BRANDON ANTONIO',
'CAGB980704HMCSRR07',
1,
'1998-07-04',
2020300476,
'MTJhMjRhMmI4YjE1NzE2ZGU1ZGNmZjUzYTdkNjQwODkwNWQwMWI5MmY3MjRjMzc2NTIwY2VkNzg1YTE0MGIzZA==',
@bool OUTPUT;

SELECT @bool;