package com.tt.microservicioqr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.microservicioqr.ajax.PetQr;
import com.tt.microservicioqr.servicios.Qr;

@RestController
public class Paginas {

    @Autowired
    private Qr codigo;

    @PostMapping("/getCodigoQR")
    public ResponseEntity getCodigoQR(@RequestBody PetQr datos)
    {
        return codigo.getQr(datos);
    }
}
