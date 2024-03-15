package com.tt.microservicioproxy.configuracion;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tt.microservicioproxy.JsonAjax.InicioSesionPetRest;
import com.tt.microservicioproxy.diccionarios.Rutas;
import com.tt.microservicioproxy.servicios.ConsumoRest;

@Service
public class InicioSesion implements UserDetailsService {
    @Autowired
    private ConsumoRest rest;

    @Override
    public UserDetails loadUserByUsername(String usuario) throws UsernameNotFoundException {

        ArrayList<GrantedAuthority> aut =new ArrayList<>();
        InicioSesionPetRest datos = new InicioSesionPetRest();
        Map<String, Object> bd = null;

        datos.setUsuario(usuario);

        Optional op = rest.getRespuestaRest(Rutas.INICIO_SESION, datos);

        if( !op.isPresent() )
            return null;
        else
            bd = (Map<String, Object>)op.get();

        if( ( (Double)bd.get("autenticado") ) != 1 )
            return null;

        aut.add(new SimpleGrantedAuthority((String)bd.get("nombre_rol")));

        return new User(usuario, (String)bd.get("contrasena"), 
        true, true, true,
         true, aut);
    }
}
