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
}
