package com.vitalhero.fullstack.service;

import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.Scheduling;
import com.vitalhero.fullstack.repository.SchedulingRepository;
import jakarta.transaction.Transactional;

@Service
public class SchedulingService {
    
    private SchedulingRepository repository;

    public SchedulingService(SchedulingRepository repository){
        this.repository = repository;
    }

    public Scheduling find(Long id){
        return repository.findById(id).orElseThrow(
            () -> new RuntimeException()
        );
    }

    @Transactional
    public Scheduling addScheduling(Scheduling newSched){
        Long bloodCenterID = newSched.getBloodcenter().getId();
        Scheduling exists = repository.findByBloodCenterAndDateAndHour(
            bloodCenterID, newSched.getDate(), newSched.getHour());
        
        if(exists != null){
            throw new RuntimeException("Agenda já existe");
        }
        return repository.save(newSched);
    }

    public void deleteScheduling(Long id){
        find(id);
        repository.deleteById(id);
    }
}