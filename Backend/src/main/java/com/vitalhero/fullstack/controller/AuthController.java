package com.vitalhero.fullstack.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.vitalhero.fullstack.dto.ResponseDTO;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.LoginRequest;
import com.vitalhero.fullstack.security.TokenService;
import com.vitalhero.fullstack.service.AuthService;
import com.vitalhero.fullstack.service.DoctorService;
import com.vitalhero.fullstack.service.DonorService;
import com.vitalhero.fullstack.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final String pathImgs = "C:/Users/steve/OneDrive/Documentos/TCC_Stevens_2024.1/imgProfile/";
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;
    private final UserService userService;
    private final TokenService tokenService;
    private final DonorService donorService;
    private final DoctorService doctorService;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO authenticateUser(@RequestBody LoginRequest loginRequest) {
        ResponseDTO response = authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        return response;
    }

    @PostMapping("/validate")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO validateToken(@RequestBody String token) {
        String email = tokenService.validateToken(token);
        if (email != null) {
            var user = authService.findByEmail(email);
            return new ResponseDTO(user, token);
        } else {
            return null;
        }
    }

    @PostMapping("/forgotpassword")
    @ResponseStatus(HttpStatus.OK)
    public void sendForgotPassword(@RequestParam String email){
        userService.findEmailForgotPassword(email);
    }

    @PostMapping(value = "/donor",consumes = { "multipart/form-data" })
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseDTO registerDonor(
        @RequestParam("name") String name,
        @RequestParam("cpf") String cpf,
        @RequestParam("email") String email,
        @RequestParam("age") int age,
        @RequestParam("gender") String gender,
        @RequestParam("maritalStatus") String maritalStatus,
        @RequestParam("address") String address,
        @RequestParam("phone") String phone,
        @RequestParam("photo") String photo,
        @RequestParam("password") String password,
        @RequestParam("bloodType") String bloodType,
        @RequestParam(value = "file", required = false) MultipartFile file){

            Donor newDonor = new Donor(name, cpf, email, age, gender, maritalStatus, address, photo, phone, passwordEncoder.encode(password), bloodType);
            Donor flushDonor = donorService.register(newDonor);
            try{
                if(!file.isEmpty()){
                    byte[] bytes = file.getBytes();
                    Path path = Paths.get(pathImgs+String.valueOf(flushDonor.getId())+file.getOriginalFilename());
                    Files.write(path, bytes);

                    flushDonor.setPhoto(String.valueOf(flushDonor.getId())+file.getOriginalFilename());
                }else{
                    flushDonor.setPhoto("sem");
                }
            }catch(IOException e){
                e.printStackTrace();
            }
            newDonor = donorService.update(flushDonor);
            String token = this.tokenService.generateToken(newDonor);
            return new ResponseDTO(newDonor, token);
    }

    @PostMapping(value = "/doctor", consumes = { "multipart/form-data" })
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseDTO registerDoctor(
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
            Doctor newDoctor = new Doctor(name, cpf, crm, email, age, gender, maritalStatus, address, photo, phone, passwordEncoder.encode(password));
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
            newDoctor = doctorService.update(flushDoctor);
            String token = this.tokenService.generateToken(newDoctor);
            return new ResponseDTO(newDoctor, token);
    }
}