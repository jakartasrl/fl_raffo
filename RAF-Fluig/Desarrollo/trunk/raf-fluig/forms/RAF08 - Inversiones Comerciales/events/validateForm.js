function validateForm(form){
	var arq = arqMarvinLoad("v1", {
		form: "com.arquimeda.marvin.server.js.Form-v1"
	});
	
	var completo = getValue("WKCompletTask");
	var tareaDestino = getValue("WKNextState");
	var tareaActual = getValue("WKNumState");
	
	log.info("######### RAF08-validateForm - completo: " +completo + ", tareaDestino: " + tareaDestino);
	
	if((tareaDestino == 12 || tareaDestino == 35) && completo =="true"){
		log.info("######### Rechazar");
		form.setValue("__error", "SUCCESS");
	}
	
	if(tareaActual == 4 && completo == "false"){
		log.info("######### Guardar");
		form.setValue("__error", "SUCCESS");
	}

	arq.form.validateForm(form);
}

/*! arqMarvinLoad - v1.1 - All rights reserverd */
function arqMarvinLoad(a,b){var c={};if(null==b)return c;var d=(new javax.naming.InitialContext).lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var e in b)try{var f=new Function("lib","return "+d.getLib(b[e]));c[e]=f(c)}catch(a){log.error("*** Error compilando libreria "+e+":"+a)}return c}
