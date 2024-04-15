package com.vitalhero.fullstack.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import org.springframework.web.multipart.MultipartFile;
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

    private final String pathImgs = "C:/Users/steve/OneDrive/Documentos/TCC_Stevens_2024.1/imgProfile/";

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

    @PostMapping(consumes = { "multipart/form-data" })
    @ResponseStatus(HttpStatus.CREATED)
    //public Donor registerDonor(@RequestBody @Valid Donor donor, @RequestParam("file") MultipartFile file){
        public Donor registerDonor(
            @RequestParam("name") String name,
            @RequestParam("cpf") String cpf,
            @RequestParam("email") String email,
            @RequestParam("age") int age,
            @RequestParam("gender") String gender,
            @RequestParam("maritalStatus") String maritalStatus,
            @RequestParam("address") String address,
            @RequestParam("phone") String phone,
            @RequestParam("photo") String photo,
            @RequestParam("password") String password,
            @RequestParam(value = "file", required = false) MultipartFile file){

                Donor newDonor = new Donor(name, cpf, email, age, gender, maritalStatus, address, photo, phone, password);
                Donor flushDonor = donorService.register(newDonor);
                try{
                    if(!file.isEmpty()){
                        byte[] bytes = file.getBytes();
                        Path path = Paths.get(pathImgs+String.valueOf(flushDonor.getId())+file.getOriginalFilename());
                        Files.write(path, bytes);

                        flushDonor.setPhoto(String.valueOf(flushDonor.getId())+file.getOriginalFilename());
                    }
                }catch(IOException e){
                    e.printStackTrace();
                }
                return donorService.update(flushDonor);
    }

    @GetMapping("/img/{nameImg}")
    public byte[] getImgProfile(@PathVariable("nameImg") String nameImg) throws IOException{
        File fileImg = new File(pathImgs + nameImg);
        if(nameImg != null || nameImg.trim().length() > 0){
            return Files.readAllBytes(fileImg.toPath());
        }
        return null;
    }

    @PutMapping()
    public Donor updateDonor(@RequestBody @Valid Donor donorAtt){
        return donorService.update(donorAtt);
    }

    @GetMapping("/{donorID}")
    public Donor getDonor(@PathVariable Long donorID){
        return donorService.find(donorID);
    }

    @DeleteMapping("/{donorID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDonor(@PathVariable Long donorID){
        donorService.deleteDonor(donorID);
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

    @DeleteMapping("review/{reviewID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReview(@PathVariable Long reviewID){
        reviewService.deleteReview(reviewID);
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
    @GetMapping("/donationform/all/{donorID}")
    public List<Donation> allDonationsByDonor(@PathVariable Long donorID){
        donorService.find(donorID);
        return donationsService.allDonationsByDonor(donorID);
    }

    /*
    @PostMapping("/send-email")
    public String sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            emailService.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
            return "E-mail enviado com sucesso para " + emailRequest.getTo();
        } catch (Exception e) {
            return "Erro ao enviar e-mail: " + e.getMessage();
        }
    }*/
}
