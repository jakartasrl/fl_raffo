	function beforeTaskSave(colleagueId,nextSequenceId,userList){
		
		var nroProceso = getValue("WKNumProces");
		var completo = getValue('WKCompletTask');
		var tarea = getValue("WKNumState");
		var userId = getValue("WKUser");
		var nroInversionComercial = hAPI.getCardValue("nroInversionComercial") != null? java.lang.Integer.parseInt(hAPI.getCardValue("nroInversionComercial")) : "";
		var estado = "PENDIENTE";
		
		var ejb = new javax.naming.InitialContext().lookup("java:global/raf-inversioncomercial-backend/BajaMedicoEJB");
		
		log.error('**** BeforeTaskSave RAF11; userId: ' + userId + '; tarea: ' + tarea + '; completo? : ' + completo + '; nextSequenceId:' + nextSequenceId);
		
		var tareas = {
				'IniciarSolicitud': 0,
				'Inicial': 4,
				'Finalizada' : 9
			};
		
		var tareasRAF08 = {
			'FinalizadaBajaMedico' : 87
		}	
		
		if (tarea == tareas.Inicial && completo == 'true') {
			log.error('**** BeforeTaskSave Inicial  ');
	
			var dateParser = new java.text.SimpleDateFormat("yyyy-MM-dd");
			hAPI.setCardValue("fechaSolicitud", dateParser.format(new Date()));
			hAPI.setCardValue("tarea", "INICIAR SOLICITUD");
				
		}
		
		if (nextSequenceId == tareas.Finalizada && completo == "true") {
			
			hAPI.setCardValue("tarea", "SOLICITUD FINALIZADA");
			estado = "FINALIZADA";
			sendMail("RAF11-BajaMedico");

		    log.error('**** BeforeTaskSave previo actualizar  ');
		
			actualizar(ejb, nroProceso, estado);
		
			log.info("######################## RAF11 avanza RAF08 a tarea: " + tareasRAF08.FinalizadaBajaMedico);

			ejb.avanzarSolicitudIC(nroInversionComercial, tareasRAF08.FinalizadaBajaMedico);
			
		}
		
		//
				
	}
	
	function actualizar(ejb, nroProceso, estado){
	
		var bajaMedicoDTO = ejb.newBajaMedico();
		var sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
		var fechaSolicitud = hAPI.getCardValue("fechaSolicitud") != "" ? sdf.parse(hAPI.getCardValue("fechaSolicitud")) : null;
		
		corregirCamposFecha("fechaDesdeCongreso");
		corregirCamposFecha("fechaHastaCongreso");
		corregirCamposFecha("mesInversion");
	
		bajaMedicoDTO.setNumeroSolicitud(java.lang.Integer.parseInt(nroProceso));
		bajaMedicoDTO.setFechaSolicitud(fechaSolicitud);
		bajaMedicoDTO.setMatriculaSolicitante(hAPI.getCardValue("matriculaSolicitante"));
		bajaMedicoDTO.setAreaCodigo(hAPI.getCardValue("areaCodigo"));
		bajaMedicoDTO.setAreaDescripcion(hAPI.getCardValue("area"));
		bajaMedicoDTO.setDistritoCodigo(hAPI.getCardValue("distritoCodigo"));
		bajaMedicoDTO.setDistritoDescripcion(hAPI.getCardValue("distrito"));
		bajaMedicoDTO.setCodGrupoGteArea(hAPI.getCardValue("codGrupoGteArea"));
		bajaMedicoDTO.setCodGrupoGteDistrito(hAPI.getCardValue("codGrupoGteDistrito"));   
		bajaMedicoDTO.setCodGrupoAsistenteDistrito(hAPI.getCardValue("codGrupoAsistDistrito"));
		bajaMedicoDTO.setCodGrupoGtePromocion(hAPI.getCardValue("codGrupoGtePromocion"));
		bajaMedicoDTO.setSolicitante(hAPI.getCardValue("solicitante"));
		bajaMedicoDTO.setNombreAPM(hAPI.getCardValue("nombreAPM"));
		bajaMedicoDTO.setMatriculaAPM(hAPI.getCardValue("matriculaAPM"));
		bajaMedicoDTO.setEmailAPM(hAPI.getCardValue("emailAPM"));
		bajaMedicoDTO.setTipoInversion(hAPI.getCardValue("tipoInversion"));
		bajaMedicoDTO.setApellido(hAPI.getCardValue("apellido"));
		bajaMedicoDTO.setNombre(hAPI.getCardValue("nombre"));
		bajaMedicoDTO.setCuit(hAPI.getCardValue("cuit"));
		bajaMedicoDTO.setNombreCongreso(hAPI.getCardValue("nombreCongreso"));
		bajaMedicoDTO.setLugarCongreso(hAPI.getCardValue("lugarCongreso"));
		bajaMedicoDTO.setFechaDesdeCongreso(sdf.parse(hAPI.getCardValue("fechaDesdeCongreso")));
		bajaMedicoDTO.setFechaHastaCongreso(sdf.parse(hAPI.getCardValue("fechaHastaCongreso")));
		bajaMedicoDTO.setTarea(hAPI.getCardValue("tarea"));
		bajaMedicoDTO.setMatriculaGteDistrito(hAPI.getCardValue("matriculaGteDistrito"));
		bajaMedicoDTO.setMesInversion(sdf.parse(hAPI.getCardValue("mesInversion")));
		bajaMedicoDTO.setIncluyeAlojamiento(hAPI.getCardValue("incluyeAlojamiento"));
		bajaMedicoDTO.setIncluyeTraslado(hAPI.getCardValue("incluyeTraslado"));
		bajaMedicoDTO.setIncluyeInscripcion(hAPI.getCardValue("incluyeInscripcion"));
		bajaMedicoDTO.setSeleccionAlojamientoPresupuesto(hAPI.getCardValue("selAlojamientoPresupuesto"));
		bajaMedicoDTO.setSeleccionTrasladoPresupuesto(hAPI.getCardValue("selTrasladoPresupuesto"));
		bajaMedicoDTO.setSeleccionInscripcionoPresupuesto(hAPI.getCardValue("selInscripcionPresupuesto"));
		bajaMedicoDTO.setMotivoBaja(hAPI.getCardValue("motivoBaja"));
		
		log.info("****** Previo al save EJB " + estado);
		ejb.save(bajaMedicoDTO, estado);
		log.info("****** Fin del save Baja Medico. Solicitud nro:"+getValue("WKNumProces"));
	
	}

	function sendMail(mailTemplate, comment) {
		var companyId = getValue("WKCompany");
		var nroProceso = getValue("WKNumProces");
		var changeReasonId = hAPI.getCardValue("changeReasonId");

		var mailTemplatesData = {
			"RAF11-BajaMedico": {
				getSubject: function() {
					return "Solicitud de Baja de Médico " + nroProceso + " realizada";
				},
				getDestinatarios: function() {
					return getNotificationEmails(changeReasonId, "avisoNueva");
				}
			}
		};
		
		var mailTemplateData = mailTemplatesData[mailTemplate];
		var subject = mailTemplateData.getSubject();
		var destinatarios = mailTemplateData.getDestinatarios();
		
		var cardData = hAPI.getCardData(nroProceso);
		
		var tipoInversion;
		
		log.info(" ########################## RAF11-bts tipoInversion: " + cardData.get("tipoInversion"));
		
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
			"numeroSolicitud": nroProceso,
			"nombreCongreso": cardData.get("nombreCongreso"),
			"lugarCongreso": cardData.get("lugarCongreso"),
			"fechaDesdeCongreso": cardData.get("fechaDesdeCongreso"),
			"fechaHastaCongreso": cardData.get("fechaHastaCongreso"),
			"nombre": cardData.get("nombre"),
			"apellido": cardData.get("apellido"),
			"cuit": cardData.get("cuit"),
			"tipoInversion": tipoInversion,
			"incluyeTraslado": cardData.get("incluyeTraslado") || "-",
			"incluyeInscripcion": cardData.get("incluyeInscripcion") || "-",
			"incluyeAlojamiento": cardData.get("incluyeAlojamiento") || "-",
			"motivoBaja": cardData.get("motivoBaja")
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
				log.error("RAF11-beforeTaskSave - Error enviando mail a "+mail + " template: " + mailTemplate);
			}
		}
	}

	function getNotificationEmails(reasonName, fieldName){
		var esDelegado = hAPI.getCardValue("delegado");
		var mails = [];
		
		log.info("*** getNotificationEmails 1: ");
		
		var usuariosGteDistrito = getUserList(hAPI.getCardValue("codGrupoGteDistrito"));
	    
	    for(var i = 0; i < usuariosGteDistrito.size(); i++) { 
	    	var mailsAux = getMailList(usuariosGteDistrito.get(i));
	    	 for(var j = 0; j < mailsAux.size(); j++) {  
	    		 mails.push(mailsAux.get(j));
	    	}
	    }
		
		log.info("*** mailGteDistrito: " + " mails: "+ mails);
		
		var usuariosAsistDistrito = getUserList(hAPI.getCardValue("codGrupoAsistDistrito"));
	    
	    for(var i = 0; i < usuariosAsistDistrito.size(); i++) { 
	    	var mailsAux = getMailList(usuariosAsistDistrito.get(i));
	    	 for(var j = 0; j < mailsAux.size(); j++) {  
	    		 mails.push(mailsAux.get(j));
	    	}
	    }
		
		if(esDelegado != "true"){
			//parte delegado
			
			var casillaEventos = getUserList("RAF11-CASILLA-EVENTOS");
	    
		    for(var i = 0; i < casillaEventos.size(); i++) { 
		    	var mailsAux = getMailList(casillaEventos.get(i));
		    	 for(var j = 0; j < mailsAux.size(); j++) {  
		    		 mails.push(mailsAux.get(j));
		    	}
		    }

			log.info("*** usuarios casilla de eventos: " + " mails: "+ mails);

		}
	    
	    log.info("*** usuariosAsistDistrito: " + " mails: "+ mails);
		
	    log.info("*** getNotificationEmails Area: " + hAPI.getCardValue("areaCodigo") + " mails:"+mails);
	    
	    return mails;
	}

