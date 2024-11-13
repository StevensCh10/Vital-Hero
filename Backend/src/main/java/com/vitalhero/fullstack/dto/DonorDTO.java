package com.vitalhero.fullstack.dto;

import com.vitalhero.fullstack.intrerfaces.UserDTO;
import com.vitalhero.fullstack.model.Address;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.model.Scheduling;

import lombok.Builder;

@Builder
public record DonorDTO(Long id, Scheduling scheduling, String name, String email, int age, String gender, String maritalStatus, Address address, String phone, String bloodType, String role) implements UserDTO{
    public static DonorDTO fromEntity(Donor donor){
        return DonorDTO.builder()
            .id(donor.getId())
            .name(donor.getName())
            .email(donor.getEmail())
            .age(donor.getAge())
            .gender(donor.getGender())
            .maritalStatus(donor.getMaritalStatus() )
            .address(donor.getAddress())
            .phone(donor.getPhone())
            .role(donor.getRole())
            .build();
    }
}