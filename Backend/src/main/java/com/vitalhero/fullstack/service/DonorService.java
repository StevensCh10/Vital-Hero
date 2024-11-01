package com.vitalhero.fullstack.service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.dto.DonorDTO;
import com.vitalhero.fullstack.enums.Roles;
import com.vitalhero.fullstack.exception.CannotBeScheduling;
import com.vitalhero.fullstack.exception.CannotBeUpdated;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.repository.DonorRepository;

import jakarta.mail.internet.MimeUtility;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DonorService {

    private final DonorRepository repository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Cacheable(value="donor")
    public Donor find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFound(String.format("Doador com id '%d' não está registrado.", id)));
    }
    
    public DonorDTO getDonor(Long id){
        return DonorDTO.fromEntity(find(id));
    }

    @Cacheable(value="donor")
    public Donor register(Donor newDonor) {
        validateDonor(newDonor);
        newDonor.setRole(Roles.DONOR.toString());
        return repository.save(newDonor);
    }

    private void validateDonor(Donor donor) {
        if (repository.findByCpf(donor.getCpf()) != null) {
            throw new EntityAlreadyExists(String.format("Cpf '%s' já cadastrado.", donor.getCpf()));
        }
        if (repository.findByEmail(donor.getEmail()) != null) {
            throw new EntityAlreadyExists(String.format("Email '%s' já cadastrado", donor.getEmail()));
        }
    }

    @Transactional
    @CachePut(value="donor", key="#donorAtt.id")
	public DonorDTO update(Donor donorAtt) {
		Donor currentDonor = repository.findById(donorAtt.getId()).orElseThrow(() -> new EntityNotFound(String.format("Doador com id '%d' não está registrado.", donorAtt.getId())));
		Donor findedByPhone = repository.findByPhone(donorAtt.getPhone());

		if(!currentDonor.getCpf().equals(donorAtt.getCpf())){
            throw new CannotBeUpdated("Cpf não pode ser alterado");
        }else if(!currentDonor.getEmail().equals(donorAtt.getEmail())){
            throw new CannotBeUpdated("Email não pode ser alterado");
        }else if(findedByPhone != null && !findedByPhone.getId().equals(donorAtt.getId())){
            throw new CannotBeUpdated(String.format("Telefone '%s' indisponível.", donorAtt.getPhone()));
        }

		BeanUtils.copyProperties(donorAtt, currentDonor, "id");
		return DonorDTO.fromEntity(repository.saveAndFlush(currentDonor));
	}

    @CachePut(value="donor", key="#id")
    public DonorDTO updatePassword(Long id, String newPassword){
        Donor currentDonor = repository.findById(id).orElseThrow(() -> new EntityNotFound(String.format("Doador com id '%d' não está registrado.", id)));
        currentDonor.setPassword(passwordEncoder.encode(newPassword));
        return DonorDTO.fromEntity(repository.saveAndFlush(currentDonor));
    }

    @CachePut(value="donor", key="#id")
    public void toSchedule(Long id, Screening screening, Long schedulingID){
        var donor = repository.findById(id).orElseThrow(() -> new EntityNotFound(String.format("Doador com id '%d' não está registrado.", id)));
        if(screening == null){
            throw new CannotBeScheduling(String.format("Doador %s não pode marcar um agendamento pois ainda não preencheu sua triagem", donor.getName()));
        }else{
            if(screening.getDoctor() == null){
                throw new CannotBeScheduling(String.format("Doador %s não pode marcar um agendamento pois a sua triagem ainda não foi validada", donor.getName()));
            }
            repository.updateFkScheduling(schedulingID, id);
        }
    }

    @CachePut(value="donor", key="#id")
    public void scheduleMadeOrUnscheduled(Long id){
        Donor donor = find(id);
        if(donor.getScheduling() == null){
            throw new EntityNotFound(String.format("Doador '%s' não está agendado em nenhuma doação.", donor.getName()));
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