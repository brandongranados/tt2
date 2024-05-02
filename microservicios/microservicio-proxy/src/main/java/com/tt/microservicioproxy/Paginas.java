package com.tt.microservicioproxy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.microservicioproxy.JsonAjax.RegEstuTokenAjax;
import com.tt.microservicioproxy.JsonAjax.RegistroEstudianteAjax;
import com.tt.microservicioproxy.JsonAjax.Restablecer;
import com.tt.microservicioproxy.JsonAjax.RestablecerSolicitud;
import com.tt.microservicioproxy.servicios.BloquearInyecciones;
import com.tt.microservicioproxy.servicios.Sesiones;

import jakarta.validation.Valid;

@RestController
public class Paginas {

    @Autowired
    private Sesiones sesion;

    @Autowired
    private BloquearInyecciones iny;

    //VALIDACION CORREOS Y RESGITRO PARCIAL DESDE VENTANAS ESTUDIANTE
    @PostMapping("/registroEstudiante")
    public ResponseEntity registroEstudiante(@Valid @RequestBody RegistroEstudianteAjax datos)
    {

        return sesion.getAutenticarCorreo(datos);
    }

    @PostMapping("/registroEstudianteToken")
    public ResponseEntity registroEstudianteToken(@Valid @RequestBody RegEstuTokenAjax datos)
    {

        datos.setUsuario(datos.getUsuario());

        return sesion.getValidaToken(datos);
    }

    //RESTABLECER CONTRSENA
    @PostMapping("/registroRestablecer")
    public ResponseEntity registroRestablecer(@Valid @RequestBody RestablecerSolicitud datos)
    {

        datos.setUsuario(datos.getUsuario());

        return sesion.registroRestablecer(datos);
    }

    @PostMapping("/validaRestablecer")
    public ResponseEntity validaRestablecer(@Valid @RequestBody Restablecer datos)
    {

        datos.setUsuario(iny.getCadenaDepuradaInyecciones(datos.getUsuario()));
        
        return sesion.validaRestablecer(datos);
    }

    @PostMapping("/restablecer")
    public ResponseEntity restablecer(@Valid @RequestBody Restablecer datos)
    {

        datos.setUsuario(iny.getCadenaDepuradaInyecciones(datos.getUsuario()));
        
        return sesion.validaRestablecer(datos);
    }
}
