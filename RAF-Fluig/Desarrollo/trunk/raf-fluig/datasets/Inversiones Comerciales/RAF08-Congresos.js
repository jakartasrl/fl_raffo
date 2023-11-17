/*
 * Devuelve el dataset RAF08-Congresos consultandolo directo a la tabla.
 */
function createDataset(fields, constraints, sortFields) {

	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
	
	var where = arq.sql.whereHelper({
		constraints: constraints, 
		filtros: {
			'nombre': function(filtro) {
				return " AND (c.NOMBRE LIKE '" + filtro.initialValue + "' OR c.METADATA LIKE '" + filtro.initialValue + "' OR c.SIGLAS LIKE '" + filtro.initialValue + "')";
			},
			'lugar': function(filtro) {
				return " AND (p.DESCRIPTION LIKE '" + filtro.initialValue + "' OR c.ESTADO LIKE '" + filtro.initialValue + "' OR c.LOCALIDAD LIKE '" + filtro.initialValue + "' OR c.LUGAR LIKE '" + filtro.initialValue +"')";

			},
			'fechaDesde': function(filtro) {
				return " AND c.FECHA_INICIO >= CONVERT(DATE, '" + filtro.initialValue.replace("%", "") + "', 103)";
			},
			'fechaHasta': function(filtro) {
				return " AND c.FECHA_FIN <= CONVERT(DATE, '" + filtro.initialValue.replace("%", "") + "', 103)";
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
		sql: "SELECT c.ID as id " +
			 "	, c.NOMBRE AS nombre" +
		  	 "	, c.SIGLAS as siglas" +
			 "	, c.LUGAR AS lugar" +
			 "	, CONVERT(VARCHAR, c.FECHA_INICIO, 103) AS fechaInicio" +
			 "	, CONVERT(VARCHAR, c.FECHA_FIN, 103) AS fechaFin" +
			 "  , PRESUPUESTO_HABILITADO as presupuestoHabilitado" +
			 "  , DIAS_LIMITE_CARGA as diasLimiteCarga" +
			 "  , WEB as web" +
			 "	, CONVERT(VARCHAR, c.FECHA_CHECKIN, 103) AS fechaCheckin" +
			 "	, CONVERT(VARCHAR, c.FECHA_CHECKOUT, 103) AS fechaCheckout" +
			 "  , LOCALIDAD as localidad" +
 		     "  FROM Z_RAF_CONGRESO c JOIN Z_RAF_COUNTRY p ON c.COUNTRY_ID = p.ID" +
		     " WHERE c.FECHA_INICIO >= CONVERT(DATE,GETDATE(), 103) AND " + where +
			 "  ORDER BY " + orderBy + ";",
		log: 1
	});
}


/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};

