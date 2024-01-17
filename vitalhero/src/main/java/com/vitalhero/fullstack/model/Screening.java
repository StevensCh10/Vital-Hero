package com.vitalhero.fullstack.model;

import java.io.Serializable;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Screening implements Serializable{
    
    private Long id;
    private Long donor_id;
    private Long doctor_id;
    private String q1; /* Definir as perguntas */
    private String q2;
    private String q3;
}
