package com.arquimeda.raf.esb.custom.diagrama01;

import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.arquimeda.esb.ws.esbwebservice.ESBWebService;
import com.arquimeda.fluig.ws.cardservice.CardFieldDto;
import com.arquimeda.fluig.ws.cardservice.CardFieldDtoArray;
import com.arquimeda.fluig.ws.cardservice.CardService;
import com.arquimeda.fluig.ws.cardservice.WebServiceMessage;
import com.arquimeda.fluig.ws.cardservice.WebServiceMessageArray;
import com.arquimeda.fluig.ws.workflowengineservice.ProcessAttachmentDtoArray;
import com.arquimeda.fluig.ws.workflowengineservice.ProcessTaskAppointmentDtoArray;
import com.arquimeda.fluig.ws.workflowengineservice.StringArray;
import com.arquimeda.fluig.ws.workflowengineservice.StringArrayArray;
import com.arquimeda.fluig.ws.workflowengineservice.WorkflowEngineService;
import com.arquimeda.raf.esb.custom.diagrama02.FLU_FLU_PasajeHistoricoArchivoMessage;
import com.arquimeda.raf.esb.custom.diagrama03.QAD_FLU_PublicacionArchivoMessage;
import com.arquimeda.raf.esb.custom.util.JAXBUtils;
import com.arquimeda.raf.esb.custom.ws.factory.CardServiceFactory;
import com.arquimeda.raf.esb.custom.ws.factory.ESBWebServiceFactory;
import com.arquimeda.raf.esb.custom.ws.factory.WorkflowEngineServiceFactory;
import com.totvs.esb.components.custom.CustomSender;

/* Este customSender debe ejecutarse en un solo thread porque se pisa el cardata por un problema de concurrencia.
 * No soporta ejecuciones en paralelo. 
 */

public class QAD_FLU_CambioEstadoCustomSender implements CustomSender {

	private Logger logger = LoggerFactory.getLogger(QAD_FLU_CambioEstadoCustomSender.class);

