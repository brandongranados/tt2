package com.tt.microservicioexcel.servicios;

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class DescargaEjemplos {
    
    @Value("${excel.ejemplo.cargamasiva.estudiantes}")
    private String rutaCargaMasivaEst;

    public ResponseEntity getCargaMasivaEstudiantes()
    {
        DataInputStream ent = null;
        byte crudo[] = null;
        String salida = null;
        Map<String, Object> resp = new HashMap<String, Object>();

        try {
            ent = new DataInputStream(new FileInputStream(rutaCargaMasivaEst));
            crudo = new byte[ent.available()];
            ent.read(crudo);
            ent.close();

            salida = Base64.getEncoder().encodeToString(crudo);

            if( salida == null )
                throw new Exception();

            resp.put("documento", salida);

        } catch (Exception e) {
            try {ent.close();} catch (Exception e1) {}
            return ResponseEntity.badRequest().build();
        }
        finally{
            try {ent.close();} catch (Exception e) {}
        }

        return ResponseEntity.ok(resp);
    }
}
