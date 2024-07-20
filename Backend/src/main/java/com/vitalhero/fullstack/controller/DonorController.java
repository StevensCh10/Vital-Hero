package com.vitalhero.fullstack.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
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
import org.springframework.web.bind.annotation.RequestParam;
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
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/donor")
@RequiredArgsConstructor
public class DonorController {
    
    private final String pathImgs = "C:/Users/steve/OneDrive/Documentos/TCC_Stevens_2024.1/imgProfile/";
    private final DonorService donorService;
    private final SchedulingService schedulingService;
    private final ScreeningService screeningService;
    private final DonationFormService donationFormService;
    private final DonationService donationsService;
    private final ReviewService reviewService;

    @SuppressWarnings("null")
    @GetMapping("/img/{nameImg}")
    public byte[] getImgProfile(@Valid @PathVariable("nameImg") String nameImg) throws IOException{
        File fileImg = new File(pathImgs + nameImg);
        if(nameImg != null || nameImg.trim().length() > 0){
            return Files.readAllBytes(fileImg.toPath());
        }
        return null;
    }

    @PutMapping()
    public Donor updateDonor(@Valid @RequestBody Donor donorAtt){
        return donorService.update(donorAtt);
    }

    @PutMapping("/updatepassword/{donorID}")
    public Donor updatePassword(@Valid @PathVariable Long donorID, @Valid @RequestParam("password") String password){
        return donorService.updatePassword(donorID, password);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/sendfeedback/{donorID}")
    public void sendFeedback(@Valid @PathVariable Long donorID, @Valid @RequestParam String feedback){
        donorService.sendFeedback(donorID, feedback);
    }

    @GetMapping("/{donorID}")
    public Donor getDonor(@Valid @PathVariable Long donorID){
        return donorService.find(donorID);
    }

    @GetMapping("/allScheduled")
    public List<Donor> allScheduledDonors(){
        return donorService.allScheduledDonors();
    }

    @DeleteMapping("/{donorID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDonor(@Valid @PathVariable Long donorID){
        donorService.deleteDonor(donorID);
    }

    //REVIEW
    @PostMapping("/review")
    @ResponseStatus(HttpStatus.CREATED)
    public Review addReview(@Valid @RequestBody Review newReview){
        return reviewService.addReview(newReview);
    }

    @PutMapping("/review")
    public Review updateReview(@Valid @RequestBody Review review){
        return reviewService.update(review);
    }

    @GetMapping("/review/findbydonor/{donorID}")
    public Review getReview(@Valid @PathVariable Long donorID){
        donorService.find(donorID);
        return reviewService.findByDonor(donorID);
    }

    @DeleteMapping("review/{reviewID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReview(@Valid @PathVariable Long reviewID){
        reviewService.deleteReview(reviewID);
    }

    //SCHEDULING
    @PutMapping("/toschedule/{donorID}/{schedulingID}")
    @ResponseStatus(HttpStatus.OK)
    public void toSchedule(@Valid @PathVariable Long donorID, @Valid @PathVariable Long schedulingID){
        schedulingService.find(schedulingID);
        donorService.toSchedule(donorID, screeningService.allScreeningsByDonor(donorID), schedulingID);
    }

    @GetMapping("/scheduled/{donorID}")
    public Scheduling scheduled(@Valid @PathVariable Long donorID){
        Donor donor = donorService.find(donorID);
        return schedulingService.findByDonor(donor);
    }

    @PutMapping("/unschedule/{donorID}")
    @ResponseStatus(HttpStatus.OK)
    public void unschdule(@Valid @PathVariable Long donorID){
        donorService.scheduleMadeOrUnscheduled(donorID);
    }

    //SCREENING
    @PostMapping("/screening")
    public Screening doScreening(@RequestBody @Valid Screening newScreening){
        return screeningService.addScreening(newScreening);
    }

    @PutMapping("/screening")
    public Screening updateScreening(@RequestBody @Valid Screening attScreening){
        return screeningService.updateScreening(attScreening);
    }

    @GetMapping("/screening/all/{donorID}")
    public List<Screening> allScreenings(@PathVariable Long donorID){
        donorService.find(donorID);
        return screeningService.allScreeningsByDonor(donorID);
    }

    //DONATIONFORM
    @PostMapping("/donationform")
    public DonationForm fillOutDonationForm(@RequestBody @Valid DonationForm newDonation){
        return donationFormService.addDonationForm(newDonation);
    }

    @PutMapping("/donationform")
    public DonationForm updateDonationForm(@RequestBody @Valid DonationForm attDonationForm){
        return donationFormService.updateDonationForm(attDonationForm);
    }

    @GetMapping("/donationform/findbydonor/{donorID}")
    public DonationForm getDonationForm(@PathVariable Long donorID){
        return donationFormService.verfifyDonationFormByDonor(donorID);
    }

    @DeleteMapping("/doantionform")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDonationForm(@PathVariable Long donationFormID){
        donationFormService.deleteDonationForm(donationFormID);
    }

    //DONATION
    @GetMapping("/donation/all/{donorID}")
    public List<Donation> allDonationsByDonor(@PathVariable Long donorID){
        donorService.find(donorID);
        return donationsService.allDonationsByDonor(donorID);
    }
}
