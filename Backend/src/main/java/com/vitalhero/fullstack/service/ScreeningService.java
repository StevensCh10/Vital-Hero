package com.vitalhero.fullstack.service;

import java.util.List;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.repository.ScreeningRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScreeningService {
    
    private final ScreeningRepository repository;

    private final String SCREENING_NOT_REGISTERED = "Triagem não registrado";
    private final String DONOR_CANNOT_CHANGED = "Doador não pode ser alterado";
    private final String DONOR_NOT_COMPLETE_SCREENING = "Doador não pode preencheu triagem";

    @Cacheable(value="screening")
    public Screening find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFound(SCREENING_NOT_REGISTERED));
    }

    @Transactional
    @Cacheable(value="screening")
    public Screening addScreening(Screening newScreening){
        return repository.save(newScreening);
    }

    @Transactional
    @CachePut(value="screening", key="#screeningAtt.id")
    public Screening updateScreening(Screening screeningAtt){
        Screening oldS = find(screeningAtt.getId());
        if(!oldS.getDonor().getId().equals(screeningAtt.getDonor().getId())){
            throw new CannotBeUpdated(DONOR_CANNOT_CHANGED);
        }
        return repository.saveAndFlush(screeningAtt);
    }

    @CacheEvict(value="screening", key="#id")
    public void deleteScreening(Long id){
        repository.deleteById(id);
    }

    @Cacheable(value="allScreenings")
    public List<Screening> allScreenings(){
        return repository.findAll();
    }

    @Cacheable(value="screeningByDonor")
    public Screening screeningByDonor(Donor donor){
        Screening s = repository.findByDonor(donor.getId());
        if(s == null){
            throw new EntityNotFound(DONOR_NOT_COMPLETE_SCREENING);
        }
        return s;
    }

    @CachePut(value="screening", key="#id")
    public void validatedScreening(Long id, Long doctorID){
        find(id);
        repository.validate(id, doctorID);
    }
}