package com.tt.microservicioproxy.servicios;

import java.security.MessageDigest;
import java.util.Base64;

import org.springframework.stereotype.Service;

@Service
public class Cryptografia {
    
    public String crearTokenRestablecerHash512(String datosEntrada)throws Exception
    {
        MessageDigest digesto = MessageDigest.getInstance("SHA-512");

        byte crudo[] = digesto.digest(datosEntrada.getBytes());

        return Base64.getEncoder().encodeToString(crudo);
    }
}
