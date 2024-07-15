package com.vitalhero.fullstack.service;

import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFoundInTheAppeal;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Scheduling;
import com.vitalhero.fullstack.repository.SchedulingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SchedulingService {
    
    private final SchedulingRepository repository;

    public Scheduling find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundInTheAppeal(String.format("Agendamento com id '%d' não encontrado.", id)));
    }

    public Scheduling findByDonor(Donor donor){
        if(donor.getScheduling() == null){
            return null;
        }
        return find(donor.getScheduling().getId());
    }

    @Transactional
    public Scheduling addScheduling(Scheduling newSched){
        Long bloodCenterID = newSched.getBloodcenter().getId();
        Scheduling exists = repository.findByBloodCenterAndDateAndHour(
            bloodCenterID, newSched.getDateTime());
        
        if(exists != null){
            throw new EntityAlreadyExists("Agenda já está cadastrada");
        }
        return repository.save(newSched);
    }

    @Transactional
	public Scheduling update(Scheduling schedulingAtt) {
		Scheduling currentScheduling = find(schedulingAtt.getId());
		
		if(schedulingAtt.getBloodcenter().getId() != currentScheduling.getBloodcenter().getId()) {
            throw new CannotBeUpdated(String.format("Não é possível alterar o id do hemocentro do agendamento!"));
		}

		BeanUtils.copyProperties(schedulingAtt, currentScheduling, "id");
		return repository.saveAndFlush(currentScheduling);
	}

    public void deleteScheduling(Long id){
        find(id);
        repository.deleteById(id);
    }

    public List<Scheduling> schedulingsByBloodCenter(Long bcID){
        return repository.allScheduling(bcID);
    }

    public List<Scheduling> schedulings(){
            return repository.findAll();  
    }
}
