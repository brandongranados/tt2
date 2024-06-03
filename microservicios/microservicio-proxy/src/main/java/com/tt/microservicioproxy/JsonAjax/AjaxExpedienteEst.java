package com.tt.microservicioproxy.JsonAjax;

import jakarta.validation.constraints.NotNull;

public class AjaxExpedienteEst {
    @NotNull
    private int boleta;

    public int getBoleta() {
        return boleta;
    }

    public void setBoleta(int boleta) {
        this.boleta = boleta;
    }
    
}
