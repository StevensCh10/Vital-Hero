package com.vitalhero.fullstack.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.Donations;
import com.vitalhero.fullstack.repository.DonationsRepository;

@Service
public class DonationsService {
    
    private DonationsRepository repository;

    public DonationsService(DonationsRepository repository){
        this.repository = repository;
    }

    public Donations find(Long id){
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Doação não encontrada!"));
    }
    
    public Donations addDonation(Donations newDonation){
        Long donorID = newDonation.getDonor().getId();
        Long schedulingID = newDonation.getScheduling().getId();
        Donations donation = repository.findByDonorAndScheduling(donorID, schedulingID); //testar

        if(donation != null){
            throw new RuntimeException("Doação já foi adicionada!");
        }
        return newDonation;
    }
    
    public List<Donations> allDonationsByDonor(Long donorID){
        return repository.allDonationsByDonor(donorID);
    }

    public void deleteDonation(Long id){
        find(id);
        repository.deleteById(id);
    }
}
