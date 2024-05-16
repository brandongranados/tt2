package com.tt.microservicioproxy.servicios;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.tt.microservicioproxy.JsonAjax.AjaxArrayMasivaEstu;
import com.tt.microservicioproxy.JsonAjax.AjaxCargaMasivaEst;
import com.tt.microservicioproxy.JsonAjax.AjaxExcelCargaEstuMas;

@Service
public class ConectarMicroPAAE {
    @Autowired
    private ConsumoRestv2 rest;
    @Autowired
    private BloquearInyecciones iny;
    @Value("${rutas.paae.altamasiva}")
    private String rutaAltaMasivaEst;
    @Value("${rutas.excel.ejemplocargamasivaestudiantes}")
    private String ejemploCargaMasiva;
    @Value("${rutas.excel.cargamasivaestu}")
    private String CARGA_MASIVA_ESTUDIANTES;
    private Gson obj;

    public ConectarMicroPAAE()
    {
        obj = new Gson();
    }
    
    public ResponseEntity setEstudiantes(AjaxArrayMasivaEstu estudiantes)
    {
        HashMap<String, Object> respRest = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;

        estudiantes.setEstudiantes(this.filtrarInyeccionesAltaMasivaEstu(estudiantes));
        
        try {
            respRest = rest.getRespuestaRest(rutaAltaMasivaEst, estudiantes);
            codigo = (int)respRest.get("codigo");
            salida = obj.fromJson((String)respRest.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }
        return ResponseEntity.ok().build();
    }

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
            respRest = rest.getRespuestaRest(CARGA_MASIVA_ESTUDIANTES, estudiantes);
            codigo = (int)respRest.get("codigo");
            salida = obj.fromJson((String)respRest.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }
        return ResponseEntity.ok(salida);
    }

    private AjaxCargaMasivaEst[] filtrarInyeccionesAltaMasivaEstu(AjaxArrayMasivaEstu estu)
    {
        AjaxCargaMasivaEst est[] = estu.getEstudiantes();

        for ( int i = 0; i < est.length; i++ )
        {
            est[i].setCurp(iny.getCadenaDepuradaInyecciones(est[i].getCurp()));
            est[i].setMaterno(iny.getCadenaDepuradaInyecciones(est[i].getMaterno()));
            est[i].setNombre(iny.getCadenaDepuradaInyecciones(est[i].getNombre()).replaceAll("%20", " "));
            est[i].setPaterno(iny.getCadenaDepuradaInyecciones(est[i].getPaterno()));
            est[i].setSexo(iny.getCadenaDepuradaInyecciones(est[i].getSexo()));
        }

        estu.setEstudiantes(est);
        return est;
    }
}
