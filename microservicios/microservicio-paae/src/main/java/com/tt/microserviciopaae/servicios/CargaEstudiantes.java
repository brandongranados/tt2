package com.tt.microserviciopaae.servicios;

import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.tt.microserviciopaae.Ajax.AjaxAltaEstudiantes;
import com.tt.microserviciopaae.Ajax.AjaxArrayAltaEstu;
import com.tt.microserviciopaae.Ajax.AjaxArrayMasivaEstu;
import com.tt.microserviciopaae.Ajax.AjaxCargaMasivaEst;

@Service
public class CargaEstudiantes {
    @Autowired
    private ConsumoRest peticiones;
    @Value("${basededatos.altamasiva}")
    private String rutaAltaMasiva;
    private Gson obj;

    public CargaEstudiantes()
    {
        this.obj = new Gson();
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
