package com.vitalhero.fullstack.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.dto.DoctorDTO;
import com.vitalhero.fullstack.enums.Roles;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFoundInTheAppeal;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.repository.DoctorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DoctorService {
    
    private final DoctorRepository repository;

    public Doctor find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundInTheAppeal(String.format("Médico com id '%d' não está registrado.", id)));
    }

    public DoctorDTO getDoctor(Long id){
        return DoctorDTO.fromEntity(find(id));
    }

    @Transactional
	public Doctor register(Doctor doctor) {
		if(repository.findByCpf(doctor.getCpf()) == null) {
			if(repository.findByEmail(doctor.getEmail()) == null) {
                if(repository.findByCrm(doctor.getCrm()) == null){
                    doctor.setRole(Roles.DOCTOR.toString());
                    return repository.save(doctor);			
                }
                throw new EntityAlreadyExists(String.format("Crm '%s' já cadastrado.", doctor.getCrm()));    
			}
            throw new EntityAlreadyExists(String.format("Email '%s' já cadastrado.", doctor.getEmail()));
		}
        throw new EntityAlreadyExists(String.format("Cpf '%s' já cadastrado.", doctor.getCpf()));
	}

    @Transactional
	public DoctorDTO update(Doctor doctorAtt) {
		Doctor currentDoctor = find(doctorAtt.getId());
		Doctor findedByName = repository.findByName(doctorAtt.getName());
        Doctor findedByCpf = repository.findByCpf(doctorAtt.getCpf());
        Doctor findedByCrm = repository.findByCrm(doctorAtt.getEmail());
        Doctor findedByEmail = repository.findByEmail(doctorAtt.getEmail());
        Doctor findedByPhone = repository.findByPhone(doctorAtt.getPhone());
		
		if(findedByName != null && findedByName.getId() != doctorAtt.getId()) {
            throw new EntityAlreadyExists(String.format("Nome '%s' indisponível.", doctorAtt.getName()));
		}else if(findedByCpf != null && findedByCpf.getId() != doctorAtt.getId()){
            throw new EntityAlreadyExists(String.format("Cpf '%s' indisponível.", doctorAtt.getCpf()));
        }else if(findedByEmail != null && findedByEmail.getId() != doctorAtt.getId()){
            throw new EntityAlreadyExists(String.format("Email '%s' indisponível.", doctorAtt.getEmail()));
        }else if(findedByCrm != null && findedByCrm.getId() != doctorAtt.getId()){
            throw new EntityAlreadyExists(String.format("Crm '%s' indisponível.", doctorAtt.getCrm()));
        }else if(findedByPhone != null && findedByPhone.getId() != doctorAtt.getId()){
            throw new EntityAlreadyExists(String.format("Telefone '%s' indisponível.", doctorAtt.getPhone()));
        }

		BeanUtils.copyProperties(doctorAtt, currentDoctor, "id");
		return DoctorDTO.fromEntity(repository.saveAndFlush(currentDoctor));
	}

    public void deleteDoctor(Long id){
        find(id);
        repository.deleteById(id);
    }
}