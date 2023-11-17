function beforeTaskSave(colleagueId,nextSequenceId,userList){
 
 var tareaActual = getValue("WKNumState");
 var completo = getValue("WKCompletTask");
 var nroProceso = getValue("WKNumProces");
 var tareaDestino = getValue("WKNextState");
 var companyId = getValue("WKCompany");
 
 var tareas = {
  inicio: 10,
  seleccionarSolicitante: 86,
  completarRemuneracionesYBeneficios: 11,
  aprobarSolicitudAltaEmpleadoPrimerAutorizante: 15,
  aprobarSolicitudAltaEmpleadoGteRRHH: 20,
  aprobarSolicitudAltaEmpleadoSegundoAutorizante: 22,
  revisarSolicitudAltaEmpleado: 25,
  aprobarSolicitudAltaEmpleadoN1: 32,
  aprobarSolicitudAltaEmpleadoGteGral: 40,
  notificarIngresoEmpleado: 43,
  darAltaEmpleadoEnAFIP: 45,
  completarInformacionRHPRO: 47,
  completarInformacionRHPRO2: 105,
  ingresarNuevoUsuario: 54,
  fin: 58
 };
 
 
 if(hAPI.getCardValue("ingresoPersonal") == "PE" && hAPI.getCardValue("cantidadTareasOrdenPrioridad") < 4 && completo == "true"){
  throw "Debe cargar al menos 4 tareas.";
 }
 
 if(hAPI.getCardValue("nivelEstudioSeleccionados") < 0 && completo == "true"){
  throw "Debe seleccionar al menos un nivel de estudio.";
 }
 
 if ( (tareaActual == tareas.completarInformacionRHPRO || tareaActual == tareas.completarInformacionRHPRO2) && completo == "true"){
  
  var crearEstructuraLegajo = function() {
	  var legajo = hAPI.getCardValue("legajo");
	  var carpetaLegajo = legajo + " " + hAPI.getCardValue("nombre") + " " + hAPI.getCardValue("apellido");
	  var esturctura = crearEstructuraCarpetas(legajo, carpetaLegajo);
	  hAPI.setCardValue("carpetaLegajo", esturctura["Legajo"]);
	  hAPI.setCardValue("carpetaDocumentos", esturctura["Documentos"]);
  }
  
  if(hAPI.getCardValue("vacanteACubrirConColaborador").equals("vacanteExterno")) {
	   if (existeColleague("colleaguePK.colleagueId", hAPI.getCardValue("legajo"))){
	    throw "Existe un usuario con este legajo.";
	   }
	   if(existeCarpetaLegajo(hAPI.getCardValue("legajo"))){
	    throw "La carpeta de ese Legajo ya existe.";
	   }
	   crearEstructuraLegajo();
  } else {
	
	if(!hAPI.getCardValue("vacanteACubrirConColaborador").equals("vacanteInterno")) {
		
	   var carpetaLegajo = existeCarpetaLegajo(hAPI.getCardValue("legajo"));
	  
	   if(carpetaLegajo){
		    hAPI.setCardValue("carpetaLegajo", carpetaLegajo);
		    var c1 = DatasetFactory.createConstraint("parentDocumentId", carpetaLegajo, carpetaLegajo, ConstraintType.MUST);
		    var c2 = DatasetFactory.createConstraint("documentDescription", "Documentos", "Documentos", ConstraintType.MUST);
		    var dts = DatasetFactory.getDataset("document", null, [c1,c2], null);
		   
		    if(dts.rowsCount > 0) {
		    	hAPI.setCardValue("carpetaDocumentos", dts.getValue(0, "documentPK.documentId"));     
		    } else {
		    	throw "Estructura de carpeta incorrecta."
		    }
	   } else {
		   crearEstructuraLegajo();
	   }

	}	
	
  }
 }
 
 if (tareaActual == tareas.ingresarNuevoUsuario && completo == "true"){
  var arq = arqMarvinLoad("v1", {
	   prop: "com.arquimeda.marvin.server.js.Properties-v1"
	  });
	  arq.prop.load({
	   datasetName: "parametros"
  });
  
  var crearColleague = function() {
	   colleagueService.create({
	    user: arq.prop.get("RAF06.usuarioSistema.login"),
	    password: arq.prop.get("RAF06.usuarioSistema.pass"),
	    companyId: getValue("WKCompany"),  
	    
	    newUsrColleagueId: hAPI.getCardValue("legajo"),
	    newUsrLogin: hAPI.getCardValue("nombreUsuario"),
	    newUsrPassword: "1234",
	    newUsrName: hAPI.getCardValue("nombre") + " " + hAPI.getCardValue("apellido"),
	    newUsrMail: hAPI.getCardValue("mailCorporativo"),
	    aditionalData: {
	     "FechaNacimiento": hAPI.getCardValue("fechaNacimiento"),
	    }
	   });
  }
  
  if(hAPI.getCardValue("vacanteACubrirConColaborador")=="vacanteExterno") {
	   if (existeColleague("login", hAPI.getCardValue("nombreUsuario"))) {
		   throw "El login ingresado ya existe. Por favor verifíquelo."
	   } else if (existeColleague("colleaguePK.colleagueId", hAPI.getCardValue("legajo"))){
		   throw "El legajo ingresado ya existe. Por favor verifíquelo."
	   } else {
		   crearColleague();
	   }
  } else {
	  if (existeColleague("colleaguePK.colleagueId", hAPI.getCardValue("legajo"))) {
		    userId = getValue("WKUser"); 
		    var codigoCarpeta = getCodigoDeCarpetaLugarPagoODeGrupoAdmin(userId,1);   
		    
		    var ret = ged.findFolder({
		     companyId: getValue("WKCompany"),      
		     parentId: codigoCarpeta,
		     name: hAPI.getCardValue("legajo")+" %",
		    });   
		    
		    if (ret != null) {
		    	log.info("*** ged createFolderIfNotExist: carpeta encontrada ! parentId:" + codigoCarpeta + " documentId:" + ret.getDocumentId());    
		    } else {
		    	log.info("*** ged createFolderIfNotExist: carpeta NO encontrada ! parentId:" + codigoCarpeta);   
		    	throw "No se pudo habilitar el usuario: No se movió la carpeta existente a la nueva sede, hablar con RRHH";
		    }
		    
		    colleagueService.activate({
			     user: arq.prop.get("RAF06.usuarioSistema.login"),
			     password: arq.prop.get("RAF06.usuarioSistema.pass"),
			     companyId: getValue("WKCompany"),
			     usrColleagueId: hAPI.getCardValue("legajo"),
		    });
		    
		    colleagueService.update({
			     user: arq.prop.get("RAF06.usuarioSistema.login"),
			     password: arq.prop.get("RAF06.usuarioSistema.pass"),
			     companyId: getValue("WKCompany"),
			     usrColleagueId: hAPI.getCardValue("legajo"),
			     usrActive: true,
			     usrMail: hAPI.getCardValue("mailCorporativo"),
		    });
	   } else {
		   crearColleague();
	   }
  }

  agregarPermisosUsuario(hAPI.getCardValue("legajo"), hAPI.getCardValue("carpetaLegajo"), hAPI.getCardValue("carpetaDocumentos"));
 }
 
 var c1 = DatasetFactory.createConstraint("NRO_SOLICITUD", nroProceso, nroProceso, ConstraintType.MUST),
     c2 = DatasetFactory.createConstraint("LAST_MOV", true, true, ConstraintType.MUST); 
 var obsDts = DatasetFactory.getDataset("raf-observaciones", null, [c1,c2], null);
 
 var ultimaObservacion = obsDts.getValue(0, "OBSERVACIONES");
 
 if(ultimaObservacion == ""){
  
	  if(completo == "true"){
	   
		   if((tareaActual == tareas.completarRemuneracionesYBeneficios && nextSequenceId == tareas.seleccionarSolicitante) ||
		     (tareaActual == tareas.revisarSolicitudAltaEmpleado && nextSequenceId == tareas.completarRemuneracionesYBeneficios) ||
		     ((tareaActual == tareas.aprobarSolicitudAltaEmpleadoPrimerAutorizante || tareaActual == tareas.aprobarSolicitudAltaEmpleadoGteRRHH || 
		       tareaActual == tareas.aprobarSolicitudAltaEmpleadoSegundoAutorizante || tareaActual == tareas.aprobarSolicitudAltaEmpleadoN1 || 
		       tareaActual == tareas.aprobarSolicitudAltaEmpleadoGteGral)
		       && nextSequenceId == tareas.revisarSolicitudAltaEmpleado)){
		    
			   throw "Debe realizar una observación para devolver la solicitud.";
		   }
	  }
  }
 
 
 if (tareaActual == tareas.inicio && completo == "false") {
  hAPI.setCardValue("tarea", "INICIAR SOLICITUD DE ALTA DE EMPLEADO");
 }else if (nextSequenceId == tareas.completarRemuneracionesYBeneficios && completo == "true") {
  hAPI.setCardValue("tarea", "COMPLETAR REMUNERACIONES Y BENEFICIOS");
 }else if (nextSequenceId == tareas.revisarSolicitudAltaEmpleado && completo == "true") {
  hAPI.setCardValue("tarea", "REVISAR SOLICITUD DE ALTA DE EMPLEADO");
 }else if (nextSequenceId == tareas.aprobarSolicitudAltaEmpleadoPrimerAutorizante && completo == "true") {
  hAPI.setCardValue("tarea", "APROBAR SOLICITUD DE ALTA DE EMPLEADO PRIMER AUTORIZANTE");
 }else if (nextSequenceId == tareas.aprobarSolicitudAltaEmpleadoGteRRHH && completo == "true") {
  hAPI.setCardValue("tarea", "APROBAR SOLICITUD DE ALTA DE EMPLEADO GTE RRHH");  
 }else if (nextSequenceId == tareas.aprobarSolicitudAltaEmpleadoSegundoAutorizante && completo == "true") {
  hAPI.setCardValue("tarea", "APROBAR SOLICITUD DE ALTA DE EMPLEADO SEGUNDO AUTORIZANTE");
 }else if (nextSequenceId == tareas.aprobarSolicitudAltaEmpleadoN1 && completo == "true") {
  hAPI.setCardValue("tarea", "APROBAR SOLICITUD DE ALTA DE EMPLEADO GTE N-1");
 }else if (nextSequenceId == tareas.aprobarSolicitudAltaEmpleadoGteGral && completo == "true") {
  hAPI.setCardValue("tarea", "APROBAR SOLICITUD DE ALTA DE EMPLEADO GTE GRAL");
 }else if (nextSequenceId == tareas.notificarIngresoEmpleado && completo == "true") {
  hAPI.setCardValue("tarea", "NOTIFICAR INGRESO DE EMPLEADO");
 }else if (nextSequenceId == tareas.darAltaEmpleadoEnAFIP && completo == "true") {
  hAPI.setCardValue("tarea", "DAR DE ALTA EMPLEADO EN AFIP");
 }else if ( (nextSequenceId == tareas.completarInformacionRHPRO || nextSequenceId == tareas.completarInformacionRHPRO2) && completo == "true") {
  hAPI.setCardValue("tarea", "COMPLETAR INFORMACION EN RHPRO");
 }else if (nextSequenceId == tareas.ingresarNuevoUsuario && completo == "true") {
  hAPI.setCardValue("tarea", "INGRESAR NUEVO USUARIO");
 }else if (nextSequenceId == tareas.fin && completo == "true") {
  hAPI.setCardValue("tarea", "ALTA DE EMPLEADO FINALIZADA");
 }
   
 
 if (tareaActual == tareas.notificarIngresoEmpleado && completo == "true") { 
    
	  var mails = hAPI.getCardValue("destinatarios").split(";");
	  
	  var subject = "Ingreso " + hAPI.getCardValue("sede") + " - " + hAPI.getCardValue("fechaIngreso");
	  var descripcion = "Estimados, adjuntamos los datos de un/a colaborador/a que ingresará a la compañía: ";
	  
	  var idTemplate = "RAF06-MailNotificaAlta";
	  var archivoTemplate = "RAF06-MailNotificaAlta.html";
	  var mimeType = "text/html";
	  
	  var data = {  
	    "descripcion": descripcion,
	    "empresa": hAPI.getCardValue("empresa").toUpperCase(),
	    "apellidoYnombre": hAPI.getCardValue("apellido") + ", " + hAPI.getCardValue("nombre"),
	    "cuil": hAPI.getCardValue("cuil"),
	    "nacionalidad": hAPI.getCardValue("nacionalidad"),
	    "fechaIngreso": hAPI.getCardValue("fechaIngreso"),
	    "modalidadContratacion": hAPI.getCardValue("modalidadContratacion") + " - " + hAPI.getCardValue("detalleModalidadContratacion"),
	    "convenio": hAPI.getCardValue("convenio"),
	    "fechaNacimiento": hAPI.getCardValue("fechaNacimiento"),
	    "gerencia": hAPI.getCardValue("gerencia"),
	    "sectorYCentroCosto": hAPI.getCardValue("sector") + " / " + hAPI.getCardValue("centroCosto"),
	    "puesto": ((hAPI.getCardValue("puestoNuevo")!=null && (hAPI.getCardValue("puestoNuevo")!="")) ? hAPI.getCardValue("nombrePuestoNuevo") : hAPI.getCardValue("puesto")),
	    "reportaA": hAPI.getCardValue("reportaa"), 
	    "horario": hAPI.getCardValue("horarioDesde") + " a " + hAPI.getCardValue("horarioHasta"), 
	    "sedeAdministrativa": hAPI.getCardValue("sede"), 
	    "obraSocialOfrecida": hAPI.getCardValue("obraSocial"),
	    "comedor": hAPI.getCardValue("comedor").toUpperCase(),
	    "tarjetaAcceso": hAPI.getCardValue("tarjetaAcceso").toUpperCase(),
	    "tarjetaCafeteria": hAPI.getCardValue("tarjetaCafeteria").toUpperCase(),
	    "induccion": hAPI.getCardValue("induccion").toUpperCase(),
	    "entregaDocumentacion": hAPI.getCardValue("entregaDocumentacion"),
	    "responsableAltaUsuario": hAPI.getCardValue("responsableAltaUsuario"),
	    "responsableTarjetaAcceso": hAPI.getCardValue("responsableTarjetaAcceso"),
	    "responsableTarjetaCafeteria": hAPI.getCardValue("responsableTarjetaCafeteria"),
	    "responsableTarjetasPersonales": hAPI.getCardValue("responsableTarjetasPersonales"),
	   }
	  
	  // Aca se envia el mail a los destinatarios.
	  log.info("***** enviando mail a destinatarios: " + mails);
	  for(var j in mails){
		   sendCustomEmail({
		     companyId: companyId, 
		     subject: subject, 
		     //from: "procesobpm@raffo.com.ar", 
		     from: "admin@totvsecm.com.ar", 
		     to: mails[j], 
		     templateId: idTemplate,
		     templateDialect: "es",
		     templateHtml: archivoTemplate,
		     datos: data
		   });
	  }
  
 }
 
 if (tareaActual == tareas.completarInformacionRHPRO && completo == "true") {
	 
	 log.info("***** enviando mail a destinatarios de completarInformacionRHPRO.. ");
	 
	  var mails = [];
	 
	  var usuariosRHPRO2 = getUserList("RAF06-CompletarInformacionRHPRO");
	    
      for(var i = 0; i < usuariosRHPRO2.size(); i++) { 
    	var mailsAux = getMailList(usuariosRHPRO2.get(i));
    	 for(var j = 0; j < mailsAux.size(); j++) {  
    		 log.info("***** enviando mail a completarInformacionRHPRO: " + mailsAux.get(j));
    		 mails.push(mailsAux.get(j));
    	}
      }
	  
	  var subject = "Datos de nuevo ingresante";
	  var descripcion = "Estimados, adjuntamos los datos de un/a colaborador/a que ingresará a la compañía: ";
	  
	  var idTemplate = "RAF06-MailNotificacionLegajo";
	  var archivoTemplate = "RAF06-MailNotificacionLegajo.html";
	  var mimeType = "text/html";
	  
	  var data = {  
		"descripcion": descripcion,
	    "nombre": hAPI.getCardValue("nombre"),
	    "apellido": hAPI.getCardValue("apellido"),
	    "legajo": hAPI.getCardValue("legajo"),
	    "cuil": hAPI.getCardValue("cuil"),
	    "gerencia": hAPI.getCardValue("gerencia"),
	    "reportaA": hAPI.getCardValue("reportaa"), 
	    "sector": hAPI.getCardValue("sector"),
	    "centroCosto": hAPI.getCardValue("centroCosto"),
	    "convenio": hAPI.getCardValue("convenio"),
	    "categoria": hAPI.getCardValue("categoria"),
	    "puesto": ((hAPI.getCardValue("puestoNuevo")!=null && (hAPI.getCardValue("puestoNuevo")!="")) ? hAPI.getCardValue("nombrePuestoNuevo") : hAPI.getCardValue("puesto")),
	    "lugarPago": hAPI.getCardValue("lugarPago"),
	    "sedeAdministrativa": hAPI.getCardValue("sede"), 
	   }
	  
	  
	  // Aca se envia el mail a los destinatarios.
	  log.info("***** enviando mail MailNotificacionLegajo a destinatarios: " + mails);
	  for(var j in mails){
	   sendCustomEmail({
	     companyId: companyId, 
	     subject: subject, 
	     from: "admin@totvsecm.com.ar", 
	     to: mails[j], 
	     templateId: idTemplate,
	     templateDialect: "es",
	     templateHtml: archivoTemplate,
	     datos: data
	   });
	  }
	  
 }
 
 corregirCamposFecha("fechaInicioSolicitud");
 corregirCamposFecha("fechaFinSolicitud");
 
}

