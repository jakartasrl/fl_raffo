package com.arquimeda.ic.rest.config;

import java.util.Optional;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.hibernate.exception.ConstraintViolationException;

import com.arquimeda.ic.utils.I18n;

public class ErrorResponse {

	private Throwable throwable;
	private PersistenceAction persistenceAction;
	
	
	public static ErrorResponse fromException(Throwable throwable) {
		ErrorResponse errorResponse = new ErrorResponse();
		errorResponse.throwable(throwable);
		return errorResponse;
	}

	public Response build() {
		
		// Valores por defecto
		Status status = Response.Status.INTERNAL_SERVER_ERROR;
		String mensaje = Optional.ofNullable(throwable).map(t->t.getMessage()).orElse(""); 
		
		if (persistenceAction != null) {
			
			ConstraintViolationException cve = findFirstCauseOf(throwable, ConstraintViolationException.class);
			if (cve != null && cve.getConstraintName() != null) {
				status = Response.Status.BAD_REQUEST;
				mensaje = I18n.getString("db.constraint."+persistenceAction.name() + "." + cve.getConstraintName());
			}
			
		}
		
		return Response.status(status)
				.entity(mensaje)
				.build();
	}

	private <T> T findFirstCauseOf(Throwable throwable, Class<T> clazz) {
		
		while (throwable != null) {
			if (throwable.getClass().isAssignableFrom(clazz)) {
				return (T)throwable;
			} if (throwable == throwable.getCause()) {
				return null;
			}
			throwable = throwable.getCause();
		}
		
		return null;
	}
	

	public ErrorResponse throwable(Throwable throwable) {
		this.throwable = throwable;
		return this;
	}

	public ErrorResponse persistenceAction(PersistenceAction persistenceAction) {
		this.persistenceAction = persistenceAction;
		return this;
	}
	

	public enum PersistenceAction{
		DELETE,
		SAVE,
		FIND
	}
	
}
