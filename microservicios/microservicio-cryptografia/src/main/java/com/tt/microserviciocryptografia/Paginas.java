package com.tt.microserviciocryptografia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.microserviciocryptografia.ajax.AjaxDocFirSAT;
import com.tt.microserviciocryptografia.ajax.AjaxFirmas;
import com.tt.microserviciocryptografia.servicios.FirmaSAT;
import com.tt.microserviciocryptografia.servicios.LlavesSAT;

@RestController
public class Paginas {

    @Autowired
    private FirmaSAT firmasDocSat;
    @Autowired
    private LlavesSAT llaveSat;
    
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
            String sal = firmasDocSat.getVerificaDocumento(entrada.getDocumento());
            entrada.setDocumento(sal);

            if( sal == null )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(entrada);
    }

    @PostMapping("/getCadenaParLlaves")
    public ResponseEntity getCadenaParLlaves(@RequestBody AjaxFirmas firmas)
    {
        try {
            firmas = llaveSat.getCadenaParLlaves(firmas);

            if( firmas == null )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(firmas);
    }
}
