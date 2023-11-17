	function beforeTaskSave(colleagueId,nextSequenceId,userList){
		
		var nroProceso = getValue("WKNumProces");
		var completo = getValue('WKCompletTask');
		var tarea = getValue("WKNumState");
		var userId = getValue("WKUser");
		var comentarios = getValue("WKUserComment");
		var esGteDistrito = hAPI.getCardValue("esGteDistrito");
																										
		var ejb = new javax.naming.InitialContext().lookup("java:global/raf-inversioncomercial-backend/PetitorioCartaAcuerdoEJB");
		
		log.error('**** RAF10 BeforeTaskSave: userId: ' + userId + '; tarea: ' + tarea + '; completo? : ' + completo + '; nextSequenceId:' + nextSequenceId);
		
		var tareas = {
				'IniciarSolicitud': 0,
				'Inicial': 4,
				'AprobarCA' : 5,
				'CompletarCA' : 10,
				'RevisarCA' : 12,
				'Finalizada' : 17,
				'Rechazada' : 21
			};
		
		if (tarea == tareas.Inicial && completo == 'true') {
			var dateParser = new java.text.SimpleDateFormat("yyyy-MM-dd");
	
			log.error('**** RAF10 BeforeTaskSave Inicial  ');
			hAPI.setCardValue("fechaSolicitud", dateParser.format(new Date()));
		}
		
		if (tarea == tareas.Inicial  && nextSequenceId == tareas.AprobarCA && completo == 'true') {
			hAPI.setCardValue("tarea", "APROBAR SOLICITUD");
			savePetitorio(ejb, nroProceso, "PENDIENTE");
			
		}else if (tarea == tareas.Inicial && nextSequenceId == tareas.CompletarCA && completo == "true") {
			hAPI.setCardValue("tarea", "COMPLETAR SOLICITUD");
			savePetitorio(ejb, nroProceso, "PENDIENTE");
			
		}else if (tarea == tareas.CompletarCA && nextSequenceId == tareas.RevisarCA && completo == "true") {
			hAPI.setCardValue("tarea", "REVISAR SOLICITUD");
			savePetitorio(ejb, nroProceso, "PENDIENTE");
						
		}else if (tarea == tareas.RevisarCA && nextSequenceId == tareas.AprobarCA && completo == "true") {
			hAPI.setCardValue("tarea", "APROBAR SOLICITUD");
			savePetitorio(ejb, nroProceso, "PENDIENTE");
			
		}else if (tarea == tareas.AprobarCA && nextSequenceId == tareas.Finalizada && completo == "true") {
			
			var requestFolderId = createRequestFolder();
			uploadAttachmentsToGed(requestFolderId);
			
			hAPI.setCardValue("tarea", "SOLICITUD APROBADA");
			ejb.actualizarEstado(java.lang.Integer.parseInt(nroProceso), "SOLICITUD APROBADA", "APROBADA");
			sendMail("RAF10-Aprobada");
			
		}else if (tarea == tareas.AprobarCA && nextSequenceId == tareas.RevisarCA && completo == "true") {
			hAPI.setCardValue("tarea", "REVISAR SOLICITUD");
			ejb.actualizarEstado(java.lang.Integer.parseInt(nroProceso), "REVISAR SOLICITUD", "PENDIENTE");
			
		}else if (tarea == tareas.RevisarCA && nextSequenceId == tareas.CompletarCA && completo == "true") {
			
			//solo el gte distrito puede devolver al APM
			if(esGteDistrito == "true"){
				hAPI.setCardValue("tarea", "COMPLETAR SOLICITUD");
				savePetitorio(ejb, nroProceso, "PENDIENTE");
			}else{
				throw "Acción no permitida. Sólo el Gte. de Distrito puede enviar al APM.";
			}
			
			
		}
		
		if (nextSequenceId == tareas.CompletarCA && completo == "true") {
			
			if(esGteDistrito == "true"){
				
				var nombreAPM = hAPI.getCardValue("nombreAPM");
				if (nombreAPM == ""){
					throw "El APM es obligatorio.";
				}
				
			}else{
				throw "Acción no permitida. Sólo el Gte. de Distrito puede enviar al APM.";
			}
			
		}
		
		if (nextSequenceId == tareas.AprobarCA && completo == "true") {
			
			if(hAPI.listAttachments().size() == 0){
				throw "Debe adjuntar al menos un archivo.";
			}else{
				hAPI.setCardValue("tarea", "APROBAR SOLICITUD");
				ejb.actualizarEstado(java.lang.Integer.parseInt(nroProceso), "APROBAR SOLICITUD", "PENDIENTE");
			}	
			
		}
		
				
		if(tarea == tareas.AprobarCA && nextSequenceId == tareas.Rechazada && completo == 'true') {
			var motivoRechazo = hAPI.getCardValue("motivoRechazo");
			if (motivoRechazo == ""){
				throw "El motivo de rechazo es obligatorio.";
			}else{
				hAPI.setCardValue("tarea", "SOLICITUD RECHAZADA");
				ejb.actualizarMotivoRechazo(java.lang.Integer.parseInt(nroProceso), motivoRechazo);
				ejb.actualizarEstado(java.lang.Integer.parseInt(nroProceso), "SOLICITUD RECHAZADA", "RECHAZADA");
				
				var requestFolderId = createRequestFolder();
				uploadAttachmentsToGed(requestFolderId);
				
				log.info("****** Iniciando envio mail rechazada solicitud: " + nroProceso);
				sendMail("RAF10-Rechazada");
				log.info("****** Fin envio mail rechazada solicitud: " + nroProceso);
			}
			
		}
		
		if(((tarea == tareas.RevisarCA && nextSequenceId == tareas.CompletarCA) || 
				(tarea == tareas.AprobarCA && nextSequenceId == tareas.RevisarCA)) 
				&& completo == 'true') {
			if (comentarios == ""){
				throw "Debe realizar una observación para devolver la solicitud.";
			}
		}
		
		if(hAPI.getCardValue("solicitante") == "" && hAPI.getCardValue("lineaRegion") == ""){
			throw "No tiene permisos para iniciar una solicitud.";
		}
		
	}
	
	function savePetitorio(ejb, nroProceso, estado){
		
		log.info("****** Iniciando save Petitorio ");
		
		var dto = ejb.newPetitorioCartaAcuerdo();
		
		log.info("****** Iniciando save Petitorio dto: " + dto);
		
		log.info("****** Iniciando save Petitorio esGteDistrito: " + hAPI.getCardValue("esGteDistrito"));
		
		var sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
		var sdfMes = new java.text.SimpleDateFormat("MM/yyyy");
		var simpleDateFormat = new java.text.SimpleDateFormat("dd/MM/yyyy");
		
		var fechaSolicitud = hAPI.getCardValue("fechaSolicitud") != "" ? sdf.parse(hAPI.getCardValue("fechaSolicitud")) : null;
	
		dto.setNumeroSolicitud(java.lang.Integer.parseInt(nroProceso));
		dto.setFechaSolicitud(fechaSolicitud);
		dto.setSolicitante(hAPI.getCardValue("solicitante"));
		dto.setMatriculaSolicitante(hAPI.getCardValue("matriculaSolicitante"));
		dto.setMailSolicitante(hAPI.getCardValue("mailSolicitante"));
		dto.setNombreAPM(hAPI.getCardValue("nombreAPM"));
		dto.setMatriculaAPM(hAPI.getCardValue("matriculaAPM"));
		dto.setLineaRegion(hAPI.getCardValue("lineaRegion"));	
		dto.setLineaRegionCodigo(hAPI.getCardValue("lineaRegionCodigo"));
		dto.setCodGrupoSolicitante(hAPI.getCardValue("codGrupoSolicitante"));
		dto.setCodGrupoAsistDistrito(hAPI.getCardValue("codGrupoAsistDistrito"));
		dto.setArea(hAPI.getCardValue("area"));
		dto.setAreaCodigo(hAPI.getCardValue("areaCodigo"));
		dto.setCodGrupoGteArea(hAPI.getCardValue("codGrupoGteArea"));
		dto.setCodGrupoGtePromocion(hAPI.getCardValue("codGrupoGtePromocion"));
		dto.setGrupoGteMKT(hAPI.getCardValue("grupoGteMKT"));
		dto.setCodGrupoGteMKT(hAPI.getCardValue("codGrupoGteMKT"));
		dto.setFecha(hAPI.getCardValue("fecha") != "" ? simpleDateFormat.parse(hAPI.getCardValue("fecha")) : null);
		dto.setApellido(hAPI.getCardValue("apellido"));
		dto.setNombre(hAPI.getCardValue("nombre"));
		dto.setTipoInversion(hAPI.getCardValue("tipoInversion"));
		dto.setTipoInversionCodigo(hAPI.getCardValue("tipoInversionCodigo"));
		dto.setDetalleInversion(hAPI.getCardValue("detalleInversion"));
		dto.setMesInversion(hAPI.getCardValue("mesInversion") != "" ? sdfMes.parse(hAPI.getCardValue("mesInversion")) : null);
		dto.setTipoProducto(hAPI.getCardValue("tipoProducto"));
		dto.setTipoProductoCodigo(hAPI.getCardValue("tipoProductoCodigo"));
		dto.setGrupoDerivacion(hAPI.getCardValue("grupoDerivacion"));
		dto.setCodGrupoDerivacion(hAPI.getCardValue("codGrupoDerivacion"));
		dto.setMotivoRechazo(hAPI.getCardValue("motivoRechazo"));
		dto.setTarea(hAPI.getCardValue("tarea"));
		dto.setEsGteDistrito(hAPI.getCardValue("esGteDistrito") == "true"? true: false);
				
		log.info("****** Previo al save EJB");
		ejb.save(dto, estado);
		log.info("****** Fin del save Petitorio y Carta Acuerdo. Solicitud nro:"+getValue("WKNumProces"));
		
		
	}
	
	function sendMail(mailTemplate, comment) {
		var companyId = getValue("WKCompany");
		var nroProceso = getValue("WKNumProces");
		var changeReasonId = hAPI.getCardValue("changeReasonId");
		
		var mailTemplatesData = {
			"RAF10-Aprobada": {
				getSubject: function() {
					return "Solicitud de Petitorio y Carta Acuerdo " + nroProceso + " aprobada";
				},
				getDestinatarios: function() {
					return getNotificationEmails(changeReasonId, "avisoNueva");
				}
			},
			"RAF10-Rechazada": {
				getSubject: function() {
					return "Solicitud de Petitorio y Carta Acuerdo " + nroProceso + " rechazada";
				},
				getDestinatarios: function() {
					return getNotificationEmails(changeReasonId, "avisoRechazada");
				}
			}
		};
		
		var mailTemplateData = mailTemplatesData[mailTemplate];
		var subject = mailTemplateData.getSubject();
		var destinatarios = mailTemplateData.getDestinatarios();
		
		var cardData = hAPI.getCardData(nroProceso);
		
		log.info(" ########################## RAF10-bts tipoInversion: " + cardData.get("tipoInversion"));
		
	

		var data = {		
			"esGteDistrito": cardData.get("esGteDistrito"),
			"numeroSolicitud": cardData.get("nroSolicitud"),
			"solicitante": cardData.get("solicitante"),
			"lineaRegion": cardData.get("lineaRegion"),
			"grupoGteMKT": cardData.get("grupoGteMKT"),
			"nombreAPM": capitalize(cardData.get("nombreAPM")),
			"tipoInversion": cardData.get("tipoInversion"),
			"mesInversion": cardData.get("mesInversion"),
			"nombre": cardData.get("nombre"),
			"apellido": cardData.get("apellido"),
			"tipoProducto": cardData.get("tipoProducto"),
			"detalleInversion": cardData.get("detalleInversion"),
			"motivoRechazo": cardData.get("motivoRechazo")
		}
		
		// Aca se envia el mail a los destinatarios.
		log.info("***** Enviando mail a destinatarios: " + destinatarios);
		for(var j in destinatarios){
			var mail = destinatarios[j];
			try{
				sendCustomEmail({
					companyId: companyId, 
					subject: subject, 
					from: "procesobpm@raffo.com.ar", 
					to: mail, 
					templateId: mailTemplate,
					templateDialect: "es",
					templateHtml: mailTemplate + ".html",
					datos: data
				});
			} catch (e){
				log.error("RAF10-beforeTaskSave - Error enviando mail a "+mail + " template: " + mailTemplate);
			}
		}
	}

	function getNotificationEmails(reasonName, fieldName){
		var mails = [];
		
		log.info("*** RAF10 NotificationEmails ");
			
		mails.push(hAPI.getCardValue("mailSolicitante"));
		
		log.info("*** mailSolicitante: " + " mails: "+ mails);
		
		if(hAPI.getCardValue("esGteDistrito") == "true"){
			
			var usuariosAsistDistrito = getUserList(hAPI.getCardValue("codGrupoAsistDistrito"));
			
			for(var i = 0; i < usuariosAsistDistrito.size(); i++) { 
				var mailsAux = getMailList(usuariosAsistDistrito.get(i));
				for(var j = 0; j < mailsAux.size(); j++) {  
					mails.push(mailsAux.get(j));
				}
			}
			log.info("*** usuariosAsistDistrito: " + " mails: "+ mails);
		}
 		
	    log.info("*** RAF10 NotificationEmails mails:"+mails);
	    
	    return mails;
	}
	
	function createRequestFolder() {
		
		var arq = arqMarvinLoad("v1", {
			prop: "com.arquimeda.marvin.server.js.Properties-v1"
		});
		arq.prop.load({
			datasetName: "parametros"
		});
		
		var companyId = getValue("WKCompany"),
			nroProceso = getValue("WKNumProces"),
			userId = getValue("WKUser");
		
		log.info("**** RAF10 - Creando carpeta de la solicitud: " + nroProceso + " userId: " + userId + " companyId: " + companyId);
		
		var login = arq.prop.get("RAF10.usuarioSistema.login");
		var password = arq.prop.get("RAF10.usuarioSistema.pass");
		var sysCollegueId = arq.prop.get("RAF10.usuarioSistema.id");
		var carpetaAdjuntosId = arq.prop.get("RAF10.carpetaAdjuntos.docId");
		
		log.info("**** Carpeta Padre de la solicitud " + nroProceso + ", " + carpetaAdjuntosId);
		
		var requestFolder = "";	

		var codGrupoSolicitante = hAPI.getCardValue("codGrupoSolicitante");
		var codGrupoGteArea = hAPI.getCardValue("codGrupoGteArea");
		var codGrupoGtePromocion = hAPI.getCardValue("codGrupoGtePromocion");
		var codGrupoAsistDistrito = hAPI.getCardValue("codGrupoAsistDistrito");
		var codGrupoGteMKT = hAPI.getCardValue("codGrupoGteMKT");
		var codGrupoDerivacion = hAPI.getCardValue("codGrupoDerivacion") != null? hAPI.getCardValue("codGrupoDerivacion").split("Pool:Group:") : "";
		
		var securityArr = [];

			securityArr.push({
				permission: true, 
				attributionType: "GROUP", 
				attributionValue: codGrupoSolicitante, 
				securityLevel: "READING"
			});
			
			if(hAPI.getCardValue("esGteDistrito") == "true"){
				
				securityArr.push({
					permission: true, 
					attributionType: "GROUP", 
					attributionValue: codGrupoGteArea, 
					securityLevel: "READING"
				});
				
				securityArr.push({
					permission: true, 
					attributionType: "GROUP", 
					attributionValue: codGrupoGtePromocion, 
					securityLevel: "READING"
				});
				
				securityArr.push({
					permission: true, 
					attributionType: "GROUP", 
					attributionValue: codGrupoAsistDistrito, 
					securityLevel: "READING"
				});
				
			}else{
				
				securityArr.push({
					permission: true, 
					attributionType: "GROUP", 
					attributionValue: codGrupoGteMKT, 
					securityLevel: "READING"
				});
				
			}
			
			securityArr.push({
				permission: true, 
				attributionType: "GROUP", 
				attributionValue: codGrupoDerivacion[1], 
				securityLevel: "READING"
			});

			securityArr.push({
				permission: true, 
				attributionType: "GROUP", 
				attributionValue: "RAF10-ADM", 
				securityLevel: "READING"
			});
						
			securityArr.push({
				permission: true, 
				attributionType: "GROUP", 
				attributionValue: "RAF10-GTOR-PROCESO", 
				securityLevel: "READING"
			});
			
			securityArr.push({
				permission: true, 
				attributionType: "GROUP", 
				attributionValue: "RAF10-AUDITORIA", 
				securityLevel: "READING"
			});
			
			securityArr.push({
				permission: true, 
				attributionType: "ALL", 
				attributionValue: "all", 
				securityLevel: "ALL"
			});
			
			log.info("**** PARAMETROS Carpeta de la solicitud "+ codGrupoDerivacion[0] + ", " + codGrupoDerivacion[1] + ", " + login+ ", " + password+ ", " + sysCollegueId+ ", " + userId+ ", " + companyId+ ", " + nroProceso+ ", "+ carpetaAdjuntosId + ", "+ securityArr);
			

			requestFolder = ged.createFolderIfNotExist({
				user: login,
				password: password,
				colleagueId: sysCollegueId,
				publisherId: userId,
				companyId: companyId,			
				searchName: nroProceso,
				name: nroProceso,
				additionalComments: "",
				parentId: carpetaAdjuntosId,
				inheritSecurity: false,
				security: securityArr
			});
			
			log.info("**** Carpeta de la solicitud " + nroProceso + " creada. DocId: " + requestFolder.getDocumentId());
			
			hAPI.setCardValue("carpetaAdjuntosId", requestFolder.getDocumentId());
			
			var ejb = new javax.naming.InitialContext().lookup("java:global/raf-inversioncomercial-backend/PetitorioCartaAcuerdoEJB");
			ejb.saveCarpetaGED(java.lang.Integer.parseInt(nroProceso), requestFolder.getDocumentId());
		
		return requestFolder.getDocumentId();
		
	}

	function uploadAttachmentsToGed(parentFolderId){
		
		log.info("**** Cargando los documentos adjuntos al GED. Carpeta: " + parentFolderId);
		
		var calendar = java.util.Calendar.getInstance().getTime();
	    var docs = hAPI.listAttachments();
	    var attachmentsData = []
	    
	    for (var i = 0; i < docs.size(); i++) {
	        var doc = docs.get(i);
	        
	        if (doc.getDocumentType() != "7") {
	            continue;
	        }
	          
	        doc.setParentDocumentId(java.lang.Integer.parseInt(parentFolderId));
	        doc.setVersionDescription("RAF10: " + getValue("WKNumProces"));
	        doc.setExpires(false);
	        doc.setCreateDate(calendar);
	        doc.setInheritSecurity(true);
	        doc.setTopicId(1);
	        doc.setUserNotify(false);
	        doc.setValidationStartDate(calendar);
	        doc.setVersionOption("0");
	        doc.setUpdateIsoProperties(true);
	        
	        log.info("****** Subiendo el archivo: " + doc.getDocumentDescription());
	        hAPI.publishWorkflowAttachment(doc);
	        attachmentsData.push(doc.getDocumentId()+"___:___"+doc.getDocumentDescription());
	    }
	    
	    return attachmentsData;
	       
	}
