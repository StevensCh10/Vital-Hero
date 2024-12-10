package com.vitalhero.fullstack.controller;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.quartz.SchedulerException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.vitalhero.fullstack.dto.BloodcenterDTO;
import com.vitalhero.fullstack.dto.ResponseDTO;
import com.vitalhero.fullstack.model.BloodStock;
import com.vitalhero.fullstack.model.Bloodcenter;
import com.vitalhero.fullstack.model.Donation;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Scheduling;
import com.vitalhero.fullstack.model.Screening;
import com.vitalhero.fullstack.service.BloodStockService;
import com.vitalhero.fullstack.service.BloodcenterService;
import com.vitalhero.fullstack.service.DonationService;
import com.vitalhero.fullstack.service.DonorService;
import com.vitalhero.fullstack.service.QuartzDonationService;
import com.vitalhero.fullstack.service.SchedulingService;
import com.vitalhero.fullstack.service.ScreeningService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/bloodcenter")
@RequiredArgsConstructor
@Slf4j
public class BloodcenterController {

    private final BloodcenterService bloodcenterService;
    private final BloodStockService bloodStockService;
    private final SchedulingService schedulingService;
    private final DonationService donationService;
    private final DonorService donorService;
    private final QuartzDonationService quartzDonationService;
    private final ScreeningService screeningService;

    //BLOODCENTER
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseDTO addBloodcenter(@Valid @RequestBody Bloodcenter newBloodcenter){
        log.info("Iniciando requisicao de cadastro do hemocentro");
        var response = bloodcenterService.addBloodcenter(newBloodcenter);
        log.info("Finalizando requisicao de cadastro do hemocentro");
        return response;
    }

    @PutMapping()
    public BloodcenterDTO updateBloodcenter(@Valid @RequestBody Bloodcenter bloodcenterAtt){
        log.info("Iniciando requisicao de atualizacao do hemocentro");
        var updatedBloodcenter = bloodcenterService.updateBloodcenter(bloodcenterAtt);
        log.info("Finalizando requisicao de atualizacao do hemocentro");
        return updatedBloodcenter;
    }

    @GetMapping("/{bcID}")
    public BloodcenterDTO findBloodcenterById(@Valid @PathVariable Long bcID){
        log.info("Iniciando requisicao de busca pelo hemocentro via ID");
        var foundBloodcenter = bloodcenterService.getBloodcenterDTOById(bcID);
        log.info("Finalizando requisicao de busca pelo hemocentro via ID");
        return foundBloodcenter;
    }

    @GetMapping("/all")
    public List<BloodcenterDTO> findAllBloodcenters(){
        log.info("Iniciando requisicao de busca por todos os hemocentros cadastrados");
        var allBloodcenter = bloodcenterService.findAllBloodcenters();
        log.info("Finalizando requisicao de busca por todos os hemocentros cadastrados");
        return allBloodcenter;
    }

    @DeleteMapping("/{bcID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBloodcenter(@Valid @PathVariable Long bcID){
        log.info("Iniciando requisicao de remocao do hemocentro");
        bloodcenterService.deleteBloodcenter(bcID);
        log.info("Finalizando requisicao de remocao do hemocentro");
    }

    //BLOODSTOCK
    @PostMapping("/bloodstock")
    public BloodStock addBloodStock(@Valid @RequestBody BloodStock newBloodStock){
        log.info("Iniciando requisicao de cadastro do estoque sanguineo");
        var addedBloodStock = bloodStockService.addBloodStock(newBloodStock);
        log.info("Finalizando requisicao de cadastro do estoque sanguineo");
        return addedBloodStock;
    }

    @PutMapping("/bloodstock")
    public BloodStock updateBloodStock(@Valid @RequestBody BloodStock bloodStockAtt){
        log.info("Iniciando requisicao de atualizacao do estoque sanguineo");
        var updatedBloodStock = bloodStockService.updateBloodStock(bloodStockAtt);
        log.info("Finalizando requisicao de atualizacao do estoque sanguineo");
        return updatedBloodStock;
    }

    @GetMapping("bloodstock/{bsID}")
    public BloodStock findBloodStock(@Valid @PathVariable Long bsID){
        log.info("Iniciando requisicao de busca pelo estoque sanguineo");
        var foundBloodStock = bloodStockService.findBloodStockById(bsID);
        log.info("Finalizando requisicao de busca pelo estoque sanguineo");
        return foundBloodStock;
    }

    @GetMapping("bloodstock/all")
    public List<BloodStock> findAllBloodStocks(){
        log.info("Iniciando requisicao de busca por todos os estoques sanguineos cadastrados");
        var allBloodStock = bloodStockService.findAllBloodStocks();
        log.info("Finalizando requisicao de busca por todos os estoques sanguineos cadastrados");
        return allBloodStock;
    }

