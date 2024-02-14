package com.vitalhero.fullstack.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
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
    @Column(updatable = false)
    private Long id;

    @JsonIgnoreProperties(value = {"name", "institutionalEmail", "address", "referencePoint", "photo", "phone"}, allowGetters = true)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JoinColumn(name = "fk_bloodcenter")
    @OneToOne
    //@Valid
    private BloodCenter bloodcenter;

    @NotBlank
    @Column(updatable = true)
    private float O_positive, O_negative, A_positive, A_negative, B_positive, B_negative, AB_positive, AB_negative;
}
