package com.vitalhero.fullstack.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.BloodCenter;
import com.vitalhero.fullstack.repository.BloodCenterRepository;
import jakarta.transaction.Transactional;

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

    @Transactional
	public BloodCenter update(BloodCenter bloodCenterAtt) {
		BloodCenter currentBloodCenter = find(bloodCenterAtt.getId());
		BloodCenter findedByName = repository.findByName(bloodCenterAtt.getName());
        BloodCenter findedByInstitutionalEmail = repository.findByInstitutionalEmail(bloodCenterAtt.getInstitutionalEmail());
        BloodCenter findedByAddress = repository.findByAddress(bloodCenterAtt.getAddress());
        BloodCenter findedByPhone = repository.findByPhone(bloodCenterAtt.getPhone());
		
		if(findedByName != null && findedByName.getId() != bloodCenterAtt.getId()) {
			//throw new EntityAlreadyExists(String.format("name '%s' unavailable", bloodCenterAtt.getName()));
            throw new RuntimeException("Nome indiponível!");
		}else if(findedByInstitutionalEmail != null && findedByInstitutionalEmail.getId() != bloodCenterAtt.getId()){
            throw new RuntimeException("Email indiponível!");
        }else if(findedByPhone != null && findedByPhone.getId() != bloodCenterAtt.getId()){
            throw new RuntimeException("Telefone indiponível!");
        }else if(findedByAddress != null && findedByAddress.getId() != bloodCenterAtt.getId()){
            throw new RuntimeException("Endereço indiponível!");
        }

		BeanUtils.copyProperties(bloodCenterAtt, currentBloodCenter, "id");
		return repository.saveAndFlush(currentBloodCenter);
	}

    public void deleteBloodCenter(Long id){
        find(id);
        repository.deleteById(id);
    }

    //public Scheduling updateScheduling(Scheduling sched){}    
}
