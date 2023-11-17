function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var tareaActual = getValue("WKNumState");
	var completo = getValue("WKCompletTask");
	
	if(hAPI.getCardValue("ingresoPersonal") == 'PE' && hAPI.getCardValue("cantidadTareasOrdenPrioridad") < 4){
		throw "Debe cargar al menos 4 tareas.";
	}
	
	if(hAPI.getCardValue("nivelEstudioSeleccionados") < 0){
		throw "Debe seleccionar al menos un nivel de estudio.";
	}
	
	
	if (tareaActual == 8 && completo == 'false') {
		hAPI.setCardValue("tarea", "INICIAR SOLICITUD");
	}else if (nextSequenceId == 9 && completo == 'true') {
		hAPI.setCardValue("tarea", "REVISAR SOLICITUD");
	}else if (nextSequenceId == 10 && completo == 'true') {
		hAPI.setCardValue("tarea", "COMPLETAR SOLICITUD");
	}else if (nextSequenceId == 11 && completo == 'true') {
		hAPI.setCardValue("tarea", "CONFIRMAR SOLICITUD");
	}else if (nextSequenceId == 13 && completo == 'true') {
		hAPI.setCardValue("tarea", "APROBAR SOLICITUD JEFE");
	}else if (nextSequenceId == 18 && completo == 'true') {
		hAPI.setCardValue("tarea", "APROBAR SOLICITUD GTE RRHH");		
	}else if (nextSequenceId == 19 && completo == 'true') {
		hAPI.setCardValue("tarea", "APROBAR SOLICITUD GTE N-2");
	}else if (nextSequenceId == 20 && completo == 'true') {
		hAPI.setCardValue("tarea", "SOLICITUD CANCELADA");
	}else if (nextSequenceId == 22 && completo == 'true') {
		hAPI.setCardValue("tarea", "APROBAR SOLICITUD GTE N-1");
	}else if (nextSequenceId == 23 && completo == 'true') {
		hAPI.setCardValue("tarea", "APROBAR SOLICITUD GTE GRAL");
	}else if (nextSequenceId == 24 && completo == 'true') {
		hAPI.setCardValue("tarea", "PROCESO SELECCION");
	}else if (nextSequenceId == 25 && completo == 'true') {
		hAPI.setCardValue("tarea", "SOLICITUD FINALIZADA");
	}	
	
}