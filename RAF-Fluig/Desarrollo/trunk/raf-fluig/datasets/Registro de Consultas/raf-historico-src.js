/*
* Código: raf-historico-src
* Descripción: Muestra el histórico de una solicitud de Atención de Consultas.
*/
function createDataset(fields, constraints, sortFields) {

    var dataset =  DatasetBuilder.newDataset();
	dataset.addColumn("tarea");
	dataset.addColumn("nombreTarea");
	dataset.addColumn("usuarios");
    dataset.addColumn("dia");
	dataset.addColumn("hora");
	dataset.addColumn("historico");
	dataset.addColumn("observaciones");
	dataset.addColumn("adjuntos");
	
    var conn, stmt, rs;
	
	var nroSolicitud = getContraint(constraints, "nroSolicitud") != ""? getContraint(constraints, "nroSolicitud").initialValue : "0";
	var documentId = getContraint(constraints, "documentId") != ""? getContraint(constraints, "documentId").initialValue : "0";

    try {
        
		var query = "SELECT " +
"       [ep1].[NUM_SEQ] AS TAREA, " +
"       [ep1].[NOM_ESTADO] AS NOMBRE_TAREA, " +
"       CASE " +
" 	        WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER') " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER') " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 6 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ATE') " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER') " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 7 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER') " +        
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 5 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 4 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 8 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ATE') " +
         
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de Responsables de ' + [gr1].[DESCRIPTION] " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de Responsables de ' + [gr1].[DESCRIPTION] " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 6 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [gr1].[DESCRIPTION] " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de Responsables de ' + [gr1].[DESCRIPTION] " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 7 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de Responsables de ' + [gr1].[DESCRIPTION] " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 5 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [gr1].[DESCRIPTION] " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 4 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [gr1].[DESCRIPTION] " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 8 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [gr1].[DESCRIPTION] " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [gr1].[DESCRIPTION] " +
"           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [gr1].[DESCRIPTION] " +
         
"           WHEN [hp].[NUM_SEQ_ESTADO] = 1 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ATE') " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 6 AND [u2].[FULL_NAME] IS NOT NULL THEN [u2].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut2].[LOGIN],'RC_DER') " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 6 AND [u2].[FULL_NAME] IS NULL THEN [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER') " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 2 THEN [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER') " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [u2].[FULL_NAME] IS NOT NULL THEN [u2].[FULL_NAME] + dbo.grupos(' - ', [ut2].[LOGIN],'RC_ATE') " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [u2].[FULL_NAME] IS NULL THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ATE') " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ATE') " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER') " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 7 THEN [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER') " +     
"           WHEN [hp].[NUM_SEQ_ESTADO] = 7 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN 'Sistema' " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u2].[FULL_NAME] IS NOT NULL THEN [u2].[FULL_NAME] + dbo.grupos(' - ', [ut2].[LOGIN],'RC_ROR') " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u2].[FULL_NAME] IS NULL THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 5 THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[USER_CODE],'RC_DER') " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 4 THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 8 THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 2 THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ATE') " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 5 THEN [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER') " +
"       END AS USUARIOS, " +
"       CONVERT(VARCHAR(10), [tp].[ASSIGN_END_DATE], 103) AS DIA, " +
"   	CONVERT(VARCHAR(10), [tp].[ASSIGN_END_DATE], 108) AS HORA, " +
"       CASE " +
"           WHEN [tp].[IDI_STATUS] = 0 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Consulta Salvada sin Enviar' " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 1 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Derivada a ' + [gr2].[DESCRIPTION] " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 6 AND [u2].[FULL_NAME] IS NOT NULL THEN [ep1].[NOM_ESTADO] + ' - Tarea Asumida' " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 6 AND [u2].[FULL_NAME] IS NULL THEN [ep1].[NOM_ESTADO] + ' - Consulta Transferida a ' + [gr2].[DESCRIPTION] " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 2 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a ' + [ep2].[NOM_ESTADO] " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [u2].[FULL_NAME] IS NOT NULL THEN [ep1].[NOM_ESTADO] + ' - Tarea Asumida' " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [u2].[FULL_NAME] IS NULL THEN [ep1].[NOM_ESTADO] + ' - Consulta Transferida a ' + [gr2].[DESCRIPTION] " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a ' + [gr2].[DESCRIPTION] " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a Revisar a Farmacovigilancia' " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 7 THEN [ep1].[NOM_ESTADO] + ' - Consulta Derivada' " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 7 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [ep1].[NOM_ESTADO] + ' - Enviada a ' +  [gr2].[DESCRIPTION] " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u2].[FULL_NAME] IS NOT NULL THEN [ep1].[NOM_ESTADO] + ' - Tarea Asumida' " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u2].[FULL_NAME] IS NULL THEN [ep1].[NOM_ESTADO] + ' - Consulta Transferida a ' + [gr2].[DESCRIPTION] " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 2 THEN [ep1].[NOM_ESTADO] + ' - Enviada a Corregir Datos' " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 4 THEN 'Consulta Cerrada' " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 8 THEN 'Consulta Cancelada' " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 5 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a Complementar a ' + [u2].[FULL_NAME] " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a Revisar a Farmacovigilancia' " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 5 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Consulta a Transferida a ' + [u2].[FULL_NAME] " +
"           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a Revisar a ' + [u2].[FULL_NAME] " +
"       END " +
"       AS HISTORICO, " +
"       CASE WHEN [tp].[CD_MATRICULA] LIKE 'Pool:%' AND [tp].[CD_MATRICULA_CONCLUS] = '' THEN " +
"            CASE WHEN CAST([tp].[DSL_OBS_TAR] AS varchar(50)) <> '' THEN [tp].[DSL_OBS_TAR] ELSE '-' END " +
"        ELSE " +
"            COALESCE( NULLIF(dbo.getTagContentIfExist(dbo.getProcessObservations([hp].[NUM_PROCES],[hp].[NUM_SEQ_ESTADO],[hp].[NUM_SEQ_MOVTO]), '<p>', '</p>'),''), " +
"                      CASE WHEN NOT EXISTS(SELECT [po].[NUM_PROCESS] FROM [dbo].[PROCESS_OBSERVATION] po WHERE [po].[NUM_PROCESS]=[hp].[NUM_PROCES]) " +
"                           THEN NULLIF(CAST([tp].[DSL_OBS_TAR] AS varchar(MAX)), '') " +
"                           ELSE '-' " + 
"                      END, " +
"                      '-') " +
"        END " +
"        AS OBSERVACIONES, " +
"       (SELECT CASE WHEN [tp].[IDI_STATUS] = 2 AND COUNT(*) > 0 THEN 'SI' ELSE '-' END FROM [ANEXO_PROCES] [ap] " +
"            WHERE [ap].[NUM_PROCES] = [hp].[NUM_PROCES] " +
"            AND [ap].[NUM_SEQ_MOVTO_ORIG] = [hp].[NUM_SEQ_MOVTO] " +
"            AND [ap].[NR_DOCUMENTO] <> " + documentId + ") AS ADJUNTO " +
" FROM " +
"     [ESTADO_PROCES] [ep1], " +
"     [HISTOR_PROCES] [hp], " +
"     [TAR_PROCES] [tp]  LEFT JOIN [FDN_USERTENANT] [ut1] " +
"                           ON ([ut1].[USER_CODE] = [tp].[CD_MATRICULA]) " +
"                        LEFT JOIN [FDN_USER] [u1] " +
"                           ON ([ut1].[USER_ID] = [u1].[USER_ID]) " +
"                        LEFT JOIN [FDN_USERTENANT] [ut2] " +
"                            ON ([ut2].[USER_CODE] = CAST([tp].[COD_MATR_ESCOLHID] AS varchar(50))) " +
"                        LEFT JOIN [FDN_USER] [u2] " +
"                           ON ([ut2].[USER_ID] = [u2].[USER_ID]) " +
"                        LEFT JOIN [FDN_USERTENANT] [utg] " +
"                            ON ([utg].[USER_CODE] = [tp].[CD_MATRICULA_CONCLUS]) " +
"                        LEFT JOIN [FDN_USER] [ug] " +
"                           ON ([utg].[USER_ID] = [ug].[USER_ID]) " +
"                        LEFT JOIN [FDN_GROUP] [gr1] " +
"                            ON ([gr1].[GROUP_CODE] = SUBSTRING(CAST([tp].[CD_MATRICULA] AS varchar(50)),12,11)) " +
"                        LEFT JOIN [FDN_GROUP] [gr2] " +
"                            ON ([gr2].[GROUP_CODE] = SUBSTRING(CAST([tp].[COD_MATR_ESCOLHID] AS varchar(50)),12,11))," +
"     [PROCES_WORKFLOW] [pw] LEFT JOIN [ESTADO_PROCES] [ep2] " +
"                            ON ([pw].[COD_DEF_PROCES] = [ep2].[COD_DEF_PROCES] " +
"                                AND [pw].[NUM_VERS] = [ep2].[NUM_VERS]) " +
" WHERE [hp].[NUM_PROCES] = [pw].[NUM_PROCES] " +
" AND [pw].[COD_DEF_PROCES] = [ep1].[COD_DEF_PROCES] " +
" AND [pw].[NUM_VERS] = [ep1].[NUM_VERS] " +
" AND [hp].[NUM_SEQ_ESTADO] = [ep1].[NUM_SEQ] " +
" AND [tp].[NUM_SEQ_ESCOLHID] = [ep2].[NUM_SEQ] " +
" AND [hp].[NUM_SEQ_MOVTO] = [tp].[NUM_SEQ_MOVTO] " +
" AND [hp].[NUM_PROCES] = [tp].[NUM_PROCES] " +
" AND [hp].[NUM_PROCES] =  " + nroSolicitud + " " + 
" ORDER BY [tp].[ASSIGN_END_DATE] ";
		
		conn = new javax.naming.InitialContext().lookup("jdbc/FluigDSRO").getConnection();   

        stmt = conn.createStatement();
        rs = stmt.executeQuery(query);

        while (rs.next()) {
            dataset.addRow([rs.getString("NOMBRE_TAREA"), rs.getString("TAREA"), rs.getString("USUARIOS"), rs.getString("DIA"), rs.getString("HORA"), rs.getString("HISTORICO"), rs.getString("OBSERVACIONES"), rs.getString("ADJUNTO")]);
        }
		
    } finally {
        if (stmt != null) { stmt.close(); }
        if (conn != null) { conn.close(); }
    }

    return dataset;
}

function getContraint(constraints, fieldName) {
	if(constraints != null){
		for (var i=0; i<constraints.length; i++){
			if (constraints[i].fieldName == fieldName){
				return constraints[i];
			}
		}
	}
	return "";
}