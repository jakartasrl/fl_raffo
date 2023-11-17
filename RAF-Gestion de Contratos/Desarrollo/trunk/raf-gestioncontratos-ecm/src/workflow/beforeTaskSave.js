function beforeTaskSave(colleagueId,nextSequenceId,userList){

	var tarea = getValue("WKNumState");
	var completo = getValue("WKCompletTask");
	var observaciones = getValue("WKUserComment");
	var nroProceso = getValue("WKNumProces");
	
	if(hAPI.getCardValue("provs_countProveedores") < 3){
		throw "Debe cargar al menos 3 proveedores.";
	}
	
	if(completo && (hAPI.getCardValue("montoTotalUSD") == "" || hAPI.getCardValue("montoTotalUSD") == 0)){
		throw "Debe cargar al menos un artículo y seleccionar un proveedor.";
	}
	
	var sumatoriaCtaPorcentaje = hAPI.getCardValue("sumatoria_porcentaje");
	var imputacionContable = hAPI.getCardValue("imputacionContable");
	
	if(imputacionContable == "imputacionContable3" && sumatoriaCtaPorcentaje != "100,00"){
		throw ' La sumatoria de porcentajes debe ser igual a "100,00"';
	}
	
	// Si la proxima tarea es Contrato Cancelado las observaciones son obligatorias.
	if (nextSequenceId == 32 || nextSequenceId == 34) {
		if(observaciones == "" ){
			throw 'Debe completar el campo observaciones para poder revisar o cancelar el contrato.';
		}		
	}
	
	// Guardo la tarea en la que se encuentra la solicitud para el reporte de estado.
	if (tarea == 1 && !completo) {
		hAPI.setCardValue("wf_estado", "CARGAR CONTRATO");
	}else if (nextSequenceId == 7 && completo) {
		hAPI.setCardValue("wf_estado", "VALIDAR PRE CONTRATO");
	}else if (nextSequenceId == 34 && completo) {
		hAPI.setCardValue("wf_estado", "REVISION");
	}else if (nextSequenceId == 35 && completo) {
		hAPI.setCardValue("wf_estado", "ADJUNTAR DOCUMENTACION");
	}else if (nextSequenceId == 36 && completo) {
		hAPI.setCardValue("wf_estado", "APROBACION JEFE DE COMPRAS");
	}else if (nextSequenceId == 38 && completo) {
		hAPI.setCardValue("wf_estado", "APROBACION GERENTE DE COMPRAS");
	}else if (nextSequenceId == 39 && completo) {
		hAPI.setCardValue("wf_estado", "APROBACION GERENTE DE OPERACIONES");
	}else if (nextSequenceId == 41 && completo) {
		hAPI.setCardValue("wf_estado", "APROBACION GERENTE GENERAL");
	}else if (nextSequenceId == 42 && completo) {
		hAPI.setCardValue("wf_estado", "APROBACION PRESIDENTE DEL DIRECTORIO");
	}else if (nextSequenceId == 29 && completo) {
		hAPI.setCardValue("wf_estado", "ADJUNTAR CONTRATO FIRMADO");
	}else if (nextSequenceId == 33 && completo) {
		hAPI.setCardValue("wf_estado", "CONTRATO VIGENTE");
	}else if (nextSequenceId == 43 && completo) {
		hAPI.setCardValue("wf_estado", "CONTRATO PROXIMO A VENCER");
	}else if (nextSequenceId == 45 && completo) {
		hAPI.setCardValue("wf_estado", "CONTRATO VENCIDO");
	}else if (nextSequenceId == 32 && completo) {
		hAPI.setCardValue("wf_estado", "CONTRATO CANCELADO");
	}else if (nextSequenceId == 31 && completo) {
		hAPI.setCardValue("wf_estado", "CONTRATO REVOCADO");
	}else if (nextSequenceId == 44 && completo) {
		hAPI.setCardValue("wf_estado", "CONTRATO FINALIZADO");
	}
	
	// Si la tarea es Cargar Contrato y aun no tiene numero de requerimiento asinado se lo asigno.
	if (tarea == 1 && hAPI.getCardValue("nroRequerimiento") == "") {
		hAPI.setCardValue("nroRequerimiento", proximoNumero("R01_NRO_REQUERIMIENTO"));
	}
	
	// Si la proxima tarea es Adjuntar Contrato Firmado
	if (nextSequenceId == 29 && completo){
		hAPI.setCardValue("nroContrato", proximoNumero("R01_NRO_CONTRATO"));
	}

}
