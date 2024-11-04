package com.vitalhero.vitalhero.serviceTest;

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
import com.vitalhero.fullstack.service.DonorService;

@ExtendWith(MockitoExtension.class)
public class DonorServiceTest {

	@Mock
	private DonorRepository repository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private TokenService tokenService;

    @InjectMocks
    private DonorService service;

    private Donor donor;

    @BeforeEach
    public void setup(){
        donor = new Donor(
            1L, null, "Stevens Wendell Marinho Chaves", "12345678910", "stevensCh10@outlook.com", 24, "Masculino", "Solteiro", 
            "Rua A, 123", "81987654321", "O+","$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu", "DONOR"
        );
    }

    @Test
    void shouldInsertDonor(){
        donor.setId(null);

        when(repository.save(donor)).thenReturn(donor);
        ResponseDTO response = service.register(donor);

        assertEquals(donor.getName(), ((DonorDTO) response.getUser()).name());
    }

    @Test
    void shouldFail_whenDonorsCpfIsRegistered(){
        when(repository.findByCpf(donor.getCpf())).thenReturn(donor);

        EntityAlreadyExists e = assertThrows(EntityAlreadyExists.class, () -> {
            service.register(donor);
        });

        assertThat(e, instanceOf(EntityAlreadyExists.class));
        assertThat(e.getMessage(), is("Cpf '%s' já cadastrado.".formatted(donor.getCpf())));
    }

    @Test
    void shouldFail_whenDonorsEmailIsRegistered(){
        when(repository.findByEmail(donor.getEmail())).thenReturn(donor);

        EntityAlreadyExists e = assertThrows(EntityAlreadyExists.class, () -> {
            service.register(donor);
        });

        assertThat(e, instanceOf(EntityAlreadyExists.class));
        assertThat(e.getMessage(), is("Email '%s' já cadastrado".formatted(donor.getEmail())));
    }

    @Test
    void shouldFail_whenToChangeDonorsCpf(){
        Donor donorAtt = new Donor(
            1L, null, "Stevens Wendell Marinho Chaves", "75315986203", "stevens@outlook.com", 24, "Masculino", "Solteiro", 
            "Rua A, 123", "81987654321", "O+", "$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu", "DONOR"
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
            "Rua A, 123", "81987654321", "O+", "$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu", "DONOR"
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
        String encodedPassword = "$2a$12$6bqJkwGlr8w0LLEdO8o2m.mRpEcbB.LXpdBfUMAXe5bixkKFRTKCa";

        when(repository.findById(anyLong())).thenReturn(Optional.of(donor));
        when(passwordEncoder.encode(newPassword)).thenReturn(encodedPassword);
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
        assertThat(e.getMessage(), is("Doador %s não pode marcar um agendamento pois ainda não preencheu sua triagem".formatted(donor.getName())));
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
        assertThat(e.getMessage(), is("Doador %s não pode marcar um agendamento pois a sua triagem ainda não foi validada".formatted(donor.getName())));
    }
}
