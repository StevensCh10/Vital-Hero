package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vitalhero.fullstack.model.Screening;

public interface ScreeningRepository extends JpaRepository<Screening, Long>{
    
}
