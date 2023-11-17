-- Es el formulario RAF06- Formulario Principal
-- Cambiar ML001148 por la tabla que corresponda !!
ALTER VIEW [dbo].[V_REQUERIMIENTO_INFORMATICO] AS 
	SELECT
		CAST(fp.nroSolicitud AS INT) AS nroSolicitud,
		CAST((SELECT hp.[LOG_ATIV]
		        FROM HISTOR_PROCES hp 
		       WHERE hp.NUM_PROCES=fp.nroSolicitud AND hp.NUM_SEQ_ESTADO=54) AS BIT) AS pendiente,
		CONVERT(DATE, '01/'+fp.fechaIngresoNecesaria , 103) AS fechaIngresoNecesaria,
		fp.nombre,
		fp.apellido,
		CASE WHEN fp.[puestoNuevo] like 'true' THEN fp.[nombrePuestoNuevo] ELSE fp.[puesto] END AS puesto,
		fp.gerencia,
		fp.area,
		fp.sector,
		fp.subsector AS subSector,
		fp.centroCosto,
		fp.reportaA,
		fp.tipoPosicion,
		fp.pea,
		fp.sede,
		fp.ubicacionFisica,
		fp.equipamientoRequerido,
		fp.usuarioQAD,
		fp.accesos,
		fp.accesoAWebmail AS webmail,
		STUFF((SELECT
			CASE WHEN fp1.salidaLLamadasLocales like 'true' THEN '/Llamadas Locales' ELSE '' END +
			CASE WHEN fp1.salidaDDNNacional like 'true' THEN '/DDN' ELSE '' END + 
			CASE WHEN fp1.salidaDDNInteracional like 'true' THEN '/DDI' ELSE '' END + 
			CASE WHEN fp1.salidaCelular like 'true' THEN '/Celular' ELSE '' END 
		FROM [ML001028] fp1 WHERE fp1.id = fp.id ),1,1,'') AS telefonia
	FROM [ML001028] fp, [DOCUMENTO] d
	WHERE fp.documentid = d.NR_DOCUMENTO
		AND fp.version = d.NR_VERSAO
		AND d.VERSAO_ATIVA = 1
        AND EXISTS(SELECT hp.NUM_SEQ_ESTADO
                   FROM HISTOR_PROCES hp 
		           WHERE hp.NUM_PROCES=fp.nroSolicitud AND hp.NUM_SEQ_ESTADO=54)


GO

-- Es el formulario RAF05 - Sede
-- Cambiar ML001144 por la tabla que corresponda !!
CREATE VIEW [dbo].[V_SEDE] AS 
	SELECT
		fp.descripcion
	FROM [ML001144] fp, [DOCUMENTO] d
	WHERE fp.documentid = d.NR_DOCUMENTO
		AND fp.version = d.NR_VERSAO
		AND d.VERSAO_ATIVA = 1
GO
