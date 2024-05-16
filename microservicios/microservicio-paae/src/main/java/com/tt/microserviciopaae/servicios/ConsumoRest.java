package com.tt.microserviciopaae.servicios;

import java.util.HashMap;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
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
    public HashMap<String, Object> getRespuestaRest(String puntoAcceso, Object datos)
    {
        HashMap<String, Object> httpResp = new HashMap<String, Object>();
        RestTemplate rest = new RestTemplate();

        try {
            HttpEntity<String> solicitud = new HttpEntity<>(obj.toJson(datos), cabeceras);
            ResponseEntity<String> respuesta = rest.exchange
            (
                puntoAcceso,
                HttpMethod.POST,
                solicitud,
                String.class
            );
            
            httpResp.put("datos", respuesta.getBody());
            httpResp.put("codigo", 200);

        } catch (HttpClientErrorException e) {
            httpResp.put("datos", e.getResponseBodyAsString());
            httpResp.put("codigo", e.getStatusCode().value());
        }

        return httpResp;
    }
}
