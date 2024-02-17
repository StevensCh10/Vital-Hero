package com.vitalhero.fullstack.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.vitalhero.fullstack.model.Donations;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Scheduling;

public interface DonationsRepository extends JpaRepository<Donations, Long>{
    
    @Query(
        value = "SELECT * FROM donations WHERE fk_donor = :donorID",
        nativeQuery = true
    )
    List<Donations> allDonationsByDonor(@Param("donorID") Long donorID);

    @Query(
        value = "SELECT * FROM donations WHERE fk_donor = :donorID AND scheduling = schedID",
        nativeQuery = true
    )
    Donations findByDonorAndScheduling(@Param("donorID") Long donorID, @Param("schedID") Long schedID);
}
