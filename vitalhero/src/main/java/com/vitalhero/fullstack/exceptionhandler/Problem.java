package com.vitalhero.fullstack.exceptionhandler;

import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.AllArgsConstructor;
import lombok.Data;

@JsonInclude(Include.NON_NULL)
@Data
@AllArgsConstructor
public class Problem {
	
	private LocalDateTime timestamp;
	private Integer status;
	private String type, title, detail, userMessage;
	private List<Field> fields;
	
	@Data
	@AllArgsConstructor
	public static class Field{
		private String name;
		private String userMessage;
	}
}