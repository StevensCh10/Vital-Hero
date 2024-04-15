package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.vitalhero.fullstack.model.DonationForm;

public interface DonationFormRepository extends JpaRepository<DonationForm, Long>{
    
    @Query(
        value = "SELECT * FROM donation_form WHERE fk_donor = :donorID",
        nativeQuery = true
    )
    DonationForm findByDonor(@Param("donorID") Long donorID);
}
