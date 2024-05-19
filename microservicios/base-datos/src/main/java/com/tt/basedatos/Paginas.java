package com.tt.basedatos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.basedatos.JsonAjax.AjaxExpedienteEst;
import com.tt.basedatos.JsonAjax.AjaxListaEstudiante;
import com.tt.basedatos.JsonAjax.AltaEstuAjaxPAAEMasiva;
import com.tt.basedatos.JsonAjax.BajaEstudiantePAAEMasiva;
import com.tt.basedatos.JsonAjax.EdicionEstudiantePAAEMasivo;
import com.tt.basedatos.JsonAjax.InicioSesionAjax;
import com.tt.basedatos.JsonAjax.MapMateriaGrupEstuPAAEMasiva;
import com.tt.basedatos.JsonAjax.RegistroEstuAjax;
import com.tt.basedatos.JsonAjax.Restablecer;
import com.tt.basedatos.JsonAjax.ValidaRestablecer;
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
    public ResponseEntity validaRestablecer(@RequestBody ValidaRestablecer datos)
    {
        return sesion.validaRestablecer(datos);
    }






    //PAAE
    @PostMapping("/personalGestionEscolar/setMapMatGrupEstMasiva")
    public ResponseEntity setMateriaGrupoEstudiante(@RequestBody MapMateriaGrupEstuPAAEMasiva estudiante)
    {
        return paae.setMapeoMateriaGrupoEstudianteMasiva(estudiante);
    }

    @PostMapping("/personalGestionEscolar/setNuevoEstudianteMasiva")
    public ResponseEntity setEstudiante(@RequestBody AltaEstuAjaxPAAEMasiva estudiante)
    {
        return paae.setDatosEstudianteMasiva(estudiante);
    }

    @PostMapping("/personalGestionEscolar/setActulizaEstudianteMasiva")
    public ResponseEntity setDatosEstudianteEdita(@RequestBody EdicionEstudiantePAAEMasivo estudiante)
    {
        return paae.setEditaEstudianteMasiva(estudiante);
    }

    @PostMapping("/personalGestionEscolar/setBajaEstudianteMasiva")
    public ResponseEntity setBajaTemporalDEfinitivaEstudiante(@RequestBody BajaEstudiantePAAEMasiva estudiante)
    {
        return paae.setEstatusBajaEstudianteMasiva(estudiante);
    }

    @PostMapping("/personalGestionEscolar/getListaEstudiantes")
    public ResponseEntity getListaEstudiantes(@RequestBody AjaxListaEstudiante estu)
    {
        return paae.getListaEstudiante(estu);
    }

    @PostMapping("/personalGestionEscolar/getExpedienteDatos")
    public ResponseEntity getExpedienteDatos(@RequestBody AjaxExpedienteEst estu)
    {
        return paae.getExpedienteEstuDatos(estu);
    }

    @PostMapping("/personalGestionEscolar/getExpedienteDocs")
    public ResponseEntity getExpedienteDoc(@RequestBody AjaxExpedienteEst estu)
    {
        return paae.getExpedienteEstuDocs(estu);
    }
}
