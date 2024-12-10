package com.vitalhero.fullstack.service;

import java.io.UnsupportedEncodingException;

import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.enums.ErrorMessage;
import com.vitalhero.fullstack.exception.EmailNotFound;
import com.vitalhero.fullstack.intrerfaces.User;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.repository.DoctorRepository;
import com.vitalhero.fullstack.repository.DonorRepository;

import jakarta.mail.internet.InternetHeaders;
import jakarta.mail.internet.MimeUtility;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    
    private final DoctorRepository doctorRepository;
    private final DonorRepository donorRepository;
    private final EmailService emailService;

    @SuppressWarnings("CallToPrintStackTrace")
    public void findEmailForgotPassword(String email){
        log.info("[findEmailForgotPassword]: Iniciando envio de email para recuperação de senha");
        User user = findUserByEmail(email);
        Long id = null;
        
        switch(user){
            case Donor donor -> id = donor.getId();
            case Doctor doctor -> id = doctor.getId();
            default -> {
                log.warn("[findEmailForgotPassword]: Falha ao enviar email. "+ErrorMessage.UNKNOWN_USER);
                throw new IllegalArgumentException(ErrorMessage.UNKNOWN_USER.toString());
            }
        }

        String fromName = "Vital Hero";
        String from = "stevenschaves10@gmail.com";
        String personal = null;
        try {
            personal = "=?utf-8?Q?" + MimeUtility.encodeText(fromName) + "?=";
        } catch (UnsupportedEncodingException e) {
            log.error("[findEmailForgotPassword]: Falha ao enviar email");
            e.printStackTrace();
        }
        String subject = "Recuperação de senha";
        String to = user.getEmail();

        InternetHeaders headers = new InternetHeaders();
        headers.addHeader("Content-type", "text/html; charset=UTF-8");
        String text = """
            Olá,
    
            Foi solicitada a recuperação de senha para este usuário. Se não foi você quem solicitou, desconsidere 
            esta mensagem e continue usando sua senha atual.
    
            Para recuperar sua senha, acesse o link: <a href='https://vital-hero.vercel.app/redefine-password?id=%s'>Esqueci minha senha</a>.
    
            Este é um email automático enviado pelo VitalHero, favor não responder.
            """.formatted(id);

        emailService.sendEmail(to, subject, text, from, personal);
        log.info("[findEmailForgotPassword]: Envio de email concluído com sucesso");
    }

    public User findUserByEmail(String email){
        log.info("[findUserByEmail]: Iniciando busca por usuário via email");
        User [] users = {donorRepository.findByEmail(email), doctorRepository.findByEmail(email)};
        for(User user : users){
            if(user != null) {
                log.info("[findUserByEmail]: Busca finalizada com sucesso");
                return user;
            }
        }
        log.warn("[findUserByEmail]: Falha na busca. "+ErrorMessage.EMAIL_NOT_FOUND);
        throw new EmailNotFound(ErrorMessage.EMAIL_NOT_FOUND.toString());
    }
    
}