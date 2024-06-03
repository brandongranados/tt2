package com.tt.microservicioproxy.servicios;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.tt.microservicioproxy.JsonAjax.AjaxArrayMasivaEstu;
import com.tt.microservicioproxy.JsonAjax.AjaxCargaMasivaEst;
import com.tt.microservicioproxy.JsonAjax.AjaxExpedienteEst;
import com.tt.microservicioproxy.JsonAjax.AjaxListaEstudiante;
import com.tt.microservicioproxy.JsonAjax.BajaEstudiantePAAEMasiva;
import com.tt.microservicioproxy.JsonAjax.EdicionEstudiantePAAEMasivo;
import com.tt.microservicioproxy.JsonAjax.MapMateriaGrupEstuPAAEMasiva;

@Service
public class ConectarMicroPAAE {
    @Autowired
    private ConsumoRestv2 rest;
    @Autowired
    private BloquearInyecciones iny;
    @Autowired
    private Gson obj;
    @Value("${rutas.paae.altamasiva}")
    private String rutaAltaMasivaEst;
    @Value("${rutas.paae.altamasiva}")
    private String PAAE_ALTA_MASIVA;
    @Value("${rutas.paae.edicionmasiva}")
    private String EDICION_MASIVA;
    @Value("${rutas.paae.bajamasiva}")
    private String BAJA_MASIVA;
    @Value("${rutas.paae.mapeomatestmasiva}")
    private String MAPEO_MASIVO;
    @Value("${rutas.paae.listaestudiantes}")
    private String PAAE_LISTA_ESTUDIANTES;
    @Value("${rutas.paae.expedienteestudiante}")
    private String PAAE_EXPEDIENTE_ESTUDIANTE;
    
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

    public ResponseEntity setAltaMasivaEstudiantes(AjaxArrayMasivaEstu estudiantes)
    {
        HashMap<String, Object> respRest = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;
        
        try {
            respRest = rest.getRespuestaRest(PAAE_ALTA_MASIVA, estudiantes);
            codigo = (int)respRest.get("codigo");
            salida = obj.fromJson((String)respRest.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }
        return ResponseEntity.ok(salida);
    }

    public ResponseEntity setEdicionMasivaEstudiantes(EdicionEstudiantePAAEMasivo estudiantes)
    {
        HashMap<String, Object> respRest = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;
        
        try {
            respRest = rest.getRespuestaRest(EDICION_MASIVA, estudiantes);
            codigo = (int)respRest.get("codigo");
            salida = obj.fromJson((String)respRest.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }
        return ResponseEntity.ok(salida);
    }

    public ResponseEntity setBajaMasivaEstudiantes(BajaEstudiantePAAEMasiva estudiantes)
    {
        HashMap<String, Object> respRest = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;
        
        try {
            respRest = rest.getRespuestaRest(BAJA_MASIVA, estudiantes);
            codigo = (int)respRest.get("codigo");
            salida = obj.fromJson((String)respRest.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }
        return ResponseEntity.ok(salida);
    }

    public ResponseEntity setMapeoMateriaEstudiantes(MapMateriaGrupEstuPAAEMasiva estudiantes)
    {
        HashMap<String, Object> respRest = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;
        
        try {
            respRest = rest.getRespuestaRest(MAPEO_MASIVO, estudiantes);
            codigo = (int)respRest.get("codigo");
            salida = obj.fromJson((String)respRest.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }
        return ResponseEntity.ok(salida);
    }

    public ResponseEntity getListaEstudiantes(AjaxListaEstudiante estudiantes)
    {
        HashMap<String, Object> respRest = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;
        
        try {
            respRest = rest.getRespuestaRest(PAAE_LISTA_ESTUDIANTES, estudiantes);
            codigo = (int)respRest.get("codigo");
            salida = obj.fromJson((String)respRest.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }
        return ResponseEntity.ok(salida);
    }

    public ResponseEntity getExpedienteEstudiante(AjaxExpedienteEst estudiantes)
    {
        HashMap<String, Object> respRest = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;
        
        try {
            respRest = rest.getRespuestaRest(PAAE_EXPEDIENTE_ESTUDIANTE, estudiantes);
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
