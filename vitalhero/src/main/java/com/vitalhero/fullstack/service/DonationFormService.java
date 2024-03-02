package com.vitalhero.fullstack.service;

import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.DonationForm;
import com.vitalhero.fullstack.repository.DonationFormRepository;

@Service
public class DonationFormService {
    
    private final DonationFormRepository repository;

    public DonationFormService(DonationFormRepository repository){
        this.repository = repository;
    }

    public DonationForm findByDonor(Long donorID){
        return repository.findByDonor(donorID).orElseThrow(() -> new EntityNotFound(String.format("Formulário com id '%d' não está registrado", donorID)));
    }

    public DonationForm addDonationForm(DonationForm newDonationForm){
        if(findByDonor(newDonationForm.getDonor().getId()) == null){
            return repository.save(newDonationForm);
        }

        throw new EntityAlreadyExists("O doador só precisa preencher um formulário de doação uma vez.");
    }

    public void deleteDonationForm(Long id){
       repository.deleteById(id); 
    }
}
