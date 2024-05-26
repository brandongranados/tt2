package com.tt.microservicioproxy.JsonAjax;

import com.github.rkpunjal.sqlsafe.SQLInjectionSafe;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ValidarRestablecerSolicitud {

    @NotBlank
    @NotNull
    @SQLInjectionSafe
    private String usuario;
    @NotBlank
    @NotNull
    @SQLInjectionSafe
    private String token;


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
}
