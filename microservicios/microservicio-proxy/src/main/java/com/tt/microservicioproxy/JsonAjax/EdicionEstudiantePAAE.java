package com.tt.microservicioproxy.JsonAjax;

import com.github.rkpunjal.sqlsafe.SQLInjectionSafe;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class EdicionEstudiantePAAE {
    
    private int boleta;
    @Size(min = 1, max = 3, message = "Revisar el excel de ejmplo el tipo de entrada")
    private int carrera;
    private int plan;
    @Size(min = 1, max = 2, message = "Revisar el excel de ejmplo el tipo de entrada")
    private int turno;
    @Size(min = 1, max = 5, message = "Revisar el excel de ejmplo el tipo de entrada")
    private int estatus;
    @NotBlank
    @SQLInjectionSafe
    @NotNull
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
