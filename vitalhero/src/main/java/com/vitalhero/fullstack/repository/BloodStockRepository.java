package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vitalhero.fullstack.model.BloodStock;

public interface BloodStockRepository extends JpaRepository<BloodStock, Long>{
    
}
