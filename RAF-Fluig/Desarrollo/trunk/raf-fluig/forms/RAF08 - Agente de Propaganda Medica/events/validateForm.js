function validateForm(form){
	var arq = arqMarvinLoad("v1", {
		form: "com.arquimeda.marvin.server.js.Form-v1"
	});
	
	var matricula = form.getValue("matricula");
	var documentid = getValue("WDNrDocto");
	
	var c01 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST); 
	var c02 = DatasetFactory.createConstraint("matricula", matricula, matricula, ConstraintType.MUST); 
	
	var constraints = new Array(c01, c02);
	var dataset = DatasetFactory.getDataset("RAF08-AgentePropagandaMedica", null, constraints, null);
	
	if(dataset.rowsCount == 1){ 
		if(dataset.getValue(0,"documentid") != documentid){
			throw " Existe un fichero para el Agente solicitado.";
		}
	}
	
	arq.form.validateForm(form);
}

/*! arqMarvinLoad - v1.1 - All rights reserverd */
function arqMarvinLoad(a,b){var c={};if(null==b)return c;var d=(new javax.naming.InitialContext).lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var e in b)try{var f=new Function("lib","return "+d.getLib(b[e]));c[e]=f(c)}catch(a){log.error("*** Error compilando libreria "+e+":"+a)}return c}
