package com.arquimeda.ic.admin.boundary;

import java.net.URL;
import java.util.List;

import javax.xml.namespace.QName;
import javax.xml.ws.Binding;
import javax.xml.ws.BindingProvider;
import javax.xml.ws.WebServiceClient;
import javax.xml.ws.handler.Handler;

import org.junit.BeforeClass;
import org.junit.Test;

import com.arquimeda.fluig.ws.documentservice.DocumentService;
import com.arquimeda.fluig.ws.documentservice.ECMDocumentServiceService;
import com.arquimeda.fluig.ws.documentservice.Exception_Exception;
import com.arquimeda.fluig.ws.workflowengineservice.Attachment;
import com.arquimeda.fluig.ws.workflowengineservice.ECMWorkflowEngineServiceService;
import com.arquimeda.fluig.ws.workflowengineservice.ProcessAttachmentDto;
import com.arquimeda.fluig.ws.workflowengineservice.ProcessAttachmentDtoArray;
import com.arquimeda.fluig.ws.workflowengineservice.ProcessTaskAppointmentDtoArray;
import com.arquimeda.fluig.ws.workflowengineservice.StringArray;
import com.arquimeda.fluig.ws.workflowengineservice.StringArrayArray;
import com.arquimeda.fluig.ws.workflowengineservice.WorkflowEngineService;
import com.arquimeda.ic.utils.SOAPInvocationContextHandler;

public class InversionComercialEJBTest {
	
	private static DocumentService documentService;
	private static WorkflowEngineService workflowEngineService;
	
	@BeforeClass
	public static void getDocumentService() {
					
		URL wsdlUrl = ECMDocumentServiceService.class.getResource("/wsdl/ECMDocumentService.wsdl");
		
		WebServiceClient ann = ECMDocumentServiceService.class.getAnnotation(WebServiceClient.class); 
		ECMDocumentServiceService documentServiceService = new ECMDocumentServiceService(wsdlUrl, new QName(ann.targetNamespace(), ann.name()));
		documentService = documentServiceService.getDocumentServicePort();
		BindingProvider bp = (BindingProvider) documentService;
		bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, "http://192.168.0.175:9080/webdesk/ECMDocumentService");
		
		Binding binding = bp.getBinding();
		List<Handler> handlerChain = binding.getHandlerChain();
		handlerChain.add(new SOAPInvocationContextHandler());
		binding.setHandlerChain(handlerChain);		
		
	}
	
	@BeforeClass
	public static void getWorkflowEngineService() {

		URL wsdlUrl = ECMWorkflowEngineServiceService.class.getResource("/wsdl/ECMWorkflowEngineService.wsdl");
		
		WebServiceClient ann = ECMWorkflowEngineServiceService.class.getAnnotation(WebServiceClient.class); 
		ECMWorkflowEngineServiceService workflowEngineServiceService = new ECMWorkflowEngineServiceService(wsdlUrl, new QName(ann.targetNamespace(), ann.name()));
		workflowEngineService = workflowEngineServiceService.getWorkflowEngineServicePort();
		BindingProvider bp = (BindingProvider) workflowEngineService;
		bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, "http://192.168.0.175:9080/webdesk/ECMWorkflowEngineService");
		
		Binding binding = bp.getBinding();
		List<Handler> handlerChain = binding.getHandlerChain();
		handlerChain.add(new SOAPInvocationContextHandler());
		binding.setHandlerChain(handlerChain);
		
	}
	
	//@Test
	public void test() throws Exception_Exception, com.arquimeda.fluig.ws.workflowengineservice.Exception_Exception {
		
		//rocessAttachmentDtoArray attachments = workflowEngineService.getAttachments("procesobpm", "Flar82220", 1, "11844", 5865);
		
		String fileName ="Reporte Congresos (5).xlsx";
		Integer version = 1000;
		String userId = "11844";
		Integer documentId = 15254;
		String username = "procesobpm";
		String password = "Flar82220";
		Integer companyId = 1;
		String processId = "RAF09";
		String nroInversionComercial = "5865";
		String solicitante = "MELINA MARÍA FAJERSTAIN";
		String codGrupoGteDistrito = "RAF08-GTE-DIST-CUYO-1";
		
		StringArrayArray cardData = new StringArrayArray();
		cardData.getItem().add(createField("__error", "SUCCESS"));
		cardData.getItem().add(createField("nroInversionComercial", nroInversionComercial));	
		cardData.getItem().add(createField("solicitante", solicitante));
		cardData.getItem().add(createField("codGrupoGteDistrito", codGrupoGteDistrito));
		
		byte[] documentContent = documentService.getDocumentContent(username, password, companyId, documentId, userId, version, fileName);

		Attachment attachment = new Attachment();
		attachment.setFilecontent(documentContent);
		attachment.setFileName(fileName);
		
		ProcessAttachmentDto processAttachmentDto = new ProcessAttachmentDto();
		processAttachmentDto.setDescription(fileName);
		processAttachmentDto.setNewAttach(true);
		processAttachmentDto.getAttachments().add(attachment);
		
		ProcessAttachmentDtoArray processAttachmentDtoArray = new ProcessAttachmentDtoArray();
		processAttachmentDtoArray.getItem().add(processAttachmentDto);
				
		ProcessTaskAppointmentDtoArray processTaskAppointmentDtoArray = new ProcessTaskAppointmentDtoArray();
		boolean managerMode = true;
		StringArray stringArray = new StringArray();
		stringArray.getItem().add(userId);
		
		StringArrayArray result = workflowEngineService.startProcess(
				username, password, companyId, processId, 25, stringArray,
				"", userId, true, processAttachmentDtoArray, cardData, 
				processTaskAppointmentDtoArray, managerMode);
	
		System.out.println(result);
		
		List<StringArray> stringArrays = result.getItem();
		for (StringArray array : stringArrays) {
			List<String> list = array.getItem();
			for(String s : list) {
				System.out.println(s);
			}
		}
		
		
	}

	private StringArray createField(String name, String value) {
		StringArray field = new StringArray();
		field.getItem().add(name);
		field.getItem().add(value);
		return field;
	}
	
}
