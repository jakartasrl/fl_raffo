/*
 * Devuelve el dataset RAF08-presupuestos consultandolo directo a la tabla.
 */
function createDataset(fields, constraints, sortFields) {

	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
	
	var where = arq.sql.whereHelper({
		constraints: constraints, 
		filtros: {
			'codGrupoGteDistrito': function(filtro) {
				return " AND p.CODIGO_GRUPO_GTE_DIST = '" + filtro.initialValue + "'";
			},		
			'codigoProducto': function(filtro) {
				return " AND p.CODIGO_PRODUCTO  = '" + filtro.initialValue + "'";
			},			
		},
		log: 1
	});
	
	var where2 = arq.sql.whereHelper({
		constraints: constraints, 
		filtros: {
			'codGrupoGteDistrito': function(filtro) {
				return " AND c.COD_GRUPO_GTE_DISTRITO = '" + filtro.initialValue + "'";
			},		
			'codigoProducto': function(filtro) {
				return " AND d.CODIGO_PRODUCTO  = '" + filtro.initialValue + "'";
			},			
		},
		log: 1
	});

	return arq.sql.sql2Dataset({
		jndiName: "java:/jdbc/FluigDSRO",
		sql: "SELECT p.MONTO_PRESUPUESTADO AS montoPresupuestado, " +
			 "	(SELECT COALESCE(sum((d.PORCENTAJE * c.IMPORTE_ARS)/100),0) AS consumidoARS" +
			 " 		FROM Z_RAF_INVERSION_COMERCIAL c JOIN Z_RAF_IMPUTACION d ON c.ID = d.INVERSION_COMERCIAL_ID " +
			 "		WHERE " + where2 + 
			 " 			AND YEAR(c.FECHA_ALTA) = YEAR(GETDATE())  " +
			 " 			AND c.estado IN ('APROBADA','FINALIZADA')) AS montoConsumido " +
 		     "  FROM Z_RAF_PRESUPUESTO p							" +
		     " WHERE " + where +
		     " AND p.ANIO = YEAR(GETDATE()) " +
		     " ORDER BY p.ANIO ",
		log: 1
	});
}


/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};

