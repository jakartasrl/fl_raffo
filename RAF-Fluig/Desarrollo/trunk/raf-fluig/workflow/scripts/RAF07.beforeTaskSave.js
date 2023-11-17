function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var tareaActual = getValue("WKNumState");
	var completo = getValue("WKCompletTask");
	var nroProceso = getValue("WKNumProces");
	var companyId = getValue("WKCompany");
	var userId = getValue("WKUser");
	
	var tareas = {
		inicio: 5,
		modificarSolicitud: 30,
		aprobacion: 6,
		integrarQAD: 8,
		revisionIntegracion: 13,
		enviadoQAD: 16,
		cancelada2: 33,
		enProceso: 39,
		cerrada: 41,
		finalizarSolicitud: 45
	};

	if((tareaActual == 0 || tareaActual == tareas.inicio) && completo == "true"){	
		var fechaActual = obtenerFechaActual();
		hAPI.setCardValue("creationDate",fechaActual);
		sendMail("RAF07-Generacion");
	}
	
	// VALIDACIONES
	if(completo == "true") {
		validate();
	}
	
	if (hAPI.getCardValue("nroSolicitud").equals("")) {
		hAPI.setCardValue("nroSolicitud", nroProceso);
		hAPI.setCardValue("requestantCode", userId);
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", userId, userId, ConstraintType.MUST); 
	    var colleagueDts = DatasetFactory.getDataset("colleague", null, [c1], null);
		hAPI.setCardValue("requestantName", colleagueDts.getValue(0,"colleagueName"));
	}
		
	if (tareaActual == tareas.aprobacion && nextSequenceId == tareas.integrarQAD && completo == "true") {
		hAPI.setCardValue("isApproved", "true");
		var requestFolderId = createRequestFolder();
		hAPI.setCardValue("folderId", requestFolderId);
		uploadAttachmentsToGed();
		sendMail("RAF07-Aceptacion");
		var fechaAprobacion = obtenerFechaActual();
		hAPI.setCardValue("approvalDate", fechaAprobacion);
	} 
	
	 if (tareaActual == tareas.aprobacion && completo == "true" && (nextSequenceId == tareas.modificarSolicitud || nextSequenceId == tareas.inicio)) {
		var ultimaObservacion = getUltimaObservacion();
		if(ultimaObservacion == ""){
			throw "Debe realizar una observación para devolver la solicitud.";
		}
		sendMail("RAF07-Revision", ultimaObservacion);
	} 
	
	// STATES
	if ((tareaActual == 0 || tareaActual == tareas.inicio || tareaActual == tareas.modificarSolicitud) && completo == "false") {
		hAPI.setCardValue("currentState", "GENERADA");
	} else if ((tareaActual == 0 || tareaActual == tareas.inicio) && nextSequenceId == tareas.modificarSolicitud && completo == "true") {
		hAPI.setCardValue("currentState", "GENERADA");
	} else if (nextSequenceId == tareas.aprobacion && completo == "true") {
		hAPI.setCardValue("currentState", "ENVIADA");
	} else if (nextSequenceId == tareas.integrarQAD && completo == "true") {
		hAPI.setCardValue("currentState", "ACEPTADA");
	} else if (tareaActual == tareas.aprobacion &&
			(nextSequenceId == tareas.inicio || nextSequenceId == tareas.modificarSolicitud) && completo == "true") {
		hAPI.setCardValue("currentState", "RETORNADA");
	} else if (nextSequenceId == tareas.enviadoQAD && completo == "true") {
		hAPI.setCardValue("currentState", "EN_PROCESO");
	} else if (nextSequenceId == tareas.cancelada2 && completo == "true") {
		hAPI.setCardValue("currentState", "CANCELADA");
	} else if (nextSequenceId == tareas.cerrada && completo == "true") {
		hAPI.setCardValue("currentState", "CERRADA");
	}
	
}

