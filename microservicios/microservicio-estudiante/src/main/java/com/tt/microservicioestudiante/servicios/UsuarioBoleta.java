package com.tt.microservicioestudiante.servicios;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

@Service
public class UsuarioBoleta {
    @Autowired
    private ConsumoRest peticiones;
    @Autowired
    private Gson obj;
    @Value("${rutas.datos.boleta.usuario}")
    private String INICIO_SESION;

    public Double getBoleta(Object datos)
    {
        HashMap<String, Object> resPet = null;
        HashMap<String, Object> salida = null;
        int codigo = 400;

        try {
            
            resPet = peticiones.getRespuestaRest(INICIO_SESION, datos);
            codigo = (int)resPet.get("codigo");
            salida = obj.fromJson((String)resPet.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return null;
        }
        return (Double)salida.get("num_boleta");
    }
}
