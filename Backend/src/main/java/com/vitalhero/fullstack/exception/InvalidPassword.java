package com.vitalhero.fullstack.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidPassword extends RuntimeException{
    public InvalidPassword(String message) {
		super(message);
	}
}
