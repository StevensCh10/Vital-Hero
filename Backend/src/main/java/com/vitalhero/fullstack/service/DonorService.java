package com.vitalhero.fullstack.service;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.enums.Roles;
import com.vitalhero.fullstack.exception.CannotBeScheduling;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.exception.EntityNotFoundInTheAppeal;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.repository.DonorRepository;

import jakarta.mail.internet.MimeUtility;
import jakarta.transaction.Transactional;

@Service
public class DonorService {

    private final DonorRepository repository;
    private final EmailService emailService;

    public DonorService(DonorRepository repository, EmailService emailService){
            this.repository = repository;
            this.emailService = emailService;
    }

    //NECESSÁRIO PERSONALIZAR TODAS AS EXCEÇÕES LANÇADAS
    //Provavelmente tenho que validar como será a exclusão de outras entidades que tem um Donor como FK

    public Donor find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundInTheAppeal(String.format("Doador com id '%d' não está registrado.", id)));
    }

    public Donor checkLogin(String email, String password) {
		Donor donor = repository.checkLogin(email, password);
		
		if(donor == null) {
			if(repository.findByEmail(email) == null) {
                throw new EntityNotFoundInTheAppeal(String.format("Email '%s' não está cadastrado.", email));
			}
            throw new EntityNotFoundInTheAppeal("Senha incorreta");
		}
		return donor;
	}

    @Transactional
	public Donor register(Donor donor) {
		if(repository.findByCpf(donor.getCpf()) == null) {
			if(repository.findByEmail(donor.getEmail()) != null) {
                throw new EntityAlreadyExists(String.format("Email '%s' já está cadastrado.", donor.getEmail()));
			}
            donor.setRole(Roles.DONOR.toString());
			return repository.save(donor);			
		}
        throw new EntityAlreadyExists(String.format("Cpf '%s' indisponível.", donor.getCpf()));
	}

    @Transactional
	public Donor update(Donor donorAtt) {
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
		return repository.saveAndFlush(currentDonor);
	}

    public void toSchedule(Long id, Long schedulingID){
        var donor = find(id);
        if(donor.getScheduling() == null){
            throw new CannotBeScheduling(String.format("Doador %s não pode marcar um agendamento pois a sua triagem ainda não foi validada", donor.getName()));
        }else{
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

    public List<Donor> allScheduledDonors(){
        return repository.allScheduledDonors();
    }

    public List<Donor> allDonorScreenings(){
        return repository.allDonorScreenings();
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
