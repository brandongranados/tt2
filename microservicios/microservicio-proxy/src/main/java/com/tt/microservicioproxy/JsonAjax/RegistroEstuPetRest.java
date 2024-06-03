package com.tt.microservicioproxy.JsonAjax;

import com.github.rkpunjal.sqlsafe.SQLInjectionSafe;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegistroEstuPetRest {
    @NotBlank
    @Size(min = 10, max = 10, message = "La boleta solo puede tener 10 numeros")
    @Pattern(regexp = "^[0-9]+$", message = "Boleta no valida")
    @SQLInjectionSafe
    private String boleta;
    @NotBlank
    @SQLInjectionSafe
    @NotNull
    @Size(max = 88, min = 88, message = "Su usuario no cumple con el tamano estipulado")
    private String usuario;
    @NotBlank
    @SQLInjectionSafe
    @Email(message = "Correo no valido")
    @NotNull
    private String correo;
    @NotBlank
    @SQLInjectionSafe
    @NotNull
    @Size(max = 88, min = 88, message = "Su usuario no cumple con el tamano estipulado")
    private String contrasena;
    @NotBlank
    @SQLInjectionSafe
    @NotNull
    private String token;


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
    public String getContrasena() {
        return contrasena;
    }
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
}
