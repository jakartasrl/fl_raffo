function displayFields(form,customHTML){
	var arq = arqMarvinLoad("v1", {
		form: "com.arquimeda.marvin.server.js.Form-v1"
	});
	
	var matricula = getValue("WKUser");
	var companyId = getValue("WKCompany");
	var tarea = getValue("WKNumState");
	
	var c1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", companyId, companyId, ConstraintType.MUST);         
	var c2 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST);         
	var c3 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "ROL-SIS", "ROL-SIS", ConstraintType.MUST);         
	var dtsSistemas = DatasetFactory.getDataset("colleagueGroup", null, [c1,c2,c3], null);

	var extraParams = {
		esDeSistemas: dtsSistemas.rowsCount > 0
	};
	arq.form.displayFields(form,customHTML,extraParams);
	
	
	if (form.getValue("fechaAlta") == "") {
		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
		form.setValue("fechaAlta", sdf.format(new java.util.Date()));
	}
	
	if (form.getValue("matriculaSolicitante") == "") {
		form.setValue("matriculaSolicitante", matricula);
		
		var c = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);         
		var datasetResponsables = DatasetFactory.getDataset("RAF06-Responsables", null, [c], null);
		
		if(datasetResponsables.rowsCount == 1){
			
			form.setValue("responsableAltaUsuario", datasetResponsables.getValue(0, "responsableAltaUsuario"));
			form.setValue("responsableTarjetaAcceso", datasetResponsables.getValue(0, "responsableTarjetaAcceso"));
			form.setValue("responsableTarjetaCafeteria", datasetResponsables.getValue(0, "responsableTarjetaCafeteria"));
			form.setValue("responsableTarjetasPersonales", datasetResponsables.getValue(0, "responsableTarjetasPersonales"));
		}
	}

}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};

