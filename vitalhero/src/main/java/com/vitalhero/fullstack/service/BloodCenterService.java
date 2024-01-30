package com.vitalhero.fullstack.service;

import java.util.ArrayList;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.BloodCenter;
import com.vitalhero.fullstack.model.BloodStock;
import com.vitalhero.fullstack.model.Scheduling;
import com.vitalhero.fullstack.repository.BloodCenterRepository;
import com.vitalhero.fullstack.repository.BloodStockRepository;
import com.vitalhero.fullstack.repository.SchedulingRepository;

@Service
public class BloodCenterService {
    
    private final BloodCenterRepository bcRepository;
    private final SchedulingRepository schedulingRepository;
    private final BloodStockRepository bsRepository;

    public BloodCenterService(BloodCenterRepository bcRepository, SchedulingRepository schedulingRepository,
        BloodStockRepository bsRepository){

            this.bcRepository = bcRepository;
            this.schedulingRepository = schedulingRepository;
            this.bsRepository = bsRepository;
    }

    public BloodCenter bloodCenter(Long bcID){
        return null;
    }

    public ArrayList<Scheduling> schedulings(Long bcID){
        return null;
    }

    public Scheduling specifScheduling(Long schedulingID){
        return null;
    }

    public Scheduling addScheduling(Scheduling newScheduling){
        var sched = schedulingRepository.findByBloodCenterAndDateAndHour(newScheduling.getBloodcenter().getId(), 
            newScheduling.getDate(), newScheduling.getHour());

        if(sched != null){
            throw new RuntimeException("Esse agendamento já está cadastrado");
        }

        return schedulingRepository.save(newScheduling);
    }

    public BloodStock bloodStock(Long bcID){
        return null;
    }

}
