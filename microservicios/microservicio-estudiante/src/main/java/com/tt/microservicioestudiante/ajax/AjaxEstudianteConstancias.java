package com.tt.microservicioestudiante.ajax;

public class AjaxEstudianteConstancias {
    private Integer boleta;
    private String constancia;
    private String usuario;

    public AjaxEstudianteConstancias(Integer boleta, String constancia, String usuario)
    {
        this.boleta = boleta;
        this.constancia = constancia;
        this.usuario = usuario;
    }

    public AjaxEstudianteConstancias(){}

    public Integer getBoleta() {
        return boleta;
    }
    public void setBoleta(Integer boleta) {
        this.boleta = boleta;
    }
    public String getConstancia() {
        return constancia;
    }
    public void setConstancia(String constancia) {
        this.constancia = constancia;
    }
    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
}
