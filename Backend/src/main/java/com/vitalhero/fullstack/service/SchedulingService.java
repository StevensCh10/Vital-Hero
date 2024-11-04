package com.vitalhero.fullstack.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Scheduling;
import com.vitalhero.fullstack.repository.SchedulingRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SchedulingService {
    
    private final SchedulingRepository repository;

    private final String SCHEDULING_ALREADY_REGISTERED = "Agendamento já registrado";
    private final String SCHEDULING_NOT_REGISTERED = "Agendamento não registrado";
    private final String BLOODCENTER_CANNOT_CHANGED = "Hemocentro não pode ser alterado";

    @Cacheable(value="scheduling")
    public Scheduling find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFound(SCHEDULING_NOT_REGISTERED));
    }

    @Cacheable(value="scheduling")
    public Scheduling findByDonor(Donor donor){
        if(donor.getScheduling() == null){
            return null;
        }
        return find(donor.getScheduling().getId());
    }

    @Transactional
    @Cacheable(value="scheduling")
    public Scheduling addScheduling(Scheduling newSched){
        Long bloodCenterID = newSched.getBloodcenter().getId();
        Scheduling exists = repository.findByBloodCenterAndDateAndHour(
            bloodCenterID, newSched.getDateTime());
        
        if(exists != null){
            throw new EntityAlreadyExists(SCHEDULING_ALREADY_REGISTERED);
        }
        return repository.save(newSched);
    }

    @Transactional
    @CachePut(value="scheduling", key="#schedulingAtt.id")
	public Scheduling update(Scheduling schedulingAtt) {
		Scheduling currentScheduling = find(schedulingAtt.getId());
		
		if(!schedulingAtt.getBloodcenter().getId().equals(currentScheduling.getBloodcenter().getId())) {
            throw new CannotBeUpdated(BLOODCENTER_CANNOT_CHANGED);
		}

		BeanUtils.copyProperties(schedulingAtt, currentScheduling, "id");
		return repository.saveAndFlush(currentScheduling);
	}

    @CacheEvict(value="scheduling", key = "#id")
    public void deleteScheduling(Long id){
        find(id);
        repository.deleteById(id);
    }

    @Cacheable(value="schedulingsByBloodcenter")
    public List<Scheduling> schedulingsByBloodCenter(Long bcID){
        return repository.allScheduling(bcID);
    }

    @Cacheable(value="allSchedulings")
    public List<Scheduling> schedulings(){
        return repository.findAll();  
    }
}