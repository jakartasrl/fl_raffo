function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("respuestaDocs");
	
	var respuestaDoc = ged.updateFolder({
		docId: "80",
		approvers: [
	        {approvelMode: 3, colleagueId: "adm", levelDescription: "grupo-prueba"},
	     ],
		security: [{permission:true, attributionType:"USER", attributionValue: "adm", securityLevel:"MODIFICATION"}]
	});
	
	actualizarAprobador("grupo-prueba","80",3);
	
	dataset.addRow(new Array(respuestaDoc));
	
	return dataset;
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
				approvers: [],
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
				user: "adm", //login do usuário. //soy cra
				password: "adm", //senha do usuário.
				companyId: "1", //código da empresa.
				colleagueId: "adm",
				publisherId: "adm",
				
				name: "Nueva Carpeta",
				additionalComments: "Nueva Carpeta",
				parentId: "0",
				inheritSecurity: true,
				security: [], // [{permission:true, attributionType:"USER", attributionValue:"adm", securityLevel:"ALL"}]
				approvers: [],
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
				securityDto.setDownloadEnabled(true);
				securityDtoArr.getItem().add(securityDto);					
			}
			
			// Configuro Aprobadores
			var approversDtoArr = serviceHelper.instantiate(opts.workflowPackage + ".ApproverDtoArray");
			for (var i=0; i<opts.approvers.length; i++) {
				var approverDto = serviceHelper.instantiate(opts.workflowPackage + ".ApproverDto");			
				approverDto.setCompanyId(parseInt(opts.companyId));
				approverDto.setColleagueId(opts.approvers[i].colleagueId);  
				approverDto.setApproverType(opts.approvers[i].approvelMode);
				approverDto.setLevelDescription(opts.approvers[i].levelDescription);
				approversDtoArr.getItem().add(approverDto);		
			}
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
				approvers: [],
				workflowPackage: "com.totvs.technology.ecm.dm.ws",
				workflowServiceName: "ECMFolderService",
			}, params);
			
			var serviceHelper = ServiceManager.getService(opts.workflowServiceName).getBean(),
			serviceLocator = serviceHelper.instantiate(opts.workflowPackage + ".ECMFolderServiceService"),
			service = serviceLocator.getFolderServicePort();
			
			var documentDtoArr = service.getFolder(opts.user, opts.password, parseInt(opts.companyId), parseInt(opts.docId), opts.colleagueId);
			
			var securityDtoArr = service.getSecurity(opts.user, opts.password, parseInt(opts.companyId), parseInt(opts.docId));
		
			// configuro seguridad
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
					securityDto.setDownloadEnabled(true);
					securityDtoArr.getItem().add(securityDto);					
				}
			}
			
			// experimentar con el getAproveers que viene del servicio soap
			var approversDtoArr = serviceHelper.instantiate(opts.workflowPackage + ".ApproverDtoArray");
			
			// configuro aprobadores (tal que cada vez que se hace un update se borran los previos aprobadores y se ponen los nuevos)
			for (var i=0; i<opts.approvers.length; i++) {
				var approverDto = serviceHelper.instantiate(opts.workflowPackage + ".ApproverDto");			
				approverDto.setCompanyId(parseInt(opts.companyId));
				approverDto.setColleagueId(opts.approvers[i].colleagueId);  
				approverDto.setApproverType(opts.approvers[i].approvelMode);
				approverDto.setLevelDescription(opts.approvers[i].levelDescription); 
				approversDtoArr.getItem().add(approverDto);		
			}
			
			
			var webServiceMessageArray = serviceHelper.instantiate(opts.workflowPackage + ".WebServiceMessageArray");
			
			webServiceMessageArray = service.updateFolder(opts.user, opts.password, parseInt(opts.companyId), documentDtoArr, securityDtoArr, approversDtoArr);
			// tirar excepcion y loguear
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



function actualizarAprobador(codigoGrupo,codigoCarpeta,approverType) {
	var	jndiName = "java:/jdbc/FluigDS";
	var conn = null;
	var pstmt;
	try {		
			
		conn = new javax.naming.InitialContext().lookup(jndiName).getConnection(); 
		
//		var sql = "UPDATE [dbo].[APROVADOR] " +
//				  "SET [CD_MATRICULA] = '" + codigoGrupo + 
//				  "' , [IDI_TIP_APRVDOR] = " + approverType +
//				  " WHERE [NR_DOCUMENTO] = " + codigoCarpeta + " ;" ;
//					
		var sql = "UPDATE [dbo].[APROVADOR] SET [CD_MATRICULA] = '" + codigoGrupo + "', [IDI_TIP_APRVDOR] = " + 1 + " WHERE [NR_DOCUMENTO] = " + codigoCarpeta + ";" ;
		var sql2 = "UPDATE [dbo].[NIVEL_APROVACAO] SET [IDI_TIP_APROVAC] = " + approverType + " WHERE [NR_DOCUMENTO] = " + codigoCarpeta + ";";
		pstmt = conn.prepareStatement(sql + sql2);					
		pstmt.executeUpdate();					
		
	} catch (ex) {
		
    } finally {
        if (pstmt != null) { pstmt.close(); }
        if (conn != null) { conn.close(); }
    }


}