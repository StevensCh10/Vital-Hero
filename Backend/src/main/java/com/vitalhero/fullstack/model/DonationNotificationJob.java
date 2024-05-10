package com.vitalhero.fullstack.model;

import java.io.UnsupportedEncodingException;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import com.vitalhero.fullstack.service.DonationService;
import com.vitalhero.fullstack.service.DonorService;
import com.vitalhero.fullstack.service.EmailService;
import jakarta.mail.internet.MimeUtility;

public class DonationNotificationJob implements Job, ApplicationContextAware {

    private ApplicationContext applicationContext;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        EmailService emailService = applicationContext.getBean(EmailService.class);
        DonationService donationService = applicationContext.getBean(DonationService.class);
        DonorService donorService = applicationContext.getBean(DonorService.class);

        Long donationId = context.getMergedJobDataMap().getLong("donationId");
        Donation donation = donationService.find(donationId);
        Donor donor = donorService.find(donation.getDonor().getId());

        String textBegin = "Olá, " + donor.getName() + "!";

        String to = donor.getEmail();
        String subject = "O seu apoio é vital! Doe sangue novamente e salve mais vidas.";
        String text = textBegin+"<br><br>Obrigado pela sua última doação de sangue! Seu gesto fez a diferença. Queremos convidá-lo(a) a doar novamente e continuar salvando vidas. Sua generosidade é fundamental para nossa causa."+
        "<br><br>Se estiver interessado em doar novamente ou tiver dúvidas, entre em contato conosco. Estamos aqui para ajudar."+
        "<br><br>Com gratidão,"+
        "<br><br>Stevens Wendell<br>CEO";

        String fromName = "Vital Hero";
        String from = "stevenschaves10@gmail.com";
        String personal = null;
        try {
            personal = "=?utf-8?Q?" + MimeUtility.encodeText(fromName) + "?=";
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        emailService.sendEmail(to, subject, text, from, personal);

    }

    @Override
    public void setApplicationContext(@SuppressWarnings("null") ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}
