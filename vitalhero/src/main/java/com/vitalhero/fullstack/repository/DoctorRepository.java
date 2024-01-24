package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vitalhero.fullstack.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long>{
    
}
