package com.vitalhero.vitalhero.serviceTest;

import static org.hamcrest.CoreMatchers.instanceOf;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.vitalhero.fullstack.dto.DonorDTO;
import com.vitalhero.fullstack.dto.ResponseDTO;
import com.vitalhero.fullstack.exception.EmailNotFound;
import com.vitalhero.fullstack.exception.InvalidPassword;
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
        donor = Donor.builder()
            .id(1L)
            .scheduling(null)
            .name("Stevens Wendell Marinho Chaves")
            .cpf("12345678910")
            .email("stevensCh10@outlook.com")
            .age(24)
            .gender("Masculino")
            .maritalStatus("Solteiro")
            .address(null)
            .phone("81987654321")
            .password("$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu")
            .bloodType("O+")
            .role("DONOR")
            .build();
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

        EmailNotFound e = assertThrows(EmailNotFound.class, () -> {
            service.authenticate(donor.getEmail(), anyString());
        });

        assertThat(e, instanceOf(EmailNotFound.class));
        assertThat(e.getMessage(), is("Email não encontrado"));
    }

    @Test
    void shouldFail_whenAuthenticateUsersWithInvalidPassword(){
        when(donorRepository.findByEmail(donor.getEmail())).thenReturn(donor);
        when(passwordEncoder.matches(anyString(), eq(donor.getPassword()))).thenReturn(false); //Sennha inválida

        InvalidPassword e = assertThrows(InvalidPassword.class, () -> {
            service.authenticate(donor.getEmail(), anyString());
        });

        assertThat(e, instanceOf(InvalidPassword.class));
        assertThat(e.getMessage(), is("Senha inválida"));
    }
}
