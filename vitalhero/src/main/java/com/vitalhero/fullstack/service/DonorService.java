package com.vitalhero.fullstack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.repository.DonorRepository;

@Service
public class DonorService {
    
    @Autowired
    private DonorRepository repository;

}
