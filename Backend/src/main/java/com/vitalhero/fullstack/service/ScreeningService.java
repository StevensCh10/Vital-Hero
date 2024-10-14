package com.vitalhero.fullstack.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.exception.EntityNotFoundInTheAppeal;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.repository.ScreeningRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScreeningService {
    
    private final ScreeningRepository repository;

    public Screening find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundInTheAppeal(String.format("Triagem com id '%d' não está registrado.", id)));
    }

    @Transactional
    public Screening addScreening(Screening s){
        return repository.save(s);
    }

    @Transactional
    public Screening updateScreening(Screening s){
        Screening oldS = find(s.getId());
        if(!oldS.getDonor().getId().equals(s.getDonor().getId())){
            throw new CannotBeUpdated("Triagem não pode ser atualizada pois houve mudança no seu proprietário.");
        }
        return repository.saveAndFlush(s);
    }

    public void deleteScreening(Long id){
        repository.deleteById(id);
    }

    public List<Screening> allScreenings(){
        return repository.findAll();
    }

    public Screening screeningByDonor(Donor donor){
        Screening s = repository.findByDonor(donor.getId());
        if(s == null){
            throw new EntityNotFound(String.format("Doador não preencheu sua triagem", donor.getId()));
        }
        return s;
    }

    public void validatedScreening(Long id, Long doctorID){
        find(id);
        repository.validate(id, doctorID);
    }
}