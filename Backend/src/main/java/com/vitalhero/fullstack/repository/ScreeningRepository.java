package com.vitalhero.fullstack.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.vitalhero.fullstack.model.Screening;

public interface ScreeningRepository extends JpaRepository<Screening, Long>{
    
    @Query(
        value = "SELECT * FROM screening WHERE fk_donor = :donorID",
        nativeQuery = true
    )
    List<Screening> allScreening(@Param("donorID") Long donorID);

    @Query(
        value = "UPDATE screening SET fk_donor = :donorID WHERE id = :id",
        nativeQuery = true
    )
    void validate(@Param("id") Long id, @Param("donorID") Long donorID);
}
