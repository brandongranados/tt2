package com.tt.microservicioestudiante;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.microservicioestudiante.ajax.AjaxConstanciaEstudios;
import com.tt.microservicioestudiante.servicios.Pdf;

@RestController
public class Paginas {
    @Autowired
    private Pdf pdf;
    
    @PostMapping("/estudiantes/constanciaEstudios")
    public ResponseEntity getCostanciaEstudios(@RequestBody AjaxConstanciaEstudios estu)
    {
        return pdf.getConstanciaEstudios(estu.getBoleta());
    }
}
