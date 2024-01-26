package com.vitalhero.fullstack.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.vitalhero.fullstack.service.DonorService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/donor")
public class DonorController {
    
    private final DonorService service;

    public DonorController(DonorService service){
        this.service = service;
    }
}
