function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var nroProceso = getValue("WKNumProces");
	var completo = getValue('WKCompletTask');
	var tarea = getValue("WKNumState");
	var userId = getValue("WKUser");
	var comentarios = getValue("WKUserComment");
	var dateParser = new java.text.SimpleDateFormat("yyyy-MM-dd");
	
	var ejb = new javax.naming.InitialContext().lookup("java:global/raf-inversioncomercial-backend/InversionComercialEJB");
	
	log.error('**** BeforeTaskSave RAF08; userId: ' + userId + '; tarea: ' + tarea + '; completo? : ' + completo + '; nextSequenceId:' + nextSequenceId);
	
	var tareas = {
			'IniciarSolicitud': 0,
			'Inicial': 4,
			'esAPM': 5,
			'RevisarAprobarIC' : 7,
			'AprobarICGteArea' : 9,
			'CompletarIC' : 12,
			'AprobarICGtePromo' : 19,
			'EjecutarInversion' : 41,
			'Rechazada' : 35,
			'Finalizada' : 44,
			'CartaAcuerdoRechazada' : 55,
			'CerrarInversionComercial' : 63,
			'Medical' : 69, 
			'PresupuestoDelegado': 77,
			'AbiertoPosibleBaja': 86,
			'FinalizadaBajaMedico': 87
		};
	
	
	if (tarea == tareas.Inicial && completo == "true") {

		log.error('**** BeforeTaskSave Inicial  ');
		
		setDelegado();
		validarFechaCorte();
		validarDocumentos(nroProceso, ejb);
		
		hAPI.setCardValue("fechaSolicitud", dateParser.format(new Date()));
		hAPI.setCardValue("tarea", "INICIAR SOLICITUD");
		saveInversionComercial(ejb, nroProceso, "PENDIENTE");
		
	}
	
	if (tarea == tareas.Inicial && completo == 'false') {
		
		log.error('**** BeforeTaskSave Inicial guardar ');
		
		setDelegado();
		validarDocumentos(nroProceso, ejb);
		
		hAPI.setCardValue("fechaSolicitud", dateParser.format(new Date()));
		hAPI.setCardValue("tarea", "INICIAR SOLICITUD");
		saveInversionComercial(ejb, nroProceso, "PENDIENTE");
		
	}else if (nextSequenceId == tareas.RevisarAprobarIC && completo == "true") {
		
		if (tarea != tareas.AprobarICGteArea && tarea != tareas.AprobarICGtePromo && completo == "true") {
			validarDocumentos(nroProceso, ejb);
		}
		hAPI.setCardValue("tarea", "REVISAR Y APROBAR (GTE DISTRITO)");
		saveInversionComercial(ejb, nroProceso, "PENDIENTE");
	
	}else if (nextSequenceId == tareas.PresupuestoDelegado && completo == "true") {
		
		validarFechaCorte();
		validarPresupuesto();
		validarExistenciaDocumentos();
		validarDocumentos(nroProceso, ejb);
		setDelegado();
		
		hAPI.setCardValue("matriculaGteDistrito", userId);
		saveInversionComercial(ejb, nroProceso, "PENDIENTE");
		
		
	}else if (nextSequenceId == tareas.AprobarICGteArea && completo == "true") {

		validarExistenciaDocumentos();	
		validarDocumentos(nroProceso, ejb);	
		
		hAPI.setCardValue("tarea", "APROBAR (GTE AREA)");
		hAPI.setCardValue("matriculaGteDistrito", userId);
		saveInversionComercial(ejb, nroProceso, "PENDIENTE");
		
	}else if (nextSequenceId == tareas.CompletarIC && completo == "true") {

		if(hAPI.getCardValue("esAPM") != 'true'){
			validarPresupuesto();
		}
		hAPI.setCardValue("tarea", "COMPLETAR (APM)");
		saveInversionComercial(ejb, nroProceso, "PENDIENTE");
		
	}else if (nextSequenceId == tareas.AprobarICGtePromo && completo == "true") {
		
		hAPI.setCardValue("tarea", "APROBAR (GTE PROMOCION)");
		ejb.actualizarEstado(java.lang.Integer.parseInt(nroProceso), "APROBAR (GTE PROMOCION)", "PENDIENTE");
		
	}else if(nextSequenceId == tareas.Medical && completo == "true"){
		
		setDelegado();
		validarExistenciaDocumentos();
			
		hAPI.setCardValue("tarea", "MEDICAL");
		ejb.actualizarEstado(java.lang.Integer.parseInt(nroProceso), "MEDICAL", "APROBADA");
		saveInversionComercial(ejb, nroProceso, "APROBADA");
		
		log.info("######### Iniciando proceso RAF-09. ");
		iniciarProcesoCartaAcuerdo(ejb, nroProceso);
		log.info("######### Fin proceso RAF-09. ");
		
	}else if (nextSequenceId == tareas.EjecutarInversion && completo == "true") {
		
		hAPI.setCardValue("tarea", "EJECUTAR INVERSION");
		ejb.actualizarEstado(java.lang.Integer.parseInt(nroProceso), "EJECUTAR INVERSION", "APROBADA");
				
		//sendMail("RAF08-Medicos");
		
	}else if (nextSequenceId == tareas.CerrarInversionComercial && completo == "true") {
		
		hAPI.setCardValue("tarea", "CERRAR INVERSION COMERCIAL");
		ejb.actualizarEstado(java.lang.Integer.parseInt(nroProceso), "CERRAR INVERSION COMERCIAL", "APROBADA");
		
	}else if (nextSequenceId == tareas.Rechazada && completo == "true") {
		
		hAPI.setCardValue("tarea", "SOLICITUD RECHAZADA");
		ejb.actualizarEstado(java.lang.Integer.parseInt(nroProceso), "SOLICITUD RECHAZADA", "RECHAZADA");
		
		var motivoRechazo = hAPI.getCardValue("motivoRechazo");
		if (motivoRechazo == ""){
			throw "El motivo de rechazo es obligatorio.";
		}
		ejb.actualizarMotivoRechazo(java.lang.Integer.parseInt(nroProceso), motivoRechazo);
		
		sendMail("RAF08-Rechazada");
		
	}else if (nextSequenceId == tareas.CartaAcuerdoRechazada && completo == "true") {
		
		hAPI.setCardValue("tarea", "CARTA ACUERDO RECHAZADA");
		ejb.actualizarEstado(java.lang.Integer.parseInt(nroProceso), "CARTA ACUERDO RECHAZADA", "CARTA_ACUERDO_RECHAZADA");
	
	}else if (nextSequenceId == tareas.Finalizada && completo == "true") {
		
		hAPI.setCardValue("tarea", "SOLICITUD FINALIZADA");
		ejb.actualizarEstado(java.lang.Integer.parseInt(nroProceso), "SOLICITUD FINALIZADA", "FINALIZADA");
		
		var requestFolderId = createRequestFolder();
		uploadAttachmentsToGed(requestFolderId);
	
	}else if (nextSequenceId == tareas.AbiertoPosibleBaja && completo == "true") {
		
		hAPI.setCardValue("tarea", "ABIERTO POSIBLE BAJA");
		ejb.actualizarEstado(java.lang.Integer.parseInt(nroProceso), "ABIERTO POSIBLE BAJA", "APROBADA");
				
		//sendMail("RAF08-Medicos");

	}else if (nextSequenceId == tareas.FinalizadaBajaMedico && completo == "true") {
		
		hAPI.setCardValue("tarea", "FINALIZADA BAJA MEDICO");
		ejb.actualizarEstado(java.lang.Integer.parseInt(nroProceso), "FINALIZADA BAJA MEDICO", "BAJA_MEDICO");
		
	}

	// Para chequear que exista al menos 1 imputacion 
	if(nextSequenceId != tareas.Rechazada && nextSequenceId != tareas.CompletarIC && completo == 'true'){

		if(hAPI.getCardValue("esAPM") != 'true'){
			
			validExistenciaPresupuestosEnBecas();
			
			if(
					hAPI.getCardValue("selAlojamientoPresupuesto") == "DELEGADO" ||
					hAPI.getCardValue("selTrasladoPresupuesto") == "DELEGADO" ||
					hAPI.getCardValue("selInscripcionPresupuesto") == "DELEGADO" 
			){

				if (new java.math.BigDecimal(formatBigDecimal(hAPI.getCardValue("importe"))).setScale(2,java.math.RoundingMode.HALF_UP).compareTo(new java.math.BigDecimal("0.00")) < 1){
					throw "El importe de la inversión debe ser mayor a 0,00.";
				}
				
				if(hAPI.getCardValue("porcentajeImputado___1") == null && completo == 'true'){
					throw "Debe cargar al menos una imputación.";
				}
				
				if (!new java.math.BigDecimal(formatBigDecimal(hAPI.getCardValue("porcentajeImputadoTotal"))).setScale(2,java.math.RoundingMode.HALF_UP).equals(new java.math.BigDecimal("100.00"))){
					throw "La suma de las imputaciones debe ser igual al 100%.";
				}	
			}
				
		}

	}
	
	// validar que al devolver la solicitud agreguen un comentario
	if(((tarea == tareas.RevisarAprobarIC && nextSequenceId == tareas.CompletarIC) ||
			(tarea == tareas.AprobarICGteArea  && nextSequenceId == tareas.RevisarAprobarIC) ||
			(tarea == tareas.AprobarICGtePromo && nextSequenceId == tareas.RevisarAprobarIC))
			&& completo == 'true') {
		
		if (comentarios == ""){
			throw "Debe realizar una observación para devolver la solicitud.";
		}
		
	}
	
	//Gte De promoción: devuelve al Gte de Distrito avisar al Gte de Área un campo con leyenda "Esta solicitud ya fue aprobada y solicita una modificación".
	if(tarea == tareas.AprobarICGtePromo && nextSequenceId == tareas.RevisarAprobarIC && completo == 'true') {
		hAPI.setCardValue("notificacionGte", 'true');
	}
	
}
//Campo utilizado en proceso RAF09 para determinar a que tarea avanza la solicitud de RAF08 relacionada.
function setDelegado(){
	
	var selAlojamientoPresupuesto = hAPI.getCardValue("selAlojamientoPresupuesto");
	var selTrasladoPresupuesto = hAPI.getCardValue("selTrasladoPresupuesto");
	var selInscripcionPresupuesto = hAPI.getCardValue("selInscripcionPresupuesto");
	var tipoInversion = hAPI.getCardValue("tipoInversion");
	
	
	if(selAlojamientoPresupuesto == "DELEGADO" || selTrasladoPresupuesto  == "DELEGADO" || selInscripcionPresupuesto  == "DELEGADO" || tipoInversion == "patrocinio"){
		hAPI.setCardValue("delegado", true);
	}else {
		hAPI.setCardValue("delegado", false);
	}
	
}

