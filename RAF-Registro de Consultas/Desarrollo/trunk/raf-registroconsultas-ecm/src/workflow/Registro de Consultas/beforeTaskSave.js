function beforeTaskSave(colleagueId,nextSequenceId,userList){

	var tarea = getValue("WKNumState");
	var completo = getValue("WKCompletTask");
	var comentarios = getValue("WKUserComment");
	var nroSolicitudPadre = getValue("WKNumProces");
	var companyId = getValue("WKCompany");
	
	var anexoPrincipal = "";

	var telefono = hAPI.getCardValue("telefono");
	var mail = hAPI.getCardValue("mail");
	var otro = hAPI.getCardValue("otro");
	var direccion = hAPI.getCardValue("direccion");	
	var cerrarConsulta = hAPI.getCardValue("cerrarConsulta");
	
	if(telefono == "" && mail == "" && otro == "" && direccion == ""){
		throw 'Alguno de los campos Teléfono, Mail, Otro o Dirección deben ser completados.';
	}
	
	//Inicia la solicitud automaticamente
	var REGISTRAR_CONSULTA = 1;
	var MODIFICAR_CONSULTA = 2;

	if (tarea == REGISTRAR_CONSULTA && completo == "true") {
		
		if(hAPI.getCardValue("subindicesHijos") == ""){
			throw "Debe cargar al menos una consulta."; 
		}
		
		try {
			
			var subindicesHijos = hAPI.getCardValue("subindicesHijos").split(",");
			
			for(i = 0 ; i < subindicesHijos.length ; i++){
					
				var numeroConsulta = proximoNumero("R03_NRO_CONSULTA")
				
				var listaColab = new java.util.ArrayList();
				listaColab.add(hAPI.getCardValue('cons_derivacion_grupo___' + subindicesHijos[i])); 
				 
				var tipoConsulta = hAPI.getCardValue('cons_tipo___' + subindicesHijos[i])
				var descripcionProducto = hAPI.getCardValue('cons_producto___' + subindicesHijos[i])
				 
				var valoresFicha = new java.util.HashMap();
				valoresFicha.put("padre_nroSolicitud", java.lang.String.valueOf(nroSolicitudPadre));
				valoresFicha.put("nroHijo", subindicesHijos[i]);
				valoresFicha.put("derivacionCodigoGrupo", hAPI.getCardValue('cons_derivacion_grupo___' + subindicesHijos[i]));
				valoresFicha.put("anexoPrincipal", descripcionProducto + " - " + tipoConsulta + " - " + numeroConsulta);
				
				//agregar datos cabecera
				valoresFicha.put("padre_fecha", hAPI.getCardValue('fecha'));
				valoresFicha.put("padre_hora", hAPI.getCardValue('hora'));
				valoresFicha.put("padre_origen", hAPI.getCardValue('origen'));
				valoresFicha.put("padre_nombre", hAPI.getCardValue('nombre'));
				valoresFicha.put("padre_telefono", hAPI.getCardValue('telefono'));
				valoresFicha.put("padre_mail", hAPI.getCardValue('mail'));
				valoresFicha.put("padre_direccion", hAPI.getCardValue('direccion'));
				valoresFicha.put("padre_otro", hAPI.getCardValue('otro'));
				valoresFicha.put("padre_observaciones", hAPI.getCardValue('observaciones'));
				
				valoresFicha.put("aten_nroConsulta", numeroConsulta);
				valoresFicha.put("aten_producto", hAPI.getCardValue('cons_producto___' + subindicesHijos[i]));
				valoresFicha.put("aten_activo", hAPI.getCardValue('cons_activo___' + subindicesHijos[i]));
				valoresFicha.put("aten_nroLote", hAPI.getCardValue('cons_nroLote___' + subindicesHijos[i]));
				valoresFicha.put("aten_vencimiento", hAPI.getCardValue('cons_vencimiento___' + subindicesHijos[i]));
				valoresFicha.put("aten_tipo", hAPI.getCardValue('cons_tipo___' + subindicesHijos[i]));
				valoresFicha.put("aten_observacion", hAPI.getCardValue('cons_observacion___' + subindicesHijos[i]));
				valoresFicha.put("aten_derivacion", hAPI.getCardValue('cons_derivacion___' + subindicesHijos[i]));
				
				var result = hAPI.startProcess('RAF04', 6, listaColab, " " , true, valoresFicha, false);
				
				hAPI.setCardValue("cons_nroSolicitud___" + subindicesHijos[i], result.get("iProcess"));
				hAPI.setCardValue("cons_nroConsulta___" + subindicesHijos[i], numeroConsulta);
				
				anexoPrincipal = anexoPrincipal + " - " + numeroConsulta + "(" + hAPI.getCardValue('cons_nroSolicitud___' + subindicesHijos[i]) + ")";

			}
			
			anexoPrincipal = anexoPrincipal.substring(2);
			
			hAPI.setCardValue("anexoPrincipal", anexoPrincipal);
			
		} catch(e) {
			log.info("########## Erro startProcess: " + e);
			throw 'Se produjo un error al iniciar la solicitud de Atención de Consultas. Por favor, consulte con el administrador del sistema.';
		}
         
    }else if(tarea == MODIFICAR_CONSULTA && completo == "true" && cerrarConsulta != "1"){
	
		// Enviar correo electronico custom para notificar a los usuarios que tienen asignadas las tareas hijas.
		
		var subindicesHijos = hAPI.getCardValue("subindicesHijos").split(",");
		
		for(i = 0 ; i < subindicesHijos.length ; i++){
		
			var nroSolicitudHija = hAPI.getCardValue("cons_nroSolicitud___" + subindicesHijos[i]);
			var tareaHija = hAPI.getCardValue("cons_tarea___" + subindicesHijos[i]);
			var rellamado = hAPI.getCardValue("rellamado___" + subindicesHijos[i]);
			var modificacionDatos = hAPI.getCardValue("modificacionDatos");
			
			var destinatarios = new Array();
			
			log.error("############# nroSolicitudHija: " + nroSolicitudHija + " rellamado: " + rellamado);
			
			if(tareaHija != 'CONSULTA CERRADA' && tareaHija != 'CONSULTA CANCELADA' && (rellamado == '1' || modificacionDatos == '1')){
			
				var c1 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", nroSolicitudHija, nroSolicitudHija, ConstraintType.MUST); 
				var c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST); 					
				var processTaskDataset = DatasetFactory.getDataset("processTask", null, [c1,c2], null); 
				var colleagueId = processTaskDataset.getValue(0, "processTaskPK.colleagueId");  
				
				log.error("############# colleagueId: " + colleagueId);
					
				var c3 = DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST); 
				var colleagueDataset = DatasetFactory.getDataset("colleague", null, [c3], null);
				
				// Lo busco en el dataset de usuarios 
				if(colleagueDataset.rowsCount == 1){
				
					var mail = colleagueDataset.getValue(0,"mail");	
					destinatarios.push(mail);
					log.error("############# mail: " + mail);
				
				}else{
				
					// Si no esta en el dataset de usuarios entonces es un pool
					// Busco los usuarios en el dataset de usuarios por grupo 
					
					var group = colleagueId.substring(11);
					log.error("############# group: " + group);
				
					var c4 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", group, group, ConstraintType.MUST); 
					var colleagueGroupDataset = DatasetFactory.getDataset("colleagueGroup", null, [c4], null); 
				
					for(var j=0; j<colleagueGroupDataset.rowsCount; j++){
						
						var member = colleagueGroupDataset.getValue(j,'colleagueGroupPK.colleagueId');
						log.error("############# member: " + member);
						
						var c5 = DatasetFactory.createConstraint("colleaguePK.colleagueId", member, member, ConstraintType.MUST); 
						colleagueDataset = DatasetFactory.getDataset("colleague", null, [c5], null);
						
						var mail = colleagueDataset.getValue(0,"mail");	
						destinatarios.push(mail);
						log.error("############# mail: " + mail);
						
					}
					
				}	
				
				var data = new java.util.HashMap();
				var subject = '';
				var descripcion = '';
				
				if(modificacionDatos == '1'){
					subject = "Modificación de Datos del Cliente en Consulta: " + hAPI.getCardValue("cons_nroConsulta___" + subindicesHijos[i]);
					descripcion = "En la siguiente consulta se han modificado datos del cliente.";
				}else{
					subject = "Llamada Reiterada en Consulta: " + hAPI.getCardValue("cons_nroConsulta___" + subindicesHijos[i]);	
					descripcion = "En la siguiente consulta se ha producido una llamada reiterada.";
				}				
				
				var idTemplate = "raf_tpl_atencionconsultas";
				var archivoTemplate = "raf_tpl_atencionconsultas.html";
				var mimeType = "text/html";
				
				data.put("descripcion", descripcion);
				data.put("padre_nroSolicitud", nroSolicitudPadre);
				data.put("padre_fecha", hAPI.getCardValue("fecha"));
				data.put("padre_hora", hAPI.getCardValue("hora"));
				data.put("padre_origen", hAPI.getCardValue("origen"));
				data.put("padre_nombre", hAPI.getCardValue("nombre"));
				data.put("padre_telefono", hAPI.getCardValue("telefono"));
				data.put("padre_mail", hAPI.getCardValue("mail"));
				data.put("padre_direccion", hAPI.getCardValue("direccion"));
				data.put("padre_otro", hAPI.getCardValue("otro"));
				data.put("padre_observaciones", hAPI.getCardValue("observaciones"));
				
				data.put("aten_nroSolicitud", hAPI.getCardValue("cons_nroSolicitud___" + subindicesHijos[i]));
				data.put("aten_nroConsulta", hAPI.getCardValue("cons_nroConsulta___" + subindicesHijos[i]));				
				data.put("aten_producto", hAPI.getCardValue("cons_producto___" + subindicesHijos[i]));
				data.put("aten_activo", hAPI.getCardValue("cons_activo___" + subindicesHijos[i]));
				data.put("aten_nroLote", hAPI.getCardValue("cons_nroLote___" + subindicesHijos[i]));
				data.put("aten_vencimiento", hAPI.getCardValue("cons_vencimiento___" + subindicesHijos[i]));
				data.put("aten_tipo", hAPI.getCardValue("cons_tipo___" + subindicesHijos[i]));
				data.put("aten_observacion", hAPI.getCardValue("cons_observacion___" + subindicesHijos[i]));
				data.put("aten_derivacion", hAPI.getCardValue("cons_derivacion___" + subindicesHijos[i]));					
				data.put("aten_rellamada", hAPI.getCardValue("cons_rellamada___" + subindicesHijos[i]));				
				
				// Aca se envia el mail a los destinatarios.
				log.error("############# enviando mail a destinatarios: " + destinatarios);
				enviarCorreoCustom(companyId, destinatarios, subject, idTemplate, archivoTemplate, mimeType, data);
				
				hAPI.setCardValue("rellamado___" + subindicesHijos[i], "0");
			
			}		
			
		}	
			
	}
	
	hAPI.setCardValue("modificacionDatos", "0");

}