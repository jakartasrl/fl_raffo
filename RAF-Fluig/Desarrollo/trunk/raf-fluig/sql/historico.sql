SELECT
       [ep1].[NUM_SEQ] AS TAREA,
       [ep1].[NOM_ESTADO] AS NOMBRE_TAREA, 
       CASE 
 	       WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER') 
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER')  
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 6 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ATE') 
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER')        
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 7 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER')        
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 5 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') 
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 4 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') 
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 8 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') 
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') 
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u1].[FULL_NAME] IS NOT NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ATE') 
         
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de Responsables de ' + [gr1].[DESCRIPTION] 
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de Responsables de ' + [gr1].[DESCRIPTION] 
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 6 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [gr1].[DESCRIPTION] 
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de Responsables de ' + [gr1].[DESCRIPTION] 
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 7 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de Responsables de ' + [gr1].[DESCRIPTION] 
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 5 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [gr1].[DESCRIPTION] 
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 4 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [gr1].[DESCRIPTION] 
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 8 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [gr1].[DESCRIPTION] 
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [gr1].[DESCRIPTION] 
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u1].[FULL_NAME] IS NULL THEN [ug].[FULL_NAME]  + ' en nombre de ' + [gr1].[DESCRIPTION] 
         
           WHEN [hp].[NUM_SEQ_ESTADO] = 1 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ATE') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 6 AND [u2].[FULL_NAME] IS NOT NULL THEN [u2].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut2].[LOGIN],'RC_DER') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 6 AND [u2].[FULL_NAME] IS NULL THEN [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 2 THEN [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [u2].[FULL_NAME] IS NOT NULL THEN [u2].[FULL_NAME] + dbo.grupos(' - ', [ut2].[LOGIN],'RC_ATE') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [u2].[FULL_NAME] IS NULL THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ATE') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ATE') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 7 THEN [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER')        
           WHEN [hp].[NUM_SEQ_ESTADO] = 7 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN 'Sistema' 
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u2].[FULL_NAME] IS NOT NULL THEN [u2].[FULL_NAME] + dbo.grupos(' - ', [ut2].[LOGIN],'RC_ROR') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u2].[FULL_NAME] IS NULL THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 5 THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[USER_CODE],'RC_DER') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 4 THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 8 THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 2 THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ROR') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [u1].[FULL_NAME] + dbo.grupos(' - ', [ut1].[LOGIN],'RC_ATE') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 5 THEN [u1].[FULL_NAME] + dbo.grupos(' - Responsable de ', [ut1].[LOGIN],'RC_DER')  
       END AS USUARIOS, 
       CONVERT(VARCHAR(10), [tp].[DAT_CONCLUS_TAR], 103) AS DIA,
       RIGHT( '00' + cast([tp].[NUM_HORA_CONCLUS_TAR] / 3600 AS varchar(2)), 2) + ':' + RIGHT( '00' + cast(([tp].[NUM_HORA_CONCLUS_TAR] % 3600) / 60 AS varchar(2)), 2) AS HORA, 
       CASE 
           WHEN [tp].[IDI_STATUS] = 0 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Consulta Salvada sin Enviar' 
           WHEN [hp].[NUM_SEQ_ESTADO] = 1 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Derivada a ' + [gr2].[DESCRIPTION] 
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 6 AND [u2].[FULL_NAME] IS NOT NULL THEN [ep1].[NOM_ESTADO] + ' - Tarea Asumida' 
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 6 AND [u2].[FULL_NAME] IS NULL THEN [ep1].[NOM_ESTADO] + ' - Consulta Transferida a ' + [gr2].[DESCRIPTION] 
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 2 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a ' + [ep2].[NOM_ESTADO] 
           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [u2].[FULL_NAME] IS NOT NULL THEN [ep1].[NOM_ESTADO] + ' - Tarea Asumida' 
           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [u2].[FULL_NAME] IS NULL THEN [ep1].[NOM_ESTADO] + ' - Consulta Transferida a ' + [gr2].[DESCRIPTION] 
           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a ' + [gr2].[DESCRIPTION] 
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a Revisar a Farmacovigilancia' 
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 7 THEN [ep1].[NOM_ESTADO] + ' - Consulta Derivada' 
           WHEN [hp].[NUM_SEQ_ESTADO] = 7 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [ep1].[NOM_ESTADO] + ' - Enviada a ' +  [gr2].[DESCRIPTION] 
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u2].[FULL_NAME] IS NOT NULL THEN [ep1].[NOM_ESTADO] + ' - Tarea Asumida' 
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [u2].[FULL_NAME] IS NULL THEN [ep1].[NOM_ESTADO] + ' - Consulta Transferida a ' + [gr2].[DESCRIPTION] 
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 2 THEN [ep1].[NOM_ESTADO] + ' - Enviada a Corregir Datos' 
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 4 THEN 'Consulta Cerrada' 
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 8 THEN 'Consulta Cancelada' 
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 5 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a Complementar a ' + [u2].[FULL_NAME] 
           WHEN [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a Revisar a Farmacovigilancia' 
           WHEN [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 5 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Consulta a Transferida a ' + [u2].[FULL_NAME] 
           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a Revisar a ' + [u2].[FULL_NAME] 
       END 
       AS HISTORICO, 
       CASE WHEN [tp].[CD_MATRICULA] LIKE 'Pool:%' AND [tp].[CD_MATRICULA_CONCLUS] = '' THEN
           CASE WHEN CAST([tp].[DSL_OBS_TAR] AS varchar(50)) <> '' THEN [tp].[DSL_OBS_TAR] ELSE '-' END
       ELSE
           COALESCE( NULLIF(dbo.getTagContentIfExist(dbo.getProcessObservations([hp].[NUM_PROCES],[hp].[NUM_SEQ_ESTADO],[hp].[NUM_SEQ_MOVTO]), '<p>', '</p>'),''),
                     CASE WHEN NOT EXISTS(SELECT [po].[NUM_PROCESS] FROM [dbo].[PROCESS_OBSERVATION] po WHERE [po].[NUM_PROCESS]=[hp].[NUM_PROCES]) 
                          THEN NULLIF(CAST([tp].[DSL_OBS_TAR] AS varchar(MAX)), '') 
                          ELSE '-' 
                     END,
                     '-')
       END 
       AS OBSERVACIONES,  
       
       (SELECT CASE WHEN [tp].[IDI_STATUS] = 2 AND COUNT(*) > 0 THEN 'SI' ELSE '-' END FROM [ANEXO_PROCES] [ap] 
            WHERE [ap].[NUM_PROCES] = [hp].[NUM_PROCES] 
            AND [ap].[NUM_SEQ_MOVTO_ORIG] = [hp].[NUM_SEQ_MOVTO]
            AND [ap].[NR_DOCUMENTO] <> 1) AS ADJUNTO
 FROM 
     [ESTADO_PROCES] [ep1], 
     [HISTOR_PROCES] [hp], 
     [TAR_PROCES] [tp]  LEFT JOIN [FDN_USERTENANT] [ut1] 
                           ON ([ut1].[USER_CODE] = [tp].[CD_MATRICULA]) 
                        LEFT JOIN [FDN_USER] [u1] 
                           ON ([ut1].[USER_ID] = [u1].[USER_ID]) 
                        LEFT JOIN [FDN_USERTENANT] [ut2] 
                            ON ([ut2].[USER_CODE] = CAST([tp].[COD_MATR_ESCOLHID] AS varchar(50))) 
                        LEFT JOIN [FDN_USER] [u2] 
                           ON ([ut2].[USER_ID] = [u2].[USER_ID]) 
                        LEFT JOIN [FDN_USERTENANT] [utg] 
                            ON ([utg].[USER_CODE] = [tp].[CD_MATRICULA_CONCLUS]) 
                        LEFT JOIN [FDN_USER] [ug] 
                           ON ([utg].[USER_ID] = [ug].[USER_ID]) 
                        LEFT JOIN [FDN_GROUP] [gr1] 
                            ON ([gr1].[GROUP_CODE] = SUBSTRING(CAST([tp].[CD_MATRICULA] AS varchar(50)),12,11)) 
                        LEFT JOIN [FDN_GROUP] [gr2] 
                            ON ([gr2].[GROUP_CODE] = SUBSTRING(CAST([tp].[COD_MATR_ESCOLHID] AS varchar(50)),12,11))
                       ,
     [PROCES_WORKFLOW] [pw] LEFT JOIN [ESTADO_PROCES] [ep2] 
                            ON ([pw].[COD_DEF_PROCES] = [ep2].[COD_DEF_PROCES] 
                                AND [pw].[NUM_VERS] = [ep2].[NUM_VERS]) 
 WHERE [hp].[NUM_PROCES] = [pw].[NUM_PROCES] 
 AND [pw].[COD_DEF_PROCES] = [ep1].[COD_DEF_PROCES] 
 AND [pw].[NUM_VERS] = [ep1].[NUM_VERS] 
 AND [hp].[NUM_SEQ_ESTADO] = [ep1].[NUM_SEQ] 
 AND [tp].[NUM_SEQ_ESCOLHID] = [ep2].[NUM_SEQ] 
 AND [hp].[NUM_SEQ_MOVTO] = [tp].[NUM_SEQ_MOVTO] 
 AND [hp].[NUM_PROCES] = [tp].[NUM_PROCES] 
 AND [hp].[NUM_PROCES] =  1133
 ORDER BY [hp].[DAT_MOVTO], [hp].[HRA_MOVTO], [tp].[DAT_CONCLUS_TAR], [tp].[NUM_HORA_CONCLUS_TAR];
 
 
DROP FUNCTION grupos;
GO

CREATE FUNCTION grupos(@texto varchar(255), @login varchar(255), @prefijo varchar(255))
RETURNS varchar(255) 
AS 
BEGIN
    DECLARE @ret varchar(255);
    SELECT @ret = COALESCE(@ret+',' ,'') + DESCRIPTION FROM FDN_GROUP [gr], FDN_GROUPUSERROLE [gc] 
        WHERE [gr].GROUP_CODE = [gc].GROUP_CODE        
        AND  [gc].LOGIN = @login   
        AND [gr].GROUP_CODE LIKE @prefijo + '%' ;
    
    IF @ret IS NOT NULL 
        BEGIN
            SET @ret = @texto + @ret;
        END
    ELSE 
        BEGIN
            SET @ret = ''
        END        
    RETURN @ret;
END;
GO

DROP FUNCTION getTagContentIfExist;
GO

CREATE FUNCTION getTagContentIfExist (@string NVARCHAR(MAX), @delimiterIni NVARCHAR(MAX), @delimiterEnd NVARCHAR(MAX)) 
RETURNS NVARCHAR(MAX)
BEGIN 

    DECLARE @start INT, @end INT, @output NVARCHAR(MAX) 
    SELECT @start = CHARINDEX(@delimiterIni, @string)+LEN(@delimiterIni), @end = CHARINDEX(@delimiterEnd, @string) 
    
    SET @output = ''
    WHILE @end <> 0 BEGIN 
        SET @output =  @output + SUBSTRING(@string, @start, @end - @start) + ' <br> '
        SELECT @start = CHARINDEX(@delimiterIni, @string, @start+1)+LEN(@delimiterIni), @end = CHARINDEX(@delimiterEnd, @string, @end+1)
    END 
    
    IF @output = ''
        SET @output = @string
        
    RETURN @output
END;
GO

DROP FUNCTION getProcessObservations
GO

CREATE FUNCTION getProcessObservations(@numProcess INT, @numSeq INT, @movSeq INT)
RETURNs NVARCHAR(MAX)
AS BEGIN
    DECLARE @observations NVARCHAR(MAX)
    SET @observations = ''

    SELECT @observations = @observations + [OBSERVATION]
      FROM [dbo].[PROCESS_OBSERVATION]
     WHERE [NUM_PROCESS]=@numProcess AND [NUM_SEQ]=@numSeq AND [MOV_SEQ]=@movSeq
     
   RETURN @observations 
END
GO


