package com.tt.basedatos.servicios;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.tt.basedatos.JsonAjax.AjaxAltaPeersonal;
import com.tt.basedatos.JsonAjax.AjaxBajaPersonal;
import com.tt.basedatos.JsonAjax.AjaxListaEstudiante;
import com.tt.basedatos.Repositorios.RepoSp;
import com.tt.basedatos.Repositorios.RepoVistas;

@Service
public class Admin {
    @Autowired
    private RepoSp sp;
    @Autowired
    private RepoVistas vista;

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
                personal.getUsuarioPersonal(),
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

    @Transactional(readOnly = false)
    public ResponseEntity setBajaPersonalGestion(AjaxBajaPersonal personal)
    {
        Integer bool = 0;

        try {

            bool = sp.spBajaPersonalGestion
            (
                personal.getNumeroEmpleado(),
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

    public ResponseEntity getListaPersonal(AjaxListaEstudiante lista)
    {
        HashMap<String, Object> sal = new HashMap<String, Object>();

        try {
            sal.put("lista", vista.getListaPersonal(lista.getPaginacion()));
            sal.put("cant", vista.getListaPersonalCant());
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(sal);
    }
}
