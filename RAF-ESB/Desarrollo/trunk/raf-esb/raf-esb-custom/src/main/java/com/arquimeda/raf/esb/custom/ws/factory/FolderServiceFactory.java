package com.arquimeda.raf.esb.custom.ws.factory;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.BindingProvider;
import javax.xml.ws.WebServiceClient;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.arquimeda.esb.ws.esbwebservice.Ws;
import com.arquimeda.fluig.ws.folderservice.ECMFolderServiceService;
import com.arquimeda.fluig.ws.folderservice.FolderService;

public class FolderServiceFactory {

	private static Logger logger = LoggerFactory.getLogger(FolderServiceFactory.class);
	private static FolderService folderService;

	public static FolderService getFolderService(String endpoint) {

		if(folderService == null){

			logger.info("Creando ECMFolderService contra TOTVS ESB...");

			URL wsdlUrl = Ws.class.getResource("/wsdl/ECMFolderService.wsdl");

			WebServiceClient ann = ECMFolderServiceService.class.getAnnotation(WebServiceClient.class); 
			ECMFolderServiceService folderServiceService = new ECMFolderServiceService(wsdlUrl, new QName(ann.targetNamespace(), ann.name()));
			folderService = folderServiceService.getFolderServicePort();
			BindingProvider bp = (BindingProvider) folderService;
			bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, endpoint);
			
			logger.info("Ws contra ECMFolderService creado.");
			
		}

		return folderService;
		
	}

}
