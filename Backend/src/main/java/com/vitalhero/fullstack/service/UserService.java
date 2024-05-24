package com.vitalhero.fullstack.service;

import java.io.UnsupportedEncodingException;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.intrerfaces.User;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.repository.DoctorRepository;
import com.vitalhero.fullstack.repository.DonorRepository;
import jakarta.mail.internet.InternetHeaders;
import jakarta.mail.internet.MimeUtility;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {
    private final DoctorRepository doctorRepository;
    private final DonorRepository donorRepository;
    private final EmailService emailService;

    public UserService(DoctorRepository doctorRepository, DonorRepository donorRepository, EmailService emailService){
        this.doctorRepository = doctorRepository;
        this.donorRepository = donorRepository;
        this.emailService = emailService;
    }

    public void findEmailForgotPassword(String email){
        var user = findUserByEmail(email);
        Long id;
        if(user instanceof Donor){
            id = ((Donor) user).getId();
        }else{
            id = ((Doctor) user).getId();
        }
        String fromName = "Vital Hero";
        String from = "stevenschaves10@gmail.com";
        String personal = null;
        try {
            personal = "=?utf-8?Q?" + MimeUtility.encodeText(fromName) + "?=";
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        String subject = "Recuperação de senha";
        String to = user.getEmail();

        InternetHeaders headers = new InternetHeaders();
        headers.addHeader("Content-type", "text/html; charset=UTF-8");
        String text = "Olá,<br><br>Foi solicitada a recuperação de senha para este usuário, se não foi você quem solicitou, desconsidere "+
            "esta mensagem e continue usando sua senha atual.<br><br>Para recuperar sua senha acesse o link: <a href='https://vital-hero.onrender.com/redefine-password?id=" + id + "'>Esqueci minha senha</a>."+
            "<br><br>Este é um email automático enviado pelo VitalHero, favor não responder.";

        emailService.sendEmail(to, subject, text, from, personal);

    }

    public User findUserByEmail(String email){
        var findDonor = donorRepository.findByEmail(email);
        if(findDonor == null){
            var findDoctor = doctorRepository.findByEmail(email);
            if(findDoctor == null){
                throw new EntityNotFoundException("Email informado não cadastrado");
            }
            return findDoctor;
        }
        return findDonor;
    }
}
