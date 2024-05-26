package com.tt.microservicioproxy.servicios;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.tt.microservicioproxy.JsonAjax.AjaxConstanciaEstudios;
import com.tt.microservicioproxy.JsonAjax.AjaxDocFirSAT;

@Service
public class Estudiante {
    @Autowired
    private ConsumoRestv2 rest;
    @Autowired
    private Gson obj;
    @Value("${rutas.estudiante.estudios}")
    private String IMPRIMIR_CONSTANCIAS_ESTUDIOS;
    @Value("${rutas.estudiante.inscripcion}")
    private String IMPRIMIR_CONSTANCIAS_INSCRIPCION;
    @Value("${rutas.estudiante.becas}")
    private String IMPRIMIR_CONSTANCIAS_BECAS;
    @Value("${rutas.estudiante.servicios}")
    private String IMPRIMIR_CONSTANCIAS_SERVICIO;
    @Value("${rutas.estudiante.verificar}")
    private String IMPRIMIR_CONSTANCIAS_VERIFICAR;

    public ResponseEntity getConstanciaEstudios(AjaxConstanciaEstudios estu)
    {
        HashMap<String, Object> respRest = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;
        
        try {
            respRest = rest.getRespuestaRest(IMPRIMIR_CONSTANCIAS_ESTUDIOS, estu);
            codigo = (int)respRest.get("codigo");
            salida = obj.fromJson((String)respRest.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }
        return ResponseEntity.ok().build();
    }

    public ResponseEntity getConstanciaInscripcion(AjaxConstanciaEstudios estu)
    {
        HashMap<String, Object> respRest = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;
        
        try {
            respRest = rest.getRespuestaRest(IMPRIMIR_CONSTANCIAS_INSCRIPCION, estu);
            codigo = (int)respRest.get("codigo");
            salida = obj.fromJson((String)respRest.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }
        return ResponseEntity.ok().build();
    }

    public ResponseEntity getConstanciaBecas(AjaxConstanciaEstudios estu)
    {
        HashMap<String, Object> respRest = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;
        
        try {
            respRest = rest.getRespuestaRest(IMPRIMIR_CONSTANCIAS_BECAS, estu);
            codigo = (int)respRest.get("codigo");
            salida = obj.fromJson((String)respRest.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }
        return ResponseEntity.ok().build();
    }

    public ResponseEntity getConstanciaServicio(AjaxConstanciaEstudios estu)
    {
        HashMap<String, Object> respRest = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;
        
        try {
            respRest = rest.getRespuestaRest(IMPRIMIR_CONSTANCIAS_SERVICIO, estu);
            codigo = (int)respRest.get("codigo");
            salida = obj.fromJson((String)respRest.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }
        return ResponseEntity.ok().build();
    }

    public ResponseEntity getVerificaDocumento(AjaxDocFirSAT estu)
    {
        HashMap<String, Object> respRest = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;
        
        try {
            respRest = rest.getRespuestaRest(IMPRIMIR_CONSTANCIAS_VERIFICAR, estu);
            codigo = (int)respRest.get("codigo");
            salida = obj.fromJson((String)respRest.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }
        return ResponseEntity.ok().build();
    }
}
