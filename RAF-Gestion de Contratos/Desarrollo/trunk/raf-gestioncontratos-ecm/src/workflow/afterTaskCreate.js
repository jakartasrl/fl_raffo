function afterTaskCreate(colleagueId){

	var tareaActual = getValue("WKNumState");
	var proximaTarea = getValue("WKNextState");
	var completo = getValue("WKCompletTask");
	var comentarios = getValue("WKUserComment");
	var nroProceso = getValue("WKNumProces");	
	
	// Si la proxima tarea es Contrato Vigente
	if (tareaActual == 29 || proximaTarea == 33) {
		setFechaRevision(colleagueId);
	}
	
	// Si la proxima tarea es Contrato Proximo a Vencer
	if (tareaActual == 33 || proximaTarea == 43) {
		setFechaFinVigencia(colleagueId);
	}
		
}

