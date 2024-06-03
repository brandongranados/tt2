package com.tt.microservicioproxy.servicios;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.tt.microservicioproxy.JsonAjax.AjaxExcelCargaEstuMas;

@Service
public class LecturaExcel {
    @Autowired
    private ConsumoRestv2 rest;
    @Autowired
    private Gson obj;
    @Value("${rutas.excel.ejemplocargamasivaestudiantes}")
    private String ejemploCargaMasiva;
    @Value("${rutas.excel.cargamasivaestu}")
    private String CARGA_MASIVA_EXCEL;
    @Value("${rutas.excel.reinscripcionmasiva}")
    private String REINSCRIPCION_MASIVA_ESTU;

    public ResponseEntity getEjemploCargaMasiva()
    {
        HashMap<String, Object> respRest = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;
        
        try {
            respRest = rest.getRespuestaRest(ejemploCargaMasiva, null);
            codigo = (int)respRest.get("codigo");
            salida = obj.fromJson((String)respRest.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }
        return ResponseEntity.ok(salida);
    }

    public ResponseEntity setCargaMasivaEstudiantes(AjaxExcelCargaEstuMas estudiantes)
    {
        HashMap<String, Object> respRest = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;
        
        try {
            respRest = rest.getRespuestaRest(CARGA_MASIVA_EXCEL, estudiantes);
            codigo = (int)respRest.get("codigo");
            salida = obj.fromJson((String)respRest.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }
        return ResponseEntity.ok(salida);
    }

    public ResponseEntity setReinscripcionMasivaEstudiantes(AjaxExcelCargaEstuMas estudiantes)
    {
        HashMap<String, Object> respRest = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;
        
        try {
            respRest = rest.getRespuestaRest(REINSCRIPCION_MASIVA_ESTU, estudiantes);
            codigo = (int)respRest.get("codigo");
            salida = obj.fromJson((String)respRest.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }
        return ResponseEntity.ok(salida);
    }
}
