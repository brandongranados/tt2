package com.tt.microservicioestudiante;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.microservicioestudiante.ajax.AjaxConstanciaUsuario;
import com.tt.microservicioestudiante.ajax.AjaxDocFirSAT;
import com.tt.microservicioestudiante.ajax.AjaxEstudianteConstancias;
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
        ResponseEntity petBD = null;
        Double boleta = user.getBoleta(estu);
        ResponseEntity resp = pdf.getConstanciaEstudios(boleta.intValue());
        AjaxEstudianteConstancias tipo = new AjaxEstudianteConstancias
        (
            (int)boleta.doubleValue(), 
            "CONSTANCIA DE ESTUDIOS", 
            estu.getUsuario()
        );
        if( resp.getStatusCode().is2xxSuccessful() )
            petBD = pdf.setRegistroConstancia(tipo);
        
        return resp.getStatusCode().is2xxSuccessful() && petBD != null ? resp : ResponseEntity.badRequest().build();
    }

    @PostMapping("/estudiantes/constanciaInscripcion")
    public ResponseEntity getCostanciaInscripcion(@RequestBody AjaxConstanciaUsuario estu)
    {
        ResponseEntity petBD = null;
        Double boleta = user.getBoleta(estu);
        ResponseEntity resp = pdf.getConstanciaInscripcion(boleta.intValue());
        AjaxEstudianteConstancias tipo = new AjaxEstudianteConstancias
        (
            (int)boleta.doubleValue(), 
            "CONSTANCIA DE INSCRIPCION", 
            estu.getUsuario()
        );
        if( resp.getStatusCode().is2xxSuccessful() )
            petBD = pdf.setRegistroConstancia(tipo);
        return resp.getStatusCode().is2xxSuccessful() && petBD != null ? resp : ResponseEntity.badRequest().build();
    }

    @PostMapping("/estudiantes/constanciaBecas")
    public ResponseEntity getCostanciaBecas(@RequestBody AjaxConstanciaUsuario estu)
    {
        ResponseEntity petBD = null;
        Double boleta = user.getBoleta(estu);
        ResponseEntity resp = pdf.getConstanciaBecas(boleta.intValue());
        AjaxEstudianteConstancias tipo = new AjaxEstudianteConstancias
        (
            (int)boleta.doubleValue(), 
            "CONSTANCIA DE BECAS", 
            estu.getUsuario()
        );
        if( resp.getStatusCode().is2xxSuccessful() )
            petBD = pdf.setRegistroConstancia(tipo);
        return resp.getStatusCode().is2xxSuccessful() && petBD != null ? resp : ResponseEntity.badRequest().build();
    }

    @PostMapping("/estudiantes/constanciaServicio")
    public ResponseEntity getCostanciaServicio(@RequestBody AjaxConstanciaUsuario estu)
    {
        ResponseEntity petBD = null;
        Double boleta = user.getBoleta(estu);
        ResponseEntity resp = pdf.getConstanciaServicio(boleta.intValue());
        AjaxEstudianteConstancias tipo = new AjaxEstudianteConstancias
        (
            (int)boleta.doubleValue(), 
            "CONSTANCIA DE SERVICIO SOCIAL", 
            estu.getUsuario()
        );
        if( resp.getStatusCode().is2xxSuccessful() )
            petBD = pdf.setRegistroConstancia(tipo);
        return resp.getStatusCode().is2xxSuccessful() && petBD != null ? resp : ResponseEntity.badRequest().build();
    }

    @PostMapping("/estudiantes/verificaConstancia")
    public ResponseEntity getCostanciaServicio(@RequestBody AjaxDocFirSAT estu)
    {
        return verifica.getVerificacionDoc(estu);
    }
}
