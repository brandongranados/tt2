package com.tt.microserviciocryptografia.servicios;

import java.io.ByteArrayInputStream;
import java.io.StringReader;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.MessageDigest;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;
import java.util.HashMap;

import javax.crypto.Cipher;

import org.bouncycastle.asn1.pkcs.PrivateKeyInfo;
import org.bouncycastle.openssl.PEMKeyPair;
import org.bouncycastle.openssl.PEMParser;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class FirmaSAT {
    @Value("${llaves.ruta.privada}")
    private String rutaPrivada;
    @Value("${llaves.ruta.publica}")
    private String rutaPublica;
    private PrivateKey privada;
    private PublicKey publica;
    private Cipher cifrador;

    @PostConstruct
    public void iniciar()
    {
        try {
            this.privada = this.crearLlavePrivada();
            this.publica = this.crearLlavePublica();
            this.cifrador = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        } catch (Exception e) {
            this.privada = null;
            this.publica = null;
            this.cifrador = null;
        }
    }

    public String getDocumentoFirmado(String base64Crudo)throws Exception
    {
        byte crudo[] = Base64.getDecoder().decode(base64Crudo);
        byte firma[] = this.getFirmaDigital(crudo);
        
        return Base64.getEncoder().encodeToString(this.getMezclarArrayByte(crudo, firma));
    }
    
    public String getVerificaDocumento(String base64Crudo) throws Exception
    {
        HashMap<Integer, byte[]> doc = this.dividirArrayByte(Base64.getDecoder().decode(base64Crudo));
        byte digesto[] = this.getDigesto((byte[])doc.get(1));
        byte firmaDescifrada[] = this.getContenidoDescifrado((byte[])doc.get(2));

        if( digesto.length != firmaDescifrada.length )
            return null;

        for( int i = 0; i < digesto.length; i++ )
            if( digesto[i] != firmaDescifrada[i] )
                return null;

        return new String((byte[])doc.get(1), StandardCharsets.UTF_8);
    }


    private byte[] getFirmaDigital(byte crudo[])throws Exception
    {
        byte digesto[] = this.getDigesto(crudo);

        return this.getContenidoCifrado(digesto);
    }

    private byte[] getDigesto(byte crudo[])throws Exception
    {
        MessageDigest inst = MessageDigest.getInstance("SHA-512");

        return inst.digest(crudo);
    }

    private byte[] getContenidoCifrado(byte crudo[])throws Exception
    {

        cifrador.init(Cipher.ENCRYPT_MODE, this.privada);

        return cifrador.doFinal(crudo);
    }

    private byte[] getContenidoDescifrado(byte crudo[])throws Exception
    {

        cifrador.init(Cipher.DECRYPT_MODE, this.publica);

        return cifrador.doFinal(crudo);
    }

    private PublicKey crearLlavePublica() throws Exception
    {
        byte crudo[] = Base64.getDecoder().decode(Base64.getDecoder().decode(this.rutaPublica));
        ByteArrayInputStream array = new ByteArrayInputStream(crudo);
        CertificateFactory facCert = CertificateFactory.getInstance("X.509");
        X509Certificate cert = (X509Certificate) facCert.generateCertificate(array);
        PublicKey publica = cert.getPublicKey();

        return publica;
    }

    private PrivateKey crearLlavePrivada() throws Exception
    {
        byte contenidoCrudo[] = Base64.getDecoder().decode(rutaPrivada);
        String contendido = new String(contenidoCrudo, StandardCharsets.UTF_8);
        PrivateKey privada = null;
        StringReader lec = new StringReader(contendido);
        PEMParser par = new PEMParser(lec);
        PEMKeyPair pares = (PEMKeyPair)par.readObject();
        PrivateKeyInfo obj = (PrivateKeyInfo)pares.getPrivateKeyInfo();
        PKCS8EncodedKeySpec specLlave = new PKCS8EncodedKeySpec(obj.getEncoded());
        KeyFactory facLlave = KeyFactory.getInstance("RSA");

        privada = facLlave.generatePrivate(specLlave);

        return privada;
    }

    private byte[] getMezclarArrayByte(byte uno[], byte dos[]) throws Exception
    {
        byte salida[] = new byte[uno.length+dos.length];

        for( int i = 0; i < uno.length; i++ )
            salida[i] = uno[i];

        for( int i = 0; i < dos.length; i++ )
            salida[i+uno.length] = dos[i];

        return salida;
    }

    private HashMap<Integer, byte[]> dividirArrayByte(byte crudo[]) throws Exception
    {
        HashMap<Integer, byte[]> salida = new HashMap<Integer, byte[]>();
        byte salida1[] = new byte[crudo.length-256];
        byte salida2[] = new byte[256];

        for( int i = 0; i < salida1.length; i++ )
            salida1[i] = crudo[i];

        for( int i = 0; i < salida2.length; i++ )
            salida2[i] = crudo[i+salida1.length];

        salida.put(1, salida1);
        salida.put(2, salida2);

        return salida;
    }
}
