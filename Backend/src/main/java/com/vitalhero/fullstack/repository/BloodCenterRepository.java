package com.vitalhero.fullstack.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vitalhero.fullstack.model.Address;
import com.vitalhero.fullstack.model.Bloodcenter;

public interface BloodcenterRepository extends JpaRepository<Bloodcenter, Long>{
    
    @Query(
        value = "SELECT * FROM donor WHERE email = :email AND password = :password" + "",
        nativeQuery = true
    )
    Bloodcenter checkLogin(@Param("email") String email, @Param("password") String password);
    Bloodcenter findByName(String name);
    Bloodcenter findByEmail(String email);
    Bloodcenter findByAddress(Address address);
    Bloodcenter findByPhone(String phone);
    Optional<Bloodcenter> findByNameOrEmailOrAddressOrPhone(String name, String email, Address address, String phone);
}
