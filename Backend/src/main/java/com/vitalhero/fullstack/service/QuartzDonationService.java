package com.vitalhero.fullstack.service;

import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.Donation;
import com.vitalhero.fullstack.model.DonationNotificationJob;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Service
public class QuartzDonationService {

    @Autowired
    private Scheduler scheduler;

    public void scheduleNotification(Donation donation, String gender) throws SchedulerException {
        LocalDateTime currentDateTime = LocalDateTime.now();
        
        LocalDateTime notificationDateTime = null;
        if(gender.equalsIgnoreCase("M")){
            //notificationDateTime = donationDateTime.plusMonths(2);
            notificationDateTime = currentDateTime.plusMinutes(3);
        }
        //notificationDateTime = donationDateTime.plusMonths(3);
        notificationDateTime = currentDateTime.plusMinutes(3);
        
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
}
