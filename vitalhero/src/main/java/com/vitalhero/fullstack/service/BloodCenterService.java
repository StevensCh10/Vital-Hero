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
    private final SchedulingRepository schedulingRepo;
    private final BloodStockRepository bsRepo;

    public BloodCenterService(BloodCenterRepository bcRepository, SchedulingRepository schedulingRepo,
        BloodStockRepository bsRepo){

            this.bcRepository = bcRepository;
            this.schedulingRepo = schedulingRepo;
            this.bsRepo = bsRepo;
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

    public BloodStock bloodStock(Long bcID){
        return null;
    }

}
