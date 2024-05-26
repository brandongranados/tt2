package com.tt.microservicioestudiante;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.microservicioestudiante.ajax.AjaxConstanciaEstudios;
import com.tt.microservicioestudiante.ajax.AjaxDocFirSAT;
import com.tt.microservicioestudiante.servicios.Pdf;
import com.tt.microservicioestudiante.servicios.Verificacion;

@RestController
public class Paginas {
    @Autowired
    private Pdf pdf;
    @Autowired
    private Verificacion verifica;
    
    @PostMapping("/estudiantes/constanciaEstudios")
    public ResponseEntity getCostanciaEstudios(@RequestBody AjaxConstanciaEstudios estu)
    {
        return pdf.getConstanciaEstudios(estu.getBoleta());
    }

    @PostMapping("/estudiantes/constanciaInscripcion")
    public ResponseEntity getCostanciaInscripcion(@RequestBody AjaxConstanciaEstudios estu)
    {
        return pdf.getConstanciaInscripcion(estu.getBoleta());
    }

    @PostMapping("/estudiantes/constanciaBecas")
    public ResponseEntity getCostanciaBecas(@RequestBody AjaxConstanciaEstudios estu)
    {
        return pdf.getConstanciaBecas(estu.getBoleta());
    }

    @PostMapping("/estudiantes/constanciaServicio")
    public ResponseEntity getCostanciaServicio(@RequestBody AjaxConstanciaEstudios estu)
    {
        return pdf.getConstanciaServicio(estu.getBoleta());
    }

    @PostMapping("/estudiantes/verificaConstancia")
    public ResponseEntity getCostanciaServicio(@RequestBody AjaxDocFirSAT estu)
    {
        return verifica.getVerificacionDoc(estu);
    }
}
