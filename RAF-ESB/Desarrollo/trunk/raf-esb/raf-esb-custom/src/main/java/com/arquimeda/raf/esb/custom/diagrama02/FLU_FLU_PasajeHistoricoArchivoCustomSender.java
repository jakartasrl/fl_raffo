package com.arquimeda.raf.esb.custom.diagrama02;

import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.arquimeda.esb.ws.esbwebservice.ESBWebService;
import com.arquimeda.fluig.ws.documentservice.DocumentService;
import com.arquimeda.fluig.ws.documentservice.IntArray;
import com.arquimeda.fluig.ws.folderservice.DocumentDto;
import com.arquimeda.fluig.ws.folderservice.DocumentDtoArray;
import com.arquimeda.fluig.ws.folderservice.FolderService;
import com.arquimeda.raf.esb.custom.diagrama03.QAD_FLU_PublicacionArchivoMessage;
import com.arquimeda.raf.esb.custom.util.JAXBUtils;
import com.arquimeda.raf.esb.custom.ws.factory.DocumentServiceFactory;
import com.arquimeda.raf.esb.custom.ws.factory.ESBWebServiceFactory;
import com.arquimeda.raf.esb.custom.ws.factory.FolderServiceFactory;
import com.totvs.esb.components.custom.CustomSender;

public class FLU_FLU_PasajeHistoricoArchivoCustomSender implements CustomSender {
	
	private Logger logger = LoggerFactory.getLogger(FLU_FLU_PasajeHistoricoArchivoCustomSender.class);
	