function corregirCamposFecha(nombreCampo){
	 
	 if (hAPI.getCardValue(nombreCampo) != null && hAPI.getCardValue(nombreCampo) != ""){
		
	  var fechaArray = hAPI.getCardValue(nombreCampo).split("/");

	  if (fechaArray.length == 3) {
		hAPI.setCardValue(nombreCampo, fechaArray[2]+"-"+fechaArray[1]+"-"+fechaArray[0]);
	  }else if (fechaArray.length == 2) {
		hAPI.setCardValue(nombreCampo, fechaArray[1]+"-"+fechaArray[0]+"-01");
	  }  

      log.error("*** Fue modificado el campo " + nombreCampo + " valor: " + hAPI.getCardValue(nombreCampo) + " solicitud: " + hAPI.getCardValue("nroInversionComercial"));
 }
	 
}

function getUserList(codigoGrupo){

    var userList = new java.util.HashSet(); 
    var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", codigoGrupo, codigoGrupo, ConstraintType.MUST);          
    var dataset = DatasetFactory.getDataset("colleagueGroup", null, [c1], null);

	for(var i = 0; i < dataset.rowsCount; i++) {         
      var colleagueId = dataset.getValue(i, "colleagueGroupPK.colleagueId");            
      userList.add(colleagueId);
    }
	
	return new java.util.ArrayList(userList);
	
}

