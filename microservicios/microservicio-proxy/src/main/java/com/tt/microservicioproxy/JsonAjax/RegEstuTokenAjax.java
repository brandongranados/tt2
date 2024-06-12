package com.tt.microservicioproxy.JsonAjax;

import com.github.rkpunjal.sqlsafe.SQLInjectionSafe;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RegEstuTokenAjax {

    @NotBlank
    @SQLInjectionSafe
    @NotNull
    @Size(max = 88, min = 88, message = "Su usuario no cumple con el tamano estipulado")
    private String usuario;
    
    @NotBlank
    @SQLInjectionSafe
    @NotNull
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
