package com.arquimeda.raf.esb.custom.diagrama03;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Map;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.arquimeda.fluig.ws.documentservice.Attachment;
import com.arquimeda.fluig.ws.documentservice.AttachmentArray;
import com.arquimeda.fluig.ws.documentservice.DocumentService;
import com.arquimeda.fluig.ws.documentservice.WebServiceMessageArray;
import com.arquimeda.raf.esb.custom.util.JAXBUtils;
import com.arquimeda.raf.esb.custom.ws.factory.DocumentServiceFactory;
import com.totvs.esb.components.custom.CustomSender;

public class QAD_FLU_PublicacionArchivoCustomSender implements CustomSender {
	
	private Logger logger = LoggerFactory.getLogger(QAD_FLU_PublicacionArchivoCustomSender.class);
	
	@Override
	public byte[] sendMessage(byte[] message, Properties properties, Map<String, Object> arg2) throws Exception {
		
		String xml = new String(message);

		QAD_FLU_PublicacionArchivoMessage publicarArchivoMessage = JAXBUtils.unmarshal(xml, QAD_FLU_PublicacionArchivoMessage.class);
		
		try {
			
			String username = properties.getProperty("fluig.username");
			String password = properties.getProperty("fluig.password");
			Integer companyId = Integer.valueOf(properties.getProperty("fluig.companyId"));
			String origenQAD = properties.getProperty("qad.path.publicar");
			
			logger.info("## " + publicarArchivoMessage.toString());
			
			
			if(publicarArchivoMessage.getArchivo() != null && !"".equals(publicarArchivoMessage.getArchivo())) {
				File file = new File(origenQAD + publicarArchivoMessage.getNumero()+ "//" + publicarArchivoMessage.getArchivo()); 
				publicarDocumento(properties, publicarArchivoMessage.getCarpeta(), username, password, companyId, file, publicarArchivoMessage.getArchivo());
			}
			
 			return message;
			
		} catch (Exception e) {

			logger.error("QAD_FLU_PublicacionArchivo Solicitud: " + publicarArchivoMessage.getSolicitud() + ", linea: " + publicarArchivoMessage.getLinea(), e);

			throw new RuntimeException(e.getMessage(), e);

		} 
		
	}

	private void publicarDocumento(Properties properties, String carpetaGED, String username, String password, Integer companyId, File file, String nombreArchivo) throws FileNotFoundException, IOException {
		
		FileInputStream fis = new FileInputStream(file);
		byte fileContent[] = new byte[(int)file.length()];
		fis.read(fileContent);
		
		Attachment attachment = new Attachment();
		attachment.setFileName(file.getName());
		attachment.setFilecontent(fileContent);
		attachment.setFileSize(fileContent.length);
		attachment.setAttach(false);
		attachment.setPrincipal(true);
		attachment.setEditing(false);
		
		AttachmentArray attachmentArray = new AttachmentArray();
		attachmentArray.getItem().add(attachment);
		
		try {
			
			DocumentService documentService =  DocumentServiceFactory.getDocumentService(properties.getProperty("fluig.documentService.endpoint"));
			
			WebServiceMessageArray wsma = documentService.createSimpleDocument(username, password, companyId, Integer.valueOf(carpetaGED), username, nombreArchivo, attachmentArray);
			
			logger.info(wsma.getItem().get(0).getWebServiceMessage());
			
			int idDocumentoCreado = wsma.getItem().get(0).getDocumentId();
			
			logger.info("Documento (" + nombreArchivo + ") creado dentro de la carpeta " + carpetaGED + " con el id " + idDocumentoCreado);
			
		} catch (Exception e) {
			
			logger.error("Error al publicar el documento (nombre: " + nombreArchivo + ")");
			throw new RuntimeException(e.getMessage(), e);
			
		}finally {
			fis.close();
		}
	}

}
