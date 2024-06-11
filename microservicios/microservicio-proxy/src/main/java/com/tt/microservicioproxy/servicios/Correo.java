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
                asunto = "Autenticación de correo electrónico";
                cuerpo = "Buenas estimado usuario SAGEDD. </br>"+
                        "Le hacemos llegar por este medio un token para "+
                        "continuar con el proceso de autenticación de correo electrónico:</br>"+
                        cuerpo+"</br>"+
                        "Saludos cordiales.";
                break;
            case 2:
                asunto = "Restablecimiento de contraseña";
                cuerpo = "Buenas estimado usuario SAGEDD. </br>"+
                        "Le hacemos llegar por este medio un token para "+
                        "continuar con el proceso de restablecimiento de contraseña:</br>"+
                        cuerpo+"</br>"+
                        "Saludos cordiales.";
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
