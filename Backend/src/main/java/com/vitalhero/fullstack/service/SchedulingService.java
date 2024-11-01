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

    @Cacheable(value="scheduling")
    public Scheduling find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFound(String.format("Agendamento com id '%d' não está registrado.", id)));
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
            throw new EntityAlreadyExists("Agendamento já cadastrado.");
        }
        return repository.save(newSched);
    }

    @Transactional
    @CachePut(value="scheduling", key="#schedulingAtt.id")
	public Scheduling update(Scheduling schedulingAtt) {
		Scheduling currentScheduling = find(schedulingAtt.getId());
		
		if(!schedulingAtt.getBloodcenter().getId().equals(currentScheduling.getBloodcenter().getId())) {
            throw new CannotBeUpdated(String.format("Não é possível alterar o id do hemocentro do agendamento."));
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