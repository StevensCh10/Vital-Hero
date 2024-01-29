package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.vitalhero.fullstack.model.Donor;

public interface DonorRepository extends JpaRepository<Donor, Long>{
    
    @Query(
        value = "SELECT * FROM donor WHERE email = :email AND password = :password",
        nativeQuery = true
    )
    Donor checkLogin(@Param("email") String email, @Param("password") String password);
    Donor findByEmail(String email);
    Donor findByName(String name);
}
