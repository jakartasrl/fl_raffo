function beforeCancelProcess(colleagueId,processId){
	
	var ejb = new javax.naming.InitialContext().lookup("java:global/raf-inversioncomercial-backend/CartaAcuerdoEJB");
	
	log.error('**** beforeCancelProcess ');
	hAPI.setCardValue("tarea", "SOLICITUD CANCELADA");
	
	ejb.actualizarEstado(java.lang.Integer.parseInt(processId), "SOLICITUD CANCELADA", "CANCELADA");
	
}