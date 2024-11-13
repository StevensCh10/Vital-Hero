package com.vitalhero.fullstack.service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.dto.DonorDTO;
import com.vitalhero.fullstack.dto.ResponseDTO;
import com.vitalhero.fullstack.enums.Roles;
import com.vitalhero.fullstack.exception.CannotBeScheduling;
import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.repository.DonorRepository;
import com.vitalhero.fullstack.security.TokenService;

import jakarta.mail.internet.MimeUtility;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DonorService {

    private final DonorRepository repository;
    private final EmailService emailService;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final AddressService addressService;

    private final String DONOR_NOT_REGISTERED = "Doador não registrado";
    private final String CPF_ALREADY_REGISTERED = "CPF já registrado";
    private final String CPF_CANNOT_CHANGED = "CPF não pode ser alterado";
    private final String EMAIL_ALREADY_REGISTERED = "Email já registrado";
    private final String EMAIL_CANNOT_CHANGED = "Email não pode ser alterado";
    private final String PHONE_NUMBER_ALREADY_REGISTERED = "Número de telefone já registrado";
    private final String PHONE_NUMBER_UNAVAILABLE = "Número de telefone indisponível";
    private final String SCREENING_NOT_COMPLETED = "Triagem não preenchida";
    private final String SCREENING_NOT_VALIDATED = "Triagem não validada";
    private final String UNSCHEDULED_DONOR = "Doador não agendado";

    @Cacheable(value="donor")
    public Donor find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFound(DONOR_NOT_REGISTERED));
    }
    
    public DonorDTO getDonor(Long id){
        return DonorDTO.fromEntity(find(id));
    }

    @Cacheable(value="donor")
    public ResponseDTO register(Donor newDonor) {
        validateDonorInsert(newDonor);
        
        var address = addressService.getAddress(newDonor.getAddress().getCep());
        address = addressService.create(address);

        newDonor.setAddress(address);
        newDonor.setRole(Roles.DONOR.toString());
        newDonor.setPassword(passwordEncoder.encode(newDonor.getPassword()));
        String token = this.tokenService.generateToken(newDonor);
        return new ResponseDTO(DonorDTO.fromEntity(repository.save(newDonor)), token);
    }

    private void validateDonorInsert(Donor donor) {
        Optional<Donor> existingDonor = repository.findByCpfOrEmailOrPhone(donor.getCpf(), donor.getEmail(), donor.getPhone());

        if(existingDonor.isPresent()){
            Donor foundDonor = existingDonor.get();
            if(foundDonor.getCpf().equals(donor.getCpf())) throw new EntityAlreadyExists(CPF_ALREADY_REGISTERED);
            if(foundDonor.getEmail().equals(donor.getEmail())) throw new EntityAlreadyExists(EMAIL_ALREADY_REGISTERED);
            if(foundDonor.getPhone().equals(donor.getPhone())) throw new EntityAlreadyExists(PHONE_NUMBER_ALREADY_REGISTERED);
        }
    }

    @Transactional
    @CachePut(value="donor", key="#donorAtt.id")
	public DonorDTO update(Donor donorAtt) {
		Donor currentDonor = find(donorAtt.getId());
		
        validateDonorUpdate(donorAtt);

		BeanUtils.copyProperties(donorAtt, currentDonor, "id");
		return DonorDTO.fromEntity(repository.saveAndFlush(currentDonor));
	}

    private void validateDonorUpdate(Donor donor){
        Optional<Donor> existingDonor = repository.findByCpfOrEmailOrPhone(donor.getCpf(), donor.getEmail(), donor.getPhone());
        
        if(existingDonor.isPresent()){
            Donor foundDonor = existingDonor.get();
            if(!foundDonor.getCpf().equals(donor.getCpf())) throw new CannotBeUpdated(CPF_CANNOT_CHANGED);
            if(!foundDonor.getEmail().equals(donor.getEmail())) throw new CannotBeUpdated(EMAIL_CANNOT_CHANGED);
            if(foundDonor.getPhone().equals(donor.getPhone()) && !foundDonor.getPhone().equals(donor.getPhone())) 
                throw new CannotBeUpdated(PHONE_NUMBER_UNAVAILABLE);
        }
    }

    @CachePut(value="donor", key="#id")
    public DonorDTO updatePassword(Long id, String newPassword){
        Donor donor = find(id);
        donor.setPassword(passwordEncoder.encode(newPassword));
        Donor updatedDonor = repository.save(donor);
        return DonorDTO.fromEntity(updatedDonor); 
    }

    @CachePut(value="donor", key="#id")
    public void toSchedule(Long id, Screening screening, Long schedulingID){
        find(id);
        validateSchedule(screening);
        repository.updateFkScheduling(schedulingID, id);
    }

    private void validateSchedule(Screening screening){
        if(screening == null){
            throw new CannotBeScheduling(SCREENING_NOT_COMPLETED);
        }else{
            if(screening.getDoctor() == null) throw new CannotBeScheduling(SCREENING_NOT_VALIDATED);
        }
    }

    @CachePut(value="donor", key="#id")
    public void scheduleMadeOrUnscheduled(Long id){
        Donor donor = find(id);
        if(donor.getScheduling() == null){
            throw new EntityNotFound(UNSCHEDULED_DONOR);
        }
        repository.FkSchedulingToNull(id);
    }

    @Cacheable(value="scheduleDonors")
    public List<DonorDTO> allScheduledDonors(){
        return repository.allScheduledDonors()
            .stream()
            .map(DonorDTO::fromEntity)
            .collect(Collectors.toList());
    }

    @Cacheable(value="creeningDonors")
    public List<DonorDTO> allDonorScreenings(){
        return repository.allDonorScreenings()
            .stream()
            .map(DonorDTO::fromEntity)
            .collect(Collectors.toList());
    }

    public void sendFeedback(Long id, String feedback){
        Donor donor = find(id);
        String fromName = "Vital Hero";
        String from = "stevenschaves10@gmail.com";
        String personal = null;
        try {
            personal = "=?utf-8?Q?" + MimeUtility.encodeText(fromName) + "?=";
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("Erro ao codificar o nome do remetente.", e);
        }
        String subject = "Feedback da aplicação";
        String to = "stevenschaves10@gmail.com";
        String text = "Feedback enviado por "+donor.getName()+":\n\n"+"\""+(feedback)+"\"";
        emailService.sendEmail(to, subject, text, from, personal);
    }
    
    @CacheEvict(value="donor", key="#id")
    public void deleteDonor(Long id){
        find(id);
        repository.deleteById(id);
    }
}