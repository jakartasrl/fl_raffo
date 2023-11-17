/*
 * Código: RAF07-INI
 * Nombre: RAF07-INI
 * Descripción: ...
 */ 
function resolve(process,colleague){ 
	var nroSolicitud = process.getWorkflowProcessPK().getProcessInstanceId();

	log.info('***** Mecanismo RAF07-INI para nroSolicitud: ' + nroSolicitud);
	
	var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "RAF07-INI%", "RAF07-INI%", ConstraintType.MUST);
	c1.setLikeSearch(true);
	var datasetColleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, [c1], null);
	
	var lista = new java.util.ArrayList();
	for (var i = 0; i < datasetColleagueGroup.rowsCount; i++) {
		lista.add(datasetColleagueGroup.getValue(i,"colleagueGroupPK.colleagueId"));
	}

	return lista;
}