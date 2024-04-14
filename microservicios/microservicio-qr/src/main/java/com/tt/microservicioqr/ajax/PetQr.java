package com.tt.microservicioqr.ajax;

public class PetQr {
    private int alto;
    private int ancho;
    private String caracteresBase64;
    
    public int getAlto() {
        return alto;
    }
    public void setAlto(int alto) {
        this.alto = alto;
    }
    public int getAncho() {
        return ancho;
    }
    public void setAncho(int ancho) {
        this.ancho = ancho;
    }
    public String getCaracteresBase64() {
        return caracteresBase64;
    }
    public void setCaracteresBase64(String caracteresBase64) {
        this.caracteresBase64 = caracteresBase64;
    }
}
