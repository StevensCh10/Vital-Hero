package com.vitalhero.fullstack.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Screening implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    @Column(updatable = false)
    private Long id;

    @JoinColumn(name = "fk_donor")
    @ManyToOne
    @Valid
    private Long donor_id;

    @JoinColumn(name = "fk_doctor")
    @OneToOne
    @Valid
    private Long doctor_id;

    @NotBlank
    @Column(updatable = true)
    private String q1, q2, q3, q4, q5, q6, q7, q8; /* Definir as perguntas no front e no back serão salvas as respostas*/
}