function validarExistenciaDocumentos(){
	
	if(
		hAPI.getCardValue("selAlojamientoPresupuesto") == "DELEGADO" ||
		hAPI.getCardValue("selTrasladoPresupuesto") == "DELEGADO" ||
		hAPI.getCardValue("selInscripcionPresupuesto") == "DELEGADO" ||
		hAPI.getCardValue("tipoInversion")  == "patrocinio"
	){
		if(hAPI.getCardValue("cartaPetitorio") == "" || hAPI.getCardValue("cartaAcuerdo") == ""){
			throw "Adjuntar documentación requerida: Carta Petitorio y Carta Acuerdo.";
		}
	}

	if(hAPI.getCardValue("selAlojamientoPresupuesto") != "DELEGADO" &&
			hAPI.getCardValue("selTrasladoPresupuesto") != "DELEGADO" &&
			hAPI.getCardValue("selInscripcionPresupuesto") != "DELEGADO")
	{
		if(hAPI.getCardValue("cartaAcuerdo") == ""){
			throw "Adjuntar documentación requerida: Carta Acuerdo.";
		}
		
	}
	
}

function validarDocumentos(nroProceso, ejb){

	var cartaPetitorio = hAPI.getCardValue("cartaPetitorio");
	var cartaAcuerdo = hAPI.getCardValue("cartaAcuerdo");
	var flyer = hAPI.getCardValue("flyer");
	var cartaPetitorioDocumentId = hAPI.getCardValue("cartaPetitorioDocumentId");
	var cartaAcuerdoDocumentId = hAPI.getCardValue("cartaAcuerdoDocumentId");
	var flyerDocumentId = hAPI.getCardValue("flyerDocumentId");
	
	try{
		
		if(cartaPetitorio != "" || cartaAcuerdo != "" || flyer != ""){
			log.info("####### validarDocumentosSeleccionados para Solicitud: " + nroProceso);
			
			ejb.validarDocumentosSeleccionados(nroProceso, cartaPetitorio, cartaAcuerdo, flyer, cartaPetitorioDocumentId, cartaAcuerdoDocumentId, flyerDocumentId);
			
			log.info("####### fin validarDocumentosSeleccionados para Solicitud: " + nroProceso);
		}
	} catch (e){
		throw "Si modificó los documentos anexos debe volver a seleccionarlos en el formulario. Verifique que los mismos no contengan carateres especiales.";
	}
	
}

