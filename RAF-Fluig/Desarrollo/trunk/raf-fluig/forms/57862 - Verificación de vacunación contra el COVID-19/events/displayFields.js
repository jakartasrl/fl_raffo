function displayFields(form, customHTML) {		
	var activity = getValue('WKNumState');
	if (activity == 3 || activity == 0) {     
		form.setValue('Legajo', getValue('WKUser'));
		
		var matricula = getValue("WKUser");
		var c1 = DatasetFactory.createConstraint("matricula", matricula, matricula, ConstraintType.MUST);         
		var datasetResponsables = DatasetFactory.getDataset("RAF06-empleados-dom", null, [c1], null);
		form.setValue("Nombre", datasetResponsables.getValue(0, "nombreCompleto"));
	}
	
}