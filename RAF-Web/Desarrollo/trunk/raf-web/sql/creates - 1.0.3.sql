DROP VIEW [dbo].[V_RAF07_Motivos];
DROP VIEW  [dbo].[V_RAF07_Motivos_Grupos];
DROP VIEW  [dbo].[V_SOLICITUDES_DISENIO];

CREATE VIEW [dbo].[V_RAF07_Motivos] AS
	SELECT m.*
	  FROM ML001071 as m
	  JOIN DOCUMENTO d
	    ON d.NR_DOCUMENTO = m.documentid
	   AND d.NR_VERSAO = m.version
	 WHERE d.VERSAO_ATIVA = 1;
GO


CREATE VIEW [dbo].[V_RAF07_Motivos_Grupos] AS
	(SELECT [h].* FROM ML001071 as m
	  JOIN DOCUMENTO d
	    ON (d.NR_DOCUMENTO = m.documentid AND d.NR_VERSAO = m.version)
      JOIN ML001072 h 
        ON ([h].[documentid] = [m].[documentid] AND [h].[version] = [m].[version])
	 WHERE [d].[VERSAO_ATIVA] = 1);

GO

CREATE VIEW [dbo].[V_RAF07_MotivoGrupoReporte] AS
(SELECT [m].[reasonName], [h].[userGroupId] AS grupoReporte FROM ML001071 as m
	  JOIN DOCUMENTO d
	    ON (d.NR_DOCUMENTO = m.documentid AND d.NR_VERSAO = m.version)
      JOIN ML001072 h 
        ON ([h].[documentid] = [m].[documentid] AND [h].[version] = [m].[version])
	 WHERE [m].[visualizaReporte] = 'on' AND [d].[VERSAO_ATIVA] = 1);

