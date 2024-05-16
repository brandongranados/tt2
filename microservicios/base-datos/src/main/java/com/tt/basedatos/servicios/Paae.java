package com.tt.basedatos.servicios;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.tt.basedatos.JsonAjax.AltaEstuAjaxPAAEMasiva;
import com.tt.basedatos.JsonAjax.AltaEstudianteAjaxPAAE;
import com.tt.basedatos.JsonAjax.BajaEstudiantePAAE;
import com.tt.basedatos.JsonAjax.EdicionEstudiantePAAE;
import com.tt.basedatos.JsonAjax.MapMateriaGrupEstuPAAE;
import com.tt.basedatos.Repositorios.RepoSp;

@Service
public class Paae {

    @Autowired
    private RepoSp sp;

    @Transactional(readOnly = false)
    public ResponseEntity setMapeoMateriaGrupoEstudiante(MapMateriaGrupEstuPAAE est)
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
            Map<String, Object> res = new HashMap<String, Object>();
            res.put("bool", bool);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return ResponseEntity.badRequest().body(res);
        }

        return ResponseEntity.ok().build();
    }   
    
    @Transactional(readOnly = false)
    public ResponseEntity setDatosEstudiante(AltaEstudianteAjaxPAAE estudiante)
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
            Map<String, Object> res = new HashMap<String, Object>();
            res.put("bool", bool);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return ResponseEntity.badRequest().body(res);
        }

        return ResponseEntity.ok().build();
    }

    @Transactional(readOnly = false)
    public ResponseEntity setDatosEstudianteMasiva(AltaEstuAjaxPAAEMasiva estudiantesMasiva)
    {
        ArrayList<Integer> boletaError = new ArrayList<Integer>();
        AltaEstudianteAjaxPAAE estudiantes[] = estudiantesMasiva.getEstudiantes();
        Integer bool = 0, error = 0;

        try {

            for (AltaEstudianteAjaxPAAE estudiante : estudiantes) 
            {
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
                    boletaError.add(estudiante.getBoleta());
            }

            if( boletaError.size() > 0 )
            {
                error = 400;
                throw new Exception();
            }

        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return error == 400 ? ResponseEntity.badRequest().body(boletaError) : ResponseEntity.status(500).build();
        }

        return ResponseEntity.ok().build();
    }

    @Transactional(readOnly = false)
    public ResponseEntity setEditaEstudiante(EdicionEstudiantePAAE est)
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
            Map<String, Object> res = new HashMap<String, Object>();
            res.put("bool", bool);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return ResponseEntity.badRequest().body(res);
        }

        return ResponseEntity.ok().build();
    }

    @Transactional(readOnly = false)
    public ResponseEntity setEstatusBajaEstudiante(BajaEstudiantePAAE est)
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
            Map<String, Object> res = new HashMap<String, Object>();
            res.put("bool", bool);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return ResponseEntity.badRequest().body(res);
        }

        return ResponseEntity.ok().build();
    }
}
