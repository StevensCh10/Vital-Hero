package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.vitalhero.fullstack.model.DonationForm;

public interface DonationFormRepository extends JpaRepository<DonationForm, Long>{
    
    public DonationForm getByDonor_id(@Param("idDonor") Long idDonor);
}
