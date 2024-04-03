package com.tt.microservicioproxy.servicios;

import org.owasp.encoder.Encode;
import org.springframework.stereotype.Service;

@Service
public class BloquearInyecciones {
    
    public String getCadenaDepuradaInyecciones(String cadena)
    {
        String res = cadena;

        res = Encode.forHtml(res);
        res = Encode.forHtmlAttribute(res);

        res = Encode.forJavaScript(res);

        res = Encode.forCssString(res);

        res = Encode.forXmlAttribute(res);
        res = Encode.forXml(res);

        res = Encode.forUriComponent(res);

        return res;
    }
}
