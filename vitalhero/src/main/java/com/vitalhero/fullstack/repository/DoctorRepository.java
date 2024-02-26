package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vitalhero.fullstack.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long>{
    
    Doctor findByName(String name);
    Doctor findByCpf(String cpf);
    Doctor findByEmail(String email);
    Doctor findByCrm(String crm);
    Doctor findByPhone(String phone);
}