var crearEstructuraCarpetas = function(legajo, carpetaLegajo) {

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
	 
	 var codigoGrupoAdmin = getCodigoDeCarpetaLugarPagoODeGrupoAdmin(userId,2);
	 var codigoCarpeta = getCodigoDeCarpetaLugarPagoODeGrupoAdmin(userId,1);
	   
	 var permisoMueveLegajo = {permission: true, attributionType: "GROUP", attributionValue: "RRHH-MUEVELEGAJO", securityLevel: "ALL"};
	 
	 var permisos = [
	  {permission: true, attributionType: "GROUP", attributionValue: "UN3-RRHH-SELE", securityLevel: "READING"},
	  {permission: true, attributionType: "GROUP", attributionValue: "UN3-RRHH-COMP", securityLevel: "MODIFICATION"},
	  {permission: true, attributionType: "GROUP", attributionValue: "UN4-RRHH-COMP-ADMP", securityLevel: "MODIFICATION"},
	  permisoMueveLegajo
	    ];
	    if (codigoGrupoAdmin != null){
	    	permisos.push({permission: true, attributionType: "GROUP", attributionValue: codigoGrupoAdmin, securityLevel: "MODIFICATION"});
	    }
	 var carpetaLegajoUsr = ged.createFolderIfNotExist({
		  user: login,
		  password: password,
		  colleagueId: sysCollegueId,
		  publisherId: userId,
		  companyId: companyId,
		  searchName: legajo + "%",
		  name: carpetaLegajo,
		  additionalComments: "",
		//  parentId: arq.prop.get("RAF06.carpetaLegajos.docId"),
		  parentId: codigoCarpeta,
		  inheritSecurity: false,
		  security: permisos
	 });
	 
	 if (carpetaLegajoUsr.getDocumentId() > 0){
		 log.info("-- carpetaLegajoUsr.getDocumentId: "+carpetaLegajoUsr.getDocumentId());
	 }
	 
	 res["Legajo"] = carpetaLegajoUsr.getDocumentId();
	 
	 var seguridadDeCarpetaDocs = permisos;
	 
	 
	 if(hAPI.getCardValue("vacanteACubrirConColaborador") != "vacanteExterno"){
		 seguridadDeCarpetaDocs.push({permission: true, attributionType: "USER", attributionValue: hAPI.getCardValue("legajo"), securityLevel:"ALL"});
	 }
	 
	 var docAprovelMode = 1;
	 
	 var carpetaDocsUsr = ged.createFolderIfNotExist({
		  user: login,
		  password: password,
		  colleagueId: sysCollegueId,
		  publisherId: userId,
		  companyId: companyId,
		  
		  name: "Documentos",
		  additionalComments: "",
		  parentId: carpetaLegajoUsr.getDocumentId(),
		  inheritSecurity: false,
		  approvers: [
			  			{approvelMode: docAprovelMode, colleagueId: sysCollegueId, levelDescription: "Aprobacion Administracion de Personal"},   //UN4-RRHH-COMP-ADMP
			  		],
		  security: seguridadDeCarpetaDocs
	 });
	
	 res["Documentos"] = carpetaDocsUsr.getDocumentId();
	 
	 
	 //actualizarAprobador se creó debido a que Fluig tiene un bug en la parte del servicio web en donde le agrega un aprobador a la carpeta: 
	 // No funciona si el nuevo aprobador es un grupo, este chequeo está bien hecho en la parte de seguridad pero no en la de aprobación.
	 actualizarAprobador(hAPI.getCardValue("grupoAprobadorRRHH"),res["Documentos"],docAprovelMode);  //(codigoGrupo,codigoCarpeta,approverType)
	 
	 var carpetaConfidencialUsr = ged.createFolderIfNotExist({
	  user: login,
	  password: password,
	  colleagueId: sysCollegueId,
	  publisherId: userId,
	  companyId: companyId,
	  
	  name: "Confidencial",
	  additionalComments: "",
	  parentId: carpetaLegajoUsr.getDocumentId(),
	  inheritSecurity: false,
	  security: permisos
	 });
	 res["Confidencial"] = carpetaConfidencialUsr.getDocumentId();
	 
	 var carpetaSPUsr = ged.createFolderIfNotExist({
	  user: login,
	  password: password,
	  colleagueId: sysCollegueId,
	  publisherId: userId,
	  companyId: companyId,
	  name: "Desarrollo organizacional",
	  additionalComments: "",
	  parentId: carpetaConfidencialUsr.getDocumentId(),
	  inheritSecurity: false,
	  security: [
	            {permission: true, attributionType: "GROUP", attributionValue: "UN3-RRHH-SELE", securityLevel: "MODIFICATION"},
	            permisoMueveLegajo
	            ]
	 });
	 res["Seleccion de Personal"] = carpetaSPUsr.getDocumentId();
	 
	 var carpetaAPUsr = ged.createFolderIfNotExist({
	  user: login,
	  password: password,
	  colleagueId: sysCollegueId,
	  publisherId: userId,
	  companyId: companyId,
	  
	  name: "Administracion de Personal",
	  additionalComments: "",
	  parentId: carpetaConfidencialUsr.getDocumentId(),
	  inheritSecurity: false,
	  security: [
	            {permission: true, attributionType: "GROUP", attributionValue: "UN3-RRHH-COMP", securityLevel: "MODIFICATION"},
	            {permission: true, attributionType: "GROUP", attributionValue: "UN4-RRHH-COMP-ADMP", securityLevel: "MODIFICATION"},
	            permisoMueveLegajo
	            ]
	 });
	 res["Administracion de Personal"] = carpetaAPUsr.getDocumentId();
	 
	 return res;
}

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
	  sysColleagueId = arq.prop.get("RAF06.usuarioSistema.id");
	 
	 ged.updateFolder({
	  user: login,
	  password: password,
	  colleagueId: sysColleagueId,
	  companyId: companyId,
	  
	  docId: carpetaLegajo,
	  security: [{permission:true, attributionType:"USER", attributionValue: matricula, securityLevel:"READING"}]
	 });
	 
	 var docAprovelMode = 1;
	 
	 var respuestaDoc = ged.updateFolder({
	  user: login,
	  password: password,
	  colleagueId: sysColleagueId,
	  companyId: companyId,
	  
	  docId: carpetaDocumentos,
	  approvers: [
	         {approvelMode: docAprovelMode, colleagueId: sysColleagueId, levelDescription: "Aprobacion Administracion de Personal"},
	      ],
	  security: [{permission:true, attributionType:"USER", attributionValue: matricula, securityLevel:"MODIFICATION"}]
	 });
	 
	 /* Al existir un bug en fluig que no permite poner de aprobador a un grupo por ws. Se le asigna un aprobador del systema (random)
	  * Y despues se sobrescribe manualmente con la función de abajo */
	 actualizarAprobador(hAPI.getCardValue("grupoAprobadorRRHH"),carpetaDocumentos,docAprovelMode);
	 
	 log.info("***** el mensaje de respuesta al actualizar la carpeta de documentos es: " + respuestaDoc.getWebServiceMessage());
 
}

