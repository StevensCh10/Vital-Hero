package com.vitalhero.fullstack.model;

import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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

    @JsonIgnoreProperties(value = {"scheduling", "name", "cpf", "email", "age", "gender", "maritalStatus", "address", "photo", "phone", "password"}, allowGetters = true)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JoinColumn(name = "fk_donor")
    @ManyToOne
    //@Valid
    private Donor donor;

    @JsonIgnoreProperties(value = {"name", "cpf", "crm", "email", "age", "gender", "maritalStatus", "address", "photo", "phone", "password"}, allowGetters = true)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JoinColumn(name = "fk_doctor")
    @OneToOne
    //@Valid
    private Doctor doctor;

    @NotBlank
    @Column(updatable = true)
    private String q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24; /*Definir as perguntas no front e no back serão salvas as respostas*/
}
