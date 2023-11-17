function resolve(process,colleague, configXML){ 
	
	log.info('***** Iniciando mecanismo de atribucion RAF10-Solicitante');
	
	var usuariosGerentes = getUserFromGroupsBeginingWith("RAF08-GTE-DIST-");
	
	log.info('***** Mecanismo de atribucion RAF10-Solicitante, usuarios Gtes: ' + usuariosGerentes);
	
	var usuariosLinea = getUserFromGroupsBeginingWith("RAF10-SOL-LINEA-");
	
	log.info('***** Mecanismo de atribucion RAF10-Solicitante, usuarios linea: ' + usuariosLinea);
	
	var listaUsuarios = java.util.ArrayList();
	listaUsuarios.addAll(usuariosGerentes);
	listaUsuarios.addAll(usuariosLinea);
	
	log.info('***** Finalizando mecanismo de atribucion RAF10-Solicitante, usuarios: ' + listaUsuarios);

	return listaUsuarios;
	
}	
	
function getUserFromGroupsBeginingWith(codigo){
	
	var colleagueList = java.util.ArrayList();


	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
		
	var datasetPersonas = arq.sql.sql2Dataset({
		jndiName: "java:/jdbc/FluigDSRO",
		sql: "   SELECT DISTINCT FDN_USERTENANT.USER_CODE  " +
			"   FROM FDN_GROUPUSERROLE " +
			"   INNER JOIN FDN_USERTENANT " +
			"   ON FDN_USERTENANT.LOGIN = FDN_GROUPUSERROLE.LOGIN " +
			"   AND FDN_USERTENANT.TENANT_ID = FDN_GROUPUSERROLE.TENANT_ID " +
			"   WHERE FDN_GROUPUSERROLE.GROUP_CODE like '"+ codigo+"%'" +
			"   AND FDN_GROUPUSERROLE.TENANT_ID = 1",
		log: 1
	});
	
	for(var i = 0; i < datasetPersonas.rowsCount; i++) {         
	      var colleagueId = datasetPersonas.getValue(i, 'USER_CODE');  
	      colleagueList.add(colleagueId);
	    }

	
	return colleagueList;
}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c],null));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};

