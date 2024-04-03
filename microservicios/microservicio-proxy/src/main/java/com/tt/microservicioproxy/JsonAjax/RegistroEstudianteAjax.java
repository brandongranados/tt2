package com.tt.microservicioproxy.JsonAjax;

import com.github.rkpunjal.sqlsafe.SQLInjectionSafe;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegistroEstudianteAjax {

    @Size(min = 10, max = 10, message = "Boleta no valida")
    @Pattern(regexp = "^[0-9]+$", message = "Boleta no valida")
    @SQLInjectionSafe
    private String boleta;
    @NotBlank
    @SQLInjectionSafe
    private String usuario;
    @Email(message = "Correo no valido")
    @SQLInjectionSafe
    private String correo;
    @Email(message = "Correo no valido")
    @SQLInjectionSafe
    private String conCorreo;
    @NotBlank
    @SQLInjectionSafe
    private String contrasena;
    @NotBlank
    @SQLInjectionSafe
    private String conContrasena;


    public String getBoleta() {
        return boleta;
    }
    public void setBoleta(String boleta) {
        this.boleta = boleta;
    }
    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public String getConCorreo() {
        return conCorreo;
    }
    public void setConCorreo(String conCorreo) {
        this.conCorreo = conCorreo;
    }
    public String getContrasena() {
        return contrasena;
    }
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
    public String getConContrasena() {
        return conContrasena;
    }
    public void setConContrasena(String conContrasena) {
        this.conContrasena = conContrasena;
    }
}
