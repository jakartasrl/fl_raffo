function displayFields(form,customHTML){
	
	var arq = arqMarvinLoad("v1", {
		form: "com.arquimeda.marvin.server.js.Form-v1"
	});
		
	// Obtengo el usuario y la tarea actual.
	var companyId = getValue("WKCompany");
	var userId = getValue("WKUser");
	var tareaActual = getValue("WKNumState");
	
	var nombreSolicitante = "";
	var emailSolicitante = "";
	var distritoCodigo = "";
	var areaCodigo = "";
	var area = "";
	var codGrupoGteDistrito = "";
	var codGrupoAsistDistrito = "";
	var codGrupoGteArea = "";
	var codGrupoGtePromocion = "";
	var limiteAprGtePromo = "";
	var distritoCodigo = "";
	var distritoDescripcion = "";
	var contraintDistrito;
	var esAPM = "";
	
	var tareas = {
			Inicial : 0,
			IniciarSolicitud : 4,
		};

	
	// Consulto si el usuario es APM.
	var c_cg_1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", companyId, companyId, ConstraintType.MUST); 
	var c_cg_2 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", userId, userId, ConstraintType.MUST); 
	var c_cg_3 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "RAF08-APM", "RAF08-APM", ConstraintType.MUST);

	var datasetColleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, [c_cg_1,c_cg_2,c_cg_3], null);
	
	if (datasetColleagueGroup.rowsCount > 0) {
		esAPM = "true";
		form.setValue("esAPM", "true");
	}else{
		esAPM = "false";
		form.setValue("esAPM", "false");
	}
		
	if(tareaActual == tareas.Inicial || tareaActual == tareas.IniciarSolicitud){
		
		// Seteo solicitante y matricula del solicitante.
		form.setValue("matriculaSolicitante", userId);
		
		log.info("matriculaSolicitante " + userId);
		
		var c_c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", userId, userId, ConstraintType.MUST);
		var c_c2 = DatasetFactory.createConstraint("colleaguePK.companyId", companyId, companyId, ConstraintType.MUST);
		
		var datasetColleague = DatasetFactory.getDataset("colleague", null, [c_c1,c_c2], null);	
		
		if(datasetColleague.rowsCount == 1){
			
			nombreSolicitante = datasetColleague.getValue(0,"colleagueName");
			emailSolicitante = datasetColleague.getValue(0,"mail");			
			form.setValue("solicitante",nombreSolicitante);
			
		} 
		
		if (esAPM == "true") {
			
			// Si entra aca es APM.
			
			form.setValue("esAPM", "true");
			form.setValue("nombreAPM", nombreSolicitante);
			form.setValue("matriculaAPM", userId);	
			form.setValue("emailAPM", emailSolicitante);
			
			// Consulto el dataset de APMs para buscar el distrito.
			var c_a1 = DatasetFactory.createConstraint("matricula", userId, userId, ConstraintType.MUST); 

			var datasetAPMs = DatasetFactory.getDataset("RAF08-AgentePropagandaMedica", null, [c_a1], null);
			
			if (datasetAPMs.rowsCount > 0) {
				
				distritoCodigo = datasetAPMs.getValue(0,"distritoCodigo");
				distritoDescripcion = datasetAPMs.getValue(0,"distrito");
				
				form.setValue("distritoCodigo", distritoCodigo);
				form.setValue("distrito", distritoDescripcion);
								
				// Creo la constraint para el dataset de distritos. 
				contraintDistrito = DatasetFactory.createConstraint("codigo", distritoCodigo, distritoCodigo, ConstraintType.MUST); 
																	
			}else{
				throw "El APM " + userId + " no existe en el fichero RAF08-AgentePropagandaMedica."
			}
			
		}
		else{
			
			// Si entra aca no es APM.
			
			form.setValue("esAPM", "false");
			
			var ct1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", companyId, companyId, ConstraintType.MUST); 
			var ct2 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", userId, userId, ConstraintType.MUST); 
			var ct3 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "RAF08-GTE-DIST-%", "RAF08-GTE-DIST-%", ConstraintType.MUST);
			ct3.setLikeSearch(true);
			
			datasetColleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, [ct1,ct2,ct3], null);
			
			if (datasetColleagueGroup.rowsCount > 0) {
				
				var codGrupoGteDistrito = datasetColleagueGroup.getValue(0, "colleagueGroupPK.groupId");				
				form.setValue("codGrupoGteDistrito", codGrupoGteDistrito);
				log.info("###### contraintDistrito 0: " + contraintDistrito);	
				// Creo la constraint para el dataset de distritos. 
				contraintDistrito = DatasetFactory.createConstraint("codGrupoGteDistrito", codGrupoGteDistrito, codGrupoGteDistrito, ConstraintType.MUST); 
				log.info("###### contraintDistrito: " + contraintDistrito);		
			}
			
		}
				
		// Consulto el dataset de distritos para buscar la region y los grupos de gerente y asisitente de distrito. 
		var datasetDistrito = DatasetFactory.getDataset("RAF08-Distrito", null, [contraintDistrito], null);
														 
		if (datasetDistrito.rowsCount > 0) {
			
			areaCodigo = datasetDistrito.getValue(0,"areaCodigo");
			codGrupoGteDistrito = datasetDistrito.getValue(0,"codGrupoGteDistrito");
			codGrupoAsistDistrito = datasetDistrito.getValue(0,"codGrupoAsistDistrito");
			distritoCodigo = datasetDistrito.getValue(0,"codigo");
			distritoDescripcion = datasetDistrito.getValue(0,"descripcion");
			
			form.setValue("areaCodigo", areaCodigo);
			form.setValue("codGrupoGteDistrito", codGrupoGteDistrito);
			form.setValue("codGrupoAsistDistrito", codGrupoAsistDistrito);
			form.setValue("distritoCodigo", distritoCodigo);
			form.setValue("distrito", distritoDescripcion);
			
		}else{
			throw "El distrito " + distritoCodigo + " no existe en el fichero RAF08-Distrito."
		}
		
		// Consulto el dataset de areas para buscar el nombre, los grupos de gerente de area y promocion y el limite de aprobacion.
		var c_r1 = DatasetFactory.createConstraint("codigo", areaCodigo, areaCodigo, ConstraintType.MUST); 

		var datasetAreas = DatasetFactory.getDataset("RAF08-Area", null, [c_r1], null);
		
		if (datasetAreas.rowsCount > 0) {
			
			area = datasetAreas.getValue(0,"descripcion");
			codGrupoGteArea = datasetAreas.getValue(0,"codGrupoGteArea");
			codGrupoGtePromocion = datasetAreas.getValue(0,"codGrupoGtePromocion");
			limiteAprGtePromo = datasetAreas.getValue(0,"limiteAprGtePromo");					
			
			form.setValue("area", area);
			form.setValue("codGrupoGteArea", codGrupoGteArea);
			form.setValue("codGrupoGtePromocion", codGrupoGtePromocion);
			form.setValue("limiteAprGtePromo", limiteAprGtePromo);
			log.info("limiteAprGtePromo " + limiteAprGtePromo);
		}else{
			log.info("El area " + areaCodigo + " no existe en el fichero RAF08-Area.");
			throw "El area " + areaCodigo + " no existe en el fichero RAF08-Area."
		}	
		
	} 
	
	
	arq.form.displayFields(form,customHTML);
	
}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};