    @GetMapping("bloodstock/findbybloodcenter/{bcID}")
    public BloodStock findBloodStockByBloodcenter(@Valid @PathVariable Long bcID){
        log.info("Iniciando requisicao de busca pelo estoque sanguineo de um hemocentro");
        var bloodStockbyBloodcenter = bloodStockService.findBloodStockByBloodcenter(bcID);
        log.info("Finalizando requisicao de busca pelo estoque sanguineo de um hemocentro");
        return bloodStockbyBloodcenter;
    }

    @DeleteMapping("/bloodstock/{bsID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBloodStock(@Valid @PathVariable Long bsID){
        log.info("Iniciando requisicao de remocao do estoque sanguineo");
        bloodStockService.deleteBloodStock(bsID);
        log.info("Finalizando requisicao de remocao do estoque sanguineo");
    }

    //SCHEDULING
    @PostMapping("/scheduling")
    public Scheduling addScheduling(@Valid @RequestBody Scheduling newSched){
        log.info("Iniciando requisicao de cadastro do agendamento");
        var addedSched = schedulingService.addScheduling(newSched);
        log.info("Finalizando requisicao de cadastro do agendamento");
        return addedSched;
    }

    @PutMapping("/scheduling")
    public Scheduling updateScheduling(@Valid @RequestBody Scheduling schedulingAtt){
        log.info("Iniciando requisicao de atualizacao do agendamento");
        var updatedSched = schedulingService.updateScheduling(schedulingAtt);
        log.info("Finalizando requisicao de atualizacao do agendamento");
        return updatedSched;
    }

    @GetMapping("scheduling/{schedID}")
    public Scheduling findScheduling(@Valid @PathVariable Long schedID){
        log.info("Iniciando requisicao de pelo agendamento");
        var foundSched = schedulingService.findSchedulingById(schedID);
        log.info("Finalizando requisicao de pelo agendamento");
        return foundSched;
    }

    @GetMapping("/scheduling/all/{bcID}")
    public List<Scheduling> schedulingsByBloodcenter(@Valid @PathVariable Long bcID){
        log.info("Iniciando requisicao de busca por agendamentos de um hemocentro");
        var schedsByBloodcenter = schedulingService.schedulingsByBloodcenter(bcID);
        log.info("Finalizando requisicao de busca por agendamentos de um hemocentro");
        return schedsByBloodcenter;
    }

    @GetMapping("/scheduling/all")
    public List<Scheduling> allSchedulings() {
        log.info("Iniciando requisicao de busca por todos os agendamentos");
        List<Scheduling> sortedScheduling = schedulingService.allSchedulings().stream()
                .sorted(Comparator.comparing(Scheduling::getDateTime))
                .collect(Collectors.toList());
        log.info("Finalizando requisicao de busca por todos os agendamentos");
        return sortedScheduling;
    }

    @DeleteMapping("/scheduling/{bsID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteScheduling(@Valid @PathVariable Long bsID){
        log.info("Iniciando requisicao de remocao de agendamento");
        schedulingService.deleteScheduling(bsID);
        log.info("Finalizando requisicao de remocao de agendamento");
    }

    //DONATION
    @PostMapping("/donation")
    public void donationMade(@RequestParam List<Long> donorIdsDonated, @RequestParam List<Long> donorIdsNotDonated){
        log.info("Iniciando requisicao para finalizar uma doacao");
        for (Long donorId : donorIdsDonated) {
            Donor donor = donorService.findDonorById(donorId);

            Donation donation = new Donation();
            donation.setDonor(donor);
            donation.setScheduling(donor.getScheduling());

            Donation addedDonation = donationService.addDonation(donation);
            scheduleDonationNotification(addedDonation, donor.getGender());
            donorService.scheduleMadeOrUnscheduled(donorId);

            Screening screening = screeningService.screeningByDonor(donor);
            screeningService.deleteScreening(screening.getId());
        }
        for(Long donorId : donorIdsNotDonated){
            donorService.scheduleMadeOrUnscheduled(donorId);
        }
        log.info("Finalizando requisicao para finalizar uma doacao");
    }

    //@PostMapping("/schedule-donation-notification/{gender}")
    @SuppressWarnings("CallToPrintStackTrace")
    private void scheduleDonationNotification(Donation donation, String gender) {
        log.info("Iniciando requisicao de agendamento para notificar doador via email");
        Donor donor = donorService.findDonorById(donation.getDonor().getId());
        quartzDonationService.sendEmailDonor(donor);
        try {
            quartzDonationService.scheduleNotification(donation, gender);
            log.info("Finalizando requisicao de agendamento para notificar doador via email");
        } catch (SchedulerException e) {
            log.error("Erro na requisicao de agendamento para notificar doador via email");
            e.printStackTrace();
        }
    }
}
