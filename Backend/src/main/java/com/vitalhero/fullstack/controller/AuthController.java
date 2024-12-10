package com.vitalhero.fullstack.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.vitalhero.fullstack.dto.LoginRequestDTO;
import com.vitalhero.fullstack.dto.ResponseDTO;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.service.AuthService;
import com.vitalhero.fullstack.service.DoctorService;
import com.vitalhero.fullstack.service.DonorService;
import com.vitalhero.fullstack.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final DonorService donorService;
    private final DoctorService doctorService;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequest) {
        log.info("Iniciando requisicao de autenticacao do usuario");
        ResponseDTO response = authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        log.info("Finalizando requisicao de autenticacao do usuario");
        return response;
    }

    @PostMapping("/validate-token")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO validateToken(@Valid @RequestBody String token) {
        log.info("Iniciando requisicao de validacao de token");
        ResponseDTO response = authService.validateToken(token);
        log.info("Finalizando requisicao de validacao de token");
        return response;
    }

    @PostMapping("/forgotpassword")
    @ResponseStatus(HttpStatus.OK)
    public void sendForgotPassword(@RequestParam String email){
        log.info("Iniciando requisicao de recuperacao de senha via email");
        userService.findEmailForgotPassword(email);
        log.info("Finalizando requisicao de recuperacao de senha via email");
    }

    @PostMapping(value = "/donor")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseDTO addDonor(@Valid @RequestBody Donor donor){
        log.info("Iniciando requisicao de cadastro de doador");
        ResponseDTO response = donorService.addDonor(donor);
        log.info("Finalizando requisicao de cadastrado do doador");
        return response;
    }

    @PostMapping(value = "/doctor")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseDTO addDoctor(@Valid @RequestBody Doctor doctor){
        log.info("Iniciando requisicao de cadastro de medico/enfermeiro");
        ResponseDTO response = doctorService.addDoctor(doctor);
        log.info("Finalizando requisicao de cadastrado do medico/enfermeiro");
        return response;
    }
}