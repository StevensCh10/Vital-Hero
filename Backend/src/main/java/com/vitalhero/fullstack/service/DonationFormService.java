package com.vitalhero.fullstack.service;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.enums.ErrorMessage;
import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.DonationForm;
import com.vitalhero.fullstack.repository.DonationFormRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DonationFormService {
    
    private final DonationFormRepository repository;

    @Cacheable(value="donationForm")
    public DonationForm findDonationFormById(Long id){
        log.info("[findDonationFormById]: Iniciando busca por formulario de doacao");
        var foundDonationForm = repository.findById(id).orElseThrow(() -> {
            log.warn("[findDonationFormById]: Falha na busca. Formulario de doacao com ID '{}' não encontrado no sistema", id);
            return new EntityNotFound(ErrorMessage.DONATION_FORM_NOT_REGISTERED.toString());
        });
        log.info("[findDonationFormById]: Busca concluída com sucesso");
        return foundDonationForm;
    }

    @Cacheable(value="donationForm")
    public DonationForm findDonationFormByDonor(Long donorID){
        return repository.findByDonor(donorID);
    }

    public DonationForm verfifyDonationFormByDonor(Long donorID){
        log.info("[verfifyDonationFormByDonor]: Iniciando verificacao se o doador preencheu o formulario de doacao");
        DonationForm found = findDonationFormByDonor(donorID);
        if(found == null){
            log.warn("[verfifyDonationFormByDonor]: Falha na verificacao. Doador com ID: {} não preencheu formulário", donorID);
            throw new EntityNotFound(ErrorMessage.DONOR_NOT_COMPLETE_DONATION_FORM.toString());
        }
        log.info("[verfifyDonationFormByDonor]: Verificação concluída com sucesso");
        return found;
    }

    @Cacheable(value="donationForm")
    public DonationForm addDonationForm(DonationForm newDonationForm){
        log.info("[addDonationForm]: Iniciando cadastro do formulario");
        if(findDonationFormByDonor(newDonationForm.getDonor().getId()) == null){
            var addedDonationForm = repository.save(newDonationForm);
            log.info("[addDonationForm]: Cadastro concluído com sucesso");
            return addedDonationForm;
        }
        log.warn("[addDonationForm]: Falha no cadastro. Formulario de doacao do doador com ID: {} já preenchido", newDonationForm.getDonor());
        throw new EntityAlreadyExists(ErrorMessage.DONOR_COMPLETE_DONATION_FORM.toString());
    }

    @Transactional
    @CachePut(value="donationForm", key="#donationFormAtt.id")
    public DonationForm updateDonationForm(DonationForm donationFormAtt){
        log.info("[updateDonationForm]: Iniciando atualizacao do formulario de doacao");
        DonationForm oldDF = findDonationFormById(donationFormAtt.getId());
        if(!oldDF.getDonor().getId().equals(donationFormAtt.getDonor().getId())){
            log.warn("[updateDonationForm]: Falha na atualização. "+ErrorMessage.DONOR_CANNOT_CHANGED);
            throw new CannotBeUpdated(ErrorMessage.DONOR_CANNOT_CHANGED.toString());
        }
        var updatedDonationForm = repository.saveAndFlush(donationFormAtt);
        log.info("[updateDonationForm]: Atualização concluída com sucesso");
        return updatedDonationForm;
    }

    @CacheEvict(value="screening", key="#id")
    public void deleteDonationForm(Long id){
        log.info("[deleteDonationForm]: Iniciando remocao do formulario de doacao");
       repository.deleteById(id); 
       log.info("[deleteDonationForm]: Remoção concluída com sucesso");
    }
}