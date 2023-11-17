function beforeTaskSave(colleagueId,nextSequenceId,userList){

	var tareaActual = getValue("WKNumState");
	var completo = getValue("WKCompletTask");
	var comentarios = getValue("WKUserComment");
	var nroSolicitudPadre = getValue("WKNumProces");
	var companyId = getValue("WKCompany");
	var matricula = getValue("WKUser");
	
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);
	var obsDts = DatasetFactory.getDataset("colleague", null, [c1], null); 
	var userName = obsDts.getValue(0, "colleagueName");
	
	var anexoPrincipal = "";

	var telefono = hAPI.getCardValue("telefono");
	var mail = hAPI.getCardValue("mail");
	var otro = hAPI.getCardValue("otro");
	var direccion = hAPI.getCardValue("direccion");	
	var cerrarConsulta = hAPI.getCardValue("cerrarConsulta");
	
	if(telefono == "" && mail == "" && otro == "" && direccion == ""){
		throw "Alguno de los campos Teléfono, Mail, Otro o Dirección deben ser completados.";
	}
	//Inicia la solicitud automaticamente
	var tareas = {
			REGISTRAR_CONSULTA : 9,	
			MODIFICAR_CONSULTA : 10,
			VERIF_CONSULTA_CERRADA : 8
	}
	
	if (tareaActual == tareas.REGISTRAR_CONSULTA && completo == "true") {
		
		if(hAPI.getCardValue("subindicesHijos") == ""){
			throw "Debe cargar al menos una consulta."; 
		}
		
		try {
			
			var subindicesHijos = hAPI.getCardValue("subindicesHijos").split(",");
			
			for(i = 0 ; i < subindicesHijos.length ; i++){
				
				var numeroConsulta = proximoNumero("R03_NRO_CONSULTA");
				 
				var tipoConsulta = hAPI.getCardValue("cons_tipo___" + subindicesHijos[i]);
				var descripcionProducto = hAPI.getCardValue("cons_producto___" + subindicesHijos[i]);
				
				var arq = arqLoadLib(["com.arquimeda.fluig.js.ws.BPM-v1","com.arquimeda.fluig.js.Properties-v1"]);
				arq.prop.load({
					datasetName: "parametros"
				});
				
				var cardData = {
					"padre_nroSolicitud" : java.lang.String.valueOf(nroSolicitudPadre),
					"nroHijo" : subindicesHijos[i],
					"derivacionCodigoGrupo" : hAPI.getCardValue("cons_derivacion_grupo___" + subindicesHijos[i]),
					"anexoPrincipal" : descripcionProducto + " - " + tipoConsulta + " - " + numeroConsulta,
					"solicitante" : userName,
					
					//agregar datos cabecera
					"padre_fecha" : hAPI.getCardValue("fecha"),
					"padre_hora" : hAPI.getCardValue("hora"),
					"padre_origen" : hAPI.getCardValue("origen"),
					"padre_nombre" : hAPI.getCardValue("nombre"),
					"padre_telefono" : hAPI.getCardValue("telefono"),
					"padre_mail" : hAPI.getCardValue("mail"),
					"padre_direccion" : hAPI.getCardValue("direccion"),
					"padre_otro" : hAPI.getCardValue("otro"),
					"padre_observaciones" : hAPI.getCardValue("observaciones"),
					
					"aten_nroConsulta" : numeroConsulta,
					"aten_producto" : hAPI.getCardValue("cons_producto___" + subindicesHijos[i]),
					"aten_activo" : hAPI.getCardValue("cons_activo___" + subindicesHijos[i]),
					"aten_nroLote" : hAPI.getCardValue("cons_nroLote___" + subindicesHijos[i]),
					"aten_vencimiento" : hAPI.getCardValue("cons_vencimiento___" + subindicesHijos[i]),
					"aten_tipo" : hAPI.getCardValue("cons_tipo___" + subindicesHijos[i]),
					"aten_observacion" : hAPI.getCardValue("cons_observacion___" + subindicesHijos[i]),
					"aten_derivacion" : hAPI.getCardValue("cons_derivacion___" + subindicesHijos[i]),
					"aten_rellamada" : ""
				}
				
				
				var processId = arq.bpm.startProcess({
					username: arq.prop.get("RAF03.usuarioSistema.login"),
					password: arq.prop.get("RAF03.usuarioSistema.pass"),
					companyId: getValue("WKCompany"),
					processId: "RAF04",		
					choosedState: 6,
					colleagueIds: [hAPI.getCardValue("cons_derivacion_grupo___" + subindicesHijos[i])],
					comments: "",
					userId: arq.prop.get("RAF03.usuarioSistema.id"),
					completeTask: true, 
					attachments: [],
			        cardData: cardData,
			        managerMode: true,
			        workflowServiceName: "ECMWorkflowEngineService",
			        log: 1,
				});
				
				hAPI.setCardValue("cons_nroSolicitud___" + subindicesHijos[i], processId);
				hAPI.setCardValue("cons_nroConsulta___" + subindicesHijos[i], numeroConsulta);
				
				anexoPrincipal = anexoPrincipal + " - " + numeroConsulta + "(" + hAPI.getCardValue("cons_nroSolicitud___" + subindicesHijos[i]) + ")";

			}
			
			anexoPrincipal = anexoPrincipal.substring(2);
			
			hAPI.setCardValue("anexoPrincipal", anexoPrincipal);
			
		} catch(e) {
			log.info("***** Erro startProcess: " + e);
			throw "Se produjo un error al iniciar la solicitud de Atención de Consultas. Por favor, consulte con el administrador del sistema.";
		}
         
    }else if(tareaActual == tareas.MODIFICAR_CONSULTA && completo == "true" && cerrarConsulta != "1"){
	
		// Enviar correo electronico custom para notificar a los usuarios que tienen asignadas las tareas hijas.
		
		var subindicesHijos = hAPI.getCardValue("subindicesHijos").split(",");
		
		for(i = 0 ; i < subindicesHijos.length ; i++){
		
			var nroSolicitudHija = hAPI.getCardValue("cons_nroSolicitud___" + subindicesHijos[i]);
			var tareaHija = hAPI.getCardValue("cons_tarea___" + subindicesHijos[i]);
			var rellamado = hAPI.getCardValue("rellamado___" + subindicesHijos[i]);
			var modificacionDatos = hAPI.getCardValue("modificacionDatos");
			
			var destinatarios = new Array();
			
			log.info("***** nroSolicitudHija: " + nroSolicitudHija + " rellamado: " + rellamado);
			
			if(tareaHija != "CONSULTA CERRADA" && tareaHija != "CONSULTA CANCELADA" && (rellamado == "1" || modificacionDatos == "1")){
			
				var c1 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", nroSolicitudHija, nroSolicitudHija, ConstraintType.MUST); 
				var c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST); 					
				var processTaskDataset = DatasetFactory.getDataset("processTask", null, [c1,c2], null); 
				var colleagueId = processTaskDataset.getValue(0, "processTaskPK.colleagueId");  
				
				log.info("***** colleagueId: " + colleagueId);
					
				var c3 = DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST); 
				var colleagueDataset = DatasetFactory.getDataset("colleague", null, [c3], null);
				
				// Lo busco en el dataset de usuarios 
				if(colleagueDataset.rowsCount == 1){
				
					var mail = colleagueDataset.getValue(0,"mail");	
					destinatarios.push(mail);
					log.info("***** mail: " + mail);
				
				}else{
				
					// Si no esta en el dataset de usuarios entonces es un pool
					// Busco los usuarios en el dataset de usuarios por grupo 
					
					var group = colleagueId.substring(11);
					log.info("***** group: " + group);
				
					var c4 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", group, group, ConstraintType.MUST); 
					var colleagueGroupDataset = DatasetFactory.getDataset("colleagueGroup", null, [c4], null); 
				
					for(var j=0; j<colleagueGroupDataset.rowsCount; j++){
						
						var member = colleagueGroupDataset.getValue(j,"colleagueGroupPK.colleagueId");
						log.info("***** member: " + member);
						
						var c5 = DatasetFactory.createConstraint("colleaguePK.colleagueId", member, member, ConstraintType.MUST); 
						colleagueDataset = DatasetFactory.getDataset("colleague", null, [c5], null);
						
						var mail = colleagueDataset.getValue(0,"mail");	
						destinatarios.push(mail);
						log.info("***** mail: " + mail);
						
					}
					
				}	
				
				
				var subject = "";
				var descripcion = "";
				
				if(modificacionDatos == "1"){
					subject = "Modificación de Datos del Cliente en Consulta: " + hAPI.getCardValue("cons_nroConsulta___" + subindicesHijos[i]);
					descripcion = "En la siguiente consulta se han modificado datos del cliente.";
				}else{
					subject = "Llamada Reiterada en Consulta: " + hAPI.getCardValue("cons_nroConsulta___" + subindicesHijos[i]);	
					descripcion = "En la siguiente consulta se ha producido una llamada reiterada.";
				}				

				var idTemplate = "raf_tpl_atencionconsultas";
				var archivoTemplate = "raf_tpl_atencionconsultas.html";
				var mimeType = "text/html";
				
				var data = {		
					"descripcion": descripcion,
					"padre_nroSolicitud": nroSolicitudPadre,
					"padre_fecha": hAPI.getCardValue("fecha"),
					"padre_hora": hAPI.getCardValue("hora"),
					"padre_origen": hAPI.getCardValue("origen"),
					"padre_nombre": hAPI.getCardValue("nombre"),
					"padre_telefono": hAPI.getCardValue("telefono"),
					"padre_mail": hAPI.getCardValue("mail"),
					"padre_direccion": hAPI.getCardValue("direccion"),
					"padre_otro": hAPI.getCardValue("otro"),
					"padre_observaciones": hAPI.getCardValue("observaciones"),
					
					"aten_nroSolicitud": hAPI.getCardValue("cons_nroSolicitud___" + subindicesHijos[i]),
					"aten_nroConsulta": hAPI.getCardValue("cons_nroConsulta___" + subindicesHijos[i]),				
					"aten_producto": hAPI.getCardValue("cons_producto___" + subindicesHijos[i]),
					"aten_activo": hAPI.getCardValue("cons_activo___" + subindicesHijos[i]),
					"aten_nroLote": hAPI.getCardValue("cons_nroLote___" + subindicesHijos[i]),
					"aten_vencimiento": hAPI.getCardValue("cons_vencimiento___" + subindicesHijos[i]),
					"aten_tipo": hAPI.getCardValue("cons_tipo___" + subindicesHijos[i]),
					"aten_observacion": hAPI.getCardValue("cons_observacion___" + subindicesHijos[i]),
					"aten_derivacion": hAPI.getCardValue("cons_derivacion___" + subindicesHijos[i]),					
					"aten_rellamada": hAPI.getCardValue("cons_rellamada___" + subindicesHijos[i]),				
				}
				
				
				// Aca se envia el mail a los destinatarios.
				log.info("***** enviando mail a destinatarios: " + destinatarios);
				for(var j in destinatarios){
					sendCustomEmail({
						 companyId: companyId, 
						 subject: subject, 
						 //from: "procesobpm@raffo.com.ar", 
						 from: "admin@totvsecm.com.ar", 
						 to: destinatarios[j], 
						 templateId: idTemplate,
						 templateDialect: "es",
						 templateHtml: archivoTemplate,
						 datos: data
					});
				}
				hAPI.setCardValue("rellamado___" + subindicesHijos[i], "0");
			
			}		
			
		}	
			
	}
	
	hAPI.setCardValue("modificacionDatos", "0");
	
}

//arqLoadLib - v1.0
function arqLoadLib(e){var t={};if(e==null){return t}var n=function(e,t){for(var n=0;n<e.length;n++){if(e[n]==t)return true}return false};var r=DatasetFactory.getDataset("arq_libreriaJS",null,null,null);for(var i=0;i<r.rowsCount;i++){var s=r.getValue(i,"lib");if(n(e,s)){var o=r.getValue(i,"src");var u=r.getValue(i,"name");try{var a=new Function("lib","return "+o);t[u]=a(t)}catch(f){log.error("*** Error compilando libreria "+s+":"+f)}}}return t}

