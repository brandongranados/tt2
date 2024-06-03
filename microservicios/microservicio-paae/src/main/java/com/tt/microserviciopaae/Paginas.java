package com.tt.microserviciopaae;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.microserviciopaae.Ajax.AjaxArrayMasivaEstu;
import com.tt.microserviciopaae.Ajax.AjaxExpedienteEst;
import com.tt.microserviciopaae.Ajax.AjaxListaEstudiante;
import com.tt.microserviciopaae.Ajax.BajaEstudiantePAAEMasiva;
import com.tt.microserviciopaae.Ajax.EdicionEstudiantePAAEMasivo;
import com.tt.microserviciopaae.Ajax.MapMateriaGrupEstuPAAEMasiva;
import com.tt.microserviciopaae.servicios.ABCEstudiantes;

@RestController
public class Paginas {
    @Autowired
    private ABCEstudiantes funcionesEst;
    
    @PostMapping("/personalGestionEscolar/altaEstudiantes")
    public ResponseEntity setEstudiantes(@RequestBody AjaxArrayMasivaEstu estu)
    {
        return funcionesEst.setEstudiantes(estu);
    }

    @PostMapping("/personalGestionEscolar/editaEstudiantes")
    public ResponseEntity setEditaEstudiantes(@RequestBody EdicionEstudiantePAAEMasivo estu)
    {
        return funcionesEst.setEdicionEstudinate(estu);
    }

    @PostMapping("/personalGestionEscolar/bajaEstudiantes")
    public ResponseEntity setBajaEstudiantes(@RequestBody BajaEstudiantePAAEMasiva estu)
    {
        return funcionesEst.setBajaEstudiantes(estu);
    }

    @PostMapping("/personalGestionEscolar/mapearMateriaEstudiantes")
    public ResponseEntity setMapeMateriaEstudiantes(@RequestBody MapMateriaGrupEstuPAAEMasiva estu)
    {
        return funcionesEst.setMapeoMateriasEst(estu);
    }

    @PostMapping("/personalGestionEscolar/listaEstudiantes")
    public ResponseEntity getListaEstudiantes(@RequestBody AjaxListaEstudiante estu)
    {
        return funcionesEst.getListaEstudiantes(estu);
    }

    @PostMapping("/personalGestionEscolar/expedienteEstudiante")
    public ResponseEntity getListaEstudiantes(@RequestBody AjaxExpedienteEst estu)
    {
        return funcionesEst.getExpedienteEstudiante(estu);
    }
}
