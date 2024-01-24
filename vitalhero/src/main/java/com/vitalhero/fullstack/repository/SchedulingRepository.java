package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vitalhero.fullstack.model.Scheduling;

public interface SchedulingRepository extends JpaRepository<Scheduling, Long>{
    
}