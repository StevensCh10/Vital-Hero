package com.vitalhero.fullstack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.vitalhero.fullstack.intrerfaces.User;
import com.vitalhero.fullstack.model.LoginRequest;
import com.vitalhero.fullstack.service.AuthService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public User authenticateUser(@RequestBody LoginRequest loginRequest) {
        User authenticatedUser = authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        return authenticatedUser;
    }
}
