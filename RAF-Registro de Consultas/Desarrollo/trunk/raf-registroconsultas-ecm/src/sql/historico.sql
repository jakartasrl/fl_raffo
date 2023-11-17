SELECT  
     -- [tp].[CD_MATRICULA_CONCLUS],
      [cg].[NM_COLABORADOR],
        -- [hp].[NUM_SEQ_MOVTO], 
         [tp].[CD_MATRICULA], 
       -- [tp].[NUM_HORA_CONCLUS_TAR] / 3600 AS [HH], 
       -- ([tp].[NUM_HORA_CONCLUS_TAR] % 3600) / 60 AS [MM], 
       -- ([tp].[NUM_HORA_CONCLUS_TAR] % 3600) % 60 AS [SS], 
        --[hp].[NUM_SEQ_ESTADO],         
        --[tp].[NUM_SEQ_ESCOLHID], 
        --[tp].[IDI_STATUS],
        --[ep1].[NOM_ESTADO], 
        --[ep2].[NOM_ESTADO], 
        --[tp].[COD_MATR_ESCOLHID], 
       -- [c1].[NM_COLABORADOR] AS COLABORADOR1, 
       -- [c2].[NM_COLABORADOR] AS COLABORADOR2,
       -- SUBSTRING(CAST([tp].[COD_MATR_ESCOLHID] AS varchar(50)),12,11) AS CODIGO_GRUPO, [gr1].[DS_GRUPO], [gr2].[DS_GRUPO],
       [ep1].[NUM_SEQ] AS TAREA,
       CASE
           -- Gerente de Proceso     
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [c1].[NM_COLABORADOR] IS NOT NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de ' + [c1].[NM_COLABORADOR] + dbo.grupos(' - Responsable de ', [c1].[CD_MATRICULA],'RC_DER')
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [c1].[NM_COLABORADOR] IS NOT NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de ' + [c1].[NM_COLABORADOR] + dbo.grupos(' - Responsable de ', [c1].[CD_MATRICULA],'RC_DER') 
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 6 AND [c1].[NM_COLABORADOR] IS NOT NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de ' + [c1].[NM_COLABORADOR] + dbo.grupos(' - ', [c1].[CD_MATRICULA],'RC_ATE')
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [c1].[NM_COLABORADOR] IS NOT NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de ' + [c1].[NM_COLABORADOR] + dbo.grupos(' - Responsable de ', [c1].[CD_MATRICULA],'RC_DER')       
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 7 AND [c1].[NM_COLABORADOR] IS NOT NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de ' + [c1].[NM_COLABORADOR] + dbo.grupos(' - Responsable de ', [c1].[CD_MATRICULA],'RC_DER')       
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 5 AND [c1].[NM_COLABORADOR] IS NOT NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de ' + [c1].[NM_COLABORADOR] + dbo.grupos(' - ', [c1].[CD_MATRICULA],'RC_ROR')
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 4 AND [c1].[NM_COLABORADOR] IS NOT NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de ' + [c1].[NM_COLABORADOR] + dbo.grupos(' - ', [c1].[CD_MATRICULA],'RC_ROR')
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 8 AND [c1].[NM_COLABORADOR] IS NOT NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de ' + [c1].[NM_COLABORADOR] + dbo.grupos(' - ', [c1].[CD_MATRICULA],'RC_ROR')
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [c1].[NM_COLABORADOR] IS NOT NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de ' + [c1].[NM_COLABORADOR] + dbo.grupos(' - ', [c1].[CD_MATRICULA],'RC_ROR')
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [c1].[NM_COLABORADOR] IS NOT NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de ' + [c1].[NM_COLABORADOR] + dbo.grupos(' - ', [c1].[CD_MATRICULA],'RC_ATE')
         
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [c1].[NM_COLABORADOR] IS NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de Responsables de ' + [gr1].[DS_GRUPO]
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [c1].[NM_COLABORADOR] IS NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de Responsables de ' + [gr1].[DS_GRUPO]
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 6 AND [c1].[NM_COLABORADOR] IS NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de ' + [gr1].[DS_GRUPO]
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [c1].[NM_COLABORADOR] IS NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de Responsables de ' + [gr1].[DS_GRUPO]
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 7 AND [c1].[NM_COLABORADOR] IS NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de Responsables de ' + [gr1].[DS_GRUPO]
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 5 AND [c1].[NM_COLABORADOR] IS NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de ' + [gr1].[DS_GRUPO]
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 4 AND [c1].[NM_COLABORADOR] IS NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de ' + [gr1].[DS_GRUPO]
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 8 AND [c1].[NM_COLABORADOR] IS NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de ' + [gr1].[DS_GRUPO]
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [c1].[NM_COLABORADOR] IS NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de ' + [gr1].[DS_GRUPO]
           WHEN [tp].[CD_MATRICULA_CONCLUS] <> '' AND [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [c1].[NM_COLABORADOR] IS NULL THEN [cg].[NM_COLABORADOR]  + ' en nombre de ' + [gr1].[DS_GRUPO]
         
           WHEN [hp].[NUM_SEQ_ESTADO] = 1 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [c1].[NM_COLABORADOR] + dbo.grupos(' - ', [c1].[CD_MATRICULA],'RC_ATE') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [c2].[NM_COLABORADOR] + dbo.grupos(' - Responsable de ', [c2].[CD_MATRICULA],'RC_DER') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 2 THEN [c1].[NM_COLABORADOR] + dbo.grupos(' - Responsable de ', [c1].[CD_MATRICULA],'RC_DER')       
           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [c2].[NM_COLABORADOR] IS NOT NULL THEN [c2].[NM_COLABORADOR] + dbo.grupos(' - ', [c2].[CD_MATRICULA],'RC_ATE')
           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [c2].[NM_COLABORADOR] IS NULL THEN [c1].[NM_COLABORADOR] + dbo.grupos(' - ', [c1].[CD_MATRICULA],'RC_ATE') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [c1].[NM_COLABORADOR] + dbo.grupos(' - ', [c1].[CD_MATRICULA],'RC_ATE') 
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [c1].[NM_COLABORADOR] + dbo.grupos(' - Responsable de ', [c1].[CD_MATRICULA],'RC_DER')       
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 7 THEN [c1].[NM_COLABORADOR] + dbo.grupos(' - Responsable de ', [c1].[CD_MATRICULA],'RC_DER')       
           WHEN [hp].[NUM_SEQ_ESTADO] = 7 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN 'Sistema'
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [c2].[NM_COLABORADOR] IS NOT NULL THEN [c2].[NM_COLABORADOR] + dbo.grupos(' - ', [c2].[CD_MATRICULA],'RC_ROR')
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [c2].[NM_COLABORADOR] IS NULL THEN [c1].[NM_COLABORADOR] + dbo.grupos(' - ', [c1].[CD_MATRICULA],'RC_ROR')
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 5 THEN [c1].[NM_COLABORADOR] + dbo.grupos(' - ', [c1].[CD_MATRICULA],'RC_ROR')           
           WHEN [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [c1].[NM_COLABORADOR] + dbo.grupos(' - Responsable de ', [c1].[CD_MATRICULA],'RC_DER')
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 4 THEN [c1].[NM_COLABORADOR] + dbo.grupos(' - ', [c1].[CD_MATRICULA],'RC_ROR')
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 8 THEN [c1].[NM_COLABORADOR] + dbo.grupos(' - ', [c1].[CD_MATRICULA],'RC_ROR')
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 2 THEN [c1].[NM_COLABORADOR] + dbo.grupos(' - ', [c1].[CD_MATRICULA],'RC_ROR')
           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [c1].[NM_COLABORADOR] + dbo.grupos(' - ', [c1].[CD_MATRICULA],'RC_ATE')
           WHEN [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 5 THEN [c1].[NM_COLABORADOR] + dbo.grupos(' - Responsable de ', [c1].[CD_MATRICULA],'RC_DER')  
       END AS USUARIOS,
       CONVERT(VARCHAR(10), [tp].[DAT_CONCLUS_TAR], 103) AS DIA,
       RIGHT( '00' + cast([tp].[NUM_HORA_CONCLUS_TAR] / 3600 AS varchar(2)), 2) + ':' + RIGHT( '00' + cast(([tp].[NUM_HORA_CONCLUS_TAR] % 3600) / 60 AS varchar(2)), 2) AS HORA,
       CASE
           WHEN [tp].[IDI_STATUS] = 0 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Consulta Salvada sin Enviar'
           WHEN [hp].[NUM_SEQ_ESTADO] = 1 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Derivada a ' + [gr2].[DS_GRUPO]
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [ep1].[NOM_ESTADO] + ' - Tarea Asumida'
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 2 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a ' + [ep2].[NOM_ESTADO]
           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [c2].[NM_COLABORADOR] IS NOT NULL THEN [ep1].[NOM_ESTADO] + ' - Tarea Asumida'
           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 2 AND [c2].[NM_COLABORADOR] IS NULL THEN [ep1].[NOM_ESTADO] + ' - Consulta Transferida a ' + [gr2].[DS_GRUPO]
           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a ' + [gr2].[DS_GRUPO]
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a Revisar a Farmacovigilancia'
           WHEN [hp].[NUM_SEQ_ESTADO] = 6 AND [tp].[NUM_SEQ_ESCOLHID] = 7 THEN [ep1].[NOM_ESTADO] + ' - Consulta Derivada' 
           WHEN [hp].[NUM_SEQ_ESTADO] = 7 AND [tp].[NUM_SEQ_ESCOLHID] = 6 THEN [ep1].[NOM_ESTADO] + ' - Enviada a ' +  [gr2].[DS_GRUPO]
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [c2].[NM_COLABORADOR] IS NOT NULL THEN [ep1].[NOM_ESTADO] + ' - Tarea Asumida'
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 3 AND [c2].[NM_COLABORADOR] IS NULL THEN [ep1].[NOM_ESTADO] + ' - Consulta Transferida a ' + [gr2].[DS_GRUPO]
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 2 THEN [ep1].[NOM_ESTADO] + ' - Enviada a Corregir Datos'
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 4 THEN 'Consulta Cerrada'
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 8 THEN 'Consulta Cancelada'
           WHEN [hp].[NUM_SEQ_ESTADO] = 3 AND [tp].[NUM_SEQ_ESCOLHID] = 5 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a Complementar a ' + [c2].[NM_COLABORADOR]
           WHEN [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a Revisar a Farmacovigilancia'
           WHEN [hp].[NUM_SEQ_ESTADO] = 5 AND [tp].[NUM_SEQ_ESCOLHID] = 5 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Consulta a Transferida a ' + [c2].[NM_COLABORADOR]
           WHEN [hp].[NUM_SEQ_ESTADO] = 2 AND [tp].[NUM_SEQ_ESCOLHID] = 3 THEN [ep1].[NOM_ESTADO] + ' - ' + 'Enviada a Revisar a ' + [c2].[NM_COLABORADOR]
       END
       AS HISTORICO,
       CASE WHEN CAST([tp].[DSL_OBS_TAR] AS varchar(50)) <> '' THEN [tp].[DSL_OBS_TAR] ELSE '-' END
       AS OBSERVACIONES,
       (SELECT CASE WHEN [tp].[IDI_STATUS] = 2 AND COUNT(*) > 0 THEN 'SI' ELSE '-' END FROM [ANEXO_PROCES] [ap]
            WHERE [ap].[NUM_PROCES] = [hp].[NUM_PROCES]
            AND [ap].[NUM_SEQ_MOVTO_ORIG] = [hp].[NUM_SEQ_ESTADO]
            AND [ap].[NR_DOCUMENTO] <> 2994) AS ADJUNTO
FROM 
     [ESTADO_PROCES] [ep1],
     [HISTOR_PROCES] [hp],
     [TAR_PROCES] [tp]  LEFT JOIN [COLABORADOR] [c1] 
                            ON ([c1].[CD_MATRICULA] = [tp].[CD_MATRICULA])
                        LEFT JOIN [COLABORADOR] [c2] 
                            ON ([c2].[CD_MATRICULA] = CAST([tp].[COD_MATR_ESCOLHID] AS varchar(50)))
                        LEFT JOIN [COLABORADOR] [cg] 
                            ON ([cg].[CD_MATRICULA] = [tp].[CD_MATRICULA_CONCLUS])    
                        LEFT JOIN [GRUPO] [gr1] 
                            ON ([gr1].[CD_GRUPO] = SUBSTRING(CAST([tp].[CD_MATRICULA] AS varchar(50)),12,11))
                        LEFT JOIN [GRUPO] [gr2] 
                            ON ([gr2].[CD_GRUPO] = SUBSTRING(CAST([tp].[COD_MATR_ESCOLHID] AS varchar(50)),12,11)),                            
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
AND [hp].[NUM_PROCES] = 251 --202 --195 --159 
ORDER BY [hp].[DAT_MOVTO], [hp].[HRA_MOVTO], [tp].[DAT_CONCLUS_TAR], [tp].[NUM_HORA_CONCLUS_TAR];



DROP FUNCTION grupos;
CREATE FUNCTION grupos(@texto varchar(255), @matricula varchar(255), @prefijo varchar(255))
RETURNS varchar(255) 
AS 
BEGIN
    DECLARE @ret varchar(255);
    SELECT @ret = COALESCE(@ret+',' ,'') + [DS_GRUPO] FROM [GRUPO] [gr], [GRUPO_COLABORADOR] [gc] 
        WHERE [gr].[CD_GRUPO] = [gc].[CD_GRUPO]        
        AND  [gc].[CD_MATRICULA] = @matricula
        AND [gr].[CD_GRUPO] LIKE @prefijo + '%' ;
    
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