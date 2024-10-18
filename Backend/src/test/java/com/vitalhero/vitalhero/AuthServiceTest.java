package com.vitalhero.vitalhero;

import static org.hamcrest.CoreMatchers.instanceOf;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.hamcrest.CoreMatchers.is;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.anyString;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.vitalhero.fullstack.dto.DonorDTO;
import com.vitalhero.fullstack.dto.ResponseDTO;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.repository.BloodCenterRepository;
import com.vitalhero.fullstack.repository.DoctorRepository;
import com.vitalhero.fullstack.repository.DonorRepository;
import com.vitalhero.fullstack.security.TokenService;
import com.vitalhero.fullstack.service.AuthService;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private DonorRepository donorRepository;
    
    @Mock
    private DoctorRepository doctorRepository;
    
    @Mock
    private BloodCenterRepository bloodcenterRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @Mock
    private TokenService tokenService;
    
    @InjectMocks
    private AuthService service;

    private Donor donor;
    private String token;

    @BeforeEach
    public void setup(){
        donor = new Donor(
            1L, null, "Stevens Wendell Marinho Chaves", "12345678910", "stevensCh10@outlook.com", 24, "Masculino", "Solteiro", 
            "Rua A, 123", "sem", "81987654321", "O+", "$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu", "DONOR"
        );
        token = tokenService.generateToken(donor);
    }

    @Test
    void shouldAuthenticateUsers(){
        when(donorRepository.findByEmail(donor.getEmail())).thenReturn(donor);
        when(passwordEncoder.matches("senhaFornecida", donor.getPassword())).thenReturn(true);
        when(tokenService.generateToken(donor)).thenReturn(token);

        ResponseDTO aunthenticatedUser = service.authenticate(donor.getEmail(), "senhaFornecida");
        ResponseDTO expectedUser = new ResponseDTO(DonorDTO.fromEntity(donor), token);
        
        assertEquals(expectedUser, aunthenticatedUser);
    }

    @Test
    void shouldFail_whenAuthenticateUsersWithUnregisteredEmail(){
        //Email não cadastrado
        when(donorRepository.findByEmail(donor.getEmail())).thenReturn(null);
        when(doctorRepository.findByEmail(donor.getEmail())).thenReturn(null);
        when(bloodcenterRepository.findByEmail(donor.getEmail())).thenReturn(null);

        EntityNotFound e = assertThrows(EntityNotFound.class, () -> {
            service.authenticate(donor.getEmail(), anyString());
        });

        assertThat(e, instanceOf(EntityNotFound.class));
        assertThat(e.getMessage(), is("Email não encontrado"));
    }

    @Test
    void shouldFail_whenAuthenticateUsersWithInvalidPassword(){
        when(donorRepository.findByEmail(donor.getEmail())).thenReturn(donor);
        when(passwordEncoder.matches(anyString(), donor.getPassword())).thenReturn(false); //Sennha inválida

        EntityNotFound e = assertThrows(EntityNotFound.class, () -> {
            service.authenticate(donor.getEmail(), anyString());
        });

        assertThat(e, instanceOf(EntityNotFound.class));
        assertThat(e.getMessage(), is("Senha inválida"));
    }
}
