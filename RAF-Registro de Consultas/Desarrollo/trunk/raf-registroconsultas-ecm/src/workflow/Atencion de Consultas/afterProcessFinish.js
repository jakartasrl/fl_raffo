function afterProcessFinish(processId){

	var fecha = new Date();
	var dateParser = new java.text.SimpleDateFormat("yyyy-MM-dd");
	hAPI.setCardValue("fechaFinSolicitud", dateParser.format(fecha));
	hAPI.setCardValue("horaFinSolicitud", fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds());

	var userId = getValue("WKUser");
	var companyId = getValue("WKCompany");
	var nroSolicitudPadre = hAPI.getCardValue("padre_nroSolicitud");
	
	var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST); 
	var c2 = DatasetFactory.createConstraint("padre_nroSolicitud", nroSolicitudPadre, nroSolicitudPadre, ConstraintType.MUST); 
	var datasetAtenciones = DatasetFactory.getDataset("raf-atencion-consultas", null, [c1,c2], null); 
	
	for(j = 0; j < datasetAtenciones.rowsCount; j++) { 

		if((datasetAtenciones.getValue(j, "tarea") != "CONSULTA CERRADA" ) && (datasetAtenciones.getValue(j, "tarea") != "CONSULTA CANCELADA")){
	
			return;
			
		}
	
	}
	
	try {
	
		var processInstanceId = nroSolicitudPadre;
		var choosedState = 5;
		var colleagues = new java.util.ArrayList();
		var comments = "";
		var completeTask = true;
		var attachments = null;
		var appointment = null;
		var managerMode = true;
		var threadSequence = 0;
		var replacementId = null;
		
		var workflowService = locateService("com.datasul.technology.webdesk.workflow.service.WorkflowEngineServiceDelegateBI");
		
		var cardData = workflowService.getCardData(companyId, processInstanceId, userId);
		cardData.put("cerrarConsulta", "1");
		
		workflowService.saveAndSendTask(companyId, processInstanceId,choosedState, colleagues, comments, "procesobpm", completeTask, attachments, cardData, appointment, managerMode, threadSequence, replacementId);
		
	} catch(e) {
		log.info("########## Erro saveAndSendTask: " + e);
		throw 'Se produjo un error al finalizar la solicitud desde Atención de Consultas. Por favor, consulte con el administrador del sistema.';
	}
	
}

function locateService(service) {
	return com.datasul.technology.webdesk.util.ServiceLocator.getInstance().locate(java.lang.Class.forName(service));
}