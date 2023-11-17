package com.arquimeda.raf.esb.custom.ws.factory;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.BindingProvider;
import javax.xml.ws.WebServiceClient;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.arquimeda.fluig.ws.workflowengineservice.ECMWorkflowEngineServiceService;
import com.arquimeda.fluig.ws.workflowengineservice.WorkflowEngineService;

public class WorkflowEngineServiceFactory {

	private static Logger logger = LoggerFactory.getLogger(WorkflowEngineServiceFactory.class);
	private static WorkflowEngineService workflowEngineService; 
	
	public static WorkflowEngineService getWorkflowEngineService(String endpoint) {

		if(workflowEngineService == null){
			// Lazy inicialization de WorkflowEngineService
			logger.info("Creando ws contra ECMWorkflowEngineService...");

			URL wsdlUrl = ECMWorkflowEngineServiceService.class.getResource("/wsdl/ECMWorkflowEngineService.wsdl");
			
			WebServiceClient ann = ECMWorkflowEngineServiceService.class.getAnnotation(WebServiceClient.class); 
			ECMWorkflowEngineServiceService workflowEngineServiceService = new ECMWorkflowEngineServiceService(wsdlUrl, new QName(ann.targetNamespace(), ann.name()));
			workflowEngineService = workflowEngineServiceService.getWorkflowEngineServicePort();
			BindingProvider bp = (BindingProvider) workflowEngineService;
			bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, endpoint);
			
			logger.info("Ws contra ECMWorkflowEngineService creado.");
		}

		return workflowEngineService;
		
	}
	
}
