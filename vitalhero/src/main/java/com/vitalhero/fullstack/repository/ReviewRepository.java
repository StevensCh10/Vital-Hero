package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vitalhero.fullstack.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{
    
}
