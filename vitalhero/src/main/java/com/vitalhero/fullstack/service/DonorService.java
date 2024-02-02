package com.vitalhero.fullstack.service;

import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.repository.DonorRepository;
import jakarta.transaction.Transactional;

@Service
public class DonorService {

    private final DonorRepository donorRepository;

    public DonorService(DonorRepository donorRepository){
            this.donorRepository = donorRepository;
    }

    //NECESSÁRIO PERSONALIZAR TODAS AS EXCEÇÕES LANÇADAS

    public Donor find(Long id){
        return donorRepository.findById(id).orElseThrow(() -> new RuntimeException("Doador não encontrado"));
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

    public Donor makeAnScheduling(Long schedulingID, Long id){
        find(id);
        //Verificar no controller se o id do scheduling é válido
        return donorRepository.updateFkScheduling(schedulingID, id);
    }

    public Donor scheduleMadeOrUnscheduled(Long id){
        find(id);
        return donorRepository.FkSchedulingToNull(id);
    } 

    /* --ESSES MÉTODOS PODEM SER RETIRADOS DAQUI E A LÓGICA SER COLOCADA NO CONTROLLER--

    public Scheduling scheduled(Long donorID){    
        Donor donor = find(donorID);
        return schedulingService.find(donor.getScheduling().getId());
    }

    public List<Screening> allScreenings(Long donorID){
        find(donorID);
        return screeningService.allScreeningsByDonor(donorID);
    }

    public List<Donations> donations(Long donorID){
        find(donorID);
        return donationsService.allDonationsByDonor(donorID);
    }

    public Review getReview(Long donorID){
        find(donorID);
        return reviewService.reviewByDonor(donorID);
    }
    
    public DonationForm getDonationForm(Long donorID){
        find(donorID);
        DonationForm donationF = donationFormRepository.findByDonor(donorID);
        
        if(donationF == null){
            throw new RuntimeException("Você ainda não realizou o seu fomulários de doação !");
        }
        return donationF;
    }
    */

}
