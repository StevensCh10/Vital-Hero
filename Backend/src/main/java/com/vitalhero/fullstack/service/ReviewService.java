package com.vitalhero.fullstack.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.Review;
import com.vitalhero.fullstack.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
    
    private final ReviewRepository repository;

    public Review find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFound(String.format("Review com id '%d' não está registrado.", id)));
    }

    public Review findByDonor(Long donorID){
        return repository.findByDonor(donorID).orElseThrow(() -> new EntityNotFound(String.format("Review ainda não foi realizado.")));
    }

    public Review addReview(Review newReview){
        Review review = repository.getByDonor(newReview.getDonor().getId());

        if(review != null){
            throw new EntityAlreadyExists(String.format("Doador com id '%d' já realizou um review.", newReview.getDonor().getId()));
        }
        return repository.save(newReview);
    }

    public Review update(Review reviewAtt){
        Review currentReview = find(reviewAtt.getId());
        BeanUtils.copyProperties(reviewAtt, currentReview, "id");
		return repository.saveAndFlush(currentReview);
    }

    public void deleteReview(Long id){
        find(id);
        repository.deleteById(id);
    }
}