package com.vitalhero.fullstack.model;

import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Donor implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    @Column(updatable = false)
    private Long id;
    
    @JoinColumn(name = "fk_scheduling")
    @ManyToOne
    @Valid
    private Long scheduling_id;

    @NotBlank
    @Column(updatable = false, unique = true)
    private String name, cpf;

    @Email
    @NotBlank
    @Column(updatable = true, unique = true)
    private String email;

    @NotBlank
    @DecimalMin("16")
    @Column(updatable = true)
    private int age;

    @NotBlank
    private String gender, maritalStatus, address, photo, phone; /* Fazer um enum para cada opção */

    @NotBlank
    @Column(updatable = true)
    private String password;

}
