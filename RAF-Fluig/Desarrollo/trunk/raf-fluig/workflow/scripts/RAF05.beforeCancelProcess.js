function beforeCancelProcess(colleagueId,processId){

	var activeStates = hAPI.getActiveStates();	
	if (!(activeStates.size() == 1 && activeStates.get(0) == 8)) {
		throw "No se puede cancelar la solicitud en esta tarea.";
	}
	
}