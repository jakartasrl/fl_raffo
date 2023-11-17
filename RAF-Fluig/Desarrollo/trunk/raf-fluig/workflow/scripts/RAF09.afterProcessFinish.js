function afterProcessFinish(processId){

	var companyId = getValue("WKCompany");
	var carpetaAdjuntosId = hAPI.getCardValue("carpetaAdjuntosId");
		
	var arq = arqMarvinLoad("v1", {
		prop: "com.arquimeda.marvin.server.js.Properties-v1"
	});
	arq.prop.load({
		datasetName: "parametros"
	});
	
	var login = arq.prop.get("RAF09.usuarioSistema.login");
	var password = arq.prop.get("RAF09.usuarioSistema.pass");
	var sysCollegueId = arq.prop.get("RAF09.usuarioSistema.id");
		
	ged.updateFolder({
		user: login,
		password: password,
		colleagueId: sysCollegueId,
		companyId: companyId,
		
		docId: carpetaAdjuntosId,
		security: [
		    {
				permission: true, 
				attributionType: "ALL", 
				attributionValue: "all", 
				securityLevel: "NONE"
		    }
		]
	});

}