package com.tt.microservicioproxy.diccionarios;

public class Rutas {
    
    public final static String DOMINIO_BD = "http://localhost:50000";

    public final static String INICIO_SESION = DOMINIO_BD+"/datosInicioSesion";
    public final static String REGISTRO_ESTUDIANTE_VALIDA_CORREO = DOMINIO_BD+"/registroEstudiante";
    public final static String VALIDA_TOKEN_REG_EST = DOMINIO_BD+"/validaTokenRegEst";
    public final static String REGISTRO_RESTABLECER = DOMINIO_BD+"/registroRestablecer";
    public final static String VALIDA_RESTABLECER = DOMINIO_BD+"/validaRestablecer";
}
