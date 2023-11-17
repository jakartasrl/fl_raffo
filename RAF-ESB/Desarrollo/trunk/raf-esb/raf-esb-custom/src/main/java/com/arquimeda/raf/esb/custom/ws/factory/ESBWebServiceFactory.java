package com.arquimeda.raf.esb.custom.ws.factory;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.BindingProvider;
import javax.xml.ws.WebServiceClient;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.arquimeda.esb.ws.esbwebservice.ESBWebService;
import com.arquimeda.esb.ws.esbwebservice.Ws;

public class ESBWebServiceFactory {

	private static Logger logger = LoggerFactory.getLogger(ESBWebServiceFactory.class);
	private static ESBWebService esbWebService;

	public static ESBWebService getESBWebService(String endpoint) {

		if(esbWebService == null){

			logger.info("Creando ESBWebService contra TOTVS ESB...");

			URL wsdlUrl = Ws.class.getResource("/wsdl/ESBWebService.wsdl");

			WebServiceClient ann = Ws.class.getAnnotation(WebServiceClient.class); 
			Ws esbWebServiceService = new Ws(wsdlUrl, new QName(ann.targetNamespace(), ann.name()));
			esbWebService = esbWebServiceService.getESBWebServiceImplPort();
			BindingProvider bp = (BindingProvider) esbWebService;
			bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, endpoint);

			logger.info("ESBWebService contra TOTVS ESB creado satisfactoriamente.");
			
		}

		return esbWebService;
		
	}

}
