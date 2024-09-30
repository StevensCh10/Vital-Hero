package com.vitalhero.fullstack.controller;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.quartz.SchedulerException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.vitalhero.fullstack.dto.BloodCenterDTO;
import com.vitalhero.fullstack.model.BloodCenter;
import com.vitalhero.fullstack.model.BloodStock;
import com.vitalhero.fullstack.model.Donation;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Scheduling;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.service.BloodCenterService;
import com.vitalhero.fullstack.service.BloodStockService;
import com.vitalhero.fullstack.service.DonationService;
import com.vitalhero.fullstack.service.DonorService;
import com.vitalhero.fullstack.service.QuartzDonationService;
import com.vitalhero.fullstack.service.SchedulingService;
import com.vitalhero.fullstack.service.ScreeningService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/bloodcenter")
@RequiredArgsConstructor
public class BloodCenterController {

    private final BloodCenterService bloodCenterService;
    private final BloodStockService bloodStockService;
    private final SchedulingService schedulingService;
    private final DonationService donationService;
    private final DonorService donorService;
    private final QuartzDonationService quartzDonationService;
    private final ScreeningService screeningService;

    //BLOODCENTER
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public BloodCenterDTO addBloodCenter(@Valid @RequestBody BloodCenter newBloodCenter){
        return bloodCenterService.addBloodCenter(newBloodCenter);
    }

    @PutMapping()
    public BloodCenterDTO updateBloodCenter(@Valid @RequestBody BloodCenter bloodCenterAtt){
        return bloodCenterService.update(bloodCenterAtt);
    }

    @GetMapping("/{bcID}")
    public BloodCenterDTO findBloodCenter(@Valid @PathVariable Long bcID){
        return bloodCenterService.getBloodCenter(bcID);
    }

    @GetMapping("/all")
    public List<BloodCenterDTO> findAll(){
        return bloodCenterService.findAll();
    }

    @DeleteMapping("/{bcID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBloodCenter(@Valid @PathVariable Long bcID){
        bloodCenterService.deleteBloodCenter(bcID);
    }

    //BLOODSTOCK
    @PostMapping("/bloodstock")
    public BloodStock addBloodStock(@Valid @RequestBody BloodStock newBloodStock){
        return bloodStockService.addBloodStock(newBloodStock);
    }

    @PutMapping("/bloodstock")
    public BloodStock updateBloodStock(@Valid @RequestBody BloodStock bloodStockAtt){
        return bloodStockService.update(bloodStockAtt);
    }

    @GetMapping("bloodstock/{bsID}")
    public BloodStock findBloodStock(@Valid @PathVariable Long bsID){
        return bloodStockService.find(bsID);
    }

    @GetMapping("bloodstock/all")
    public List<BloodStock> findAllBloodStock(){
        return bloodStockService.findAll();
    }

    @GetMapping("bloodstock/findbybloodcenter/{bcID}")
    public BloodStock findBloodStockByBloodCenter(@Valid @PathVariable Long bcID){
        return bloodStockService.findByBloodCenter(bcID);
    }

    @DeleteMapping("/bloodstock/{bsID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBloodStock(@Valid @PathVariable Long bsID){
        bloodStockService.deleteBloodStock(bsID);
    }

    //SCHEDULING
    @PostMapping("/scheduling")
    public Scheduling addScheduling(@Valid @RequestBody Scheduling newSched){
        return schedulingService.addScheduling(newSched);
    }

    @PutMapping("/scheduling")
    public Scheduling updateScheduling(@Valid @RequestBody Scheduling schedulingAtt){
        return schedulingService.update(schedulingAtt);
    }

    @GetMapping("scheduling/{schedID}")
    public Scheduling find(@Valid @PathVariable Long schedID){
        return schedulingService.find(schedID);
    }

    @GetMapping("/scheduling/all/{bcID}")
    public List<Scheduling> schedulingsByBloodCenter(@Valid @PathVariable Long bcID){
        return schedulingService.schedulingsByBloodCenter(bcID);
    }

    @GetMapping("/scheduling/all")
    public List<Scheduling> schedulings() {
        List<Scheduling> sortedScheduling = schedulingService.schedulings().stream()
                .sorted(Comparator.comparing(Scheduling::getDateTime))
                .collect(Collectors.toList());
        return sortedScheduling;
    }

    @DeleteMapping("/scheduling/{bsID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteScheduling(@Valid @PathVariable Long bsID){
        schedulingService.deleteScheduling(bsID);
    }

    //DONATION
    @PostMapping("/donation")
    public void donationMade(@RequestParam List<Long> donorIdsDonated, @RequestParam List<Long> donorIdsNotDonated){

            for (Long donorId : donorIdsDonated) {
                Donor donor = donorService.find(donorId);

                Donation donation = new Donation();
                donation.setDonor(donor);
                donation.setScheduling(donor.getScheduling());

                Donation addedDonation = donationService.addDonation(donation);
                scheduleDonationNotification(addedDonation, donor.getGender());
                donorService.scheduleMadeOrUnscheduled(donorId);

                Screening screening = screeningService.screeningByDonor(donor);
                screeningService.deleteScreening(screening.getId());
            }
            for(Long donorId : donorIdsNotDonated){
                donorService.scheduleMadeOrUnscheduled(donorId);
            }
    }

    //@PostMapping("/schedule-donation-notification/{gender}")
    private void scheduleDonationNotification(Donation donation, String gender) {
        Donor donor = donorService.find(donation.getDonor().getId());
        quartzDonationService.sendEmailDonor(donor);
        try {
            quartzDonationService.scheduleNotification(donation, gender);
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }
}
