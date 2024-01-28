package com.vitalhero.fullstack.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.service.DonorService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/donor")
public class DonorController {
    
    private final DonorService donorService;

    public DonorController(DonorService donorService){
        this.donorService = donorService;
    }

    @GetMapping("/{email}/{password}")
    public Donor getUser(@PathVariable String email, @PathVariable String password){
        return donorService.checkLogin(email, password);
    }
}
