package com.tt.basedatos.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.tt.basedatos.JsonAjax.AjaxEstudianteConstancias;
import com.tt.basedatos.Repositorios.RepoSp;
import com.tt.basedatos.Repositorios.RepoVistas;

@Service
public class Estudiante {
    @Autowired
    private RepoVistas vista;
    @Autowired
    private RepoSp sp;

    public ResponseEntity getDatosConstaciaEstudios(int boleta)
    {
        try {
            return ResponseEntity.ok(vista.getConstanciaEstudiosDatos(boleta));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity getDatosSemestreActivo()
    {
        try {
            return ResponseEntity.ok(vista.getDatosSemestreActivo());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Transactional(readOnly = false)
    public ResponseEntity setRegistarConstanciaSolictada(AjaxEstudianteConstancias estu)
    {
        Integer bool = 0;
        
        try {
            bool = sp.spRegistraConstancias
            (
                estu.getBoleta(), 
                estu.getConstancia(), 
                estu.getUsuario()
            );

            if( bool != 1 )
                throw new Exception();

        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return ResponseEntity.badRequest().body(bool);
        }

        return ResponseEntity.ok(bool);
    }
}
