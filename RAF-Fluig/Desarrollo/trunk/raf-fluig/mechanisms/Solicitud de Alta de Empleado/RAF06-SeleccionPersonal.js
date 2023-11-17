/*
 * Código: RAF06-SolicitudAltaPuesto
 * Nombre: RAF06-SolicitudAltaPuesto
 * Descripción: Si el campo NO es confidencial se debe asignar la tarea al pool del grupo Selección de Personal caso contrario  a los usuarios de Seleccion de Personal y que esten en el grupo jefe.
 */ 
function resolve(process,colleague){ 

	var nroSolicitud = process.getWorkflowProcessPK().getProcessInstanceId();
	var attSeqId = process.getAttachmentSeqId().intValue();

	log.info('***** Mecanismo RAF06-SolicitudAltaPuesto *******');
	log.info('***** Mecanismo RAF06-SolicitudAltaPuesto para nroSolicitud: ' + nroSolicitud + ' attSeqId: ' + attSeqId);
	// busco docId del formulario
	var c1 = DatasetFactory.createConstraint('processAttachmentPK.processInstanceId', nroSolicitud, nroSolicitud, ConstraintType.MUST);  
	var c2 = DatasetFactory.createConstraint('processAttachmentPK.attachmentSequence', attSeqId, attSeqId, ConstraintType.MUST);  
	var dsAttachment = DatasetFactory.getDataset('processAttachment', null, [c1, c2], null);
	var docId = dsAttachment.getValue(0, 'documentId'); 
	
	log.info('***** Mecanismo RAF06-SolicitudAltaPuesto para nroSolicitud: ' + nroSolicitud + ' docId: ' + docId);
	
	var confidencial = getCardData(process, 'busquedaConfidencial'); 
	
	log.info('***** Busqueda en RAF06-FormularioPrincipal nroSolicitud: ' + nroSolicitud + ' confidencial: ' + confidencial);
	
	var lista = new java.util.ArrayList();
	
	if(confidencial == "si"){
		
		//retorna las matriculas
		var seleccionDePersonal = getUserList("UN3-RRHH-SELE");
		var jefes = getUserList("ROL-JFE");
		
		log.info('***** Mecanismo RAF06-SolicitudAltaPuesto Grupo SelecionPersonal: ' + seleccionDePersonal + ' Grupo Jefe: ' + jefes);
		
		for(var i = 0; i < seleccionDePersonal.size(); i++){
			
			var matricula = seleccionDePersonal.get(i);
			
			if(jefes.contains(matricula)){
				lista.add(matricula);
			}
			
		}
		
		log.info('***** Mecanismo RAF06-SolicitudAltaPuesto Confidencial: ' + lista);
		
		return lista;
		
	}else{
		//retorna el pool group		
		lista.add('Pool:Group:UN3-RRHH-SELE');
		
		log.info('***** Mecanismo RAF06-SolicitudAltaPuesto No Confidencial: ' + lista);
		
		return lista;
		
	}
	
}

function getUserList(codigoGrupo){

    var userList = new java.util.HashSet(); 
 
    var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", codigoGrupo, codigoGrupo, ConstraintType.MUST); 
  
    var dataset = DatasetFactory.getDataset("colleagueGroup", null, [c1], null);

   for(var i = 0; i < dataset.rowsCount; i++) {         
      var colleagueId = dataset.getValue(i, "colleagueGroupPK.colleagueId");            
      userList.add(colleagueId);
    }

   return new java.util.ArrayList(userList);
 
}

function getCardData(process, formField){
	
    var sl = new javax.naming.InitialContext();
    
    var paBO = sl.lookup("java:global/fluig/ecm-ejb/wdk/ProcessAttachment")
    var pa = paBO.read(new com.datasul.technology.webdesk.workflow.model.ProcessAttachmentPK(process.getWorkflowProcessPK().getCompanyId(), process.getAttachmentSeqId().intValue(), process.getWorkflowProcessPK().getProcessInstanceId()));

    var docBO = sl.lookup("java:global/fluig/ecm-ejb/wdk/Document")
    var document = docBO.read(com.datasul.technology.webdesk.dm.model.DocumentPK(pa.getProcessAttachmentPK().getCompanyId(), pa.getVersion().intValue(), pa.getDocumentId()));

    docBO.remove();
     
    var cardBO = sl.lookup("java:global/fluig/ecm-ejb/wdk/Card")
    var result = cardBO.getCardValueWithChildren(document, formField);
    cardBO.remove();
      
    return result;
	
}
