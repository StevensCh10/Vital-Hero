package com.vitalhero.fullstack.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class EntityInUse extends RuntimeException{
	
	public EntityInUse(String message) {
		super(message);
	}
}