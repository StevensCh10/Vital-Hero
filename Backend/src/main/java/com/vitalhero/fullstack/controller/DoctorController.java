package com.vitalhero.fullstack.controller;

import java.util.List;
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
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.service.DoctorService;
import com.vitalhero.fullstack.service.ScreeningService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/doctor")
@RequiredArgsConstructor
@Slf4j
public class DoctorController {

    private final DoctorService doctorService;
    private final ScreeningService screeningService;

    @PutMapping()
    public DoctorDTO updateDoctor(@Valid @RequestBody Doctor doctorAtt){
        log.info("Iniciando requisicao de atualizacao do medico/enfermeiro");
        var updatedDoctor = doctorService.updateDoctor(doctorAtt);
        log.info("Finalizando requisicao de atualizacao do medico/enfermeiro");
        return updatedDoctor;
    }

    @GetMapping("/{docID}")
    public DoctorDTO getDoctor(@Valid @PathVariable Long docID){
        log.info("Iniciando requisicao de busca por medico/enfermeiro via ID");
        var foundDoctor = doctorService.getDoctorDTOById(docID);
        log.info("Finalizando requisicao de busca por medico/enfermeiro via ID");
        return foundDoctor;
    }

    @DeleteMapping("/{docID}")
    public void deleteDoctor(@Valid @PathVariable Long docID){
        log.info("Iniciando requisicao remocao do medico/enfermeiro");
        doctorService.deleteDoctor(docID);
        log.info("Finalizando requisicao remocao do medico/enfermeiro");
    }

    //SCREENING
    @GetMapping("/screenings/all")
    public List<Screening> allScreenings(){
        log.info("Iniciando requisicao de busca por todas as trgiagens");
        var allScreenings = screeningService.allScreenings();
        log.info("Finalizando requisicao de busca pelas triagens disponiveis para validacao");
        return allScreenings;
    }

    @PutMapping("/validatescreening/{screeningID}/{docID}")
    @ResponseStatus(HttpStatus.OK)
    public void validateScreening(@Valid @PathVariable Long screeningID, @Valid @PathVariable Long docID){
        log.info("Iniciando requisicao de validacao da triagem");
        screeningService.validatedScreening(screeningID, docID);
        log.info("Finalizando requisicao de validacao da triagem");
    }
}
