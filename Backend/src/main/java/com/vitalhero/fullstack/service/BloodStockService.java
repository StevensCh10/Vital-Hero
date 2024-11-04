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

    private final String BLOODSTOCK_ALREADY_REGISTERED = "Estoque sanguíneo já cadastrado";
    private final String BLOODSTOCK_NOT_FOUND = "Estoque sanguíneo não cadastrado";
    private final String ID_CANNOT_CHANGED = "ID não pode ser alterado";

    @Cacheable(value="bloodstock")
    public BloodStock find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFound(BLOODSTOCK_NOT_FOUND));
    }

    @Cacheable(value="bloodstock")
    public BloodStock findByBloodCenter(Long bcID){
        return repository.findByBloodCenter(bcID);
    }

    @Cacheable(value="allBloodstocks")
    public List<BloodStock> findAll(){
        return repository.findAll();
    }

    @Cacheable(value="bloodstock")
    public BloodStock addBloodStock(BloodStock newBloodStock){
        if(findByBloodCenter(newBloodStock.getBloodcenter().getId()) == null){
            return repository.save(newBloodStock);
        }
        throw new EntityAlreadyExists(BLOODSTOCK_ALREADY_REGISTERED);
    }

    @Transactional
    @CachePut(value="bloodstock", key="#bloodStockAtt.id")
	public BloodStock update(BloodStock bloodStockAtt) {
		BloodStock currentBloodStock = find(bloodStockAtt.getId());
		
		if(!bloodStockAtt.getBloodcenter().getId().equals(currentBloodStock.getBloodcenter().getId()))
            throw new CannotBeUpdated(ID_CANNOT_CHANGED);

		BeanUtils.copyProperties(bloodStockAtt, currentBloodStock, "id");
		return repository.saveAndFlush(currentBloodStock);
	}

    @CacheEvict(value="bloodstock", key="#id")
    public void deleteBloodStock(Long id){
        find(id);
        repository.deleteById(id);
    }
}