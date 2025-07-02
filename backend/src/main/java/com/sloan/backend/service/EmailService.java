package com.sloan.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    /**
     * Envía un correo electrónico simple (texto plano) al destinatario indicado.
     *
     * @param to      Correo electrónico del destinatario
     * @param subject Asunto del correo
     * @param text    Cuerpo del correo
     */
    public void enviarCorreo(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        // Opcional: Cambia el remitente si lo necesitas
        // message.setFrom("dominidzero@gmail.com");
        mailSender.send(message);
    }
}