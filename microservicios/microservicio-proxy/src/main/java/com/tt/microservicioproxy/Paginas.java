package com.tt.microservicioproxy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.microservicioproxy.JsonAjax.AjaxArrayMasivaEstu;
import com.tt.microservicioproxy.JsonAjax.AjaxExcelCargaEstuMas;
import com.tt.microservicioproxy.JsonAjax.RegEstuTokenAjax;
import com.tt.microservicioproxy.JsonAjax.RegistroEstudianteAjax;
import com.tt.microservicioproxy.JsonAjax.Restablecer;
import com.tt.microservicioproxy.JsonAjax.RestablecerSolicitud;
import com.tt.microservicioproxy.JsonAjax.ValidarRestablecerSolicitud;
import com.tt.microservicioproxy.servicios.BloquearInyecciones;
import com.tt.microservicioproxy.servicios.ConectarMicroPAAE;
import com.tt.microservicioproxy.servicios.Sesiones;

import jakarta.validation.Valid;

@RestController
public class Paginas {

    @Autowired
    private Sesiones sesion;

    @Autowired
    private BloquearInyecciones iny;

    @Autowired
    private ConectarMicroPAAE paae;

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
    public ResponseEntity restablecer(@Valid @RequestBody ValidarRestablecerSolicitud datos)
    {

        datos.setUsuario(iny.getCadenaDepuradaInyecciones(datos.getUsuario()));
        
        return sesion.validaRestablecer(datos);
    }





    //MANEJO DE DATOS PARA SESIONES DE PAAE
    @PostMapping("/personalGestionEscolar/altaEstudiantes")
    public ResponseEntity altaEstudiantes(@Valid @RequestBody AjaxArrayMasivaEstu estudiantes)
    {
        return paae.setEstudiantes(estudiantes);
    }

    @PostMapping("/personalGestionEscolar/ejemploCargaMasiva")
    public ResponseEntity getEjemploCargaMasiva()
    {
        return paae.getEjemploCargaMasiva();
    }

    @PostMapping("/personalGestionEscolar/cargaMasivaEstudiantes")
    public ResponseEntity setCargaMasivaEstudiantes(@Valid @RequestBody AjaxExcelCargaEstuMas estu)
    {
        return paae.setCargaMasivaEstudiantes(estu);
    }
}
