	function beforeTaskSave(colleagueId,nextSequenceId,userList){
		
		var nroProceso = getValue("WKNumProces");
		var completo = getValue('WKCompletTask');
		var tarea = getValue("WKNumState");
		var userId = getValue("WKUser");
		var comentarios = getValue("WKUserComment");
		var nroInversionComercial = java.lang.Integer.parseInt(hAPI.getCardValue("nroInversionComercial"));
		var esDelegado = hAPI.getCardValue("delegado");
		var tareaRAF08 = "";
		var estado = "PENDIENTE";
		
		var ejb = new javax.naming.InitialContext().lookup("java:global/raf-inversioncomercial-backend/CartaAcuerdoEJB");
		
		log.error('**** BeforeTaskSave RAF09; userId: ' + userId + '; tarea: ' + tarea + '; completo? : ' + completo + '; nextSequenceId:' + nextSequenceId);
		
		var tareas = {
				'IniciarSolicitud': 0,
				'Inicial': 4,
				'AuditarCA' : 5,
				'CompletarCA' : 10,
				'RevisarCA' : 12,
				'Finalizada' : 17,
				'Rechazada' : 21
			};
		
		var tareasRAF08 = {
			'EjecutarInversion' : 41,
			'Finalizada' : 44,
			'CartaAcuerdoRechazada' : 55,
			'AbiertoPosibleBaja': 86,
		}	
		
		if (tarea == tareas.Inicial && completo == 'true') {
			log.error('**** BeforeTaskSave Inicial  ');
	
			var dateParser = new java.text.SimpleDateFormat("yyyy-MM-dd");
			hAPI.setCardValue("fechaSolicitud", dateParser.format(new Date()));
		}
		
		if (tarea == tareas.Inicial && completo == 'true') {
			hAPI.setCardValue("tarea", "INICIAR SOLICITUD");
		}else if (tarea == tareas.CompletarCA && nextSequenceId == tareas.RevisarCA && completo == "true") {
			hAPI.setCardValue("tarea", "REVISAR (GTE DISTRITO)");
		}else if (tarea == tareas.RevisarCA && nextSequenceId == tareas.AuditarCA && completo == "true") {
			hAPI.setCardValue("tarea", "AUDITAR");
		}else if (tarea == tareas.AuditarCA && nextSequenceId == tareas.Finalizada && completo == "true") {
			
			hAPI.setCardValue("tarea", "SOLICITUD APROBADA");
			estado = "AUDITADA";
			
			var requestFolderId = createRequestFolder();
			uploadAttachmentsToGed(requestFolderId);
			
			log.info("######################## ES DELEGADO: " + esDelegado);
			if(esDelegado == "true"){
				//parte delegado o patrocinio
				tareaRAF08 = tareasRAF08.EjecutarInversion;
				log.info("######################## ES DELEGADO tarea: " + tareaRAF08);
			}else{
				//100% Marketing
				tareaRAF08 = tareasRAF08.AbiertoPosibleBaja;
				log.info("######################## ES DELEGADO tarea: " + tareaRAF08);
			}
		
		    // Parche por issue #28885
			if(nroInversionComercial > 45060){
				ejb.avanzarSolicitudIC(nroInversionComercial, tareaRAF08);
			}
			
			setearFechaFin(nroProceso);
			
			sendMail("RAF09-Auditada");
			
		}else if (nextSequenceId == tareas.Rechazada && completo == "true") {
			
			var motivoRechazo = hAPI.getCardValue("motivoRechazo");
			if (motivoRechazo == ""){
				throw "El motivo de rechazo es obligatorio.";
			}else{
				sendMail("RAF09-Rechazada");
			}
			
			hAPI.setCardValue("tarea", "SOLICITUD RECHAZADA");
			estado = "RECHAZADA";
			ejb.avanzarSolicitudIC(nroInversionComercial, tareasRAF08.CartaAcuerdoRechazada);
			setearFechaFin(nroProceso);
			
		}else if (tarea == tareas.AuditarCA && nextSequenceId == tareas.RevisarCA && completo == "true") {
			hAPI.setCardValue("tarea", "REVISAR (GTE DISTRITO)");
		}else if (tarea == tareas.RevisarCA && nextSequenceId == tareas.CompletarCA && completo == "true") {
			hAPI.setCardValue("tarea", "COMPLETAR (APM)");
		}else if (nextSequenceId == tareas.AuditarCA && completo == "true") {
			hAPI.setCardValue("tarea", "AUDITAR");
		}
		
		if(((tarea == tareas.RevisarCA && nextSequenceId == tareas.CompletarCA) || 
				(tarea == tareas.AuditarCA && nextSequenceId == tareas.RevisarCA)) 
				&& completo == 'true') {
			if (comentarios == ""){
				throw "Debe realizar una observación para devolver la solicitud.";
			}
		}
		
		if(hAPI.getCardValue("solicitante") == "" && hAPI.getCardValue("area") == "" && hAPI.getCardValue("distrito") == ""){
			throw "No tiene permisos para iniciar una solicitud.";
		}
		
		actualizarCartaAcuerdo(ejb, nroProceso, estado);
				
	}
	
	function actualizarCartaAcuerdo(ejb, nroProceso, estado){
	
		var cartaAcuerdoDTO = ejb.newCartaAcuerdo();
		var sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
		var sdfMes = new java.text.SimpleDateFormat("MM/yyyy");
		var simpleDateFormat = new java.text.SimpleDateFormat("dd/MM/yyyy");
		
		var fechaSolicitud = hAPI.getCardValue("fechaSolicitud") != "" ? sdf.parse(hAPI.getCardValue("fechaSolicitud")) : null;
		var fechaFinSolicitud = hAPI.getCardValue("fechaFinSolicitud") != "" && hAPI.getCardValue("fechaFinSolicitud") != null? sdf.parse(hAPI.getCardValue("fechaFinSolicitud")) : null;
	
		cartaAcuerdoDTO.setMotivoRechazo(hAPI.getCardValue("motivoRechazo"));
		cartaAcuerdoDTO.setTarea(hAPI.getCardValue("tarea"));
		cartaAcuerdoDTO.setGteDistrito(hAPI.getCardValue("gteDistrito"));
		cartaAcuerdoDTO.setNumeroSolicitud(java.lang.Integer.parseInt(nroProceso));
		
		/*
		
		cartaAcuerdoDTO.setFechaSolicitud(fechaSolicitud);
		cartaAcuerdoDTO.setFechaFinSolicitud(fechaFinSolicitud);
		cartaAcuerdoDTO.setSolicitante(hAPI.getCardValue("solicitante"));
		cartaAcuerdoDTO.setMatriculaSolicitante(hAPI.getCardValue("matriculaSolicitante"));
		cartaAcuerdoDTO.setMailGteDistrito(hAPI.getCardValue("mailGteDistrito"));
		cartaAcuerdoDTO.setNroInversionComercial(hAPI.getCardValue("nroInversionComercial"));
		cartaAcuerdoDTO.setAreaCodigo(hAPI.getCardValue("areaCodigo"));
		cartaAcuerdoDTO.setAreaDescripcion(hAPI.getCardValue("area"));
		cartaAcuerdoDTO.setDistritoCodigo(hAPI.getCardValue("distritoCodigo"));
		cartaAcuerdoDTO.setDistritoDescripcion(hAPI.getCardValue("distrito"));
		cartaAcuerdoDTO.setCodGrupoGteDistrito(hAPI.getCardValue("codGrupoGteDistrito"));   
		//cartaAcuerdoDTO.setGrupoGteDistrito(hAPI.getCardValue("grupoGteDistrito"));
		cartaAcuerdoDTO.setNombreAPM(hAPI.getCardValue("nombreAPM"));
		cartaAcuerdoDTO.setMatriculaAPM(hAPI.getCardValue("matriculaAPM"));
		cartaAcuerdoDTO.setEmailAPM(hAPI.getCardValue("emailAPM"));
		cartaAcuerdoDTO.setFecha(hAPI.getCardValue("fecha") != "" ? sdf.parse(hAPI.getCardValue("fecha")) : null);
		cartaAcuerdoDTO.setTipoInversion(hAPI.getCardValue("tipoInversion"));
		cartaAcuerdoDTO.setApellido(hAPI.getCardValue("apellido"));
		cartaAcuerdoDTO.setNombre(hAPI.getCardValue("nombre"));
		cartaAcuerdoDTO.setMesInversion(hAPI.getCardValue("mesInversion") != "" ? sdf.parse(hAPI.getCardValue("mesInversion")) : null);
		cartaAcuerdoDTO.setFormaPago(hAPI.getCardValue("formaPago"));
		cartaAcuerdoDTO.setCodFormaPago(hAPI.getCardValue("codFormaPago"));
		cartaAcuerdoDTO.setMotivoRechazo(hAPI.getCardValue("motivoRechazo"));
		cartaAcuerdoDTO.setTarea(hAPI.getCardValue("tarea"));
		cartaAcuerdoDTO.setGteDistrito(hAPI.getCardValue("gteDistrito"));
		cartaAcuerdoDTO.setNombreCongreso(hAPI.getCardValue("nombreCongreso"));
		
		cartaAcuerdoDTO.setComentariosCongreso(hAPI.getCardValue("comentariosCongreso"));
		cartaAcuerdoDTO.setCartaPetitorioDescripcion(hAPI.getCardValue("cartaPetitorioDescripcion"));
		cartaAcuerdoDTO.setCartaPetitorioDocumentId(hAPI.getCardValue("cartaPetitorioDocumentId"));
		cartaAcuerdoDTO.setCartaAcuerdoDescripcion(hAPI.getCardValue("cartaAcuerdoDescripcion"));
		cartaAcuerdoDTO.setCartaAcuerdoDocumentId(hAPI.getCardValue("cartaAcuerdoDocumentId"));
		cartaAcuerdoDTO.setFlyerDescripcion(hAPI.getCardValue("flyerDescripcion"));
		cartaAcuerdoDTO.setFlyerDocumentId(hAPI.getCardValue("flyerDocumentId"));
		cartaAcuerdoDTO.setWeb(hAPI.getCardValue("web"));
		cartaAcuerdoDTO.setDelegado(hAPI.getCardValue("delegado") == "true"? true: false);
	*/
		
		log.info("****** Previo al save EJB");
		ejb.actualizarCartaAcuerdo(cartaAcuerdoDTO, estado);
		log.info("****** Fin del save Carta Acuerdo. Solicitud nro:"+getValue("WKNumProces"));
	
	}

	function sendMail(mailTemplate, comment) {
		var companyId = getValue("WKCompany");
		var nroProceso = getValue("WKNumProces");
		var changeReasonId = hAPI.getCardValue("changeReasonId");
		
		var mailTemplatesData = {
			"RAF09-Auditada": {
				getSubject: function() {
					return "Solicitud de Carta Acuerdo " + nroProceso + " aprobada";
				},
				getDestinatarios: function() {
					return getNotificationEmails(changeReasonId, "avisoNueva");
				}
			},
			"RAF09-Rechazada": {
				getSubject: function() {
					return "Solicitud de Carta Acuerdo " + nroProceso + " rechazada";
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
		
		var tipoInversion;
		
		log.info(" ########################## RAF09-bts tipoInversion: " + cardData.get("tipoInversion"));
		
		if(cardData.get("tipoInversion") == "alojamientos") {
			tipoInversion = "ALOJAMIENTO CONGRESO O EVENTO CIENTIFICO";
		}else if(cardData.get("tipoInversion") == "aereosNac") {
			tipoInversion = "AEREO CONGRESO NACIONAL";
		}else if(cardData.get("tipoInversion") == "inscripciones") {
			tipoInversion = "INSCRIPCION A CONGRESO";
		}else if(cardData.get("tipoInversion") == "aereosInt") {
			tipoInversion = "AEREO CONGRESO INTERNACIONAL";
		}else if(cardData.get("tipoInversion") == "equipamientos") {
			tipoInversion = "EQUIPAMIENTO MEDICO";
		}else if(cardData.get("tipoInversion") == "becaNac") {
			tipoInversion = "BECA COMPLETA/PARCIAL NACIONAL";
		}else if(cardData.get("tipoInversion") == "becaInt") {
			tipoInversion = "BECA COMPLETA/PARCIAL INTERNACIONAL";
		}else if(cardData.get("tipoInversion") == "patrocinio") {
			tipoInversion = "PATROCINIO EDUCACION MEDICA";
		}		

		var data = {		
			"gteDistrito": cardData.get("gteDistrito"),
			"numeroSolicitud": cardData.get("nroSolicitud"),
			"area": cardData.get("area"),
			"distrito": cardData.get("distrito"),
			"nombreAPM": capitalize(cardData.get("nombreAPM")),
			"tipoInversion": tipoInversion,
			"mesInversion": cardData.get("mesInversion") != null? cardData.get("mesInversion") : "",
			"nombre": cardData.get("nombre"),
			"apellido": cardData.get("apellido"),
			"formaPago": cardData.get("formaPago"),
			"motivoRechazo": cardData.get("motivoRechazo"),
			"patrocinio": cardData.get("nroInversionComercial"),
			"incluyeInscripcion": cardData.get("incluyeInscripcion"),
			"incluyeTraslado": cardData.get("incluyeTraslado"),
			"incluyeAlojamiento": cardData.get("incluyeAlojamiento"),
			"seleccionInscripcionoPresupuesto": cardData.get("selInscripcionPresupuesto"),
			"seleccionTrasladoPresupuesto": cardData.get("selTrasladoPresupuesto"),
			"seleccionAlojamientoPresupuesto": cardData.get("selAlojamientoPresupuesto")
			
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
				log.error("RAF09-beforeTaskSave - Error enviando mail a "+mail + " template: " + mailTemplate);
			}
		}
	}

	function getNotificationEmails(reasonName, fieldName){
		var mails = [];
		
		log.info("*** getNotificationEmails RAF09 - BTS ");
			
		
		if(fieldName == "avisoNueva"){	
			
			mails.push(hAPI.getCardValue("mailGteDistrito"));
		
			log.info("*** mailGteDistrito: " + " mails: "+ mails);	
			
			var usuariosAsistDistrito = getUserList(hAPI.getCardValue("codGrupoAsistDistrito"));
	    
		    for(var i = 0; i < usuariosAsistDistrito.size(); i++) { 
		    	var mailsAux = getMailList(usuariosAsistDistrito.get(i));
		    	 for(var j = 0; j < mailsAux.size(); j++) {  
		    		 mails.push(mailsAux.get(j));
		    	}
		    }
	
		    
		    log.info("*** RAF09 - Notificacion al usuariosAsistDistrito: " + " mails: "+ mails);
		}
		
		if(fieldName == "avisoRechazada"){		
			
			mails.push(hAPI.getCardValue("mailGteDistrito"));

			log.info("*** RAF09 - Notificacion al mailGteDistrito: " + " mails: "+ mails);

		}
		
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
		
		log.info("**** Creando carpeta de la solicitud: " + nroProceso + " userId: " + userId + " companyId: " + companyId);
		
		var login = arq.prop.get("RAF09.usuarioSistema.login");
		var password = arq.prop.get("RAF09.usuarioSistema.pass");
		var sysCollegueId = arq.prop.get("RAF09.usuarioSistema.id");
		var carpetaAdjuntosId = arq.prop.get("RAF09.carpetaAdjuntos.docId");
		
		var requestFolder = "";	

		var codGrupoGteDistrito = hAPI.getCardValue("codGrupoGteDistrito");
		var codGrupoGteArea = hAPI.getCardValue("codGrupoGteArea");
		var codGrupoGtePromocion = hAPI.getCardValue("codGrupoGtePromocion");
		
			var securityArr = [];
			
			securityArr.push({
				permission: true, 
				attributionType: "GROUP", 
				attributionValue: codGrupoGteDistrito, 
				securityLevel: "READING"
			});
			
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
				attributionValue: "RAF09-GTOR-PROCESO", 
				securityLevel: "READING"
			});
			
			securityArr.push({
				permission: true, 
				attributionType: "GROUP", 
				attributionValue: "RAF09-AUDITORIA", 
				securityLevel: "READING"
			});
			
			securityArr.push({
				permission: true, 
				attributionType: "ALL", 
				attributionValue: "all", 
				securityLevel: "ALL"
			});

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
	        doc.setVersionDescription("RAF09: " + getValue("WKNumProces"));
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

function setearFechaFin(nroProceso){
	
	var fecha = new java.util.Date();
	var dateParser = new java.text.SimpleDateFormat("yyyy-MM-dd");
	hAPI.setCardValue("fechaFinSolicitud", dateParser.format(fecha));
	
	var ejb = new javax.naming.InitialContext().lookup("java:global/raf-inversioncomercial-backend/CartaAcuerdoEJB");
	ejb.persistirFechaFinSolicitud(java.lang.Integer.parseInt(nroProceso), fecha);
}