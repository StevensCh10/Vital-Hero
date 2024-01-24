package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vitalhero.fullstack.model.Donations;

public interface DonationsRepository extends JpaRepository<Donations, Long>{
    
}
