package com.tt.microserviciopaae.servicios;

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.tt.microserviciopaae.Ajax.BajaEstudiantePAAEMasiva;
import com.tt.microserviciopaae.Ajax.AjaxAltaEstudiantes;
import com.tt.microserviciopaae.Ajax.AjaxArrayAltaEstu;
import com.tt.microserviciopaae.Ajax.AjaxArrayMasivaEstu;
import com.tt.microserviciopaae.Ajax.AjaxCargaMasivaEst;
import com.tt.microserviciopaae.Ajax.AjaxExpedienteEst;
import com.tt.microserviciopaae.Ajax.AjaxListaEstudiante;
import com.tt.microserviciopaae.Ajax.EdicionEstudiantePAAEMasivo;
import com.tt.microserviciopaae.Ajax.MapMateriaGrupEstuPAAEMasiva;

@Service
public class ABCEstudiantes {
    @Value("${basededatos.editaestudiante}")
    private String editaEstudiante;
    @Value("${basededatos.altamasiva}")
    private String rutaAltaMasiva;
    @Value("${basededatos.bajasEstudiante}")
    private String rutaBajaMasiva;
    @Value("${basededatos.mapeomateriasest}")
    private String rutaMapeoMasivo;
    @Value("${basededatos.listaestudiantes}")
    private String RUTA_LISTA_ESTUDIANTES;
    @Value("${basededatos.expedientedatos}")
    private String EXPEDIENTE_DATOS_ESTUDIANTES;
    @Value("${basededatos.expediantedocs}")
    private String EXPEDIENTE_DOCS_ESTUDIANTES;
    @Value("${ruta.documentorelativa}")
    private String RUTA_DOCUMENTOS_EST;
    @Autowired
    private ConsumoRest peticiones;
    private Gson obj;

    public ABCEstudiantes()
    {
        obj = new Gson();
    }

    public ResponseEntity setEdicionEstudinate(EdicionEstudiantePAAEMasivo est)
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

    public ResponseEntity setEstudiantes(AjaxArrayMasivaEstu estu)
    {
        HashMap<String, Object> resPet = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;

        try {
            AjaxArrayAltaEstu reset = this.resetearEntrada(estu);
            
            resPet = peticiones.getRespuestaRest(rutaAltaMasiva, reset);
            codigo = (int)resPet.get("codigo");
            salida = obj.fromJson((String)resPet.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity setBajaEstudiantes(BajaEstudiantePAAEMasiva estu)
    {
        HashMap<String, Object> resPet = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;

        try {
            
            resPet = peticiones.getRespuestaRest(rutaBajaMasiva, estu);
            codigo = (int)resPet.get("codigo");
            salida = obj.fromJson((String)resPet.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity setMapeoMateriasEst(MapMateriaGrupEstuPAAEMasiva estu)
    {
        HashMap<String, Object> resPet = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;

        try {
            
            resPet = peticiones.getRespuestaRest(rutaMapeoMasivo, estu);
            codigo = (int)resPet.get("codigo");
            salida = obj.fromJson((String)resPet.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity getListaEstudiantes(AjaxListaEstudiante estu)
    {
        HashMap<String, Object> resPet = null;
        HashMap<Object, Object> salida = null;
        int codigo = 400;

        try {
            
            resPet = peticiones.getRespuestaRest(RUTA_LISTA_ESTUDIANTES, estu);
            codigo = (int)resPet.get("codigo");
            salida = obj.fromJson((String)resPet.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.status(codigo).body(salida);
        }

        return ResponseEntity.ok(salida);
    }

    public ResponseEntity getExpedienteEstudiante(AjaxExpedienteEst estu)
    {
        HashMap<String, Object> salida = new HashMap<String, Object>();

        try {
            salida.put("datos", this.getExpedienteDatos(estu));
            salida.put("dcos", this.getExpedienteDocs(estu));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(salida);
    }
    
    
    
    private HashMap<String, Object> getExpedienteDatos(AjaxExpedienteEst estu)
    {
        HashMap<String, Object> resPet = null;
        int codigo = 400;

        try {
            
            resPet = peticiones.getRespuestaRest(EXPEDIENTE_DATOS_ESTUDIANTES, estu);
            codigo = (int)resPet.get("codigo");

            if( codigo != 200 )
                throw new Exception();

            return obj.fromJson((String)resPet.get("datos"), HashMap.class);

        } catch (Exception e) {
            return null;
        }

    }

    private List<HashMap<String, Object>> getExpedienteDocs(AjaxExpedienteEst estu)
    {
        HashMap<String, Object> resPet = null;
        List<HashMap<String, Object>> salida = null;
        int codigo = 400;

        try {
            
            resPet = peticiones.getRespuestaRest(EXPEDIENTE_DOCS_ESTUDIANTES, estu);
            codigo = (int)resPet.get("codigo");
            salida = obj.fromJson((String)resPet.get("datos"), List.class);

            if( codigo != 200 )
                throw new Exception();

            for( int i = 0; i < salida.size(); i++ )
                salida.get(i).put("ruta", this.getDocumentoCrudo((String)salida.get(i).get("ruta")));

        } catch (Exception e) {
            return null;
        }

        return salida;

    }

    private String getDocumentoCrudo(String resto)throws Exception
    {
        DataInputStream ent = new DataInputStream(new FileInputStream(RUTA_DOCUMENTOS_EST+resto));
        byte crudo[] = new byte[ent.available()];
        ent.read(crudo);
        ent.close(); 

        return Base64.getEncoder().encodeToString(crudo);
    }

    private AjaxArrayAltaEstu resetearEntrada(AjaxArrayMasivaEstu est)
    {
        //ENTRADAS
        AjaxCargaMasivaEst ent[] = est.getEstudiantes();

        //SALIDAS
        AjaxArrayAltaEstu salida = new AjaxArrayAltaEstu();
        AjaxAltaEstudiantes estudiantes[] = new AjaxAltaEstudiantes[ent.length];
        int i = 0;

        for (AjaxCargaMasivaEst estudiante : ent) 
        {
            estudiantes[i] = new AjaxAltaEstudiantes();

            estudiantes[i].setPaterno(estudiante.getPaterno());
            estudiantes[i].setMaterno(estudiante.getMaterno());
            estudiantes[i].setNombre(estudiante.getNombre());
            estudiantes[i].setCurp(estudiante.getCurp());
            estudiantes[i].setSexo("M".equals(estudiante.getSexo().toLowerCase()) ? 0 : 1);
            estudiantes[i].setFechaNacimiento(estudiante.getFechaNacimiento());
            estudiantes[i].setBoleta(estudiante.getBoleta());
            estudiantes[i].setCarrera(estudiante.getCarrera());
            estudiantes[i].setSemestre(estudiante.getSemestre());
            estudiantes[i].setPlan(estudiante.getPlan());
            estudiantes[i].setEstatus(estudiante.getEstatus());
            estudiantes[i].setUsuario(estudiante.getUsuario());
            i++;
        }

        salida.setEstudiantes(estudiantes);
        return salida;

    }
}
