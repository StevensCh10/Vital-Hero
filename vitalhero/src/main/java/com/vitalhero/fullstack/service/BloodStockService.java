package com.vitalhero.fullstack.service;

import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.BloodStock;
import com.vitalhero.fullstack.repository.BloodStockRepository;

@Service
public class BloodStockService {
    
    public final BloodStockRepository repository;

    public BloodStockService(BloodStockRepository repository){
        this.repository = repository;
    }

    public BloodStock find(Long id){
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Estoque sanguíneo não encontrado!"));
    }

    public BloodStock findByBloodCenter(Long id){
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Estoque sanguíneo não encontrado!"));
    }

    public BloodStock addBloodStock(BloodStock newBloodStock){
        if(findByBloodCenter(newBloodStock.getBloodcenter().getId()) == null){
            return repository.save(newBloodStock);
        }
        throw new RuntimeException("Não é possível adicionar esse estoque, pois o Hemocentro já possui um estoque sanguíneo");
    }

    public void deleteBloodStock(Long id){
        find(id);
        repository.deleteById(id);
    }
}