function validExistenciaPresupuestosEnBecas(){
	
	var tipoInversion = hAPI.getCardValue("tipoInversion");
	
	if((tipoInversion == 'becaNac' || tipoInversion == 'becaInt') &&
		hAPI.getCardValue("incluyeAlojamiento") == "NO" && hAPI.getCardValue("incluyeTraslado") == "NO" && hAPI.getCardValue("incluyeInscripcion") == "NO"){
		throw "Debe incluir al menos un presupuesto.";
	}
}

function validarFechaCorte(){
	
	if(hAPI.getCardValue("diasLimiteCarga") != ""){
		
		var diasLimiteCarga = java.lang.Integer.parseInt(hAPI.getCardValue("diasLimiteCarga"));
		var fechaDesdeCongreso = hAPI.getCardValue("fechaDesdeCongreso").split("/");
		
		var timeDesdeCongreso = new Date(fechaDesdeCongreso[2],fechaDesdeCongreso[1]-1,fechaDesdeCongreso[0]).getTime();
		var timeCorte = timeDesdeCongreso + (1000*60*60*24 - 1) - (diasLimiteCarga*1000*60*60*24);
		var currentDate = new Date();
	
		log.info("timeDesdeCongreso: " + timeDesdeCongreso + ", diasLimiteCarga: " + diasLimiteCarga + ", timeCorte: " + timeCorte + ", currentDate: " + currentDate + ", currentDate.getTime() " + currentDate.getTime());
		
		if (timeCorte < currentDate.getTime()){
			throw "No es posible iniciar la solicitud para la fecha del evento solicitado.";
		}
	}
	
}

