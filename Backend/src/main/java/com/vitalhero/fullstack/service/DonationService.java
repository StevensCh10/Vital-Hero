package com.vitalhero.fullstack.service;

import java.util.List;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.enums.ErrorMessage;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.Donation;
import com.vitalhero.fullstack.repository.DonationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DonationService {
    
    private final DonationRepository repository;

    @Cacheable(value="donation")
    public Donation findDonationById(Long id){
        log.info("[findDonationById]: Iniciando busca por doacao");
        var foundDonation = repository.findById(id).orElseThrow(() -> {
            log.warn("[findDonationById]: Falha na busca. Doacao com ID: {} não encontrado no sistema", id);
            return new EntityNotFound(ErrorMessage.DONATION_NOT_REGISTERED.toString());
        });
        log.info("[findDonationById]: Busca finalizada com sucesso");
        return foundDonation;
    }
    
    @Cacheable(value="donation")
    public Donation addDonation(Donation newDonation){
        log.info("[addDonation]: Iniciando cadastro da doacao");
        Long donorID = newDonation.getDonor().getId();
        Long schedulingID = newDonation.getScheduling().getId();
        Donation donation = repository.findByDonorAndScheduling(donorID, schedulingID);

        if(donation != null){
            log.warn("[addDonation]: Falha no cadastro. "+ErrorMessage.DONATION_ALREADY_REGISTERED);
            throw new EntityAlreadyExists(ErrorMessage.DONATION_ALREADY_REGISTERED.toString());
        }
        var addedDonation = repository.save(newDonation);
        log.info("[addDonation]: Cadastro concluído com sucesso");
        return addedDonation;
    }
    
    @Cacheable(value="allDonations")
    public List<Donation> allDonationsByDonor(Long donorID){
        log.info("[allDonationsByDonor]: Iniciando busca por todas as doacoes do doador");
        var donationsByDonor = repository.allDonationsByDonor(donorID);
        log.info("[allDonationsByDonor]: Busca finalizada com sucesso");
        return donationsByDonor;
    }

    @CacheEvict(value="donation", key="#id")
    public void deleteDonation(Long id){
        log.info("[deleteDonation]: Iniciando remocao da doacao");
        findDonationById(id);
        repository.deleteById(id);
        log.info("[deleteDonation]: Remoção concluída com sucesso");
    }
}