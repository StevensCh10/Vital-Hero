package com.vitalhero.fullstack.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.vitalhero.fullstack.model.Donation;

public interface DonationRepository extends JpaRepository<Donation, Long>{
    
    @Query(
        value = "SELECT * FROM donation WHERE fk_donor = :donorID" + "",
        nativeQuery = true
    )
    List<Donation> allDonationsByDonor(@Param("donorID") Long donorID);

    @Query(
        value = "SELECT * FROM donation WHERE fk_donor = :donorID AND fk_scheduling = :schedID" + "",
        nativeQuery = true
    )
    Donation findByDonorAndScheduling(@Param("donorID") Long donorID, @Param("schedID") Long schedID);
}