function validate() {
	var nroProceso = getValue("WKNumProces");
	var cardData = hAPI.getCardData(nroProceso);
	
	if(hAPI.getCardValue("changeGroupReasonType").equals("nuevoDisenio")) {
		var fields = ["marcaNewProd","prActivo1NewProd","concentracion1NewProd","unidadMedida1NewProd","prActivo2NewProd",
		              "concentracion2NewProd","unidadMedida2NewProd","prActivo3NewProd","concentracion3NewProd","unidadMedida3NewProd",
		              "prActivo4NewProd","concentracion4NewProd","unidadMedida4NewProd","grupoNewProd","presentacionNewProd",
		              "paisNewProd","titularidadNewProd","elaboradorNewProd","acondicionadorNewProd","fichaTecnicaNewProd"];
			isAny = false;
		for (var i = 0; i < fields.length; i++) {
			if(!hAPI.getCardValue(fields[i]).equals("")){
				isAny = true;
				break;
			}
		}
		var qtyProdTypes = howManyChildsOf("tipoNewProd",cardData);
		if(!isAny && qtyProdTypes == 0) {
			throw "Debe cargar al menos un campo.";
		}
	} else {
		var qtyProd = howManyChildsOf("codigoProd",cardData);
		if(qtyProd == 0) {
			throw "Debe cargar al menos un producto.";
		}
	}
}

function sendMail(mailTemplate, comment) {
	var companyId = getValue("WKCompany");
	var nroProceso = getValue("WKNumProces");
	var changeReasonId = hAPI.getCardValue("changeReasonId");
	
	var mailTemplatesData = {
		"RAF07-Generacion": {
			getSubject: function() {
				return "Nueva solicitud de Diseño: " + nroProceso;
			},
			getDestinatarios: function() {
				return getNotificationEmails(changeReasonId, "avisoGeneracion");
			}
		},
		"RAF07-Aceptacion": {
			getSubject: function() {
				if(hAPI.getCardValue("changeGroupReasonType").equals("nuevoDisenio")) {
					return "Nueva solicitud de DISEÑO de Lanzamiento: " + nroProceso;
				} else {
					return "Nueva solicitud de DISEÑO: " + nroProceso;
				}
			},
			getDestinatarios: function() {
				return getNotificationEmails(changeReasonId, "avisoAceptacion");
			}
		},
		"RAF07-Revision": {
			getSubject: function() {
				return "Solicitud de Diseño " + nroProceso + " retornada";
			},
			getDestinatarios: function() {
				return getNotificationEmails(changeReasonId, "avisoRevision");
			}
		}
	};
	
	var mailTemplateData = mailTemplatesData[mailTemplate];
	var subject = mailTemplateData.getSubject();
	var destinatarios = mailTemplateData.getDestinatarios();
	
	var cardData = hAPI.getCardData(nroProceso);

	var data = {		
		"userGroup": cardData.get("userGroup"),
		"changeReason": cardData.get("changeReason"),
		"changeGroupReasonType": cardData.get("changeGroupReasonType"),
		"implementationType": capitalize(cardData.get("implementationType")),
		"title": cardData.get("title"),
		"changeDetail": cardData.get("changeDetail"),
		"breakDate": cardData.get("breakDate"),
		"marca": cardData.get("marcaNewProd"),
		"prActivo1": cardData.get("prActivo1NewProd"),
		"concentracion1": cardData.get("concentracion1NewProd"),
		"um1": cardData.get("unidadMedida1NewProd"),
		"prActivo2": cardData.get("prActivo2NewProd"),
		"concentracion2": cardData.get("concentracion2NewProd"),
		"um2": cardData.get("unidadMedida2NewProd"),
		"prActivo3": cardData.get("prActivo3NewProd"),
		"concentracion3": cardData.get("concentracion3NewProd"),
		"um3": cardData.get("unidadMedida3NewProd"),
		"prActivo4": cardData.get("prActivo4NewProd"),
		"concentracion4": cardData.get("concentracion4NewProd"),
		"um4": cardData.get("unidadMedida4NewProd"),
		"grupoProd": cardData.get("grupoNewProd"),
		"presentacion": cardData.get("presentacionNewProd"),
		"pais": cardData.get("paisNewProd"),
		"titularidad": cardData.get("titularidadNewProd"),
		"elaborador": cardData.get("elaboradorNewProd"),
		"acondicionador": cardData.get("acondicionadorNewProd"),
		"fichaTecnica": cardData.get("fichaTecnicaNewProd"),
		"prodTypes": getProdTypes(cardData),
		"prods": getProds(cardData),
		"attachmentsData": getAttachmentsData(cardData),
		"comment": comment || ""
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
			log.error("RAF07-beforeTaskSave - Error enviando mail a "+mail + " template: " + mailTemplate);
		}
	}
}

