/*
 * Dataset que prueba el creador de carpetas.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("Status");	
	
	try {
		var estructura = crearEstructuraCarpetas("5555 Walter Pisani");
//		log.info("DEBUG - " + objToString(estructura));
//		agregarPermisosUsuario("wpisani",estructura["5555 Walter Pisani"],estructura["Documentos"]);
		newDataset.addRow(["Done."]);
	} catch (e){
		newDataset.addRow(["ERROR: " + e]);
	}
	
	return newDataset; 
}

function objToString (obj) {
    var str = '[';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + ':' + obj[p] + ', ';
        }
    }
    return str+']';
}

var crearEstructuraCarpetas = function(legajo) {

	var arq = arqMarvinLoad("v1", {
		prop: "com.arquimeda.marvin.server.js.Properties-v1"
	});
	arq.prop.load({
		datasetName: "parametros"
	});
	
	var companyId = getValue("WKCompany"),
		login = arq.prop.get("RAF06.usuarioSistema.login"),
		password = arq.prop.get("RAF06.usuarioSistema.pass"),
		sysCollegueId = arq.prop.get("RAF06.usuarioSistema.id"),
		userId = getValue("WKUser");
	var res = {};

	var carpetaLegajoUsr = ged.createFolder({
		user: login,
		password: password,
		colleagueId: sysCollegueId,
		publisherId: userId,
		companyId: companyId,
		
		name: legajo,
		additionalComments: "",
		parentId: arq.prop.get("RAF06.carpetaLegajos.docId"),
		inheritSecurity: false,
		security: [
            {permission: true, attributionType: "GROUP", attributionValue: "UN3-RRHH-SELE", securityLevel: "READING"},
            {permission: true, attributionType: "GROUP", attributionValue: "UN3-RRHH-COMP", securityLevel: "ALL"},
       	]
	});
	if (carpetaLegajoUsr.getDocumentId() > 0){
		log.info("DEBUG ERROR: "+carpetaLegajoUsr.getWebServiceMessage());
	}
	res[legajo] = carpetaLegajoUsr.getDocumentId();
	
	var carpetaDocsUsr = ged.createFolder({
		user: login,
		password: password,
		colleagueId: sysCollegueId,
		publisherId: userId,
		companyId: companyId,
		
		name: "Documentos",
		additionalComments: "",
		parentId: carpetaLegajoUsr.getDocumentId(),
		inheritSecurity: false,
		security: [
            {permission: true, attributionType: "GROUP", attributionValue: "UN3-RRHH-SELE", securityLevel: "READING"},
            {permission: true, attributionType: "GROUP", attributionValue: "UN3-RRHH-COMP", securityLevel: "ALL"},
       	]
	});
	res["Documentos"] = carpetaDocsUsr.getDocumentId();
	
	var carpetaConfidencialUsr = ged.createFolder({
		user: login,
		password: password,
		colleagueId: sysCollegueId,
		publisherId: userId,
		companyId: companyId,
		
		name: "Confidencial",
		additionalComments: "",
		parentId: carpetaLegajoUsr.getDocumentId(),
		inheritSecurity: false,
		security: [
            {permission: true, attributionType: "GROUP", attributionValue: "UN3-RRHH-SELE", securityLevel: "READING"},
            {permission: true, attributionType: "GROUP", attributionValue: "UN3-RRHH-COMP", securityLevel: "ALL"},
       	]
	});
	res["Confidencial"] = carpetaConfidencialUsr.getDocumentId();
	
	var carpetaSPUsr = ged.createFolder({
		user: login,
		password: password,
		colleagueId: sysCollegueId,
		publisherId: userId,
		companyId: companyId,
		
		name: "Seleccion de Personal",
		additionalComments: "",
		parentId: carpetaConfidencialUsr.getDocumentId(),
		inheritSecurity: false,
		security: [
            {permission: true, attributionType: "GROUP", attributionValue: "UN3-RRHH-SELE", securityLevel: "ALL"},
       	]
	});
	res["Seleccion de Personal"] = carpetaSPUsr.getDocumentId();
	
	var carpetaAPUsr = ged.createFolder({
		user: login,
		password: password,
		colleagueId: sysCollegueId,
		publisherId: userId,
		companyId: companyId,
		
		name: "Administracion de Personal",
		additionalComments: "",
		parentId: carpetaConfidencialUsr.getDocumentId(),
		inheritSecurity: true,
		security: [
            {permission: true, attributionType: "GROUP", attributionValue: "UN3-RRHH-COMP", securityLevel: "ALL"},
       	]
	});
	res["Administracion de Personal"] = carpetaAPUsr.getDocumentId();
	
	return res;
};

var agregarPermisosUsuario = function(matricula, carpetaLegajo, carpetaDocumentos){
	var arq = arqMarvinLoad("v1", {
		prop: "com.arquimeda.marvin.server.js.Properties-v1"
	});
	arq.prop.load({
		datasetName: "parametros"
	});
	
	var companyId = getValue("WKCompany"),
		login = arq.prop.get("RAF06.usuarioSistema.login"),
		password = arq.prop.get("RAF06.usuarioSistema.pass"),
		collegueId = arq.prop.get("RAF06.usuarioSistema.id");
	
	ged.updateFolder({
		user: login,
		password: password,
		colleagueId: collegueId,
		companyId: companyId,
		
		docId: carpetaLegajo,
		security: [{permission:true, attributionType:"USER", attributionValue: matricula, securityLevel:"READING"}]
	});
	
	ged.updateFolder({
		user: login,
		password: password,
		colleagueId: collegueId,
		companyId: companyId,
		
		docId: carpetaDocumentos,
		security: [{permission:true, attributionType:"USER", attributionValue: matricula, securityLevel:"READING"}]
	});
	
}

var ged = {
	attributionTypes: {
		"USER": 1,
		"GROUP": 2,
		"ALL": 3 
	},
	securityLevels: {
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
	createFolder: function(params){
		var opts = this.simpleMerge({
			user: "adm", //login do usuário.
			password: "adm", //senha do usuário.
			companyId: "1", //código da empresa.
			colleagueId: "adm",
			publisherId: "adm",
			
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
		
		for (var i=0; i<opts.security.length; i++) {
			var index;
			for (var j=0; j<securityDtoArr.getItem().size(); j++) {
				var exists = opts.security[i].permission == securityDtoArr.getItem().get(j).isPermission() &&
							 this.attributionTypes[opts.security[i].attributionType] == securityDtoArr.getItem().get(j).getAttributionType() &&
							 opts.security[i].attributionValue == securityDtoArr.getItem().get(j).getAttributionValue();
				if (exists) index = j;
			}
				
			if (index) {
				securityDtoArr.getItem().get(index).setSecurityLevel(this.securityLevels[opts.security[i].securityLevel]);
			} else {
				var securityDto = serviceHelper.instantiate(opts.workflowPackage + ".DocumentSecurityConfigDto");
				securityDto.setPermission(opts.security[i].permission);
				securityDto.setShowContent(true);
				securityDto.setAttributionType(this.attributionTypes[opts.security[i].attributionType]);
				securityDto.setAttributionValue(opts.security[i].attributionValue);
				securityDto.setSecurityLevel(this.securityLevels[opts.security[i].securityLevel]);  
				securityDtoArr.getItem().add(securityDto);					
			}
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

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};
