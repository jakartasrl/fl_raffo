function displayFields(form,customHTML){
	var arq = arqMarvinLoad("v1", {
		form: "com.arquimeda.marvin.server.js.Form-v1"
	});
	var extraParams = {};
	
	var matricula = getValue("WKUser");
	var tarea = getValue("WKNumState");
	
	if (tarea==0 || tarea==8){
		var c1 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST);         
		var gruposDelUser = DatasetFactory.getDataset("colleagueGroup", null, [c1], null);
		
		var ingresoPersonalOpts = {};
		for(var i = 0; i < gruposDelUser.rowsCount; i++) {         
			var grupo = gruposDelUser.getValue(i, "colleagueGroupPK.groupId");
			
			if (grupo=='ROL-JFE' || grupo=='ROL-SOR' || grupo=='ROL-GTE-N0' || grupo=='ROL-GTE-N1' || grupo=='ROL-GTE-N2'){
				ingresoPersonalOpts['PE'] = 'Puesto Estándar';
			} else if (grupo=='ROL-STE-APM'){
				ingresoPersonalOpts['APM'] = 'Fuerza de Venta (APM)';
			} else if (grupo=='ROL-STE-APF'){
				ingresoPersonalOpts['APF'] = 'Fuerza de Venta (APF)';
			}
		}	
		extraParams.ingresoPersonalOpts = ingresoPersonalOpts;
		
		if(form.getValue("ingresoPersonal")!=""){
			extraParams.ingresoPersonalDefault = form.getValue("ingresoPersonal")+"";
		}
	}
	
	arq.form.displayFields(form,customHTML,extraParams);
	
	
	if (form.getValue("fechaRelevamientoPerfil") == "") {
		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
		form.setValue("fechaRelevamientoPerfil", sdf.format(new java.util.Date()));
	}
	
	if (form.getValue("matriculaSolicitante") == "") {
		form.setValue("matriculaSolicitante", matricula);
	}

}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};

