package com.tt.basedatos.servicios;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.tt.basedatos.JsonAjax.AjaxExpedienteEst;
import com.tt.basedatos.JsonAjax.AjaxListaEstudiante;
import com.tt.basedatos.JsonAjax.AltaEstuAjaxPAAEMasiva;
import com.tt.basedatos.JsonAjax.AltaEstudianteAjaxPAAE;
import com.tt.basedatos.JsonAjax.BajaEstudiantePAAE;
import com.tt.basedatos.JsonAjax.BajaEstudiantePAAEMasiva;
import com.tt.basedatos.JsonAjax.EdicionEstudiantePAAE;
import com.tt.basedatos.JsonAjax.EdicionEstudiantePAAEMasivo;
import com.tt.basedatos.JsonAjax.MapMateriaGrupEstuPAAE;
import com.tt.basedatos.JsonAjax.MapMateriaGrupEstuPAAEMasiva;
import com.tt.basedatos.Repositorios.RepoSp;
import com.tt.basedatos.Repositorios.RepoVistas;

@Service
public class Paae {

    @Autowired
    private RepoSp sp;

    @Autowired
    private RepoVistas vista;

    public ResponseEntity setDatosEstudianteMasiva(AltaEstuAjaxPAAEMasiva estudiantesMasiva)
    {
        ArrayList<Integer> boletaError = new ArrayList<Integer>();
        AltaEstudianteAjaxPAAE estudiantes[] = estudiantesMasiva.getEstudiantes();
        Integer bool = 0;
        try {

            for (AltaEstudianteAjaxPAAE estudiante : estudiantes)
            
                if( ( bool = this.setDatosEstudiante(estudiante) ) != 1 )
                    boletaError.add(estudiante.getBoleta());

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(bool);
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity setEditaEstudianteMasiva(EdicionEstudiantePAAEMasivo est)
    {
        ArrayList<Integer> boletaError = new ArrayList<Integer>();
        EdicionEstudiantePAAE estudiantes[] = est.getEstudiantes();
        Integer bool = 0;

        try {

            for (EdicionEstudiantePAAE estudiante : estudiantes)
                if( ( bool = this.setEditaEstudiante(estudiante) ) != 1 )
                    boletaError.add(estudiante.getBoleta());

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(bool);
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity setEstatusBajaEstudianteMasiva(BajaEstudiantePAAEMasiva est)
    {
        ArrayList<Integer> boletaError = new ArrayList<Integer>();
        BajaEstudiantePAAE estudiantes[] = est.getEstudiantes();
        Integer bool = 0;

        try {

            for (BajaEstudiantePAAE estudiante : estudiantes) 
                if( (bool = this.setEstatusBajaEstudiante(estudiante) ) != 1 )
                    boletaError.add(estudiante.getBoleta());

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(bool);
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity setMapeoMateriaGrupoEstudianteMasiva(MapMateriaGrupEstuPAAEMasiva est)
    {
        ArrayList<Integer> boletaError = new ArrayList<Integer>();
        MapMateriaGrupEstuPAAE estudiantes[] = est.getEstudiantes();
        Integer bool = 0;

        try {

            for (MapMateriaGrupEstuPAAE estudiante : estudiantes) 
                if( ( bool = this.setMapeoMateriaGrupoEstudiante(estudiante) ) != 1 )
                    boletaError.add(estudiante.getBoleta());

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(bool);
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity getListaEstudiante(AjaxListaEstudiante estu)
    {
        try {
            return ResponseEntity.ok(vista.getListaEstudiante(estu.getPaginacion()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity getExpedienteEstuDatos(AjaxExpedienteEst estu)
    {
        try {
            return ResponseEntity.ok(vista.getExpedienteEstudiante(estu.getBoleta()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity getExpedienteEstuDocs(AjaxExpedienteEst estu)
    {
        try {
            return ResponseEntity.ok(vista.getDocuemntosEstudiantes(estu.getBoleta()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


    @Transactional(readOnly = false)
    private int setMapeoMateriaGrupoEstudiante(MapMateriaGrupEstuPAAE est)
    {
        Integer bool = 0;

        try {

            bool = sp.spMapeoMateriaGrupoEstudiante
            (
                est.getBoleta(), 
                est.getUnidadAprendizaje(), 
                est.getGrupo(), 
                est.getUsuarioAlta()
            );

            if( bool != 1 )
                throw new Exception();

        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return bool;
        }

        return bool;
    }   
    
    @Transactional(readOnly = false)
    private int setEstatusBajaEstudiante(BajaEstudiantePAAE est)
    {
        Integer bool = 0;

        try {

            bool = sp.spEstatusBajaEstudiante
            (
                est.getBoleta(), 
                est.getEstatus(), 
                est.getUsuarioAlta()
            );

            if( bool != 1 )
                throw new Exception();

        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return bool;
        }

        return bool;
    }

    @Transactional(readOnly = false)
    private int setDatosEstudiante(AltaEstudianteAjaxPAAE estudiante)
    {
        Integer bool = 0;

        try {

            bool = sp.spAltaEstudiante
            (
                estudiante.getPaterno(),
                estudiante.getMaterno(),
                estudiante.getNombre(),
                estudiante.getCurp(),
                estudiante.getSexo(),
                estudiante.getFechaNacimiento(),
                estudiante.getBoleta(),
                estudiante.getCarrera(),
                estudiante.getSemestre(),
                estudiante.getPlan(),
                estudiante.getEstatus(),
                estudiante.getUsuario()
            );

            if( bool != 1 )
                throw new Exception();

        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return bool;
        }

        return bool;
    }

    @Transactional(readOnly = false)
    private int setEditaEstudiante(EdicionEstudiantePAAE est)
    {
        Integer bool = 0;

        try {

            bool = sp.spEditaEstudiante
            (
                est.getBoleta(), 
                est.getCarrera(), 
                est.getPlan(), 
                est.getTurno(), 
                est.getEstatus(), 
                est.getUsuarioAlta()
            );

            if( bool != 1 )
                throw new Exception();

        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return bool;
        }

        return bool;
    }
}
