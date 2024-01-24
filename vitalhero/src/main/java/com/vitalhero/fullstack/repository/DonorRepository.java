package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vitalhero.fullstack.model.Donor;

public interface DonorRepository extends JpaRepository<Donor, Long>{
    
}
