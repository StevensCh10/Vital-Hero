package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.vitalhero.fullstack.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{
    
    public Review getByDonor_id(@Param("idDonor") Long idDonor); //Não sei se funciona como eu espero (sem ter que fazer uma query)
}
