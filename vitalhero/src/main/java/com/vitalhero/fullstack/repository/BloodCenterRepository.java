package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vitalhero.fullstack.model.BloodCenter;

public interface BloodCenterRepository extends JpaRepository<BloodCenter, Long>{
    
}