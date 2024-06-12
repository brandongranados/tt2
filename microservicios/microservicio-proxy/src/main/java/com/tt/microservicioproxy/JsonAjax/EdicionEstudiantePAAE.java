package com.tt.microservicioproxy.JsonAjax;

import com.github.rkpunjal.sqlsafe.SQLInjectionSafe;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class EdicionEstudiantePAAE {
    @NotNull
    private int boleta;
    @NotNull
    private int carrera;
    @NotNull
    private int plan;
    @NotNull
    private int turno;
    @NotNull
    private int estatus;
    @NotBlank
    @SQLInjectionSafe
    @NotNull
    @Size(max = 88, min = 88, message = "Su usuario no cumple con el tamano estipulado")
    private String usuarioAlta;


    public int getBoleta() {
        return boleta;
    }
    public void setBoleta(int boleta) {
        this.boleta = boleta;
    }
    public int getCarrera() {
        return carrera;
    }
    public void setCarrera(int carrera) {
        this.carrera = carrera;
    }
    public int getPlan() {
        return plan;
    }
    public void setPlan(int plan) {
        this.plan = plan;
    }
    public int getTurno() {
        return turno;
    }
    public void setTurno(int turno) {
        this.turno = turno;
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
