package com.tt.basedatos.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.tt.basedatos.JsonAjax.AjaxAltaPeersonal;
import com.tt.basedatos.Repositorios.RepoSp;

@Service
public class Admin {
    @Autowired
    private RepoSp sp;

    @Transactional(readOnly = false)
    public ResponseEntity setRegistarPersonalApoyo(AjaxAltaPeersonal personal)
    {
        Integer bool = 0;

        try {

            bool = sp.spInsertarPersonalGestion
            (
                personal.getPaterno(), 
                personal.getMaterno(), 
                personal.getNombre(), 
                personal.getNumeroEmpleado(), 
                personal.getCorreo(), 
                personal.getUsuario()
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
