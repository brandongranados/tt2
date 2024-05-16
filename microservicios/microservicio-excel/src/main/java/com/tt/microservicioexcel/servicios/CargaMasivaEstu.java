package com.tt.microservicioexcel.servicios;

import java.io.ByteArrayInputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tt.microservicioexcel.Ajax.AjaxExcelCargaEstuMas;

@Service
public class CargaMasivaEstu {

    public ResponseEntity setCargaMasivaEstu(AjaxExcelCargaEstuMas estu)
    {
        HashMap<String, Object> salHttp = new HashMap<String, Object>();

        try {

            ByteArrayInputStream crudo = new ByteArrayInputStream(Base64.getDecoder().decode(estu.getDocuemnto()));
            ArrayList<Map<String, Object>> sal = cargarEstudiantes(crudo);

            if( sal == null )
                throw new Exception();

            salHttp.put("docEstudiante", sal);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(salHttp);
    }

    private ArrayList<Map<String, Object>> cargarEstudiantes(ByteArrayInputStream ent)
    {
        SimpleDateFormat fromato = new SimpleDateFormat("yyyy-MM-dd");
        ArrayList<Map<String, Object>> sal = new ArrayList<Map<String, Object>>();
        Workbook libroExcel = null;

        try {
            libroExcel = new XSSFWorkbook(ent);

            Sheet pestanaExcelEstu = libroExcel.getSheetAt(0);
            Iterator<Row> iteRow = pestanaExcelEstu.iterator();

            Row ignora = iteRow.next();

            while (iteRow.hasNext()) 
            {
                Map<String, Object> estudiante = new HashMap<String, Object>();
                Row reg = iteRow.next();
                String valSexo = (String)this.getValorCelda(reg.getCell(4));
                Date fech = DateUtil.getJavaDate(Double.parseDouble((String)this.getValorCelda(reg.getCell(5))));

                estudiante.put("paterno", this.getValorCelda(reg.getCell(0)));
                estudiante.put("materno", this.getValorCelda(reg.getCell(1)));
                estudiante.put("nombre", this.getValorCelda(reg.getCell(2)));
                estudiante.put("curp", this.getValorCelda(reg.getCell(3)));
                estudiante.put("sexo", valSexo.equals("M") ? 0 : 1);
                estudiante.put("fechaNacimiento", fromato.format(fech));
                estudiante.put("boleta", this.getValorCelda(reg.getCell(6)));
                estudiante.put("carrera", this.getValorCelda(reg.getCell(7)));
                estudiante.put("semestre", this.getValorCelda(reg.getCell(8)));
                estudiante.put("plan", this.getValorCelda(reg.getCell(9)));
                estudiante.put("estatus", this.getValorCelda(reg.getCell(10)));

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
