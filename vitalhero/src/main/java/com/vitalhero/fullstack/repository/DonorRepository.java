package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import com.vitalhero.fullstack.model.Donor;

public interface DonorRepository extends JpaRepository<Donor, Long>{
    
    @Query(
        value = "SELECT * FROM donor WHERE email = :email AND password = :password",
        nativeQuery = true
    )
    Donor checkLogin(@Param("email") String email, @Param("password") String password);

    @Transactional
    @Modifying
    @Query(
        value = "UPDATE donor SET fk_scheduling = :schedulingID WHERE id = :donorID",
        nativeQuery = true
    )
    void updateFkScheduling(@Param("schedulingID")Long schedulingID, @Param("donorID") Long donorID);
    
    @Transactional
    @Modifying
    @Query(
        value = "UPDATE donor SET fk_scheduling = NULL WHERE id = :id",
        nativeQuery = true
    )
    void FkSchedulingToNull(@Param("id") Long id);

    Donor findByEmail(String email);
    Donor findByName(String name);
    Donor findByCpf(String cpf);
}
