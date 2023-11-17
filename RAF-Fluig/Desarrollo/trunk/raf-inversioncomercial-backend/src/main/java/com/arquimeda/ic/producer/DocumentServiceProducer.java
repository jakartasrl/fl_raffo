package com.arquimeda.ic.producer;

import java.net.URL;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.xml.namespace.QName;
import javax.xml.ws.Binding;
import javax.xml.ws.BindingProvider;
import javax.xml.ws.WebServiceClient;
import javax.xml.ws.handler.Handler;

import org.slf4j.Logger;

import com.arquimeda.fluig.ws.documentservice.DocumentService;
import com.arquimeda.fluig.ws.documentservice.ECMDocumentServiceService;
import com.arquimeda.ic.fdn.boundary.ParameterEJB;
import com.arquimeda.ic.utils.SOAPInvocationContextHandler;

@ApplicationScoped
public class DocumentServiceProducer {

	@Inject
	Logger logger;
	
	@Inject
	ParameterEJB parameterEjb;

	@Produces
	public DocumentService getDocumentService() {

		// Lazy inicialization de DocumentService
		logger.info("Creando ws contra ECM DocumentService...");

		String endpoint = parameterEjb.getParameter("fluig.documentservice.endpoint");
		
		URL wsdlUrl = ECMDocumentServiceService.class.getResource("/wsdl/ECMDocumentService.wsdl");
		
		WebServiceClient ann = ECMDocumentServiceService.class.getAnnotation(WebServiceClient.class); 
		ECMDocumentServiceService documentServiceService = new ECMDocumentServiceService(wsdlUrl, new QName(ann.targetNamespace(), ann.name()));
		DocumentService documentService = documentServiceService.getDocumentServicePort();
		BindingProvider bp = (BindingProvider) documentService;
		bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, endpoint);
		
		Binding binding = bp.getBinding();
		List<Handler> handlerChain = binding.getHandlerChain();
		handlerChain.add(new SOAPInvocationContextHandler());
		binding.setHandlerChain(handlerChain);
				
		logger.info("Ws contra ECM DocumentService creado.");

		return documentService;
		
	}
	
}
