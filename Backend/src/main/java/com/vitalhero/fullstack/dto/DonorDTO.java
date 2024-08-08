package com.vitalhero.fullstack.dto;

import com.vitalhero.fullstack.intrerfaces.UserDTO;
import com.vitalhero.fullstack.model.Donor;

public record DonorDTO(Long id, String name, String email, int age, String gender, String maritalStatus, String address, String photo, String phone, String bloodType) implements UserDTO{
    public static DonorDTO fromEntity(Donor donor){
        return new DonorDTO(
            donor.getId(),
            donor.getName(),
            donor.getEmail(),
            donor.getAge(),
            donor.getGender(),
            donor.getMaritalStatus(),
            donor.getAddress(),
            donor.getPhoto(),
            donor.getPhone(),
            donor.getBloodType()
        );
    }
}