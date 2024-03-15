package com.tt.microservicioproxy.JsonAjax;

import jakarta.validation.constraints.NotBlank;

public class RegEstuTokenAjax {

    @NotBlank
    private String usuario;
    @NotBlank
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
