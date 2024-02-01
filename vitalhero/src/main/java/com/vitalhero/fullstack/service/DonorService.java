package com.vitalhero.fullstack.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.DonationForm;
import com.vitalhero.fullstack.model.Donations;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Review;
import com.vitalhero.fullstack.model.Scheduling;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.repository.DonationFormRepository;
import com.vitalhero.fullstack.repository.DonorRepository;
import jakarta.transaction.Transactional;

@Service
public class DonorService {

    private final DonorRepository donorRepository;
    private final SchedulingService schedulingService;
    private final ScreeningService screeningService;
    private final DonationsService donationsService;
    private final ReviewService reviewService;
    private final DonationFormRepository donationFormRepository;

    public DonorService(DonorRepository donorRepository, SchedulingService schedulingService, ScreeningService screeningService,
        DonationsService donationsService, ReviewService reviewService, DonationFormRepository donationFormRepository){
        
            this.donorRepository = donorRepository;
            this.schedulingService = schedulingService;
            this.screeningService = screeningService;
            this.donationsService = donationsService;
            this.reviewService = reviewService;
            this.donationFormRepository = donationFormRepository;
    }

    //NECESSÁRIO PERSONALIZAR TODAS AS EXCEÇÕES LANÇADAS

    public Donor findDonor(Long donorID){
        return donorRepository.findById(donorID).orElseThrow(() -> new RuntimeException("Doador não encontrado"));
    }

    public Donor checkLogin(String email, String password) {
		Donor donor = donorRepository.checkLogin(email, password);
		
		if(donor == null) {
			if(donorRepository.findByEmail(email) == null) {
				//throw new EntityNotFoundInTheAppeal(String.format("donor '%s' not unregistered.", email));
                throw new RuntimeException("Doador não cadastrado");
			}
			//throw new EntityNotFoundInTheAppeal("Incorret password.");
            throw new RuntimeException("Senha incorreta");
		}
		return donor;
	}

    @Transactional
	public Donor register(Donor donor) {
		if(donorRepository.findByName(donor.getName()) == null) {
			if(donorRepository.findByEmail(donor.getEmail()) != null) {
				//throw new EntityAlreadyExists(String.format("Email '%s' is already registered.", donor.getEmail()));
                throw new RuntimeException("Email já cadastrado");
			}
			return donorRepository.save(donor);			
		}
		//throw new EntityAlreadyExists(String.format("Name '%s' unavailable.", user.getName()));
        throw new RuntimeException("Nome indisponivel");
	}

    public Donor makeAnScheduling(Long schedulingID, Long donorID){
        return donorRepository.updateFkScheduling(schedulingID, schedulingID);
    }

    public Scheduling scheduled(Long donorID){
        Donor donor = findDonor(donorID);
        return schedulingService.find(donor.getScheduling().getId());
    }

    public List<Screening> allScreenings(Long donorID){
        findDonor(donorID);
        return screeningService.allScreeningsByDonor(donorID);
    }

    public List<Donations> donations(Long donorID){
        findDonor(donorID);
        return donationsService.allDonationsByDonor(donorID);
    }

    public Review getReview(Long donorID){
        findDonor(donorID);
        return reviewService.reviewByDonor(donorID);
    }

    public DonationForm getDonationForm(Long donorID){
        findDonor(donorID);
        DonationForm donationF = donationFormRepository.findByDonor(donorID);

        if(donationF == null){
            throw new RuntimeException("Você ainda não realizou o seu fomulários de doação !");
        }
        return donationF;
    }

}
