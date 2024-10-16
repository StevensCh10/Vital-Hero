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

        throw new EmailNotFound("Email não encontrado");
    }

    public UserDTO findByEmail(String email){
        Donor donor = donorRepository.findByEmail(email);
        if(donor != null){
            return DonorDTO.fromEntity(donor);
        }
        Doctor doctor = doctorRepository.findByEmail(email);
        if(doctor != null){
            return DoctorDTO.fromEntity(doctor);
        }
        BloodCenter bloodcenter = bloodcenterRepository.findByEmail(email);
        if(bloodcenter != null){
            return BloodCenterDTO.fromEntity(bloodcenter);
        }

        return null;
    }

    private ResponseDTO invalidPassword(String password, User user){
        if(passwordEncoder.matches(password, user.getPassword())){
            String token = this.tokenService.generateToken(user);
            UserDTO dto;

            if(user instanceof Donor donor) dto = DonorDTO.fromEntity(donor);
            else if(user instanceof Doctor doctor) dto = DoctorDTO.fromEntity(doctor);
            else dto = BloodCenterDTO.fromEntity((BloodCenter)user);
            
            return new ResponseDTO(dto, token);
        }else{
            throw new InvalidPassword("Senha inválida");
        }
    }
}