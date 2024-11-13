package com.vitalhero.fullstack.dto;

import com.vitalhero.fullstack.intrerfaces.UserDTO;
import com.vitalhero.fullstack.model.Address;
import com.vitalhero.fullstack.model.BloodCenter;

import lombok.Builder;

@Builder
public record BloodCenterDTO(Long id, String name, String email, Address address, String phone, String role) implements UserDTO{
    public static BloodCenterDTO fromEntity(BloodCenter bloodcenter){
        return BloodCenterDTO.builder()
            .id(bloodcenter.getId())
            .name(bloodcenter.getName())
            .email(bloodcenter.getEmail())
            .address(bloodcenter.getAddress())
            .phone(bloodcenter.getPhone())
            .role(bloodcenter.getRole())
            .build();
    }
}