package com.vitalhero.fullstack.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.dto.BloodCenterDTO;
import com.vitalhero.fullstack.dto.ResponseDTO;
import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.BloodCenter;
import com.vitalhero.fullstack.repository.BloodCenterRepository;
import com.vitalhero.fullstack.security.TokenService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BloodCenterService {
    
    private final BloodCenterRepository repository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    private final String BLOODCENTER_NOT_REGISTERED = "Hemocentro não registrado";
    private final String BLOODCENTER_ALREADY_REGISTERED = "Hemocentro já cadastrado";
    private final String NAME_CANNOT_CHANGED = "Nome não pode ser alterado";
    private final String EMAIL_ALREADY_REGISTERED = "CPF já cadastrado";
    private final String EMAIL_CANNOT_CHANGED = "Email não pode ser alterado";
    private final String ADDRESS_ALREADY_REGISTERED = "Endereço já cadastrado";
    private final String ADDRESS_CANNOT_CHANGED = "Endereço não pode ser alterado";
    private final String PHONE_NUMBER_ALREADY_REGISTERED = "Número de telefone já cadastrado";
    private final String PHONE_NUMBER_UNAVAILABLE = "Número de telefone indisponível";

    @Cacheable(value="bloodcenter")
    public BloodCenter find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFound(BLOODCENTER_NOT_REGISTERED));
    }

    public BloodCenterDTO getBloodCenter(Long id){
        return BloodCenterDTO.fromEntity(find(id));
    }
    
    @Cacheable(value="bloodcenter")
    public ResponseDTO addBloodCenter(BloodCenter newBloodcenter){
        validateBloodcenterInsert(newBloodcenter);
        newBloodcenter.setPassword(passwordEncoder.encode(newBloodcenter.getPassword()));
        String token = tokenService.generateToken(newBloodcenter);
        return new ResponseDTO(BloodCenterDTO.fromEntity(newBloodcenter), token);
    }

    private void validateBloodcenterInsert(BloodCenter bloodcenter) {
        Optional<BloodCenter> existingBloodcenter = repository.findByNameOrEmailOrAddressOrPhone(bloodcenter.getName(), bloodcenter.getEmail(), bloodcenter.getAddress(), bloodcenter.getPhone());
        
        if(existingBloodcenter.isPresent()){
            BloodCenter foundDoctor = existingBloodcenter.get();
            if(foundDoctor.getName().equals(bloodcenter.getName())) throw new EntityAlreadyExists(BLOODCENTER_ALREADY_REGISTERED);
            if(foundDoctor.getEmail().equals(bloodcenter.getEmail())) throw new EntityAlreadyExists(EMAIL_ALREADY_REGISTERED);
            if(foundDoctor.getAddress().equals(bloodcenter.getAddress())) throw new EntityAlreadyExists(ADDRESS_ALREADY_REGISTERED);
            if(foundDoctor.getPhone().equals(bloodcenter.getPhone())) throw new EntityAlreadyExists(PHONE_NUMBER_ALREADY_REGISTERED);
        }
    }

    @Transactional
    @CachePut(value="bloodcenter", key="#bloodCenterAtt.id")
	public BloodCenterDTO update(BloodCenter bloodCenterAtt) {
		BloodCenter currentBloodCenter = find(bloodCenterAtt.getId());
		
        validateBloodcenterUpdate(bloodCenterAtt);

		BeanUtils.copyProperties(bloodCenterAtt, currentBloodCenter, "id");
		return BloodCenterDTO.fromEntity(repository.saveAndFlush(currentBloodCenter));
	}

    private void validateBloodcenterUpdate(BloodCenter bloodcenter){
        Optional<BloodCenter> existingBloodcenter = repository.findByNameOrEmailOrAddressOrPhone(bloodcenter.getName(), bloodcenter.getEmail(), bloodcenter.getAddress(), bloodcenter.getPhone());

        if(existingBloodcenter.isPresent()){
            BloodCenter foundBloodcenter = existingBloodcenter.get();
            if(!foundBloodcenter.getName().equals(foundBloodcenter.getName())) throw new CannotBeUpdated(NAME_CANNOT_CHANGED);
            if(!foundBloodcenter.getEmail().equals(foundBloodcenter.getEmail())) throw new CannotBeUpdated(EMAIL_CANNOT_CHANGED);
            if(!foundBloodcenter.getAddress().equals(foundBloodcenter.getAddress())) throw new CannotBeUpdated(ADDRESS_CANNOT_CHANGED);
            if(foundBloodcenter.getPhone().equals(foundBloodcenter.getPhone()) && foundBloodcenter.getId().equals(foundBloodcenter.getId()))
             throw new CannotBeUpdated(PHONE_NUMBER_UNAVAILABLE);
        }
    }

    @CacheEvict(value="bloodcenter", key="#id")
    public void deleteBloodCenter(Long id){
        find(id);
        repository.deleteById(id);
    }

    @Cacheable(value="allBloodcenters")
    public List<BloodCenterDTO> findAll(){
        return repository.findAll()
                .stream()
                .map(BloodCenterDTO::fromEntity)
                .collect(Collectors.toList());
    }
}