package com.vitalhero.vitalhero;

import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.vitalhero.fullstack.Application;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.service.DoctorService;
import com.vitalhero.fullstack.service.DonorService;

@SpringBootTest(classes = Application.class)
public class UsersTests {
    
	@Autowired
    DonorService donorService;

	@Autowired
    DoctorService doctorService;

    @Test
	void mustFail_whenDonorWithoutCpfIsRegistered() {
		assertThrows(EntityAlreadyExists.class, () -> {
			Donor user = new Donor("Stevens Wendell Marinho Chaves", "123.456.789-10", "stevensch10@outlook.com", 24, "Masculino", "Solteiro", "Rua A, 123", null, "81987654321", "$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu", "O+");
			donorService.register(user);
		});
	}

	@Test
	void mustFail_whenDoctorWithoutCpfIsRegistered() {
		assertThrows(EntityAlreadyExists.class, () -> {
			Doctor user = new Doctor("Robson da Silva", "123.456.789-11", "CRM123456", "robson@outlook.com", 28, "Masculino", "Casado", "Rua A, 123", null, "81987654322", "$2b$12$EIkZUEIZq0jLsBJ4XXKoderOiw8Q9WaR7dEvcV55RA5sAxMqg2H6G");
			doctorService.register(user);
		});
	}
}
