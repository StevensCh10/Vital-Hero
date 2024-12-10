package com.vitalhero.fullstack.dto;

import com.vitalhero.fullstack.intrerfaces.UserDTO;
import com.vitalhero.fullstack.model.Address;
import com.vitalhero.fullstack.model.Bloodcenter;
import lombok.Builder;

@Builder
public record BloodcenterDTO(Long id, String name, String email, Address address, String phone, String role) implements UserDTO{
    public static BloodcenterDTO fromEntity(Bloodcenter bloodcenter){
        return BloodcenterDTO.builder()
            .id(bloodcenter.getId())
            .name(bloodcenter.getName())
            .email(bloodcenter.getEmail())
            .address(bloodcenter.getAddress())
            .phone(bloodcenter.getPhone())
            .role(bloodcenter.getRole())
            .build();
    }
}