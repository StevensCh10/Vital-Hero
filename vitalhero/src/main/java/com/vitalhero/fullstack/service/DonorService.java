package com.vitalhero.fullstack.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.repository.DonorRepository;
import jakarta.transaction.Transactional;

@Service
public class DonorService {

    private final DonorRepository repository;

    public DonorService(DonorRepository repository){
            this.repository = repository;
    }

    //NECESSÁRIO PERSONALIZAR TODAS AS EXCEÇÕES LANÇADAS
    //Provavelmente tenho que validar como será a exclusão de outras entidades que tem um Donor como FK

    public Donor find(Long id){
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Doador não encontrado"));
    }

    public Donor checkLogin(String email, String password) {
		Donor donor = repository.checkLogin(email, password);
		
		if(donor == null) {
			if(repository.findByEmail(email) == null) {
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
		if(repository.findByCpf(donor.getCpf()) == null) {
			if(repository.findByEmail(donor.getEmail()) != null) {
				//throw new EntityAlreadyExists(String.format("Email '%s' is already registered.", donor.getEmail()));
                throw new RuntimeException("Email já cadastrado");
			}
			return repository.save(donor);			
		}
		//throw new EntityAlreadyExists(String.format("Name '%s' unavailable.", user.getName()));
        throw new RuntimeException("Cpf já cadastrado");
	}

    @Transactional
	public Donor update(Donor donorAtt, Long id) {
		Donor currentDonor = find(id);
		Donor findedByName = repository.findByName(donorAtt.getName());
        Donor findedByCpf = repository.findByCpf(donorAtt.getCpf());
        Donor findedByEmail = repository.findByEmail(donorAtt.getEmail());
		
		if(findedByName != null && findedByName.getId() != id) {
			//throw new EntityAlreadyExists(String.format("name '%s' unavailable", donorAtt.getName()));
            throw new RuntimeException("Nome indiponível!");
		}else if(findedByCpf != null && findedByCpf.getId() != id){
            throw new RuntimeException("Cpf indiponível!");
        }else if(findedByEmail != null && findedByEmail.getId() != id){
            throw new RuntimeException("Email indiponível!");
        }

		BeanUtils.copyProperties(donorAtt, currentDonor, "id");
		return repository.saveAndFlush(currentDonor);
	}

    public Donor makeAnScheduling(Long schedulingID, Long id){
        find(id);
        //Verificar no controller se o id do scheduling é válido
        return repository.updateFkScheduling(schedulingID, id);
    }

    public Donor scheduleMadeOrUnscheduled(Long id){
        find(id);
        return repository.FkSchedulingToNull(id);
    }
    
    public void deleteDonor(Long id){
        find(id);
        repository.deleteById(id);
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
