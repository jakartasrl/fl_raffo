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

import com.arquimeda.fluig.ws.datasetservice.DatasetService;
import com.arquimeda.fluig.ws.datasetservice.ECMDatasetServiceService;
import com.arquimeda.ic.fdn.boundary.ParameterEJB;
import com.arquimeda.ic.utils.SOAPInvocationContextHandler;

@ApplicationScoped
public class DatasetServiceProducer {

	@Inject
	Logger logger;
	
	@Inject
	ParameterEJB parameterEjb;

	@Produces
	public DatasetService getDatasetService() {

		// Lazy inicialization de WorkflowEngineService
		logger.info("Creando ws contra ECM DatasetService...");

		String endpoint = parameterEjb.getParameter("fluig.datasetservice.endpoint");
		
		URL wsdlUrl = ECMDatasetServiceService.class.getResource("/wsdl/ECMDatasetService.wsdl");
		
		WebServiceClient ann = ECMDatasetServiceService.class.getAnnotation(WebServiceClient.class); 
		ECMDatasetServiceService datasetServiceService = new ECMDatasetServiceService(wsdlUrl, new QName(ann.targetNamespace(), ann.name()));
		DatasetService dsService = datasetServiceService.getDatasetServicePort();
		BindingProvider bp = (BindingProvider) dsService;
		bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, endpoint);
		
		Binding binding = bp.getBinding();
		List<Handler> handlerChain = binding.getHandlerChain();
		handlerChain.add(new SOAPInvocationContextHandler());
		binding.setHandlerChain(handlerChain);
				
		logger.info("Ws contra ECM DatasetService creado.");

		return dsService;
		
	}
	
}
