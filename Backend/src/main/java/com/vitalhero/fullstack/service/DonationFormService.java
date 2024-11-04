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

    private final String DONATION_FORM_NOT_REGISTERED = "Formulário de doação não registrado";
    private final String DONOR_NOT_COMPLETE_DONATION_FORM = "Doador não preencheu o formulário de doação";
    private final String DONOR_COMPLETE_DONATION_FORM = "Doador já preencheu o formulário de doação";
    private final String DONOR_CANNOT_CHANGED = "Doador não pode ser alterado";

    @Cacheable(value="donationForm")
    public DonationForm find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFound(DONATION_FORM_NOT_REGISTERED));
    }

    @Cacheable(value="donationForm")
    public DonationForm findByDonor(Long donorID){
        return repository.findByDonor(donorID);
    }

    public DonationForm verfifyDonationFormByDonor(Long donorID){
        DonationForm found = findByDonor(donorID);
        if(found == null){
            throw new EntityNotFound(DONOR_NOT_COMPLETE_DONATION_FORM);
        }
        return found;
    }

    @Cacheable(value="donationForm")
    public DonationForm addDonationForm(DonationForm newDonationForm){
        if(findByDonor(newDonationForm.getDonor().getId()) == null){
            return repository.save(newDonationForm);
        }

        throw new EntityAlreadyExists(DONOR_COMPLETE_DONATION_FORM);
    }

    @Transactional
    @CachePut(value="donationForm", key="#donationFormAtt.id")
    public DonationForm updateDonationForm(DonationForm donationFormAtt){
        DonationForm oldDF = find(donationFormAtt.getId());
        if(!oldDF.getDonor().getId().equals(donationFormAtt.getDonor().getId())){
            throw new CannotBeUpdated(DONOR_CANNOT_CHANGED);
        }
        return repository.saveAndFlush(donationFormAtt);
    }

    @CacheEvict(value="screening", key="#id")
    public void deleteDonationForm(Long id){
       repository.deleteById(id); 
    }
}