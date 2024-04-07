package com.vitalhero.fullstack.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.vitalhero.fullstack.model.BloodStock;

public interface BloodStockRepository extends JpaRepository<BloodStock, Long>{
    
    @Query(
        value = "SELECT * FROM blood_stock WHERE fk_bloodcenter = :bloodCenterID",
        nativeQuery = true
    )
    BloodStock findByBloodCenter(@Param("bloodCenterID") Long bloodCenterID);
}
