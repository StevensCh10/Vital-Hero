package com.vitalhero.fullstack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.repository.BloodCenterRepository;

@Service
public class BloodCenterService {
    
    @Autowired
    private BloodCenterRepository repository;

}
