function displayFields(form,customHTML){
	arqForms(form, customHTML); 
	
	var subindicesHijos = form.getValue("subindicesHijos").split(",");
	
	log.info("subindicesHijos: " + subindicesHijos);
	
	for(i = 0 ; i < subindicesHijos.length ; i++){
					
		var nroSolicitud = form.getValue("cons_nroSolicitud___" + subindicesHijos[i]);
		
		if(nroSolicitud != null && nroSolicitud != ""){
			var c01 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST); 
			var c02 = DatasetFactory.createConstraint("aten_nroSolicitud", nroSolicitud, nroSolicitud, ConstraintType.MUST); 
			var constraints = new Array(c01, c02);
			var datasetHijos = DatasetFactory.getDataset("raf-atencion-consultas", null, constraints, null);
			
			log.info("datasetHijos.rowsCount: " + datasetHijos.rowsCount);
			log.info("aten_derivacion: " + datasetHijos.getValue(0, "aten_derivacion"));
			
			form.setValue("cons_derivacion___" + subindicesHijos[i], datasetHijos.getValue(0, "aten_derivacion"));
			form.setValue("cons_tarea___" + subindicesHijos[i], datasetHijos.getValue(0, "tarea"));
		}
		
	}
	
}
function arqForms(form,customHTML) { 
		customHTML.append("<script type='text/javascript'>");
		customHTML.append("if (arqForms && arqForms.initForm) {");
		customHTML.append("arqForms.initForm('" +form.getFormMode() + "')"); 
		customHTML.append("}</script>"); 		
}