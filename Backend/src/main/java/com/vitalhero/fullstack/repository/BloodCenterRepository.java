package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.vitalhero.fullstack.model.BloodCenter;

public interface BloodCenterRepository extends JpaRepository<BloodCenter, Long>{
    
    @Query(
        value = "SELECT * FROM donor WHERE email = :email AND password = :password",
        nativeQuery = true
    )
    BloodCenter checkLogin(@Param("email") String email, @Param("password") String password);
    BloodCenter findByName(String name);
    BloodCenter findByEmail(String email);
    BloodCenter findByAddress(String address);
    BloodCenter findByPhone(String phone);
}
