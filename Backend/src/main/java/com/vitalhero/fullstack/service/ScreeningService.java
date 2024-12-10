package com.vitalhero.fullstack.service;

import java.util.List;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.enums.ErrorMessage;
import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.repository.ScreeningRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScreeningService {
    
    private final ScreeningRepository repository;

    @Cacheable(value="screening")
    public Screening findScreeningById(Long id){
        log.info("[findScreeningById]: Iniciando busca por triagem");
        var foundScreening = repository.findById(id).orElseThrow(() -> {
            log.warn("[findScreeningById]: Falha na busca. Triagem com id '{}' não encontrada no sistema", id);
            return new EntityNotFound(ErrorMessage.SCREENING_NOT_REGISTERED.toString());
        });
        log.info("[findScreeningById]: Buscaconcluída com sucesso");
        return foundScreening;
    }

    @Transactional
    @Cacheable(value="screening")
    public Screening addScreening(Screening newScreening){
        log.info("[addScreening]: Iniciando cadastro de triagem");
        var addedScreening = repository.save(newScreening);
        log.info("[addScreening]: Cadastro concluído com sucesso");
        return addedScreening;
    }

    @Transactional
    @CachePut(value="screening", key="#screeningAtt.id")
    public Screening updateScreening(Screening screeningAtt){
        log.info("[updateScreening]: Iniciando atualizacao de triagem");
        Screening oldS = findScreeningById(screeningAtt.getId());
        if(!oldS.getDonor().getId().equals(screeningAtt.getDonor().getId())){
            log.warn("[updateScreening]:  Falha na atualização. "+ErrorMessage.DONOR_CANNOT_CHANGED, screeningAtt.getDonor().getId());
            throw new CannotBeUpdated(ErrorMessage.DONOR_CANNOT_CHANGED.toString());
        }
        var updatedScreening = repository.saveAndFlush(screeningAtt);
        log.info("[updateScreening]: Atualização concluída com sucesso");
        return updatedScreening;
    }

    @CacheEvict(value="screening", key="#id")
    public void deleteScreening(Long id){
        log.info("[deleteScreening]: Iniciando remoção de triagem");
        repository.deleteById(id);
        log.info("[deleteScreening]: Remoção concluída com sucesso");
    }

    @Cacheable(value="allScreenings")
    public List<Screening> allScreenings(){
        log.info("[allScreenings]: Iniciando busca por todas as triagens cadastradas no sistema");
        var allScreenings = repository.findAll();
        log.info("[allScreenings]: Busca finalizada com sucesso");
        return allScreenings;
    }

    @Cacheable(value="screeningByDonor")
    public Screening screeningByDonor(Donor donor){
        log.info("[screeningByDonor]: Iniciando busca de triagem pelo doador");
        Screening s = repository.findByDonor(donor.getId());
        if(s == null){
            log.warn("[screeningByDonor]: Falha na busca. Triagem pelo doador com id '{}' não preenchida", donor.getId());
            throw new EntityNotFound(ErrorMessage.DONOR_NOT_COMPLETE_SCREENING.toString());
        }
        log.info("[screeningByDonor]: Busca concluída com sucesso");
        return s;
    }

    @CachePut(value="screening", key="#id")
    public void validatedScreening(Long id, Long doctorID){
        log.info("[validatedScreening]: Iniciando validação de triagem");
        findScreeningById(id);
        repository.validate(id, doctorID);
        log.info("[validatedScreening]: Validação concluída com sucesso");
    }
}