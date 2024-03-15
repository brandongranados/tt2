CREATE DATABASE tt;

USE tt;

CREATE TABLE estudiante
(
	id_est BIGINT PRIMARY KEY IDENTITY,
	num_boleta BIGINT NOT NULL UNIQUE DEFAULT 0,
	porcentaje_carrera FLOAT NOT NULL DEFAULT 0,
	curp VARCHAR(18) NOT NULL DEFAULT '------------------'
		CONSTRAINT curp_tam CHECK ( LEN(curp) = 18 ),
	nombres TEXT NOT NULL DEFAULT CAST('' AS TEXT),
	apellido_paterno TEXT NOT NULL DEFAULT CAST('' AS TEXT),
	apellido_materno TEXT NOT NULL DEFAULT CAST('' AS TEXT),
	promedio FLOAT NOT NULL DEFAULT 0,
	correo_electronico TEXT NOT NULL DEFAULT CAST('' AS TEXT),
	sexo SMALLINT NOT NULL DEFAULT 1,
	fecha_nacimiento DATE NOT NULL DEFAULT GETDATE()
);

ALTER TABLE estudiante
DROP CONSTRAINT curp_tam;

ALTER TABLE estudiante
DROP COLUMN curp;

ALTER TABLE estudiante 
ADD curp VARCHAR(18) NOT NULL DEFAULT '------------------'
	CONSTRAINT curp_tam CHECK ( LEN(curp) = 18 );

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
	contrasena TEXT NOT NULL DEFAULT '',
	autenticado SMALLINT NOT NULL DEFAULT 0
);

ALTER TABLE usuario
ADD autenticado SMALLINT NOT NULL DEFAULT 0;

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

CREATE TABLE restablece_contrasena
(
	id_restablece_contrasena BIGINT PRIMARY KEY IDENTITY,
	id_usuario BIGINT,
	fecha_solicitud DATETIME NOT NULL DEFAULT GETDATE(),
	fecha_expiracion DATETIME NOT NULL DEFAULT GETDATE(),
	token TEXT NOT NULL DEFAULT '',
	activo SMALLINT DEFAULT 1,
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
	nombre_rol TEXT,

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
	nombres TEXT,
	apellido_paterno TEXT,
	apellido_materno TEXT,

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
	ruta TEXT NOT NULL DEFAULT '',

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
	nombre_depto TEXT,

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
	nombre_usuario TEXT,
	contrasena TEXT,

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_puestos
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_puesto BIGINT,
	nombre_puesto TEXT,

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);

CREATE TABLE bit_tipo_solicitud
(
	id_bitacora_bitacora BIGINT PRIMARY KEY IDENTITY,

	id_tipo_solicitud BIGINT,
	nombre_solicitud TEXT,

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
	nombres TEXT,
	apellido_paterno TEXT,
	apellido_materno TEXT,
	promedio FLOAT,
	correo_electronico TEXT,
	sexo SMALLINT,
	fecha_nacimiento DATE,

	id_user_ejecuta BIGINT,
    fecha_ejecuta DATETIME DEFAULT GETDATE(),
    tip_ejec SMALLINT DEFAULT 0
);


/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/********************************** VISTAS ******************************************/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/


/* INICIO DE SESION */

CREATE VIEW v_inicio_sesion AS
	SELECT CAST(u.contrasena AS VARCHAR(MAX)) AS contrasena,
			CAST(u.nombre_usuario AS VARCHAR(MAX)) AS nombre_usuario,
			CAST(r.nombre_rol AS VARCHAR(MAX)) AS nombre_rol,
			u.autenticado
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
					WHERE CAST(nombre_usuario AS VARCHAR(MAX)) = @nombre_usuario )
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
				CAST(@correo_electronico AS TEXT)
			);

			SET @estudiante = SCOPE_IDENTITY();

			INSERT INTO usuario
			(
				nombre_usuario,
				contrasena
			) VALUES 
			(
				CAST(@nombre_usuario AS TEXT),
				CAST(@contrasena AS TEXT)
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
					WHERE CAST(nombre_rol AS VARCHAR(MAX)) = 'ROLE_ESTUDIANTE'
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
		WHERE CAST(nombre_usuario AS VARCHAR(MAX)) = @usuario;

		BEGIN TRY

			INSERT INTO restablece_contrasena
			(
				id_usuario,
				fecha_solicitud,
				fecha_expiracion,
				token
			)VALUES
			(
				@user, @fecha, 
				DATEADD(MINUTE, 30, @fecha),
				CAST(@token AS TEXT)
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

		DECLARE @id BIGINT;
		DECLARE @fecha_solicitud DATETIME;
		DECLARE @fecha_expiracion DATETIME;

		SELECT TOP 1 @id = r.id_restablece_contrasena,
				@fecha_solicitud = r.fecha_solicitud,
				@fecha_expiracion = r.fecha_expiracion
			FROM restablece_contrasena r
				INNER JOIN usuario u
					ON r.id_usuario = u.id_usuario
			WHERE CAST(u.nombre_usuario AS VARCHAR(MAX)) = @usuario AND
					CAST(r.token AS VARCHAR(MAX)) = @token AND
					activo = 1;		

		IF NOT EXISTS
			( 
				SELECT * FROM restablece_contrasena r
					INNER JOIN usuario u
					 ON r.id_usuario = u.id_usuario
				WHERE CAST(u.nombre_usuario AS VARCHAR(MAX)) = @usuario AND
					    CAST(r.token AS VARCHAR(MAX)) = @token AND
						activo = 1
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

			UPDATE restablece_contrasena
			SET activo = 0
			WHERE id_restablece_contrasena = @id;

			UPDATE usuario
			SET autenticado = 1
			WHERE CAST(nombre_usuario AS VARCHAR(MAX)) = @usuario;

			SET @bool = 1;

		END TRY
		BEGIN CATCH

			SET @bool = 8;
			RETURN;

		END CATCH

	END;


/*

CODIGO DE ERRORES BASE DE DATOS

	1: OPERACION EXITOSA OK
	2: USUARIO DE REGISTRO DUPLICADO
	3: ERROR AL ALMACENAR LSO DATOS DE AUTETICACION DEL TOKEN
	4: ERROR AL REGISTRAR AL ESTUDIANTE CON SUS DATOS DE REGISTRO
	5: RELACIONADO AL ERROR 3 SOBRE AL MACENAR EL TOKEN

*/