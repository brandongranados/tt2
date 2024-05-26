package com.tt.microservicioexcel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.microservicioexcel.Ajax.AjaxExcelCargaEstuMas;
import com.tt.microservicioexcel.servicios.CargaMasivaEstu;
import com.tt.microservicioexcel.servicios.DescargaEjemplos;
import com.tt.microservicioexcel.servicios.ReinscripcionMasiva;

@RestController
public class Paginas {
    @Autowired
    private DescargaEjemplos ejemplos;
    @Autowired
    private CargaMasivaEstu estudiante;
    @Autowired
    private ReinscripcionMasiva reinscribe;
    
    @PostMapping("/documentosExcel/ejemCargaMasivaEstu")
    public ResponseEntity getEjemCargaMasivaEstu()
    {
        return ejemplos.getCargaMasivaEstudiantes();
    }

    @PostMapping("/documentosExcel/cargaMasivaEstu")
    public ResponseEntity setCargaMasivaEstudiantes(@RequestBody AjaxExcelCargaEstuMas estu)
    {
        return estudiante.setCargaMasivaEstu(estu);
    }

    @PostMapping("/documentosExcel/reinscripcionMasivaEstu")
    public ResponseEntity setReinscripcionMasivaEstudiantes(@RequestBody AjaxExcelCargaEstuMas estu)
    {
        return reinscribe.setReinscribeMasivaEstu(estu);
    }
}
