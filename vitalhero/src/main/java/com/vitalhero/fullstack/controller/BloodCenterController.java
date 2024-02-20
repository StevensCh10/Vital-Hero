package com.vitalhero.fullstack.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.vitalhero.fullstack.model.BloodCenter;
import com.vitalhero.fullstack.model.BloodStock;
import com.vitalhero.fullstack.model.Donation;
import com.vitalhero.fullstack.model.Scheduling;
import com.vitalhero.fullstack.service.SchedulingService;
import com.vitalhero.fullstack.service.BloodCenterService;
import com.vitalhero.fullstack.service.BloodStockService;
import com.vitalhero.fullstack.service.DonationService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/bloodcenter")
public class BloodCenterController {

    private final BloodCenterService bloodCenterService;
    private final BloodStockService bloodStockService;
    private final SchedulingService schedulingService;
    private final DonationService donationService;

    public BloodCenterController(BloodCenterService bloodCenterService, BloodStockService bloodStockService,
            SchedulingService schedulingService, DonationService donationService){
        this.bloodCenterService = bloodCenterService;
        this.bloodStockService = bloodStockService;
        this.schedulingService =schedulingService;
        this.donationService = donationService;
    }
    
    //BLOODCENTER
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public BloodCenter addBloodCenter(@RequestBody BloodCenter newBloodCenter){
        return bloodCenterService.addBloodCenter(newBloodCenter);
    }

    @GetMapping("/{bcID}")
    public BloodCenter findBloodCenter(@PathVariable Long bcID){
        return bloodCenterService.find(bcID);
    }

    @DeleteMapping("/{bcID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBloodCenter(@PathVariable Long bcID){
        bloodCenterService.deleteBloodCenter(bcID);
    }

    //BLOODSTOCK
    @PostMapping("/bloodstock")
    public BloodStock addBloodStock(@RequestBody BloodStock newBloodStock){
        return bloodStockService.addBloodStock(newBloodStock);
    }

    @GetMapping("bloodstock/{bsID}")
    public BloodStock findBloodStock(@PathVariable Long bsID){
        return bloodStockService.find(bsID);
    }

    @GetMapping("bloodstock/findbybloodcenter/{bcID}")
    public BloodStock findBloodStockByBloodCenter(@PathVariable Long bcID){
        return bloodStockService.findByBloodCenter(bcID);
    }

    @DeleteMapping("/bloodstock/{bsID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBloodStock(@PathVariable Long bsID){
        bloodStockService.deleteBloodStock(bsID);
    }

    //SCHEDULING
    @PostMapping("/scheduling")
    public Scheduling addScheduling(@RequestBody Scheduling newSched){
        return schedulingService.addScheduling(newSched);
    }

    @GetMapping("scheduling/{schedID}")
    public Scheduling find(@PathVariable Long schedID){
        return schedulingService.find(schedID);
    }

    @GetMapping("/scheduling/all/{bcID}")
    public List<Scheduling> schedulingsByBloodCenter(@PathVariable Long bcID){
        return schedulingService.schedulingsByBloodCenter(bcID);
    }

    @DeleteMapping("/scheduling/{bsID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteScheduling(@PathVariable Long bsID){
        schedulingService.deleteScheduling(bsID);
    }

    //DONATION
    public Donation donationMade(@RequestBody Donation newDonation){
        return donationService.addDonation(newDonation);
    }
}
