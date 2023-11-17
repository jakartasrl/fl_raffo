
function resolve(process, colleague){ 
	
	var nroSolicitud = process.getWorkflowProcessPK().getProcessInstanceId();

	log.info('***** Iniciando mecanismo de atribucion RAF08-AsistenteDistrito para nroSolicitud: ' + nroSolicitud);
	
	var codigoGrupo = formValue("codGrupoAsistDistrito");
	
	var usuariosDelGrupo = getUserList(codigoGrupo);
	var resultado = new java.util.ArrayList();

	if (usuariosDelGrupo.size() != 1) { 
		// Si no hay ningun usuario o hay mas de uno devuelvo el pool.
		resultado.add("Pool:Group:" + codigoGrupo);
	} else { 
		// Si hay un solo usuario devuelvo ese usuario.
		resultado.addAll(usuariosDelGrupo);
	}
	
	log.info('***** Finalizando mecanismo de atribucion RAF08-AsistenteDistrito para nroSolicitud: ' + nroSolicitud + ', resultado: ' + resultado);
	
	return resultado;
}

function getUserList(codigoGrupo){

    var userList = new java.util.HashSet(); 
    var c1 = DatasetFactory.createConstraint('colleagueGroupPK.groupId', codigoGrupo, codigoGrupo, ConstraintType.MUST);          
    var dataset = DatasetFactory.getDataset('colleagueGroup', null, [c1], null);

	for(var i = 0; i < dataset.rowsCount; i++) {         
      var colleagueId = dataset.getValue(i, 'colleagueGroupPK.colleagueId');            
      userList.add(colleagueId);
    }
	
	return new java.util.ArrayList(userList);
	
}

function formValue(fieldName){
	// Para evitar que Fluig "decte" el get  Card  Value todo junto
	// Y fuerze la re-evaluacion del mecanismo
	return hAPI["get"+"Card"+"Value"](fieldName);
	
}

