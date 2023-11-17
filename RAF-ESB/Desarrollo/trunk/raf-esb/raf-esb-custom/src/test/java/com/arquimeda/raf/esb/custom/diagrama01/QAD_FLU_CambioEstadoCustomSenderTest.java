package com.arquimeda.raf.esb.custom.diagrama01;

import java.util.Properties;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import com.arquimeda.fluig.ws.workflowengineservice.Exception_Exception;
import com.arquimeda.fluig.ws.workflowengineservice.ProcessAttachmentDtoArray;
import com.arquimeda.fluig.ws.workflowengineservice.ProcessTaskAppointmentDtoArray;
import com.arquimeda.fluig.ws.workflowengineservice.StringArray;
import com.arquimeda.fluig.ws.workflowengineservice.StringArrayArray;
import com.arquimeda.fluig.ws.workflowengineservice.WorkflowEngineService;
import com.arquimeda.raf.esb.custom.ws.factory.WorkflowEngineServiceFactory;

@RunWith(value=MockitoJUnitRunner.class)
public class QAD_FLU_CambioEstadoCustomSenderTest {
	
	@Test
	public void sendMessage() throws Exception {
		
		QAD_FLU_CambioEstadoCustomSender sender = new QAD_FLU_CambioEstadoCustomSender();
		
		Properties properties = new Properties();
		properties.put("fluig.username", "adm");
		properties.put("fluig.password", "adm");
		properties.put("fluig.companyId", "1");
		properties.put("fluig.userId", "adm");
		properties.put("fluig.workflowengineservice.endpoint", "http://192.168.0.59:8080/webdesk/ECMWorkflowEngineService");
		properties.put("fluig.cardService.endpoint", "http://192.168.0.59:8080/webdesk/ECMCardService");
		
//		String xml = "<QAD_FLU_CambioEstadoMessage>"
//				+ "<pcoImplementado>PCO00408</pcoImplementado>"
//				+ "<solicitud>472</solicitud>"
//				+ "<linea>2</linea>"
//				+ "<fechaImplementacion>15/06/2021</fechaImplementacion>"
//				+ "<estado>CANCELADO</estado>"
//				+ "<sistema>QAD</sistema>"
//				+ "<fechaProceso>11/05/2021</fechaProceso>"
//				+ "<ruta>G:\\SOFTWARE\\QAD2016EE\\ARQADPROD\\VyF\\IMPLE</ruta>"
//				+ "<archivoArte>315067B LACOTEM 50 mg EST MM X 10 COMP REC.pdf</archivoArte>"
//				+ "<archivoEameEamp>EAME-MAR-315067-05 LACOSAMIDA.pdf</archivoEameEamp>"
//				+ "<tipo>Estuches</tipo>"
//				+ "<codigoReemplazo>315067</codigoReemplazo>"
//				+ "<versionReemplazo>A</versionReemplazo>"
//				+ "<tipoPCO>Nac_SJ</tipoPCO>"
//				+ "</QAD_FLU_CambioEstadoMessage>";
		
		String xml = "<QAD_FLU_CambioEstadoMessage>"
				+ "<solicitud>5148</solicitud>"
				+ "<linea>1</linea>"
				+ "<producto>30012</producto>"
				+ "<estadoSolicitud>Cerrado</estadoSolicitud>"
				+ "<observacion>PCO01312_30012_E</observacion>"
				+ "<fechaImplementacion>17/5/2021</fechaImplementacion>"
				+ "<estadoPCO>Implementado</estadoPCO>"
				+ "<sistema>QAD</sistema>"
				+ "<numero>PCO01312</numero>"
				+ "<pdfArte>30012E DUVADILAN PROSPECTO .pdf</pdfArte>"
				+ "<eame>EAME-MAR-30012-04.pdf</eame>"
				+ "<carpeta>14223</carpeta>"
				+ "<reemplazos>30012D,30097A</reemplazos>"
				+ "<tipo>San Juan</tipo>"
				+ "<informado>SI</informado>"
				+ "<fechaInforme>17/5/2021</fechaInforme>"
				+ "<horaInforme>23:29:12</horaInforme>"
				+ "</QAD_FLU_CambioEstadoMessage>";

		byte[] msg = xml.getBytes();
		//sender.sendMessage(msg, properties, null);
	}
	
	@Test
	public void test() throws Exception_Exception {
		
		Properties properties = new Properties();
		properties.put("fluig.username", "procesobpm");
		properties.put("fluig.password", "pbpm2014");
		properties.put("fluig.companyId", "1");
		properties.put("fluig.userId", "procesobpm");
		properties.put("fluig.workflowengineservice.endpoint", "http://192.168.0.175:9080/webdesk/ECMWorkflowEngineService");
				
		WorkflowEngineService workflowEngineService = WorkflowEngineServiceFactory.getWorkflowEngineService(properties.getProperty("fluig.workflowengineservice.endpoint"));
		
		String username = properties.getProperty("fluig.username");
		String password = properties.getProperty("fluig.password");
		Integer companyId = Integer.valueOf(properties.getProperty("fluig.companyId"));
		String userId = properties.getProperty("fluig.userId");
		StringArray colleagueIds = new StringArray();
		
		StringArrayArray rta = workflowEngineService.saveAndSendTask(username, password, companyId, 5225, 45, colleagueIds, "", 
				userId, true, new ProcessAttachmentDtoArray(), new StringArrayArray(), new ProcessTaskAppointmentDtoArray(), true, 0);

		System.out.println(rta);
		
			
	}
	
}
