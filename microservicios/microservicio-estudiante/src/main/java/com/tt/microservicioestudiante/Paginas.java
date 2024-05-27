package com.tt.microservicioestudiante;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.microservicioestudiante.ajax.AjaxConstanciaUsuario;
import com.tt.microservicioestudiante.ajax.AjaxDocFirSAT;
import com.tt.microservicioestudiante.servicios.Pdf;
import com.tt.microservicioestudiante.servicios.UsuarioBoleta;
import com.tt.microservicioestudiante.servicios.Verificacion;

@RestController
public class Paginas {
    @Autowired
    private Pdf pdf;
    @Autowired
    private Verificacion verifica;
    @Autowired
    private UsuarioBoleta user;
    
    @PostMapping("/estudiantes/constanciaEstudios")
    public ResponseEntity getCostanciaEstudios(@RequestBody AjaxConstanciaUsuario estu)
    {
        Double boleta = user.getBoleta(estu);
        return pdf.getConstanciaEstudios(boleta.intValue());
    }

    @PostMapping("/estudiantes/constanciaInscripcion")
    public ResponseEntity getCostanciaInscripcion(@RequestBody AjaxConstanciaUsuario estu)
    {
        Double boleta = user.getBoleta(estu);
        return pdf.getConstanciaInscripcion(boleta.intValue());
    }

    @PostMapping("/estudiantes/constanciaBecas")
    public ResponseEntity getCostanciaBecas(@RequestBody AjaxConstanciaUsuario estu)
    {
        Double boleta = user.getBoleta(estu);
        return pdf.getConstanciaBecas(boleta.intValue());
    }

    @PostMapping("/estudiantes/constanciaServicio")
    public ResponseEntity getCostanciaServicio(@RequestBody AjaxConstanciaUsuario estu)
    {
        Double boleta = user.getBoleta(estu);
        return pdf.getConstanciaServicio(boleta.intValue());
    }

    @PostMapping("/estudiantes/verificaConstancia")
    public ResponseEntity getCostanciaServicio(@RequestBody AjaxDocFirSAT estu)
    {
        return verifica.getVerificacionDoc(estu);
    }
}
