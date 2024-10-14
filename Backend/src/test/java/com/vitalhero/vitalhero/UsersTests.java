package com.vitalhero.vitalhero;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.instanceOf;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.repository.DonorRepository;
import com.vitalhero.fullstack.service.DonorService;

@ExtendWith(MockitoExtension.class)
public class UsersTests {

	@Mock
	private DonorRepository repository;

    @InjectMocks
    private DonorService donorService;


    @Test
    void mustFail_whenDonorIsRegistered() {
        assertDonorRegistrationFails("123.456.789-10", "stevensch10@outlook.com", "Cpf '123.456.789-10' já cadastrado.");
        assertDonorRegistrationFails("123.456.789-11", "stevensch10@outlook.com", "Email 'stevensch10@outlook.com' já cadastrado.");
    }

    private void assertDonorRegistrationFails(String cpf, String email, String expectedMessage) {
        Donor donor = new Donor(
            "Stevens Wendell Marinho Chaves", cpf, email, 24, "Masculino", "Solteiro", 
            "Rua A, 123", null, "81987654321", "$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu", "O+"
        );
        mockDonorRepository(cpf, email, donor);

        EntityAlreadyExists exception = assertThrows(EntityAlreadyExists.class, () -> {
            donorService.register(donor);
        });

        assertThat(exception, instanceOf(EntityAlreadyExists.class));
        assertThat(exception.getMessage(), is(expectedMessage));
    }

    private void mockDonorRepository(String cpf, String email, Donor donor) {
        if ("123.456.789-10".equals(cpf)) {
            when(repository.findByCpf(cpf)).thenReturn(donor);
        } else {
            when(repository.findByCpf(cpf)).thenReturn(null);
            when(repository.findByEmail(email)).thenReturn(donor);
        }
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
