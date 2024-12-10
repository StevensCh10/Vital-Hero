package com.vitalhero.fullstack.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.enums.ErrorMessage;
import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Scheduling;
import com.vitalhero.fullstack.repository.SchedulingRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class SchedulingService {
    
    private final SchedulingRepository repository;

    @Cacheable(value="scheduling")
    public Scheduling findSchedulingById(Long id){
        log.info("[findSchedulingById]: Iniciando busca por agendamento");
        var foundReview = repository.findById(id).orElseThrow(() -> {
            log.warn("[findSchedulingById]: Falha na busca. Agendamento com ID: {} não encontrado no sistema", id);
            return new EntityNotFound(ErrorMessage.SCHEDULING_NOT_REGISTERED.toString());
        });
        log.info("[findSchedulingById]: Busca concluída com sucesso");
        return foundReview;
    }

    @Cacheable(value="scheduling")
    public Scheduling findSchedulingByDonor(Donor donor){
        log.info("[findSchedulingByDonor]: Iniciando busca por agendamento pelo doador");
        if(donor.getScheduling() == null){
            log.warn("[findSchedulingByDonor]: Falha na busca. Doador com ID: {} não realizou nenhuma doação", donor.getId());
            return null;
        }
        var foundSchedulingByDonor = findSchedulingById(donor.getScheduling().getId());
        log.info("[findSchedulingByDonor]: Busca concluída com sucesso");
        return foundSchedulingByDonor;
    }

    @Transactional
    @Cacheable(value="scheduling")
    public Scheduling addScheduling(Scheduling newSched){
        log.info("[addScheduling]: Iniciando cadastro do agendamento");
        Long bloodcenterID = newSched.getBloodcenter().getId();
        Scheduling exists = repository.findByBloodCenterAndDateAndHour(bloodcenterID, newSched.getDateTime());
        
        if(exists != null){
            log.warn("[addScheduling]: Falha no cadastro. Agendamento do hemocentro com ID: {} já existe", newSched.getBloodcenter().getId());
            throw new EntityAlreadyExists(ErrorMessage.SCHEDULING_ALREADY_REGISTERED.toString());
        }
        var addedScheduling = repository.save(newSched);
        log.info("[addScheduling]: Cadastro concluído com sucesso");
        return addedScheduling;
    }

    @Transactional
    @CachePut(value="scheduling", key="#schedulingAtt.id")
	public Scheduling updateScheduling(Scheduling schedulingAtt) {
        log.info("[updateScheduling]: Iniciando atualizacao do agendamento");
		Scheduling currentScheduling = findSchedulingById(schedulingAtt.getId());
		
		if(!schedulingAtt.getBloodcenter().getId().equals(currentScheduling.getBloodcenter().getId())) {
            log.warn("[updateScheduling]: Falha na atualização. "+ErrorMessage.BLOODCENTER_CANNOT_CHANGED);
            throw new CannotBeUpdated(ErrorMessage.BLOODCENTER_CANNOT_CHANGED.toString());
		}

		BeanUtils.copyProperties(schedulingAtt, currentScheduling, "id");
		var updatedScheduling = repository.saveAndFlush(currentScheduling);
        log.info("[updateScheduling]: Atualização concluída com sucesso");
        return updatedScheduling;
	}

    @CacheEvict(value="scheduling", key = "#id")
    public void deleteScheduling(Long id){
        log.info("[deleteScheduling]: Iniciando remocao do agendamento");
        findSchedulingById(id);
        repository.deleteById(id);
        log.info("[deleteScheduling]: Remoção concluído com sucesso");
    }

    @Cacheable(value="schedulingsByBloodcenter")
    public List<Scheduling> schedulingsByBloodcenter(Long bcID){
        log.info("[schedulingsByBloodcenter]: Iniciando busca pelo agendamento do hemocentro");
        var schedulingsByBloodcenter = repository.allScheduling(bcID);
        log.info("[schedulingsByBloodcenter]: Finalizando busca pelo agendamento do hemocentro");
        return schedulingsByBloodcenter;
    }

    @Cacheable(value="allSchedulings")
    public List<Scheduling> allSchedulings(){
        log.info("[allSchedulings]: Iniciando busca por todos os agendamentos no sistema");
        var allSchedulings = repository.findAll();  
        log.info("[allSchedulings]: Busca finalizada com sucesso");
        return allSchedulings;
    }
}