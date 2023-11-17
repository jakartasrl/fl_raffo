/**
 * Dataset: documentType
 * Descripción: Devuelve los tipos de documentos.
*/

function createDataset(fields, constraints, sortFields) {
	
	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
	
	var where = arq.sql.whereHelper({
		constraints: constraints, 
		filtros: {
			'companyId': function(filtro) {
				return " AND COD_EMPRESA LIKE '" + filtro.initialValue + "'";
			},	
			'documentTypeCode': function(filtro) {
				return " AND CD_TIPO_DOC LIKE '" + filtro.initialValue + "'";
			},			
			'documentTypeDesc': function(filtro) {
				return " AND DS_TIPO_DOC LIKE '" + filtro.initialValue + "'";
			},			
		}
	});
	
	return arq.sql.sql2Dataset({
		jndiName: "java:/jdbc/FluigDSRO",
		sql: " SELECT COD_EMPRESA as companyId, CD_TIPO_DOC as documentTypeCode, DS_TIPO_DOC as documentTypeDesc " + 
			 "   FROM TIPO_DOCUMENTO " +
			 "  WHERE " + where,
		log: 0
	});
	
}

/*! arqMarvinLoad - v1 - All rights reserverd */
var companyId = "1";
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c],companyId));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};

