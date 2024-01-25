package com.vitalhero.fullstack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.repository.DoctorRepository;
import com.vitalhero.fullstack.repository.ScreeningRepository;

@Service
public class DoctorService {
    
    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private ScreeningRepository screeningRepo;

    public Doctor find(Long doctorID){
        return null;
    }

    public Screening validatedScreening(Long doctorID){
        return null;
    }

}