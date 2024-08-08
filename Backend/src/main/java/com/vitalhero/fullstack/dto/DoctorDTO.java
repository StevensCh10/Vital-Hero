package com.vitalhero.fullstack.dto;

import com.vitalhero.fullstack.intrerfaces.UserDTO;
import com.vitalhero.fullstack.model.Doctor;

public record DoctorDTO(Long id, String name, String crm, String email, int age, String gender, String maritalStatus, String address, String photo, String phone) implements UserDTO{
    public static DoctorDTO fromEntity(Doctor doctor){
        return new DoctorDTO(
            doctor.getId(),
            doctor.getName(),
            doctor.getCrm(),
            doctor.getEmail(),
            doctor.getAge(),
            doctor.getGender(),
            doctor.getMaritalStatus(),
            doctor.getAddress(),
            doctor.getPhoto(),
            doctor.getPhone()
        );
    }
}