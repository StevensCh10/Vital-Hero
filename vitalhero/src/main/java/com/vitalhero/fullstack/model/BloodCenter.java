package com.vitalhero.fullstack.model;

import java.io.Serializable;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class BloodCenter implements Serializable{

    private Long id;
    private String name;
    private String institutional_email;
    private String address;
    private String reference_point;
    private String photo;
    private String phone;
}
