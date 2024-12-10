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
import com.vitalhero.fullstack.model.BloodStock;
import com.vitalhero.fullstack.repository.BloodStockRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class BloodStockService {
    
    public final BloodStockRepository repository;

    @Cacheable(value="bloodstock")
    public BloodStock findBloodStockById(Long id){
        log.info("[findBloodStockById]: Iniciando busca por estoque sanguineo");
        var foundBloodStock = repository.findById(id).orElseThrow(() -> {
            log.warn("[findBloodStockById]: Falha na busca. Estoque sanguineo com id: {} não encontrado no sistema", id);
            return new EntityNotFound(ErrorMessage.BLOODSTOCK_NOT_FOUND.toString());
        });
        log.info("[findBloodStockById]: Busca concluída com sucesso");
        return foundBloodStock;
    }

    @Cacheable(value="bloodstock")
    public BloodStock findBloodStockByBloodcenter(Long bcID){
        log.info("[findBloodStockByBloodcenter]: Iniciando busca por estoque sanguineo pelo hemocentro");
        var foundBloodStock = repository.findBloodStockByBloodcenter(bcID);
        log.info("[findBloodStockByBloodcenter]: Busca por estoque sanguineo pelo hemocentro com id: {} finalizada", bcID);
        return foundBloodStock;
    }

    @Cacheable(value="allBloodstocks")
    public List<BloodStock> findAllBloodStocks(){
        log.info("[findAllBloodStocks]: Iniciando busca por todos os estoque sanguineos");
        var bloodStocks = repository.findAll();
        log.info("[findAllBloodStocks]: Busca por todos os estoques sanguíneos finalizada");
        return bloodStocks;
    }

    @Cacheable(value="bloodstock")
    public BloodStock addBloodStock(BloodStock newBloodStock){
        log.info("[addBloodStock]: Iniciando cadastro do estoque sanguineo");
        if(findBloodStockByBloodcenter(newBloodStock.getBloodcenter().getId()) == null){
            log.info("[addBloodStock]: Cadastro concluído com sucesso");
            return repository.save(newBloodStock);
        }
        log.warn("[addBloodStock]: Falha no cadastro. Estoque sanguíneo do hemocentro com id '{}' já cadastrado", newBloodStock.getBloodcenter().getId());
        throw new EntityAlreadyExists(ErrorMessage.BLOODSTOCK_ALREADY_REGISTERED.toString());
    }

    @Transactional
    @CachePut(value="bloodstock", key="#bloodStockAtt.id")
	public BloodStock updateBloodStock(BloodStock bloodStockAtt) {
        log.info("[updateBloodStock]: Iniciando atualizacao do estoque sanguineo");
		BloodStock currentBloodStock = findBloodStockById(bloodStockAtt.getId());
		
		if(!bloodStockAtt.getBloodcenter().getId().equals(currentBloodStock.getBloodcenter().getId())){
            log.warn("[updateBloodStock]: Falha na atualizaçãp. Não é possível alterar o id: {} do estoque sanguineo", bloodStockAtt.getId());
            throw new CannotBeUpdated(ErrorMessage.ID_CANNOT_CHANGED.toString());
        }

		BeanUtils.copyProperties(bloodStockAtt, currentBloodStock, "id");
		var updatedBloodStock = repository.saveAndFlush(currentBloodStock);
        log.info("[updateBloodStock]: Atualização concluída com sucesso");
        return updatedBloodStock;
	}

    @CacheEvict(value="bloodstock", key="#id")
    public void deleteBloodStock(Long id){
        log.info("[deleteBloodStock]: Iniciando remoção do estoque sanguíneo");
        findBloodStockById(id);
        repository.deleteById(id);
        log.info("[deleteBloodStock]: Remoção concluída com sucesso");
    }
}