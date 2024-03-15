package com.tt.microservicioproxy.jwt;

import java.security.Key;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class LlaveHMAC512 {
    public final static Key LLAVE_SESIONES = Keys.secretKeyFor(SignatureAlgorithm.HS512);
}
