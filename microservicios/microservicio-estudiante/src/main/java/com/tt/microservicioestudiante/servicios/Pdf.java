package com.tt.microservicioestudiante.servicios;

import java.util.Base64;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.tt.microservicioestudiante.ajax.AjaxDocFirSAT;
import com.tt.microservicioestudiante.ajax.AjaxEstudianteConstancias;
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
    @Value("${jasper.constancia.inscripcion}")
    private String CONSTANCIA_INSCRIPCION;
    @Value("${jasper.constancia.becas}")
    private String CONSTANCIA_BECAS;
    @Value("${jasper.constancia.servicio}")
    private String CONSTANCIA_SERVICIO;
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
    @Value("${rutas.constancia.solicitada}")
    private String CONSTANCIA_SOLICITADA;
    @Autowired
    private ConsumoRest peticiones;
    @Autowired
    private Gson obj;
    private JasperReport plantillaEstudios;
    private JasperReport plantillaInscripcion;
    private JasperReport plantillaBecas;
    private JasperReport plantillaServicio;

    @PostConstruct
    public void postPdf()
    {
        try {
            this.plantillaEstudios = (JasperReport) JRLoader.loadObjectFromFile(CONSTANCIA_ESTUDIOS);
            this.plantillaInscripcion = (JasperReport) JRLoader.loadObjectFromFile(CONSTANCIA_INSCRIPCION);
            this.plantillaBecas = (JasperReport) JRLoader.loadObjectFromFile(CONSTANCIA_BECAS);
            this.plantillaServicio = (JasperReport) JRLoader.loadObjectFromFile(CONSTANCIA_SERVICIO);
        } catch (Exception e) {
            e.getStackTrace();
        }
    }

    public ResponseEntity getConstanciaEstudios(int boleta)
    {
        HashMap<String, Object> sal = new HashMap<String, Object>();

        try {
            HashMap<String, Object> param = this.getParametrosConstanciaGenericos(boleta);
            JasperPrint jasper = JasperFillManager.fillReport(plantillaEstudios, param, new JREmptyDataSource());
            byte crudo[] = JasperExportManager.exportReportToPdf(jasper);

            sal.put("documento", Base64.getEncoder().encodeToString(crudo));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(sal);
    }

    public ResponseEntity getConstanciaInscripcion(int boleta)
    {
        HashMap<String, Object> sal = new HashMap<String, Object>();

        try {
            HashMap<String, Object> param = this.getParametrosConstanciaInscripcion(boleta);
            JasperPrint jasper = JasperFillManager.fillReport(plantillaInscripcion, param, new JREmptyDataSource());
            byte crudo[] = JasperExportManager.exportReportToPdf(jasper);

            sal.put("documento", Base64.getEncoder().encodeToString(crudo));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(sal);
    }

    public ResponseEntity getConstanciaBecas(int boleta)
    {
        HashMap<String, Object> sal = new HashMap<String, Object>();

        try {
            HashMap<String, Object> param = this.getParametrosConstanciaBecas(boleta);
            JasperPrint jasper = JasperFillManager.fillReport(plantillaBecas, param, new JREmptyDataSource());
            byte crudo[] = JasperExportManager.exportReportToPdf(jasper);

            sal.put("documento", Base64.getEncoder().encodeToString(crudo));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(sal);
    }

    public ResponseEntity getConstanciaServicio(int boleta)
    {
        HashMap<String, Object> sal = new HashMap<String, Object>();

        try {
            HashMap<String, Object> param = this.getParametrosConstanciaServicio(boleta);
            JasperPrint jasper = JasperFillManager.fillReport(plantillaServicio, param, new JREmptyDataSource());
            byte crudo[] = JasperExportManager.exportReportToPdf(jasper);

            sal.put("documento", Base64.getEncoder().encodeToString(crudo));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(sal);
    }

    public ResponseEntity setRegistroConstancia(AjaxEstudianteConstancias estu)
    {
        HashMap<String, Object> sp = restUnElemento(CONSTANCIA_SOLICITADA, estu);

        if( sp != null )
            return ResponseEntity.badRequest().build();
        else
            return ResponseEntity.ok().build();
    }

    private HashMap<String, Object> getParametrosConstanciaGenericos(int boleta)
    {
        HashMap<String, Object> param = new HashMap<String, Object>();

        try {
            HashMap<String, Object> generales = this.getPeticionesGenericas(boleta);
            HashMap<String, Object> datos = (HashMap<String, Object>)generales.get("datos");
            HashMap<String, Object> datos2 = (HashMap<String, Object>)generales.get("datos2");
            String cadena = (String)generales.get("cadena");
            HashMap<String, Object> petFirma = (HashMap<String, Object>)generales.get("petFirma");
            HashMap<String, Object> petQR = (HashMap<String, Object>)generales.get("petQR");

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

    private HashMap<String, Object> getParametrosConstanciaBecas(int boleta)
    {
        return this.getParametrosConstanciaInscripcion(boleta);
    }

    private HashMap<String, Object> getParametrosConstanciaServicio(int boleta)
    {
        return this.getParametrosConstanciaInscripcion(boleta);
    }

    private HashMap<String, Object> getParametrosConstanciaInscripcion(int boleta)
    {
        HashMap<String, Object> param = this.getParametrosConstanciaGenericos(boleta);

        try {

            String renglo3 = (String)param.get("renglon4");
            String renglon4 = (String)param.get("renglon3");

            param.put("renglon3", renglo3);
            param.put("renglon4", renglon4);
            
        } catch (Exception e) {
            return null;
        }

        return param;
    }

    private HashMap<String, Object> getPeticionesGenericas(int boleta)
    {
        HashMap<String, Object> salida = new HashMap<String, Object>();

        try {
            HashMap<String, Object> datos = this.restUnElemento(CONSTANCIA_ESTUDIOS_DATOS, new AjaxExpedienteEst(boleta));
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

            salida.put("datos", datos);
            salida.put("datos2", datos2);
            salida.put("cadena", cadena);
            salida.put("petFirma", petFirma);
            salida.put("petQR", petQR);
        } catch (Exception e) {
            salida = null;
        }

        return salida;
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

}
