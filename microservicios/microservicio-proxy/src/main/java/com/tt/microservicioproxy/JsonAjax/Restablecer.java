package com.tt.microservicioproxy.JsonAjax;

import com.github.rkpunjal.sqlsafe.SQLInjectionSafe;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class Restablecer {
    @NotBlank
    @NotNull
    @SQLInjectionSafe
    private String usuario;
    @NotBlank
    @NotNull
    @SQLInjectionSafe
    private String token;
    @NotBlank
    @NotNull
    @SQLInjectionSafe
    private String contrasena;


    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public String getContrasena() {
        return contrasena;
    }
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}
