package com.vitalhero.fullstack.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PropertyNotExist extends RuntimeException{
	
	public PropertyNotExist(String message) {
		super(message);
	}
}