function getNotificationEmails(reasonName, fieldName){
	var mails = [];
	if(fieldName == "avisoRevision"){		
		var c0 = DatasetFactory.createConstraint("colleaguePK.colleagueId",hAPI.getCardValue("requestantCode"),hAPI.getCardValue("requestantCode"), ConstraintType.MUST); 
	    var dataset0 = DatasetFactory.getDataset("colleague", null, [c0], null);
	    mails.push(dataset0.getValue(0, "mail"));
	}
	var c1 = DatasetFactory.createConstraint("reasonName", reasonName, reasonName, ConstraintType.MUST); 
	var c2 = DatasetFactory.createConstraint("fieldName", fieldName, fieldName, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("RAF07-mailsNotificacion", null, [c1,c2], null);
    
    for(var i = 0; i < dataset.rowsCount; i++) {         
        var mail = dataset.getValue(i, "EMAIL");            
        mails.push(mail);
    }
	
    log.info("*** getNotificationEmails reasonName:" + reasonName + " fieldName:" + fieldName + " mails:"+mails);
    
    return mails;
}

function getUserMailList(codigoGrupo){

    var userList = new java.util.HashSet(); 
 
    var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", codigoGrupo, codigoGrupo, ConstraintType.MUST); 
  
    var dataset = DatasetFactory.getDataset("colleagueGroup", null, [c1], null);

   for(var i = 0; i < dataset.rowsCount; i++) {         
      var colleagueId = dataset.getValue(i, "colleagueGroupPK.colleagueId");            
      userList.add(colleagueId);
    }

   return new java.util.ArrayList(userList);
 
}

function howManyChildsOf(field,cardData) {
	var it = cardData.keySet().iterator();
	var qty = 0;
	while (it.hasNext()) {
	    var key = it.next();
	    if(key.contains(field+"___")) {
			qty++;
		}
	}
	return qty;
}

function getProdTypes(cardData) {
	var qtyProdTypes = howManyChildsOf("tipoNewProd",cardData);
	var arr = [];
	for(var i=1; i<= qtyProdTypes; i++) {
		arr.push(cardData.get("tipoNewProd___"+i));
	}
	return arr;
}

function getProds(cardData) {
	var qtyProd = howManyChildsOf("codigoProd",cardData);
	var arr = [];
	for(var i=1; i<= qtyProd; i++) {
		arr.push({
			cod: cardData.get("codigoProd___"+i),
			descr: cardData.get("descProd___"+i),
			tipoProd: cardData.get("tipoProd___"+i),
			marcaProd: cardData.get("marcaProd___"+i),
			prActivos: cardData.get("prActivosProd___"+i),
			grupoProd: cardData.get("grupoProd___"+i),
			presentacion: cardData.get("presentacionProd___"+i),
			pais: cardData.get("paisProd___"+i)
		});
	}
	return arr;
}

function getAttachmentsData(cardData) {
	var attachmentsData = [];
	if(!cardData.get("attachmentsData").equals("")) {
		var attachmentDataStrArr = (cardData.get("attachmentsData")+"").split("___;___");
		for(var i=0; i < attachmentDataStrArr.length; i++) {
			var attachmentDataStr = attachmentDataStrArr[i].split("___:___");
			attachmentsData.push({
				id: attachmentDataStr[0],
				desc: attachmentDataStr[1] 
			});
		}
		
	}
	return attachmentsData;
}

function capitalize(str) {
	var jsStr = str+"";
	return jsStr[0] ? jsStr[0].toUpperCase() + jsStr.slice(1) : jsStr;
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
	
	log.info("**** Creando carpeta de la solicitud: " + nroProceso);
	
	var login = arq.prop.get("RAF06.usuarioSistema.login"),
		password = arq.prop.get("RAF06.usuarioSistema.pass"),
		sysCollegueId = arq.prop.get("RAF06.usuarioSistema.id");
	
	var reasonName = hAPI.getCardValue("changeReasonId");
	var ct1 = DatasetFactory.createConstraint("reasonName", reasonName, reasonName, ConstraintType.MUST);
	var datasetReasons = DatasetFactory.getDataset("RAF07-Motivos", null, [ct1], null);
	
	var requestFolder = "";
	
	if (datasetReasons.rowsCount > 0) {
		var documentid = datasetReasons.getValue(0, "documentid");
		var c1 = DatasetFactory.createConstraint("tablename", "tblUserGroups", "tblUserGroups", ConstraintType.MUST); 
		var c2 = DatasetFactory.createConstraint("documentid", documentid, documentid, ConstraintType.MUST); 
		var datasetUserGroup = DatasetFactory.getDataset("RAF07-Motivos", null, [c1,c2], null);
		
		var securityArr = [];
		for(var i = 0; i < datasetUserGroup.rowsCount; i++) {
			securityArr.push({
				permission: true, 
				attributionType: "GROUP", 
				attributionValue: datasetUserGroup.getValue(i, "userGroupId"), 
				securityLevel: "READING"
			});
		}
		// Le agrego permiso de grabación al grupo del usuario solicitante para que se puedan atachar los adjuntos. El grupo de planeamiento no puede atachar
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
			parentId: arq.prop.get("RAF07.carpetaSolicitudes.docId"),
			inheritSecurity: false,
			security: securityArr
		});
		log.info("**** Carpeta de la solicitud " + nroProceso + " creada. DocId: " + requestFolder.getDocumentId());
	} else {
		throw "No se encuentra un motivo con el nombre: " + reasonName;
	}
	
	return requestFolder.getDocumentId();
}

