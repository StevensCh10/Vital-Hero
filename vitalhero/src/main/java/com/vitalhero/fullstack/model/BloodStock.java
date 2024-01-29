package com.vitalhero.fullstack.model;

import java.io.Serializable;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class BloodStock implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    @Column(updatable = false)
    private Long id;

    @JoinColumn(name = "fk_bloodcenter")
    @OneToOne
    @Valid
    private BloodCenter bloodcenter;

    @NotBlank
    @Column(updatable = true)
    private float O_positive, O_negative, A_positive, A_negative, B_positive, B_negative, AB_positive, AB_negative;
}
