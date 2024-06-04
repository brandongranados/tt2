package com.tt.microservicio_admin.servicios;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.tt.microservicio_admin.ajax.AjaxAltaPeersonal;
import com.tt.microservicio_admin.ajax.AjaxBajaPersonal;
import com.tt.microservicio_admin.ajax.AjaxListaPersonal;

@Service
public class Admin {
    @Value("${rutas.admin.altapersonal}")
    private String REGISTRO_PERSONAL_APOYO;
    @Value("${rutas.admin.bajapersonal}")
    private String BAJA_PERSONAL;
    @Value("${rutas.admin.listapersonal}")
    private String LISTA_PERSONAL;
    @Autowired
    private ConsumoRest peticiones;
    @Autowired
    private Gson obj;

    public ResponseEntity setPersonalNuevo(AjaxAltaPeersonal personal)
    {
        HashMap<String, Object> resPet = null;
        int codigo = 400;

        try {
            
            resPet = peticiones.getRespuestaRest(REGISTRO_PERSONAL_APOYO, personal);
            codigo = (int)resPet.get("codigo");

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity setPersonalBaja(AjaxBajaPersonal personal)
    {
        HashMap<String, Object> resPet = null;
        int codigo = 400;

        try {
            
            resPet = peticiones.getRespuestaRest(BAJA_PERSONAL, personal);
            codigo = (int)resPet.get("codigo");

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity setListaPersonal(AjaxListaPersonal personal)
    {
        HashMap<String, Object> resPet = null;
        HashMap<String, Object> salida = null;
        int codigo = 400;

        try {
            
            resPet = peticiones.getRespuestaRest(LISTA_PERSONAL, personal);
            codigo = (int)resPet.get("codigo");
            salida = obj.fromJson((String)resPet.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(salida);
    }
}
