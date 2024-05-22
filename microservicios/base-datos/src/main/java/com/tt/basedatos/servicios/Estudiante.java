package com.tt.basedatos.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tt.basedatos.Repositorios.RepoVistas;

@Service
public class Estudiante {
    @Autowired
    private RepoVistas vista;

    public ResponseEntity getDatosConstaciaEstudios(int boleta)
    {
        try {
            return ResponseEntity.ok(vista.getConstanciaEstudiosDatos(boleta));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity getDatosSemestreActivo()
    {
        try {
            return ResponseEntity.ok(vista.getDatosSemestreActivo());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
