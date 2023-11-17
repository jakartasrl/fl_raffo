function onNotify(subject, receivers, template, params){

	log.info("Ejecutando onNotify(" + subject + ", " + receivers + ",  " + template + " , " + params + ");");
	
	var nroSolicitud = params.get("processInstanceId");
	var descripcionTarea = params.get("WDK_TaskDescription");
	
	var taskComments = '';
	
	if(params.get("WDK_TaskComments") != null && params.get("WDK_TaskComments") != ''){
	
		taskComments = new java.lang.String(params.get("WDK_TaskComments"));
		taskComments = taskComments.substring(taskComments.indexOf("</span> : ") + 10, taskComments.lastIndexOf("</span>"))
	}	
	
	if(template == 'tpl010-es.html'){ //Esto es por un bug del ecm
		
		receivers.clear();
		
	}else if(template == 'tpl012-es.html'){ // Nueva Tarea de Workflow
		
		if(descripcionTarea != 'Complementar Consulta'){ 
			receivers.clear();
		}
		
		subject.add("Nueva Tarea - " + descripcionTarea + ": " + hAPI.getCardValue("aten_nroConsulta") + " Producto: " + hAPI.getCardValue("aten_producto"));
		
	}else if(template == 'tpl019-es.html'){ // Nueva Tarea Workflow para Grupo
		subject.add("Nueva Tarea en Pool - " + descripcionTarea + ": " + hAPI.getCardValue("aten_nroConsulta") + " Producto: " + hAPI.getCardValue("aten_producto"));
	}else if(template == 'tpl029-es.html'){ // Tarea Atrasada para Gerente  
		subject.add("Tarea Sobre Gerencia Atrasada - " + descripcionTarea + ": " + hAPI.getCardValue("aten_nroConsulta") + " Producto: " + hAPI.getCardValue("aten_producto"));
	}else if(template == 'tpl049-es.html'){ // Tarea Atrasada para Grupo
		subject.add("Tarea en Pool Atrasada - " + descripcionTarea + ": " + hAPI.getCardValue("aten_nroConsulta") + " Producto: " + hAPI.getCardValue("aten_producto"));
	} 
 	
	params.put("padre_fecha", hAPI.getCardValue("padre_fecha"));
	params.put("padre_hora", hAPI.getCardValue("padre_hora"));
	params.put("padre_origen", hAPI.getCardValue("padre_origen"));
	params.put("padre_nombre", hAPI.getCardValue("padre_nombre"));
	params.put("padre_telefono", hAPI.getCardValue("padre_telefono"));
	params.put("padre_mail", hAPI.getCardValue("padre_mail"));
	params.put("padre_direccion", hAPI.getCardValue("padre_direccion"));
	params.put("padre_otro", hAPI.getCardValue("padre_otro"));
	params.put("padre_observaciones", hAPI.getCardValue("padre_observaciones"));
	params.put("aten_nroSolicitud", nroSolicitud);
	params.put("aten_nroConsulta", hAPI.getCardValue("aten_nroConsulta"));	
	params.put("aten_producto", hAPI.getCardValue("aten_producto"));
	params.put("aten_activo", hAPI.getCardValue("aten_activo"));
	params.put("aten_nroLote", hAPI.getCardValue("aten_nroLote"));
	params.put("aten_vencimiento", hAPI.getCardValue("aten_vencimiento"));
	params.put("aten_tipo", hAPI.getCardValue("aten_tipo"));
	params.put("aten_observacion", hAPI.getCardValue("aten_observacion"));
	params.put("aten_derivacion", hAPI.getCardValue("aten_derivacion"));
	params.put("aten_rellamada", hAPI.getCardValue("aten_rellamada"));
	params.put("aten_resolucion", hAPI.getCardValue("aten_resolucion"));
	params.put("aten_motivoAtraso", hAPI.getCardValue("aten_motivoAtraso"));
	params.put("aten_licenciante", hAPI.getCardValue("aten_licenciante"));
	params.put("aten_contieneEventoAdverso", hAPI.getCardValue("aten_contieneEventoAdverso"));
	params.put("aten_contieneEventoAdversoMotivo", hAPI.getCardValue("aten_contieneEventoAdversoMotivo"));
	params.put("aten_conclusion", hAPI.getCardValue("aten_conclusion"));
	params.put("aten_revobservacion", hAPI.getCardValue("aten_revobservacion"));
	params.put("rc_template", "rc_template");
	params.put("taskComments", taskComments);	
	
	//la solicitud tiene adjuntos
	
	var WDK_VirtualDir = params.get("WDK_VirtualDir");    
	log.error("WDK_VirtualDir: " + WDK_VirtualDir);

	var nroSolicitud = params.get("processInstanceId");

	var c01 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", nroSolicitud, nroSolicitud, ConstraintType.MUST); 
	var workflowProcessDataset = DatasetFactory.getDataset("workflowProcess", null, [c01], null);

	var attachmentSeqId = workflowProcessDataset.getValue(0, "attachmentSeqId");

	var c02 = DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", nroSolicitud, nroSolicitud, ConstraintType.MUST); 
	var c03 = DatasetFactory.createConstraint("processAttachmentPK.attachmentSequence", attachmentSeqId, attachmentSeqId, ConstraintType.MUST); 
	var processAttachmentDataset = DatasetFactory.getDataset("processAttachment", null, [c02,c03], null);
	var fichaDocumentId = processAttachmentDataset.getValue(0, "documentId");
	
	var sortingFields = ["documentId", "version"];
	var c04 = DatasetFactory.createConstraint("documentId", fichaDocumentId, fichaDocumentId, ConstraintType.MUST_NOT);
	var c05 = DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", nroSolicitud, nroSolicitud, ConstraintType.MUST); 
	var attachmentDataset = DatasetFactory.getDataset("processAttachment", null, [c04,c05], sortingFields);

	var document2UserMap = new java.util.HashMap();
	var document2LinkMap = new java.util.HashMap();
	
	log.info("************ attachmentDataset.rowsCount: " + attachmentDataset.rowsCount + " fichaDocumentId: " + fichaDocumentId);
	
	for(var j = 0; j < attachmentDataset.rowsCount; j++) { 
	
		var documentId = attachmentDataset.getValue(j, "documentId");
		
		if(fichaDocumentId != documentId){

			var version = attachmentDataset.getValue(j, "version");
			var documentLink = WDK_VirtualDir + "/documentviewer?companyId=1&WDNrDocto=" + documentId + "&WDNrVersao=" + version;
			
			log.info("*********************** documentId: " + documentId + " version: " + version + " j: " + j);

			var c2 = DatasetFactory.createConstraint("documentPK.documentId", documentId, documentId, ConstraintType.MUST); 
			var c3 = DatasetFactory.createConstraint("documentPK.version", version, version, ConstraintType.MUST); 
			var documentDataset = DatasetFactory.getDataset("document", null, [c2,c3], null);
				
			var documentDescription = documentDataset.getValue(0, "documentDescription");
			var publisherId  = documentDataset.getValue(0, "publisherId");
			
			var c4 = DatasetFactory.createConstraint("colleaguePK.colleagueId", publisherId, publisherId, ConstraintType.MUST); 
			var datasetColleague = DatasetFactory.getDataset("colleague", null, [c4], null);
		
			log.info("Document: " + documentDescription + " Empleado: " + datasetColleague.getValue(0, "colleagueName") + " Link: " + documentLink);
			document2UserMap.put(documentDescription, datasetColleague.getValue(0, "colleagueName"));
			document2LinkMap.put(documentDescription, documentLink);

			// http://192.168.0.45:8080/webdesk/documentviewer?companyId=1&WDNrDocto=2861&WDNrVersao=1000
		}
	}
	
	params.put("document2UserMap",document2UserMap);
	params.put("document2LinkMap",document2LinkMap);

}