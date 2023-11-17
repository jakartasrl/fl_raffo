function resolve(process,colleague, configXML){ 
	
	log.info('***** Iniciando mecanismo de atribucion RAF08-Solicitante');
	
	var usuariosGerentes = getUserGteList("RAF08-GTE-DIST-");
	
	log.info('***** Finalizando mecanismo de atribucion RAF08-Solicitante, usuarios Gtes: ' + usuariosGerentes);
	var usuariosAPMs = getUserList("RAF08-APM");
	
	var listaUsuarios = java.util.ArrayList();
	listaUsuarios.addAll(usuariosGerentes);
	listaUsuarios.addAll(usuariosAPMs);
	
	log.info('***** Finalizando mecanismo de atribucion RAF08-Solicitante, usuarios: ' + listaUsuarios);

	return listaUsuarios;
	
}	
	
//modificar para que sean papeles. 
function getUserGteList(codigo){
	
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

function getUserList(codigoGrupo){

    var userList = new java.util.HashSet(); 
    var c1 = DatasetFactory.createConstraint('colleagueGroupPK.groupId', codigoGrupo, codigoGrupo, ConstraintType.MUST);          
    var dataset = DatasetFactory.getDataset('colleagueGroup', null, [c1], null);

	for(var i = 0; i < dataset.rowsCount; i++) {         
      var colleagueId = dataset.getValue(i, 'colleagueGroupPK.colleagueId');            
      userList.add(colleagueId);
    }
	
	return new java.util.ArrayList(userList);
	
}


/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c],null));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};

