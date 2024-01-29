package com.vitalhero.fullstack.model;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Screening implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long id;

    @JoinColumn(name = "fk_donor")
    @ManyToOne
    @Valid
    private Donor donor;

    @JoinColumn(name = "fk_doctor")
    @OneToOne
    @Valid
    private Doctor doctor;

    @NotBlank
    @Column(updatable = true)
    private String q1, q2, q3, q4, q5, q6, q7, q8; /*Definir as perguntas no front e no back serão salvas as respostas*/
}
