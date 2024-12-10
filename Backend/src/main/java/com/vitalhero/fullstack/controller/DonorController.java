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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.vitalhero.fullstack.dto.DonorDTO;
import com.vitalhero.fullstack.model.Address;
import com.vitalhero.fullstack.model.Donation;
import com.vitalhero.fullstack.model.DonationForm;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Review;
import com.vitalhero.fullstack.model.Scheduling;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.service.AddressService;
import com.vitalhero.fullstack.service.DonationFormService;
import com.vitalhero.fullstack.service.DonationService;
import com.vitalhero.fullstack.service.DonorService;
import com.vitalhero.fullstack.service.ReviewService;
import com.vitalhero.fullstack.service.SchedulingService;
import com.vitalhero.fullstack.service.ScreeningService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/donor")
@RequiredArgsConstructor
@Slf4j
public class DonorController {
    
    private final DonorService donorService;
    private final SchedulingService schedulingService;
    private final AddressService addressService;
    private final ScreeningService screeningService;
    private final DonationFormService donationFormService;
    private final DonationService donationsService;
    private final ReviewService reviewService;

    @PutMapping()
    @ResponseStatus(HttpStatus.OK)
    public DonorDTO updateDonor(@Valid @RequestBody Donor donorAtt){
        log.info("Iniciando requisicao de atualizacao do doador");
        DonorDTO updatedDonor = donorService.updateDonor(donorAtt);
        log.info("Finalizando requisicao de atualizacao do doador");
        return updatedDonor;
    }

