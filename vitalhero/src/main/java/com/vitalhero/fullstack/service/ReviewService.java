package com.vitalhero.fullstack.service;

import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.model.Review;
import com.vitalhero.fullstack.repository.ReviewRepository;

@Service
public class ReviewService {
    
    private ReviewRepository repository;

    public ReviewService(ReviewRepository repository){
        this.repository = repository;
    }

    public Review findByDonor(Long donorID){
        return repository.findByDonor(donorID).orElseThrow(() -> new RuntimeException("Você ainda não realizou seu review!"));
    }

    public Review addReview(Review newReview){
        Review review = findByDonor(newReview.getDonor().getId());

        if(review != null){
            throw new RuntimeException("Você já fez um review :) ");
        }
        return review;
    }

    public void deleteReview(Long id){
        repository.findById(id).orElseThrow(() -> new RuntimeException("Review não encontrado"));
        repository.deleteById(id);
    }
}
