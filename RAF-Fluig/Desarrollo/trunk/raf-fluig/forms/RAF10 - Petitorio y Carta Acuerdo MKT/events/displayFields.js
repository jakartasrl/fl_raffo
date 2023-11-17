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
	var codGrupoSolicitante = "";
	var codGrupoAsistDistrito = "";
	var codGrupoGteArea = "";
	var codGrupoGtePromocion = "";
	var distritoCodigo = "";
	var distritoDescripcion = "";
	
	var tareas = {
			Inicial : 0,
			IniciarSolicitud : 4,
		};
		
	if(tareaActual == tareas.Inicial){
		
		log.info("RAF10 - matriculaSolicitante " + userId);
		
		var c_c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", userId, userId, ConstraintType.MUST);
		var c_c2 = DatasetFactory.createConstraint("colleaguePK.companyId", companyId, companyId, ConstraintType.MUST);
		
		var datasetColleague = DatasetFactory.getDataset("colleague", null, [c_c1,c_c2], null);	
		
		if(datasetColleague.rowsCount == 1){
			
			nombreSolicitante = datasetColleague.getValue(0,"colleagueName");
			emailSolicitante = datasetColleague.getValue(0,"mail");			
			
			form.setValue("matriculaSolicitante", userId);
			form.setValue("solicitante", nombreSolicitante);
			form.setValue("mailSolicitante", emailSolicitante);
			
		} 
		
		// Consulto si el usuario es RAF08-GTE-DIST-*.
		var c_cg_1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", companyId, companyId, ConstraintType.MUST); 
		var c_cg_2 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", userId, userId, ConstraintType.MUST); 
		var c_cg_3 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "RAF08-GTE-DIST-%", "RAF08-GTE-DIST-%", ConstraintType.MUST); 
		c_cg_3.setLikeSearch(true);

		var datasetColleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, [c_cg_1,c_cg_2,c_cg_3], null);
		
		if (datasetColleagueGroup.rowsCount > 0) {
		
			// Si es Gte Distrito (Region).
			
			form.setValue("esGteDistrito", "true");
			
			var codGrupoSolicitante = datasetColleagueGroup.getValue(0, "colleagueGroupPK.groupId");				
			form.setValue("codGrupoSolicitante", codGrupoSolicitante);
			
			var c_d = DatasetFactory.createConstraint("codGrupoGteDistrito", codGrupoSolicitante, codGrupoSolicitante, ConstraintType.MUST); 
			
			// Consulto el dataset de distritos para buscar la region y los grupos de gerente y asisitente de distrito. 
			var datasetDistrito = DatasetFactory.getDataset("RAF08-Distrito", null, [c_d], null);
															 
			if (datasetDistrito.rowsCount > 0) {
				
				areaCodigo = datasetDistrito.getValue(0,"areaCodigo");
				codGrupoAsistDistrito = datasetDistrito.getValue(0,"codGrupoAsistDistrito");
				distritoCodigo = datasetDistrito.getValue(0,"codigo");
				distritoDescripcion = datasetDistrito.getValue(0,"descripcion");
				
				form.setValue("areaCodigo", areaCodigo);
				form.setValue("codGrupoAsistDistrito", codGrupoAsistDistrito);
				form.setValue("lineaRegion", distritoDescripcion);
				form.setValue("lineaRegionCodigo", distritoCodigo);
				
			}else{
				throw "No existe un distrito para el codigo de grupo " + codGrupoSolicitante + " en el fichero RAF08-Distrito."
			}
			
			// Consulto el dataset de areas para buscar el nombre, los grupos de gerente de area y promocion y el limite de aprobacion.
			var c_r1 = DatasetFactory.createConstraint("codigo", areaCodigo, areaCodigo, ConstraintType.MUST); 

			var datasetAreas = DatasetFactory.getDataset("RAF08-Area", null, [c_r1], null);
			
			if (datasetAreas.rowsCount > 0) {
				
				area = datasetAreas.getValue(0,"descripcion");
				codGrupoGteArea = datasetAreas.getValue(0,"codGrupoGteArea");
				codGrupoGtePromocion = datasetAreas.getValue(0,"codGrupoGtePromocion");
				
				form.setValue("area", area);
				form.setValue("codGrupoGteArea", codGrupoGteArea);
				form.setValue("codGrupoGtePromocion", codGrupoGtePromocion);
			}else{
				log.info("El area " + areaCodigo + " no existe en el fichero RAF08-Area.");
				throw "El area " + areaCodigo + " no existe en el fichero RAF08-Area."
			}
			
			
		}else{

			// Si entra aca es GTE Linea.
			
			form.setValue("esGteDistrito", "false");
			
			// Consulto si el usuario es RAF10-SOL-LINEA-*.
			var c_cg_1 = DatasetFactory.createConstraint("colleagueGroupPK.companyId", companyId, companyId, ConstraintType.MUST); 
			var c_cg_2 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", userId, userId, ConstraintType.MUST); 
			var c_cg_3 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "RAF10-SOL-LINEA-%", "RAF10-SOL-LINEA-%", ConstraintType.MUST); 
			c_cg_3.setLikeSearch(true);

			datasetColleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, [c_cg_1,c_cg_2,c_cg_3], null);
			
			if (datasetColleagueGroup.rowsCount > 0) {
				
				var codGrupoSolicitante = datasetColleagueGroup.getValue(0, "colleagueGroupPK.groupId");				
				form.setValue("codGrupoSolicitante", codGrupoSolicitante);
				
				// Consulto el dataset de Gte linea. 
				
				var c_l = DatasetFactory.createConstraint("codGrupoSolicitante", codGrupoSolicitante, codGrupoSolicitante, ConstraintType.MUST); 
				var dataseLinea = DatasetFactory.getDataset("RAF10-Linea", null, [c_l], null);
																 
				if (dataseLinea.rowsCount > 0) {
					
					var lineaRegion = dataseLinea.getValue(0,"descripcion");
					var lineaRegionCodigo = dataseLinea.getValue(0,"codigo");
					var codGrupoGteMKT = dataseLinea.getValue(0,"codGrupoGteMKT");
					var grupoGteMKT = dataseLinea.getValue(0,"grupoGteMKT");
					
					form.setValue("lineaRegion", lineaRegion);
					form.setValue("lineaRegionCodigo", lineaRegionCodigo);
					form.setValue("codGrupoGteMKT", codGrupoGteMKT);
					form.setValue("grupoGteMKT", grupoGteMKT);
					
					
				}else{
					throw "No existe una linea para el codigo de grupo " + codGrupoSolicitante + " en el fichero RAF10-Linea."
				}
				
			}else{
				throw "El usuario no es gerente de distrito ni solicitante de linea.";
			}
			
		}
		
	} 
	
	
	arq.form.displayFields(form,customHTML);
	
}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};


