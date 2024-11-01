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

    @Cacheable(value="screening")
    public Screening find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFound(String.format("Triagem com id '%d' não está registrado.", id)));
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
            throw new CannotBeUpdated("Triagem não pode ser atualizada pois houve mudança no seu proprietário.");
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
            throw new EntityNotFound(String.format("Doador não preencheu sua triagem", donor.getId()));
        }
        return s;
    }

    @CachePut(value="screening", key="#id")
    public void validatedScreening(Long id, Long doctorID){
        find(id);
        repository.validate(id, doctorID);
    }
}