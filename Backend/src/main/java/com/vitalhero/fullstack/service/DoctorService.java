package com.vitalhero.fullstack.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.dto.DoctorDTO;
import com.vitalhero.fullstack.dto.ResponseDTO;
import com.vitalhero.fullstack.enums.Roles;
import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.repository.DoctorRepository;
import com.vitalhero.fullstack.security.TokenService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DoctorService {
    
    private final DoctorRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    private final String DOCTOR_NOT_REGISTERED = "Médico não registrado";
    private final String CPF_ALREADY_REGISTERED = "CPF já cadastrado";
    private final String EMAIL_ALREADY_REGISTERED = "CPF já cadastrado";
    private final String CPF_CANNOT_CHANGED = "CPF não pode ser alterado";
    private final String CRM_ALREADY_REGISTERED = "CRM já cadastrado";
    private final String CRM_CANNOT_CHANGED = "CRM não pode ser alterado";
    private final String EMAIL_CANNOT_CHANGED = "Email não pode ser alterado";
    private final String PHONE_NUMBER_ALREADY_REGISTERED = "Número de telefone já cadastrado";
    private final String PHONE_NUMBER_UNAVAILABLE = "Número de telefone indisponível";

    public Doctor find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFound(DOCTOR_NOT_REGISTERED));
    }

    public DoctorDTO getDoctor(Long id){
        return DoctorDTO.fromEntity(find(id));
    }

    @Transactional
	public ResponseDTO register(Doctor newDoctor) {
		validateDoctorInsert(newDoctor);
        newDoctor.setRole(Roles.DOCTOR.toString());
        newDoctor.setPassword(passwordEncoder.encode(newDoctor.getPassword()));
        String token = tokenService.generateToken(newDoctor);
        return new ResponseDTO(DoctorDTO.fromEntity(repository.save(newDoctor)), token);
	}

    private void validateDoctorInsert(Doctor doctor) {
        Optional<Doctor> existingDoctor = repository.findByCpfOrEmailOrCrmOrPhone(doctor.getCpf(), doctor.getEmail(), doctor.getCrm(), doctor.getPhone());
        
        if(existingDoctor.isPresent()){
            Doctor foundDoctor = existingDoctor.get();
            if(foundDoctor.getCpf().equals(doctor.getCpf())) throw new EntityAlreadyExists(CPF_ALREADY_REGISTERED);
            if(foundDoctor.getEmail().equals(doctor.getEmail())) throw new EntityAlreadyExists(EMAIL_ALREADY_REGISTERED);
            if(foundDoctor.getCrm().equals(doctor.getCrm())) throw new EntityAlreadyExists(CRM_ALREADY_REGISTERED);
            if(foundDoctor.getPhone().equals(doctor.getPhone())) throw new EntityAlreadyExists(PHONE_NUMBER_ALREADY_REGISTERED);
        }
    }

    @Transactional
	public DoctorDTO update(Doctor doctorAtt) {
		Doctor currentDoctor = find(doctorAtt.getId());
        validateDoctorUpdate(doctorAtt);

		BeanUtils.copyProperties(doctorAtt, currentDoctor, "id");
		return DoctorDTO.fromEntity(repository.saveAndFlush(currentDoctor));
	}

    private void validateDoctorUpdate(Doctor doctor){
        Optional<Doctor> existingDoctor = repository.findByCpfOrEmailOrCrmOrPhone(doctor.getCpf(), doctor.getEmail(), doctor.getCrm(), doctor.getPhone());
        
		if(existingDoctor.isPresent()){
            Doctor foundDoctor = existingDoctor.get();
            if(!foundDoctor.getCpf().equals(doctor.getCpf())) throw new CannotBeUpdated(CPF_CANNOT_CHANGED);
            if(!foundDoctor.getEmail().equals(doctor.getEmail())) throw new CannotBeUpdated(EMAIL_CANNOT_CHANGED);
            if(!foundDoctor.getCrm().equals(doctor.getCrm())) throw new CannotBeUpdated(CRM_CANNOT_CHANGED);
            if(foundDoctor.getPhone().equals(doctor.getPhone()) && !foundDoctor.getPhone().equals(doctor.getPhone())) 
                throw new CannotBeUpdated(PHONE_NUMBER_UNAVAILABLE);
        }
    }

    public void deleteDoctor(Long id){
        find(id);
        repository.deleteById(id);
    }
}