function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var tareaActual = getValue("WKNumState");
	var completo = getValue("WKCompletTask");
	var nroProceso = getValue("WKNumProces");
	var tareaDestino = getValue("WKNextState");
	
	log.error("DEBUG -- VALOR COMPLETO: " + completo + ".");
	log.error("DEBUG -- VALUE OF CONFIRMACIERRE: " + hAPI.getCardValue("confirmaCierre"));
	if (completo=="true" && tareaDestino == 25) {
		if (hAPI.getCardValue("confirmaCierre") != "1") {
			throw "Para cerrar la solicitud debe tildar el checkbox Confirma Cierre.";
		}  
	}
	
	var tareas = {
			inicio: 8,
			revisarYRelevarPerfil: 9,
			completarRemuneracionesYBeneficios: 10,
			revisarYConfirmarPerfil: 11,
			aprobarSolicitudPuestoPrimerAutorizante: 13,
			solicitudPuestoCancelada: 14,
			aprobarSolicitudPuestoGteRRHH: 18,
			aprobarSolicitudPuestoSegundoAutorizante: 19,
			cancelarSolicitudPuesto: 20,
			aprobarSolicitudPuestoGteN1: 22,
			aprobarSolicitudPuestoGteGral: 23,
			realizarProcesoSeleccion: 24,
			suspenderSolicitudPuesto: 58,
			seleccionarSolicitante: 74,
			fin: 25
	};
	
	if(hAPI.getCardValue("ingresoPersonal") == "PE" && hAPI.getCardValue("cantidadTareasOrdenPrioridad") < 4 && completo == "true"){
		throw "Debe cargar al menos 4 tareas.";
	}
	
	if(hAPI.getCardValue("nivelEstudioSeleccionados" && completo == "true") < 0){
		throw "Debe seleccionar al menos un nivel de estudio.";
	}
	
	// Para chequear que exista al menos un campo en la tabla carreras
	if(hAPI.getCardValue("carrera") == null){
		if(hAPI.getCardValue("carrera___1") == null && completo == "true"){
			throw "Debe cargar al menos una carrera.";
		}		
	}
	
