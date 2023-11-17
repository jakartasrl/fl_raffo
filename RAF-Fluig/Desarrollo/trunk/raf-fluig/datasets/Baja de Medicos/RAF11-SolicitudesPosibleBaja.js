/*
 * Devuelve el dataset RAF11-SolicitudesPosibleBaja de las solicitudes con posible baja de médico.
 */
function createDataset(fields, constraints, sortFields) {

	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
	
	var where = arq.sql.whereHelper({
		constraints: constraints, 
		filtros: {
			'solicitud': function(filtro) {
				return " AND (NOMBRE LIKE '" + filtro.initialValue + "' OR APELLIDO LIKE '" + filtro.initialValue + "' OR NUMERO_SOLICITUD LIKE '" + filtro.initialValue + "')";
			},
			'areaCodigo': function(filtro) {
				return " AND AREA_CODIGO = '" + filtro.initialValue + "'";
			},
			'distritoCodigo': function(filtro) {
				return " AND DISTRITO_CODIGO = '" + filtro.initialValue + "'";
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
		sql: "SELECT NUMERO_SOLICITUD AS solicitud" +
	 		 "	, APELLIDO AS apellido" +
	 		 "	, NOMBRE AS nombre" +
	 		 "	, TIPO_INVERSION AS tipoInversion" +
	 		 "	, NOMBRE_CONGRESO AS nombreCongreso" +
	 		 "	, INCLUYE_ALOJAMIENTO AS incluyeAlojamiento" +	
	 		 "	, INCLUYE_TRASLADO AS incluyeTraslado" +
	 		 "	, INCLUYE_INSCRIPCION AS incluyeInscripcion" +	
	 		 "	, SELECCION_ALOJAMIENTO_PRESUPUESTO AS seleccionAlojamientoPresupuesto" +
	 		 "	, SELECCION_TRASLADO_PRESUPUESTO AS seleccionTrasladoPresupuesto" +		
	 		 "	, SELECCION_INSCRIPCION_PRESUPUESTO AS seleccionInscripcionoPresupuesto" +
	 		 "	, MES_INVERSION AS mesInversion" +
	 		 "	, DELEGADO AS delegado" +
			 "  , FECHA_DESDE_CONGRESO AS fechaDesdeCongreso" +
		 	 "  , FECHA_HASTA_CONGRESO AS fechaHastaCongreso" +
			 "	, CUIT AS cuit" +
			 "	, LUGAR_CONGRESO AS lugarCongreso" +
 		     "  FROM Z_RAF_INVERSION_COMERCIAL" +
		     " WHERE " + where +
			 "  AND TAREA = 'ABIERTO POSIBLE BAJA' " +
			 "  ORDER BY " + orderBy + ";",
		log: 1
	});
}


/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};

