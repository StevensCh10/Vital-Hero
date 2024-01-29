package com.vitalhero.fullstack.repository;

import java.util.ArrayList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.vitalhero.fullstack.model.Screening;

public interface ScreeningRepository extends JpaRepository<Screening, Long>{
    
    @Query(
        value = "SELECT * FROM screening WHERE fk_donor = :donorID",
        nativeQuery = true
    )
    ArrayList<Screening> allScreenings(@Param("donorID") Long donorID);
}
