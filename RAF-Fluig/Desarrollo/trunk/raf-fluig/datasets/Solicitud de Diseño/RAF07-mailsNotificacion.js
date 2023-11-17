/*
 * Consulta el dataset RAF07-Motivo y devuelve los mails a notificar.
 * 
 * ej: 
 *   - reasonName: Titularidad
 *   - fieldName: avisoGeneracion    (avisoGeneracion, avisoAceptacion, avisoRevision)
 * 
 */
function createDataset(fields, constraints, sortFields) {
	
	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
	
	var fieldName = getConstraint(constraints, "fieldName");
	
	var where = arq.sql.whereHelper({
		constraints: constraints, 
		filtros: {
			'reasonName': function(filtro) {
				return " AND mo.reasonName = '" + filtro.initialValue + "'";
			},
			'fieldName': function(filtro) {
				return " AND IsNull(mo."+filtro.initialValue+", '') <> ''";
			},			
		},
		log: 1
	});
	
	return arq.sql.sql2Dataset({
		jndiName: "java:/jdbc/FluigDSRO",
		sql:"SELECT DISTINCT  mo.reasonName, '" + fieldName +"' as fieldName, ut.EMAIL  " +
			"  FROM [V_RAF07_Motivos] mo               " +
			"  JOIN [V_RAF07_Motivos_Grupos] mg        " +
			"    ON mo.documentId=mg.documentId        " +
			"   AND mo.version = mg.version            " +
			"  JOIN [dbo].[FDN_GROUPUSERROLE] gu       " +
			"    ON [gu].[GROUP_CODE] = mg.userGroupId " +
			"   AND [gu].[TENANT_ID] = mo.companyid    " +
			"  JOIN [dbo].[FDN_USERTENANT] ut          " +
			"    ON ut.[TENANT_ID] = [gu].[TENANT_ID]  " +
			"   AND ut.[LOGIN] = [gu].[LOGIN]          " +
			" WHERE " + where,
		log: 1
	});	
	
}

function getConstraint(constraints, fieldName) {
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].fieldName == fieldName){
			return constraints[i].initialValue;
		}
	}
	return "";
}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};
