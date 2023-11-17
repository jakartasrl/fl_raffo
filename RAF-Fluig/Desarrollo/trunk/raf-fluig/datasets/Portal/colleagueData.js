/**
 * Dataset: colleagueData
 * Descripción: Dataset con los datos adicionales de los usuarios.
*/

function createDataset(fields, constraints, sortFields) {
	
	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
	
	var where = arq.sql.whereHelper({
		constraints: constraints, 
		filtros: {
			'colleagueId': function(filtro) {
				return " AND USER_TENANT_ID = (SELECT ut.USER_TENANT_ID FROM FDN_USERTENANT ut WHERE USER_CODE LIKE '" + filtro.initialValue + "')";
			},	
			'dataKey': function(filtro) {
				return " AND DATA_KEY LIKE '%" + filtro.initialValue + "%'";
			},			
			'dataValue': function(filtro) {
				return " AND DATA_VALUE LIKE '%" + filtro.initialValue + "%'";
			},			
		}
	});
	
	return arq.sql.sql2Dataset({
		jndiName: "java:/jdbc/FluigDSRO",
		sql: " SELECT USER_TENANT_ID as colleagueId, DATA_KEY as dataKey, DATA_VALUE as dataValue " + 
			 "   FROM FDN_USERDATA " +
			 "  WHERE " + where +
			 "  ORDER BY USER_TENANT_ID",
		log: 0
	});
	
}

/*! arqMarvinLoad - v1.1 - All rights reserverd */
var companyId = 1;
function arqMarvinLoad(a,b){var c={};if(null==b)return c;var d=(new javax.naming.InitialContext).lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var e in b)try{var f=new Function("lib","return "+d.getLib(b[e],companyId));c[e]=f(c)}catch(a){log.error("*** Error compilando libreria "+e+":"+a)}return c}
