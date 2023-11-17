function afterTaskCreate(colleagueId){

 	var tareaActual = getValue("WKNumState");
    var proximaTarea = getValue("WKNextState");
    var nroProceso = getValue("WKNumProces");
    var numEmpresa = getValue("WKCompany");
    
	var fechaIngresoString = hAPI.getCardValue("fechaIngreso");
	var simpleDateFormat = new java.text.SimpleDateFormat("dd/MM/yyyy");
	
	if(fechaIngresoString != null){
		var fechaIngreso = simpleDateFormat.parse(fechaIngresoString);
	}	

    var calendar = java.util.Calendar.getInstance();

	//Plazo para "Dar de Alta Empleado en AFIP"
	if (tareaActual == 80 && proximaTarea == 45){
			
		calendar.setTime(fechaIngreso);
		calendar.add(java.util.Calendar.DATE,-3);
		fechaIngreso = calendar.getTime();
	
		hAPI.setDueDate(nroProceso, hAPI.getActualThread(numEmpresa, nroProceso, proximaTarea), colleagueId, fechaIngreso, 28800);
	}
	
	//Plazo para "Completar Informacion en RHPRO"
	if (proximaTarea == 47 || proximaTarea == 105 ){
			
		calendar.setTime(fechaIngreso);
		calendar.add(java.util.Calendar.DATE,-1);
		fechaIngreso = calendar.getTime();
	
		hAPI.setDueDate(nroProceso, hAPI.getActualThread(numEmpresa, nroProceso, proximaTarea), colleagueId, fechaIngreso, 28800);
	}
	
}