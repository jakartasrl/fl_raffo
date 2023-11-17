package com.arquimeda.raf.esb.custom.ws.factory;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.BindingProvider;
import javax.xml.ws.WebServiceClient;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.arquimeda.fluig.ws.cardservice.CardService;
import com.arquimeda.fluig.ws.cardservice.ECMCardServiceService;

public class CardServiceFactory {

	private static Logger logger = LoggerFactory.getLogger(CardServiceFactory.class);
	private static CardService cardService; 
	
	public static CardService getCardService(String endpoint) {

		if(cardService == null){
			// Lazy inicialization de cardService
			logger.info("Creando ws contra ECMCardService...");

			URL wsdlUrl = ECMCardServiceService.class.getResource("/wsdl/ECMCardService.wsdl");
			
			WebServiceClient ann = ECMCardServiceService.class.getAnnotation(WebServiceClient.class); 
			ECMCardServiceService cardServiceService = new ECMCardServiceService(wsdlUrl, new QName(ann.targetNamespace(), ann.name()));
			cardService = cardServiceService.getCardServicePort();
			BindingProvider bp = (BindingProvider) cardService;
			bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, endpoint);
			
			logger.info("Ws contra ECMCardService creado.");
		}

		return cardService;
		
	}
	
}
