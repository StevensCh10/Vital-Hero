package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vitalhero.fullstack.model.BloodCenter;

public interface BloodCenterRepository extends JpaRepository<BloodCenter, Long>{
    
    BloodCenter findByName(String name);
    BloodCenter findByInstitutionalEmail(String emailInstitutional);
    BloodCenter findByAddress(String address);
    BloodCenter findByPhone(String phone);
}
