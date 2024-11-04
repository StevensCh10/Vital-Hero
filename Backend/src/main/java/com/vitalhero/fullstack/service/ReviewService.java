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

    private final String REVIEW_NOT_REGISTERED = "Review não registrado";
    private final String DONOR_NOT_COMPLETE_REVIEW = "Doador não realizou sua review";
    private final String DONOR_COMPLETE_REVIEW = "Doador já realizou sua review";

    public Review find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFound(REVIEW_NOT_REGISTERED));
    }

    public Review findByDonor(Long donorID){
        return repository.findByDonor(donorID).orElseThrow(() -> new EntityNotFound(DONOR_NOT_COMPLETE_REVIEW));
    }

    public Review addReview(Review newReview){
        Review review = repository.getByDonor(newReview.getDonor().getId());

        if(review != null){
            throw new EntityAlreadyExists(DONOR_COMPLETE_REVIEW);
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