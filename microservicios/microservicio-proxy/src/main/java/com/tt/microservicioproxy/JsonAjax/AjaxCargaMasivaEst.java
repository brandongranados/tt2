package com.tt.microservicioproxy.JsonAjax;

import com.github.rkpunjal.sqlsafe.SQLInjectionSafe;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class AjaxCargaMasivaEst {
    @SQLInjectionSafe
    @NotBlank
    @NotNull
    private String paterno;
    @SQLInjectionSafe
    @NotBlank
    @NotNull
    private String materno;
    @SQLInjectionSafe
    @NotBlank
    @NotNull
    private String nombre;
    @SQLInjectionSafe
    @NotBlank
    @NotNull
    @Size(min = 18, max = 18, message = "El curp debe de ser de un tamano de 18 caracteres")
    private String curp;
    @SQLInjectionSafe
    @NotBlank
    @NotNull
    private String sexo;
    @SQLInjectionSafe
    @NotBlank
    @NotNull
    private String fechaNacimiento;
    @NotNull
    private int boleta;
    @NotNull
    private int carrera;
    @NotNull
    private int semestre;
    @NotNull
    private int plan;
    @NotNull
    private int estatus;
    @SQLInjectionSafe
    @NotBlank
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
    public String getCurp() {
        return curp;
    }
    public void setCurp(String curp) {
        this.curp = curp;
    }
    public String getSexo() {
        return sexo;
    }
    public void setSexo(String sexo) {
        this.sexo = sexo;
    }
    public String getFechaNacimiento() {
        return fechaNacimiento;
    }
    public void setFechaNacimiento(String fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }
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
    public int getSemestre() {
        return semestre;
    }
    public void setSemestre(int semestre) {
        this.semestre = semestre;
    }
    public int getPlan() {
        return plan;
    }
    public void setPlan(int plan) {
        this.plan = plan;
    }
    public int getEstatus() {
        return estatus;
    }
    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }
    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
}
