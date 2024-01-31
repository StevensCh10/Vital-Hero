package com.vitalhero.fullstack.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.vitalhero.fullstack.model.Donations;

public interface DonationsRepository extends JpaRepository<Donations, Long>{
    
    @Query(
        value = "SELECT * FROM donations WHERE fk_donor = :donorID",
        nativeQuery = true
    )
    List<Donations> allDonations(@Param("donorID") Long donorID);
}
