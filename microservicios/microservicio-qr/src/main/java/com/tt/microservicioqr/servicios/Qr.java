package com.tt.microservicioqr.servicios;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.Writer;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.tt.microservicioqr.ajax.PetQr;

@Service
public class Qr {
    public ResponseEntity getQr(PetQr datos)
    {
        
        Map<String, Object> salida = new HashMap<String, Object>();

        try {
            byte cadenaCruda[] = Base64.getDecoder().decode(datos.getCaracteresBase64());
            ByteArrayOutputStream codificado = new ByteArrayOutputStream();
            String cadena = new String(cadenaCruda, StandardCharsets.UTF_8);
            Writer codigoQR = new QRCodeWriter();
            BitMatrix arregloQR = codigoQR.encode(cadena, BarcodeFormat.QR_CODE, datos.getAncho(), datos.getAlto());
            MatrixToImageWriter.writeToStream(arregloQR, "PNG", codificado);
            byte crudoSal[] = codificado.toByteArray();

            salida.put("respuesta", Base64.getEncoder().encodeToString(crudoSal));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(salida);
    }
}
