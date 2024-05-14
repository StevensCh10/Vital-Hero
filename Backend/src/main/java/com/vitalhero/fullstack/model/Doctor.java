package com.vitalhero.fullstack.model;

import java.io.Serializable;
import com.vitalhero.fullstack.intrerfaces.User;

import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Doctor implements Serializable, User{

    public Doctor(String name, String cpf, String crm, String email, int age, String gender,
                 String maritalStatus, String address, String photo, String phone,
                 String password) {
        this.name = name;
        this.cpf = cpf;
        this.crm = crm;
        this.email = email;
        this.age = age;
        this.gender = gender;
        this.maritalStatus = maritalStatus;
        this.address = address;
        this.photo = photo;
        this.phone = phone;
        this.password = password;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long id;

    @NotBlank
    @Column(updatable = false, unique = true)
    private String name, cpf, crm;
    
    @Email
    @NotBlank
    @Column(updatable = false, unique = true)
    private String email;

    @NotNull
    @DecimalMin("16")
    @Column(nullable = false)
    private int age;

    @NotBlank
    private String gender, maritalStatus, address, photo, phone; /* Fazer um enum para cada opção */

    @NotBlank
    @Column(updatable = true)
    private String password;

    private String role;

}
