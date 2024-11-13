package com.vitalhero.vitalhero.serviceTest;

import java.util.Optional;
import org.apache.commons.lang3.SerializationUtils;
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
import com.vitalhero.fullstack.model.Address;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.repository.DonorRepository;
import com.vitalhero.fullstack.security.TokenService;
import com.vitalhero.fullstack.service.AddressService;
import com.vitalhero.fullstack.service.DonorService;

@ExtendWith(MockitoExtension.class)
public class DonorServiceTest {

	@Mock
	private DonorRepository repository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private TokenService tokenService;

    @Mock
    private AddressService addressService;

    @InjectMocks
    private DonorService service;

    private Donor donor;
    private Address address;

    @BeforeEach
    public void setup(){
        address = Address.builder()
            .id(null)
            .cep("01001000")
            .street("Praça da Sé")
            .additionalInfo("lado ímpar")
            .neighborhood("Sé")
            .city("São Paulo")
            .stateCode("SP")
            .state("São Paulo")
            .region("Sudeste")
            .build();

        donor = Donor.builder()
            .id(1L)
            .scheduling(null)
            .name("Stevens Wendell Marinho Chaves")
            .cpf("11508527474")
            .email("stevensCh10@outlook.com")
            .age(24)
            .gender("Masculino")
            .maritalStatus("Solteiro")
            .address(address)
            .phone("81987654321")
            .password("$2a$12$.yZc8eZXaF/WYwvTEwHbOeJpkAJRxUycsL5El10VJ76LISDKAqriu")
            .bloodType("O+")
            .role("DONOR")
            .build();
    }

    @Test
    void shouldInsertDonor(){
        donor.setId(null);

        when(repository.save(donor)).thenReturn(donor);
        when(addressService.getAddress(donor.getAddress().getCep())).thenReturn(address);
        when(addressService.create(address)).thenReturn(address);
        ResponseDTO response = service.register(donor);

        assertEquals(donor.getName(), ((DonorDTO) response.getUser()).name());
    }

    @Test
    void shouldFail_whenDonorsCpfIsRegistered(){
        when(repository.findByCpfOrEmailOrPhone(donor.getCpf(), donor.getEmail(), donor.getPhone()))
         .thenReturn(Optional.of(donor));
        
        EntityAlreadyExists e = assertThrows(EntityAlreadyExists.class, () -> {
            service.register(donor);
        });

        assertThat(e, instanceOf(EntityAlreadyExists.class));
        assertThat(e.getMessage(), is("CPF já registrado"));
    }

    @Test
    void shouldFail_whenDonorsEmailIsRegistered(){
        Donor donorWithEmailRegistered = SerializationUtils.clone(donor);
        donorWithEmailRegistered.setCpf("13265478930");
            
        when(repository.findByCpfOrEmailOrPhone(donorWithEmailRegistered.getCpf(), donorWithEmailRegistered.getEmail(), donorWithEmailRegistered.getPhone())).thenReturn(Optional.of(donor));

        EntityAlreadyExists e = assertThrows(EntityAlreadyExists.class, () -> {
            service.register(donorWithEmailRegistered);
        });

        assertThat(e, instanceOf(EntityAlreadyExists.class));
        assertThat(e.getMessage(), is("Email já registrado"));
    }

    @Test
    void shouldFail_whenToChangeDonorsCpf(){
        Donor donorAtt = SerializationUtils.clone(donor);
        donorAtt.setCpf("13265478930");

        when(repository.findById(anyLong())).thenReturn(Optional.of(donor));
        when(repository.findByCpfOrEmailOrPhone(donorAtt.getCpf(), donorAtt.getEmail(), donorAtt.getPhone())).thenReturn(Optional.of(donor));

        CannotBeUpdated e = assertThrows(CannotBeUpdated.class, () -> {
            service.update(donorAtt); //Com cpf diferente
        });
        assertThat(e, instanceOf(CannotBeUpdated.class));
        assertThat(e.getMessage(), is("CPF não pode ser alterado"));
    }

    @Test
    void shouldFail_whenToChangeDonorsEmail(){
        Donor donorAtt = SerializationUtils.clone(donor);
        donorAtt.setEmail("stevens10@outlook.com");

        when(repository.findById(anyLong())).thenReturn(Optional.of(donor));
        when(repository.findByCpfOrEmailOrPhone(donorAtt.getCpf(), donorAtt.getEmail(), donorAtt.getPhone())).thenReturn(Optional.of(donor));

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
        when(repository.save(donor)).thenReturn(donor);

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
        assertThat(e.getMessage(), is("Triagem não preenchida"));
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
        assertThat(e.getMessage(), is("Triagem não validada"));
    }
}
