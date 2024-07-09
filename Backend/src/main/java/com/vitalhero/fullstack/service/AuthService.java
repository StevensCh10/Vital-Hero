package com.vitalhero.fullstack.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.vitalhero.fullstack.dto.ResponseDTO;
import com.vitalhero.fullstack.exception.EntityNotFoundInTheAppeal;
import com.vitalhero.fullstack.intrerfaces.User;
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

    public ResponseDTO authenticate(String email, String password) {
        Donor donor = donorRepository.findByEmail(email);
        if (donor != null) {
            return invalidPassword(password, donor);
        }

        Doctor doctor = doctorRepository.findByEmail(email);
        if (doctor != null) {
            return invalidPassword(password, doctor);
        }

        BloodCenter bloodcenter = bloodcenterRepository.findByEmail(email);
        if (bloodcenter != null) {
            return invalidPassword(password, bloodcenter);
        }

        throw new EntityNotFoundInTheAppeal("Email não encontrado");
    }

    public User findByEmail(String email){
        Donor donor = donorRepository.findByEmail(email);
        if(donor != null){
            return donor;
        }
        Doctor doctor = doctorRepository.findByEmail(email);
        if(doctor != null){
            return doctor;
        }
        BloodCenter bloodcenter = bloodcenterRepository.findByEmail(email);
        if(bloodcenter != null){
            return bloodcenter;
        }

        return null;
    }

    private ResponseDTO invalidPassword(String password, User user){
        if(passwordEncoder.matches(password, user.getPassword())){
            String token = this.tokenService.generateToken(user);
            return new ResponseDTO(user, token);
        }else{
            throw new EntityNotFoundInTheAppeal("Senha inválida");
        }
    }
}