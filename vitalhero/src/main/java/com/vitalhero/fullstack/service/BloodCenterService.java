package com.vitalhero.fullstack.service;

import java.util.List;
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

    public BloodCenter findBC(Long bcID){
        return bcRepository.findById(bcID).orElseThrow(() -> new RuntimeException("Hemocentro não encontrado!"));
    }
    
    public Scheduling findScheduling(Long schedulingID){
        return schedulingRepository.findById(schedulingID).orElseThrow(() -> new RuntimeException("Agendamento não encontrado!"));
    }

    public List<Scheduling> schedulings(Long bcID){
        return schedulingRepository.allScheduling(bcID);
    }
    
    public BloodStock findBloodStock(Long bcID){
        return bsRepository.findById(bcID).orElseThrow(() -> new RuntimeException("Estoque sanguíneo não encontrado!"));
    }

    public Scheduling addScheduling(Scheduling newScheduling){
        var sched = schedulingRepository.findByBloodCenterAndDateAndHour(newScheduling.getBloodcenter().getId(), 
            newScheduling.getDate(), newScheduling.getHour());

        if(sched != null){
            throw new RuntimeException("Esse agendamento já está cadastrado");
        }

        return schedulingRepository.save(newScheduling);
    }

    //public Scheduling updateScheduling(Scheduling sched){}

    public void deleteScheduling(Long schedulingID){
        findScheduling(schedulingID);
        schedulingRepository.deleteById(schedulingID);
    }
}
