package com.vitalhero.fullstack.dto;

import com.vitalhero.fullstack.intrerfaces.UserDTO;
import com.vitalhero.fullstack.model.Address;
import com.vitalhero.fullstack.model.Doctor;
import lombok.Builder;

@Builder
public record DoctorDTO(Long id, String name, String crm, String email, int age, String gender, String maritalStatus, Address address, String phone, String role) implements UserDTO{
    public static DoctorDTO fromEntity(Doctor doctor){
        return DoctorDTO.builder()
            .id(doctor.getId())
            .name(doctor.getName())
            .crm(doctor.getCrm())
            .email(doctor.getEmail())
            .age(doctor.getAge())
            .gender(doctor.getGender())
            .maritalStatus(doctor.getMaritalStatus() )
            .address(doctor.getAddress())
            .phone(doctor.getPhone())
            .role(doctor.getRole())
            .build();   
    }
}