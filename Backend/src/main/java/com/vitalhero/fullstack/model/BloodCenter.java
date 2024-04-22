package com.vitalhero.fullstack.model;

import java.io.Serializable;

import com.vitalhero.fullstack.intrerfaces.User;

import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class BloodCenter implements Serializable, User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long id;

    @NotBlank
    @Column(updatable = false, unique = true)
    private String name, email, address, referencePoint, photo;

    @NotBlank
    @Column(updatable = true)
    private String password;

    @NotBlank
    private String phone;

    private String role;
}
