package com.vitalhero.fullstack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.repository.DoctorRepository;

@Service
public class DoctorService {
    
    @Autowired
    private DoctorRepository repository;

}