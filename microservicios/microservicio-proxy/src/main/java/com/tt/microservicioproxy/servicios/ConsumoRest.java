package com.tt.microservicioproxy.servicios;

import java.util.Optional;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;

@Service
public class ConsumoRest {
    private Gson obj;
    private HttpHeaders cabeceras;

    public ConsumoRest()
    {
        obj = new Gson();
        cabeceras = new HttpHeaders();

        cabeceras.setContentType(MediaType.APPLICATION_JSON);
    }
    public Optional getRespuestaRest(String puntoAcceso, Object datos)
    {
        Optional resp = null;
        RestTemplate rest = new RestTemplate();

        try {
            HttpEntity<String> solicitud = new HttpEntity<>(obj.toJson(datos), cabeceras);
            String r = rest.postForObject(puntoAcceso, solicitud, String.class);

            resp = Optional.ofNullable(obj.fromJson(r, Object.class));
        } catch (Exception e) {
            resp = Optional.empty();
        }

        return resp;
    }
}
