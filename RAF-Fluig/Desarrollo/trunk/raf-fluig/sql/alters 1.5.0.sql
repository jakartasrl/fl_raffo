---DESARROLLO

CREATE VIEW [dbo].[V_RAF05_SOLICITUD_PUESTO] AS 
SELECT    fp.nroSolicitud, fp.matriculaSolicitante, fp.jefeMatricula, fp.gerenteN1Matricula, fp.gerenteN2Matricula, fp.fechaInicioSolicitud, fp.fechaFinSolicitud, fp.tarea, UPPER(CAST(fp.busquedaConfidencial AS varchar)) AS busquedaConfidencial, 
                 CASE WHEN fp.ingresoPersonal LIKE 'PE' THEN 'Puesto Estándar' ELSE (CASE WHEN fp.ingresoPersonal LIKE 'APM' THEN 'Fuerza de Venta (APM)' ELSE 'Fuerza de Venta (APF)' END) END AS ingresoPersonal, fp.fechaRelevamientoPerfil, 
                 TRY_CONVERT(VARCHAR(10), TRY_CONVERT(datetime, CAST(fp.fechaRelevamientoPerfil AS VARCHAR), 103), 120) AS fechaRelevamientoPerfilFiltro, fp.fechaIngresoNecesaria, fp.codigoBusqueda, fp.nombreBusqueda, fp.puesto, 
                 CASE WHEN fp.puestoNuevo LIKE 'true' THEN 'SI' ELSE 'NO' END AS puestoNuevo, fp.nombrePuestoNuevo, fp.categoria, STUFF
                     ((SELECT    CASE WHEN fp1.junior LIKE 'true' THEN '/Junior' ELSE '' END + CASE WHEN fp1.semiSenior LIKE 'true' THEN '/SemiSR' ELSE '' END + CASE WHEN fp1.senior LIKE 'true' THEN '/Senior' ELSE '' END + CASE WHEN fp1.noCorresponde LIKE
                                         'true' THEN '/NC' ELSE '' END
                       FROM       [TOTVS_FLUIG_DESA].[dbo].[ML001007] fp1
                       WHERE    fp1.id = fp.id), 1, 1, '') AS seniority, fp.gerencia, fp.area, fp.sector, fp.subsector, fp.aperturaPorSector, fp.lineaEspecialidad, fp.zona, fp.centroCosto, fp.reportaa, fp.categoriaReportaa, fp.puestoReportaa, fp.sugiereAlguien, 
                 fp.equipamientoRequerido, fp.usuarioQAD, fp.accesos, fp.accesoAWebmail, STUFF
                     ((SELECT    CASE WHEN fp1.salidaLLamadasLocales LIKE 'true' THEN '/Llamadas Locales' ELSE '' END + CASE WHEN fp1.salidaDDNNacional LIKE 'true' THEN '/DDN' ELSE '' END + CASE WHEN fp1.salidaDDNInteracional LIKE 'true' THEN '/DDI' ELSE
                                         '' END + CASE WHEN fp1.salidaCelular LIKE 'true' THEN '/Celular' ELSE '' END
                       FROM       [TOTVS_FLUIG_DESA].[dbo].[ML001007] fp1
                       WHERE    fp1.id = fp.id), 1, 1, '') AS accesosTelefonia, CASE WHEN fp.tipoPosicion LIKE 'puestoNuevo' THEN 'Puesto Nuevo' ELSE 'Reemplazo' END AS tipoPosicion, fp.nombreReemplazo, 
		CASE WHEN fp.motivoReemplazo like 'renuncia' THEN 'Renuncia' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'desvinculacion' THEN 'Desvinculación' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'jubilacion' THEN 'Jubilación' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'licenciaEnfermedad' THEN 'Licencia por Enfermedad' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'licenciaMaternidad' THEN 'Licencia por Maternidad' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'licencia' THEN 'Licencia' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'movimientoInterno' THEN 'Movimiento Interno' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'relocalizacion' THEN 'Relocalización' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'promocion' THEN 'Promoción' ELSE 'Otros' END) END) END) END)END) END) END) END)
		END AS motivoReemplazo,
				  fp.observaciones, 
                 CASE WHEN fp.efectivoTemporario LIKE 'efectivo' THEN 'Efectivo' ELSE 'Temporario' END AS efectivoTemporario, fp.cantidadMeses, fp.motivoPuestoNuevo, CASE WHEN fp.pea LIKE 'dentro' THEN 'Dentro' ELSE 'Fuera' END AS pea, 
                 CAST(fp.personalACargo AS varchar) AS personalACargo, fp.clientesInternos, fp.proveedoresInternos, fp.contactoConClientes, fp.detalleMaquinas, UPPER(CAST(fp.manejoInfoConfidencial AS varchar)) AS manejoInfoConfidencial, 
                 CASE WHEN fp.esfuerzoFisico LIKE 'bajo' THEN 'Bajo' ELSE (CASE WHEN fp.esfuerzoFisico LIKE 'moderado' THEN 'Moderado' ELSE 'Intenso' END) END AS esfuerzoFisico, UPPER(CAST(fp.exposicionMaterialesQuimicos AS varchar)) 
                 AS exposicionMaterialesQuimicos, fp.proyeccionPosicion, fp.ciudadZonasVisitar, fp.giras, CAST(fp.productosManejar AS varchar) AS productosManejar, fp.visitaMedicos, UPPER(CAST(fp.visitaInstituciones AS varchar)) AS visitaInstituciones, 
                 UPPER(CAST(fp.administraMuestrasMedicas AS varchar)) AS administraMuestrasMedicas, UPPER(CAST(fp.visitaFarmacias AS varchar)) AS visitaFarmacias, fp.coordinacionAccionesFidelizar, fp.analisisInformacionAuditoria, 
                 fp.tareasAdministrativasVarias, fp.franjaEdad, CASE WHEN fp.genero LIKE 'femenino' THEN 'Femenino' ELSE (CASE WHEN fp.genero LIKE 'masculino' THEN 'Masculino' ELSE 'Indistinto' END) END AS genero, STUFF
                     ((SELECT    CASE WHEN fp1.secundarioCompleto LIKE 'true' THEN '/Secundario Completo' ELSE '' END + CASE WHEN fp1.teciarioCurso LIKE 'true' THEN '/Teciario en Curso' ELSE '' END + CASE WHEN fp1.terciarioGraduado LIKE 'true' THEN '/Terciario Graduado'
                                         ELSE '' END + CASE WHEN fp1.universitarioCurso LIKE 'true' THEN '/Universitario en Curso' ELSE '' END + CASE WHEN fp1.universitarioGraduado LIKE 'true' THEN '/Universitario Graduado' ELSE '' END + CASE WHEN fp1.posgradoCurso
                                         LIKE 'true' THEN '/Posgrado en Curso' ELSE '' END + CASE WHEN fp1.posgradoGraduado LIKE 'true' THEN '/Posgrado Graduado' ELSE '' END
                       FROM       [TOTVS_FLUIG_DESA].[dbo].[ML001007] fp1
                       WHERE    fp1.id = fp.id), 1, 1, '') AS nivelEstudio, fp.carrera, fp.origenMatricula, fp.descExperienciaLaboralReq, fp.habilidadesNecesarias, fp.experienciaPreviaComoAPM, fp.experienciaPreviaEnVentas, fp.experienciaPreviaComoAPF, 
                 fp.visitadoEspecialidadesMedicos, fp.visitadoInstituciones, fp.conocimientoLineasProductos, fp.provengaDeLaboratorios, fp.conozcaLasAuditorias, fp.otros, fp.nivel, fp.otras, fp.aspectosCriticosPuesto, fp.sede, fp.ubicacionFisica, fp.horarioDesde, 
                 fp.horarioHasta, fp.horasExtras, fp.viajes, fp.remuneracionBruta, fp.convenio, fp.categoriaConvenio, fp.obraSocial, fp.planRemu, fp.comentariosBeneficios, fp.adicionalEstudioPreocupacional, fp.tipoEstudioPsicotecnico, fp.personasConDiscapacidad, 
                 fp.derivacionJobPosting, fp.jefe, fp.gerenteN2, fp.gerenteN1, fp.gerenteGeneral, fp.observacionesGralesProceso, STUFF
                     ((SELECT    ', ' + CAST(filho.quienesEntrevistan AS varchar)
                       FROM       dbo.V_RAF05_QUIENES_ENTREVISTAN filho
                       WHERE    filho.documentid = fp.documentid AND filho.version = fp.version FOR XML PATH('')), 1, 1, '') AS quienesEntrevistan, STUFF
                     ((SELECT    ', ' + CAST(filho.detalleAccion AS varchar(max))
                       FROM       dbo.V_RAF05_TAREAS_ORDEN_PRIORIDAD filho
                       WHERE    filho.documentid = fp.documentid AND filho.version = fp.version FOR XML PATH('')), 1, 1, '') AS detalleAccion, STUFF
                     ((SELECT    ', ' + CAST(filho.idiomas AS varchar) + ': (Lectura=' + CAST(filho.nivelLectura AS varchar) + ', Escrito=' + CAST(filho.nivelEscrito AS varchar) + ', Oral=' + CAST(filho.nivelOral AS varchar)
                       FROM       dbo.V_RAF05_IDIOMAS filho
                       WHERE    filho.documentid = fp.documentid AND filho.version = fp.version FOR XML PATH('')), 1, 1, '') AS idiomas, STUFF
                     ((SELECT    ', ' + CAST(filho.programasInformatica AS varchar) + ': ' + CAST(filho.programasInformaticaNivel AS varchar)
                       FROM       dbo.V_RAF05_PROGRAMAS_INFORMATICA filho
                       WHERE    filho.documentid = fp.documentid AND filho.version = fp.version FOR XML PATH('')), 1, 1, '') AS programasInformatica, STUFF
                     ((SELECT    ', ' + CAST(filho.competencia AS varchar) + ': ' + CAST(filho.nivelCompetencia AS varchar) + ' (' + CAST(filho.descripcionAmpliada AS varchar) + ')'
                       FROM       dbo.V_RAF05_DETALLE_COMPETENCIAS filho
                       WHERE    filho.documentid = fp.documentid AND filho.version = fp.version FOR XML PATH('')), 1, 1, '') AS competencias, STUFF
                     ((SELECT    ', ' + CAST(filho.beneficios AS varchar) + ': ' + CASE WHEN CAST(filho.beneficiosChck AS varchar) LIKE 'true' THEN 'SI' ELSE 'NO' END
                       FROM       dbo.V_RAF05_BENEFICIOS filho
                       WHERE    filho.documentid = fp.documentid AND filho.version = fp.version FOR XML PATH('')), 1, 1, '') AS beneficios