    @PutMapping("/updatepassword/{donorID}")
    @ResponseStatus(HttpStatus.OK)
    public DonorDTO updatePassword(@PathVariable Long donorID, @RequestParam String password){
        log.info("Iniciando requisicao de atualizacao de senha do doador");
        DonorDTO updatedDonor = donorService.updatePassword(donorID, password);
        log.info("Finalizando requisicao de atualizacao de senha do doador");
        return updatedDonor;
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/sendfeedback/{donorID}")
    public void sendFeedback(@PathVariable Long donorID, @RequestParam String feedback){
        log.info("Iniciando requisicao de envio de feedback");
        donorService.sendFeedback(donorID, feedback);
        log.info("Finalizando requisicao de envio de feedback");
    }

    @GetMapping("/{donorID}")
    public DonorDTO getDonor(@PathVariable Long donorID){
        log.info("Iniciando requisicao de busca por doador via ID");
        DonorDTO foundDonor = donorService.getDonorDTOById(donorID);
        log.info("Finalizando requisicao de busca por doador via ID");
        return foundDonor;
    }

    @GetMapping("/allScheduling")
    public List<DonorDTO> allSchedulingDonors(){
        log.info("Iniciando requisicao de busca por todos os agendamentos do doador");
        List<DonorDTO> allSchedByDonor = donorService.allSchedulingDonors();
        log.info("Finalizando requisicao de busca por todos os agendamentos do doador");
        return allSchedByDonor;
    }

    @DeleteMapping("/{donorID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDonor(@PathVariable Long donorID){
        log.info("Iniciando requisicao de remocao de doador");
        donorService.deleteDonor(donorID);
        log.info("Finalizando requisicao de remocao de doador");
    }

    //REVIEW
    @PostMapping("/review")
    @ResponseStatus(HttpStatus.CREATED)
    public Review addReview(@Valid @RequestBody Review newReview){
        log.info("Iniciando requisicao para adicionar uma review");
        Review addedReview = reviewService.addReview(newReview);
        log.info("Finalizando requisicao para adicionar uma review");
        return addedReview;
    }

    @PutMapping("/review")
    @ResponseStatus(HttpStatus.OK)
    public Review updateReview(@Valid @RequestBody Review review){
        log.info("Iniciando requisicao de atualizacao de review");
        Review updatedReview = reviewService.updateReview(review);
        log.info("Finalizando requisicao de atualizacao de review");
        return updatedReview;
    }

    @GetMapping("/review/findbydonor/{donorID}")
    public Review getReview(@PathVariable Long donorID){
        log.info("Iniciando requisicao de busca por review");
        donorService.findDonorById(donorID);
        Review foundReview = reviewService.findReviewByDonor(donorID);
        log.info("Finalizando requisicao de busca por review");
        return foundReview;
    }

    @DeleteMapping("review/{reviewID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReview(@PathVariable Long reviewID){
        log.info("Iniciando requisicao de remocao de review");
        reviewService.deleteReview(reviewID);
        log.info("Finalizando requisicao de remocao de review");
    }

    //SCHEDULING
    @PutMapping("/toschedule/{donorID}/{schedulingID}")
    @ResponseStatus(HttpStatus.OK)
    public Scheduling toSchedule(@PathVariable Long donorID, @PathVariable Long schedulingID){
        log.info("Iniciando requisicao de agendamento");
        var foundScheduling = schedulingService.findSchedulingById(schedulingID);
        var foundDonor = donorService.findDonorById(donorID);
        donorService.toSchedule(donorID, screeningService.screeningByDonor(foundDonor), schedulingID);
        log.info("Finalizando requisicao de agendamento");
        return foundScheduling;
    }

    @GetMapping("/scheduled/{donorID}")
    public Scheduling scheduled(@PathVariable Long donorID){
        log.info("Iniciando requisicao de busca por agendamento");
        Donor foundDonor = donorService.findDonorById(donorID);
        var foundSchedulingbyDonor = schedulingService.findSchedulingByDonor(foundDonor);
        log.info("Finalizando requisicao de busca por agendamento");
        return foundSchedulingbyDonor;
    }

    @PutMapping("/unschedule/{donorID}")
    @ResponseStatus(HttpStatus.OK)
    public void unschdule(@PathVariable Long donorID){
        log.info("Iniciando requisicao de desagendamento");
        donorService.scheduleMadeOrUnscheduled(donorID);
        log.info("Finalizando requisicao de desagendamento");
    }

    //ADDRESS
    @GetMapping("/address/{addressID}")
    public Address getAddress(@PathVariable Long addressID){
        log.info("Iniciando requisicao de busca por endereço do doador");
        var foundAddress = addressService.findAddressById(addressID);
        log.info("Finalizando requisicao de busca por endereço do doador");
        return foundAddress;
    }

    //SCREENING
    @PostMapping("/screening")
    public Screening doScreening(@Valid @RequestBody Screening newScreening){
        log.info("Iniciando requisicao de preenchimento de triagem");
        Screening addedScreening = screeningService.addScreening(newScreening);
        log.info("Finalizando requisicao de preenchimento de triagem");
        return addedScreening;
    }

    @PutMapping("/screening")
    @ResponseStatus(HttpStatus.OK)
    public Screening updateScreening(@Valid @RequestBody Screening attScreening){
        log.info("Iniciando requisicao de atualizacao de triagem");
        var updatedScreening = screeningService.updateScreening(attScreening);
        log.info("Finalizando requisicao de atualizacao de triagem");
        return updatedScreening;
    }

    @GetMapping("/screening/{donorID}")
    public Screening screeningByDonor(@PathVariable Long donorID){
        log.info("Iniciando requisicao de busca pela triagem do doador");
        var foundDonor = donorService.findDonorById(donorID);
        var foundScreeningByDonor = screeningService.screeningByDonor(foundDonor);
        log.info("Finalizando requisicao de busca pela triagem do doador");
        return foundScreeningByDonor;
    }

    //DONATIONFORM
    @PostMapping("/donationform")
    public DonationForm fillOutDonationForm(@Valid @RequestBody DonationForm newDonation){
        log.info("Iniciando requisicao de preenchimento de formulario de doacao");
        var addedDonationForm = donationFormService.addDonationForm(newDonation);
        log.info("Finalizando requisicao de preenchimento de formulario de doacao");
        return addedDonationForm;
    }

    @PutMapping("/donationform")
    @ResponseStatus(HttpStatus.OK)
    public DonationForm updateDonationForm(@Valid @RequestBody DonationForm attDonationForm){
        log.info("Iniciando requisicao de atualizacao de formulario de doacao");
        var updatedDonationForm = donationFormService.updateDonationForm(attDonationForm);
        log.info("Finalizando requisicao de atualizacao de formulario de doacao");
        return updatedDonationForm;
    }

    @GetMapping("/donationform/findbydonor/{donorID}")
    public DonationForm getDonationForm(@PathVariable Long donorID){
        log.info("Iniciando requisicao de busca pelo formulario de doacao do doador");
        var verifiedDonationForm = donationFormService.verfifyDonationFormByDonor(donorID);
        log.info("Finalizando requisicao de busca pelo formulario de doacao do doador");
        return verifiedDonationForm;
    }

    @DeleteMapping("/doantionform")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDonationForm(@PathVariable Long donationFormID){
        log.info("Iniciando requisicao de remocao de formulario de doacao");
        donationFormService.deleteDonationForm(donationFormID);
        log.info("Finalizando requisicao de remocao de formulario de doacao");
    }

    //DONATION
    @GetMapping("/donation/all/{donorID}")
    public List<Donation> allDonationsByDonor(@PathVariable Long donorID){
        log.info("Iniciando requisicao de busca por todas as doacoes realizadas pelo doador");
        donorService.findDonorById(donorID);
        var foundDonationByDonor = donationsService.allDonationsByDonor(donorID);
        log.info("Finalizando requisicao de busca por todas as doacoes realizadas pelo doador");
        return foundDonationByDonor;
    }
}