function validarPresupuesto(){
	
	var presupuestoHabilitado = hAPI.getCardValue("presupuestoHabilitado");
	var incluyeAlojamiento = hAPI.getCardValue("incluyeAlojamiento");
	var incluyeTraslado = hAPI.getCardValue("incluyeTraslado");
	var incluyeInscripcion = hAPI.getCardValue("incluyeInscripcion");
	var selAlojamientoPresupuesto = hAPI.getCardValue("selAlojamientoPresupuesto");
	var selTrasladoPresupuesto = hAPI.getCardValue("selTrasladoPresupuesto");
	var selInscripcionPresupuesto = hAPI.getCardValue("selInscripcionPresupuesto");
	
	if(presupuestoHabilitado == "MARKETING" || presupuestoHabilitado == "DELEGADO"){
		if(
			(incluyeAlojamiento == "NO" || (incluyeAlojamiento == "SI" && selAlojamientoPresupuesto == presupuestoHabilitado)) &&
			(incluyeTraslado == "NO" || (incluyeTraslado == "SI" && selTrasladoPresupuesto == presupuestoHabilitado)) &&
			(incluyeInscripcion == "NO" || (incluyeInscripcion == "SI" && selInscripcionPresupuesto == presupuestoHabilitado)) 
		){
			
			log.info("Presupuesto correcto. ");
			
		}else{
			throw "El presupuesto seleccionado no está habilitado para el evento.";
		}

	}else{
		log.info("Presupuesto correcto COMBINADO. ");
	}
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
	
	var login = arq.prop.get("RAF08.usuarioSistema.login");
	var password = arq.prop.get("RAF08.usuarioSistema.pass");
	var sysCollegueId = arq.prop.get("RAF08.usuarioSistema.id");
	var carpetaAdjuntosId = arq.prop.get("RAF08.carpetaAdjuntos.docId");
	
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
			attributionValue: "RAF08-GTOR-PROCESO", 
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
        doc.setVersionDescription("RAF08: " + getValue("WKNumProces"));
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

function saveInversionComercial(ejb, nroProceso, estado){
	
	log.info("****** save IC ");

	var cardData = hAPI.getCardData(nroProceso);
	var qtyImputaciones = howManyChildsOf("newProd",cardData);
	
	log.info("****** save IC cant child: " + qtyImputaciones);
	
	var inversionComercialDTO = ejb.newInversionComercial();
	var sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
	var simpleDateFormat = new java.text.SimpleDateFormat("dd/MM/yyyy");
	var sdfMes = new java.text.SimpleDateFormat("MM/yyyy");
	
	var fechaSolicitud = hAPI.getCardValue("fechaSolicitud") != "" ? sdf.parse(hAPI.getCardValue("fechaSolicitud")) : null;
	
	log.info("****** fechaSolicitud: " + fechaSolicitud);
	
	log.info("****** fechaVtoPasaporte: "+ hAPI.getCardValue("fechaVtoPasaporte"));
	log.info("****** fechaNacimiento: "+ hAPI.getCardValue("fechaNacimiento"));
	
	inversionComercialDTO.setNumeroSolicitud(java.lang.Integer.parseInt(nroProceso));
	inversionComercialDTO.setFechaSolicitud(fechaSolicitud);
	inversionComercialDTO.setMatriculaSolicitante(hAPI.getCardValue("matriculaSolicitante"));
	inversionComercialDTO.setEsAPM(hAPI.getCardValue("esAPM") == "true"? true: false);
	inversionComercialDTO.setAreaCodigo(hAPI.getCardValue("areaCodigo"));
	inversionComercialDTO.setAreaDescripcion(hAPI.getCardValue("area"));
	inversionComercialDTO.setDistritoCodigo(hAPI.getCardValue("distritoCodigo"));
	inversionComercialDTO.setDistritoDescripcion(hAPI.getCardValue("distrito"));
	inversionComercialDTO.setCodGrupoGteArea(hAPI.getCardValue("codGrupoGteArea"));
	inversionComercialDTO.setCodGrupoGteDistrito(hAPI.getCardValue("codGrupoGteDistrito"));   
	inversionComercialDTO.setCodGrupoAsistenteDistrito(hAPI.getCardValue("codGrupoAsistDistrito"));
	inversionComercialDTO.setCodGrupoGtePromocion(hAPI.getCardValue("codGrupoGtePromocion"));
	inversionComercialDTO.setLimiteAprGtePromo(new java.math.BigDecimal(hAPI.getCardValue("limiteAprGtePromo") != "" ? formatBigDecimal(hAPI.getCardValue("limiteAprGtePromo")) : 0))
	inversionComercialDTO.setNotificacionGte(hAPI.getCardValue("notificacionGte"));
	inversionComercialDTO.setSolicitante(hAPI.getCardValue("solicitante"));
	//inversionComercialDTO.setGrupoGteDistrito(hAPI.getCardValue("grupoGteDistrito"));
	inversionComercialDTO.setNombreAPM(hAPI.getCardValue("nombreAPM"));
	inversionComercialDTO.setMatriculaAPM(hAPI.getCardValue("matriculaAPM"));
	inversionComercialDTO.setEmailAPM(hAPI.getCardValue("emailAPM"));
	inversionComercialDTO.setTipoInversion(hAPI.getCardValue("tipoInversion"));
	inversionComercialDTO.setCiudad(hAPI.getCardValue("ciudad"));
	inversionComercialDTO.setApellido(hAPI.getCardValue("apellido"));
	inversionComercialDTO.setNombre(hAPI.getCardValue("nombre"));
	inversionComercialDTO.setDni(hAPI.getCardValue("dni"));
	inversionComercialDTO.setTipoDocumento(hAPI.getCardValue("tipoDocumento"));
	inversionComercialDTO.setNumeroDocumento(hAPI.getCardValue("numeroDocumento"));
	inversionComercialDTO.setNumeroPasaporte(hAPI.getCardValue("numeroPasaporte"));
	inversionComercialDTO.setFechaVtoPasaporte(hAPI.getCardValue("fechaVtoPasaporte") != "" ? simpleDateFormat.parse(hAPI.getCardValue("fechaVtoPasaporte")) : null);
	inversionComercialDTO.setSexo(hAPI.getCardValue("sexo") != ""? hAPI.getCardValue("sexo") : "");
	inversionComercialDTO.setFechaNacimiento(hAPI.getCardValue("fechaNacimiento") != "" ? simpleDateFormat.parse(hAPI.getCardValue("fechaNacimiento")) : null);
	inversionComercialDTO.setNacionalidad(hAPI.getCardValue("nacionalidad"));
	inversionComercialDTO.setDomicilio(hAPI.getCardValue("domicilio"));
	inversionComercialDTO.setLocalidad(hAPI.getCardValue("localidad"));
	inversionComercialDTO.setProvincia(hAPI.getCardValue("provincia"));
	inversionComercialDTO.setPais(hAPI.getCardValue("pais"));
	inversionComercialDTO.setCodigoPostal(hAPI.getCardValue("codigoPostal"));
	inversionComercialDTO.setTelefonoContacto(hAPI.getCardValue("telefonoContacto"));
	inversionComercialDTO.setCelular(hAPI.getCardValue("celular"));
	inversionComercialDTO.setMailContacto(hAPI.getCardValue("mailContacto"));
	inversionComercialDTO.setMotivoViaje(hAPI.getCardValue("motivoViaje"));
	inversionComercialDTO.setEspecialidadProfesional(hAPI.getCardValue("especialidadProfesional"));
	inversionComercialDTO.setNombreCongreso(hAPI.getCardValue("nombreCongreso"));
	inversionComercialDTO.setLugarCongreso(hAPI.getCardValue("lugarCongreso"));
	inversionComercialDTO.setFechaDesdeCongreso(hAPI.getCardValue("fechaDesdeCongreso") != "" ? simpleDateFormat.parse(hAPI.getCardValue("fechaDesdeCongreso")) : null);
	inversionComercialDTO.setFechaHastaCongreso(hAPI.getCardValue("fechaHastaCongreso") != "" ? simpleDateFormat.parse(hAPI.getCardValue("fechaHastaCongreso")) : null);
	inversionComercialDTO.setIdCongreso(hAPI.getCardValue("idCongreso") != "" ? java.lang.Integer.parseInt(hAPI.getCardValue("idCongreso")) : null);
	inversionComercialDTO.setNombreHotel(hAPI.getCardValue("nombreHotel"));
	inversionComercialDTO.setContactoHotel(hAPI.getCardValue("contactoHotel"));
	inversionComercialDTO.setTelefonoHotel(hAPI.getCardValue("telefonoHotel"));
	inversionComercialDTO.setCheckinHotel(hAPI.getCardValue("checkinHotel"));
	inversionComercialDTO.setCheckoutHotel(hAPI.getCardValue("checkoutHotel"));
	inversionComercialDTO.setTipoHabitacion(hAPI.getCardValue("tipoHabitacion"));
	//inversionComercialDTO.setCantidadNoche(java.lang.Integer.parseInt(hAPI.getCardValue("cantidadNoche") != "" ? hAPI.getCardValue("cantidadNoche") : 0));
	inversionComercialDTO.setCantidadNoche(hAPI.getCardValue("cantidadNoche") != ""? java.lang.Integer.parseInt(hAPI.getCardValue("cantidadNoche")) : null);
	inversionComercialDTO.setCochera(hAPI.getCardValue("cochera"));
	inversionComercialDTO.setItinerarioIda(hAPI.getCardValue("itinerarioIda"));
	inversionComercialDTO.setFechaIda(hAPI.getCardValue("fechaIda") != "" ? simpleDateFormat.parse(hAPI.getCardValue("fechaIda")) : null);
	inversionComercialDTO.setNroVueloIda(hAPI.getCardValue("nroVueloIda"));
	inversionComercialDTO.setHoraSalidaIda(hAPI.getCardValue("horaSalidaIda"));
	inversionComercialDTO.setItinerarioRegreso(hAPI.getCardValue("itinerarioRegreso"));
	inversionComercialDTO.setFechaRegreso(hAPI.getCardValue("fechaRegreso") != "" ? simpleDateFormat.parse(hAPI.getCardValue("fechaRegreso")) : null);
	inversionComercialDTO.setNroVueloRegreso(hAPI.getCardValue("nroVueloRegreso"));
	inversionComercialDTO.setHoraSalidaRegreso(hAPI.getCardValue("horaSalidaRegreso"));
	inversionComercialDTO.setTituloGrado(hAPI.getCardValue("tituloGrado"));
	inversionComercialDTO.setInstitucionDondeObtuvo(hAPI.getCardValue("institucionDondeObtuvo"));
	inversionComercialDTO.setAnioEgreso(hAPI.getCardValue("anioEgreso"));
	inversionComercialDTO.setMatricula(hAPI.getCardValue("matricula"));
	inversionComercialDTO.setInstitucionQueTrabaja(hAPI.getCardValue("institucionQueTrabaja"));
	inversionComercialDTO.setCargoPosicion(hAPI.getCardValue("cargoPosicion"));
	inversionComercialDTO.setTipoInscripcion(hAPI.getCardValue("tipoInscripcion"));
	inversionComercialDTO.setNombreSociedad(hAPI.getCardValue("nombreSociedad"));
	inversionComercialDTO.setNumeroSocio(hAPI.getCardValue("numeroSocio"));
	inversionComercialDTO.setEquipamiento(hAPI.getCardValue("equipamiento"));
	inversionComercialDTO.setImporte(new java.math.BigDecimal(hAPI.getCardValue("importe") != "" ? formatBigDecimal(hAPI.getCardValue("importe")) : 0));
	inversionComercialDTO.setImporteARS(new java.math.BigDecimal(hAPI.getCardValue("importeARS") != "" ? formatBigDecimal(hAPI.getCardValue("importeARS")) : 0));
	inversionComercialDTO.setImporteUSD(new java.math.BigDecimal(hAPI.getCardValue("importeUSD") != "" ? formatBigDecimal(hAPI.getCardValue("importeUSD")) : 0));
	inversionComercialDTO.setMoneda(hAPI.getCardValue("moneda"));
	inversionComercialDTO.setCodMoneda(hAPI.getCardValue("codMoneda"));
	inversionComercialDTO.setTipoCambioARS(new java.math.BigDecimal(hAPI.getCardValue("tipoCambioARS") != "" ? formatBigDecimal(hAPI.getCardValue("tipoCambioARS")): 0));
	inversionComercialDTO.setTipoCambioUSD(new java.math.BigDecimal(hAPI.getCardValue("tipoCambioUSD") != "" ? formatBigDecimal(hAPI.getCardValue("tipoCambioUSD")): 0));
	inversionComercialDTO.setFormaPago(hAPI.getCardValue("formaPago"));
	inversionComercialDTO.setCodFormaPago(hAPI.getCardValue("codFormaPago"));
	inversionComercialDTO.setMotivoRechazo(hAPI.getCardValue("motivoRechazo"));
	inversionComercialDTO.setTarea(hAPI.getCardValue("tarea"));
	inversionComercialDTO.setMatriculaGteDistrito(hAPI.getCardValue("matriculaGteDistrito"));
	inversionComercialDTO.setMembresia(hAPI.getCardValue("membresia"));
	inversionComercialDTO.setComentariosAlojamiento(hAPI.getCardValue("comentariosAlojamiento"));
	inversionComercialDTO.setNombreMedico1(hAPI.getCardValue("nombreMedico1"));
	inversionComercialDTO.setNombreMedico2(hAPI.getCardValue("nombreMedico2"));
	inversionComercialDTO.setComparteHabitacion(hAPI.getCardValue("comparteHabitacion"));
	inversionComercialDTO.setComentariosIda(hAPI.getCardValue("comentariosIda"));
	inversionComercialDTO.setComentariosRegreso(hAPI.getCardValue("comentariosRegreso"));
	inversionComercialDTO.setTipoTrasladoIda(hAPI.getCardValue("tipoTrasladoIda"));
	inversionComercialDTO.setTipoTrasladoRegreso(hAPI.getCardValue("tipoTrasladoRegreso"));
	inversionComercialDTO.setCuit(hAPI.getCardValue("cuit"));
	inversionComercialDTO.setDiasLimiteCarga(hAPI.getCardValue("diasLimiteCarga") != ""? java.lang.Integer.parseInt(hAPI.getCardValue("diasLimiteCarga")) : null);
	inversionComercialDTO.setComentariosCongreso(hAPI.getCardValue("comentariosCongreso"));
	inversionComercialDTO.setCartaPetitorioDescripcion(hAPI.getCardValue("cartaPetitorio"));
	inversionComercialDTO.setCartaPetitorioDocumentId(hAPI.getCardValue("cartaPetitorioDocumentId"));
	inversionComercialDTO.setCartaAcuerdoDescripcion(hAPI.getCardValue("cartaAcuerdo"));
	inversionComercialDTO.setCartaAcuerdoDocumentId(hAPI.getCardValue("cartaAcuerdoDocumentId"));
	inversionComercialDTO.setFlyerDescripcion(hAPI.getCardValue("flyer"));
	inversionComercialDTO.setFlyerDocumentId(hAPI.getCardValue("flyerDocumentId"));
	inversionComercialDTO.setWeb(hAPI.getCardValue("web"));
	inversionComercialDTO.setMesInversion(hAPI.getCardValue("mesInversion") != "" ? sdfMes.parse(hAPI.getCardValue("mesInversion")) : null);
	inversionComercialDTO.setDelegado(hAPI.getCardValue("delegado") == "true"? true: false);
	inversionComercialDTO.setMontoInversion(new java.math.BigDecimal(hAPI.getCardValue("montoInversion") != "" ? formatBigDecimal(hAPI.getCardValue("montoInversion")) : 0));
	inversionComercialDTO.setContactoMedico1(hAPI.getCardValue("contactoMedico1"));
	inversionComercialDTO.setContactoMedico2(hAPI.getCardValue("contactoMedico2"));
	
	log.info("################### presupuestoHabilitado: " + hAPI.getCardValue("presupuestoHabilitado"));
	
	inversionComercialDTO.setPresupuestoHabilitado(hAPI.getCardValue("presupuestoHabilitado"));
	inversionComercialDTO.setIncluyeAlojamiento(hAPI.getCardValue("incluyeAlojamiento"));
	inversionComercialDTO.setIncluyeTraslado(hAPI.getCardValue("incluyeTraslado"));
	inversionComercialDTO.setIncluyeInscripcion(hAPI.getCardValue("incluyeInscripcion"));
	inversionComercialDTO.setSeleccionAlojamientoPresupuesto(hAPI.getCardValue("selAlojamientoPresupuesto"));
	inversionComercialDTO.setSeleccionTrasladoPresupuesto(hAPI.getCardValue("selTrasladoPresupuesto"));
	inversionComercialDTO.setSeleccionInscripcionoPresupuesto(hAPI.getCardValue("selInscripcionPresupuesto"));
		
		//Instancio las imputaciones
		for(var i=1; i<=qtyImputaciones; i++){
			var imputacionDTO = inversionComercialDTO.newImputacionDTO();
			
			log.info("****** Producto: " + hAPI.getCardValue("newProd___"+i));
			
			imputacionDTO.setProducto(hAPI.getCardValue("newProd___"+i));
			imputacionDTO.setCodigoProducto(hAPI.getCardValue("codigoProducto___"+i));
			imputacionDTO.setPorcentaje(new java.math.BigDecimal(hAPI.getCardValue("porcentajeImputado___"+i) != "" ? formatBigDecimal(hAPI.getCardValue("porcentajeImputado___"+i)) : 0));
			imputacionDTO.setPresupuestoARS(new java.math.BigDecimal(hAPI.getCardValue("presupuestoARS___"+i) != "" ? formatBigDecimal(hAPI.getCardValue("presupuestoARS___"+i)) : 0));
			imputacionDTO.setConsumidoARS(new java.math.BigDecimal(hAPI.getCardValue("consumidoARS___"+i) != "" ? formatBigDecimal(hAPI.getCardValue("consumidoARS___"+i)) : 0));

		}
		
		log.info("****** Previo al save EJB");
		ejb.save(inversionComercialDTO, estado);
		log.info("****** Fin del save Inversion Comercial. Solicitud nro:"+getValue("WKNumProces"));

}

function iniciarProcesoCartaAcuerdo(ejb, nroProceso){
	ejb.iniciarBPM(java.lang.Integer.parseInt(nroProceso));
}

function sendMail(mailTemplate, comment) {

	var companyId = getValue("WKCompany");
	var nroProceso = getValue("WKNumProces");
	var changeReasonId = hAPI.getCardValue("changeReasonId");
	var cardData = hAPI.getCardData(nroProceso);
	var tipoInversion;
	var data;
	
	log.info(" ########################## RAF08-bts tipoInversion: " + cardData.get("tipoInversion"));
	
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
	
	var mailTemplatesData = {
		"RAF08-Rechazada": {
			getSubject: function() {
				return "Solicitud " + nroProceso + " de Inversiones Comerciales fue rechazada";
			},
			getDestinatarios: function() {
				return getNotificationEmails(changeReasonId, "avisoRechazada");
			},
			getData: function() {
				data = {		
					"numeroSolicitud": cardData.get("nroSolicitud"),
					"sdfanio": cardData.get("area"),
					"distrito": cardData.get("distrito"),
					"nombreAPM": capitalize(cardData.get("nombreAPM")),
					"tipoInversion": tipoInversion,
					"nombre": cardData.get("nombre"),
					"apellido": cardData.get("apellido"),
					"formaPago": cardData.get("formaPago"),
					"motivoRechazo": cardData.get("motivoRechazo")
			
				}
				return data;
			}
		},
		"RAF08-Medicos": {
			getSubject: function() {
				return "Patrocinio Laboratorios Raffo";
			},
			getDestinatarios: function() {
				return getNotificationEmails(changeReasonId, "avisoMedico");
			},
			getData: function() {
				
				data = {		
					"nombreMedico": cardData.get("nombre") + " " + cardData.get("apellido"),
					"nombreCongreso": cardData.get("nombreCongreso"),
					"lugarCongreso": cardData.get("lugarCongreso"),
					"fechaDesdeCongreso": cardData.get("fechaDesdeCongreso"),
					"fechaHastaCongreso": cardData.get("fechaHastaCongreso"),
					"incluyeAlojamiento": cardData.get("incluyeAlojamiento"),
					"tipoHabitacion": cardData.get("tipoHabitacion"),
					"checkinHotel": cardData.get("checkinHotel"),
					"checkoutHotel": cardData.get("checkoutHotel"),
					"cantidadNoche": cardData.get("cantidadNoche"),
					"incluyeTraslado": cardData.get("incluyeTraslado"),
					"incluyeInscripcion": cardData.get("incluyeInscripcion")
				}
				return data;
			}
		},
	};
	
	var mailTemplateData = mailTemplatesData[mailTemplate];
	var subject = mailTemplateData.getSubject();
	var destinatarios = mailTemplateData.getDestinatarios();
	var mailData = mailTemplateData.getData();

	
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
				datos: mailData
			});
		} catch (e){
			log.error("RAF08-beforeTaskSave - Error enviando mail a "+mail + " template: " + mailTemplate);
		}
	}
}

function getNotificationEmails(reasonName, fieldName){
	var mails = [];
    
	if(fieldName == "avisoRechazada"){
		
		var usuariosGrupoGteDistrito = getUserList(hAPI.getCardValue("codGrupoGteDistrito"));

	    for(var i = 0; i < usuariosGrupoGteDistrito.size(); i++) { 
	    	var mailsAux = getMailList(usuariosGrupoGteDistrito.get(i));
	    	 for(var j = 0; j < mailsAux.size(); j++) {  
	    		 mails.push(mailsAux.get(j));
	    	}
	    }

	    log.info("*** usuariosGrupoGteDistrito: " + " mails: "+ mails);
	    log.info("*** getNotificationEmails: " + hAPI.getCardValue("areaCodigo") + " mails:"+mails);
	}else{
		mails.push(hAPI.getCardValue("mailContacto"));

		log.info("*** Notificacicion al medico: " + " mails: "+ mails);
	}
	    
   
    return mails;
}