package com.tt.microservicioestudiante.servicios;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.tt.microservicioestudiante.ajax.AjaxDocFirSAT;
import com.tt.microservicioestudiante.ajax.AjaxExpedienteEst;
import com.tt.microservicioestudiante.ajax.PetQr;

import jakarta.annotation.PostConstruct;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.util.JRLoader;

@Service
public class Pdf {
    @Value("${jasper.constancia.estudios}")
    private String CONSTANCIA_ESTUDIOS;
    @Value("${rutas.constancia.estudios}")
    private String CONSTANCIA_ESTUDIOS_DATOS;
    @Value("${rutas.semestre.activo}")
    private String SEMESTRE_ACTIVO;
    @Value("${jefe.gestion.escolar}")
    private String JEFE;
    @Value("${ruta.verifica.constancia}")
    private String RUTA_VERIFICA_CONSTANCIA;
    @Value("${rutas.qr.crea}")
    private String QR_CREA;
    @Value("${rutas.firma.firma}")
    private String FIRMA_SAT_FIRMA;
    @Autowired
    private ConsumoRest peticiones;
    @Autowired
    private Gson obj;
    private JasperReport leerJasper;

    @PostConstruct
    public void postPdf()
    {
        try {
            this.leerJasper = (JasperReport) JRLoader.loadObjectFromFile(CONSTANCIA_ESTUDIOS);
        } catch (Exception e) {
            this.leerJasper = null;
        }
    }

    public ResponseEntity getConstanciaEstudios(int boleta)
    {
        HashMap<String, Object> sal = new HashMap<String, Object>();

        try {
            HashMap<String, Object> param = this.getParametrosConstanciaEstudios(boleta);
            JasperPrint jasper = JasperFillManager.fillReport(leerJasper, param, new JREmptyDataSource());
            byte crudo[] = JasperExportManager.exportReportToPdf(jasper);
            JasperExportManager.exportReportToPdfFile(jasper, "jaja.pdf");

            sal.put("documento", Base64.getEncoder().encodeToString(crudo));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(sal);
    }

    private HashMap<String, Object> getParametrosConstanciaEstudios(int boleta)
    {
        HashMap<String, Object> param = new HashMap<String, Object>();
        AjaxExpedienteEst enviar = new AjaxExpedienteEst(boleta);

        try {
            HashMap<String, Object> datos = this.restUnElemento(CONSTANCIA_ESTUDIOS_DATOS, enviar);
            HashMap<String, Object> datos2 = this.restUnElemento(SEMESTRE_ACTIVO, null);
            String cadena = "CADENA ORIGINAL:<br>\n" +
                            "63|ESCUELA SUPERIOR DE CÓMPUTO||09DPN0053X|"
                            +datos2.get("nombre_semestre")
                            +"|CONSTANCIA DE ESTUDIOS|"+boleta+
                            "|"+datos.get("nombre")+"\n"+
                            "|"+datos.get("curp")+"|C|"+datos.get("nom_carrera")
                            +"|"+((String)datos.get("nombre_plan")).substring(2, 3)+
                            "|0|SIN ESPECIALIDAD|"+datos.get("porcentaje_carrera")
                            +"|"+datos.get("promedio")+"|"+datos.get("turno")
                            +"|"+datos.get("nom_grupo")+"|R|1|9 semestres|"
                            +datos.get("total_creditos")+"|"+datos2.get("vigencia_inicio")
                            +"|"+datos2.get("vigencia_fin")    
                            +"|"+datos2.get("fecha_hoy");
            HashMap<String, Object> petFirma = this.restUnElemento
            (
                FIRMA_SAT_FIRMA, 
                new AjaxDocFirSAT(Base64.getEncoder().encodeToString(cadena.getBytes()))
            );
            HashMap<String, Object> petQR = this.restUnElemento
            (
                QR_CREA, 
                new PetQr
                (
                    1000, 
                    1000, 
                    Base64.getEncoder().encodeToString((RUTA_VERIFICA_CONSTANCIA+"?datos="+petFirma.get("documento")).getBytes())
                )
            );

            //param.put("img", datos.get("foto_est"));
            param.put("img", petQR.get("respuesta"));

            param.put("nombre", datos.get("nombre"));

            param.put("renglo1", "Identificado con número de boleta <b>"
                        +boleta+"</b> y CURP <b>"
                        +datos.get("curp")+"</b>, se encuentra inscrito en este plantel\n" + //
                        "<b>como "+datos.get("estatus")+"</b> en el turno <b>"
                        +datos.get("turno")+"</b>, cursando asignaturas del <b>"
                        +datos.get("nom_periodo")+"</b> en el grupo <b>"
                        +datos.get("nom_grupo")+" "+datos.get("nom_carrera")+
                        "</b> en la modalidad <b>escolarizada</b>");

            param.put("renglo2", "A la fecha ha cubierto el <b>"+
                        datos.get("porcentaje_carrera")+
                        "</b> de su programa académico, con un promedio general de <b>"
                        +datos.get("promedio")+".</b>");

            param.put("renglon3", "La presente se emite durante el periodo escolar <b>"
                        +datos.get("nom_periodo")+" "
                        +datos2.get("vigencia")+".</b>");
            
            param.put("renglon4", "El programa académico consta de "
                        +"<b>9 semestres</b>, con un total de <b>"
                        +datos.get("total_creditos")+"</b> créditos.");
            
            param.put("renglon5", "Se extiende la presente a petición del interesado en <b>"
                        +datos2.get("fecha_hoy")+".</b>");
            
            param.put("atte", "A T E N T A M E N T E:<br>\n" + //
                            "\"LA TÉCNICA AL SERVICIO DE LA PATRIA\"<br>\n" + //
                            JEFE+"<br>\n" + //
                            "DEPARTAMENTO DE GESTIÓN ESCOLAR");

            param.put("firmaoriginal", cadena);

            param.put("qr", petQR.get("respuesta"));
            param.put("firma", "FIRMA ELECTRÓNICA DE AUTORIDAD:<br>\n" + //
                            JEFE+" DEPARTAMENTO DE GESTIÓN ESCOLAR<br>\n" + //
                            petFirma.get("documento"));
        } catch (Exception e) {
            return null;
        }

        return param;
    }

    private HashMap<String, Object> restUnElemento(String rutaGenerica, Object datos)
    {
        HashMap<String, Object> resPet = null;
        HashMap<String, Object> salida = null;
        int codigo = 400;

        try {
            
            resPet = peticiones.getRespuestaRest(rutaGenerica, datos);
            codigo = (int)resPet.get("codigo");
            salida = obj.fromJson((String)resPet.get("datos"), HashMap.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return null;
        }
        return salida;
    }

    private List<HashMap<Object, Object>> restMuchosElemento(String rutaGenerica, Object datos)
    {
        HashMap<String, Object> resPet = null;
        List<HashMap<Object, Object>>salida = null;
        int codigo = 400;

        try {
            
            resPet = peticiones.getRespuestaRest(rutaGenerica, datos);
            codigo = (int)resPet.get("codigo");
            salida = obj.fromJson((String)resPet.get("datos"), List.class);

            if( codigo != 200 )
                throw new Exception();

        } catch (Exception e) {
            return salida;
        }
        return salida;
    }
}
