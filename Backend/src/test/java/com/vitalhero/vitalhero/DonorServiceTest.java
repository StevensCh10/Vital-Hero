package com.vitalhero.vitalhero;

import java.util.Optional;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.instanceOf;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
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
import com.vitalhero.fullstack.exception.CannotBeScheduling;
import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.repository.DonorRepository;
import com.vitalhero.fullstack.security.TokenService;
import com.vitalhero.fullstack.service.AuthService;
import com.vitalhero.fullstack.service.DonorService;

@ExtendWith(MockitoExtension.class)
public class DonorServiceTest {

	@Mock
	private DonorRepository repository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    @SuppressWarnings("unused")
    private TokenService tokenService;

    @InjectMocks
    private DonorService service;

    @InjectMocks
    private AuthService authService;

    private Donor donor;

    @BeforeEach
    public void setup(){
        donor = new Donor(
            1L, null, "Stevens Wendell Marinho Chaves", "12345678910", "stevensCh10@outlook.com", 24, "Masculino", "Solteiro", 
            "Rua A, 123", "sem", "81987654321", "O+","$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu", "DONOR"
        );
    }

    @Test
    void shouldInsertDonor(){
        donor.setId(null);

        when(repository.save(donor)).thenReturn(donor);
        Donor registeredDonor = service.register(donor);

        assertEquals(donor.getId(), registeredDonor.getId());
    }

    @Test
    void shouldFail_whenDonorsCpfIsRegistered(){
        when(repository.findByCpf(donor.getCpf())).thenReturn(donor);

        EntityAlreadyExists e = assertThrows(EntityAlreadyExists.class, () -> {
            service.register(donor);
        });

        assertThat(e, instanceOf(EntityAlreadyExists.class));
        assertThat(e.getMessage(), is(String.format("Cpf '%s' já cadastrado.", donor.getCpf())));
    }

    @Test
    void shouldFail_whenDonorsEmailIsRegistered(){
        when(repository.findByEmail(donor.getEmail())).thenReturn(donor);

        EntityAlreadyExists e = assertThrows(EntityAlreadyExists.class, () -> {
            service.register(donor);
        });

        assertThat(e, instanceOf(EntityAlreadyExists.class));
        assertThat(e.getMessage(), is(String.format("Email '%s' já cadastrado", donor.getEmail())));
    }

    @Test
    void shouldFail_whenToChangeDonorsCpf(){
        Donor donorAtt = new Donor(
            1L, null, "Stevens Wendell Marinho Chaves", "75315986203", "stevens@outlook.com", 24, "Masculino", "Solteiro", 
            "Rua A, 123", "sem", "81987654321", "O+", "$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu", "DONOR"
        );

        when(repository.findById(anyLong())).thenReturn(Optional.of(donor));
        CannotBeUpdated e = assertThrows(CannotBeUpdated.class, () -> {
            service.update(donorAtt); //Com cpf diferente
        });
        assertThat(e, instanceOf(CannotBeUpdated.class));
        assertThat(e.getMessage(), is("Cpf não pode ser alterado"));
    }

    @Test
    void shouldFail_whenToChangeDonorsEmail(){
        Donor donorAtt = new Donor(
            1L, null, "Stevens Wendell Marinho Chaves", "12345678910", "stevens@outlook.com", 24, "Masculino", "Solteiro", 
            "Rua A, 123", "sem", "81987654321", "O+", "$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu", "DONOR"
        );

        when(repository.findById(anyLong())).thenReturn(Optional.of(donor));
        donorAtt.setEmail("stevens@outlook.com");

        CannotBeUpdated e = assertThrows(CannotBeUpdated.class, () -> {
            service.update(donorAtt); //Com email diferente
        });
        assertThat(e, instanceOf(CannotBeUpdated.class));
        assertThat(e.getMessage(), is("Email não pode ser alterado"));
    }

    @Test
    void shouldUpdatePassword(){
        String newPassword = "auhduia0q29e1";

        when(repository.findById(anyLong())).thenReturn(Optional.of(donor));
        when(repository.saveAndFlush(donor)).thenReturn(donor);
        DonorDTO updated = service.updatePassword(donor.getId(), newPassword);

        assertEquals(donor.getName(), updated.name());
    }

    @Test
    void shouldfail_whenDonorsTryScheduleAndNotCompleteScreening(){  
        when(repository.findById(anyLong())).thenReturn(Optional.of(donor));

        CannotBeScheduling e = assertThrows(CannotBeScheduling.class, () -> {
            service.toSchedule(donor.getId(), null, anyLong()); //Triagem não preenchida (null)
        });

        assertThat(e, instanceOf(CannotBeScheduling.class));
        assertThat(e.getMessage(), is(String.format("Doador %s não pode marcar um agendamento pois ainda não preencheu sua triagem", donor.getName())));
    }

    @Test
    void shouldfail_whenDonorsTryScheduleAndNotValidatedScreening(){  
        when(repository.findById(anyLong())).thenReturn(Optional.of(donor));

        Screening screening = new Screening();
        screening.setId(1L);
        
        CannotBeScheduling e = assertThrows(CannotBeScheduling.class, () -> {
            service.toSchedule(donor.getId(), screening, anyLong()); //Triagem não validada
        });

        assertThat(e, instanceOf(CannotBeScheduling.class));
        assertThat(e.getMessage(), is(String.format("Doador %s não pode marcar um agendamento pois a sua triagem ainda não foi validada", donor.getName())));
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
