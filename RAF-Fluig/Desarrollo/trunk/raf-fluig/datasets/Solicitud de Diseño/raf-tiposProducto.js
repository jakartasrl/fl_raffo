/*
 * Devuelve el dataset raf-tiposProducto consultandolo directo a la tabla.
 */
function createDataset(fields, constraints, sortFields) {

	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
	
	var where = arq.sql.whereHelper({
		constraints: constraints, 
		filtros: {
			'cod': function(filtro) {
				return " AND cod " + (filtro.constraintType == "MUST_NOT" ? "NOT" : "") + " LIKE '" + filtro.initialValue + "'";
			},
			'descr': function(filtro) {
				return " AND tipoProd LIKE '" + filtro.initialValue + "'";
			},
			'marca': function(filtro) {
				return " AND marca LIKE '" + filtro.initialValue + "'";
			},
			'prActivos': function(filtro) {
				return " AND prActivos LIKE '" + filtro.initialValue + "'";
			},
			'tipoProd': function(filtro) {
				return " AND tipoProd LIKE '" + filtro.initialValue + "'";
			},
			'grupoProd': function(filtro) {
				return " AND grupoProd LIKE '" + filtro.initialValue + "'";
			},
			'pais': function(filtro) {
				return " AND pais LIKE '" + filtro.initialValue + "'";
			},
		},
		log: 1
	});
	
	var orderBy = arq.sql.orderByHelper({
		constraints: constraints, 
		log: 1
	});
	
	return arq.sql.sql2Dataset({
		jndiName: "java:/jdbc/FluigDSRO",
		sql: " SELECT distinct tipoProd as cod, tipoProd as descr" + 
			 "   FROM " + getMetaLista("RAF07-Productos.async") +
			 " 	 WHERE " + where +
			 "  ORDER BY " + orderBy + ";",
		log: 1
	});
}


function getMetaLista(datasetDescription) {
	var conn = null,
		stmt = null;
	
	try {
		conn = new javax.naming.InitialContext().lookup("java:/jdbc/FluigDS").getConnection();   
		stmt = conn.createStatement();
		
		var query = "SELECT TOP 1 'MD' + RIGHT('000' + CAST(COD_EMPRESA AS VARCHAR),3) + RIGHT('000' + CAST(COD_LISTA AS VARCHAR),3) AS DATASET_METALISTA" + 
					"  FROM META_LISTA " +
					" WHERE DSL_LISTA='" + datasetDescription + "' " +
			        " ORDER BY COD_LISTA DESC"
					
		var resultSet = stmt.executeQuery(query);
		if(resultSet.next()) {
			var datasetMetaTable = resultSet.getString("DATASET_METALISTA");
		}
		
	} catch (ex) {
		log.error("DEBUG - error: " + ex);
    } finally {
        if (stmt != null) { stmt.close(); }
        if (conn != null) { conn.close(); }
    }
    
    return datasetMetaTable;
}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};

