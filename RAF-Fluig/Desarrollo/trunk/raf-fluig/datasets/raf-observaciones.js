/**
 * Dataset: raf-observaciones
 * Descripción: Muestra las observaciones de una solicitud de Atención de Consultas.
*/
function createDataset(fields, constraints, sortFields) {

	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
	
	var where = arq.sql.whereHelper({
		constraints: constraints, 
		filtros: {
			'NRO_SOLICITUD': function(filtro) {
				return " AND hp.NUM_PROCES = '" + filtro.initialValue + "'";
			},
			'NRO_TAREA': function(filtro) {
				return " AND hp.NUM_SEQ_ESTADO = '" + filtro.initialValue + "'";
			},
			'NRO_MVTO': function(filtro) {
				return " AND hp.NUM_SEQ_MOVTO = '" + filtro.initialValue + "'";
			},
			'LAST_MOV': function(filtro) {
				return (filtro.initialValue) ? " AND hp.NUM_SEQ_MOVTO = (SELECT MAX(hp2.NUM_SEQ_MOVTO) FROM HISTOR_PROCES hp2 WHERE hp2.NUM_PROCES = hp.NUM_PROCES)" : "";
			}
		}
	});
    
    return arq.sql.sql2Dataset({
        jndiName: "java:/jdbc/FluigDS",
        sql: "SELECT hp.NUM_PROCES AS NRO_SOLICITUD, hp.NUM_SEQ_ESTADO AS NRO_TAREA, hp.NUM_SEQ_MOVTO AS NRO_MVTO, dbo.getProcessObservations(hp.NUM_PROCES,hp.NUM_SEQ_ESTADO,hp.NUM_SEQ_MOVTO) AS OBSERVACIONES " + 
             "  FROM HISTOR_PROCES hp " +
             " WHERE " + where , 
        log: 0
    });

}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};
