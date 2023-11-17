function beforeCancelProcess(colleagueId,processId){
	
	var tarea = getValue("WKNumState");
	
	var tareas = {
		'IniciarSolicitud': 0,
		'Inicial': 4,
		'AprobarCA' : 5,
		'CompletarCA' : 10,
		'RevisarCA' : 12,
		'Finalizada' : 17,
		'Rechazada' : 21
	};
			
	if (tarea == tareas.AprobarCA) {
		
		throw "No se puede cancelar la solicitud en esta tarea.";
	
	} else{
		
		
		var ejb = new javax.naming.InitialContext().lookup("java:global/raf-inversioncomercial-backend/PetitorioCartaAcuerdoEJB");
		
		log.error('**** beforeCancelProcess ');
		hAPI.setCardValue("tarea", "SOLICITUD CANCELADA");
		
		ejb.actualizarEstado(java.lang.Integer.parseInt(processId), "SOLICITUD CANCELADA", "CANCELADA");
		
	}		
	
}