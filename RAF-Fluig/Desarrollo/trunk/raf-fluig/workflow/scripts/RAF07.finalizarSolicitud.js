function finalizarSolicitud(){
	
	var indexes;
	var motivoId = hAPI.getCardValue("changeReasonId"); 	
	log.info("motivoId: " + motivoId);	
	
	changeGroupReasonType = hAPI.getCardValue("changeGroupReasonType");
	log.info("changeGroupReasonType: " + changeGroupReasonType);
	
	var finalizar = 'SI';
	
	if (changeGroupReasonType.equals("nuevoDisenio")){
		
		indexes = getChildrenIndexes("tipoNewProd");
		log.info("indexes: " + indexes);
		
		for (var i = 0; i < indexes.length; i++) {	
			
			log.info("finalizarSolicitud - codigoProd:  " + hAPI.getCardValue("tipoNewProd___"+indexes[i]) + ", estadoQADNewProd:  " + hAPI.getCardValue("estadoQADNewProd___"+indexes[i]));

			if(hAPI.getCardValue("estadoQADNewProd___"+indexes[i]) == 'PENDIENTE'){
				finalizar = 'NO';
			}
		}
		
	} else {
		indexes = getChildrenIndexes("codigoProd");
		
		for (var i = 0; i < indexes.length; i++) {
			log.info("finalizarSolicitud - codigoProd:  " + hAPI.getCardValue("codigoProd___"+indexes[i]) +", estadoQAD:  " + hAPI.getCardValue("estadoQAD___"+indexes[i]));
			
			if(hAPI.getCardValue("estadoQAD___"+indexes[i]) == 'PENDIENTE'){
				finalizar = 'NO';
			}
		}
	}
	
	log.info("Finalizar Solicitud: " + finalizar + " - contiene items PENDIENTES.");
	
	return finalizar;
 
}