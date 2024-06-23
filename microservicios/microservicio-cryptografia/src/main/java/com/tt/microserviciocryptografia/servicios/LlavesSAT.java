package com.tt.microserviciocryptografia.servicios;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;

import org.bouncycastle.asn1.pkcs.PrivateKeyInfo;
import org.bouncycastle.openssl.PEMKeyPair;
import org.bouncycastle.openssl.PEMParser;
import org.springframework.stereotype.Service;

import com.tt.microserviciocryptografia.ajax.AjaxFirmas;
@Service
public class LlavesSAT {
    public AjaxFirmas getCadenaParLlaves(AjaxFirmas firmas)
    {
        try {
            PrivateKey llave = this.crearLlavePrivadaRSA(firmas.getRutaLlave(), firmas.getContrasena());
            PublicKey llave2 = this.crearLlavePublicaRSA(firmas.getRutaLlave2());

            firmas.setRutaLlave(Base64.getEncoder().encodeToString(llave.getEncoded()));
            firmas.setRutaLlave2(Base64.getEncoder().encodeToString(llave2.getEncoded()));
            firmas.setContrasena("");
        } catch (Exception e) {
           return null;
        }

        return firmas;
    }

    private PrivateKey crearLlavePrivadaRSA(String ruta, String contrasena) throws Exception
    {
        PrivateKey privada = null;
        Process proceso = Runtime.getRuntime().exec("openssl rsa -in " +ruta+ " -passin pass:"+contrasena+" -text");
        BufferedReader lectura = new BufferedReader(new InputStreamReader(proceso.getInputStream()));
        String linea, contenido = "";
        while( (linea = lectura.readLine()) != null )
            contenido += linea+"\n";
        lectura.close();
        proceso.waitFor();

        StringReader lec = new StringReader(contenido);
        PEMParser par = new PEMParser(lec);
        PEMKeyPair pares = (PEMKeyPair)par.readObject();
        PrivateKeyInfo obj = (PrivateKeyInfo)pares.getPrivateKeyInfo();
        PKCS8EncodedKeySpec specLlave = new PKCS8EncodedKeySpec(obj.getEncoded());
        KeyFactory facLlave = KeyFactory.getInstance("RSA");

        privada = facLlave.generatePrivate(specLlave);

        return privada;
    }

    private PublicKey crearLlavePublicaRSA(String ruta) throws Exception
    {
        FileInputStream ent = new FileInputStream(ruta);
        CertificateFactory facCert = CertificateFactory.getInstance("X.509");
        X509Certificate cert = (X509Certificate) facCert.generateCertificate(ent);
        PublicKey publica = cert.getPublicKey();

        return publica;
    }
}