//	log.info("########################################## " + hAPI.getCardValue("puestoReportaa"));
//	
//	if(hAPI.getCardValue("puestoReportaa") != "SUPERVISOR" && hAPI.getCardValue("puestoReportaa") != "JEFE" && hAPI.getCardValue("puestoReportaa") != "GERENTE"){
//		throw "El cargo del supervisor directo debe ser Supervisor, Jefe o Gerente.";
//	}
	
	var c1 = DatasetFactory.createConstraint("NRO_SOLICITUD", nroProceso, nroProceso, ConstraintType.MUST),
    c2 = DatasetFactory.createConstraint("LAST_MOV", true, true, ConstraintType.MUST); 
	var obsDts = DatasetFactory.getDataset("raf-observaciones", null, [c1,c2], null);
	
	var ultimaObservacion = obsDts.getValue(0, "OBSERVACIONES");
	
	if(ultimaObservacion == ""){
		
		if(completo == "true"){
			
			if((tareaActual == tareas.revisarYRelevarPerfil && nextSequenceId == tareas.seleccionarSolicitante) ||
					(tareaActual == tareas.completarRemuneracionesYBeneficios && nextSequenceId == tareas.revisarYRelevarPerfil) ||
					(tareaActual == tareas.revisarYConfirmarPerfil && nextSequenceId == tareas.completarRemuneracionesYBeneficios) ||
					(nextSequenceId == tareas.revisarYConfirmarPerfil && tareaActual != tareas.completarRemuneracionesYBeneficios)){
				
				throw "Debe realizar una observación para devolver la solicitud.";
			}
			
			if(nextSequenceId == tareas.suspenderSolicitudPuesto && tareaActual != tareas.revisarYConfirmarPerfil) {
				throw "Debe realizar una observación para suspender la solicitud.";
			}
			
			if(nextSequenceId == tareas.cancelarSolicitudPuesto) {
				throw "Debe realizar una observación para cancelar la solicitud.";
			}
		}
		
		
	}
	
	
	if (tareaActual == tareas.inicio && completo == "false") {
		hAPI.setCardValue("tarea", "INICIAR SOLICITUD DE PUESTO");
	}else if (nextSequenceId == tareas.revisarYRelevarPerfil && completo == "true") {
		hAPI.setCardValue("tarea", "REVISAR Y RELEVAR PERFIL");
	}else if (nextSequenceId == tareas.completarRemuneracionesYBeneficios && completo == "true") {
		hAPI.setCardValue("tarea", "COMPLETAR REMUNERACIONES Y BENEFICIOS");
	}else if (nextSequenceId == tareas.revisarYConfirmarPerfil && completo == "true") {
		hAPI.setCardValue("tarea", "REVISAR Y CONFIRMAR PERFIL");
	}else if (nextSequenceId == tareas.aprobarSolicitudPuestoPrimerAutorizante && completo == "true") {
		hAPI.setCardValue("tarea", "APROBAR SOLICITUD DE PUESTO PRIMER AUTORIZANTE");
	}else if (nextSequenceId == tareas.aprobarSolicitudPuestoGteRRHH && completo == "true") {
		hAPI.setCardValue("tarea", "APROBAR SOLICITUD DE PUESTO GTE RRHH");		
	}else if (nextSequenceId == tareas.aprobarSolicitudPuestoSegundoAutorizante && completo == "true") {
		hAPI.setCardValue("tarea", "APROBAR SOLICITUD DE PUESTO SEGUNDO AUTORIZANTE");
	}else if (nextSequenceId == tareas.cancelarSolicitudPuesto && completo == "true") {
		hAPI.setCardValue("tarea", "CANCELAR SOLICITUD DE PUESTO");
	}else if (nextSequenceId == tareas.aprobarSolicitudPuestoGteN1 && completo == "true") {
		hAPI.setCardValue("tarea", "APROBAR SOLICITUD DE PUESTO GTE N-1");
	}else if (nextSequenceId == tareas.aprobarSolicitudPuestoGteGral && completo == "true") {
		hAPI.setCardValue("tarea", "APROBAR SOLICITUD DE PUESTO GTE GRAL");
	}else if (nextSequenceId == tareas.realizarProcesoSeleccion && completo == "true") {
		hAPI.setCardValue("tarea", "REALIZAR PROCESO DE SELECCION");
	}else if (nextSequenceId == tareas.fin && completo == "true") {
		hAPI.setCardValue("tarea", "SOLICITUD DE PUESTO FINALIZADA");
	}else if (nextSequenceId == tareas.suspenderSolicitudPuesto && completo == "true") {
		hAPI.setCardValue("tarea", "SOLICITUD DE PUESTO SUSPENDIDA");
	}else if (nextSequenceId == tareas.solicitudPuestoCancelada && completo == "true") {
		hAPI.setCardValue("tarea", "SOLICITUD PUESTO CANCELADA");
	}	
	
	corregirCamposFecha("fechaInicioSolicitud");
	corregirCamposFecha("fechaFinSolicitud");
	
}


function corregirCamposFecha(nombreCampo){
	
	if (hAPI.getCardValue(nombreCampo) != null && hAPI.getCardValue(nombreCampo) != ""){
		var fechaArray = hAPI.getCardValue(nombreCampo).split("/");
		if (fechaArray.length > 1) {
			hAPI.setCardValue(nombreCampo, fechaArray[2]+"-"+fechaArray[1]+"-"+fechaArray[0]);
			log.error("*** Fue modificado el campo " + nombreCampo + " valor: " + hAPI.getCardValue(nombreCampo) + " solicitud: " + hAPI.getCardValue("nroSolicitud"));
		}		
	}
	
}
