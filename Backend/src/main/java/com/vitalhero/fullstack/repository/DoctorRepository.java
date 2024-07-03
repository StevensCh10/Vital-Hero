package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.vitalhero.fullstack.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long>{
    
    @Query(
        value = "SELECT * FROM donor WHERE email = :email AND password = :password" + "",
        nativeQuery = true
    )
    Doctor checkLogin(@Param("email") String email, @Param("password") String password);
    Doctor findByName(String name);
    Doctor findByCpf(String cpf);
    Doctor findByEmail(String email);
    Doctor findByCrm(String crm);
    Doctor findByPhone(String phone);
}
