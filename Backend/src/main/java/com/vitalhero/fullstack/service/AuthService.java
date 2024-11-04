package com.vitalhero.fullstack.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.dto.BloodCenterDTO;
import com.vitalhero.fullstack.dto.DoctorDTO;
import com.vitalhero.fullstack.dto.DonorDTO;
import com.vitalhero.fullstack.dto.ResponseDTO;
import com.vitalhero.fullstack.exception.EmailNotFound;
import com.vitalhero.fullstack.exception.InvalidPassword;
import com.vitalhero.fullstack.intrerfaces.User;
import com.vitalhero.fullstack.intrerfaces.UserDTO;
import com.vitalhero.fullstack.model.BloodCenter;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.repository.BloodCenterRepository;
import com.vitalhero.fullstack.repository.DoctorRepository;
import com.vitalhero.fullstack.repository.DonorRepository;
import com.vitalhero.fullstack.security.TokenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final DonorRepository donorRepository;
    private final DoctorRepository doctorRepository;
    private final BloodCenterRepository bloodcenterRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    private final String INVALID_PASSWORD = "Senha inválida";
    private final String EMAIL_NOT_FOUND = "Email não encontrado";
    private final String UNKNOWN_USER = "Usuário não conhecido";

    public ResponseDTO authenticate(String email, String password) {
        User[] users = {donorRepository.findByEmail(email), doctorRepository.findByEmail(email), bloodcenterRepository.findByEmail(email)};
        for (User user : users) {
            if (user != null) {
                return invalidPassword(password, user);
            }
        }
        throw new EmailNotFound(EMAIL_NOT_FOUND);
    }

    public UserDTO findUserByEmail(String email){
        User [] users = {donorRepository.findByEmail(email), doctorRepository.findByEmail(email), bloodcenterRepository.findByEmail(email)};
        for(User user : users){
            if(user != null) return createDTO(user);
        }
        return null;
    }

    private ResponseDTO invalidPassword(String password, User user){
        if(passwordEncoder.matches(password, user.getPassword())){
            String token = this.tokenService.generateToken(user);
            UserDTO dto = createDTO(user);
            return new ResponseDTO(dto, token);
        }else{
            throw new InvalidPassword(INVALID_PASSWORD);
        }
    }

    private UserDTO createDTO(User user) {
        return switch (user) {
            case Donor donor -> DonorDTO.fromEntity(donor);
            case Doctor doctor -> DoctorDTO.fromEntity(doctor);
            case BloodCenter bloodCenter -> BloodCenterDTO.fromEntity(bloodCenter);
            default -> throw new IllegalArgumentException(UNKNOWN_USER);
        };
    }

    public ResponseDTO validateToken(String token){
        String email = tokenService.validateToken(token);
        if (email != null) {
            UserDTO user = findUserByEmail(email);
            return new ResponseDTO(user, token);
        } else {
            return null;
        }
    }
}