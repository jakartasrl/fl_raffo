function displayFields(form,customHTML){
	
	arqForms(form, customHTML);
	
	var nroSolicitudPadre = form.getValue("padre_nroSolicitud");
	var nroSolicitudHijo = form.getValue("aten_nroSolicitud");
	
	var nroHijo = form.getValue("nroHijo");
	
	var c01 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST); 
	var c02 = DatasetFactory.createConstraint("nroSolicitud", nroSolicitudPadre, nroSolicitudPadre, ConstraintType.MUST); 
	var constraints = new Array(c01, c02);
	var datasetPadre = DatasetFactory.getDataset("raf-registro-consultas", null, constraints, null);
	
	if(datasetPadre.rowsCount == 1){ 
	
		var c1 = DatasetFactory.createConstraint("tablename", "tablaCons" ,"tablaCons", ConstraintType.MUST); 
		var c2 = DatasetFactory.createConstraint("metadata#id", datasetPadre.getValue(0, "metadata#id"), datasetPadre.getValue(0, "metadata#id"), ConstraintType.MUST); 
		var c3 = DatasetFactory.createConstraint("metadata#version", datasetPadre.getValue(0, "metadata#version"), datasetPadre.getValue(0, "metadata#version"), ConstraintType.MUST); 
		var constraintsHijos = new Array(c1, c2, c3);
	  
		var datasetHijos = DatasetFactory.getDataset("raf-registro-consultas", null, constraintsHijos, null); 
  
		form.setValue("padre_fecha", datasetPadre.getValue(0, "fecha"));
		form.setValue("padre_hora", datasetPadre.getValue(0, "hora"));
		form.setValue("padre_origen", datasetPadre.getValue(0, "origen"));
		form.setValue("padre_nombre", datasetPadre.getValue(0, "nombre"));
		form.setValue("padre_telefono", datasetPadre.getValue(0, "telefono"));
		form.setValue("padre_mail", datasetPadre.getValue(0, "mail"));
		form.setValue("padre_direccion", datasetPadre.getValue(0, "direccion"));
		form.setValue("padre_otro", datasetPadre.getValue(0, "otro"));
		form.setValue("padre_observaciones", datasetPadre.getValue(0, "observaciones"));
		
		var indexHijos = 1;
		
		for(j = 0; j < datasetHijos.rowsCount; j++) { 
		
			if(datasetHijos.getValue(j, "cons_nroSolicitud") == form.getValue("aten_nroSolicitud")){
				
				form.setValue("aten_nroSolicitud", datasetHijos.getValue(j, "cons_nroSolicitud"));
				form.setValue("aten_nroConsulta", datasetHijos.getValue(j, "cons_nroConsulta"));
				form.setValue("aten_producto", datasetHijos.getValue(j, "cons_producto"));
				form.setValue("aten_activo", datasetHijos.getValue(j, "cons_activo"));
				form.setValue("aten_nroLote", datasetHijos.getValue(j, "cons_nroLote"));
				form.setValue("aten_vencimiento", datasetHijos.getValue(j, "cons_vencimiento"));
				form.setValue("aten_tipo", datasetHijos.getValue(j, "cons_tipo"));
				form.setValue("aten_observacion", datasetHijos.getValue(j, "cons_observacion"));
				
				if(form.getValue("aten_derivacion") == ""){
					form.setValue("aten_derivacion", datasetHijos.getValue(j, "cons_derivacion"));
				}
				
				form.setValue("aten_rellamada", datasetHijos.getValue(j, "cons_rellamada"));				
			
			}else{
			
				//aca se agregan los hermanos
				
				//esto es por un bug que en readonly no puede hacer el addRow de los hermanos
				customHTML.append("<script type='text/javascript'>"); 			
				customHTML.append("agregarOtrasConsultas(["); 
				customHTML.append(datasetHijos.getValue(j, "cons_nroSolicitud"));
				customHTML.append(",'");
				customHTML.append(datasetHijos.getValue(j, "cons_nroConsulta"));
				customHTML.append("','");
				customHTML.append(datasetHijos.getValue(j, "cons_producto"));
				customHTML.append("','");
				customHTML.append(datasetHijos.getValue(j, "cons_activo"));
				customHTML.append("','");
				customHTML.append(datasetHijos.getValue(j, "cons_nroLote"));
				customHTML.append("','");
				customHTML.append(datasetHijos.getValue(j, "cons_vencimiento"));
				customHTML.append("','");
				customHTML.append(datasetHijos.getValue(j, "cons_tipo"));
				customHTML.append("','");
				customHTML.append(datasetHijos.getValue(j, "cons_observacion"));
				customHTML.append("','");
				
				// busqueda de derivacion de consultas hermanas #8725
				var c5 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST); 
				var c6 = DatasetFactory.createConstraint("aten_nroSolicitud", datasetHijos.getValue(j, "cons_nroSolicitud"), datasetHijos.getValue(j, "cons_nroSolicitud"), ConstraintType.MUST); 
				var datasetHermanas = DatasetFactory.getDataset("raf-atencion-consultas", null, [c5,c6], null);
				if(datasetHermanas.rowsCount > 0){
					log.info("Obteniendo derivación de solicitud hermana nro. " + datasetHijos.getValue(j, "cons_nroSolicitud"));
					customHTML.append(datasetHermanas.getValue(0, "aten_derivacion"));
					log.info("Derivación de solicitud hermana nro. " + datasetHijos.getValue(j, "cons_nroSolicitud") + " obtenida: " + datasetHermanas.getValue(0, "aten_derivacion"));				
				}else{					
					log.error("Se produjo un error al consultar la derivacion de la solicitud hermana.");				
					customHTML.append(datasetHijos.getValue(j, "cons_derivacion"));
				}
				
				customHTML.append("','");
				customHTML.append(datasetHijos.getValue(j, "cons_rellamada"));
				customHTML.append("',");						
				if(form.getFormMode() == "ADD" || form.getFormMode() == "MOD"){
					customHTML.append("'val']);"); 
				}else{
					customHTML.append("'html']);"); 
				}
				customHTML.append("</script>"); 
				
			}			
		
		}
		
		agregarAdjuntos(form, customHTML, nroSolicitudPadre);
		agregarAdjuntos(form, customHTML, nroSolicitudHijo);

	}else{
		log.error("Error no se encuentra el Nro de solicitud: " + nroSolicitudPadre);
	}
		
}

