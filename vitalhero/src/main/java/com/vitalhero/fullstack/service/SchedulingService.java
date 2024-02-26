package com.vitalhero.fullstack.service;

import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.Donor;
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
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Agendamento não encontrado!"));
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
            throw new RuntimeException("Agenda já existe");
        }
        return repository.save(newSched);
    }

    @Transactional
	public Scheduling update(Scheduling schedulingAtt) {
		Scheduling currentScheduling = find(schedulingAtt.getId());
		
		if(schedulingAtt.getBloodcenter().getId() != currentScheduling.getBloodcenter().getId()) {
			//throw new EntityAlreadyExists(String.format("name '%s' unavailable", schedulingAtt.getName()));
            throw new RuntimeException("Não é possível alterar o hemocentro do agendamento!");
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
}
