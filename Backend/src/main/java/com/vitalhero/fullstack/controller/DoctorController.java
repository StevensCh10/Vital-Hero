package com.vitalhero.fullstack.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.service.DoctorService;
import com.vitalhero.fullstack.service.DonorService;
import com.vitalhero.fullstack.service.ScreeningService;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/doctor")
public class DoctorController {

    private final DoctorService doctorService;
    private final ScreeningService screeningService;
    private final DonorService donorService;

    public DoctorController(DoctorService doctorService, ScreeningService screeningService,
        DonorService donorService){
            this.doctorService = doctorService;
            this.screeningService = screeningService;
            this.donorService = donorService;
    }
    
    @PostMapping()
    public Doctor addDoctor(@RequestBody @Valid Doctor newDoctor){
        return doctorService.register(newDoctor);
    }

    @PutMapping()
    public Doctor updateDoctor(@RequestBody Doctor doctorAtt){
        return doctorService.update(doctorAtt);
    }

    @GetMapping("/{docID}")
    public Doctor find(@PathVariable Long docID){
        return doctorService.find(docID);
    }

    @DeleteMapping("/{docID}")
    public void deleteDoctor(@PathVariable Long docID){
        doctorService.deleteDoctor(docID);
    }

    //SCREENING
    @GetMapping("/screenings/all")
    public List<Screening> allScreenings(){
        return screeningService.allScreenings();
    }

    @PutMapping("/validatescreening/{screeningID}/{docID}")
    @ResponseStatus(HttpStatus.OK)
    public void validateScreening(@PathVariable Long screeningID, @PathVariable Long docID){
        screeningService.validatedScreening(screeningID, docID);
    }

    //DOCTOR
    @GetMapping("/donorscreenings/all")
    public List<Donor> allDonorScreenings(){
        return donorService.allDonorScreenings();
    }
}
