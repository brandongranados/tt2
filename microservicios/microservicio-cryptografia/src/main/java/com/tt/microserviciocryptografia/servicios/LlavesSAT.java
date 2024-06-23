package com.tt.microserviciocryptografia.servicios;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.security.Key;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.bouncycastle.asn1.pkcs.PrivateKeyInfo;
import org.bouncycastle.openssl.PEMKeyPair;
import org.bouncycastle.openssl.PEMParser;
import org.springframework.stereotype.Service;

import com.tt.microserviciocryptografia.ajax.AjaxFirmas;
import com.tt.microserviciocryptografia.ajax.AjaxParamResp;
@Service
public class LlavesSAT {
    public AjaxParamResp getCadenaParLlaves(AjaxFirmas firmas)
    {
        AjaxParamResp salida = new AjaxParamResp();

        try {
            PrivateKey llave = this.crearLlavePrivadaRSA(firmas.getRutaLlave(), firmas.getContrasena());
            PublicKey llave2 = this.crearLlavePublicaRSA(firmas.getRutaLlave2());
            String sesiones = this.crearLlaveSesionesHMAC();

            salida.setPrivRSA(Base64.getEncoder().encodeToString(llave.getEncoded()));
            salida.setPubRSA(Base64.getEncoder().encodeToString(llave2.getEncoded()));
            salida.setHMAC512(sesiones);
        } catch (Exception e) {
           return null;
        }

        return salida;
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

    private String crearLlaveSesionesHMAC()
    {
        Key llave = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        return Base64.getEncoder().encodeToString(llave.getEncoded());
    }
}
