package com.tt.microservicio_admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tt.microservicio_admin.ajax.AjaxAltaPeersonal;
import com.tt.microservicio_admin.ajax.AjaxBajaPersonal;
import com.tt.microservicio_admin.ajax.AjaxListaPersonal;
import com.tt.microservicio_admin.servicios.Admin;

@RestController
public class Paginas {
    @Autowired
    private Admin admin;
    
    @PostMapping("/admin/setPersonalApoyo")
    public ResponseEntity setPersonalApoyo(@RequestBody AjaxAltaPeersonal personal)
    {
        return admin.setPersonalNuevo(personal);
    }

    @PostMapping("/admin/setBajaPersonalApoyo")
    public ResponseEntity setBajaPersonalApoyo(@RequestBody AjaxBajaPersonal personal)
    {
        return admin.setPersonalBaja(personal);
    }

    @PostMapping("/admin/setListaPersonalApoyo")
    public ResponseEntity setListaPersonalApoyo(@RequestBody AjaxListaPersonal personal)
    {
        return admin.setListaPersonal(personal);
    }
}
