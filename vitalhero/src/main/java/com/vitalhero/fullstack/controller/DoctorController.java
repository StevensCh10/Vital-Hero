package com.vitalhero.fullstack.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.service.DoctorService;
import com.vitalhero.fullstack.service.ScreeningService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/doctor")
public class DoctorController {

    private final DoctorService doctorService;
    private final ScreeningService screeningService;

    public DoctorController(DoctorService doctorService, ScreeningService screeningService){
        this.doctorService = doctorService;
        this.screeningService = screeningService;
    }
    
    @PostMapping()
    public Doctor addDoctor(@RequestBody Doctor newDoctor){
        return doctorService.register(newDoctor);
    }

    @GetMapping("/{docID}")
    public Doctor find(@PathVariable Long docID){
        return doctorService.find(docID);
    }

    @DeleteMapping("/{docID}")
    public void deleteDoctor(@PathVariable Long docID){
        doctorService.deleteDoctor(docID);
    }

    @PutMapping("/validatescreening/{docID}")
    public Screening validateScreening(@PathVariable Long screeningID, @PathVariable Long docID){
        return screeningService.validatedScreening(docID);
    }
}
