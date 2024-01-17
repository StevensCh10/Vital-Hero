package com.vitalhero.fullstack.model;

import java.io.Serializable;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Review implements Serializable{
    
    private Long id;
    private Long donor_id;
    private float rating;
    private String feedback;
}
