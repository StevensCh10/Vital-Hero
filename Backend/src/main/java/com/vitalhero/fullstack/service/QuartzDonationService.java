package com.vitalhero.fullstack.service;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.model.Donation;
import com.vitalhero.fullstack.model.DonationNotificationJob;
import com.vitalhero.fullstack.model.Donor;

import jakarta.mail.internet.MimeUtility;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuartzDonationService {

    private final Scheduler scheduler;
    private final EmailService emailService;

    public void scheduleNotification(Donation donation, String gender) throws SchedulerException {
        LocalDateTime notificationDateTime;
        if(gender.equalsIgnoreCase("M")){
            notificationDateTime = donation.getScheduling().getDateTime().plusMonths(2);
        }else{
            notificationDateTime = donation.getScheduling().getDateTime().plusMonths(3);
        }
        
        Date notificationDate = Date.from(notificationDateTime.atZone(ZoneId.systemDefault()).toInstant());

        JobDetail jobDetail = JobBuilder.newJob(DonationNotificationJob.class)
                .withIdentity("donationNotificationJob_" + donation.getId())
                .usingJobData("donationId", donation.getId())
                .build();

        Trigger trigger = TriggerBuilder.newTrigger()
                .withIdentity("donationNotificationTrigger_" + donation.getId())
                .startAt(notificationDate) // Inicia o gatilho na data de notificação
                .build();

        scheduler.scheduleJob(jobDetail, trigger);
    }

    @SuppressWarnings("CallToPrintStackTrace")
    public void sendEmailDonor(Donor donor){
        String textBegin = "Olá, " + donor.getName() + "!";

        String to = donor.getEmail();
        String subject = "O seu apoio é vital!";

        String text;

        if(donor.getGender().equalsIgnoreCase("M")){
            text = textBegin+"<br><br>Obrigado pela sua última doação de sangue! Seu gesto fez a diferença. Queremos convidá-lo a doar novamente após 60 dias para continuar fazendo parte dessa causa tão importante."+
            "<br><br>Se tiver dúvidas, entre em contato conosco. Estamos aqui para ajudar."+
            "<br><br>Com gratidão,"+
            "<br><br>Stevens Wendell<br>CEO";
        }else{
            text = textBegin+"<br><br>Obrigado pela sua última doação de sangue! Seu gesto fez a diferença. Queremos convidá-la a doar novamente após 90 dias para continuar fazendo parte dessa causa tão importante."+
            "<br><br>Se tiver dúvidas, entre em contato conosco. Estamos aqui para ajudar."+
            "<br><br>Com gratidão,"+
            "<br><br>Stevens Wendell<br>CEO";
        }

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
}