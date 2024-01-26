package com.vitalhero.fullstack.service;

import java.util.ArrayList;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.DonationForm;
import com.vitalhero.fullstack.model.Donations;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Review;
import com.vitalhero.fullstack.model.Scheduling;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.repository.DonationFormRepository;
import com.vitalhero.fullstack.repository.DonationsRepository;
import com.vitalhero.fullstack.repository.DonorRepository;
import com.vitalhero.fullstack.repository.ReviewRepository;
import com.vitalhero.fullstack.repository.SchedulingRepository;
import com.vitalhero.fullstack.repository.ScreeningRepository;

@Service
public class DonorService {
    
    private final DonorRepository donorRepo;
    private final SchedulingRepository schedulingRepo;
    private final ScreeningRepository screeningRepo;
    private final DonationsRepository donationsRepo;
    private final ReviewRepository reviewRepo;
    private final DonationFormRepository donationFormRepo;

    public DonorService(DonorRepository donorRepo, SchedulingRepository schedulingRepo, ScreeningRepository screeningRepo,
        DonationsRepository donationsRepo, ReviewRepository reviewRepo, DonationFormRepository donationFormRepo){
        
            this.donorRepo = donorRepo;
            this.schedulingRepo = schedulingRepo;
            this.screeningRepo = screeningRepo;
            this.donationsRepo = donationsRepo;
            this.reviewRepo = reviewRepo;
            this.donationFormRepo = donationFormRepo;
    }

    public Donor find(Long donorID){
        return null;
    }

    public Scheduling scheduled(Long donorID){
        return null;
    }

    public ArrayList<Screening> allScreenings(Long donorID){
        return null;
    }

    public Screening specifcScreening(Long screeningID){
        return null;
    }

    public Donations donations(Long donorID){
        return null;
    }

    public Review review(Long DonorID){
        return null;
    }

    public DonationForm donationForm(Long donorID){
        return null;
    }

}
