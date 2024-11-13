package com.vitalhero.fullstack.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.vitalhero.fullstack.intrerfaces.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
public class Doctor implements Serializable, User{

    public Doctor(String name, String cpf, String crm, String email, int age, String gender,
                 String maritalStatus, Address address, String phone,
                 String password) {
        this.name = name;
        this.cpf = cpf;
        this.crm = crm;
        this.email = email;
        this.age = age;
        this.gender = gender;
        this.maritalStatus = maritalStatus;
        this.address = address;
        this.phone = phone;
        this.password = password;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long id;

    @JsonIgnoreProperties(value = {"cep", "street", "additionalInfo", "neighborhood", "city", "stateCode", "state", "region"}, allowGetters = true)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne
    @JoinColumn(name = "fk_address")
    private Address address;

    @NotBlank
    @Column(updatable = false, unique = true)
    private String name, cpf, crm;
    
    @Email
    @NotBlank
    @Column(updatable = false, unique = true)
    private String email;

    @NotNull
    @DecimalMin("18")
    @Column(nullable = false)
    private int age;

    @NotBlank
    private String gender, maritalStatus, phone;

    @NotBlank
    @Column(updatable = true)
    private String password;

    private String role;
}