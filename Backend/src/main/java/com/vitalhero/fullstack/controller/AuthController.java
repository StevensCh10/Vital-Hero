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

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final DonorService donorService;
    private final DoctorService doctorService;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequest) {
        ResponseDTO response = authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        return response;
    }

    @PostMapping("/validate-token")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO validateToken(@Valid @RequestBody String token) {
        return authService.validateToken(token);
    }

    @PostMapping("/forgotpassword")
    @ResponseStatus(HttpStatus.OK)
    public void sendForgotPassword(@RequestParam String email){
        userService.findEmailForgotPassword(email);
    }

    @PostMapping(value = "/donor")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseDTO registerDonor(@Valid @RequestBody Donor donor){
        return donorService.register(donor);
    }

    @PostMapping(value = "/doctor")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseDTO registerDoctor(@Valid @RequestBody Doctor doctor){
        return doctorService.register(doctor);
    }
}