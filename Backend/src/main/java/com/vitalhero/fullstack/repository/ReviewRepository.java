package com.vitalhero.fullstack.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.vitalhero.fullstack.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{
    
    @Query(
        value = "SELECT * FROM review WHERE fk_donor = :donorID" + "",
        nativeQuery = true
    )
    Review getByDonor(@Param("donorID") Long donorID);

    @Query(
        value = "SELECT * FROM review WHERE fk_donor = :donorID" + "",
        nativeQuery = true
    )
    Optional<Review> findByDonor(@Param("donorID") Long donorID);
}
