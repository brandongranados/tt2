package com.tt.microservicioproxy.JsonAjax;

import com.github.rkpunjal.sqlsafe.SQLInjectionSafe;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RestablecerSolicitud {

    @NotBlank
    @NotNull
    @SQLInjectionSafe
    @Size(max = 88, min = 88, message = "Su usuario no cumple con el tamano estipulado")
    private String usuario;
    @NotBlank
    @NotNull
    @SQLInjectionSafe
    @Size(max = 88, min = 88, message = "Su usuario no cumple con el tamano estipulado")
    private String contrasena;
    

    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    public String getContrasena() {
        return contrasena;
    }
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}
