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

import com.vitalhero.fullstack.dto.BloodcenterDTO;
import com.vitalhero.fullstack.dto.ResponseDTO;
import com.vitalhero.fullstack.enums.ErrorMessage;
import com.vitalhero.fullstack.enums.Roles;
import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.Bloodcenter;
import com.vitalhero.fullstack.repository.BloodcenterRepository;
import com.vitalhero.fullstack.security.TokenService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class BloodcenterService {
    
    private final BloodcenterRepository repository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final AddressService addressService;

    @Cacheable(value="bloodcenter")
    public Bloodcenter findBloodcenterById(Long id){
        log.info("[findBloodcenterById]: Iniciando busca por hemocentro");
        var foundBloodcenter = repository.findById(id).orElseThrow(() -> {
            log.warn("[findBloodcenterById]: Falha na busca. Hecomentro com id '{}' não encontrado no sistema", id);
            return new EntityNotFound(ErrorMessage.BLOODCENTER_NOT_REGISTERED.toString());
        });
        log.info("[findBloodcenterById]: Busca concluída com sucesso");
        return foundBloodcenter;
    }

    public BloodcenterDTO getBloodcenterDTOById(Long id){
        return BloodcenterDTO.fromEntity(findBloodcenterById(id));
    }
    
    @Cacheable(value="bloodcenter")
    public ResponseDTO addBloodcenter(Bloodcenter newBloodcenter){
        log.info("[addBloodcenter]: Iniciando cadastro do hemocentro");
        validateBloodcenterInsert(newBloodcenter);

        var address = addressService.getAddress(newBloodcenter.getAddress().getCep());
        address = addressService.addAddress(address);

        newBloodcenter.setAddress(address);
        newBloodcenter.setRole(Roles.DOCTOR.toString());
        newBloodcenter.setPassword(passwordEncoder.encode(newBloodcenter.getPassword()));
        String token = tokenService.generateToken(newBloodcenter);

        var response = new ResponseDTO(BloodcenterDTO.fromEntity(newBloodcenter), token);
        log.info("[addBloodcenter]: Cadastrado concluído com sucesso");
        return response;
    }

    private void validateBloodcenterInsert(Bloodcenter bloodcenter) {
        log.info("[validateBloodcenterInsert]: Iniciando validação no cadastro do hemocentro");
        String bloodcenterName = bloodcenter.getName();
        Optional<Bloodcenter> existingBloodcenter = repository.findByNameOrEmailOrAddressOrPhone(bloodcenterName, bloodcenter.getEmail(), bloodcenter.getAddress(), bloodcenter.getPhone());
        
        if(existingBloodcenter.isPresent()){
            Bloodcenter foundDoctor = existingBloodcenter.get();
            if(foundDoctor.getName().equals(bloodcenterName)){
                log.warn("[validateBloodcenterInsert]: Falha na validação. "+ErrorMessage.BLOODCENTER_ALREADY_REGISTERED, bloodcenterName);
                throw new EntityAlreadyExists(ErrorMessage.BLOODCENTER_ALREADY_REGISTERED.toString());  
            }else if(foundDoctor.getEmail().equals(bloodcenter.getEmail())) {
                log.warn("[validateBloodcenterInsert]: Falha na validação. "+ErrorMessage.EMAIL_ALREADY_REGISTERED, bloodcenterName);
                throw new EntityAlreadyExists(ErrorMessage.EMAIL_ALREADY_REGISTERED.toString());
            } else if(foundDoctor.getAddress().equals(bloodcenter.getAddress())){
                log.warn("[validateBloodcenterInsert]: Falha na validação. "+ErrorMessage.ADDRESS_ALREADY_REGISTERED, bloodcenterName);
                throw new EntityAlreadyExists(ErrorMessage.ADDRESS_ALREADY_REGISTERED.toString());
            } else if(foundDoctor.getPhone().equals(bloodcenter.getPhone())){
                log.warn("[validateBloodcenterInsert]: Falha na validação. "+ErrorMessage.PHONE_NUMBER_ALREADY_REGISTERED, bloodcenterName);
                throw new EntityAlreadyExists(ErrorMessage.PHONE_NUMBER_ALREADY_REGISTERED.toString());
            }
        }
        log.info("[validateBloodcenterInsert]: Validação concluída com sucesso");
    }

    @Transactional
    @CachePut(value="bloodcenter", key="#bloodcenterAtt.id")
	public BloodcenterDTO updateBloodcenter(Bloodcenter bloodcenterAtt) {
        log.info("[updateBloodcenter]: Iniciando atualização do hemocentro");
		Bloodcenter currentBloodcenter = findBloodcenterById(bloodcenterAtt.getId());
		
        validateBloodcenterUpdate(bloodcenterAtt);

		BeanUtils.copyProperties(bloodcenterAtt, currentBloodcenter, "id");
		var bloodcenterDTO = BloodcenterDTO.fromEntity(repository.saveAndFlush(currentBloodcenter));
        log.info("[updateBloodcenter]: Atualização concluída com sucesso");
        return bloodcenterDTO;
	}

    private void validateBloodcenterUpdate(Bloodcenter bloodcenter){
        log.info("[validateBloodcenterUpdate]: Iniciando validação na atualização do hemocentro");
        String bloodcenterName = bloodcenter.getName();
        Optional<Bloodcenter> existingBloodcenter = repository.findByNameOrEmailOrAddressOrPhone(bloodcenterName, bloodcenter.getEmail(), bloodcenter.getAddress(), bloodcenter.getPhone());

        if(existingBloodcenter.isPresent()){
            Bloodcenter foundBloodcenter = existingBloodcenter.get();
            if(!foundBloodcenter.getName().equals(foundBloodcenter.getName())){
                log.warn("[validateBloodcenterUpdate]: Falha na validação. "+ErrorMessage.NAME_CANNOT_CHANGED, bloodcenterName);
                throw new CannotBeUpdated(ErrorMessage.NAME_CANNOT_CHANGED.toString());
            } else if(!foundBloodcenter.getEmail().equals(foundBloodcenter.getEmail())){
                log.warn("[validateBloodcenterUpdate]: Falha na validação. "+ErrorMessage.EMAIL_CANNOT_CHANGED, bloodcenterName);
                throw new CannotBeUpdated(ErrorMessage.EMAIL_CANNOT_CHANGED.toString());
            } else if(!foundBloodcenter.getAddress().equals(foundBloodcenter.getAddress())){
                log.warn("[validateBloodcenterUpdate]: Falha na validação. "+ErrorMessage.ADDRESS_CANNOT_CHANGED, bloodcenterName);
                throw new CannotBeUpdated(ErrorMessage.ADDRESS_CANNOT_CHANGED.toString());
            } else if(foundBloodcenter.getPhone().equals(foundBloodcenter.getPhone()) && foundBloodcenter.getId().equals(foundBloodcenter.getId())){
                log.warn("[validateBloodcenterUpdate]: Falha na validação. "+ErrorMessage.PHONE_NUMBER_UNAVAILABLE, bloodcenterName);
                throw new CannotBeUpdated(ErrorMessage.PHONE_NUMBER_UNAVAILABLE.toString());
            }
        }
        log.info("[validateBloodcenterUpdate]: Validação concluída com sucesso");
    }

    @CacheEvict(value="bloodcenter", key="#id")
    public void deleteBloodcenter(Long id){
        log.info("[deleteBloodcenter]: Iniciando remoção do hemocentro");
        findBloodcenterById(id);
        repository.deleteById(id);
        log.info("[deleteBloodcenter]: Remoção concluída com sucesso");
    }

    @Cacheable(value="allBloodcenters")
    public List<BloodcenterDTO> findAllBloodcenters(){
        log.info("[findAllBloodcenters]: Iniciando busca por todos os hemocentros");
        var allBloodcenters = repository.findAll()
                .stream()
                .map(BloodcenterDTO::fromEntity)
                .collect(Collectors.toList());
        log.info("[findAllBloodcenters]: Busca por todos os hemocentros concluída com sucesso");
        return allBloodcenters;
    }
}