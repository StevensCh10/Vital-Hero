package com.vitalhero.fullstack.service;

import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFoundInTheAppeal;
import com.vitalhero.fullstack.model.BloodStock;
import com.vitalhero.fullstack.repository.BloodStockRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BloodStockService {
    
    public final BloodStockRepository repository;

    public BloodStock find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundInTheAppeal(String.format("Estoque sanguíneo com id '%d' não está registrado.", id)));
    }

    public BloodStock findByBloodCenter(Long bcID){
        return repository.findByBloodCenter(bcID);
    }

    public List<BloodStock> findAll(){
        return repository.findAll();
    }

    public BloodStock addBloodStock(BloodStock newBloodStock){
        if(findByBloodCenter(newBloodStock.getBloodcenter().getId()) == null){
            return repository.save(newBloodStock);
        }
        throw new EntityAlreadyExists("Não é possível adicionar outro estoque sanguíneo para o mesmo Hemocentro.");
    }

    @Transactional
	public BloodStock update(BloodStock bloodStockAtt) {
		BloodStock currentBloodStock = find(bloodStockAtt.getId());
		
		if(bloodStockAtt.getBloodcenter().getId() != currentBloodStock.getBloodcenter().getId()) {
			//throw new EntityAlreadyExists(String.format("name '%s' unavailable", bloodStockAtt.getName()));
            throw new CannotBeUpdated("O id do Hemocentro não pode ser atualizado");
		}

		BeanUtils.copyProperties(bloodStockAtt, currentBloodStock, "id");
		return repository.saveAndFlush(currentBloodStock);
	}

    public void deleteBloodStock(Long id){
        find(id);
        repository.deleteById(id);
    }
}
