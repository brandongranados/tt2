package com.tt.microservicioexcel.servicios;

import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tt.microservicioexcel.Ajax.AjaxExcelCargaEstuMas;

@Service
public class ReinscripcionMasiva {

    public ResponseEntity setReinscribeMasivaEstu(AjaxExcelCargaEstuMas estu)
    {
        HashMap<String, Object> salHttp = new HashMap<String, Object>();

        try {

            ArrayList<Map<String, Object>> sal = reinscribirEstudiantes(estu.getDocuemnto());
            ArrayList<Map<String, Object>> materias = mapeoMateriasEstudiante(estu.getDocuemnto());
            ArrayList<Map<String, Object>> bajas = bajasEstudiante(estu.getDocuemnto());

            if( sal == null )
                throw new Exception();

            if( materias == null )
                throw new Exception();
            
            if( bajas == null )
                throw new Exception();

            salHttp.put("docEstudiante", sal);
            salHttp.put("mapeoMateriaEstudiante", materias);
            salHttp.put("bajasEstudiante", bajas);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(salHttp);
    }

    private ArrayList<Map<String, Object>> reinscribirEstudiantes(String cadena)
    {
        ByteArrayInputStream ent = null;
        ArrayList<Map<String, Object>> sal = new ArrayList<Map<String, Object>>();
        Workbook libroExcel = null;

        try {
            ent = new ByteArrayInputStream(Base64.getDecoder().decode(cadena));
            libroExcel = new XSSFWorkbook(ent);

            Sheet pestanaExcelEstu = libroExcel.getSheetAt(0);
            Iterator<Row> iteRow = pestanaExcelEstu.iterator();

            Row ignora = iteRow.next();

            while (iteRow.hasNext()) 
            {
                Map<String, Object> estudiante = new HashMap<String, Object>();
                Row reg = iteRow.next();

                estudiante.put("boleta", this.getValorCelda(reg.getCell(0)));
                estudiante.put("estatus", this.getValorCelda(reg.getCell(1)));
                estudiante.put("turno", this.getValorCelda(reg.getCell(2)));
                estudiante.put("carrera", this.getValorCelda(reg.getCell(3)));
                estudiante.put("plan", this.getValorCelda(reg.getCell(4)));

                sal.add(estudiante);
            }

            libroExcel.close();
        } catch (Exception e) {
            sal = null;
        }
        finally{
            try {
                libroExcel.close();
            } catch (Exception e) {}
        }

        return sal;
    }

    private ArrayList<Map<String, Object>> mapeoMateriasEstudiante(String cadena)
    {
        ByteArrayInputStream ent = null;
        ArrayList<Map<String, Object>> sal = new ArrayList<Map<String, Object>>();
        Workbook libroExcel = null;

        try {
            ent = new ByteArrayInputStream(Base64.getDecoder().decode(cadena));
            libroExcel = new XSSFWorkbook(ent);

            Sheet pestanaExcelEstu = libroExcel.getSheetAt(1);
            Iterator<Row> iteRow = pestanaExcelEstu.iterator();

            Row ignora = iteRow.next();

            while (iteRow.hasNext()) 
            {
                Map<String, Object> estudiante = new HashMap<String, Object>();
                Row reg = iteRow.next();

                estudiante.put("boleta", this.getValorCelda(reg.getCell(0)));
                estudiante.put("unidad_aprendizaje", this.getValorCelda(reg.getCell(1)));
                estudiante.put("grupo", this.getValorCelda(reg.getCell(2)));

                sal.add(estudiante);
            }

            libroExcel.close();
        } catch (Exception e) {
            sal = null;
        }
        finally{
            try {
                libroExcel.close();
            } catch (Exception e) {}
        }

        return sal;
    }

    private ArrayList<Map<String, Object>> bajasEstudiante(String cadena)
    {
        ByteArrayInputStream ent = null;
        ArrayList<Map<String, Object>> sal = new ArrayList<Map<String, Object>>();
        Workbook libroExcel = null;

        try {
            ent = new ByteArrayInputStream(Base64.getDecoder().decode(cadena));
            libroExcel = new XSSFWorkbook(ent);

            Sheet pestanaExcelEstu = libroExcel.getSheetAt(2);
            Iterator<Row> iteRow = pestanaExcelEstu.iterator();

            Row ignora = iteRow.next();

            while (iteRow.hasNext()) 
            {
                Map<String, Object> estudiante = new HashMap<String, Object>();
                Row reg = iteRow.next();

                estudiante.put("boleta", this.getValorCelda(reg.getCell(0)));
                estudiante.put("estatus", this.getValorCelda(reg.getCell(1)));

                sal.add(estudiante);
            }

            libroExcel.close();
        } catch (Exception e) {
            sal = null;
        }
        finally{
            try {
                libroExcel.close();
            } catch (Exception e) {}
        }

        return sal;
    }

    private Object getValorCelda(Cell celda)
    {
        String valor = null;

        switch (celda.getCellType()) 
        {
            case NUMERIC:
                valor = String.valueOf(celda.getNumericCellValue());
                break;
        
            default:
                valor = celda.getStringCellValue();
                break;
        }

        return valor;
    }
}
