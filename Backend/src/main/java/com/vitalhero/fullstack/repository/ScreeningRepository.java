package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import com.vitalhero.fullstack.model.Screening;

public interface ScreeningRepository extends JpaRepository<Screening, Long>{
    
    @Query(
        value = "SELECT * FROM screening WHERE fk_donor = :donorID" + "",
        nativeQuery = true
    )
    Screening findByDonor(Long donorID);

    @Transactional
    @Modifying
    @Query(
        value = "UPDATE screening SET fk_doctor = :doctorID WHERE id = :id" + "",
        nativeQuery = true
    )
    void validate(@Param("id") Long id, @Param("doctorID") Long doctorID);
}
