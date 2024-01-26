package com.vitalhero.fullstack.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.vitalhero.fullstack.service.BloodCenterService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/bloodcenter")
public class BloodCenterController {

    private final BloodCenterService service;

    public BloodCenterController(BloodCenterService service){
        this.service = service;
    }
    
}
