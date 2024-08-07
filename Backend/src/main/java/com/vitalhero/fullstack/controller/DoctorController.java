package com.vitalhero.fullstack.controller;

import java.util.List;
import java.nio.file.Files;
import java.io.File;
import java.io.IOException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.vitalhero.fullstack.dto.DoctorDTO;
import com.vitalhero.fullstack.dto.DonorDTO;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.service.DoctorService;
import com.vitalhero.fullstack.service.DonorService;
import com.vitalhero.fullstack.service.ScreeningService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/doctor")
@RequiredArgsConstructor
public class DoctorController {

    private final String pathImgs = "C:/Users/steve/OneDrive/Documentos/TCC_Stevens_2024.1/imgProfile/";
    private final DoctorService doctorService;
    private final ScreeningService screeningService;
    private final DonorService donorService;

    @PutMapping()
    public DoctorDTO updateDoctor(@Valid @RequestBody Doctor doctorAtt){
        return doctorService.update(doctorAtt);
    }

    @GetMapping("/{docID}")
    public DoctorDTO getDoctor(@Valid @PathVariable Long docID){
        return doctorService.getDoctor(docID);
    }

    @SuppressWarnings("null")
    @GetMapping("/img/{nameImg}")
    public byte[] getImgProfile(@Valid @PathVariable("nameImg") String nameImg) throws IOException{
        File fileImg = new File(pathImgs + nameImg);
        if(nameImg != null || nameImg.trim().length() > 0){
            return Files.readAllBytes(fileImg.toPath());
        }
        return null;
    }

    @DeleteMapping("/{docID}")
    public void deleteDoctor(@Valid @PathVariable Long docID){
        doctorService.deleteDoctor(docID);
    }

    //SCREENING
    @GetMapping("/screenings/all")
    public List<Screening> allScreenings(){
        return screeningService.allScreenings();
    }

    @PutMapping("/validatescreening/{screeningID}/{docID}")
    @ResponseStatus(HttpStatus.OK)
    public void validateScreening(@Valid @PathVariable Long screeningID, @Valid @PathVariable Long docID){
        screeningService.validatedScreening(screeningID, docID);
    }

    //DOCTOR
    @GetMapping("/donorscreenings/all")
    public List<DonorDTO> allDonorScreenings(){
        return donorService.allDonorScreenings();
    }
}
