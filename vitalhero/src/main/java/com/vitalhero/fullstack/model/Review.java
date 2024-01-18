package com.vitalhero.fullstack.model;

import java.io.Serializable;
import javax.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Review implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    @Column(updatable = false)
    private Long id;

    @JoinColumn(name = "fk_donor")
    @OneToOne
    @Valid
    private Long donor_id;

    @NotBlank
    @Column(updatable = true)
    private float rating;

    @NotBlank
    @Column(updatable = true)
    private String feedback;
}
