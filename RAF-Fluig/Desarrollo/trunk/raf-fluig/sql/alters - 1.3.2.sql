-- Es el formulario RAF05- Formulario Principal
-- Cambiar el nombre de la base por la que corresponda!!
-- En RAFFO - Desarrollo: -> AS_FLUIG_1.5.11
-- Cambiar ML001125 por la tabla que corresponda !!
-- En RAFFO - Desarrollo: -> ML001125 
ALTER VIEW [dbo].[V_RAF05_SOLICITUD_PUESTO] AS 
SELECT fp.nroSolicitud,
		fp.matriculaSolicitante,
		fp.jefeMatricula,
		fp.gerenteN1Matricula,
		fp.gerenteN2Matricula,
		fp.fechaInicioSolicitud,
		fp.fechaFinSolicitud,
		fp.tarea,	
		UPPER(CAST(fp.busquedaConfidencial AS varchar)) AS busquedaConfidencial,
		CASE WHEN fp.ingresoPersonal like 'PE' THEN 'Puesto Estándar' 
			ELSE (CASE WHEN fp.ingresoPersonal like 'APM' THEN 'Fuerza de Venta (APM)' 
			ELSE 'Fuerza de Venta (APF)' END) 
		END AS ingresoPersonal,
		fp.fechaRelevamientoPerfil,
		CONVERT(VARCHAR(10), CONVERT(datetime, CAST(fp.fechaRelevamientoPerfil AS VARCHAR), 103), 120) AS fechaRelevamientoPerfilFiltro,
		fp.fechaIngresoNecesaria,
		fp.codigoBusqueda,
		fp.nombreBusqueda,
		fp.puesto,
		CASE WHEN fp.puestoNuevo like 'true' THEN 'SI' ELSE 'NO' END AS puestoNuevo,
		fp.nombrePuestoNuevo,
		fp.categoria,
		STUFF((SELECT
			CASE WHEN fp1.junior like 'true' THEN '/Junior' ELSE '' END +
			CASE WHEN fp1.semiSenior like 'true' THEN '/SemiSR' ELSE '' END + 
			CASE WHEN fp1.senior like 'true' THEN '/Senior' ELSE '' END + 
			CASE WHEN fp1.noCorresponde like 'true' THEN '/NC' ELSE '' END 
		FROM [FLUIG_DESA].[dbo].[ML001011] fp1 WHERE fp1.id = fp.id ),1,1,'')AS seniority,
		fp.gerencia,
		fp.area,
		fp.sector,
		fp.subsector,
		fp.aperturaPorSector,
		fp.lineaEspecialidad,
		fp.zona,
		fp.centroCosto,
		fp.reportaa,
		fp.categoriaReportaa,
		fp.puestoReportaa,
		fp.sugiereAlguien,
		fp.equipamientoRequerido,
		fp.accesos,
		fp.accesoAWebmail,
		STUFF((SELECT
			CASE WHEN fp1.salidaLLamadasLocales like 'true' THEN '/Llamadas Locales' ELSE '' END +
			CASE WHEN fp1.salidaDDNNacional like 'true' THEN '/DDN' ELSE '' END + 
			CASE WHEN fp1.salidaDDNInteracional like 'true' THEN '/DDI' ELSE '' END + 
			CASE WHEN fp1.salidaCelular like 'true' THEN '/Celular' ELSE '' END 
		FROM [FLUIG_DESA].[dbo].[ML001011] fp1 WHERE fp1.id = fp.id ),1,1,'')AS accesosTelefonia,
		CASE WHEN fp.tipoPosicion like 'puestoNuevo' THEN 'Puesto Nuevo' ELSE 'Reemplazo' END AS tipoPosicion,
		fp.nombreReemplazo,
		CASE WHEN fp.motivoReemplazo like 'renuncia' THEN 'Renuncia' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'desvinculacion' THEN 'Desvinculación' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'jubilacion' THEN 'Jubilación' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'licenciaEnfermedad' THEN 'Licencia por Enfermedad' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'licenciaMaternidad' THEN 'Licencia por Maternidad' ELSE 'Otros' END) END) END) END)
		END AS motivoReemplazo,
		fp.observaciones,
		CASE WHEN fp.efectivoTemporario like 'efectivo' THEN 'Efectivo' ELSE 'Temporario' END AS efectivoTemporario,
		fp.cantidadMeses,
		fp.motivoPuestoNuevo,
		CASE WHEN fp.pea like 'dentro' THEN 'Dentro' ELSE 'Fuera' END AS pea,
		CAST(fp.personalACargo AS varchar) AS personalACargo,
		fp.clientesInternos,
		fp.proveedoresInternos,
		fp.contactoConClientes,
		fp.detalleMaquinas,
		UPPER(CAST(fp.manejoInfoConfidencial AS varchar)) AS manejoInfoConfidencial,
		CASE WHEN fp.esfuerzoFisico like 'bajo' THEN 'Bajo' 
			ELSE (CASE WHEN fp.esfuerzoFisico like 'moderado' THEN 'Moderado' ELSE 'Intenso' END) 
		END AS esfuerzoFisico,
		UPPER(CAST(fp.exposicionMaterialesQuimicos AS varchar)) AS exposicionMaterialesQuimicos,
		fp.proyeccionPosicion,
		fp.ciudadZonasVisitar,
		fp.giras,
		CAST(fp.productosManejar AS varchar) AS productosManejar,
		fp.visitaMedicos,
		UPPER(CAST(fp.visitaInstituciones AS varchar)) AS visitaInstituciones,
		UPPER(CAST(fp.administraMuestrasMedicas AS varchar)) AS administraMuestrasMedicas,
		UPPER(CAST(fp.visitaFarmacias AS varchar)) AS visitaFarmacias,
		fp.coordinacionAccionesFidelizar,
		fp.analisisInformacionAuditoria,
		fp.tareasAdministrativasVarias,
		fp.franjaEdad,
		CASE WHEN fp.genero like 'femenino' THEN 'Femenino' ELSE (CASE WHEN fp.genero like 'masculino' THEN 'Masculino' ELSE 'Indistinto' END) END AS genero,
		STUFF((SELECT
			CASE WHEN fp1.secundarioCompleto like 'true' THEN '/Secundario Completo' ELSE '' END +
			CASE WHEN fp1.teciarioCurso like 'true' THEN '/Teciario en Curso' ELSE '' END + 
			CASE WHEN fp1.terciarioGraduado like 'true' THEN '/Terciario Graduado' ELSE '' END + 
			CASE WHEN fp1.universitarioCurso like 'true' THEN '/Universitario en Curso' ELSE '' END + 
			CASE WHEN fp1.universitarioGraduado like 'true' THEN '/Universitario Graduado' ELSE '' END + 
			CASE WHEN fp1.posgradoCurso like 'true' THEN '/Posgrado en Curso' ELSE '' END + 
			CASE WHEN fp1.posgradoGraduado like 'true' THEN '/Posgrado Graduado' ELSE '' END 
		FROM [FLUIG_DESA].[dbo].[ML001011] fp1 WHERE fp1.id = fp.id ),1,1,'') AS nivelEstudio,
		fp.carrera,
		fp.origenMatricula,
		fp.descExperienciaLaboralReq,
		fp.habilidadesNecesarias,
		fp.experienciaPreviaComoAPM,
		fp.experienciaPreviaEnVentas,
		fp.experienciaPreviaComoAPF,
		fp.visitadoEspecialidadesMedicos,
		fp.visitadoInstituciones,
		fp.conocimientoLineasProductos,
		fp.provengaDeLaboratorios,
		fp.conozcaLasAuditorias,
		fp.otros,
		fp.nivel,
		fp.otras,
		fp.aspectosCriticosPuesto,
		fp.sede,
		fp.ubicacionFisica,
		fp.horarioDesde,
		fp.horarioHasta,
		fp.horasExtras,
		fp.viajes,
		fp.remuneracionBruta,
		fp.convenio,
		fp.categoriaConvenio,
		fp.obraSocial,
		fp.planRemu,
		fp.comentariosBeneficios,
		fp.adicionalEstudioPreocupacional,
		fp.tipoEstudioPsicotecnico,
		fp.personasConDiscapacidad,
		fp.derivacionJobPosting,
		fp.jefe,
		fp.gerenteN2,
		fp.gerenteN1,
		fp.gerenteGeneral,
		fp.observacionesGralesProceso,
		STUFF(( 
			SELECT  ', '+CAST(filho.quienesEntrevistan as varchar)
			FROM    dbo.V_RAF05_QUIENES_ENTREVISTAN filho
			WHERE   filho.documentid = fp.documentid AND filho.version = fp.version
			FOR XML PATH('')
		),1,1,'') AS quienesEntrevistan,
		STUFF(( 
			SELECT  ', '+CAST(filho.detalleAccion as varchar(max))
			FROM     dbo.V_RAF05_TAREAS_ORDEN_PRIORIDAD filho
			WHERE   filho.documentid = fp.documentid AND filho.version = fp.version
			FOR XML PATH('')
		),1,1,'') AS detalleAccion,
		STUFF(( 
			SELECT  ', '+CAST(filho.idiomas as varchar)+': (Lectura='+CAST(filho.nivelLectura as varchar)+', Escrito='+CAST(filho.nivelEscrito as varchar)+', Oral='+CAST(filho.nivelOral as varchar)
			FROM    dbo. V_RAF05_IDIOMAS filho
			WHERE   filho.documentid = fp.documentid AND filho.version = fp.version
			FOR XML PATH('')
		),1,1,'') AS idiomas,
		STUFF(( 
			SELECT  ', '+CAST(filho.programasInformatica as varchar)+': '+CAST(filho.programasInformaticaNivel as varchar)
			FROM     dbo.V_RAF05_PROGRAMAS_INFORMATICA filho
			WHERE   filho.documentid = fp.documentid AND filho.version = fp.version
			FOR XML PATH('')
		),1,1,'') AS programasInformatica,
		STUFF(( 
			SELECT  ', '+CAST(filho.competencia as varchar)+': '+CAST(filho.nivelCompetencia as varchar)+' ('+CAST(filho.descripcionAmpliada as varchar)+')'
			FROM     dbo.V_RAF05_DETALLE_COMPETENCIAS filho
			WHERE   filho.documentid = fp.documentid AND filho.version = fp.version
			FOR XML PATH('')
		),1,1,'') AS competencias,
		STUFF(( 
			SELECT  ', '+CAST(filho.beneficios as varchar)+': '+ 		
			CASE WHEN CAST(filho.beneficiosChck as varchar) like 'true' THEN 'SI' ELSE 'NO' END
			FROM     dbo.V_RAF05_BENEFICIOS filho
			WHERE   filho.documentid = fp.documentid AND filho.version = fp.version
			FOR XML PATH('')
		),1,1,'') AS beneficios
	 FROM [FLUIG_DESA].[dbo].[ML001011] fp, 
		  [FLUIG_DESA].[dbo].DOCUMENTO d
		 WHERE fp.documentid = d.NR_DOCUMENTO
			 AND fp.version = d.NR_VERSAO
			 AND d.VERSAO_ATIVA = 1
