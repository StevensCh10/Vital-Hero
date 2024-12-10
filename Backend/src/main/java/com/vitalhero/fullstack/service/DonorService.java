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
import com.vitalhero.fullstack.enums.ErrorMessage;
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
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DonorService {

    private final DonorRepository repository;
    private final EmailService emailService;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final AddressService addressService;

    @Cacheable(value="donor")
    public Donor findDonorById(Long id){
        log.info("[findDonorById]: Iniciando busca por doador");
        var foundDonation = repository.findById(id).orElseThrow(() -> {
            log.warn("[findDonorById]: Falha na busca. Doador com ID: {} não encontrado no sistema", id);
            return new EntityNotFound(ErrorMessage.DONOR_NOT_REGISTERED.toString());
        });
        log.info("[findDonorById]: Busca finalizada com sucesso");
        return foundDonation;
    }
    
    public DonorDTO getDonorDTOById(Long id){
        return DonorDTO.fromEntity(findDonorById(id));
    }

    @Cacheable(value="donor")
    public ResponseDTO addDonor(Donor newDonor) {
        log.info("[addDonor]: Iniciando cadastro do doador");
        validateDonorInsert(newDonor);
        
        var address = addressService.getAddress(newDonor.getAddress().getCep());
        address = addressService.addAddress(address);

        newDonor.setAddress(address);
        newDonor.setRole(Roles.DONOR.toString());
        newDonor.setPassword(passwordEncoder.encode(newDonor.getPassword()));
        String token = this.tokenService.generateToken(newDonor);
        var addedDonor = new ResponseDTO(DonorDTO.fromEntity(repository.save(newDonor)), token);
        log.info("[addDonor]: Cadastro conculído com sucesso");
        return addedDonor;
    }

    private void validateDonorInsert(Donor donor) {
        String donorName = donor.getName();
        log.info("[validateDonorInsert]: Iniciando validacao do cadastro do doador");
        Optional<Donor> existingDonor = repository.findByCpfOrEmailOrPhone(donor.getCpf(), donor.getEmail(), donor.getPhone());

        if(existingDonor.isPresent()){
            Donor foundDonor = existingDonor.get();
            if(foundDonor.getCpf().equals(donor.getCpf())){
                log.warn("[validateDonorInsert]: Falha na validação do doador '{}'. "+ErrorMessage.CPF_CANNOT_CHANGED ,donorName);
                throw new EntityAlreadyExists(ErrorMessage.CPF_ALREADY_REGISTERED.toString());
            } else if(foundDonor.getEmail().equals(donor.getEmail())){
                log.warn("[validateDonorInsert]: Falha na validação do doador '{}'. "+ErrorMessage.EMAIL_ALREADY_REGISTERED ,donorName);
                throw new EntityAlreadyExists(ErrorMessage.EMAIL_ALREADY_REGISTERED.toString());
            } else if(foundDonor.getPhone().equals(donor.getPhone())){
                log.warn("[validateDonorInsert]: Falha na validação do doador '{}'. "+ErrorMessage.PHONE_NUMBER_ALREADY_REGISTERED ,donorName);
                throw new EntityAlreadyExists(ErrorMessage.PHONE_NUMBER_ALREADY_REGISTERED.toString());
            }
        }
        log.info("[validateDonorInsert]: Validação do cadastro concluída com sucesso");
    }

    @Transactional
    @CachePut(value="donor", key="#donorAtt.id")
	public DonorDTO updateDonor(Donor donorAtt) {
        log.info("[updateDonor]: Iniciando atualizacao do doador");
		Donor currentDonor = findDonorById(donorAtt.getId());
		
        validateDonorUpdate(donorAtt);

		BeanUtils.copyProperties(donorAtt, currentDonor, "id");
		var donorDTO = DonorDTO.fromEntity(repository.saveAndFlush(currentDonor));
        log.info("[updateDonor]: Atualização concluída com sucesso");
        return donorDTO;
	}

    private void validateDonorUpdate(Donor donor){
        String donorName = donor.getName();
        log.info("[validateDonorUpdate]: Iniciando validacao da atualizacao do doador");
        Optional<Donor> existingDonor = repository.findByCpfOrEmailOrPhone(donor.getCpf(), donor.getEmail(), donor.getPhone());
        
        if(existingDonor.isPresent()){
            Donor foundDonor = existingDonor.get();
            if(!foundDonor.getCpf().equals(donor.getCpf())){
                log.warn("[validateDonorUpdate]: Falha na validação do doador '{}'. "+ErrorMessage.CPF_CANNOT_CHANGED, donorName);
                throw new CannotBeUpdated(ErrorMessage.CPF_CANNOT_CHANGED.toString());
            } else if(!foundDonor.getEmail().equals(donor.getEmail())){
                log.warn("[validateDonorUpdate]: Falha na validação do doador '{}'. "+ErrorMessage.EMAIL_CANNOT_CHANGED, donorName);
                throw new CannotBeUpdated(ErrorMessage.EMAIL_CANNOT_CHANGED.toString());
            } else if(foundDonor.getPhone().equals(donor.getPhone()) && !foundDonor.getPhone().equals(donor.getPhone())){
                log.warn("[validateDonorUpdate]: Falha na validação do doador '{}'. "+ErrorMessage.PHONE_NUMBER_UNAVAILABLE, donorName);
                throw new CannotBeUpdated(ErrorMessage.PHONE_NUMBER_UNAVAILABLE.toString());
            }
        }
        log.info("[validateDonorUpdate]: Validação da atualização concluída com sucesso");
    }

    @CachePut(value="donor", key="#id")
    public DonorDTO updatePassword(Long id, String newPassword){
        log.info("[updatePassword]: Iniciando atualizacao de senha do doador");
        Donor donor = findDonorById(id);
        donor.setPassword(passwordEncoder.encode(newPassword));
        Donor updatedDonor = repository.save(donor);
        var donorDTO = DonorDTO.fromEntity(updatedDonor); 
        log.info("[updatePassword]: Atualização concluída com sucesso");
        return donorDTO;
    }

    @CachePut(value="donor", key="#id")
    public void toSchedule(Long id, Screening screening, Long schedulingID){
        log.info("[toSchedule]: Iniciando processo para agendamento do doador");
        findDonorById(id);
        validateSreening(screening);
        repository.updateFkScheduling(schedulingID, id);
        log.info("[toSchedule]: Agendamento do doador finalizado com sucesso");
    }

    private void validateSreening(Screening screening){
        log.info("[validateSreening]: Iniciando processo de validacao para agendamento do doador");
        if(screening == null){
            log.warn("[validateSreening]: Falha na validação para agendamento. "+ErrorMessage.SCREENING_NOT_COMPLETED);
            throw new CannotBeScheduling(ErrorMessage.SCREENING_NOT_COMPLETED.toString());
        }else{
            if(screening.getDoctor() == null){
                log.warn("[validateSreening]: Falha na validação para agendamento. "+ErrorMessage.SCREENING_NOT_VALIDATED);
                throw new CannotBeScheduling(ErrorMessage.SCREENING_NOT_VALIDATED.toString());
            }
        }
        log.info("[validateSreening]: Validação concluída com sucesso");
    }

    @CachePut(value="donor", key="#id")
    public void scheduleMadeOrUnscheduled(Long id){
        log.info("[scheduleMadeOrUnscheduled]: Iniciando processo para desagendamento do doador");
        Donor donor = findDonorById(id);
        if(donor.getScheduling() == null){
            log.warn("[scheduleMadeOrUnscheduled]: Falha ao desagendar. Doador com ID: {} não está agendado", id);
            throw new EntityNotFound(ErrorMessage.UNSCHEDULED_DONOR.toString());
        }
        repository.FkSchedulingToNull(id);
        log.info("[scheduleMadeOrUnscheduled]: Desagendamento concluído com sucesso");
    }

    @Cacheable(value="schedulingDonors")
    public List<DonorDTO> allSchedulingDonors(){
        log.info("[allSchedulingDonors]: Iniciando busca por todos os doadores agendados");
        var allDonors = repository.allSchedulingDonors()
            .stream()
            .map(DonorDTO::fromEntity)
            .collect(Collectors.toList());
        log.info("[allSchedulingDonors]: Busca concluída com sucesso");
        return allDonors;
    }

    /*
    @Cacheable(value="screeningDonors")
    public List<DonorDTO> allDonorScreenings(){
        return repository.allDonorScreenings()
            .stream()
            .map(DonorDTO::fromEntity)
            .collect(Collectors.toList());
    }
    */

    public void sendFeedback(Long id, String feedback){
        log.info("[sendFeedback]: Iniciando envio de feedback");
        Donor donor = findDonorById(id);
        String fromName = "Vital Hero";
        String from = "stevenschaves10@gmail.com";
        String personal = null;
        try {
            personal = "=?utf-8?Q?" + MimeUtility.encodeText(fromName) + "?=";
        } catch (UnsupportedEncodingException e) {
            log.error("[sendFeedback]: Falha ao enviar feedback. Erro ao codificar o nome do remetente");
            throw new RuntimeException("Erro ao codificar o nome do remetente", e);
        }
        String subject = "Feedback da aplicação";
        String to = "stevenschaves10@gmail.com";
        String text = "Feedback enviado por "+donor.getName()+":\n\n"+"\""+(feedback)+"\"";
        emailService.sendEmail(to, subject, text, from, personal);
        log.info("[sendFeedback]: Feedback enviado com sucesso");
    }
    
    @CacheEvict(value="donor", key="#id")
    public void deleteDonor(Long id){
        log.info("[deleteDonor]: Iniciando remocao do doador");
        findDonorById(id);
        repository.deleteById(id);
        log.info("[deleteDonor]: Remoção removida com sucesso");
    }
}