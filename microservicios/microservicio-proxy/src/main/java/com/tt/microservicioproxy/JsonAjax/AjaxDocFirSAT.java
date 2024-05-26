package com.tt.microservicioproxy.JsonAjax;

import com.github.rkpunjal.sqlsafe.SQLInjectionSafe;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public class AjaxDocFirSAT {
    @NotBlank
    @NotEmpty
    @SQLInjectionSafe
    private String documento;

    public AjaxDocFirSAT(){}
    public AjaxDocFirSAT(String documento)
    {
        this.documento = documento;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }
    
}
