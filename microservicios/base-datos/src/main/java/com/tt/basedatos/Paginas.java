package com.tt.basedatos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.basedatos.JsonAjax.AltaEstudianteAjax;
import com.tt.basedatos.JsonAjax.InicioSesionAjax;
import com.tt.basedatos.JsonAjax.RegistroEstuAjax;
import com.tt.basedatos.JsonAjax.Restablecer;
import com.tt.basedatos.JsonAjax.ValidaTokenRegEstAjax;
import com.tt.basedatos.servicios.Paae;
import com.tt.basedatos.servicios.Sesiones;

@RestController
public class Paginas {
    
    @Autowired
    private Sesiones sesion;
    @Autowired
    private Paae paae;
    
    //SESIONES
    @PostMapping("/datosInicioSesion")
    public ResponseEntity datosInicioSesionPuntoAcceso(@RequestBody InicioSesionAjax datos)
    {
        return sesion.getContrasena(datos);
    }








    //VALIDACION CORREOS Y RESGITRO PARCIAL DESDE VENTANAS ESTUDIANTE
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









    //RESTABLECER CONTRSENA
    @PostMapping("/registroRestablecer")
    public ResponseEntity registroRestablecer(@RequestBody Restablecer datos)
    {
        return sesion.registroRestablecer(datos);
    }

    @PostMapping("/validaRestablecer")
    public ResponseEntity validaRestablecer(@RequestBody Restablecer datos)
    {
        return sesion.validaRestablecer(datos);
    }






    //PAAE
    @PostMapping("/setEstudiante")
    public ResponseEntity setEstudiante(@RequestBody AltaEstudianteAjax estudiante)
    {
        return paae.setDatosEstudiante(estudiante);
    }
}
