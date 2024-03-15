package com.tt.basedatos.Repositorios;

import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoSp extends CrudRepository<ComodinVistas, Integer> {
    
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

}
