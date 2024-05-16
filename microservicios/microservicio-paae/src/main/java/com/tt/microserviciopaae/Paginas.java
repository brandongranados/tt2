package com.tt.microserviciopaae;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.microserviciopaae.Ajax.AjaxArrayMasivaEstu;
import com.tt.microserviciopaae.servicios.CargaEstudiantes;

@RestController
public class Paginas {
    @Autowired
    private CargaEstudiantes funcionesEst;
    
    @PostMapping("/personalGestionEscolar/altaEstudiantes")
    public ResponseEntity setEstudiantes(@RequestBody AjaxArrayMasivaEstu estu)
    {
        return funcionesEst.setEstudiantes(estu);
    }
}
