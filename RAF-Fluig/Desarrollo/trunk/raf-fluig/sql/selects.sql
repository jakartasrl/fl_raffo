
-- Para Solicitud de Puesto
SELECT pai.*,
	STUFF(( 
		SELECT  ', '+CAST(filho.quienesEntrevistan as varchar)
		FROM    ML001126 filho
		WHERE   filho.documentid = pai.documentid AND filho.version = pai.version
		FOR XML PATH('')
	),1,1,'') AS quienesEntrevistan,
	STUFF(( 
		SELECT  ', '+CAST(filho.detalleAccion as varchar)
		FROM    ML001127 filho
		WHERE   filho.documentid = pai.documentid AND filho.version = pai.version
		FOR XML PATH('')
	),1,1,'') AS detalleAccion,
	STUFF(( 
		SELECT  ', '+CAST(filho.idiomas as varchar)+': (Lectura='+CAST(filho.nivelLectura as varchar)+', Escrito='+CAST(filho.nivelEscrito as varchar)+', Oral='+CAST(filho.nivelOral as varchar)
		FROM    ML001128 filho
		WHERE   filho.documentid = pai.documentid AND filho.version = pai.version
		FOR XML PATH('')
	),1,1,'') AS idiomas,
	STUFF(( 
		SELECT  ', '+CAST(filho.programasInformatica as varchar)+': '+CAST(filho.programasInformaticaNivel as varchar)
		FROM    ML001129 filho
		WHERE   filho.documentid = pai.documentid AND filho.version = pai.version
		FOR XML PATH('')
	),1,1,'') AS programasInformatica,
	STUFF(( 
		SELECT  ', '+CAST(filho.competencia as varchar)+': '+CAST(filho.nivelCompetencia as varchar)+' ('+CAST(filho.descripcionAmpliada as varchar)+')'
		FROM    ML001130 filho
		WHERE   filho.documentid = pai.documentid AND filho.version = pai.version
		FOR XML PATH('')
	),1,1,'') AS competencias,
	STUFF(( 
		SELECT  ', '+CAST(filho.beneficios as varchar)+': '+CAST(filho.beneficiosChck as varchar)
		FROM    ML001131 filho
		WHERE   filho.documentid = pai.documentid AND filho.version = pai.version
		FOR XML PATH('')
	),1,1,'') AS beneficios
FROM ML001125 pai


-- Para Solicitud de Alta de Empleado
SELECT pai.*,
	STUFF(( 
		SELECT  ', '+CAST(filho.quienesEntrevistan as varchar)
		FROM    ML001161 filho
		WHERE   filho.documentid = pai.documentid AND filho.version = pai.version
		FOR XML PATH('')
	),1,1,'') AS quienesEntrevistan,
	STUFF((  
		SELECT  ', '+CAST(filho.detalleAccion as varchar)
		FROM    ML001162 filho
		WHERE   filho.documentid = pai.documentid AND filho.version = pai.version
		FOR XML PATH('')
	),1,1,'') AS detalleAccion,
	STUFF((  
		SELECT  ', '+CAST(filho.idiomas as varchar)+': (Lectura='+CAST(filho.nivelLectura as varchar)+', Escrito='+CAST(filho.nivelEscrito as varchar)+', Oral='+CAST(filho.nivelOral as varchar)
		FROM    ML001163 filho
		WHERE   filho.documentid = pai.documentid AND filho.version = pai.version
		FOR XML PATH('')
	),1,1,'') AS idiomas,
	STUFF(( 
		SELECT  ', '+CAST(filho.programasInformatica as varchar)+': '+CAST(filho.programasInformaticaNivel as varchar)
		FROM    ML001164 filho
		WHERE   filho.documentid = pai.documentid AND filho.version = pai.version
		FOR XML PATH('')
	),1,1,'') AS programasInformatica,
	STUFF(( 
		SELECT  ', '+CAST(filho.competencia as varchar)+': '+CAST(filho.nivelCompetencia as varchar)+' ('+CAST(filho.descripcionAmpliada as varchar)+')'
		FROM    ML001165 filho
		WHERE   filho.documentid = pai.documentid AND filho.version = pai.version
		FOR XML PATH('')
	),1,1,'') AS competencias,
	STUFF((  
		SELECT  ', '+CAST(filho.beneficios as varchar)+': '+CAST(filho.beneficiosChck as varchar)
		FROM    ML001166 filho
		WHERE   filho.documentid = pai.documentid AND filho.version = pai.version
		FOR XML PATH('')
	),1,1,'') AS beneficios,
	STUFF((  
		SELECT  ', '+CAST(filho.tipoDoc as varchar)+': '+CAST(filho.documento as varchar)
		FROM    ML001167 filho
		WHERE   filho.documentid = pai.documentid AND filho.version = pai.version
		FOR XML PATH('')
	),1,1,'') AS documentos
FROM ML001160 pai
