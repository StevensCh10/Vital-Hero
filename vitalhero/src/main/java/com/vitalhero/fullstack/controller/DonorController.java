package com.vitalhero.fullstack.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.vitalhero.fullstack.model.DonationForm;
import com.vitalhero.fullstack.model.Donation;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Review;
import com.vitalhero.fullstack.model.Scheduling;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.service.DonationFormService;
import com.vitalhero.fullstack.service.DonationService;
import com.vitalhero.fullstack.service.DonorService;
import com.vitalhero.fullstack.service.ReviewService;
import com.vitalhero.fullstack.service.SchedulingService;
import com.vitalhero.fullstack.service.ScreeningService;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/donor")
public class DonorController {
    
    private final DonorService donorService;
    private final SchedulingService schedulingService;
    private final ScreeningService screeningService;
    private final DonationFormService donationFormService;
    private final DonationService donationsService;
    private final ReviewService reviewService;

    public DonorController(DonorService donorService, SchedulingService schedulingService,
            ScreeningService screeningService, DonationFormService donationFormService,
            DonationService donationsService, ReviewService reviewService){
        
        this.donorService = donorService;
        this.schedulingService = schedulingService;
        this.screeningService = screeningService;
        this.donationFormService = donationFormService;
        this.donationsService = donationsService;
        this.reviewService = reviewService;
    }

    //DONOR
    @GetMapping("/{email}/{password}")
    public Donor login(@PathVariable String email, @PathVariable String password){
        return donorService.checkLogin(email, password);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Donor registerDonor(@RequestBody @Valid Donor donor){
        return donorService.register(donor);
    }

    @GetMapping("/{donorID}")
    public Donor getDonor(@PathVariable Long donorID){
        return donorService.find(donorID);
    }

    //REVIEW
    @PostMapping("/review")
    @ResponseStatus(HttpStatus.CREATED)
    public Review addReview(@RequestBody @Valid Review newReview){
        return reviewService.addReview(newReview);
    }

    @PutMapping("/review")
    public Review updateReview(@RequestBody @Valid Review review){
        return reviewService.update(review);
    }

    @GetMapping("/review/findbydonor/{donorID}")
    public Review getReview(@PathVariable Long donorID){
        donorService.find(donorID);
        return reviewService.findByDonor(donorID);
    }

    //SCHEDULING
    @PutMapping("/toschedule/{donorID}/{schedulingID}")
    @ResponseStatus(HttpStatus.OK)
    public void toSchedule(@PathVariable Long donorID, @PathVariable Long schedulingID){
        schedulingService.find(schedulingID);
        donorService.toSchedule(donorID, schedulingID);
    }

    @GetMapping("/scheduled/{donorID}")
    public Scheduling scheduled(@PathVariable Long donorID){
        Donor donor = donorService.find(donorID);
        return schedulingService.findByDonor(donor);
    }

    @PutMapping("/unschedule/{donorID}")
    @ResponseStatus(HttpStatus.OK)
    public void unschdule(@PathVariable Long donorID){
        donorService.scheduleMadeOrUnscheduled(donorID);
    }

    //SCREENING
    @PostMapping("/screening")
    public Screening doScreening(@RequestBody Screening newScreening){
        return screeningService.addScreening(newScreening);
    }

    @GetMapping("/screening/all/{donorID}")
    public List<Screening> allScreenings(@PathVariable Long donorID){
        donorService.find(donorID);
        return screeningService.allScreeningsByDonor(donorID);
    }

    //DONATIONFORM
    @PostMapping("/donationform")
    public DonationForm fillOutDonationForm(@RequestBody DonationForm newDonation){
        return donationFormService.addDonationForm(newDonation);
    }

    @GetMapping("/donationform/findbydonor/{donorID}")
    public DonationForm getDonationForm(@PathVariable Long donorID){
        return donationFormService.findByDonor(donorID);
    }

    @DeleteMapping("/doantionform")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDonationForm(@PathVariable Long donationFormID){
        donationFormService.deleteDonationForm(donationFormID);
    }

    //DONATION
    public List<Donation> allDonationsByDonor(@PathVariable Long donorID){
        return donationsService.allDonationsByDonor(donorID);
    }
}
