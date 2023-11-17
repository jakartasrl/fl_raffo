function createDataset(fields, constraints, sortFields) {

	var arq = arqLoadLib(["com.arquimeda.fluig.js.ds.Sql-v1"]);
	
	var where = arq.sql.whereHelper({
		constraints: constraints, 
		filtros: {
			'appBlockId': function(filtro) {
				return " AND block.id = " + filtro.initialValue + "";
			},
		}
	});
	
	return arq.sql.sql2Dataset({
		jndiName: "java:/jdbc/FluigDSRO",
		sql: " select aqv.id as assessmentQuestionVersionId, dbo.udf_StripHTML(aqv.[QUESTION]) AS question, tci.title as topicTitle, aq.difficulty as difficulty, appq.total_Points AS totalPoints, CASE WHEN appq.[CANCELED_APPLICATION] IS NULL THEN 'false' ELSE 'true' END as isCanceled, app.id as assessmentApplicationId, block.id AS appBlockId, p.ID_FLUIG AS userId, " +
    		 " CASE " +
			 " WHEN [oq].[ID] IS NOT NULL THEN 'class com.totvs.elearning.core.assessment.ObjectiveQuestion' " +
			 " WHEN [mq].[ID] IS NOT NULL THEN 'class com.totvs.elearning.core.assessment.MultipleQuestion' " +
			 " WHEN [clq].[ID] IS NOT NULL THEN 'class com.totvs.elearning.core.assessment.CorrelationQuestion' " +
			 " WHEN [orq].[ID] IS NOT NULL THEN 'class com.totvs.elearning.core.assessment.OrdinationQuestion' " +
			 " WHEN [laq].[ID] IS NOT NULL THEN 'class com.totvs.elearning.core.assessment.LacunaQuestion' " +
			 " WHEN [scq].[ID] IS NOT NULL THEN 'class com.totvs.elearning.core.assessment.ScaleQuestion' " +
			 " ELSE 'class com.totvs.elearning.core.assessment.EssayQuestion' " +
			 " END as type," +  
			 " CASE " +  
			 " 	WHEN [oq].[ID] IS NOT NULL THEN alt.[DESCRIPTION] " +  
			 " 	WHEN esq.ID IS NOT NULL THEN aaeq.[ESSAY_RESPONSE] " +  
			 " 	WHEN mq.ID IS NOT NULL THEN alt2.[DESCRIPTION] " +  
			 " END AS response " +
			 " from AMS_ASSESSMENT_APP_QUESTION appq " +
			 " join AMS_ASSESSMENT_QUESTION_VRSN aqv on (appq.ID_ASSESSMENT_QUESTION_VRSN = aqv.ID) " + 
			 " left join AMS_CLOSED_QUESTION cq on (aqv.ID = cq.ID) " +
			 " left join AMS_OBJECTIVE_QUESTION oq on (aqv.ID = oq.ID) " +
			 " left join AMS_MULTIPLE_QUESTION mq on (aqv.ID = mq.ID) " + 
			 " left join AMS_CORRELATION_QUESTION clq on (aqv.ID = clq.ID) " +
			 " left join AMS_ORDINATION_QUESTION orq on (aqv.ID = orq.ID)  " +
			 " left join AMS_LACUNA_QUESTION laq on (aqv.ID = laq.ID) " +
			 " left join AMS_SCALE_QUESTION scq on (aqv.ID = scq.ID) " +
			 " left join AMS_ESSAY_QUESTION esq on (aqv.ID = esq.ID) " +
			 " join AMS_ASSESSMENT_QUESTION aq on (aqv.ID_ASSESSMENT_QUESTION = aq.ID) " +
			 " join AMS_ASSESSMENT_CATALOG_ITEM ci on (aq.ID = ci.ID) " +
			 " join AMS_ASSESSMENT_TOPIC pt on (ci.ID_PARENT_ITEM = pt.ID) " +
			 " join AMS_ASSESSMENT_CATALOG_ITEM tci on (tci.ID = pt.ID) " +
			 " join AMS_ASSESSMENT_APP_BLOCK block on (appq.ID_APP_BLOCK = block.ID) " +
			 " join AMS_ASSESSMENT_APPLICATION app on (block.ID_ASSESSMENT_APPLICATION = app.ID) " +
			 " left join ELE_USER u on (app.ID_EXECUTED_BY = u.ID) " +
			 " left join ELE_PARTY p on (u.ID = p.ID) " +
			 " join ELE_TENANT ten on (app.ID_TENANT = ten.ID)" +  
			 " JOIN  [dbo].[AMS_ASSESSMENT_APP_QUESTION] aaq ON block.[ID] = [aaq].[ID_APP_BLOCK] AND aaq.[ID_ASSESSMENT_QUESTION_VRSN] = aqv.[ID] " +  
			 " LEFT JOIN [dbo].[AMS_ASSMNT_APP_OBJCTV_QSTN] aaoq ON [aaoq].[ID] = [aaq].[ID] " +  
			 " LEFT JOIN [dbo].[AMS_ALTERNATIVE] alt ON alt.[ID] = [aaoq].[ID_ALTERNATIVE] " +  
			 " LEFT JOIN [dbo].[AMS_ASSMNT_APP_ESSAY_QSTN] aaeq ON aaeq.[ID] = [aaq].[ID] " +  
			 " LEFT JOIN [dbo].[AMS_ASSMNT_APP_MULTIPLE_QUSTN] aamq ON aamq.[ID] = [aaq].[ID] " +  
			 " LEFT JOIN [dbo].[AMS_ASSMNT_APP_MLTPL_ALTRNTV] aamqa ON aamqa.[ASSMNT_APP_MLTPL_QSTN_ID] = [aamq].[ID] " +  
			 " LEFT JOIN  [dbo].[AMS_ALTERNATIVE] alt2 ON alt2.[ID] = [aamqa].[ALTERNATIVE_ID] " +  
			 " 	WHERE " + where +
			 "  ORDER BY ci.ID ",
		log: 0
	});
	
}

//arqLoadLib - v1.0 - All rights reserverd
function arqLoadLib(e){var t={};if(e==null){return t}var n=function(e,t){for(var n=0;n<e.length;n++){if(e[n]==t)return true}return false};var r=DatasetFactory.getDataset("arq_libreriaJS",null,null,null);for(var i=0;i<r.rowsCount;i++){var s=r.getValue(i,"lib");if(n(e,s)){var o=r.getValue(i,"src");var u=r.getValue(i,"name");try{var a=new Function("lib","return "+o);t[u]=a(t)}catch(f){log.error("*** Error compilando libreria "+s+":"+f)}}}return t}
