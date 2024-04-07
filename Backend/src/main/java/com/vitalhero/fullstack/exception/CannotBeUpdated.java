package com.vitalhero.fullstack.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CannotBeUpdated extends RuntimeException{
    
    public CannotBeUpdated(String message){
        super(message);
    }
}
