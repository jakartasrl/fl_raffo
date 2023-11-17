function validateForm(form){
	var arq = arqMarvinLoad("v1", {
		form: "com.arquimeda.marvin.server.js.Form-v1"
	});
		
	var tareaActual = getValue("WKNumState");
	var completo = getValue("WKCompletTask");
	var tareaDestino = getValue("WKNextState");
	
	var ingresoPersonal = form.getValue("ingresoPersonal");
	var cantidadTareasOrdenPrioridad = form.getValue("cantidadTareasOrdenPrioridad");
	
	// Si ingresoPersonal es Puesto Estandar, valido las tareas
	if ("PE" == ingresoPersonal && form.getValue("cantidadTareasOrdenPrioridad") < 4){
		throw "Debe cargar por lo menos 4 tareas en el campo: Tareas en Orden de Prioridad";
	}
	
	//if(completo!="false" && tareaActual != tareaDestino){
		arq.form.validateForm(form);					
	//}
	
}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};

