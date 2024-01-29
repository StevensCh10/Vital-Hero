package com.vitalhero.fullstack.model;

import java.io.Serializable;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.Valid;
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
public class Donor implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long id;
    
    @JoinColumn(name = "fk_scheduling")
    @ManyToOne
    @Valid
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
    private String gender, maritalStatus, address, photo, phone; /* Fazer um enum para cada opção */

    @NotBlank
    @Column(updatable = true)
    private String password;

}
