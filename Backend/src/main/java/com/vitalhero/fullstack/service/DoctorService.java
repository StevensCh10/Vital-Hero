package com.vitalhero.fullstack.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.dto.DoctorDTO;
import com.vitalhero.fullstack.dto.ResponseDTO;
import com.vitalhero.fullstack.enums.ErrorMessage;
import com.vitalhero.fullstack.enums.Roles;
import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.repository.DoctorRepository;
import com.vitalhero.fullstack.security.TokenService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DoctorService {
    
    private final DoctorRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final AddressService addressService;

    public Doctor findDoctorById(Long id){
        log.info("[findDoctorById]: Iniciando busca por medico", id);
        var foundDoctor = repository.findById(id).orElseThrow(() -> {
            log.warn("[findDoctorById]: Falha na busca. Médico com id '{} não cadastrado no sistema", id);
            return new EntityNotFound(ErrorMessage.DOCTOR_NOT_REGISTERED.toString());
        });
        log.info("[findDoctorById]: Busca finalizada com sucesso", id);
        return foundDoctor;
    }

    public DoctorDTO getDoctorDTOById(Long id){
        return DoctorDTO.fromEntity(findDoctorById(id));
    }

    @Transactional
	public ResponseDTO addDoctor(Doctor newDoctor) {
        log.info("[addDoctor]: Iniciando cadastro do medico");
		validateDoctorInsert(newDoctor);

        var address = addressService.getAddress(newDoctor.getAddress().getCep());
        address = addressService.addAddress(address);

        newDoctor.setAddress(address);
        newDoctor.setRole(Roles.DOCTOR.toString());
        newDoctor.setPassword(passwordEncoder.encode(newDoctor.getPassword()));
        String token = tokenService.generateToken(newDoctor);
        var addedDoctor = new ResponseDTO(DoctorDTO.fromEntity(repository.save(newDoctor)), token);
        log.info("[addDoctor]: Cadastro finalizado com sucesso");
        return addedDoctor;
	}

    private void validateDoctorInsert(Doctor doctor) {
        log.info("[validateDoctorInsert]: Iniciando validacao do cadastro do medico");
        String doctorName = doctor.getName();
        Optional<Doctor> existingDoctor = repository.findByCpfOrEmailOrCrmOrPhone(doctor.getCpf(), doctor.getEmail(), doctor.getCrm(), doctor.getPhone());
        
        if(existingDoctor.isPresent()){
            Doctor foundDoctor = existingDoctor.get();
            if(foundDoctor.getCpf().equals(doctor.getCpf())){
                log.warn("[validateDoctorInsert]: Falha na validação. "+ErrorMessage.CPF_ALREADY_REGISTERED, doctorName);
                throw new EntityAlreadyExists(ErrorMessage.CPF_ALREADY_REGISTERED.toString());
            }
            else if(foundDoctor.getEmail().equals(doctor.getEmail())){
                log.warn("[validateDoctorInsert]: Falha na validação. "+ErrorMessage.EMAIL_ALREADY_REGISTERED, doctorName);
                throw new EntityAlreadyExists(ErrorMessage.EMAIL_ALREADY_REGISTERED.toString());
            }
            else if(foundDoctor.getCrm().equals(doctor.getCrm())){
                log.warn("[validateDoctorInsert]: Falha na validação. "+ErrorMessage.CRM_ALREADY_REGISTERED, doctorName);
                throw new EntityAlreadyExists(ErrorMessage.CRM_ALREADY_REGISTERED.toString());
            }
            else if(foundDoctor.getPhone().equals(doctor.getPhone())){
                log.warn("[validateDoctorInsert]: Falha na validação. "+ErrorMessage.PHONE_NUMBER_ALREADY_REGISTERED, doctorName);
                throw new EntityAlreadyExists(ErrorMessage.PHONE_NUMBER_ALREADY_REGISTERED.toString());
            }
        }
        log.info("[validateDoctorInsert]: Validação concluída com sucesso");
    }

    @Transactional
	public DoctorDTO updateDoctor(Doctor doctorAtt) {
        log.info("[updateDoctor]: Iniciando atualização do medico");
		Doctor currentDoctor = findDoctorById(doctorAtt.getId());
        validateDoctorUpdate(doctorAtt);

		BeanUtils.copyProperties(doctorAtt, currentDoctor, "id");
		var updatedDoctor = DoctorDTO.fromEntity(repository.saveAndFlush(currentDoctor));
        log.info("[updateDoctor]: Atualização concluída com sucesso");
        return updatedDoctor;
	}

    private void validateDoctorUpdate(Doctor doctor){
        String doctorName = doctor.getName();
        log.info("[validateDoctorUpdate]: Iniciando validacao da atualizacao do medico");
        Optional<Doctor> existingDoctor = repository.findByCpfOrEmailOrCrmOrPhone(doctor.getCpf(), doctor.getEmail(), doctor.getCrm(), doctor.getPhone());
        
		if(existingDoctor.isPresent()){
            Doctor foundDoctor = existingDoctor.get();
            if(!foundDoctor.getCpf().equals(doctor.getCpf())){
                log.warn("[validateDoctorUpdate]: Falha na validação. "+ErrorMessage.CPF_CANNOT_CHANGED, doctorName);
                throw new CannotBeUpdated(ErrorMessage.CPF_CANNOT_CHANGED.toString());
            }
            else if(!foundDoctor.getEmail().equals(doctor.getEmail())){
                log.warn("[validateDoctorUpdate]: Falha na validação. "+ErrorMessage.EMAIL_CANNOT_CHANGED, doctorName);
                throw new CannotBeUpdated(ErrorMessage.EMAIL_CANNOT_CHANGED.toString());
            }
            else if(!foundDoctor.getCrm().equals(doctor.getCrm())){
                log.warn("[validateDoctorUpdate]: Falha na validação. "+ErrorMessage.CRM_CANNOT_CHANGED, doctorName);
                throw new CannotBeUpdated(ErrorMessage.CRM_CANNOT_CHANGED.toString());
            }
            else if(foundDoctor.getPhone().equals(doctor.getPhone()) && !foundDoctor.getPhone().equals(doctor.getPhone())){
                log.warn("[validateDoctorUpdate]: Falha na validação. "+ErrorMessage.PHONE_NUMBER_UNAVAILABLE, doctorName);
                throw new CannotBeUpdated(ErrorMessage.PHONE_NUMBER_UNAVAILABLE.toString());
            }
        }
        log.info("[validateDoctorUpdate]: Validação concluída com sucesso");
    }

    public void deleteDoctor(Long id){
        log.info("[deleteDoctor]: Iniciando remoção do medico", id);
        findDoctorById(id);
        repository.deleteById(id);
        log.info("[deleteDoctor]: Remoção concluída com sucesso", id);
    }
}