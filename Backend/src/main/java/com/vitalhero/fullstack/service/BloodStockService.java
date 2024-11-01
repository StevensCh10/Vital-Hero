package com.vitalhero.fullstack.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.BloodStock;
import com.vitalhero.fullstack.repository.BloodStockRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BloodStockService {
    
    public final BloodStockRepository repository;

    @Cacheable(value="bloodcenter")
    public BloodStock find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFound(String.format("Estoque sanguíneo com id '%d' não está registrado.", id)));
    }

    @Cacheable(value="bloodcenter")
    public BloodStock findByBloodCenter(Long bcID){
        return repository.findByBloodCenter(bcID);
    }

    @Cacheable(value="allBloodcenters")
    public List<BloodStock> findAll(){
        return repository.findAll();
    }

    @Cacheable(value="bloodstock")
    public BloodStock addBloodStock(BloodStock newBloodStock){
        if(findByBloodCenter(newBloodStock.getBloodcenter().getId()) == null){
            return repository.save(newBloodStock);
        }
        throw new EntityAlreadyExists("Não é possível adicionar outro estoque sanguíneo para o mesmo Hemocentro.");
    }

    @Transactional
    @CachePut(value="bloodstock", key="#bloodStockAtt.id")
	public BloodStock update(BloodStock bloodStockAtt) {
		BloodStock currentBloodStock = find(bloodStockAtt.getId());
		
		if(!bloodStockAtt.getBloodcenter().getId().equals(currentBloodStock.getBloodcenter().getId())) {
			//throw new EntityAlreadyExists(String.format("name '%s' unavailable", bloodStockAtt.getName()));
            throw new CannotBeUpdated("O id do Hemocentro não pode ser atualizado.");
		}

		BeanUtils.copyProperties(bloodStockAtt, currentBloodStock, "id");
		return repository.saveAndFlush(currentBloodStock);
	}

    @CacheEvict(value="bloodstock", key="#id")
    public void deleteBloodStock(Long id){
        find(id);
        repository.deleteById(id);
    }
}