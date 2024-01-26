package com.vitalhero.fullstack.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.vitalhero.fullstack.service.DoctorService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/doctor")
public class DoctorController {

    private final DoctorService service;

    public DoctorController(DoctorService service){
        this.service = service;
    }
    
}
