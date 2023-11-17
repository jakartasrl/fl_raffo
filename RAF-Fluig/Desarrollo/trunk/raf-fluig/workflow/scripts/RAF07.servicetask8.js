function servicetask8(attempt, message) {

	var nroProceso = getValue("WKNumProces");
	log.info("******* Iniciando Integracion QAD: nroSolicitud: " + nroProceso);
	try {

		integrarQAD();

		log.info("******* Terminó Integracion QAD: nroSolicitud: " + nroProceso);

	} catch (ex) {
		log.error("*** Error Integracion QAD para solicitud: " + nroProceso + ": " + ex);
		throw "Error integrando con QAD: " + ex;
	}

	return true;
}

function integrarQAD() {

	var nroSolicitud = hAPI.getCardValue("nroSolicitud");
	var loginUsuario = hAPI.getCardValue("requestantName");
	var title = hAPI.getCardValue("title");
	var motivo = hAPI.getCardValue("changeReason"); 
		
	var estado = hAPI.getCardValue("currentState");
	var desc = hAPI.getCardValue("changeDetail");
	
	var arq = arqMarvinLoad("v1", {
		prop: "com.arquimeda.marvin.server.js.Properties-v1"
	});
	arq.prop.load({
		datasetName: "parametros"
	});
		
	var dominio = arq.prop.get("RAF07.QAD.domain");
	var file = arq.prop.get("RAF07.QAD.fileURL") + hAPI.getCardValue("folderId") ;
	var implementationType = hAPI.getCardValue("implementationType");
	var ipiline = "" ;
	var indexes;
	var motivoId = hAPI.getCardValue("changeReasonId"); 	
	log.info("motivoId: " + motivoId);	
	changeGroupReasonType = hAPI.getCardValue("changeGroupReasonType");
	log.info("changeGroupReasonType: " + changeGroupReasonType);
	
	if (changeGroupReasonType.equals("nuevoDisenio")){
		indexes = getChildrenIndexes("tipoNewProd");
		log.info("indexes: " + indexes);
		var nroLinea = 1;
		for (var i = 0; i < indexes.length; i++) {	
			
			log.info("codigoProd:  " + hAPI.getCardValue("tipoNewProd___"+indexes[i]));
    		ipiline = ipiline + hAPI.getCardValue("tipoNewProd___"+indexes[i]);
    		hAPI.setCardValue("nroLineaNewProd___"+indexes[i], nroLinea);
    		
    		if(i+1 != indexes.length){
    			ipiline = ipiline + ";" ;
    		}
    		
    		nroLinea++;
		}
	}
	else{
		indexes = getChildrenIndexes("codigoProd");
		var nroLinea = 1;
		
		for (var i = 0; i < indexes.length; i++) {
			log.info("codigoProd:  " + hAPI.getCardValue("codigoProd___"+indexes[i]));
			
			ipiline = ipiline + hAPI.getCardValue("codigoProd___"+indexes[i]) ;
			hAPI.setCardValue("nroLinea___"+indexes[i], nroLinea);
			
			if(i+1 != indexes.length){
    			ipiline = ipiline + ";" ;
    		}
			
			nroLinea++;
		}
	}
		  	
	var rta1 = new javax.xml.rpc.holders.StringHolder;
	var rta2 = new javax.xml.rpc.holders.StringHolder;
	
	var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
	
	var sdf2 = new java.text.SimpleDateFormat("yyyy-MM-dd");
	
	var fechaCreacion = sdf2.parse(hAPI.getCardValue("creationDate"));  
	
	var dateAc = sdf2.parse(hAPI.getCardValue("approvalDate"));  

	var breakDate = hAPI.getCardValue("breakDate");
	var fechaCorte;
	if ((breakDate == null) || (breakDate == '')){
		fechaCorte = sdf2.parse("0000-00-00");
	}
	else{
		fechaCorte = sdf.parse(hAPI.getCardValue("breakDate"));
	}
	//var provider = ServiceManager.getServiceInstance("RAF-QAD");
	//var serviceLocator = provider.instantiate("ws_vyf.qad.Ws_vyfServiceLocator");
	//var servicioQAD = serviceLocator.getws_vyfObj();
	
	log.info("********* QAD - Invocando metodo vyfsolicitud:  ");
	
	// servicioQAD.vyfsolicitud(dominio,nroSolicitud,ipiline,loginUsuario,fechaCreacion,title,motivo,estado,dateAc,fechaCorte,desc,file,implementationType,rta1,rta2);
	
	log.info("********* QAD - Termino el metodo vyfsolicitud:  ");
	
	log.info("loginUsuario:  " + loginUsuario);
	log.info("ipiLine:  " + ipiline);
	log.info("fechaCreacion:  " + fechaCreacion);
	log.info("dateAc:  " + dateAc);
	log.info("fechaCorte:  " + fechaCorte);
	log.info("RTA1:  " + rta1.value);
	log.info("RTA2:  " + rta2.value);
	
	var ok = new java.lang.String("ok");
	
	if (!ok.equalsIgnoreCase(rta1.value)){
		throw "Rta QAD:" + rta2.value;
	}

}

function getChildrenIndexes(fieldName) {
	 var datos = hAPI.getCardData(getValue("WKNumProces"));
	 var enteries = datos.entrySet().iterator();
	 var indexes = [];

	 while (enteries.hasNext()) {
		 var e = enteries.next();
		 if (e.getKey().startsWith(fieldName + "___")) {
			 indexes.push(e.getKey().split("___")[1]);
		 }
	 }
	 return indexes;
}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};