	@Override
	public byte[] sendMessage(byte[] message, Properties properties, Map<String, Object> arg2) throws Exception {
		
		String xml = new String(message);

		FLU_FLU_PasajeHistoricoArchivoMessage pasajeArchivoMessage = JAXBUtils.unmarshal(xml, FLU_FLU_PasajeHistoricoArchivoMessage.class);
		
		try {
			
			String username = properties.getProperty("fluig.username");
			String password = properties.getProperty("fluig.password");
			Integer companyId = Integer.valueOf(properties.getProperty("fluig.companyId"));
			Integer destFolderId = Integer.valueOf(properties.getProperty("fluig.carpeta.historicos"));
			String colleagueId = properties.getProperty("fluig.colleagueId");
			
			logger.info("## " + pasajeArchivoMessage.toString());
			
			boolean publicarArte = pasajeArchivoMessage.getPdfArte() != null && !"".equals(pasajeArchivoMessage.getPdfArte());
			boolean publicarEame = pasajeArchivoMessage.getEame() != null && !"".equals(pasajeArchivoMessage.getEame());
			
			if(pasajeArchivoMessage.getCarpeta() != null && !"".equals(pasajeArchivoMessage.getCarpeta())) {
				
				logger.info("## Parametros: username: " + username + ", password: " + password + ", companyId: " + companyId + ", carpeta: " + pasajeArchivoMessage.getCarpeta() + ", colleagueId: " + colleagueId);
				
				//1. Busco en la carpeta indicada del GED si existen archivos
				FolderService folderService = FolderServiceFactory.getFolderService(properties.getProperty("fluig.folderService.endpoint"));
				DocumentDtoArray children = folderService.getChildren(username, password, companyId, Integer.valueOf(pasajeArchivoMessage.getCarpeta()), colleagueId);
				
				IntArray documentIdArray = new IntArray();
				List<DocumentDto> items = children.getItem();
				
				for (DocumentDto item : items) {
					Integer documentId  = item.getDocumentId();
					
					//2. Verificar si existen archivos a reemplazar en el GED
					if(pasajeArchivoMessage.getReemplazos() != null && !"".equals(pasajeArchivoMessage.getReemplazos())) {
						
						for (String reemplazo: pasajeArchivoMessage.getReemplazos().split(",")) {
							
							logger.info("############### reemplazo : " + reemplazo);

							String codigo = reemplazo.trim().substring(0, reemplazo.length()-1);
							
							if((item.getDocumentDescription().contains("EAME") || item.getDocumentDescription().contains("EAMP"))
									&& (item.getDocumentDescription().contains(codigo + "-") || item.getDocumentDescription().contains(codigo + "_"))) {
								
								if(!documentIdArray.getItem().contains(documentId)) {
									documentIdArray.getItem().add(documentId);
								}
								
								logger.info("Archivo EAME/EAMP FolderService :::: documentId: " + documentId + ", Archivo: " + item.getDocumentDescription());

							} else if(item.getDocumentDescription().contains(reemplazo.trim())) {

								if(!documentIdArray.getItem().contains(documentId)) {
									documentIdArray.getItem().add(documentId);
								}
								
								logger.info("Archivo Arte FolderService :::: documentId: " + documentId + ", Archivo: " + item.getDocumentDescription());

							}
					         
					      }
						//Es para que no publique un archivo que existe en el GED, para reprocesos.
						if(publicarEame && item.getDocumentDescription().equals(pasajeArchivoMessage.getEame())) {
							publicarEame = false;
						}
						logger.info("publicarEame " + publicarEame);
						
						if(publicarArte && item.getDocumentDescription().equals(pasajeArchivoMessage.getPdfArte())) {
							publicarArte = false;
						}
						logger.info("publicarArte " + publicarArte);

					}else {
						logger.info("############### No hay reemplazos para la solicitud " + pasajeArchivoMessage.getSolicitud() + ", linea: " + pasajeArchivoMessage.getLinea());
					}
					
				}
				
				//3. Pasaje a historico en GED de archivos encontrados en la carpeta indicada
				DocumentService documentService =  DocumentServiceFactory.getDocumentService(properties.getProperty("fluig.documentService.endpoint"));
				String moveDocumentRta = documentService.moveDocument(username, password, companyId, documentIdArray, colleagueId, destFolderId);

				if(moveDocumentRta != "" && moveDocumentRta.contains("[NOK]")) {
					throw new RuntimeException("Respuesta de Fluig recibida incorrecta. DocumentService : " + moveDocumentRta);
				}
				
				logger.info("DocumentService : " + moveDocumentRta);
				
				//4. Publicar nueva version del documento en la carpeta indicada en el GED
				ESBWebService esbWS = ESBWebServiceFactory.getESBWebService(properties.getProperty("esb.endpoint"));
				
				QAD_FLU_PublicacionArchivoMessage publicacionArchivoMessage = new QAD_FLU_PublicacionArchivoMessage();
				publicacionArchivoMessage.setCarpeta(pasajeArchivoMessage.getCarpeta());
				publicacionArchivoMessage.setEstadoSolicitud(pasajeArchivoMessage.getEstadoSolicitud());
				publicacionArchivoMessage.setNumero(pasajeArchivoMessage.getNumero());
				publicacionArchivoMessage.setReemplazos(pasajeArchivoMessage.getReemplazos());
				publicacionArchivoMessage.setSolicitud(pasajeArchivoMessage.getSolicitud());
				publicacionArchivoMessage.setTipo(pasajeArchivoMessage.getTipo());
				publicacionArchivoMessage.setLinea(pasajeArchivoMessage.getLinea());
				
				if(publicarEame) {
					publicacionArchivoMessage.setArchivo(pasajeArchivoMessage.getEame());
					esbWS.sendMessage(JAXBUtils.marshal(publicacionArchivoMessage, QAD_FLU_PublicacionArchivoMessage.class), properties.getProperty("esb.diagrama.03.queue"));
				}
				
				if(publicarArte) {
					publicacionArchivoMessage.setArchivo(pasajeArchivoMessage.getPdfArte());
					esbWS.sendMessage(JAXBUtils.marshal(publicacionArchivoMessage, QAD_FLU_PublicacionArchivoMessage.class), properties.getProperty("esb.diagrama.03.queue"));
				}
				
				
			}else {
				logger.info("Id de carpeta GED es null para : " + pasajeArchivoMessage.getSolicitud() + ", linea: " + pasajeArchivoMessage.getLinea());
			}

			
			return message;
			
		} catch (Exception e) {

			logger.error("FLU_FLU_PasajeHistoricoArchivo Solicitud: " + pasajeArchivoMessage.getSolicitud() + ", linea: " + pasajeArchivoMessage.getLinea(), e);

			throw new RuntimeException(e.getMessage(), e);

		} 
		
	}
	
}
