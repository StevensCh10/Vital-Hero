package com.vitalhero.fullstack.service;

import java.util.ArrayList;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.DonationForm;
import com.vitalhero.fullstack.model.Donations;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Review;
import com.vitalhero.fullstack.model.Scheduling;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.repository.DonationFormRepository;
import com.vitalhero.fullstack.repository.DonationsRepository;
import com.vitalhero.fullstack.repository.DonorRepository;
import com.vitalhero.fullstack.repository.ReviewRepository;
import com.vitalhero.fullstack.repository.SchedulingRepository;
import com.vitalhero.fullstack.repository.ScreeningRepository;

import jakarta.transaction.Transactional;

@Service
public class DonorService {
    
    private final DonorRepository donorRepository;
    private final SchedulingRepository schedulingRepository;
    private final ScreeningRepository screeningRepository;
    private final DonationsRepository donationsRepository;
    private final ReviewRepository reviewRepository;
    private final DonationFormRepository donationFormRepository;

    public DonorService(DonorRepository donorRepository, SchedulingRepository schedulingRepository, ScreeningRepository screeningRepository,
        DonationsRepository donationsRepository, ReviewRepository reviewRepository, DonationFormRepository donationFormRepository){
        
            this.donorRepository = donorRepository;
            this.schedulingRepository = schedulingRepository;
            this.screeningRepository = screeningRepository;
            this.donationsRepository = donationsRepository;
            this.reviewRepository = reviewRepository;
            this.donationFormRepository = donationFormRepository;
    }

    //NECESSÁRIO PERSONALIZAR TODAS AS EXCEÇÕES LANÇADAS

    public Donor find(Long donorID){
        return donorRepository.findById(donorID).orElseThrow(() -> new RuntimeException("Doador não encontrado"));
    }

    public Screening findScreening(Long screeningID){
        return screeningRepository.findById(screeningID).orElseThrow(() -> new RuntimeException("Doador não encontrado"));
    }

    public Donor checkLogin(String email, String password) {
		Donor donor = donorRepository.checkLogin(email, password);
		
		if(donor == null) {
			if(donorRepository.findByEmail(email) == null) {
				//throw new EntityNotFoundInTheAppeal(String.format("donor '%s' not unregistered.", email));
			}
			//throw new EntityNotFoundInTheAppeal("Incorret password.");
		}
		return donor;
	}

    @Transactional
	public Donor register(Donor donor) {
		if(donorRepository.findByName(donor.getName()) == null) {
			if(donorRepository.findByEmail(donor.getEmail()) != null) {
				//throw new EntityAlreadyExists(String.format("Email '%s' is already registered.", donor.getEmail()));
			}
			return donorRepository.save(donor);			
		}
		//throw new EntityAlreadyExists(String.format("Name '%s' unavailable.", user.getName()));
        throw new RuntimeException();
	}

    public Scheduling scheduled(Long donorID){
        Scheduling sched = schedulingRepository.getReferenceById(donorID);
        
        /*if(sched == null){
            throw new RuntimeException("Não está agendado");
        }*/

        return sched;
    }

    public ArrayList<Screening> allScreenings(Long donorID){
        find(donorID);
        return screeningRepository.allScreenings(donorID);
    }

    public Screening specifcScreening(Long screeningID){
        findScreening(screeningID);
        return screeningRepository.getReferenceById(screeningID);
    }

    public ArrayList<Donations> donations(Long donorID){
        find(donorID);
        return donationsRepository.allDonations(donorID);
    }

    public Review review(Long donorID){
        find(donorID);
        return reviewRepository.getByDonor_id(donorID); //Posso lançar uma exceção para caso não exista um Review
    }

    public DonationForm donationForm(Long donorID){
        find(donorID);
        return donationFormRepository.getByDonor_id(donorID); //Posso lançar uma exceção para caso não exista um donationForm
    }

}