function uploadAttachmentsToGed (){
	var parentFolderId = hAPI.getCardValue("folderId");
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
        doc.setVersionDescription("RAF07: " + getValue("WKNumProces"));
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
    hAPI.setCardValue("attachmentsData",attachmentsData.join("___;___"));
}

function getUltimaObservacion() {
	var nroProceso = getValue("WKNumProces");
	var c1 = DatasetFactory.createConstraint("NRO_SOLICITUD", nroProceso, nroProceso, ConstraintType.MUST),
		c2 = DatasetFactory.createConstraint("LAST_MOV", true, true, ConstraintType.MUST); 
	var obsDts = DatasetFactory.getDataset("raf-observaciones", null, [c1,c2], null);
	return obsDts.getValue(0, "OBSERVACIONES");
}

var ged = {
	attributionTypes: {
		"USER": 1,
		"GROUP": 2,
		"ALL": 3 
	},
	securityLevels: {
		"NONE": null,
		"READING": 0,
		"RECORDING": 1,
		"MODIFICATION": 2,
		"ALL": 3		
	},
	
	createSimpleFolder: function(params){
		var opts = this.simpleMerge({
			name: "Nueva Carpeta",
			additionalComments: "Nueva Carpeta",
			parentId: "0",
			inheritSecurity: true,
			security: [], // [{permission:true, attributionType:"USER", attributionValue:"adm", securityLevel:"ALL"}]
		}, params);
		
		//Instancia um novo documento e define as propriedades básicas
    	var dto = docAPI.newDocumentDto();
        dto.setDocumentDescription(opts.name);
        dto.setAdditionalComments(opts.additionalComments);
        dto.setDocumentType("1");
        dto.setParentDocumentId(parseInt(opts.parentId));
        dto.setInheritSecurity(opts.inheritSecurity);
        
        //Definindo permissãos
    	var dtosSecurity = [];
    	
    	for(var i=0; i<opts.security.length; i++){
    		var dtoConfigSecurity = docAPI.newDocumentSecurityConfigDto();
    		
    		dtoConfigSecurity.setPermission(opts.security[i].permission);
    		dtoConfigSecurity.setShowContent(true);
    		dtoConfigSecurity.setAttributionType(this.attributionTypes[opts.security[i].attributionType]);
    		dtoConfigSecurity.setAttributionValue(opts.security[i].attributionValue);
    		dtoConfigSecurity.setSecurityLevel(this.securityLevels[opts.security[i].securityLevel]);    
    		
    		dtosSecurity.push(dtoConfigSecurity); 
    	}  	
        log.info("DEBUG - parentId " + opts.parentId);
        log.info("DEBUG - name " + opts.name);
        return docAPI.createFolder(dto, dtosSecurity, null);
	},
	
	// Busca si existe una carpeta y si no la crea
	// Busca por nombre de carpeta y "padre"
	// Si se define serchName busca por ese valor
	createFolderIfNotExist: function(params){
		var opts = this.simpleMerge({
			user: "adm", //login do usuário.
			password: "adm", //senha do usuário.
			companyId: "1", //código da empresa.
			colleagueId: "adm",
			publisherId: "adm",
		
			searchName: false,  // patrón del nombre
			
			name: "Nueva Carpeta",
			additionalComments: "Nueva Carpeta",
			parentId: "0",
			inheritSecurity: true,
			security: [], // [{permission:true, attributionType:"USER", attributionValue:"adm", securityLevel:"ALL"}]
			
			workflowPackage: "com.totvs.technology.ecm.dm.ws",
			workflowServiceName: "ECMFolderService",
		}, params);
		
		log.info("*** ged createFolderIfNotExist: buscando carpeta parentId:" + opts.parentId 
					+ " name:" + opts.name 
					+ " searchName:" + opts.searchName);
		
		var ret = ged.findFolder({
			companyId: opts.companyId,
			name: opts.searchName? opts.searchName : opts.name,
			parentId: opts.parentId
		});
		
		if (ret != null) {
			log.info("*** ged createFolderIfNotExist: carpeta encontrada ! parentId:" + opts.parentId 
					+ " name:" + opts.name 
					+ " searchName:" + opts.searchName
					+ " documentId:" + ret.getDocumentId()
					);
			return ret;
		} else {
			log.info("*** ged createFolderIfNotExist: carpeta NO encontrada ! parentId:" + opts.parentId 
					+ " name:" + opts.name 
					+ " searchName:" + opts.searchName
					+ " - Creando carpeta ..."
					);			
			return ged.createFolder(params);
		}
		
	},
	findFolder: function(params){
		var opts = this.simpleMerge({
			companyId: "1", //código da empresa.
			name: "Nombre", // nombre del 
			parentId: "0",
			jndiName: "java:/jdbc/FluigDS",
		}, params);
		
		var conn = null,
			pstmt = null,
			documentId = null,
			version = null;
		
		try {
			
			if (opts.log) log.info("** Obteniendo conexion " + opts.jndiName);
			
			conn = new javax.naming.InitialContext().lookup(opts.jndiName).getConnection();   
	        
			var sql =	"SELECT [NR_DOCUMENTO] AS documentId," +
						"       [NR_VERSAO] AS version" +
						"  FROM [dbo].[DOCUMENTO] d " +
						" WHERE [d].[COD_EMPRESA] = ? " +
						"   AND [d].[LOG_DELETE] = 0 " +
						"   AND [d].[NR_DOCUMENTO_PAI] = ?" +
						"   AND [d].[VERSAO_ATIVA] = 1" +
						"   AND [d].[TP_DOCUMENTO] = 1" +
						"   AND [DS_PRINCIPAL_DOCUMENTO] LIKE ?" +
						"  ORDER BY [NR_DOCUMENTO] DESC";
			
						
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, opts.companyId);
			pstmt.setString(2, opts.parentId);
			pstmt.setString(3, opts.name);
			
			var rs = pstmt.executeQuery();
			while (rs.next()) {
				documentId = rs.getString("documentId");
				version = rs.getString("version");	
			}

		} catch (ex) {
			log.error("*** ged findFolder: " + ex);
	    } finally {
	        if (pstmt != null) { pstmt.close(); }
	        if (conn != null) { conn.close(); }
	    }
		
	    if (documentId == null){
	    	return null;
	    } else {
	    	return {
	    		getDocumentId: function(){return documentId;},
	    		getVersion: function(){return version;}
	    	};
	    }
		
	},	
	createFolder: function(params){
		var opts = this.simpleMerge({
			user: "adm", //login do usuário.
			password: "adm", //senha do usuário.
			companyId: "1", //código da empresa.
			colleagueId: "adm",
			publisherId: "adm",
			
			name: "Nueva Carpeta",
			additionalComments: "Nueva Carpeta",
			parentId: "0",
			inheritSecurity: true,
			security: [], // [{permission:true, attributionType:"USER", attributionValue:"adm", securityLevel:"ALL"}]
			
			workflowPackage: "com.totvs.technology.ecm.dm.ws",
			workflowServiceName: "ECMFolderService",
		}, params);
		
		var serviceHelper = ServiceManager.getService(opts.workflowServiceName).getBean(),
		serviceLocator = serviceHelper.instantiate(opts.workflowPackage + ".ECMFolderServiceService"),
		service = serviceLocator.getFolderServicePort();
		
		// Configuro el documento
		var documentDtoArr = serviceHelper.instantiate(opts.workflowPackage + ".DocumentDtoArray");
		
		var documentDto = serviceHelper.instantiate(opts.workflowPackage + ".DocumentDto");
		documentDto.setColleagueId(opts.colleagueId);
		documentDto.setCompanyId(parseInt(opts.companyId));
		documentDto.setDeleted(false);
		documentDto.setDocumentDescription(opts.name);
		documentDto.setAdditionalComments(opts.additionalComments);
		documentDto.setDownloadEnabled(true);
		documentDto.setInheritSecurity(opts.inheritSecurity);
		documentDto.setParentDocumentId(parseInt(opts.parentId));
		documentDto.setPublisherId(opts.publisherId);
		documentDto.setDocumentType("1");
		documentDto.setIconId(0);
	
		documentDtoArr.getItem().add(documentDto);

		// Configuro seguridad
		var securityDtoArr = serviceHelper.instantiate(opts.workflowPackage + ".DocumentSecurityConfigDtoArray");;
		for (var i=0; i<opts.security.length; i++) {
			var securityDto = serviceHelper.instantiate(opts.workflowPackage + ".DocumentSecurityConfigDto");
			securityDto.setPermission(opts.security[i].permission);
			securityDto.setShowContent(true);
			securityDto.setAttributionType(this.attributionTypes[opts.security[i].attributionType]);
			securityDto.setAttributionValue(opts.security[i].attributionValue);
			securityDto.setSecurityLevel(this.securityLevels[opts.security[i].securityLevel]);  
			securityDtoArr.getItem().add(securityDto);					
		}
		
		// Configuro Aprobadores
		var approversDtoArr = serviceHelper.instantiate(opts.workflowPackage + ".ApproverDtoArray");

		var webServiceMessageArray = serviceHelper.instantiate(opts.workflowPackage + ".WebServiceMessageArray");
		webServiceMessageArray = service.createFolder(opts.user, opts.password, parseInt(opts.companyId), documentDtoArr, securityDtoArr, approversDtoArr);
		return webServiceMessageArray.getItem().get(0);
	},
	
	updateFolder: function(params){
		var opts = this.simpleMerge({
			user: "adm", //login do usuário.
			password: "adm", //senha do usuário.
			companyId: "1", //código da empresa.
			colleagueId: "adm",
			docId: "0",
			
			name: "",
			additionalComments: "",
			parentId: "0",
			inheritSecurity: true,
			security: [], // [{permission:true, attributionType:"USER", attributionValue:"adm", securityLevel:"ALL"}]
			
			workflowPackage: "com.totvs.technology.ecm.dm.ws",
			workflowServiceName: "ECMFolderService",
		}, params);
		
		var serviceHelper = ServiceManager.getService(opts.workflowServiceName).getBean(),
		serviceLocator = serviceHelper.instantiate(opts.workflowPackage + ".ECMFolderServiceService"),
		service = serviceLocator.getFolderServicePort();
		
		var documentDtoArr = service.getFolder(opts.user, opts.password, parseInt(opts.companyId), parseInt(opts.docId), opts.colleagueId);
		var securityDtoArr = service.getSecurity(opts.user, opts.password, parseInt(opts.companyId), parseInt(opts.docId));
		var approversDtoArr = serviceHelper.instantiate(opts.workflowPackage + ".ApproverDtoArray");
		
		var itemsToRemove = [];
		for (var i=0; i<opts.security.length; i++) {
			var index = null;
			for (var j=0; j<securityDtoArr.getItem().size(); j++) {
				var exists = opts.security[i].permission == securityDtoArr.getItem().get(j).isPermission() &&
							 this.attributionTypes[opts.security[i].attributionType] == securityDtoArr.getItem().get(j).getAttributionType() &&
							 opts.security[i].attributionValue == securityDtoArr.getItem().get(j).getAttributionValue();
				if (exists) index = j;
			}
				
			if (index != null) {
				if(this.securityLevels[opts.security[i].securityLevel] == null) {
					itemsToRemove.push(securityDtoArr.getItem().get(index));
				} else {
					securityDtoArr.getItem().get(index).setSecurityLevel(this.securityLevels[opts.security[i].securityLevel]);
				}
			} else {
				if(this.securityLevels[opts.security[i].securityLevel] != null) {
					var securityDto = serviceHelper.instantiate(opts.workflowPackage + ".DocumentSecurityConfigDto");
					securityDto.setPermission(opts.security[i].permission);
					securityDto.setShowContent(true);
					securityDto.setAttributionType(this.attributionTypes[opts.security[i].attributionType]);
					securityDto.setAttributionValue(opts.security[i].attributionValue);
					securityDto.setSecurityLevel(this.securityLevels[opts.security[i].securityLevel]);  
					securityDtoArr.getItem().add(securityDto);					
				}
			}
		}
		for (var i=0; i<itemsToRemove.length; i++) {
			securityDtoArr.getItem().remove(itemsToRemove[i]);
		}
		
		var webServiceMessageArray = serviceHelper.instantiate(opts.workflowPackage + ".WebServiceMessageArray");
		webServiceMessageArray = service.updateFolder(opts.user, opts.password, parseInt(opts.companyId), documentDtoArr, securityDtoArr, approversDtoArr);
		return webServiceMessageArray.getItem().get(0);
	},
	
	simpleMerge: function (obj1,obj2) {
		// realizar merge solo del 1er nivel de atributos
		var obj3 = {};    
		for (attrname in obj1) { 
			obj3[attrname] = obj1[attrname]; 
		}    
		for (attrname in obj2) { 
			obj3[attrname] = obj2[attrname]; 
		}    
		return obj3;
	}
};

function obtenerFechaActual() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	
	var yyyy = today.getFullYear();
	if(dd<10){
	    dd="0"+dd;
	} 
	if(mm<10){
	    mm="0"+mm;
	} 	
	var fecha = yyyy + "-" + mm + "-" + dd
	return fecha;
}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};
