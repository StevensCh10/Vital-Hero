package com.vitalhero.fullstack.service;

import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.repository.DoctorRepository;
import com.vitalhero.fullstack.repository.ScreeningRepository;

@Service
public class DoctorService {
    
    private final DoctorRepository doctorRepo;
    private final ScreeningRepository screeningRepo;

    public DoctorService(DoctorRepository doctorRepo, ScreeningRepository screeningRepo){
        this.doctorRepo = doctorRepo;
        this.screeningRepo = screeningRepo;
    }

    public Doctor find(Long doctorID){
        return null;
    }

    public Screening validatedScreening(Long doctorID){
        return null;
    }

}