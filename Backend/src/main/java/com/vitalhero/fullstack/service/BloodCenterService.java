package com.vitalhero.fullstack.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.dto.BloodCenterDTO;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFoundInTheAppeal;
import com.vitalhero.fullstack.model.BloodCenter;
import com.vitalhero.fullstack.repository.BloodCenterRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BloodCenterService {
    
    private final BloodCenterRepository repository;

    public BloodCenter find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundInTheAppeal(String.format("Hemocentro com id %d não está registrado.", id)));
    }

    public BloodCenterDTO getBloodCenter(Long id){
        return BloodCenterDTO.fromEntity(find(id));
    }

    public List<BloodCenterDTO> findAll(){
        return repository.findAll()
                .stream()
                .map(BloodCenterDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    public BloodCenterDTO addBloodCenter(BloodCenter newBloodCenter){
        if(repository.findByName(newBloodCenter.getName()) == null){
            if(repository.findByEmail(newBloodCenter.getEmail()) == null){
                if(repository.findByAddress(newBloodCenter.getAddress()) == null){
                    return BloodCenterDTO.fromEntity(repository.save(newBloodCenter));
                }
                throw new EntityAlreadyExists(String.format("Endereço '%s' já cadastrado.", newBloodCenter.getAddress()));
            }
            throw new EntityAlreadyExists(String.format("Email institucional '%s' já cadastrado.", newBloodCenter.getEmail()));
        }
        throw new EntityAlreadyExists(String.format("Nome '%s' já cadastrado.", newBloodCenter.getName()));
    }

    @Transactional
	public BloodCenterDTO update(BloodCenter bloodCenterAtt) {
		BloodCenter currentBloodCenter = find(bloodCenterAtt.getId());
		BloodCenter findedByName = repository.findByName(bloodCenterAtt.getName());
        BloodCenter findedByInstitutionalEmail = repository.findByEmail(bloodCenterAtt.getEmail());
        BloodCenter findedByAddress = repository.findByAddress(bloodCenterAtt.getAddress());
        BloodCenter findedByPhone = repository.findByPhone(bloodCenterAtt.getPhone());
		
		if(findedByName != null && findedByName.getId() != bloodCenterAtt.getId()) {
            throw new EntityAlreadyExists(String.format("Nome '%s' indisponível", bloodCenterAtt.getName()));
		}else if(findedByInstitutionalEmail != null && findedByInstitutionalEmail.getId() != bloodCenterAtt.getId()){
            throw new EntityAlreadyExists(String.format("Email '%s' indisponível.", bloodCenterAtt.getEmail()));
        }else if(findedByPhone != null && findedByPhone.getId() != bloodCenterAtt.getId()){
            throw new EntityAlreadyExists(String.format("Telefone '%s' indisponível.", bloodCenterAtt.getPhone()));
        }else if(findedByAddress != null && findedByAddress.getId() != bloodCenterAtt.getId()){
            throw new EntityAlreadyExists(String.format("Endereço '%s' indisponível.", bloodCenterAtt.getAddress()));
        }

		BeanUtils.copyProperties(bloodCenterAtt, currentBloodCenter, "id");
		return BloodCenterDTO.fromEntity(repository.saveAndFlush(currentBloodCenter));
	}

    public void deleteBloodCenter(Long id){
        find(id);
        repository.deleteById(id);
    }
}