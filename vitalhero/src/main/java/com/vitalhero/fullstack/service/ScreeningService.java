package com.vitalhero.fullstack.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.exception.EntityNotFoundInTheAppeal;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.repository.ScreeningRepository;
import jakarta.transaction.Transactional;

@Service
public class ScreeningService {
    
    private final ScreeningRepository repository;

    public ScreeningService(ScreeningRepository repository){
        this.repository = repository;
    }

    public Screening find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundInTheAppeal(String.format("Triagem com id '%d' não encontrada", id)));
    }

    @Transactional
    public Screening addScreening(Screening s){
        return repository.save(s);
    }

    public void deleteScreening(Long id){
        repository.deleteById(id);
    }

    public List<Screening> allScreeningsByDonor(Long donorID){
        return repository.allScreening(donorID);
    }

    public void validatedScreening(Long id, Long doctorID){
        find(doctorID);
        repository.validate(id, doctorID);
    }
    
}
