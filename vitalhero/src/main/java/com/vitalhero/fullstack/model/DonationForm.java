package com.vitalhero.fullstack.model;

import java.io.Serializable;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class DonationForm implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    @Column(updatable = false)
    private Long id;

    @JoinColumn(name = "fk_donor")
    @OneToOne
    @Valid
    private Donor donor;
    
    @NotBlank
    @Column(updatable = true)
    private String q1, q2, q3, q4, q5, q6, q7, q8; /* Definir as perguntas no front e no back serão salvas as respostas*/
}
