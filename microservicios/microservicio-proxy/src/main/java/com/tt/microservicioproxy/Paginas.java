package com.tt.microservicioproxy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.microservicioproxy.JsonAjax.RegEstuTokenAjax;
import com.tt.microservicioproxy.JsonAjax.RegistroEstudianteAjax;
import com.tt.microservicioproxy.servicios.Sesiones;

import jakarta.validation.Valid;

@RestController
public class Paginas {

    @Autowired
    private Sesiones sesion;

    @PostMapping("/registroEstudiante")
    public ResponseEntity registroEstudiante(@Valid @RequestBody RegistroEstudianteAjax datos)
    {
        return sesion.getAutenticarCorreo(datos);
    }

    @PostMapping("/registroEstudianteToken")
    public ResponseEntity registroEstudianteToken(@Valid @RequestBody RegEstuTokenAjax datos)
    {
        return sesion.getValidaToken(datos);
    }
}
