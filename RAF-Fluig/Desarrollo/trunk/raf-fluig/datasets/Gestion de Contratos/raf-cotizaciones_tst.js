/**
 * Codigo: raf-cotizaciones
 * Descripcion: Consulta de Cotizaciones Vigentes al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigoMoneda1"); 
	newDataset.addColumn("codigoMoneda2"); 
	newDataset.addColumn("cotizacion"); 
	newDataset.addColumn("fechaUltimaActualizacion");	
	
	var codigoMoneda1 = getContraint(constraints, "codigoMoneda1")? getContraint(constraints, "codigoMoneda1").initialValue : "PES";
	var codigoMoneda2 = getContraint(constraints, "codigoMoneda2")? getContraint(constraints, "codigoMoneda2").initialValue : "USD";
	var cotizacion = buscarCotizacion(codigoMoneda1,codigoMoneda2);
	
	newDataset.addRow([codigoMoneda1,codigoMoneda2,cotizacion,"27/04/2020"]);
	
	return newDataset;
	
}

function getContraint(constraints, fieldName) {
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].fieldName == fieldName){
			return constraints[i];
		}
	}
	return;
}

function buscarCotizacion(codigoMoneda1,codigoMoneda2) {
	var cotizacionM1 = cotizaciones()[codigoMoneda1];
	var cotizacionM2 = cotizaciones()[codigoMoneda2];
	
	return (cotizacionM1/cotizacionM2).toFixed(4);
}

function cotizaciones() {
	return {
		"USD":1, 
		"PES":66.43, 
		"EUR":0.92
	};
}

// NO ANDA EN EL RHYNO.
//function buscarCotizacion(codigoMoneda1,codigoMoneda2) {
//	var cotizacionM1 = cotizaciones().find(function(cot){ return cot["cod"] == codigoMoneda1 });
//	var cotizacionM2 = cotizaciones().find(function(cot){ return cot["cod"] == codigoMoneda2 });
//	
//	log.debug("La cotizacion es de " + (cotizacionM1["val"]/cotizacionM2["val"]).toFixed(2));
//	
//	return (cotizacionM1/cotizacionM2).toFixed(2);
//}
//
//function cotizaciones() {
//	var dolar = {cod:"USD", val:1};
//	var peso = {cod:"ARS", val:14.6829942};
//	var euro = {cod:"EUR", val:0.880204207};
//	return [peso, dolar, euro];
//}

