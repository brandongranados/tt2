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
        @Param("usuarioAlta") String usuarioAlta
    );

}
