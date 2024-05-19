package com.tt.microservicioproxy.JsonAjax;

import com.github.rkpunjal.sqlsafe.SQLInjectionSafe;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class BajaEstudiantePAAE {
    @Size(min = 10, max = 10, message = "Revisar el excel de ejmplo el tipo de entrada")
    private int boleta;
    @Size(min = 1, max = 1, message = "Revisar el excel de ejmplo el tipo de entrada")
    private int estatus;
    @SQLInjectionSafe
    @NotBlank
    @NotEmpty
    private String usuarioAlta;


    public int getBoleta() {
        return boleta;
    }
    public void setBoleta(int boleta) {
        this.boleta = boleta;
    }
    public int getEstatus() {
        return estatus;
    }
    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }
    public String getUsuarioAlta() {
        return usuarioAlta;
    }
    public void setUsuarioAlta(String usuarioAlta) {
        this.usuarioAlta = usuarioAlta;
    }
}
