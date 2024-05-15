package com.tt.microservicioproxy.jwt;

import java.security.Key;
import java.util.Base64;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class LlaveHMAC512 {
    public final static Key LLAVE_SESIONES = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public LlaveHMAC512()
    {
        Key llave = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        String base64 = Base64.getEncoder().encodeToString(llave.getEncoded());
    }
}
