package com.tt.microservicioestudiante.servicios;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.tt.microservicioestudiante.ajax.AjaxDocFirSAT;

@Service
public class Verificacion {
    @Value("${rutas.firma.verificacion}")
    private String FIRMA_SAT_VERIFICACION;
    @Autowired
    private ConsumoRest peticiones;
    @Autowired
    private Gson obj;

    public ResponseEntity getVerificacionDoc(AjaxDocFirSAT estu)
    {
        HashMap<String, Object> resPet = null;
        HashMap<String, Object> salida = null;
        int codigo = 400;

        try {
            
            resPet = peticiones.getRespuestaRest(FIRMA_SAT_VERIFICACION, estu);
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
