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

import com.arquimeda.fluig.ws.workflowengineservice.ECMWorkflowEngineServiceService;
import com.arquimeda.fluig.ws.workflowengineservice.WorkflowEngineService;
import com.arquimeda.ic.fdn.boundary.ParameterEJB;
import com.arquimeda.ic.utils.SOAPInvocationContextHandler;

@ApplicationScoped
public class WorkflowEngineServiceProducer {

	@Inject
	Logger logger;
	
	@Inject
	ParameterEJB parameterEjb;

	@Produces
	public WorkflowEngineService getWorkflowEngineService() {

		// Lazy inicialization de WorkflowEngineService
		logger.info("Creando ws contra ECM WorkflowEngineService...");

		String endpoint = parameterEjb.getParameter("fluig.workflowengineservice.endpoint");
		
		URL wsdlUrl = ECMWorkflowEngineServiceService.class.getResource("/wsdl/ECMWorkflowEngineService.wsdl");
		
		WebServiceClient ann = ECMWorkflowEngineServiceService.class.getAnnotation(WebServiceClient.class); 
		ECMWorkflowEngineServiceService workflowEngineServiceService = new ECMWorkflowEngineServiceService(wsdlUrl, new QName(ann.targetNamespace(), ann.name()));
		WorkflowEngineService workflowEngineService = workflowEngineServiceService.getWorkflowEngineServicePort();
		BindingProvider bp = (BindingProvider) workflowEngineService;
		bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, endpoint);
		
		Binding binding = bp.getBinding();
		List<Handler> handlerChain = binding.getHandlerChain();
		handlerChain.add(new SOAPInvocationContextHandler());
		binding.setHandlerChain(handlerChain);
				
		logger.info("Ws contra ECM WorkflowEngineService creado.");

		return workflowEngineService;
		
	}
	
}
