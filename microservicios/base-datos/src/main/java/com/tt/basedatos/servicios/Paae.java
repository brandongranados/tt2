package com.tt.basedatos.servicios;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.tt.basedatos.JsonAjax.AltaEstudianteAjax;
import com.tt.basedatos.Repositorios.RepoSp;

@Service
public class Paae {

    @Autowired
    private RepoSp sp;
    
    @Transactional(readOnly = false)
    public ResponseEntity setDatosEstudiante(AltaEstudianteAjax estudiante)
    {
        Integer bool = 0;

        try {

            bool = sp.spAltaEstudiante
            (
                estudiante.getPaterno(),
                estudiante.getMaterno(),
                estudiante.getNombre(),
                estudiante.getCurp(),
                estudiante.getSexo(),
                estudiante.getFechaNacimiento(),
                estudiante.getBoleta(),
                estudiante.getUsuario()
            );

            if( bool != 1 )
                throw new Exception();

        } catch (Exception e) {
            Map<String, Object> res = new HashMap<String, Object>();
            res.put("bool", bool);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return ResponseEntity.badRequest().body(res);
        }

        return ResponseEntity.ok().build();
    }
}
