package com.vitalhero.fullstack.model;

import java.io.Serializable;

import javax.persistence.Id;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class BloodCenter implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    @Column(updatable = false)
    private Long id;

    @NotBlank
    @Column(updatable = false)
    private String name, institutional_email, address, reference_point, photo;

    @NotBlank
    private String phone;
}
