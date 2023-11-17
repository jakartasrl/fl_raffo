package com.arquimeda.raf.producer;

import java.io.Serializable;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;

import org.slf4j.Logger;

@ApplicationScoped
public class LoggerProducer implements Serializable {

	private static final long serialVersionUID = 1L;

	@Produces
	public Logger createLogger(InjectionPoint ip) {
		
		Logger logger = org.slf4j.LoggerFactory.getLogger(ip.getMember().getDeclaringClass());		
		return logger;
		
	}
	
}
