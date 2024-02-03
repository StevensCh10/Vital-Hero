package com.vitalhero.fullstack.service;

import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.BloodCenter;
import com.vitalhero.fullstack.repository.BloodCenterRepository;

@Service
public class BloodCenterService {
    
    private final BloodCenterRepository repository;

    public BloodCenterService(BloodCenterRepository repository){
            this.repository = repository;
    }

    public BloodCenter find(Long id){
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Hemocentro não encontrado!"));
    }
    
    public BloodCenter addBloodCenter(BloodCenter newBloodCenter){
        if(repository.findByName(newBloodCenter.getName()) == null){
            if(repository.findByInstitutionalEmail(newBloodCenter.getInstitutionalEmail()) == null){
                if(repository.findByAddress(newBloodCenter.getAddress()) == null){
                    return repository.save(newBloodCenter);
                }
                throw new RuntimeException("Endereço cadastrado/indisponível!");
            }
            throw new RuntimeException("Email institucional cadastrado/indisponível!");
        }
        throw new RuntimeException("Nome cadastrado/indisponível!");
    }

    public void deleteBloodCenter(Long id){
        find(id);
        repository.deleteById(id);
    }

    //public Scheduling updateScheduling(Scheduling sched){}    
}
