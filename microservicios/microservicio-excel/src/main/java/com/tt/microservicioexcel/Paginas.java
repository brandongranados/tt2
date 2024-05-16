package com.tt.microservicioexcel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.microservicioexcel.Ajax.AjaxExcelCargaEstuMas;
import com.tt.microservicioexcel.servicios.CargaMasivaEstu;
import com.tt.microservicioexcel.servicios.DescargaEjemplos;

@RestController
public class Paginas {
    @Autowired
    private DescargaEjemplos ejemplos;
    @Autowired
    private CargaMasivaEstu estudiante;
    
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
}
