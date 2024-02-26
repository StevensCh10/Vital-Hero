package com.vitalhero.fullstack.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.repository.DoctorRepository;
import jakarta.transaction.Transactional;

@Service
public class DoctorService {
    
    private final DoctorRepository repository;

    public DoctorService(DoctorRepository repository){
        this.repository = repository;
    }

    public Doctor find(Long id){
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Médico não encontrado"));
    }

    @Transactional
	public Doctor register(Doctor doctor) {
		if(repository.findByCpf(doctor.getCpf()) == null) {
			if(repository.findByEmail(doctor.getEmail()) == null) {
                if(repository.findByCrm(doctor.getCrm()) == null){
                    return repository.save(doctor);			
                }
                throw new RuntimeException("Crm já cadastrado");    
			}
            //throw new EntityAlreadyExists(String.format("Email '%s' is already registered.", doctor.getEmail()));
            throw new RuntimeException("Email já cadastrado");
		}
		//throw new EntityAlreadyExists(String.format("Name '%s' unavailable.", user.getName()));
        throw new RuntimeException("Cpf já cadastrado");
	}

    @Transactional
	public Doctor update(Doctor doctorAtt) {
		Doctor currentDoctor = find(doctorAtt.getId());
		Doctor findedByName = repository.findByName(doctorAtt.getName());
        Doctor findedByCpf = repository.findByCpf(doctorAtt.getCpf());
        Doctor findedByCrm = repository.findByCrm(doctorAtt.getEmail());
        Doctor findedByEmail = repository.findByEmail(doctorAtt.getEmail());
        Doctor findedByPhone = repository.findByPhone(doctorAtt.getPhone());
		
		if(findedByName != null && findedByName.getId() != doctorAtt.getId()) {
			//throw new EntityAlreadyExists(String.format("name '%s' unavailable", doctorAtt.getName()));
            throw new RuntimeException("Nome indiponível!");
		}else if(findedByCpf != null && findedByCpf.getId() != doctorAtt.getId()){
            throw new RuntimeException("Cpf indiponível!");
        }else if(findedByEmail != null && findedByEmail.getId() != doctorAtt.getId()){
            throw new RuntimeException("Email indiponível!");
        }else if(findedByCrm != null && findedByCrm.getId() != doctorAtt.getId()){
            throw new RuntimeException("Crm indiponível!");
        }else if(findedByPhone != null && findedByPhone.getId() != doctorAtt.getId()){
            throw new RuntimeException("Phone indiponível!");
        }

		BeanUtils.copyProperties(doctorAtt, currentDoctor, "id");
		return repository.saveAndFlush(currentDoctor);
	}

    public void deleteDoctor(Long id){
        find(id);
        repository.deleteById(id);
    }
}