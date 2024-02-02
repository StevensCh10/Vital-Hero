package com.vitalhero.fullstack.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Review;
import com.vitalhero.fullstack.service.DonorService;
import jakarta.validation.Valid;

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

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Donor registerDonor(@RequestBody @Valid Donor donor){
        return donorService.register(donor);
    }

    /*@GetMapping("/review/{donorID}")
    public Review getReview(@PathVariable Long donorID){
        return donorService.getReview(donorID);
    }*/

    @GetMapping("/{donorID}")
    public Donor find(@PathVariable Long donorID){
        return donorService.find(donorID);
    }
}
