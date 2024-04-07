package com.vitalhero.fullstack.exceptionhandler;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.fasterxml.jackson.databind.exc.PropertyBindingException;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityInUse;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.exception.EntityNotFoundInTheAppeal;
import com.vitalhero.fullstack.exception.PropertyNotExist;

@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler{
	
	private final HttpStatus STTS_NOT_FOUND = HttpStatus.NOT_FOUND;
	private final HttpStatus STTS_BAD_REQUEST = HttpStatus.BAD_REQUEST;
	private final HttpStatus STTS_CONFLICT = HttpStatus.CONFLICT;
	
	@Autowired 
	private MessageSource messageSource;
	
	@ExceptionHandler(EntityNotFoundInTheAppeal.class)
	public ResponseEntity<?> handleEntityNotFoundInTheAppeal(EntityNotFoundInTheAppeal e, WebRequest request){
		Problem problem = handleProblem(STTS_NOT_FOUND, ProblemType.RESOURCE_NOT_FOUND, e.getMessage());
		return handleExceptionInternal(e, problem, new HttpHeaders(), STTS_NOT_FOUND, request);
	}
	
	@ExceptionHandler(EntityNotFound.class)
	public ResponseEntity<?> handleEntityNotFound(EntityNotFound e, WebRequest request){
		Problem problem = handleProblem(STTS_BAD_REQUEST, ProblemType.RESOURCE_NOT_FOUND, e.getMessage());
		return handleExceptionInternal(e, problem, new HttpHeaders(), STTS_BAD_REQUEST, request);
	}
	
	@ExceptionHandler(EntityAlreadyExists.class)
	public ResponseEntity<?> handleEntityAlreadyExists(EntityAlreadyExists e, WebRequest request){
		Problem problem = handleProblem(STTS_BAD_REQUEST, ProblemType.ENTITY_ALREADY_EXISTS, e.getMessage());
		return handleExceptionInternal(e, problem, new HttpHeaders(), STTS_BAD_REQUEST, request);
	}
	
	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<?> handleDataIntegrityViolantionException(DataIntegrityViolationException e, WebRequest request){
		Problem problem = handleProblem(STTS_BAD_REQUEST, ProblemType.ENTITY_IN_USE, "Essa entidade está relacionada com outras entidades e não pode ser removida");
		return handleExceptionInternal(e, problem, new HttpHeaders(), STTS_BAD_REQUEST, request);
	}
	
	@ExceptionHandler(PropertyNotExist.class)
	public ResponseEntity<?> handlePropertyNotExists(PropertyNotExist e, WebRequest request){
		if(e.getCause() instanceof DataIntegrityViolationException)
			System.out.println(e.getCause());
		Problem problem = handleProblem(STTS_CONFLICT, ProblemType.PROPERTY_NOT_EXIST, e.getMessage());
		return handleExceptionInternal(e, problem, new HttpHeaders(), STTS_CONFLICT, request);
	}
	
	@ExceptionHandler(MethodArgumentTypeMismatchException.class) //PARAMETRO DE URL INEXISTENTE
	public ResponseEntity<?> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e, WebRequest request){
		String detail = String.format("The URl parameter '%s' received the value '%s', which is an invalid type."
				+ " Correct and enter a value compatible with type 'Long'", e.getName(), e.getValue());
		Problem problem = handleProblem(STTS_BAD_REQUEST, ProblemType.INVALID_PARAMETER, detail);
		
		return handleExceptionInternal(e, problem, new HttpHeaders(), STTS_BAD_REQUEST, request);
	}
	
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException e,
			HttpHeaders headers, HttpStatusCode status, WebRequest request) {
		List<Problem.Field> problemFields = e.getBindingResult().getFieldErrors().stream()
				.map(fieldError -> {
					String message = messageSource.getMessage(fieldError, LocaleContextHolder.getLocale());
					return new Problem.Field(fieldError.getField(), message);
				})
				.collect(Collectors.toList());
		
		String detail = "One or more fields are invalid. Fill in correctly and try again.";
		Problem problem = handleProblemWithProblemFields(STTS_BAD_REQUEST, ProblemType.INVALID_DATA, detail, problemFields);
		return handleExceptionInternal(e, problem, new HttpHeaders(), STTS_BAD_REQUEST, request);
	}

	@Override
	protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException e,
			HttpHeaders headers, HttpStatusCode status, WebRequest request) {
		Throwable rootCause = e.getCause();
		
		if(rootCause instanceof InvalidFormatException) { //valor de entrada de atributo não correspondido p
			return handleInvalidFormatException((InvalidFormatException) rootCause, headers, HttpStatus.valueOf(status.value()), request);
		}else if(rootCause instanceof PropertyBindingException) { //valor da propriedade de algum atributo que não existe
			return handlePropertyBindingException((PropertyBindingException) rootCause, headers, HttpStatus.valueOf(status.value()), request);
		}
		Problem problem = handleProblem(HttpStatus.valueOf(status.value()), ProblemType.INCOMPREHENSIBLE_MESSAGE,  "The request body is invalid. Check syntax error.");
		return handleExceptionInternal(e, problem, new HttpHeaders(), status, request);
	}
	
	private ResponseEntity<Object> handlePropertyBindingException(PropertyBindingException e, HttpHeaders headers, HttpStatus status, WebRequest request) {
		String path = e.getPath().stream().map(p -> p.getFieldName()).collect(Collectors.joining("."));
		String detail = String.format("Property '%s' does not exist. Correct and enter a valid property.", path);
		
		Problem problem = handleProblem(status, ProblemType.PROPERTY_NOT_EXIST, detail);
		return handleExceptionInternal(e, problem, headers, status, request);
	}

	public ResponseEntity<Object> handleInvalidFormatException(InvalidFormatException e, HttpHeaders headers, HttpStatus status, WebRequest request){
		String path = e.getPath().stream().map(p -> p.getFieldName()).collect(Collectors.joining("."));		
		String detail = String.format("Property '%s' received value '%s', which is of invalid type. Correct and enter a value compatible with type '%s'."
				, path, e.getValue(), e.getTargetType().getSimpleName());
		
		Problem problem = handleProblem(status, ProblemType.INCOMPREHENSIBLE_MESSAGE, detail);
		return handleExceptionInternal(e, problem, headers, status, request);
	}
	
	@Override
	protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException e, HttpHeaders headers, //URL INEXISTENTE
			HttpStatusCode status, WebRequest request) {
		String detail = String.format("The resource '%s' you tried to access does not exist.", e.getRequestURL());
		Problem problem = handleProblem(HttpStatus.valueOf(status.value()), ProblemType.RESOURCE_NOT_FOUND, detail);
		return handleExceptionInternal(e, problem, headers, status, request);
	}
	
	@Override
	protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers,
			HttpStatusCode status, WebRequest request) {
		
		if(body == null) {
			body = new Problem(LocalDateTime.now(), status.value(), null, HttpStatus.valueOf(status.value()).getReasonPhrase(), null, null);			
		}else if(body instanceof String) {
			body = new Problem(LocalDateTime.now(), status.value(), null, (String) body, null, null);
		}
		return super.handleExceptionInternal(ex, body, headers, status, request);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleExceptionCustom(Exception e, WebRequest request){
		Problem problem = handleProblem(HttpStatus.INTERNAL_SERVER_ERROR, ProblemType.INTERNAL_SERVER_ERROR, "Erro inesperado. Por favor, entre em contato com nosso suporte.");
		return handleExceptionInternal(e, problem, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
	}
	
	private Problem handleProblem(HttpStatus status, ProblemType problemType, String detail) {
		return new Problem(LocalDateTime.now(), status.value(), problemType.getUri(), problemType.getTitle(), detail, null);
	}
	
	private Problem handleProblemWithProblemFields(HttpStatus status, ProblemType problemType, String detail, List<Problem.Field> problemFields) {
		return new Problem(LocalDateTime.now(), status.value(), problemType.getUri(), problemType.getTitle(), detail, problemFields);
	}
}
