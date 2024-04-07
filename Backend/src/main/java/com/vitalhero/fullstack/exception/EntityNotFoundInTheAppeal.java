package com.vitalhero.fullstack.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EntityNotFoundInTheAppeal extends RuntimeException{
	
	public EntityNotFoundInTheAppeal(String message) {
		super(message);
	}
}