package com.vitalhero.fullstack.service;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.DonationForm;
import com.vitalhero.fullstack.repository.DonationFormRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DonationFormService {
    
    private final DonationFormRepository repository;

    @Cacheable(value="donationForm")
    public DonationForm find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFound(String.format("Formulário de doação com id '%d' não está registrado.", id)));
    }

    @Cacheable(value="donationForm")
    public DonationForm findByDonor(Long donorID){
        return repository.findByDonor(donorID);
    }

    public DonationForm verfifyDonationFormByDonor(Long donorID){
        DonationForm found = findByDonor(donorID);
        if(found == null){
            throw new EntityNotFound(String.format("Doador não preencheu seu formulário de doação", donorID));
        }
        return found;
    }

    @Cacheable(value="donationForm")
    public DonationForm addDonationForm(DonationForm newDonationForm){
        if(findByDonor(newDonationForm.getDonor().getId()) == null){
            return repository.save(newDonationForm);
        }

        throw new EntityAlreadyExists("O doador só precisa preencher um formulário de doação uma vez.");
    }

    @Transactional
    @CachePut(value="donationForm", key="#donationFormAtt.id")
    public DonationForm updateDonationForm(DonationForm donationFormAtt){
        DonationForm oldDF = find(donationFormAtt.getId());
        if(!oldDF.getDonor().getId().equals(donationFormAtt.getDonor().getId())){
            throw new CannotBeUpdated("Formulário não pode ser atualizado pois houve mudança no seu proprietário.");
        }
        return repository.saveAndFlush(donationFormAtt);
    }

    @CacheEvict(value="screening", key="#id")
    public void deleteDonationForm(Long id){
       repository.deleteById(id); 
    }
}