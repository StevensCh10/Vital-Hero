package com.vitalhero.fullstack.service;

import java.io.UnsupportedEncodingException;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender javaMailSender;

    @SuppressWarnings("CallToPrintStackTrace")
    public void sendEmail(String to, String subject, String text, String from, String personal) {
        log.info("[sendEmail]: Iniciando envio de email para: {}", to);
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true); // Indica que o texto é HTML
            
            // Configurando o remetente com o nome personalizado
            helper.setFrom(from, personal);
            
            javaMailSender.send(message);
            log.info("[sendEmail]: Email enviado com sucesso", to);
            
        } catch (MessagingException | UnsupportedEncodingException e) {
            log.error("[sendEmail]: Falha no envio de email para '{}'", to);
            e.printStackTrace();
        }
    }
}