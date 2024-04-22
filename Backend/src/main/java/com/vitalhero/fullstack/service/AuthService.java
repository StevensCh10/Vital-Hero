package com.vitalhero.fullstack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.exception.EntityNotFoundInTheAppeal;
import com.vitalhero.fullstack.intrerfaces.User;
import com.vitalhero.fullstack.model.BloodCenter;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.repository.BloodCenterRepository;
import com.vitalhero.fullstack.repository.DoctorRepository;
import com.vitalhero.fullstack.repository.DonorRepository;

@Service
public class AuthService {

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private BloodCenterRepository bloodcenterRepository;

    public User authenticate(String email, String password) {
        // Primeiro, tenta encontrar o usuário no repositório de Donor
        Donor donor = donorRepository.findByEmail(email);
        if (donor != null && donor.getPassword().equals(password)) {
            return donor;
        }

        // Se não encontrar no repositório de Donor, tenta no repositório de Doctor
        Doctor doctor = doctorRepository.findByEmail(email);
        if (doctor != null && doctor.getPassword().equals(password)) {
            return doctor;
        }

        // Se não encontrar no repositório de Doctor, tenta no repositório de Bloodcenter
        BloodCenter bloodcenter = bloodcenterRepository.findByEmail(email);
        if (bloodcenter != null && bloodcenter.getPassword().equals(password)) {
            return bloodcenter;
        }

        // Se não encontrar em nenhum dos repositórios, retorna null
        throw new EntityNotFoundInTheAppeal("Credenciais Inválidas");
    }
}
