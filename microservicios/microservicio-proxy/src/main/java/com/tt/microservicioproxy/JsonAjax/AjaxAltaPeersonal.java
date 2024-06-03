package com.tt.microservicioproxy.JsonAjax;

import com.github.rkpunjal.sqlsafe.SQLInjectionSafe;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class AjaxAltaPeersonal {
    @NotBlank
    @SQLInjectionSafe
    @NotNull
    private String paterno;
    @NotBlank
    @SQLInjectionSafe
    @NotNull
    private String materno;
    @NotBlank
    @SQLInjectionSafe
    @NotNull
    private String nombre;
    @NotBlank
    @SQLInjectionSafe
    @NotNull
    private String numeroEmpleado;
    @NotBlank
    @SQLInjectionSafe
    @NotNull
    @Email(message = "Correo no valido")
    private String correo;
    @NotBlank
    @SQLInjectionSafe
    @NotNull
    @Size(max = 88, min = 88, message = "Su usuario no cumple con el tamano estipulado")
    private String usuario;


    public String getPaterno() {
        return paterno;
    }
    public void setPaterno(String paterno) {
        this.paterno = paterno;
    }
    public String getMaterno() {
        return materno;
    }
    public void setMaterno(String materno) {
        this.materno = materno;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getNumeroEmpleado() {
        return numeroEmpleado;
    }
    public void setNumeroEmpleado(String numeroEmpleado) {
        this.numeroEmpleado = numeroEmpleado;
    }
    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
}
