package com.vitalhero.fullstack.controller;

import java.util.List;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.io.IOException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.service.DoctorService;
import com.vitalhero.fullstack.service.DonorService;
import com.vitalhero.fullstack.service.ScreeningService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/doctor")
public class DoctorController {

    private final DoctorService doctorService;
    private final ScreeningService screeningService;
    private final DonorService donorService;

    private final String pathImgs = "C:/Users/steve/OneDrive/Documentos/TCC_Stevens_2024.1/imgProfile/";

    public DoctorController(DoctorService doctorService, ScreeningService screeningService,
        DonorService donorService){
            this.doctorService = doctorService;
            this.screeningService = screeningService;
            this.donorService = donorService;
    }
    
    @PostMapping(consumes = { "multipart/form-data" })
    @ResponseStatus(HttpStatus.CREATED)
    public Doctor registerDoctor(
        @RequestParam("name") String name,
        @RequestParam("cpf") String cpf,
        @RequestParam("crm") String crm,
        @RequestParam("email") String email,
        @RequestParam("age") int age,
        @RequestParam("gender") String gender,
        @RequestParam("maritalStatus") String maritalStatus,
        @RequestParam("address") String address,
        @RequestParam("phone") String phone,
        @RequestParam("photo") String photo,
        @RequestParam("password") String password,
        @RequestParam(value = "file", required = false) MultipartFile file){
            Doctor newDoctor = new Doctor(name, cpf, crm, email, age, gender, maritalStatus, address, photo, phone, password);
            Doctor flushDoctor = doctorService.register(newDoctor);
            try{
                if(!file.isEmpty()){
                    byte[] bytes = file.getBytes();
                    Path path = Paths.get(pathImgs+String.valueOf(flushDoctor.getId())+file.getOriginalFilename());
                    Files.write(path, bytes);

                    flushDoctor.setPhoto(String.valueOf(flushDoctor.getId())+file.getOriginalFilename());
                }else{
                    flushDoctor.setPhoto("sem");
                }
            }catch(IOException e){
                e.printStackTrace();
            }
            return doctorService.update(flushDoctor);
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
