function beforeTaskSave(colleagueId,nextSequenceId,userList){

	var tareaActual = getValue("WKNumState");
	var completo = getValue("WKCompletTask");
	var nroSolicitud = getValue("WKNumProces");
	var observaciones = getValue("WKUserComment");
	
	hAPI.setCardValue("historicoObservaciones", observaciones);
	hAPI.setCardValue("mostrarHistoricoObservaciones", "1");
	
	if (tareaActual == 6 && nextSequenceId == 3 && completo == 'true') {
	
		var c1 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", nroSolicitud, nroSolicitud, ConstraintType.MUST); 
		var c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST); 
		
		var processTaskDataset = DatasetFactory.getDataset("processTask", null, [c1,c2], null); 
		 
		var nroSolicitud = processTaskDataset.getValue(0, "processTaskPK.processInstanceId");
		var deadlineDate = processTaskDataset.getValue(0, "deadlineDate");  
		var deadlineHour = processTaskDataset.getValue(0, "deadlineHour"); 
		  
		log.info("nroSolicitud: " + nroSolicitud + " deadlineDate: " + deadlineDate + " deadlineHour: " + deadlineHour);
		
		var ahora = formatDate(new Date());
		var vencimiento = formatDateMinutes(deadlineDate,deadlineHour);
		var motivoAtraso = hAPI.getCardValue("aten_motivoAtraso");
			
		log.info("ahora: " + ahora + " vencimiento: " + vencimiento + " motivoAtraso: " + motivoAtraso);		
		
		if((ahora > vencimiento) && (motivoAtraso == '')){
			throw 'Debe completar el motivo del atraso.';
		}

	}
	
	if (tareaActual == 3 && (nextSequenceId == 4 || nextSequenceId == 8) && completo == 'true') {
		
		var aten_contieneEventoAdverso = hAPI.getCardValue("aten_contieneEventoAdverso");
		var aten_conclusion = hAPI.getCardValue("aten_conclusion");
		var aten_licenciante = hAPI.getCardValue("aten_licenciante");
	
		if(aten_contieneEventoAdverso == "" || aten_conclusion == "" || aten_licenciante == ""){
			throw 'Los campos Licenciante, Evento Adverso y Conclución son obligatorios.';
		}
		
	}
	
	if (tareaActual == 1 && completo == 'false') {
		hAPI.setCardValue("tarea", "INICIAR CONSULTA");
	}else if (nextSequenceId == 2 && completo == 'true') {
		hAPI.setCardValue("tarea", "CORREGIR DATOS");
	}else if (nextSequenceId == 3 && completo == 'true') {
		hAPI.setCardValue("tarea", "REVISAR CONSULTA");
	}else if (nextSequenceId == 4 && completo == 'true') {
		hAPI.setCardValue("tarea", "CONSULTA CERRADA");
	}else if (nextSequenceId == 5 && completo == 'true') {
		hAPI.setCardValue("tarea", "COMPLETAR CONSULTA");
	}else if (nextSequenceId == 6 && completo == 'true') {
		hAPI.setCardValue("tarea", "ATENDER CONSULTA");		
	}else if (nextSequenceId == 8 && completo == 'true') {
		hAPI.setCardValue("tarea", "CONSULTA CANCELADA");
	}	
	
	if (tareaActual == 1 && nextSequenceId == 6 && completo == 'true') {
		hAPI.setCardValue("anexoPrincipal", hAPI.getCardValue("anexoPrincipal") + "(" + nroSolicitud + ")");
		log.info("########## Estableciendo Anexo Principal: " + hAPI.getCardValue("anexoPrincipal"));
	}

}
