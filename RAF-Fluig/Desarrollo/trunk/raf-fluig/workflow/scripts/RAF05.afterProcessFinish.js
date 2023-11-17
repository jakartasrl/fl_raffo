function afterProcessFinish(processId){
	
	var fecha = new Date();
	var dateParser = new java.text.SimpleDateFormat("yyyy-MM-dd");
	hAPI.setCardValue("fechaFinSolicitud", dateParser.format(fecha));
	
}