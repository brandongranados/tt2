package com.tt.microservicioproxy.JsonAjax;

import jakarta.validation.constraints.NotNull;

public class AjaxListaEstudiante {
    @NotNull
    private int paginacion;

    public int getPaginacion() {
        return paginacion;
    }

    public void setPaginacion(int paginacion) {
        this.paginacion = paginacion;
    }
    
}
