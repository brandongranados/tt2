package com.tt.microservicioproxy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.microservicioproxy.JsonAjax.AjaxAltaPeersonal;
import com.tt.microservicioproxy.JsonAjax.AjaxArrayMasivaEstu;
import com.tt.microservicioproxy.JsonAjax.AjaxBajaPersonal;
import com.tt.microservicioproxy.JsonAjax.AjaxConstanciaEstudios;
import com.tt.microservicioproxy.JsonAjax.AjaxConstanciaUsuario;
import com.tt.microservicioproxy.JsonAjax.AjaxDocFirSAT;
import com.tt.microservicioproxy.JsonAjax.AjaxExcelCargaEstuMas;
import com.tt.microservicioproxy.JsonAjax.AjaxExpedienteEst;
import com.tt.microservicioproxy.JsonAjax.AjaxListaEstudiante;
import com.tt.microservicioproxy.JsonAjax.AjaxListaPersonal;
import com.tt.microservicioproxy.JsonAjax.BajaEstudiantePAAEMasiva;
import com.tt.microservicioproxy.JsonAjax.EdicionEstudiantePAAEMasivo;
import com.tt.microservicioproxy.JsonAjax.MapMateriaGrupEstuPAAEMasiva;
import com.tt.microservicioproxy.JsonAjax.RegEstuTokenAjax;
import com.tt.microservicioproxy.JsonAjax.RegistroEstudianteAjax;
import com.tt.microservicioproxy.JsonAjax.RestablecerSolicitud;
import com.tt.microservicioproxy.JsonAjax.ValidarRestablecerSolicitud;
import com.tt.microservicioproxy.servicios.Admin;
import com.tt.microservicioproxy.servicios.BloquearInyecciones;
import com.tt.microservicioproxy.servicios.ConectarMicroPAAE;
import com.tt.microservicioproxy.servicios.Estudiante;
import com.tt.microservicioproxy.servicios.LecturaExcel;
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

    @Autowired
    private LecturaExcel excel;

    @Autowired
    private Estudiante conexEstu;

    @Autowired
    private Admin admin;

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
    @PostMapping("/personalGestionEscolar/altaMasivaEstudiantes")
    public ResponseEntity setEstudiantes(@Valid @RequestBody AjaxArrayMasivaEstu estu)
    {
        return paae.setAltaMasivaEstudiantes(estu);
    }

    @PostMapping("/personalGestionEscolar/edicionMasivaEstudiantes")
    public ResponseEntity setEdicionMasivaEstudiantes(@Valid @RequestBody EdicionEstudiantePAAEMasivo estu)
    {
        return paae.setEdicionMasivaEstudiantes(estu);
    }

    @PostMapping("/personalGestionEscolar/bajaMasivaEstudiantes")
    public ResponseEntity setBajaMasivaEstudiantes(@Valid @RequestBody BajaEstudiantePAAEMasiva estu)
    {
        return paae.setBajaMasivaEstudiantes(estu);
    }

    @PostMapping("/personalGestionEscolar/mapeoMateriasEstudiantes")
    public ResponseEntity setMapeoMateriaEstudiantes(@Valid @RequestBody MapMateriaGrupEstuPAAEMasiva estu)
    {
        return paae.setMapeoMateriaEstudiantes(estu);
    }

    @PostMapping("/personalGestionEscolar/getListaEstudiantes")
    public ResponseEntity getListaEstudiantes(@Valid @RequestBody AjaxListaEstudiante estu)
    {
        return paae.getListaEstudiantes(estu);
    }

    @PostMapping("/personalGestionEscolar/getExpedienteEstudiante")
    public ResponseEntity getExpedienteEstudiante(@Valid @RequestBody AjaxExpedienteEst estu)
    {
        return paae.getExpedienteEstudiante(estu);
    }






    //MANEJO DE PUNTOS DE ACCESO EN ESTUDIANTES
    @PostMapping("/estudiante/getConstanciaEstudios")
    public ResponseEntity getConstanciaEstudios(@Valid @RequestBody AjaxConstanciaUsuario estu)
    {
        return conexEstu.getConstanciaEstudios(estu);
    }

    @PostMapping("/estudiante/getConstanciaInscripcion")
    public ResponseEntity getConstanciaInscripcion(@Valid @RequestBody AjaxConstanciaUsuario estu)
    {
        return conexEstu.getConstanciaInscripcion(estu);
    }

    @PostMapping("/estudiante/getConstanciaBecas")
    public ResponseEntity getConstanciaBecas(@Valid @RequestBody AjaxConstanciaUsuario estu)
    {
        return conexEstu.getConstanciaBecas(estu);
    }

    @PostMapping("/estudiante/getConstanciaServicio")
    public ResponseEntity getConstanciaServicio(@Valid @RequestBody AjaxConstanciaUsuario estu)
    {
        return conexEstu.getConstanciaServicio(estu);
    }

    @PostMapping("/estudiante/getVerificarConstancia")
    public ResponseEntity getVerificarConstancia(@Valid @RequestBody AjaxDocFirSAT estu)
    {
        return conexEstu.getVerificaDocumento(estu);
    }












    //MANEJO DE PUNTOS DE ACCESO EN ADMIN

    @PostMapping("/admin/setPersonalApoyo")
    public ResponseEntity setPersonalApoyo(@RequestBody AjaxAltaPeersonal personal)
    {
        return admin.setPersonalNuevo(personal);
    }

    @PostMapping("/admin/setBajaPersonalApoyo")
    public ResponseEntity setBajaPersonalApoyo(@RequestBody AjaxBajaPersonal personal)
    {
        return admin.setPersonalBaja(personal);
    }

    @PostMapping("/admin/setListaPersonalApoyo")
    public ResponseEntity setListaPersonalApoyo(@RequestBody AjaxListaPersonal personal)
    {
        return admin.setListaPersonal(personal);
    }











    //PUNTOS DE ACCESO CON LECTURA DE EXCEL
    @PostMapping("/personalGestionEscolar/ejemploCargaMasiva")
    public ResponseEntity getEjemploCargaMasiva()
    {
        return excel.getEjemploCargaMasiva();
    }

    @PostMapping("/personalGestionEscolar/cargaMasivaEstudiantes")
    public ResponseEntity setCargaMasivaEstudiantes(@Valid @RequestBody AjaxExcelCargaEstuMas estu)
    {
        return excel.setCargaMasivaEstudiantes(estu);
    }

    @PostMapping("/personalGestionEscolar/reinscripcionMasivaEstudiantes")
    public ResponseEntity setReinscripcionMasivaEstudiantes(@Valid @RequestBody AjaxExcelCargaEstuMas estu)
    {
        return excel.setReinscripcionMasivaEstudiantes(estu);
    }

}
