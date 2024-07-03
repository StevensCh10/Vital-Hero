package com.vitalhero.fullstack.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFoundInTheAppeal;
import com.vitalhero.fullstack.model.Donation;
import com.vitalhero.fullstack.repository.DonationRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DonationService {
    
    private DonationRepository repository;

    public Donation find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundInTheAppeal(String.format("Doação com id '%d' não está registrada.", id)));
    }
    
    public Donation addDonation(Donation newDonation){
        Long donorID = newDonation.getDonor().getId();
        Long schedulingID = newDonation.getScheduling().getId();
        Donation donation = repository.findByDonorAndScheduling(donorID, schedulingID);

        if(donation != null){
            throw new EntityAlreadyExists("Esta doação já foi registrada.");
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
