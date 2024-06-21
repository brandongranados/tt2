package com.tt.microservicioproxy.configuracion;

import java.io.IOException;
import java.security.Key;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.google.gson.Gson;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class ValidarToken extends BasicAuthenticationFilter{
    private Key llave;

    public ValidarToken(AuthenticationManager authenticationManager, String LLAVE_SESIONES_ENV) 
    { 
        super(authenticationManager);
        this.llave = Keys.hmacShaKeyFor(Base64.getDecoder().decode(LLAVE_SESIONES_ENV));
    }

    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain chain)
            throws IOException, ServletException {
        
        String header = request.getHeader("Authorization");
        Gson obj = new Gson();
        String token = null;

        if( header == null || !header.startsWith("Bearer ") )
        {
            chain.doFilter(request, response);
            return;
        }

        try {
            token = header.replace("Bearer ", "");

            Claims revisar = (Claims)Jwts.parserBuilder()
                                .setSigningKey(this.llave)
                                .build()
                                .parseClaimsJws(token)
                                .getBody();

            Object rolesClaim = revisar.get("permisos");
            List<GrantedAuthority> permisos = Arrays.asList
            (
                obj.fromJson(rolesClaim.toString(), SimpleGrantedAuthority[].class)
            );


            UsernamePasswordAuthenticationToken aut = 
            new UsernamePasswordAuthenticationToken(revisar.get("sub"), 
                                    null, permisos);

            SecurityContextHolder.getContext().setAuthentication(aut);
            chain.doFilter(request, response);
        } catch (Exception e) {
            chain.doFilter(request, response);
        }

        return;
    }
}
