function createDataset(fields, constraints, sortFields) {

	var arq = arqLoadLib(["com.arquimeda.fluig.js.ds.Sql-v1"]);
	
	var where = arq.sql.whereHelper({
		constraints: constraints, 
		filtros: {
			'learningId': function(filtro) {
				return " AND [cei].[ID] = " + filtro.initialValue + "";
			},
			'startDate': function(filtro) {
				return " AND e.[ENROLLMENT_TIMESTAMP] >= " + filtro.initialValue + " AND e.[ENROLLMENT_TIMESTAMP] <= " + filtro.finalValue + "";
			},
		}
	});
	
	return arq.sql.sql2Dataset({
		jndiName: "java:/jdbc/FluigDSRO",
		sql: " SELECT [uf].full_name AS userName, [a].[NAME] AS assessmentName, app.TYPE as assessmentType, aa.[STARTED_ON] as startDate, coalesce([aa].[FINISHED_ON],0) as finishDate, av.[REQUIRED_SCORE] AS requiredScore,  aa.final_score AS finalScore, aa.[APPROVED] AS approved, [app].id AS assessmentApplicationId, cei.[ID] AS learningId " +
			 " from ELE_CATALOG_ENROLLABLE_ITEM cei " + 
			 " join ELE_CATALOG_ITEM ci on (ci.ID = cei.ID) " +
			 " join ELE_TENANT ten on (ci.ID_TENANT = ten.ID) " + 
			 " join AMS_ASSESSMENT_ITEM pos on (cei.ID_POS_EXAM = pos.ID) " +
			 " join AMS_ASSESSMENT_VERSION av on (av.ID = pos.ID) " +
			 " join AMS_ASSESSMENT a on (av.ID_ASSESSMENT = a.ID), " +
			 " ELE_ENRLLBL_ITM_ASSMNT_APPLCTN app join AMS_ASSESSMENT_APPLICATION aa on (aa.ID = app.ID) " +
			 " left join ELE_USER u on (aa.ID_EXECUTED_BY = u.ID) " +
			 " JOIN ELE_PARTY p ON ([p].[ID] = [u].id) " +
			 " JOIN [dbo].[FDN_USER] uf ON ([p].[ID_FLUIG] = [uf].[USER_ID]), " +
			 " ELE_ENROLLMENT e " +
			 " where app.ID_ENROLLABLE_ITEM = cei.ID " +
			 " and aa.ID_ASSESSMENT_VERSION = a.ID_CURRENT_ASSESSMENT_VERSION " +
			 " and app.ID_ENROLLMENT = e.ID " +
			 " and app.TYPE = 'POS_EXAM' " + 
			 " and  " + where +
			 "  ORDER BY av.ID ",
		log: 0
	});
	
}

//arqLoadLib - v1.0 - All rights reserverd
function arqLoadLib(e){var t={};if(e==null){return t}var n=function(e,t){for(var n=0;n<e.length;n++){if(e[n]==t)return true}return false};var r=DatasetFactory.getDataset("arq_libreriaJS",null,null,null);for(var i=0;i<r.rowsCount;i++){var s=r.getValue(i,"lib");if(n(e,s)){var o=r.getValue(i,"src");var u=r.getValue(i,"name");try{var a=new Function("lib","return "+o);t[u]=a(t)}catch(f){log.error("*** Error compilando libreria "+s+":"+f)}}}return t}
