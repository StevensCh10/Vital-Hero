package com.vitalhero.fullstack.model;

import java.io.Serializable;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class BloodStock implements Serializable{

    private Long id;
    private Long bloodcenter_id;
    private float O_positive;
    private float O_negative;
    private float A_positive;
    private float A_negative;
    private float B_positive;
    private float B_negative;
    private float AB_positive;
    private float AB_negative;
}
