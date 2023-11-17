function afterTaskCreate(colleagueId){

	var tareaActual = getValue("WKNumState");
	var proximaTarea = getValue("WKNextState");
	var completo = getValue("WKCompletTask");
	var comentarios = getValue("WKUserComment");
	var nroProceso = getValue("WKNumProces");	
  
	var soloConfirmacionLectura = hAPI.getCardValue("soloConfirmacionLectura");  
	
	// Si la proxima tarea es Actualizar Documentacion y solo requiere confirmacion de lectura 
	if ((tareaActual == 6 || tareaActual == 3) && proximaTarea == 5 && soloConfirmacionLectura == 'true') {
		setPlazoAvanceAutomatico(colleagueId);
	}
	
}
