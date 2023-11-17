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

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};