function getMailList(colleagueId){

    var mailList = new java.util.HashSet(); 
    var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST);          
    var dataset = DatasetFactory.getDataset("colleague", null, [c1], null);

	for(var i = 0; i < dataset.rowsCount; i++) {         
      var mail = dataset.getValue(i, "mail");            
      mailList.add(mail);
    }
	
	return new java.util.ArrayList(mailList);
	
}

function sendCustomEmail(params) {
	 
	var mimeType = "text/html", 
	    data = new java.util.HashMap(), 
	    separador = java.io.File.separator,
	    globalParam = new javax.naming.InitialContext().lookup("java:global/fluig/ecm-ejb/wdk/GlobalParam"),
	    templatesFolder = globalParam.read(params.companyId).getTemplatesFolder() + separador + "tplmail" + separador + params.templateId + separador + params.templateDialect,
	    sdk = new javax.naming.InitialContext().lookup("java:global/fluig/wcm-core/service/SDK");
	  
	 // Valores default
	data.put("SERVER_URL", sdk.getServerURL());
	data.put("SERVER_EXTERNAL_URL", sdk.getServerContextURL());
	data.put("SERVER_PROTECTED_URL", sdk.getProtectedTenantContextPath());
	data.put("COMPANY_ID", params.companyId);
	data.put("TENANT_ID",sdk.getCurrentTenantID());
	 
	// Copio datos propios del template
	if (params.datos) {
		for(param in params.datos) {
			data.put(param, params.datos[param]);
		}
	}
	 
	com.fluig.foundation.mail.EMailSenderFactory.getEMailSender().customEmail(new java.lang.Long(params.companyId), params.subject, params.from, params.to, templatesFolder, params.templateHtml, mimeType, data);
	log.info("**** Mail enviado a: "+ params.to);
	
}

function capitalize(str) {
	var jsStr = str+"";
	return jsStr[0] ? jsStr[0].toUpperCase() + jsStr.slice(1) : jsStr;
}