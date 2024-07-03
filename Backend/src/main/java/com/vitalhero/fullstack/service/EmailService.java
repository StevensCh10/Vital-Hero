package com.vitalhero.fullstack.service;

import java.io.UnsupportedEncodingException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    public void sendEmail(String to, String subject, String text, String from, String personal) {
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true); // Indica que o texto é HTML
            
            // Configurar o remetente com o nome personalizado
            helper.setFrom(from, personal);
            
            javaMailSender.send(message);
            
        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace(); // ou manipular a exceção de outra forma
        }
    }
}
