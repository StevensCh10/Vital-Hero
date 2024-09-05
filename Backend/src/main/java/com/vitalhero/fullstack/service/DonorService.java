package com.vitalhero.fullstack.service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.dto.DonorDTO;
import com.vitalhero.fullstack.enums.Roles;
import com.vitalhero.fullstack.exception.CannotBeScheduling;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.exception.EntityNotFoundInTheAppeal;
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

    public Donor find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundInTheAppeal(String.format("Doador com id '%d' não está registrado.", id)));
    }

    public DonorDTO getDonor(Long id){
        return DonorDTO.fromEntity(find(id));
    }

    public Donor checkLogin(String email, String password) {
        Donor donor = repository.checkLogin(email, password);
        if (donor == null) {
            handleLoginFailure(email);
        }
        return donor;
    }

    private void handleLoginFailure(String email) {
        if (repository.findByEmail(email) == null) {
            throw new EntityNotFoundInTheAppeal(String.format("Email '%s' não está cadastrado.", email));
        }
        throw new EntityNotFoundInTheAppeal("Senha incorreta.");
    }

    public Donor register(Donor donor) {
        validateDonor(donor);
        donor.setRole(Roles.DONOR.toString());
        return repository.save(donor);
    }

    private void validateDonor(Donor donor) {
        if (repository.findByCpf(donor.getCpf()) != null) {
            throw new EntityAlreadyExists(String.format("Cpf '%s' já cadastrado.", donor.getCpf()));
        }
        if (repository.findByEmail(donor.getEmail()) != null) {
            throw new EntityAlreadyExists(String.format("Email '%s' já cadastrado.", donor.getEmail()));
        }
    }

    @Transactional
	public DonorDTO update(Donor donorAtt) {
		Donor currentDonor = find(donorAtt.getId());
        Donor findedByCpf = repository.findByCpf(donorAtt.getCpf());
        Donor findedByEmail = repository.findByEmail(donorAtt.getEmail());
		Donor findedByPhone = repository.findByPhone(donorAtt.getPhone());

		if(findedByCpf != null && findedByCpf.getId() != donorAtt.getId()){
            throw new EntityAlreadyExists(String.format("Cpf '%s' indisponível.", donorAtt.getCpf()));
        }else if(findedByEmail != null && findedByEmail.getId() != donorAtt.getId()){
            throw new EntityAlreadyExists(String.format("Email '%s' indisponível.", donorAtt.getEmail()));
        }else if(findedByPhone != null && findedByPhone.getId() != donorAtt.getId()){
            throw new EntityAlreadyExists(String.format("Telefone '%s' indisponível.", donorAtt.getPhone()));
        }

		BeanUtils.copyProperties(donorAtt, currentDonor, "id");
		return DonorDTO.fromEntity(repository.saveAndFlush(currentDonor));
	}

    public DonorDTO updatePassword(Long id, String newPassword){
        Donor currentDonor = find(id);
        currentDonor.setPassword(newPassword);
        return DonorDTO.fromEntity(repository.saveAndFlush(currentDonor));
    }

    public void toSchedule(Long id, Screening screening, Long schedulingID){
        var donor = find(id);
        if(screening == null){
            throw new CannotBeScheduling(String.format("Doador %s não pode marcar um agendamento pois ainda não preencheu sua triagem", donor.getName()));
        }else{
            if(screening.getDoctor() == null){
                throw new CannotBeScheduling(String.format("Doador %s não pode marcar um agendamento pois a sua triagem ainda não foi validada", donor.getName()));
            }
            repository.updateFkScheduling(schedulingID, id);
        }
    }

    public void scheduleMadeOrUnscheduled(Long id){
        Donor donor = find(id);
        if(donor.getScheduling() == null){
            throw new EntityNotFound(String.format("Doador '%s' não está agendado em nenhuma doação.", donor.getName()));
        }
        repository.FkSchedulingToNull(id);
    }

    public List<DonorDTO> allScheduledDonors(){
        return repository.allScheduledDonors()
                .stream()
                .map(DonorDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<DonorDTO> allDonorScreenings(){
        return repository.allDonorScreenings()
        .stream().map(DonorDTO::fromEntity)
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
            e.printStackTrace();
        }
        String subject = "Feedback da aplicação";
        String to = "stevenschaves10@gmail.com";
        String text = "Feedback enviado por "+donor.getName()+":\n\n"+"\""+(feedback)+"\"";
        emailService.sendEmail(to, subject, text, from, personal);
    }
    
    public void deleteDonor(Long id){
        find(id);
        repository.deleteById(id);
    }
}