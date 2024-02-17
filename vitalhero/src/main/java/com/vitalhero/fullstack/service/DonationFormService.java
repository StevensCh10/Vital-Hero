package com.vitalhero.fullstack.service;

import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.DonationForm;
import com.vitalhero.fullstack.repository.DonationFormRepository;

@Service
public class DonationFormService {
    
    private final DonationFormRepository repository;

    public DonationFormService(DonationFormRepository repository){
        this.repository = repository;
    }

    public DonationForm findByDonor(Long donorID){
        return repository.findByDonor(donorID).orElseThrow(() -> new RuntimeException("Você ainda não preencheu seu formulário de doação!"));
    }

    public DonationForm addDonationForm(DonationForm newDonationForm){
        if(findByDonor(newDonationForm.getDonor().getId()) == null){
            return repository.save(newDonationForm);
        }

        throw new RuntimeException("Você já preencheu seu formulário de doação");
    }

    public void deleteDonationForm(Long id){
       repository.deleteById(id); 
    }
}