CREATE VIEW [dbo].[V_SOLICITUDES_DISENIO] AS 
	SELECT DISTINCT
        (CASE WHEN [tblProd].[ID] IS NOT NULL
            THEN CAST([fp].[ID] AS VARCHAR) + '_' + CAST([tblProd].[ID] AS VARCHAR) 
         ELSE
            CAST([fp].[ID] AS VARCHAR)
         END)
         AS codigoCompuesto
        ,
        CAST(fp.nroSolicitud AS INT) AS nroSolicitud,
		fp.title,
		fp.changeReason,
		fp.currentState,
		(SELECT hp.DAT_MOVTO
		   FROM HISTOR_PROCES hp
		  WHERE hp.NUM_PROCES = fp.nroSolicitud
		    AND hp.COD_EMPRESA = fp.companyid
		    AND hp.NUM_SEQ_MOVTO = 1) AS creationDate,
		fp.requestantName,
		fp.requestantCode,
		fp.userGroup,
		fp.userGroupCode,
		[fp].[breakDate],
        fp.[implementationType],
        [fp].[comments],
        [fp].[changeDetail],       				
		fp.marcaNewProd,
        [fp].[formaFarmaceuticaNewProd],
		CASE WHEN fp.changeGroupReasonType like 'nuevoDisenio' 
			THEN fp.prActivo1NewProd +
				 CASE WHEN fp.prActivo2NewProd <> '' THEN ', ' + fp.prActivo2NewProd ELSE '' END +
				 CASE WHEN fp.prActivo3NewProd <> '' THEN ', ' + fp.prActivo3NewProd ELSE '' END +
				 CASE WHEN fp.prActivo4NewProd <> '' THEN ', ' + fp.prActivo4NewProd ELSE '' END 
			ELSE tblProd.prActivosProd
		END AS prActivos,
		CASE WHEN fp.changeGroupReasonType like 'nuevoDisenio' 
			THEN fp.unidadMedida1NewProd +
				 CASE WHEN fp.unidadMedida2NewProd <> '' THEN ',' + fp.unidadMedida2NewProd ELSE '' END +
				 CASE WHEN fp.unidadMedida3NewProd <> '' THEN ',' + fp.unidadMedida3NewProd ELSE '' END +
				 CASE WHEN fp.unidadMedida4NewProd <> '' THEN ',' + fp.unidadMedida4NewProd ELSE '' END 
			ELSE ''
		END AS unidadesMedidaNewProd,
		CASE WHEN fp.changeGroupReasonType like 'nuevoDisenio' 
			THEN fp.concentracion1NewProd +
				 CASE WHEN fp.concentracion2NewProd <> '' THEN ',' + fp.concentracion2NewProd ELSE '' END +
				 CASE WHEN fp.concentracion3NewProd <> '' THEN ',' + fp.concentracion3NewProd ELSE '' END +
				 CASE WHEN fp.concentracion4NewProd <> '' THEN ',' + fp.concentracion4NewProd ELSE '' END 
			ELSE ''
		END AS concentracionesNewProd,
		fp.grupoNewProd,
		fp.presentacionNewProd,
		fp.paisNewProd,
		fp.titularidadNewProd,
		fp.elaboradorNewProd,
		fp.acondicionadorNewProd,
		fp.fichaTecnicaNewProd,
        fp.prActivo1NewProd,
        fp.prActivo2NewProd,
        fp.prActivo3NewProd,
        fp.prActivo4NewProd,
        fp.unidadMedida1NewProd,
        fp.unidadMedida2NewProd,
        fp.unidadMedida3NewProd,
        fp.unidadMedida4NewProd,
        fp.concentracion1NewProd,
        fp.concentracion2NewProd,
        fp.concentracion3NewProd,
        fp.concentracion4NewProd,
        [tiposConcat].[TiposNewProd],
        tblProd.[codigoProd] AS codigoProd,
        tblProd.[descProd] AS descripcionProd,
        tblProd.[grupoProd] AS grupoProd,
        tblProd.[tipoProd] AS tipoProd,
        tblProd.[prActivosProd] AS prActivoProd,
        tblProd.[paisProd] AS paisProd,
        mo.grupoReporte, 
		(SELECT TOP 1 hp.DAT_MOVTO
		   FROM HISTOR_PROCES hp
		  WHERE hp.NUM_PROCES = fp.nroSolicitud
		    AND hp.COD_EMPRESA = fp.companyid
		  ORDER BY NUM_SEQ_MOVTO DESC) AS lastModificationDate,
			(CASE WHEN fp.folderId ='' THEN (SELECT SERVER_URL FROM WCM_CONFIGURATION) + '/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + fp.nroSolicitud 
             ELSE (SELECT SERVER_URL FROM WCM_CONFIGURATION) + '/p/1/ecmnavigation?app_ecm_navigation_doc=' + fp.folderId
             END) AS url
	  FROM ML001073 fp
	  LEFT JOIN ML001075 tblProd
	    ON tblProd.documentid = fp.documentid
	   AND tblProd.version = fp.version
	  JOIN DOCUMENTO d
	    ON d.NR_DOCUMENTO = fp.documentid
	   AND d.NR_VERSAO = fp.version
      JOIN V_RAF07_MotivoGrupoReporte mo
        ON mo.reasonName = fp.changeReasonId          
         LEFT JOIN 
            (SELECT DISTINCT nroSolicitud,
            STUFF(
            (
            SELECT ';' + t2.TipoNewProd
            FROM [dbo].[V_SOLICITUDES_DISENIO_TIPOS_NUEVOS_PRODUCTOS] as t2
            WHERE t1.nroSolicitud = [t2].[nroSolicitud]
            FOR XML PATH('')
            ),1,1,'') as TiposNewProd
            FROM [dbo].[V_SOLICITUDES_DISENIO_TIPOS_NUEVOS_PRODUCTOS] AS t1) AS tiposConcat
            ON fp.[nroSolicitud] = [tiposConcat].[nroSolicitud]
	 WHERE d.VERSAO_ATIVA = 1

GO

SELECT * FROM [dbo].[V_RAF07_Motivos];
SELECT * FROM [dbo].[V_RAF07_Motivos_Grupos];
SELECT * FROM [dbo].[V_RAF07_MotivoGrupoReporte];
SELECT * FROM [dbo].[V_SOLICITUDES_DISENIO];