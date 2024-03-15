package com.tt.basedatos.servicios;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.tt.basedatos.JsonAjax.InicioSesionAjax;
import com.tt.basedatos.JsonAjax.RegistroEstuAjax;
import com.tt.basedatos.JsonAjax.ValidaTokenRegEstAjax;
import com.tt.basedatos.Repositorios.RepoSp;
import com.tt.basedatos.Repositorios.RepoVistas;

@Service
public class Sesiones {

    @Autowired
    private RepoVistas vistas;

    @Autowired
    private RepoSp sp;
    
    public ResponseEntity getContrasena(InicioSesionAjax datos)
    {
        Map<String, Object> res = null;

        try {
            res = vistas.inicioSesion(datos.getUsuario());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        
        return ResponseEntity.ok(res);
    }

    @Transactional(readOnly = false)
    public ResponseEntity registroEstudiante(RegistroEstuAjax datos)
    {
        Map<String, Object> resp = new HashMap<String, Object>();
        Integer sal = 0;

        try {
            sal = sp.spRegistrarEstudiante
                (
                    datos.getBoleta(), 
                    datos.getUsuario(), 
                    datos.getCorreo(), 
                    datos.getContrasena(), 
                    datos.getToken()
                );

            if( sal != 1 )
                throw new Exception();

            resp.put("bool", sal);
        } catch (Exception e) {
            resp.put("bool", sal);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(resp);
    }

    @Transactional(readOnly = false)
    public ResponseEntity validarTokenCorreo(ValidaTokenRegEstAjax datos)
    {
        Map<String, Object> resp = new HashMap<String, Object>();
        Integer salida = 0;

        try {
            salida = sp.spValidaToken
                        (
                            datos.getUsuario(),
                            datos.getToken()
                        );

            if( salida != 1 )
                throw new Exception();

            resp.put("bool", salida);

        } catch (Exception e) {
            resp.put("bool", salida);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(resp);
    }
}
