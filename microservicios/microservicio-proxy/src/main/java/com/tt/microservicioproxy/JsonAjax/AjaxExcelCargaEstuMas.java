package com.tt.microservicioproxy.JsonAjax;

import com.github.rkpunjal.sqlsafe.SQLInjectionSafe;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AjaxExcelCargaEstuMas {
    @NotBlank
    @SQLInjectionSafe
    @NotNull
    private String docuemnto;

    public String getDocuemnto() {
        return docuemnto;
    }

    public void setDocuemnto(String docuemnto) {
        this.docuemnto = docuemnto;
    }
    
}
