package com.tt.microservicioestudiante.ajax;

public class AjaxExpedienteEst {
    private int boleta;

    public AjaxExpedienteEst(){}
    public AjaxExpedienteEst(int boleta)
    {
        this.boleta = boleta;
    }

    public int getBoleta() {
        return boleta;
    }

    public void setBoleta(int boleta) {
        this.boleta = boleta;
    }
    
}
