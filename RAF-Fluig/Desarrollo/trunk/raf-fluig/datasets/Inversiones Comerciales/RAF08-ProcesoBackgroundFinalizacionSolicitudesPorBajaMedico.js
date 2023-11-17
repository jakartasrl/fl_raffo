function defineStructure() {
	addColumn("solicitud");
	setKey(["solicitud"]);
	addIndex(["solicitud"]);
}
function onSync(lastSyncDate) {

var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("solicitud"); 

	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
	
	var ejb = new javax.naming.InitialContext().lookup("java:global/raf-inversioncomercial-backend/InversionComercialEJB");
	
	var arraySolicitudes = arq.sql.sql2Dataset({
		jndiName: "java:/jdbc/FluigDSRO",
		sql: "SELECT NUMERO_SOLICITUD AS solicitud" +
 		     "  FROM Z_RAF_INVERSION_COMERCIAL" +
		     " WHERE TAREA = 'ABIERTO POSIBLE BAJA' " +
			 " AND FECHA_DESDE_CONGRESO <= CONVERT(DATE,GETDATE(), 103); ",
		log: 1
	});
	
	log.error("RAF08-ProcesoBackgroundFinalizacionSolicitudesPorBajaMedico Cantidad de Solicitudes:  " + arraySolicitudes.rowsCount);

	try {
		
		for(j = 0; j < arraySolicitudes.rowsCount; j++) {
	 		
			var nroSolicitud = arraySolicitudes.getValue(j, "solicitud");
		  	log.error("RAF08-ProcesoBackgroundFinalizacionSolicitudesPorBajaMedico.js Solicitud:  " + nroSolicitud);	
			
			newDataset.addOrUpdateRow([nroSolicitud]);
					
			ejb.finalizarInversionComercialPorEventoIniciado(java.lang.Integer.parseInt(nroSolicitud));	
	
		}

	} catch(e) {
		log.info("########## Error onSync: " + e);
		throw "Se produjo un error al finalizar la solicitud desde el Finalizador background. Por favor, consulte con el administrador del sistema.";
	}

	return newDataset;

}

function createDataset(fields, constraints, sortFields) {

    var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("solicitud"); 
	
	return newDataset;

}

function onMobileSync(user) {

}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};

