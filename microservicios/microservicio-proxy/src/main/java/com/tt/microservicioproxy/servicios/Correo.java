package com.tt.microservicioproxy.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class Correo {

    public final static int COMPROBAR_CORREO = 1;

    @Autowired
    private JavaMailSender correo;
    @Value("${spring.mail.username}")
    private String desde;
    @Value("${correo.obligatorio}")
    private String obligatorioCorreo;

    public void enviarCorreo(int msm, String enviar, String cuerpo) throws Exception
    {
        String asunto = "";

        switch (msm) 
        {
            case 1:
                asunto = "Autenticacion de correo electronico";
                break;
            default:
                break;
        }

        MimeMessage msmConstruido = correo.createMimeMessage();
        MimeMessageHelper help = new MimeMessageHelper(msmConstruido, true);

        help.setFrom(desde);
        help.setTo(enviar);
        //help.setCc(obligatorioCorreo);
        help.setSubject(asunto);
        help.setText(cuerpo, true);

        correo.send(msmConstruido);
    }
}
