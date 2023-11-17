package com.arquimeda.raf.web.i18n;

import java.io.Serializable;

import javax.enterprise.inject.spi.InjectionPoint;
import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.arquimeda.daffy.i18n.AbstractMessages;
import com.arquimeda.daffy.i18n.App;
import com.arquimeda.daffy.i18n.Messages;

/**
 * Internacionalizacion del Proyecto Web.
 * 
 */
@App
public class RafWebMessages extends AbstractMessages implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private RafWebMessages(InjectionPoint injectionPoint, Logger logger) {
		
		super.init(logger, "i18n.messages");
		if(injectionPoint != null){
			setDefaultClass(injectionPoint.getMember().getDeclaringClass());			
		}
		
	}

	public static Messages getInstance() {
		return new RafWebMessages(null,LoggerFactory.getLogger(RafWebMessages.class));
	}

}
