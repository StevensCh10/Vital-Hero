package com.vitalhero.fullstack.service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.enums.ErrorMessage;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.Review;
import com.vitalhero.fullstack.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {
    
    private final ReviewRepository repository;

    public Review findReviewById(Long id){
        log.info("[findReviewById]: Iniciando busca por review");
        var foundReview = repository.findById(id).orElseThrow(() -> {
            log.warn("[findReviewById]: Falha na busca. Review com ID: {} não encontrado no sistema", id);
            return new EntityNotFound(ErrorMessage.REVIEW_NOT_REGISTERED.toString());
        });
        log.info("[findReviewById]: Busca concluída com sucesso");
        return foundReview;
    }

    public Review findReviewByDonor(Long donorID){
        log.info("[findReviewByDonor]: Iniciando busca por review pelo doador");
        var foundReviewByDonor = repository.findByDonor(donorID).orElseThrow(() -> {
            log.warn("[findReviewByDonor]: Falha na busca. Review do doador com ID: {} não encontrado no sistema", donorID);
            return new EntityNotFound(ErrorMessage.DONOR_NOT_COMPLETE_REVIEW.toString());
        });
        log.info("[findReviewByDonor]: Busca concluída com sucesso");
        return foundReviewByDonor;
    }

    public Review addReview(Review newReview){
        log.info("[addReview]: Iniciando cadastro do review");
        Review review = repository.getByDonor(newReview.getDonor().getId());

        if(review != null){
            log.warn("[addReview]: Falha no cadastro. Review do doador com ID: {} já existe" , newReview.getDonor().getId());
            throw new EntityAlreadyExists(ErrorMessage.DONOR_COMPLETE_REVIEW.toString());
        }
        var addedReview = repository.save(newReview);
        log.info("[addReview]: Cadastro concluído com sucesso");
        return addedReview;
    }

    public Review updateReview(Review reviewAtt){
        log.info("[updateReview]: Iniciando atualizacao do review");
        Review currentReview = findReviewById(reviewAtt.getId());
        BeanUtils.copyProperties(reviewAtt, currentReview, "id");
		var updatedReview = repository.saveAndFlush(currentReview);
        log.info("[updateReview]: Atualização concluída com sucesso");
        return updatedReview;
    }

    public void deleteReview(Long id){
        log.info("[deleteReview]: Iniciando remocao do review");
        findReviewById(id);
        repository.deleteById(id);
        log.info("[deleteReview]: Remoção concluída com sucesso");
    }
}