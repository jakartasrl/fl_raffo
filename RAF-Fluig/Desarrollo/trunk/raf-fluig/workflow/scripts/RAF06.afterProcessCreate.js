function afterProcessCreate(processId){
	
	hAPI.setCardValue("nroSolicitud", processId);
	
	var dateParser = new java.text.SimpleDateFormat("yyyy-MM-dd");

	hAPI.setCardValue("fechaInicioSolicitud", dateParser.format(new Date()));

}