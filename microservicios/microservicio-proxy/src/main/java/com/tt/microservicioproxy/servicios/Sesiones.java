package com.tt.microservicioproxy.servicios;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tt.microservicioproxy.JsonAjax.RegEstuTokenAjax;
import com.tt.microservicioproxy.JsonAjax.RegistroEstuPetRest;
import com.tt.microservicioproxy.JsonAjax.RegistroEstudianteAjax;
import com.tt.microservicioproxy.JsonAjax.Restablecer;
import com.tt.microservicioproxy.JsonAjax.RestablecerSolicitud;
import com.tt.microservicioproxy.diccionarios.Rutas;

@Service
public class Sesiones {

    @Autowired
    private Correo correo;

    @Autowired
    private Cryptografia crypto;

    @Autowired
    private ConsumoRest rest;
    
    public ResponseEntity getAutenticarCorreo(RegistroEstudianteAjax datos)
    {
        RegistroEstuPetRest pet = new RegistroEstuPetRest();
        String token  = null;
        Optional resp = null;
        Map<String, Object> bd = null;

        pet.setBoleta(datos.getBoleta());
        pet.setContrasena(datos.getContrasena());
        pet.setCorreo(datos.getCorreo());
        pet.setUsuario(datos.getUsuario());

        if( !this.validaCadenasIguales(datos.getContrasena(), datos.getConContrasena()) )
            return ResponseEntity.badRequest().build();

        if( !this.validaCadenasIguales(datos.getConCorreo(), datos.getCorreo()) )
            return ResponseEntity.badRequest().build();

        try {
            token = crypto.crearTokenRestablecerHash512(datos.getBoleta()+datos.getUsuario()+datos.getCorreo()+System.currentTimeMillis());
            pet.setToken(token);
            resp = rest.getRespuestaRest(Rutas.REGISTRO_ESTUDIANTE_VALIDA_CORREO, pet);

            if( !resp.isPresent() )
                throw new Exception();
            else
                bd = (Map<String, Object>)resp.get();

            if( ((Double) bd.get("bool")) != 1 )
                throw new Exception();

            correo.enviarCorreo(1, datos.getCorreo(), token);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity getValidaToken(RegEstuTokenAjax datos)
    {
        Optional resp = null;
        Map<String, Object> bd = null;

        try {
            resp = rest.getRespuestaRest(Rutas.VALIDA_TOKEN_REG_EST, datos);

            if( !resp.isPresent() )
                throw new Exception();
            else
                bd = (Map<String, Object>)resp.get();

            if( ((Double) bd.get("bool")) != 1 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity registroRestablecer(RestablecerSolicitud datos)
    {
        Restablecer envia = new Restablecer();
        Optional resp = null;
        Map<String, Object> bd = null;
        String token = "";

        try {
            token = crypto.crearTokenRestablecerHash512(datos.getUsuario()+System.currentTimeMillis());
            envia.setUsuario(datos.getUsuario());
            envia.setToken(token);
            resp = rest.getRespuestaRest(Rutas.REGISTRO_RESTABLECER, datos);

            if( !resp.isPresent() )
                throw new Exception();
            else
                bd = (Map<String, Object>)resp.get();

            if( ((Double) bd.get("bool")) != 1 )
                throw new Exception();

            correo.enviarCorreo(1, datos.getCorreo(), token);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity validaRestablecer(Restablecer datos)
    {
        Optional resp = null;
        Map<String, Object> bd = null;

        try {
            resp = rest.getRespuestaRest(Rutas.VALIDA_RESTABLECER, datos);

            if( !resp.isPresent() )
                throw new Exception();
            else
                bd = (Map<String, Object>)resp.get();

            if( ((Double) bd.get("bool")) != 1 )
                throw new Exception();

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    private boolean validaCadenasIguales(String cad1, String cad2)
    {
        return cad1.equals(cad2);
    }
}
