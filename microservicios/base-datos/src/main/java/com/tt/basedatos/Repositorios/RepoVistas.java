package com.tt.basedatos.Repositorios;

import java.util.List;
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

    //OBTENER CORREO POR USUARIO
    @Query
    (
        value = "SELECT TOP 1 correo_electronico FROM v_obtener_correos "+
                "WHERE nombre_usuario  = :nombre_usuario",
        nativeQuery = true
    )
    public String getCorreo
    (
        @Param("nombre_usuario") String nombreUsuario
    );

    @Query
    (
        value = "SELECT * FROM v_lista_estudiantes ORDER BY nombre ASC "+
                "OFFSET (( :paginacion - 1 )* 100 ) "+
                "ROWS FETCH NEXT ( :paginacion * 100 ) ROWS ONLY",
        nativeQuery = true
    )
    public List<Map<String, Object>> getListaEstudiante
    (
        @Param("paginacion") int paginacion
    );

    @Query
    (
        value = "SELECT * FROM v_list_est_expe_estudiantil "+
                "WHERE num_boleta = :boleta",
        nativeQuery = true
    )
    public Map<String, Object> getExpedienteEstudiante
    (
        @Param("boleta") int boleta
    );

    @Query
    (
        value = "SELECT * FROM v_docuemntos_expediente "+
                "WHERE num_boleta = :boleta",
        nativeQuery = true
    )
    public List<Map<String, Object>> getDocuemntosEstudiantes
    (
        @Param("boleta") int boleta
    );

}
