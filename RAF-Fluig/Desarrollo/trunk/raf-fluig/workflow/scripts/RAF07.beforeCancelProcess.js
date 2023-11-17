function beforeCancelProcess(colleagueId,processId){

	var managerMode = getValue("WKManagerMode") == true;
	
	if (hAPI.getCardValue("isApproved").equals("true") && !managerMode) {
		throw "No se puede cancelar la solicitud en esta tarea.";
	}
	
	hAPI.setCardValue("currentState", "CANCELADA");
}