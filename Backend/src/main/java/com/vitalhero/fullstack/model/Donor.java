package com.vitalhero.fullstack.model;

import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.vitalhero.fullstack.intrerfaces.User;

import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Donor implements Serializable, User{

    public Donor(String name, String cpf, String email, int age, String gender,
                 String maritalStatus, String address, String photo, String phone,
                 String password, String bloodType) {
        this.name = name;
        this.cpf = cpf;
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
    
    @JsonIgnoreProperties(value = {"bloodcenter", "dateTime"}, allowGetters = true)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne
    @JoinColumn(name = "fk_scheduling")
    private Scheduling scheduling;

    @NotBlank
    @Column(updatable = false, unique = true)
    private String name, cpf;

    @Email
    @NotBlank
    @Column(updatable = true, unique = true)
    private String email;

    @NotNull
    @DecimalMin("16")
    @Column(updatable = true)
    private int age;

    @NotBlank
    private String gender, maritalStatus, address, photo, phone, bloodType; /* Fazer um enum para cada opção */


    @NotBlank
    @Column(updatable = true)
    private String password;

    private String role;

}
