package com.vitalhero.fullstack.model;

import java.io.Serializable;
import java.sql.Date;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Scheduling implements Serializable{

    private Long id;
    private Long bloodcenter_id;
    private Date date;
    private Date hour;
}
