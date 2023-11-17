function beforeTaskSave(colleagueId,nextSequenceId,userList){

	var tarea = getValue("WKNumState");
	var completo = getValue("WKCompletTask");
	var comentarios = getValue("WKUserComment");
	var nroProceso = getValue("WKNumProces");
	var proceso = getValue("WKDef");

	// Si la proxima tarea es Actualizar Documentacion o Confirmacion de Lectura
	if (nextSequenceId == 2 || nextSequenceId == 5) {	
		var codigoGrupo = hAPI.getCardValue("codigoGrupo");
		hAPI.setCardValue("usuarios", getUsuarios(codigoGrupo));	
	}
	
	var asunto = hAPI.getCardValue("asunto");
	var tipologia = hAPI.getCardValue("tipologia");
	var estado = hAPI.getCardValue("estado");

	hAPI.setCardValue("anexoPrincipal", asunto + " | " + tipologia + " | " + estado);
	
	
	var dateParser = new java.text.SimpleDateFormat("yyyy-MM-dd");
	
	if (tarea == 1) {
		var matricula = hAPI.getCardValue("matricula");
		
		var c01 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST); 
		var constraints = new Array(c01);
		var dataset = DatasetFactory.getDataset("colleague", null, constraints, null); 
		
		if(dataset.rowsCount == 1){ 
			hAPI.setCardValue("solicitante", dataset.getValue(0, "colleagueName"));
		}else{
			log.error("Error no se encuentra el usuario para la matricula: " + matricula);
		}

		hAPI.setCardValue("fechaInicioSolicitud", dateParser.format(new Date()));
	}
	
	if (nextSequenceId == 4 && completo == 'true') {
		hAPI.setCardValue("fechaFinSolicitud", dateParser.format(new Date()));
	}
	
	
	if (tarea == 1 && completo == 'false') {
		hAPI.setCardValue("tarea", "CARGAR DOCUMENTACION");
	}else if (nextSequenceId == 2 && completo == 'true') {
		hAPI.setCardValue("tarea", "ACTUALIZAR DOCUMENTACION");
	}else if (nextSequenceId == 3 && completo == 'true') {
		hAPI.setCardValue("tarea", "REVISAR DOCUMENTACION");
	}else if (nextSequenceId == 4 && completo == 'true') {
		hAPI.setCardValue("tarea", "FINALIZACION");
	}else if (nextSequenceId == 5 && completo == 'true') {
		hAPI.setCardValue("tarea", "CONFIRMACION DE LECTURA");
	}
	
}
