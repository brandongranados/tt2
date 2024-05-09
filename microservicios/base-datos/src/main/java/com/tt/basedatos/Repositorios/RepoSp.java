package com.tt.basedatos.Repositorios;

import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoSp extends CrudRepository<ComodinVistas, Integer> {
    
    //MANEJO DE SESIONES
    @Procedure(procedureName = "sp_almacenar_usuario_sesion")
    public Integer spAlmacenarUsuarioSesion
    (
        @Param("usuario") String usuario

    );

    @Procedure(procedureName = "sp_elimina_usuario_sesion")
    public Integer spEliminaUsuarioSesion();







    //VALIDACION CORREOS Y RESGITRO PARCIAL DESDE VENTANAS ESTUDIANTE
    @Procedure(procedureName = "sp_registrar_estudiante")
    public Integer spRegistrarEstudiante
    (
        @Param("num_boleta") String numBoleta,
        @Param("nombre_usuario") String nombreUsuario,
        @Param("correo_electronico") String correoElectronico,
        @Param("contrasena") String contrasena,
        @Param("token") String token
    );

    @Procedure(procedureName = "sp_valida_token")
    public Integer spValidaToken
    (
        @Param("nombre_usuario") String nombreUsuario,
        @Param("token") String token
    );







    //RESTABLECER CONTRASENA
    @Procedure(procedureName = "sp_registra_restablece_contrasena")
    public Integer spRegistraRestableceContrasena
    (
        @Param("usuario") String usuario,
        @Param("token") String token
    );






    //RESTABLECER CONTRASENA
    @Procedure(procedureName = "sp_valida_restablece_contrasena")
    public Integer spValidaRestableceContrasena
    (
        @Param("usuario") String usuario,
        @Param("token") String token
    );





    /* PROCEDIMIENTOS PARA PAAES */
    @Procedure(procedureName = "sp_mapeo_materia_grupo_estudiante")
    public Integer spMapeoMateriaGrupoEstudiante(
        @Param("boleta") Integer boleta,
        @Param("unidad_aprendizaje") String unidadAprendizaje,
        @Param("grupo") String grupo,
        @Param("usuario_alta") String usuarioAlta
    );

    @Procedure(procedureName = "sp_alta_estudiante")
    public Integer spAltaEstudiante
    (
        @Param("paterno") String paterno,
        @Param("materno") String materno,
        @Param("nombre") String nombre,
        @Param("curp") String curp,
        @Param("sexo") Integer sexo,
        @Param("fechaNacimiento") String fechaNacimiento,
        @Param("boleta") Integer boleta,
        @Param("carrera") Integer carrera,
        @Param("semestre") Integer semestre,
        @Param("plan") Integer plan,
        @Param("estatus") Integer estatus,
        @Param("usuarioAlta") String usuarioAlta
    );


    @Procedure(procedureName = "sp_edita_estudiante")
    Integer spEditaEstudiante
    (
        @Param("boleta") Integer boleta,
        @Param("carrera") Integer carrera,
        @Param("plan") Integer plan,
        @Param("turno") Integer turno,
        @Param("estatus") Integer estatus,
        @Param("usuario_alta") String usuarioAlta
    );


    @Procedure(procedureName = "sp_estatus_baja_estudiante")
    public Integer spEstatusBajaEstudiante
    (
        @Param("boleta") Integer boleta,
        @Param("estatus") Integer estatus,
        @Param("usuario_alta") String usuarioAlta
    );

}
