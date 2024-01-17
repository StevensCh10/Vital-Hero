package com.vitalhero.fullstack.model;

import java.io.Serializable;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Donor implements Serializable{

    private Long id;
    private Long scheduling_id;
    private String name;
    private String cpf;
    private String email;
    private int age;
    private String gender;
    private String maritalStatus; /* Fazer um enum para cada opção */
    private String address;
    private String photo;
    private String phone;
    private String password;

}
