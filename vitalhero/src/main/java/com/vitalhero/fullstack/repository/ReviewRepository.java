package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.vitalhero.fullstack.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{
    
    @Query(
        value = "SELECT * FROM review WHERE fk_donor = :donorID",
        nativeQuery = true
    )
    Review findByDonor(@Param("donorID") Long donorID);
}