var colleagueService = {
  create: function(params){
   var opts = this.simpleMerge({
    user: "adm", //login do usuário.
    password: "adm", //senha do usuário.
    companyId: getValue("WKCompany"), //código da empresa.
    
    newUsrColleagueId: "",
    newUsrLogin: "", //login do novo usuário.
    newUsrPassword: "", //senha do novo usuário.
    newUsrName: "",
    newUsrMail: "",
    newUsrLenguaje: "es",
    
    aditionalData: {},
    jndiName: "java:/jdbc/FluigDS",
    
    workflowPackage: "com.totvs.technology.ecm.foundation.ws",
    workflowServiceName: "ECMColleagueService",
    
    log: 0
   }, params);
   
   if (opts.log) log.info("** Obteniendo Servicio: " + opts.workflowServiceName + " Package: " + opts.workflowPackage);

   var serviceHelper = ServiceManager.getService(opts.workflowServiceName).getBean(),
   serviceLocator = serviceHelper.instantiate(opts.workflowPackage + ".ECMColleagueServiceService"),
   service = serviceLocator.getColleagueServicePort();
   
   // Configuro el usuario
   var colleagueDtoArray = serviceHelper.instantiate(opts.workflowPackage + ".ColleagueDtoArray");
   
   var colleagueDto = serviceHelper.instantiate(opts.workflowPackage + ".ColleagueDto"); 
   colleagueDto.setColleagueId(opts.newUsrColleagueId);
   colleagueDto.setLogin(opts.newUsrLogin);
   colleagueDto.setColleagueName(opts.newUsrName);
   colleagueDto.setPasswd(this.passwordDigest(opts.newUsrPassword));
   colleagueDto.setCompanyId(opts.companyId);
   colleagueDto.setMail(opts.newUsrMail);
   colleagueDto.setActive(true);
         colleagueDto.setAdminUser(false);
         colleagueDto.setDialectId(opts.newUsrLenguaje);
         colleagueDto.setDefaultLanguage(opts.newUsrLenguaje);
         
         // Adiciona colaborador no array de colaboradores.
         colleagueDtoArray.getItem().add(colleagueDto);
   
         // Creo el usuario
         if (opts.log) log.info("** Creando Usuario: " + opts.newUsrColleagueId);
         var result = service.createColleague(opts.user, opts.password, parseInt(opts.companyId), colleagueDtoArray);
         if (opts.log) log.info("** Resultado: " + result);
        
         if (result.equals("ok")) {
          if (Object.keys(opts.aditionalData).length > 0) {
           if (opts.log) log.info("** Añadiendo data al usuario");
           this.addUserData({
         jndiName: opts.jndiName,
         usrCode: opts.newUsrColleagueId,
         userData: opts.aditionalData,
         log: opts.log,
        });
          }
         } else {
          throw result;
         }
         return result;
  },
  
  update: function(params){
   var opts = this.simpleMerge({
    user: "adm", //login do usuário.
    password: "adm", //senha do usuário.
    companyId: getValue("WKCompany"), //código da empresa.
    usrColleagueId: "", //matricula del usuario a updetear
    
    usrActive: null,
    usrPassword: null, 
    usrName: null,
    usrMail: null,
    
    workflowPackage: "com.totvs.technology.ecm.foundation.ws",
    workflowServiceName: "ECMColleagueService",
    
    log: 0
   }, params);
   
   if (opts.log) log.info("** Obteniendo Servicio: " + opts.workflowServiceName + " Package: " + opts.workflowPackage);

   var serviceHelper = ServiceManager.getService(opts.workflowServiceName).getBean(),
   serviceLocator = serviceHelper.instantiate(opts.workflowPackage + ".ECMColleagueServiceService"),
   service = serviceLocator.getColleagueServicePort();
   
   // Obtengo el usuario
   var colleagueDtoArray = service.getColleague(opts.user, opts.password, parseInt(opts.companyId), opts.usrColleagueId);
   var colleagueDto = colleagueDtoArray.getItem().get(0);
   
   if(colleagueDto.getCompanyId()==0) {
    throw "El usuario no existe."
   }
   
   // Configuro el usuario
   if (opts.usrActive != null) colleagueDto.setActive(opts.usrActive);
   if (opts.usrMail != null) colleagueDto.setMail(opts.usrMail);
   if (opts.usrName != null) colleagueDto.setColleagueName(opts.usrName);
         if (opts.usrPassword != null) colleagueDto.setPasswd(opts.usrPassword);
         
         // Creo el usuario
         if (opts.log) log.info("** Actualizando Usuario: " + opts.newUsrColleagueId);
         var result = service.updateColleague(opts.user, opts.password, parseInt(opts.companyId), colleagueDtoArray);
         if (opts.log) log.info("** Resultado: " + result);
        
         return result;
  },
  
  activate: function(params){
   var opts = this.simpleMerge({
    user: "adm", //login do usuário.
    password: "adm", //senha do usuário.
    companyId: getValue("WKCompany"), //código da empresa.
    usrColleagueId: "", //matricula del usuario a updetear
    
    workflowPackage: "com.totvs.technology.ecm.foundation.ws",
    workflowServiceName: "ECMColleagueService",
    
    log: 0
   }, params);
   
   if (opts.log) log.info("** Obteniendo Servicio: " + opts.workflowServiceName + " Package: " + opts.workflowPackage);

   var serviceHelper = ServiceManager.getService(opts.workflowServiceName).getBean(),
   serviceLocator = serviceHelper.instantiate(opts.workflowPackage + ".ECMColleagueServiceService"),
   service = serviceLocator.getColleagueServicePort();
   
   // Activo el usuario
         var result = service.activateColleague(opts.user, opts.password, parseInt(opts.companyId), opts.usrColleagueId);
         if (opts.log) log.info("** Resultado: " + result);
        
         return result;
  },
  
  addUserData: function(params){
   var opts = this.simpleMerge({
    jndiName: "java:/jdbc/FluigDS",
    usrCode: "",
    userData: {},
    log: 0,
   }, params);
   
   var conn = null,
    pstmt = null;
   
   try {
    
    if (opts.log) log.info("** Obteniendo conexion " + opts.jndiName);
    
    conn = new javax.naming.InitialContext().lookup(opts.jndiName).getConnection();   
          
    var sql = "INSERT INTO FDN_USERDATA " +
       " (DATA_KEY, DATA_VALUE, USER_TENANT_ID) " +
       "VALUES ( " +
       " ?, " +
       " ?," +
       " (SELECT USER_TENANT_ID FROM FDN_USERTENANT WHERE USER_CODE=?) " + 
       ") ";
       
    pstmt = conn.prepareStatement(sql);
    pstmt.setString(3, opts.usrCode);
    
    for (userDataKey in opts.userData) {
     pstmt.setString(1, userDataKey);
     pstmt.setString(2, opts.userData[userDataKey]);
     
     if (opts.log) log.info("** Ejecutando Statement " + sql);
     if (opts.log) log.info("**** Con Parametros: [" + tenantId + "," + strData + "]");
     
     pstmt.executeUpdate();     
    }

   } catch (ex) {
    log.error("*** colleagueService addUserData: " + ex);
      } finally {
          if (pstmt != null) { pstmt.close(); }
          if (conn != null) { conn.close(); }
      }
  },
  
  passwordDigest: function(password){
   var md = java.security.MessageDigest.getInstance("MD5");
         var javaPass = new java.lang.String(password);
   var hash = new java.math.BigInteger(1, md.digest(javaPass.getBytes()));
         var s = hash.toString(16);
         if (s.length() %2 != 0) {
             s = "0" + s;
         }
         return s;
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
         
   var sql = "SELECT [NR_DOCUMENTO] AS documentId," +
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
  
  log.error("opts.user: " + opts.user + " opts.password: " + opts.password + " opts.companyId: " + opts.companyId + " opts.docId: " + opts.docId);
  log.error("opts.user: " + opts.user + " opts.password: " + opts.password + " parseInt(opts.companyId): " + parseInt(opts.companyId) + " parseInt(opts.docId): " + parseInt(opts.docId));
  
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


/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};

