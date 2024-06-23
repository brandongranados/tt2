package com.tt.microserviciocryptografia.servicios;

import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.MessageDigest;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.HashMap;

import javax.crypto.Cipher;

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
            this.publica = this.crearLlavePublica();
            this.privada = this.crearLlavePrivada();
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
        byte crudo[] = Base64.getDecoder().decode(this.rutaPublica);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(crudo);

        return keyFactory.generatePublic(keySpec);
    }

    private PrivateKey crearLlavePrivada() throws Exception
    {
        byte crudo[] = Base64.getDecoder().decode(this.rutaPrivada);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(crudo);

        return keyFactory.generatePrivate(keySpec);
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
