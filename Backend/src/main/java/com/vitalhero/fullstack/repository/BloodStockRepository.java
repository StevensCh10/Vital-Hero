package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vitalhero.fullstack.model.BloodStock;

public interface BloodStockRepository extends JpaRepository<BloodStock, Long>{
    
    @Query(
        value = "SELECT * FROM blood_stock WHERE fk_bloodcenter = :bloodcenterID" + "",
        nativeQuery = true
    )
    BloodStock findBloodStockByBloodcenter(@Param("bloodcenterID") Long bloodcenterID);
}
