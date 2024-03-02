package com.vitalhero.fullstack.exceptionhandler;

import lombok.Getter;

@Getter
public enum UserMessageProblem {
	
	SYSTEM_ERROR("An unexpected internal system error has occurred. Please try again and if the error persists, please contact us."),
	ENTITY_IN_USE("The resource cannot be deleted because it is related to another resource(s).");
	
	String userMessage;
	
	private UserMessageProblem(String userMessage) {
		this.userMessage = userMessage;
	}
}
