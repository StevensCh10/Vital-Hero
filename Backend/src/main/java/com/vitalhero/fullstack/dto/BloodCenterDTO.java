package com.vitalhero.fullstack.dto;

import com.vitalhero.fullstack.intrerfaces.UserDTO;
import com.vitalhero.fullstack.model.BloodCenter;

public record BloodCenterDTO(Long id, String name, String email, String address, String referencePoint, String phone, String role) implements UserDTO{
    public static BloodCenterDTO fromEntity(BloodCenter bloodcenter){
        return new BloodCenterDTO(
            bloodcenter.getId(),
            bloodcenter.getName(),
            bloodcenter.getEmail(),
            bloodcenter.getAddress(),
            bloodcenter.getReferencePoint(),
            bloodcenter.getPhone(),
            bloodcenter.getRole()
        );
    }
}