package com.vitalhero.vitalhero;

import java.util.Optional;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.instanceOf;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.vitalhero.fullstack.dto.DonorDTO;
import com.vitalhero.fullstack.dto.ResponseDTO;
import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.repository.DonorRepository;
import com.vitalhero.fullstack.security.TokenService;
import com.vitalhero.fullstack.service.AuthService;
import com.vitalhero.fullstack.service.DonorService;

@ExtendWith(MockitoExtension.class)
public class DonorServiceTest {

	@Mock
	private DonorRepository repository;

    @Mock
    PasswordEncoder passwordEncoder;

    @Mock
    TokenService tokenService;

    @InjectMocks
    private DonorService service;

    @InjectMocks
    private AuthService authService;

    @Test
    void shouldInsertDonor(){
        String email = "jose@hotmail.com";
        String encodedPassword = "$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu";

        Donor donor = new Donor(
            "José Carlos da Silva", "11508638585", email, 30, "Masculino", "Solteiro", 
            "Rua mauricio de nassau, 20", "sem", "81987654456", encodedPassword, "A+"
        );

        when(repository.save(donor)).thenReturn(donor);
        service.register(donor);

        when(repository.findByEmail(email)).thenReturn(donor);
        when(passwordEncoder.matches(anyString(), eq(encodedPassword))).thenReturn(true);
        ResponseDTO loggedin = authService.authenticate(email, "1234");

        assertEquals(DonorDTO.fromEntity(donor), (DonorDTO) loggedin.user());
    }

    @Test
    void shouldFail_whenDonorsCpfIsRegistered(){
        String cpf = "123.456.789-10";
        Donor donor = new Donor(
            "Stevens Wendell Marinho Chaves", cpf, "stevens@outlook.com", 24, "Masculino", "Solteiro", 
            "Rua A, 123", "sem", "81987654321", "$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu", "O+"
        );

        when(repository.findByCpf(cpf)).thenReturn(donor);

        EntityAlreadyExists exceptionCpfAlreadyRegister = assertThrows(EntityAlreadyExists.class, () -> {
            service.register(donor);
        });

        assertThat(exceptionCpfAlreadyRegister, instanceOf(EntityAlreadyExists.class));
        assertThat(exceptionCpfAlreadyRegister.getMessage(), is("Cpf '123.456.789-10' já cadastrado."));
    }

    @Test
    void shouldFail_whenDonorsEmailIsRegistered(){
        String email = "stevensch10@outlook.com";
        Donor donor = new Donor(
            "Stevens Wendell Marinho Chaves", "123.456.789-11", email, 24, "Masculino", "Solteiro", 
            "Rua A, 123", "sem", "81987654321", "$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu", "O+"
        );

        when(repository.findByEmail(email)).thenReturn(donor);

        EntityAlreadyExists exceptionEmailAlreadyRegister = assertThrows(EntityAlreadyExists.class, () -> {
            service.register(donor);
        });

        assertThat(exceptionEmailAlreadyRegister, instanceOf(EntityAlreadyExists.class));
        assertThat(exceptionEmailAlreadyRegister.getMessage(), is("Email 'stevensch10@outlook.com' já cadastrado."));
    }

    @Test
    void shouldFail_whenToChangeDonorsCpf(){
        Donor currentDonor = new Donor(
            "Stevens Wendell Marinho Chaves", "12345678910", "stevens@outlook.com", 24, "Masculino", "Solteiro", 
            "Rua A, 123", "sem", "81987654321", "$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu", "O+"
        );
        
        Donor donorAtt = new Donor(
            "Stevens Wendell Marinho Chaves", "75315986203", "stevens@outlook.com", 24, "Masculino", "Solteiro", 
            "Rua A, 123", "sem", "81987654321", "$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu", "O+"
        );

        when(repository.findById(anyLong())).thenReturn(Optional.of(currentDonor));
        when(service.find(anyLong())).thenReturn( (Donor) currentDonor);

        CannotBeUpdated exceptionCannotBeUpdateBecauseCpf = assertThrows(CannotBeUpdated.class, () -> {
            service.update(donorAtt);
        });

        assertThat(exceptionCannotBeUpdateBecauseCpf, instanceOf(CannotBeUpdated.class));
        assertThat(exceptionCannotBeUpdateBecauseCpf.getMessage(), is("Cpf não pode ser alterado"));

        donorAtt.setEmail("stevens@outlook.com");

        when(repository.findById(anyLong())).thenReturn(Optional.of(currentDonor));

        CannotBeUpdated exceptionCannotBeUpdateBecauseEmail = assertThrows(CannotBeUpdated.class, () -> {
            service.update(donorAtt);
        });

        assertThat(exceptionCannotBeUpdateBecauseEmail, instanceOf(CannotBeUpdated.class));
        assertThat(exceptionCannotBeUpdateBecauseEmail.getMessage(), is("Email não pode ser alterado"));

    }

	/*
    @Test
    void mustFail_whenDoctorWithoutCpfIsRegistered() {
        EntityAlreadyExists e = assertThrows(EntityAlreadyExists.class, () -> {
            Doctor user = new Doctor("Robson da Silva", "123.456.789-11", "CRM123456", "robson@outlook.com", 28, "Masculino", "Casado", "Rua A, 123", null, "81987654322", "$2b$12$EIkZUEIZq0jLsBJ4XXKoderOiw8Q9WaR7dEvcV55RA5sAxMqg2H6G");
            doctorService.register(user);
        });

        assertThat(e, instanceOf(EntityAlreadyExists.class));
    }
	*/
}