FROM       [TOTVS_FLUIG_DESA].[dbo].[ML001007] fp, [TOTVS_FLUIG_DESA].[dbo].DOCUMENTO d
WHERE    fp.documentid = d .NR_DOCUMENTO AND fp.version = d .NR_VERSAO AND d .VERSAO_ATIVA = 1;



CREATE VIEW [dbo].[V_RAF06_ALTA_EMPLEADO] AS 
SELECT    fp.vacanteACubrirColaborador, fp.modificacionesPerfilOriginal, fp.fechaAlta, TRY_CONVERT(VARCHAR(10), TRY_CONVERT(datetime, CAST(fp.fechaAlta AS VARCHAR), 103), 120) AS fechaAltaFiltro, fp.fechaIngreso, (fp.nombre + ' ' + fp.apellido) 
                 AS nombreApellido, CASE WHEN fp.tipoDocumentoIdentidad LIKE 'dni' THEN 'DNI' ELSE (CASE WHEN fp.tipoDocumentoIdentidad LIKE 'le' THEN 'LE' ELSE 'Pasaporte' END) END AS tipoDocumentoIdentidad, fp.dni, fp.cuil, fp.fechaNacimiento, 
                 CASE WHEN fp.generoAlta LIKE 'femenino' THEN 'Femenino' ELSE 'Masculino' END AS generoAlta, fp.estadoCivil, fp.nacionalidad, CASE WHEN fp.empresa LIKE 'raffo' THEN 'Raffo' ELSE 'Monteverde' END AS empresa, fp.lugarPago, fp.domicilio, 
                 fp.telefonoContacto, fp.mailContacto, fp.modalidadContratacion, fp.detalleModalidadContratacion, fp.regimenHorario, fp.horario, fp.transporte, fp.nombreUsuario, fp.mailCorporativo, fp.legajo, fp.nroSolicitud, fp.matriculaSolicitante, fp.jefeMatricula, 
                 fp.gerenteN1Matricula, fp.gerenteN2Matricula, fp.fechaInicioSolicitud, fp.fechaFinSolicitud, fp.tarea, UPPER(CAST(fp.busquedaConfidencial AS varchar)) AS busquedaConfidencial, 
                 CASE WHEN fp.ingresoPersonal LIKE 'PE' THEN 'Puesto Estándar' ELSE (CASE WHEN fp.ingresoPersonal LIKE 'APM' THEN 'Fuerza de Venta (APM)' ELSE 'Fuerza de Venta (APF)' END) END AS ingresoPersonal, fp.fechaRelevamientoPerfil, 
                 fp.fechaIngresoNecesaria, fp.codigoBusqueda, fp.nombreBusqueda, fp.puesto, CASE WHEN fp.puestoNuevo LIKE 'true' THEN 'SI' ELSE 'NO' END AS puestoNuevo, fp.nombrePuestoNuevo, fp.categoria, STUFF
                     ((SELECT    CASE WHEN fp1.junior LIKE 'true' THEN '/Junior' ELSE '' END + CASE WHEN fp1.semiSenior LIKE 'true' THEN '/SemiSR' ELSE '' END + CASE WHEN fp1.senior LIKE 'true' THEN '/Senior' ELSE '' END + CASE WHEN fp1.noCorresponde LIKE
                                         'true' THEN '/NC' ELSE '' END
                       FROM       [TOTVS_FLUIG_DESA].[dbo].[ML001018] fp1
                       WHERE    fp1.id = fp.id), 1, 1, '') AS seniority, fp.gerencia, fp.area, fp.sector, fp.subsector, fp.aperturaPorSector, fp.lineaEspecialidad, fp.zona, fp.centroCosto, fp.reportaa, fp.categoriaReportaa, fp.puestoReportaa, fp.sugiereAlguien, 
                 fp.equipamientoRequerido, fp.usuarioQAD, fp.accesos, fp.accesoAWebmail, STUFF
                     ((SELECT    CASE WHEN fp1.salidaLLamadasLocales LIKE 'true' THEN '/Llamadas Locales' ELSE '' END + CASE WHEN fp1.salidaDDNNacional LIKE 'true' THEN '/DDN' ELSE '' END + CASE WHEN fp1.salidaDDNInteracional LIKE 'true' THEN '/DDI' ELSE
                                         '' END + CASE WHEN fp1.salidaCelular LIKE 'true' THEN '/Celular' ELSE '' END
                       FROM       [TOTVS_FLUIG_DESA].[dbo].[ML001018] fp1
                       WHERE    fp1.id = fp.id), 1, 1, '') AS accesosTelefonia, CASE WHEN fp.tipoPosicion LIKE 'puestoNuevo' THEN 'Puesto Nuevo' ELSE 'Reemplazo' END AS tipoPosicion, fp.nombreReemplazo, 
		CASE WHEN fp.motivoReemplazo like 'renuncia' THEN 'Renuncia' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'desvinculacion' THEN 'Desvinculación' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'jubilacion' THEN 'Jubilación' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'licenciaEnfermedad' THEN 'Licencia por Enfermedad' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'licenciaMaternidad' THEN 'Licencia por Maternidad' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'licencia' THEN 'Licencia' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'movimientoInterno' THEN 'Movimiento Interno' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'relocalizacion' THEN 'Relocalización' 
			ELSE (CASE WHEN fp.motivoReemplazo like 'promocion' THEN 'Promoción' ELSE 'Otros' END) END) END) END)END) END) END) END)
                 END AS motivoReemplazo, 
                 fp.observaciones, 
                 CASE WHEN fp.efectivoTemporario LIKE 'efectivo' THEN 'Efectivo' ELSE 'Temporario' END AS efectivoTemporario, fp.cantidadMeses, fp.motivoPuestoNuevo, CASE WHEN fp.pea LIKE 'dentro' THEN 'Dentro' ELSE 'Fuera' END AS pea, 
                 CAST(fp.personalACargo AS varchar) AS personalACargo, fp.clientesInternos, fp.proveedoresInternos, fp.contactoConClientes, fp.detalleMaquinas, UPPER(CAST(fp.manejoInfoConfidencial AS varchar)) AS manejoInfoConfidencial, 
                 CASE WHEN fp.esfuerzoFisico LIKE 'bajo' THEN 'Bajo' ELSE (CASE WHEN fp.esfuerzoFisico LIKE 'moderado' THEN 'Moderado' ELSE 'Intenso' END) END AS esfuerzoFisico, UPPER(CAST(fp.exposicionMaterialesQuimicos AS varchar)) 
                 AS exposicionMaterialesQuimicos, fp.proyeccionPosicion, fp.ciudadZonasVisitar, fp.giras, CAST(fp.productosManejar AS varchar) AS productosManejar, fp.visitaMedicos, UPPER(CAST(fp.visitaInstituciones AS varchar)) AS visitaInstituciones, 
                 UPPER(CAST(fp.administraMuestrasMedicas AS varchar)) AS administraMuestrasMedicas, UPPER(CAST(fp.visitaFarmacias AS varchar)) AS visitaFarmacias, fp.coordinacionAccionesFidelizar, fp.analisisInformacionAuditoria, 
                 fp.tareasAdministrativasVarias, fp.franjaEdad, CASE WHEN fp.genero LIKE 'femenino' THEN 'Femenino' ELSE (CASE WHEN fp.genero LIKE 'masculino' THEN 'Masculino' ELSE 'Indistinto' END) END AS genero, STUFF
                     ((SELECT    CASE WHEN fp1.secundarioCompleto LIKE 'true' THEN '/Secundario Completo' ELSE '' END + CASE WHEN fp1.teciarioCurso LIKE 'true' THEN '/Teciario en Curso' ELSE '' END + CASE WHEN fp1.terciarioGraduado LIKE 'true' THEN '/Terciario Graduado'
                                         ELSE '' END + CASE WHEN fp1.universitarioCurso LIKE 'true' THEN '/Universitario en Curso' ELSE '' END + CASE WHEN fp1.universitarioGraduado LIKE 'true' THEN '/Universitario Graduado' ELSE '' END + CASE WHEN fp1.posgradoCurso
                                         LIKE 'true' THEN '/Posgrado en Curso' ELSE '' END + CASE WHEN fp1.posgradoGraduado LIKE 'true' THEN '/Posgrado Graduado' ELSE '' END
                       FROM       [TOTVS_FLUIG_DESA].[dbo].[ML001018] fp1
                       WHERE    fp1.id = fp.id), 1, 1, '') AS nivelEstudio, fp.carrera, fp.origenMatricula, fp.descExperienciaLaboralReq, fp.habilidadesNecesarias, fp.experienciaPreviaComoAPM, fp.experienciaPreviaEnVentas, fp.experienciaPreviaComoAPF, 
                 fp.visitadoEspecialidadesMedicos, fp.visitadoInstituciones, fp.conocimientoLineasProductos, fp.provengaDeLaboratorios, fp.conozcaLasAuditorias, fp.otros, fp.nivel, fp.otras, fp.aspectosCriticosPuesto, fp.sede, fp.ubicacionFisica, fp.horarioDesde, 
                 fp.horarioHasta, fp.horasExtras, fp.viajes, CASE WHEN fp.comedor LIKE 'true' THEN 'SI' ELSE 'NO' END AS comedor, CASE WHEN fp.tarjetaAcceso LIKE 'true' THEN 'SI' ELSE 'NO' END AS tarjetaAcceso, 
                 CASE WHEN fp.tarjetaCafeteria LIKE 'true' THEN 'SI' ELSE 'NO' END AS tarjetaCafeteria, CASE WHEN fp.induccion LIKE 'true' THEN 'SI' ELSE 'NO' END AS induccion, fp.entregaDocumentacion, fp.remuneracionBruta, fp.convenio, fp.categoriaConvenio, 
                 fp.obraSocial, fp.planRemu, fp.comentariosBeneficios, fp.adicionalEstudioPreocupacional, fp.tipoEstudioPsicotecnico, fp.personasConDiscapacidad, fp.derivacionJobPosting, fp.jefe, fp.gerenteN2, fp.gerenteN1, fp.gerenteGeneral, fp.grupoDeUsuarios, 
                 fp.destinatarios, fp.responsableAltaUsuario, fp.responsableTarjetaAcceso, fp.responsableTarjetaCafeteria, fp.responsableTarjetasPersonales, STUFF
                     ((SELECT    ', ' + CAST(filho.quienesEntrevistan AS varchar)
                       FROM       dbo.V_RAF06_QUIENES_ENTREVISTAN filho
                       WHERE    filho.documentid = fp.documentid AND filho.version = fp.version FOR XML PATH('')), 1, 1, '') AS quienesEntrevistan, STUFF
                     ((SELECT    ', ' + CAST(filho.detalleAccion AS varchar(max))
                       FROM       dbo.V_RAF06_TAREAS_ORDEN_PRIORIDAD filho
                       WHERE    filho.documentid = fp.documentid AND filho.version = fp.version FOR XML PATH('')), 1, 1, '') AS detalleAccion, STUFF
                     ((SELECT    ', ' + CAST(filho.idiomas AS varchar) + ': (Lectura=' + CAST(filho.nivelLectura AS varchar) + ', Escrito=' + CAST(filho.nivelEscrito AS varchar) + ', Oral=' + CAST(filho.nivelOral AS varchar)
                       FROM       dbo.V_RAF06_IDIOMAS filho
                       WHERE    filho.documentid = fp.documentid AND filho.version = fp.version FOR XML PATH('')), 1, 1, '') AS idiomas, STUFF
                     ((SELECT    ', ' + CAST(filho.programasInformatica AS varchar) + ': ' + CAST(filho.programasInformaticaNivel AS varchar)
                       FROM       dbo.V_RAF06_PROGRAMAS_INFORMATICA filho
                       WHERE    filho.documentid = fp.documentid AND filho.version = fp.version FOR XML PATH('')), 1, 1, '') AS programasInformatica, STUFF
                     ((SELECT    ', ' + CAST(filho.competencia AS varchar) + ': ' + CAST(filho.nivelCompetencia AS varchar) + ' (' + CAST(filho.descripcionAmpliada AS varchar) + ')'
                       FROM       dbo.V_RAF06_DETALLE_COMPETENCIAS filho
                       WHERE    filho.documentid = fp.documentid AND filho.version = fp.version FOR XML PATH('')), 1, 1, '') AS competencias, STUFF
                     ((SELECT    ', ' + CAST(filho.beneficios AS varchar) + ': ' + CASE WHEN CAST(filho.beneficiosChck AS varchar) LIKE 'true' THEN 'SI' ELSE 'NO' END
                       FROM       dbo.V_RAF06_BENEFICIOS filho
                       WHERE    filho.documentid = fp.documentid AND filho.version = fp.version FOR XML PATH('')), 1, 1, '') AS beneficios, STUFF
                     ((SELECT    ', ' + CAST(filho.tipoDoc AS varchar) + ': ' + CAST(filho.documento AS varchar)
                       FROM       dbo.V_RAF06_DOCUMENTOS filho
                       WHERE    filho.documentid = fp.documentid AND filho.version = fp.version FOR XML PATH('')), 1, 1, '') AS documentos
FROM       [TOTVS_FLUIG_DESA].[dbo].[ML001018] fp, [TOTVS_FLUIG_DESA].[dbo].DOCUMENTO d
WHERE    fp.documentid = d .NR_DOCUMENTO AND fp.version = d .NR_VERSAO AND d .VERSAO_ATIVA = 1