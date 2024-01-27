package com.vitalhero.fullstack.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vitalhero.fullstack.model.Donations;

public interface DonationsRepository extends JpaRepository<Donations, Long>{
    
    @Query(
        value = "SELECT * FROM donations WHERE fk_donor = :idDonor"
    )
    public ArrayList<Donations> allDonations(@Param("idDonor") Long idDonor);
}
