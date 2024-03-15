package com.tt.basedatos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.basedatos.JsonAjax.InicioSesionAjax;
import com.tt.basedatos.JsonAjax.RegistroEstuAjax;
import com.tt.basedatos.JsonAjax.ValidaTokenRegEstAjax;
import com.tt.basedatos.servicios.Sesiones;

@RestController
public class Paginas {
    
    @Autowired
    private Sesiones sesion;
    
    @PostMapping("/datosInicioSesion")
    public ResponseEntity datosInicioSesionPuntoAcceso(@RequestBody InicioSesionAjax datos)
    {
        return sesion.getContrasena(datos);
    }

    @PostMapping("/registroEstudiante")
    public ResponseEntity registroEstudiantePuntoAcceso(@RequestBody RegistroEstuAjax datos)
    {
        return sesion.registroEstudiante(datos);
    }

    @PostMapping("/validaTokenRegEst")
    public ResponseEntity validaTokenRegEst(@RequestBody ValidaTokenRegEstAjax datos)
    {
        return sesion.validarTokenCorreo(datos);
    }
}
