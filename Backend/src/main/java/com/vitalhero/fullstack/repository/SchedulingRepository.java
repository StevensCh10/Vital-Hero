package com.vitalhero.fullstack.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.vitalhero.fullstack.model.Scheduling;

public interface SchedulingRepository extends JpaRepository<Scheduling, Long>{
    
    @Query(
        value = "SELECT * FROM scheduling WHERE fk_bloodcenter = :bcID "+
                "AND date_time = :dateTime",
        nativeQuery = true
    )
    Scheduling findByBloodCenterAndDateAndHour(@Param("bcID") Long bcID,
     @Param("dateTime") LocalDateTime dateTime);

    @Query(
        value = "SELECT * FROM scheduling WHERE fk_bloodcenter = :bcID" + "",
        nativeQuery = true
    )
    List<Scheduling> allScheduling(@Param("bcID") Long bcID);
}