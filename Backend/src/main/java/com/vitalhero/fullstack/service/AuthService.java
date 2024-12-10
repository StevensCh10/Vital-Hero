package com.vitalhero.fullstack.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.dto.BloodcenterDTO;
import com.vitalhero.fullstack.dto.DoctorDTO;
import com.vitalhero.fullstack.dto.DonorDTO;
import com.vitalhero.fullstack.dto.ResponseDTO;
import com.vitalhero.fullstack.enums.ErrorMessage;
import com.vitalhero.fullstack.exception.EmailNotFound;
import com.vitalhero.fullstack.exception.InvalidPassword;
import com.vitalhero.fullstack.intrerfaces.User;
import com.vitalhero.fullstack.intrerfaces.UserDTO;
import com.vitalhero.fullstack.model.Bloodcenter;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.repository.BloodcenterRepository;
import com.vitalhero.fullstack.repository.DoctorRepository;
import com.vitalhero.fullstack.repository.DonorRepository;
import com.vitalhero.fullstack.security.TokenService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final DonorRepository donorRepository;
    private final DoctorRepository doctorRepository;
    private final BloodcenterRepository bloodcenterRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public ResponseDTO authenticate(String email, String password) {
        log.info("[authenticate]: Autenticação iniciada para usuário");
        User[] users = {donorRepository.findByEmail(email), doctorRepository.findByEmail(email), bloodcenterRepository.findByEmail(email)};
        for (User user : users) {
            if (user != null) {
                log.info("[authenticate]: Usuário autenticado com sucesso");
                return invalidPassword(password, user);
            }
        }
        log.warn("[authenticate]: Tentativa de autenticação falhou. Email '{}' não encontrado", email);
        throw new EmailNotFound(ErrorMessage.EMAIL_NOT_FOUND.toString());
    }

    public UserDTO findUserByEmail(String email){
        log.info("[findUserByEmail]: Busca de usuário pelo email iniciada");
        User [] users = {donorRepository.findByEmail(email), doctorRepository.findByEmail(email), bloodcenterRepository.findByEmail(email)};
        for(User user : users){
            if(user != null){
                log.info("[findUserByEmail]: Usuário encontrado com sucesso");
                return createDTO(user);
            }    
        }
        log.warn("[findUserByEmail]: Tentativa de busca falhou. Email '{}' não encontrado", email);
        return null;
    }

    private ResponseDTO invalidPassword(String password, User user){
        log.info("[invalidPassword]: Verificação de senha iniciada");
        if(passwordEncoder.matches(password, user.getPassword())){
            String token = this.tokenService.generateToken(user);
            UserDTO dto = createDTO(user);
            log.info("[invalidPassword]: Verificação concluída com sucesso. Senha válida");
            return new ResponseDTO(dto, token);
        }else{
            log.warn("[invalidPassword]: Falha na verificação. Senha inválida");
            throw new InvalidPassword(ErrorMessage.INVALID_PASSWORD.toString());
        }
    }

    private UserDTO createDTO(User user) {
        log.info("[createDTO]: Criação de dto iniciada");
        var dto = switch (user) {
            case Donor donor -> DonorDTO.fromEntity(donor);
            case Doctor doctor -> DoctorDTO.fromEntity(doctor);
            case Bloodcenter bloodCenter -> BloodcenterDTO.fromEntity(bloodCenter);
            default -> {
                log.warn("[createDTO]: Tentativa de criar dto falhou. "+ErrorMessage.UNKNOWN_USER);
                throw new IllegalArgumentException(ErrorMessage.UNKNOWN_USER.toString());
            }
        };
        log.info("[createDTO]: Dto criado com sucesso");
        return dto;
    }

    public ResponseDTO validateToken(String token){
        log.info("[validateToken]: Validação de token iniciada");
        String email = tokenService.validateToken(token);
        if (email != null) {
            UserDTO user = findUserByEmail(email);
            log.info("[validateToken]: Token validado com sucesso");
            return new ResponseDTO(user, token);
        } else {
            log.warn("[validateToken]: Falha na autenticação de token. Token '{}' inválido", token);
            return null;
        }
    }
}