function arqForms(form,customHTML) { 
		customHTML.append("<script type='text/javascript'>");
		customHTML.append("if (arqForms && arqForms.initForm) {");
		customHTML.append("arqForms.initForm('" +form.getFormMode() + "')"); 
		customHTML.append("}</script>"); 		
}

function agregarAdjuntos(form, customHTML, nroSolicitudPadre, funcion){

	var c01 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", nroSolicitudPadre, nroSolicitudPadre, ConstraintType.MUST); 
	var workflowProcessDataset = DatasetFactory.getDataset("workflowProcess", null, [c01], null);

	var attachmentSeqId = workflowProcessDataset.getValue(0, "attachmentSeqId");

	var c02 = DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", nroSolicitudPadre, nroSolicitudPadre, ConstraintType.MUST); 
	var c03 = DatasetFactory.createConstraint("processAttachmentPK.attachmentSequence", attachmentSeqId, attachmentSeqId, ConstraintType.MUST); 
	var processAttachmentDataset = DatasetFactory.getDataset("processAttachment", null, [c02,c03], null);
	var fichaDocumentId = processAttachmentDataset.getValue(0, "documentId");
	
	var sortingFields = ["documentId", "version"];
	var c04 = DatasetFactory.createConstraint("documentId", fichaDocumentId, fichaDocumentId, ConstraintType.MUST_NOT);
	var c05 = DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", nroSolicitudPadre, nroSolicitudPadre, ConstraintType.MUST); 
	var attachmentDataset = DatasetFactory.getDataset("processAttachment", null, [c04,c05], sortingFields);

	log.info("************ displayFields nroSolicitudPadre: " + nroSolicitudPadre + " attachmentDataset.rowsCount: " + attachmentDataset.rowsCount + " fichaDocumentId: " + fichaDocumentId);
	
	for(var j = 0; j < attachmentDataset.rowsCount; j++) { 
	
		var documentId = attachmentDataset.getValue(j, "documentId");
		
		if(fichaDocumentId != documentId){

			var version = attachmentDataset.getValue(j, "version");
			var documentLink = "/webdesk/documentviewer?companyId=1&WDNrDocto=" + documentId + "&WDNrVersao=" + version;
			
			log.info("*********************** documentId: " + documentId + " version: " + version + " j: " + j);

			var c2 = DatasetFactory.createConstraint("documentPK.documentId", documentId, documentId, ConstraintType.MUST); 
			var c3 = DatasetFactory.createConstraint("documentPK.version", version, version, ConstraintType.MUST); 
			var documentDataset = DatasetFactory.getDataset("document", null, [c2,c3], null);
				
			var documentDescription = documentDataset.getValue(0, "documentDescription");
			var publisherId  = documentDataset.getValue(0, "publisherId");
			
			var c4 = DatasetFactory.createConstraint("colleaguePK.colleagueId", publisherId, publisherId, ConstraintType.MUST); 
			var datasetColleague = DatasetFactory.getDataset("colleague", null, [c4], null);
		
			log.info("Document: " + documentDescription + " Empleado: " + datasetColleague.getValue(0, "colleagueName") + " Link: " + documentLink);
	
			customHTML.append("<script type='text/javascript'>");
			customHTML.append("arqForms.agregarAdjunto("); 	
			customHTML.append("{'colleagueName': '" + datasetColleague.getValue(0, 'colleagueName') + "' ,'documentDescription': '" + documentDescription + "' ,'documentLink': '" + documentLink + "'}"); 	
			customHTML.append(");");
			customHTML.append("</script>"); 	
		
		}
		
	}
	
}