-- ML001073 es la tabla tblProds de RAF07-FormularioPrincipal
-- Cambiar ML001075 por la tabla que corresponda !!
-- ESTOS NUMEROS DE TABLAS SON LOS CORRESPONDIENTES A LA BASE DE DATOS DE DESARROLLO

CREATE VIEW [dbo].[V_SOLICITUDES_DISENIO] AS 
	SELECT
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
      JOIN V_RAF07_Motivos mo
        ON mo.reasonName = fp.changeReasonId
       AND IsNull(mo.visualizaReporte, '') <> ''	   
	 WHERE d.VERSAO_ATIVA = 1
GO

CREATE VIEW [dbo].[V_INICIADORES_SOLICITUD_DISENIO] AS 
	SELECT DISTINCT fut.USER_CODE colleagueId, fu.FULL_NAME colleagueName
	  FROM FDN_USER fu, FDN_USERTENANT fut, FDN_GROUPUSERROLE fgu
	 WHERE fu.USER_ID = fut.USER_ID
	   AND fut.USER_STATE = 1
	   AND fut.FIRST_ACCESS = 0
	   AND fut.TENANT_ID = 1
	   AND fgu.LOGIN = fut.LOGIN
	   AND fgu.GROUP_CODE LIKE 'RAF07-INI-%'
GO

CREATE VIEW [dbo].[V_GRUPOS_INICIADORES_SOLICITUD_DISENIO] AS 
	SELECT fg.GROUP_CODE groupId, fg.DESCRIPTION groupDescription
	  FROM FDN_GROUP fg
	 WHERE INTERNAL = 0
	   AND fg.TENANT_ID = 1
	   AND fg.GROUP_CODE LIKE 'RAF07-INI-%'
GO

 CREATE VIEW [dbo].[V_SOLICITUDES_DISENIO_PRODUCTOS] AS 
	SELECT
		CAST(fp.nroSolicitud AS INT) AS nroSolicitud,
        [tblProd].[ID],     
        tblProd.[codigoProd],
        tblProd.[descProd],
        tblProd.[grupoProd],
        tblProd.[tipoProd],
        tblProd.[marcaProd],
        tblProd.[prActivosProd],
        tblProd.[paisProd],
        tblProd.[nroLinea],
        tblProd.[estadoQAD],
        tblProd.[observaciones]
	  FROM ML001073 fp
	   JOIN ML001075 tblProd
	    ON tblProd.documentid = fp.documentid
	   AND tblProd.version = fp.version
	  JOIN DOCUMENTO d
	    ON d.NR_DOCUMENTO = fp.documentid
	   AND d.NR_VERSAO = fp.version
      JOIN V_RAF07_Motivos mo
       ON mo.reasonName = fp.changeReasonId
       AND IsNull(mo.visualizaReporte, '') <> ''	   
	 WHERE d.VERSAO_ATIVA = 1
	 
GO

 CREATE VIEW [dbo].[V_SOLICITUDES_DISENIO_TIPOS_NUEVOS_PRODUCTOS] AS 
	SELECT 
        DISTINCT
        tblTipoProd.[ID],        
		CAST(fp.nroSolicitud AS INT) AS nroSolicitud,
        tblTipoProd.[tipoNewProd],
        tblTipoProd.[nroLineaNewProd],
        tblTipoProd.[estadoQADNewProd],
        tblTipoProd.[observacionesQADNewProd]  
	  FROM ML001073 fp	 
	  JOIN ML001074 tblTipoProd
        ON [tblTipoProd].[documentid] = [fp].[documentid]
        AND tblTipoProd.version = fp.version
	  JOIN DOCUMENTO d
	    ON d.NR_DOCUMENTO = fp.documentid
	   AND d.NR_VERSAO = fp.version
      JOIN V_RAF07_Motivos mo
       ON mo.reasonName = fp.changeReasonId
       AND IsNull(mo.visualizaReporte, '') <> ''	   
	 WHERE d.VERSAO_ATIVA = 1
