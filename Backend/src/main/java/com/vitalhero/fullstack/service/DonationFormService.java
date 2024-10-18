package com.vitalhero.fullstack.service;

import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.DonationForm;
import com.vitalhero.fullstack.repository.DonationFormRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DonationFormService {
    
    private final DonationFormRepository repository;

    public DonationForm find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFound(String.format("Formulário de doação com id '%d' não está registrado.", id)));
    }

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

    public DonationForm addDonationForm(DonationForm newDonationForm){
        if(findByDonor(newDonationForm.getDonor().getId()) == null){
            return repository.save(newDonationForm);
        }

        throw new EntityAlreadyExists("O doador só precisa preencher um formulário de doação uma vez.");
    }

    public DonationForm updateDonationForm(DonationForm attDonationForm){
        DonationForm oldDF = find(attDonationForm.getId());
        if(!oldDF.getDonor().getId().equals(attDonationForm.getDonor().getId())){
            throw new CannotBeUpdated("Formulário não pode ser atualizado pois houve mudança no seu proprietário.");
        }
        return repository.saveAndFlush(attDonationForm);
    }

    public void deleteDonationForm(Long id){
       repository.deleteById(id); 
    }
}