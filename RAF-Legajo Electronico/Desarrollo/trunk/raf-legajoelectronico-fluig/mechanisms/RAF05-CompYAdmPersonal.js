/*
 * Código: RAF05-CompYAdmPersonal
 * Nombre: RAF05-CompYAdmPersonal
 * Descripción: Si el campo NO es confidencial se debe asignar la tarea al pool del grupo Gerencia de Comp. y Adm. de Personal
 * caso contrario  a los usuarios de Gerencia de Comp. y Adm. de Personal y que esten en el grupo Gerente de Nivel N-2.
 */ 
function resolve(process,colleague){ 
	
	var nroSolicitud = process.getWorkflowProcessPK().getProcessInstanceId();
	var attSeqId = process.getAttachmentSeqId().intValue();
	
	// busco docId del formulario
	var c1 = DatasetFactory.createConstraint('processAttachmentPK.processInstanceId', nroSolicitud, nroSolicitud, ConstraintType.MUST);  
	var c2 = DatasetFactory.createConstraint('processAttachmentPK.attachmentSequence', attSeqId, attSeqId, ConstraintType.MUST);  
	var dsAttachment = DatasetFactory.getDataset('processAttachment', null, [c1, c2], null);
	var docId = dsAttachment.getValue(0, 'documentId'); 
	
	log.info('***** Mecanismo RAF05-CompYAdmPersonal para nroSolicitud: ' + nroSolicitud + ' docId: ' + docId);
	
	// busco formulario
	var c3 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);  
	var c4 = DatasetFactory.createConstraint('documentid', docId, docId, ConstraintType.MUST);
	var datasetForm = DatasetFactory.getDataset('RAF05-FormularioPrincipal', null, [c3, c4], null);
	
	var nroSolicitud = datasetForm.getValue(0, 'nroSolicitud'); 
	var confidencial = datasetForm.getValue(0, 'busquedaConfidencial'); 
	var ingresoPersonal = datasetForm.getValue(0, 'ingresoPersonal'); 
	
	log.info('***** Busqueda en RAF05-FormularioPrincipal nroSolicitud: ' + nroSolicitud + ' confidencial: ' + confidencial + ' ingresoPersonal: ' + ingresoPersonal);

	
	var lista = new java.util.ArrayList();
	
	if(confidencial == "SI"){
		
		//retorna las matriculas
		var seleccionDePersonal = getUserList("UN3-RRHH-COMP");
		var jefes = getUserList("ROL-GTE-N2");
		
		log.info('***** Mecanismo RAF05-CompYAdmPersonal Grupo SelecionPersonal: ' + seleccionDePersonal + ' Grupo Jefe: ' + jefes);

		for(var i = 0; i < seleccionDePersonal.size(); i++){
			
			var matricula = seleccionDePersonal.get(i);
			
			if(jefes.contains(matricula)){
				lista.add(matricula);
			}
		}
		
		log.info('***** Mecanismo RAF05-CompYAdmPersonal Confidencial: ' + lista);
		
		return lista;
		
	}else{
		//retorna el pool group		
		lista.add('Pool:Group: UN3-RRHH-COMP');
		
		log.info('***** Mecanismo RAF05-CompYAdmPersonal No Confidencial: ' + lista);
		
		return lista;
		
	}
	
}

function getUserList(codigoGrupo){

    var userList = new java.util.HashSet(); 
 
    var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", codigoGrupo, codigoGrupo, ConstraintType.MUST); 
  
    var dataset = DatasetFactory.getDataset("colleagueGroup", null, [c1], null);

   for(var i = 0; i < dataset.rowsCount; i++) {         
      var colleagueId = dataset.getValue(i, "colleagueGroupPK.colleagueId");            
      userList.add(colleagueId);
    }

   return new java.util.ArrayList(userList);
 
}