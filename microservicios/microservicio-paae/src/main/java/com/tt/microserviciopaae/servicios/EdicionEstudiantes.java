package com.tt.microserviciopaae.servicios;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.tt.microserviciopaae.Ajax.EdicionEstudiantePAAE;

@Service
public class EdicionEstudiantes {
    @Value("${basededatos.editaestudiante}")
    private String editaEstudiante;
    @Autowired
    private ConsumoRest peticiones;
    private Gson obj;

    public EdicionEstudiantes()
    {
        this.obj = new Gson();
    }
    
    public ResponseEntity setEdicionEstudinate(EdicionEstudiantePAAE est)
    {
        HashMap<String, Object> resPet = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;

        try {
            
            resPet = peticiones.getRespuestaRest(editaEstudiante, est);
            codigo = (int)resPet.get("codigo");
            salida = obj.fromJson((String)resPet.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }

        return ResponseEntity.ok().build();
    }
}
