package com.tt.microservicioproxy.JsonAjax;

import com.github.rkpunjal.sqlsafe.SQLInjectionSafe;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class MapMateriaGrupEstuPAAE {
    @NotNull
    private int boleta;
    @SQLInjectionSafe
    @NotBlank
    @NotEmpty
    @NotNull
    private String unidadAprendizaje;
    @SQLInjectionSafe
    @NotBlank
    @NotEmpty
    @NotNull
    private String grupo;
    @SQLInjectionSafe
    @NotBlank
    @NotEmpty
    @NotNull
    @Size(max = 88, min = 88, message = "Su usuario no cumple con el tamano estipulado")
    private String usuarioAlta;

    
    public int getBoleta() {
        return boleta;
    }
    public void setBoleta(int boleta) {
        this.boleta = boleta;
    }
    public String getUnidadAprendizaje() {
        return unidadAprendizaje;
    }
    public void setUnidadAprendizaje(String unidadAprendizaje) {
        this.unidadAprendizaje = unidadAprendizaje;
    }
    public String getGrupo() {
        return grupo;
    }
    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }
    public String getUsuarioAlta() {
        return usuarioAlta;
    }
    public void setUsuarioAlta(String usuarioAlta) {
        this.usuarioAlta = usuarioAlta;
    }
}
