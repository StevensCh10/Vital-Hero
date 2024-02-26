package com.vitalhero.fullstack.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.Donation;
import com.vitalhero.fullstack.repository.DonationRepository;

@Service
public class DonationService {
    
    private DonationRepository repository;

    public DonationService(DonationRepository repository){
        this.repository = repository;
    }

    public Donation find(Long id){
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Doação não encontrada!"));
    }
    
    public Donation addDonation(Donation newDonation){
        Long donorID = newDonation.getDonor().getId();
        Long schedulingID = newDonation.getScheduling().getId();
        Donation donation = repository.findByDonorAndScheduling(donorID, schedulingID);

        if(donation != null){
            throw new RuntimeException("Doação já foi adicionada!");
        }
        return repository.save(newDonation);
    }
    
    public List<Donation> allDonationsByDonor(Long donorID){
        return repository.allDonationsByDonor(donorID);
    }

    public void deleteDonation(Long id){
        find(id);
        repository.deleteById(id);
    }
}