GO

-- Es el formulario RAF06- Formulario Principal
-- Cambiar el nombre de la base por la que corresponda!!
-- En RAFFO - Desarrollo: -> AS_FLUIG_1.5.11
-- Cambiar ML001150 por la tabla que corresponda !!
-- En RAFFO - Desarrollo: -> ML001150 
ALTER VIEW [dbo].[V_RAF06_ALTA_EMPLEADO] AS 
	SELECT 
		fp.vacanteACubrirColaborador,
		fp.modificacionesPerfilOriginal,
		fp.fechaAlta,
		CONVERT(VARCHAR(10), CONVERT(datetime, CAST(fp.fechaAlta AS VARCHAR), 103), 120) AS fechaAltaFiltro,
		fp.fechaIngreso,
		(fp.nombre + ' ' + fp.apellido) AS nombreApellido,
		CASE WHEN fp.tipoDocumentoIdentidad like 'dni' THEN 'DNI' 
			ELSE (CASE WHEN fp.tipoDocumentoIdentidad like 'le' THEN 'LE' ELSE 'Pasaporte' END) 
		END AS tipoDocumentoIdentidad,
		fp.dni,
		fp.cuil,
		fp.fechaNacimiento,
		CASE WHEN fp.generoAlta like 'femenino' THEN 'Femenino' ELSE 'Masculino' END AS generoAlta,
		fp.estadoCivil,
		fp.nacionalidad,
		CASE WHEN fp.empresa like 'raffo' THEN 'Raffo' ELSE 'Monteverde' END AS empresa,
		fp.lugarPago,
		fp.domicilio,
		fp.telefonoContacto,
		fp.mailContacto,
		fp.modalidadContratacion,
		fp.detalleModalidadContratacion,
		fp.regimenHorario,
		fp.horario,
		fp.transporte,
		fp.nombreUsuario,
		fp.mailCorporativo,
		fp.legajo,		
		fp.nroSolicitud,
		fp.matriculaSolicitante,
		fp.jefeMatricula,
		fp.gerenteN1Matricula,
		fp.gerenteN2Matricula,
		fp.fechaInicioSolicitud,
		fp.fechaFinSolicitud,
		fp.tarea,	
		UPPER(CAST(fp.busquedaConfidencial AS varchar)) AS busquedaConfidencial,
		CASE WHEN fp.ingresoPersonal like 'PE' THEN 'Puesto Estándar' 
			ELSE (CASE WHEN fp.ingresoPersonal like 'APM' THEN 'Fuerza de Venta (APM)' 
			ELSE 'Fuerza de Venta (APF)' END) 
		END AS ingresoPersonal,
		fp.fechaRelevamientoPerfil,
		fp.fechaIngresoNecesaria,
		fp.codigoBusqueda,
		fp.nombreBusqueda,
		fp.puesto,
		CASE WHEN fp.puestoNuevo like 'true' THEN 'SI' ELSE 'NO' END AS puestoNuevo,
		fp.nombrePuestoNuevo,
		fp.categoria,
		STUFF((SELECT
			CASE WHEN fp1.junior like 'true' THEN '/Junior' ELSE '' END +
			CASE WHEN fp1.semiSenior like 'true' THEN '/SemiSR' ELSE '' END + 
			CASE WHEN fp1.senior like 'true' THEN '/Senior' ELSE '' END + 
			CASE WHEN fp1.noCorresponde like 'true' THEN '/NC' ELSE '' END 
		FROM [FLUIG_DESA].[dbo].[ML001028] fp1 WHERE fp1.id = fp.id ),1,1,'')AS seniority,
		fp.gerencia,
		fp.area,
		fp.sector,
		fp.subsector,
		fp.aperturaPorSector,
		fp.lineaEspecialidad,
		fp.zona,
		fp.centroCosto,
		fp.reportaa,
		fp.categoriaReportaa,
		fp.puestoReportaa,
		fp.sugiereAlguien,
		fp.equipamientoRequerido,
		fp.accesos,
		fp.accesoAWebmail,
		STUFF((SELECT
			CASE WHEN fp1.salidaLLamadasLocales like 'true' THEN '/Llamadas Locales' ELSE '' END +
			CASE WHEN fp1.salidaDDNNacional like 'true' THEN '/DDN' ELSE '' END + 
			CASE WHEN fp1.salidaDDNInteracional like 'true' THEN '/DDI' ELSE '' END + 
			CASE WHEN fp1.salidaCelular like 'true' THEN '/Celular' ELSE '' END 
		FROM [FLUIG_DESA].[dbo].[ML001028] fp1 WHERE fp1.id = fp.id ),1,1,'')AS accesosTelefonia,
		CASE WHEN fp.tipoPosicion like 'puestoNuevo' THEN 'Puesto Nuevo' ELSE 'Reemplazo' END AS tipoPosicion,
		fp.nombreReemplazo,
		CASE WHEN fp.motivoReemplazo like 'renuncia' THEN 'Renuncia' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'desvinculacion' THEN 'Desvinculación' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'jubilacion' THEN 'Jubilación' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'licenciaEnfermedad' THEN 'Licencia por Enfermedad' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'licenciaMaternidad' THEN 'Licencia por Maternidad' ELSE 'Otros' END) END) END) END)
		END AS motivoReemplazo,
		fp.observaciones,
		CASE WHEN fp.efectivoTemporario like 'efectivo' THEN 'Efectivo' ELSE 'Temporario' END AS efectivoTemporario,
		fp.cantidadMeses,
		fp.motivoPuestoNuevo,
		CASE WHEN fp.pea like 'dentro' THEN 'Dentro' ELSE 'Fuera' END AS pea,
		CAST(fp.personalACargo AS varchar) AS personalACargo,
		fp.clientesInternos,
		fp.proveedoresInternos,
		fp.contactoConClientes,
		fp.detalleMaquinas,
		UPPER(CAST(fp.manejoInfoConfidencial AS varchar)) AS manejoInfoConfidencial,
		CASE WHEN fp.esfuerzoFisico like 'bajo' THEN 'Bajo' 
			ELSE (CASE WHEN fp.esfuerzoFisico like 'moderado' THEN 'Moderado' ELSE 'Intenso' END) 
		END AS esfuerzoFisico,
		UPPER(CAST(fp.exposicionMaterialesQuimicos AS varchar)) AS exposicionMaterialesQuimicos,
		fp.proyeccionPosicion,
		fp.ciudadZonasVisitar,
		fp.giras,
		CAST(fp.productosManejar AS varchar) AS productosManejar,
		fp.visitaMedicos,
		UPPER(CAST(fp.visitaInstituciones AS varchar)) AS visitaInstituciones,
		UPPER(CAST(fp.administraMuestrasMedicas AS varchar)) AS administraMuestrasMedicas,
		UPPER(CAST(fp.visitaFarmacias AS varchar)) AS visitaFarmacias,
		fp.coordinacionAccionesFidelizar,
		fp.analisisInformacionAuditoria,
		fp.tareasAdministrativasVarias,
		fp.franjaEdad,
		CASE WHEN fp.genero like 'femenino' THEN 'Femenino' ELSE (CASE WHEN fp.genero like 'masculino' THEN 'Masculino' ELSE 'Indistinto' END) END AS genero,
		STUFF((SELECT
			CASE WHEN fp1.secundarioCompleto like 'true' THEN '/Secundario Completo' ELSE '' END +
			CASE WHEN fp1.teciarioCurso like 'true' THEN '/Teciario en Curso' ELSE '' END + 
			CASE WHEN fp1.terciarioGraduado like 'true' THEN '/Terciario Graduado' ELSE '' END + 
			CASE WHEN fp1.universitarioCurso like 'true' THEN '/Universitario en Curso' ELSE '' END + 
			CASE WHEN fp1.universitarioGraduado like 'true' THEN '/Universitario Graduado' ELSE '' END + 
			CASE WHEN fp1.posgradoCurso like 'true' THEN '/Posgrado en Curso' ELSE '' END + 
			CASE WHEN fp1.posgradoGraduado like 'true' THEN '/Posgrado Graduado' ELSE '' END 
		FROM [FLUIG_DESA].[dbo].[ML001028] fp1 WHERE fp1.id = fp.id ),1,1,'') AS nivelEstudio,
		fp.carrera,
		fp.origenMatricula,
		fp.descExperienciaLaboralReq,
		fp.habilidadesNecesarias,
		fp.experienciaPreviaComoAPM,
		fp.experienciaPreviaEnVentas,
		fp.experienciaPreviaComoAPF,
		fp.visitadoEspecialidadesMedicos,
		fp.visitadoInstituciones,
		fp.conocimientoLineasProductos,
		fp.provengaDeLaboratorios,
		fp.conozcaLasAuditorias,
		fp.otros,
		fp.nivel,
		fp.otras,
		fp.aspectosCriticosPuesto,
		fp.sede,
		fp.ubicacionFisica,
		fp.horarioDesde,
		fp.horarioHasta,
		fp.horasExtras,
		fp.viajes,
		CASE WHEN fp.comedor like 'true' THEN 'SI' ELSE 'NO' END AS comedor,
		CASE WHEN fp.tarjetaAcceso like 'true' THEN 'SI' ELSE 'NO' END AS tarjetaAcceso,
		CASE WHEN fp.tarjetaCafeteria like 'true' THEN 'SI' ELSE 'NO' END AS tarjetaCafeteria,
		CASE WHEN fp.induccion like 'true' THEN 'SI' ELSE 'NO' END AS induccion,
		fp.entregaDocumentacion,
		fp.remuneracionBruta,
		fp.convenio,
		fp.categoriaConvenio,
		fp.obraSocial,
		fp.planRemu,
		fp.comentariosBeneficios,
		fp.adicionalEstudioPreocupacional,
		fp.tipoEstudioPsicotecnico,
		fp.personasConDiscapacidad,
		fp.derivacionJobPosting,
		fp.jefe,
		fp.gerenteN2,
		fp.gerenteN1,
		fp.gerenteGeneral,
		fp.grupoDeUsuarios,
		fp.destinatarios,
		fp.responsableAltaUsuario,
		fp.responsableTarjetaAcceso,
		fp.responsableTarjetaCafeteria,
		fp.responsableTarjetasPersonales,
		STUFF(( 
			SELECT  ', '+CAST(filho.quienesEntrevistan as varchar)
			FROM    dbo.V_RAF06_QUIENES_ENTREVISTAN filho
			WHERE   filho.documentid = fp.documentid AND filho.version = fp.version
			FOR XML PATH('')
		),1,1,'') AS quienesEntrevistan,
		STUFF(( 
			SELECT  ', '+CAST(filho.detalleAccion as varchar(max))
			FROM     dbo.V_RAF06_TAREAS_ORDEN_PRIORIDAD filho
			WHERE   filho.documentid = fp.documentid AND filho.version = fp.version
			FOR XML PATH('')
		),1,1,'') AS detalleAccion,
		STUFF(( 
			SELECT  ', '+CAST(filho.idiomas as varchar)+': (Lectura='+CAST(filho.nivelLectura as varchar)+', Escrito='+CAST(filho.nivelEscrito as varchar)+', Oral='+CAST(filho.nivelOral as varchar)
			FROM    dbo. V_RAF06_IDIOMAS filho
			WHERE   filho.documentid = fp.documentid AND filho.version = fp.version
			FOR XML PATH('')
		),1,1,'') AS idiomas,
		STUFF(( 
			SELECT  ', '+CAST(filho.programasInformatica as varchar)+': '+CAST(filho.programasInformaticaNivel as varchar)
			FROM     dbo.V_RAF06_PROGRAMAS_INFORMATICA filho
			WHERE   filho.documentid = fp.documentid AND filho.version = fp.version
			FOR XML PATH('')
		),1,1,'') AS programasInformatica,
		STUFF(( 
			SELECT  ', '+CAST(filho.competencia as varchar)+': '+CAST(filho.nivelCompetencia as varchar)+' ('+CAST(filho.descripcionAmpliada as varchar)+')'
			FROM     dbo.V_RAF06_DETALLE_COMPETENCIAS filho
			WHERE   filho.documentid = fp.documentid AND filho.version = fp.version
			FOR XML PATH('')
		),1,1,'') AS competencias,
		STUFF(( 
			SELECT  ', '+CAST(filho.beneficios as varchar)+': '+ 		
			CASE WHEN CAST(filho.beneficiosChck as varchar) like 'true' THEN 'SI' ELSE 'NO' END
			FROM     dbo.V_RAF06_BENEFICIOS filho
			WHERE   filho.documentid = fp.documentid AND filho.version = fp.version
			FOR XML PATH('')
		),1,1,'') AS beneficios,
		STUFF((  
			SELECT  ', '+CAST(filho.tipoDoc as varchar)+': '+CAST(filho.documento as varchar)
			FROM    dbo.V_RAF06_DOCUMENTOS filho
			WHERE   filho.documentid = fp.documentid AND filho.version = fp.version
			FOR XML PATH('')
		),1,1,'') AS documentos
	 FROM [FLUIG_DESA].[dbo].[ML001028] fp, 
		  [FLUIG_DESA].[dbo].DOCUMENTO d
		 WHERE fp.documentid = d.NR_DOCUMENTO
			 AND fp.version = d.NR_VERSAO
			 AND d.VERSAO_ATIVA = 1
GO
