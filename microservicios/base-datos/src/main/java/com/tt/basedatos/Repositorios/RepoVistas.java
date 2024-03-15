package com.tt.basedatos.Repositorios;

import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

@Repository
public interface RepoVistas extends CrudRepository<ComodinVistas, Integer>{

    @Query
    (
        value = "SELECT TOP 1 * FROM v_inicio_sesion "+
                "WHERE nombre_usuario  = :nombre_usuario",
        nativeQuery = true
    )
    public Map<String, Object> inicioSesion
    (
        @Param("nombre_usuario") String nombreUsuario
    );
}
