package com.vitalhero.fullstack.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CannotBeScheduling extends RuntimeException{
    
    public CannotBeScheduling(String message){
        super(message);
    }
}