	@Override
	public byte[] sendMessage(byte[] message, Properties properties, Map<String, Object> arg2) throws Exception {

		String xml = new String(message);

		QAD_FLU_CambioEstadoMessage cambioEstadoMessage = JAXBUtils.unmarshal(xml, QAD_FLU_CambioEstadoMessage.class);

		try {

			String username = properties.getProperty("fluig.username");
			String password = properties.getProperty("fluig.password");
			Integer companyId = Integer.valueOf(properties.getProperty("fluig.companyId"));
			String userId = properties.getProperty("fluig.userId");
			Integer ultimaSolicitud = Integer.valueOf(properties.getProperty("ultima.solicitud.vieja"));
			Integer processInstanceId = Integer.valueOf(cambioEstadoMessage.getSolicitud());
			StringArray colleagueIds = new StringArray();
			

			logger.info("## " + cambioEstadoMessage.toString());
			
			WorkflowEngineService workflowEngineService = WorkflowEngineServiceFactory.getWorkflowEngineService(properties.getProperty("fluig.workflowengineservice.endpoint"));
			StringArrayArray result = workflowEngineService.getInstanceCardData(username, password, companyId, userId, processInstanceId);

			List<StringArray> cardData = result.getItem();

			String[] splitaux;
			String subindex = "";
			int cardId = 0;
			String estadoSolicitud = "";
			String changeGroupReasonType = "";

			//1. Busco el subindice del nro de linea a modificar
			for (StringArray array : cardData) {
				List<String> list = array.getItem();
				
				//logger.info("##### kEY " + list.get(0) + ", value: " + list.get(1));
				
				if (list.get(0).contains("currentState")) {
					estadoSolicitud = list.get(1);
				}

				if (list.get(0).contains("documentid")) {
					cardId = Integer.valueOf(list.get(1));
				}
				
				if (list.get(0).contains("changeGroupReasonType")) {
					changeGroupReasonType = list.get(1);
				}

				if(processInstanceId > ultimaSolicitud) {
					
					if (list.get(0) != null && list.get(0).contains("nroLineaNewProd___") && list.get(1).equals(cambioEstadoMessage.getLinea())) {

						String item = list.get(0);
						splitaux = item.split("___");
						subindex = splitaux[1];

					}

					if (list.get(0) != null && list.get(0).contains("nroLinea___") && list.get(1).equals(cambioEstadoMessage.getLinea())) {

						String item = list.get(0);
						splitaux = item.split("___");
						subindex = splitaux[1];

					}
					
				}

			}
			
			//Las versiones de procesos anteriores no actualizan las solicitudes solo hacen movimiento de documentos
			if(processInstanceId > ultimaSolicitud) {
				
				if(!"CERRADA".equals(estadoSolicitud)) {
					
					//2. Para el subindice anterior cambio el estado del item
					for (StringArray array : cardData) {
						
						List<String> list = array.getItem();
						
						//Actualiza por linea el item de la solicitud
						if(cambioEstadoMessage.getEstadoPCO() == null) {
							if (list.get(0) != null && (list.get(0).contains("estadoQADNewProd___"+ subindex) || list.get(0).contains("estadoQAD___"+ subindex))) {
								list.set(1, "CANCELADO");
							}
						}
						if("IMPLEMENTADO".equals(cambioEstadoMessage.getEstadoPCO() != null?cambioEstadoMessage.getEstadoPCO().toUpperCase().trim(): "")) {
							if (list.get(0) != null && (list.get(0).contains("estadoQADNewProd___"+ subindex) || list.get(0).contains("estadoQAD___"+ subindex))) {
								list.set(1, "IMPLEMENTADO");
							}
						}
						
						if (list.get(0) != null && (list.get(0).contains("observacionesQADNewProd___"+ subindex) || list.get(0).contains("observaciones___"+ subindex))) {
							list.set(1, cambioEstadoMessage.getObservacion());
						}

					}

					//3. Traspaso el cardata para actualizar la solicitud
					CardFieldDtoArray cardFieldDtoArray = new CardFieldDtoArray();

					for (StringArray sa : cardData) {
						CardFieldDto dto = new CardFieldDto();
						dto.setField(sa.getItem().get(0)); 
						dto.setValue(sa.getItem().get(1));
						cardFieldDtoArray.getItem().add(dto);
					}
					
					//4. Actualizo la solicitud
					CardService cardService = CardServiceFactory.getCardService(properties.getProperty("fluig.cardService.endpoint"));
					WebServiceMessageArray updateCardData = cardService.updateCardData(companyId, username, password, cardId, cardFieldDtoArray);
					
					boolean ok2 = false;
					List<WebServiceMessage> stringArrays = updateCardData.getItem();
					for (WebServiceMessage array : stringArrays) {
						
						String wsMessage  = array.getWebServiceMessage();
						logger.info("wsMessage:::: " + wsMessage);
						ok2 = true;
					}
					
					if (!ok2) {
						throw new RuntimeException("Respuesta de Fluig recibida incorrecta.\n");
					}

					//5. Intento finalizar la solicitud
					StringArrayArray rta = workflowEngineService.saveAndSendTask(username, password, companyId, processInstanceId, 45, colleagueIds, "", 
							userId, true, new ProcessAttachmentDtoArray(), new StringArrayArray(), new ProcessTaskAppointmentDtoArray(), true, 0);

					//logger.info("#### saveAndSendTask 1: " + rta.getItem().get(0));
					//logger.info("#### saveAndSendTask 2: " + rta.getItem().get(0).getItem().get(0));
					
					if(rta.getItem().get(0).getItem().get(0).contains("ERROR")){
						logger.info("No se pudo mover la solicitud: " + processInstanceId + ", linea: " + cambioEstadoMessage.getLinea());
						throw new RuntimeException("No se pudo mover la solicitud: " + processInstanceId + ". Respuesta de Fluig: " + rta.getItem().get(0).getItem().get(1) + ", linea: " + cambioEstadoMessage.getLinea());
					}
					
				}
			}
			
			if(!"CERRADA".equals(estadoSolicitud)) {
				
				if(!"nuevoDisenio".equals(changeGroupReasonType) && cambioEstadoMessage.getCarpeta() != null && !"".equals(cambioEstadoMessage.getCarpeta())) {
					logger.info("No Lanzamiento: " + changeGroupReasonType);
					
					//6. Llamar a pasaje histótico si no es de lanzamiento
					
					FLU_FLU_PasajeHistoricoArchivoMessage pasajeHistoricoArchivoMessage = new FLU_FLU_PasajeHistoricoArchivoMessage();
					pasajeHistoricoArchivoMessage.setCarpeta(cambioEstadoMessage.getCarpeta());
					pasajeHistoricoArchivoMessage.setPdfArte(cambioEstadoMessage.getPdfArte());
					pasajeHistoricoArchivoMessage.setEame(cambioEstadoMessage.getEame());
					pasajeHistoricoArchivoMessage.setEstadoSolicitud(cambioEstadoMessage.getEstadoSolicitud());
					pasajeHistoricoArchivoMessage.setNumero(cambioEstadoMessage.getNumero());
					pasajeHistoricoArchivoMessage.setReemplazos(cambioEstadoMessage.getReemplazos());
					pasajeHistoricoArchivoMessage.setSolicitud(cambioEstadoMessage.getSolicitud());
					pasajeHistoricoArchivoMessage.setTipo(cambioEstadoMessage.getTipo());
					pasajeHistoricoArchivoMessage.setLinea(cambioEstadoMessage.getLinea());
					
					ESBWebService esbWS = ESBWebServiceFactory.getESBWebService(properties.getProperty("esb.endpoint"));
					esbWS.sendMessage(JAXBUtils.marshal(pasajeHistoricoArchivoMessage, FLU_FLU_PasajeHistoricoArchivoMessage.class), properties.getProperty("esb.diagrama.02.queue"));

				}else if("nuevoDisenio".equals(changeGroupReasonType) && cambioEstadoMessage.getCarpeta() != null && !"".equals(cambioEstadoMessage.getCarpeta())) {
					
					logger.info("Lanzamiento: " + changeGroupReasonType);
					
					//Publicar nueva version del documento en la carpeta indicada en el GED
					ESBWebService esbWS = ESBWebServiceFactory.getESBWebService(properties.getProperty("esb.endpoint"));
					
					QAD_FLU_PublicacionArchivoMessage publicacionArchivoMessage = new QAD_FLU_PublicacionArchivoMessage();
					publicacionArchivoMessage.setCarpeta(cambioEstadoMessage.getCarpeta());
					publicacionArchivoMessage.setEstadoSolicitud(cambioEstadoMessage.getEstadoSolicitud());
					publicacionArchivoMessage.setNumero(cambioEstadoMessage.getNumero());
					publicacionArchivoMessage.setReemplazos(cambioEstadoMessage.getReemplazos());
					publicacionArchivoMessage.setSolicitud(cambioEstadoMessage.getSolicitud());
					publicacionArchivoMessage.setTipo(cambioEstadoMessage.getTipo());
					publicacionArchivoMessage.setLinea(cambioEstadoMessage.getLinea());
					
					if(cambioEstadoMessage.getEame() != null && !"".equals(cambioEstadoMessage.getEame())) {
						publicacionArchivoMessage.setArchivo(cambioEstadoMessage.getEame());
						esbWS.sendMessage(JAXBUtils.marshal(publicacionArchivoMessage, QAD_FLU_PublicacionArchivoMessage.class), properties.getProperty("esb.diagrama.03.queue"));
					}
					
					if(cambioEstadoMessage.getPdfArte() != null && !"".equals(cambioEstadoMessage.getPdfArte())) {
						publicacionArchivoMessage.setArchivo(cambioEstadoMessage.getPdfArte());
						esbWS.sendMessage(JAXBUtils.marshal(publicacionArchivoMessage, QAD_FLU_PublicacionArchivoMessage.class), properties.getProperty("esb.diagrama.03.queue"));
					}
				}

			}

			return message;

		} catch (Exception e) {

			logger.error("QAD_FLU_CambioEstado Solicitud: " + cambioEstadoMessage.getSolicitud() + ", linea: " + cambioEstadoMessage.getLinea(), e);

			throw new RuntimeException(e.getMessage(), e);

		} 

	}
}