package com.vitalhero.fullstack.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.BloodCenter;
import com.vitalhero.fullstack.model.BloodStock;
import com.vitalhero.fullstack.model.Scheduling;
import com.vitalhero.fullstack.repository.BloodCenterRepository;
import com.vitalhero.fullstack.repository.BloodStockRepository;

@Service
public class BloodCenterService {
    
    private final BloodCenterRepository bcRepository;
    private final BloodStockRepository bsRepository;

    public BloodCenterService(BloodCenterRepository bcRepository, SchedulingService schedulingService,
        BloodStockRepository bsRepository){

            this.bcRepository = bcRepository;
            this.bsRepository = bsRepository;
    }

    public BloodCenter find(Long id){
        return bcRepository.findById(id).orElseThrow(() -> new RuntimeException("Hemocentro não encontrado!"));
    }
    
    public BloodStock findBloodStock(Long bcID){
        return bsRepository.findById(bcID).orElseThrow(() -> new RuntimeException("Estoque sanguíneo não encontrado!"));
    }

    //public Scheduling updateScheduling(Scheduling sched){}    
}
