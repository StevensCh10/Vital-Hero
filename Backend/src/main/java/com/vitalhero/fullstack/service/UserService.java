package com.vitalhero.fullstack.service;

import java.io.UnsupportedEncodingException;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.intrerfaces.User;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.repository.DoctorRepository;
import com.vitalhero.fullstack.repository.DonorRepository;

import jakarta.mail.internet.InternetHeaders;
import jakarta.mail.internet.MimeUtility;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final DoctorRepository doctorRepository;
    private final DonorRepository donorRepository;
    private final EmailService emailService;

    @SuppressWarnings("CallToPrintStackTrace")
    public void findEmailForgotPassword(String email){
        User user = findUserByEmail(email);
        Long id = null;
        
        if(user instanceof Donor donor) id = donor.getId();
        else if(user instanceof Doctor doctor) id = doctor.getId();

        String fromName = "Vital Hero";
        String from = "stevenschaves10@gmail.com";
        String personal = null;
        try {
            personal = "=?utf-8?Q?" + MimeUtility.encodeText(fromName) + "?=";
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        String subject = "Recuperação de senha";
        String to = Optional.ofNullable(user)
                    .map(User::getEmail)
                    .orElseThrow(() -> new NullPointerException("O objeto 'user' é null."));

        InternetHeaders headers = new InternetHeaders();
        headers.addHeader("Content-type", "text/html; charset=UTF-8");
        String text = "Olá,<br><br>Foi solicitada a recuperação de senha para este usuário, se não foi você quem solicitou, desconsidere "+
            "esta mensagem e continue usando sua senha atual.<br><br>Para recuperar sua senha acesse o link: <a href='https://vital-hero.vercel.app/redefine-password?id=" + id + "'>Esqueci minha senha</a>."+
            "<br><br>Este é um email automático enviado pelo VitalHero, favor não responder.";

        emailService.sendEmail(to, subject, text, from, personal);

    }

    public User findUserByEmail(String email){
        var findDonor = donorRepository.findByEmail(email);
        if(findDonor == null){
            var findDoctor = doctorRepository.findByEmail(email);
            if(findDoctor == null){
                throw new EntityNotFound("Email informado não cadastrado.");
            }
            return findDoctor;
        }
        return findDonor;
    }
}