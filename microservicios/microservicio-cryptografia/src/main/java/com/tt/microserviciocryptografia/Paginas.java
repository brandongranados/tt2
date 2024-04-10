package com.tt.microserviciocryptografia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.microserviciocryptografia.ajax.AjaxDocFirSAT;
import com.tt.microserviciocryptografia.servicios.FirmaSAT;

@RestController
public class Paginas {

    @Autowired
    private FirmaSAT firmasDocSat;
    
    @PostMapping("/getContenidoFirmado")
    public ResponseEntity getContenidoFirmado(@RequestBody AjaxDocFirSAT entrada)
    {
        try {
            String salida = firmasDocSat.getDocumentoFirmado(entrada.getDocumento());
            entrada.setDocumento(salida);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(entrada);
    }

    @PostMapping("/getVerificacionContenido")
    public ResponseEntity getVerificacionContenidos(@RequestBody AjaxDocFirSAT entrada)
    {
        try {
            boolean sal = firmasDocSat.getVerificaDocumento(entrada.getDocumento());

            if( !sal )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

}
