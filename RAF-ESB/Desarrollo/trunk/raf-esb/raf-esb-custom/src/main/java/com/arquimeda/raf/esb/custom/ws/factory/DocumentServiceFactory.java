package com.arquimeda.raf.esb.custom.ws.factory;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.BindingProvider;
import javax.xml.ws.WebServiceClient;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.arquimeda.esb.ws.esbwebservice.Ws;
import com.arquimeda.fluig.ws.documentservice.DocumentService;
import com.arquimeda.fluig.ws.documentservice.ECMDocumentServiceService;

public class DocumentServiceFactory {

	private static Logger logger = LoggerFactory.getLogger(DocumentServiceFactory.class);
	private static DocumentService documentService;

	public static DocumentService getDocumentService(String endpoint) {

		if(documentService == null){

			logger.info("Creando ECMDocumentService contra TOTVS ESB...");

			URL wsdlUrl = Ws.class.getResource("/wsdl/ECMDocumentService.wsdl");

			WebServiceClient ann = ECMDocumentServiceService.class.getAnnotation(WebServiceClient.class); 
			ECMDocumentServiceService documentServiceService = new ECMDocumentServiceService(wsdlUrl, new QName(ann.targetNamespace(), ann.name()));
			documentService = documentServiceService.getDocumentServicePort();
			BindingProvider bp = (BindingProvider) documentService;
			bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, endpoint);
			
			logger.info("Ws contra ECMDocumentService creado.");
			
		}

		return documentService;
		
	}

}
