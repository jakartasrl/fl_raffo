/**
 * Codigo: raf-cotizaciones
 * Descripcion: Consulta de Cotizaciones Vigentes al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var provider = ServiceManager.getServiceInstance("RAF-QAD-PAR");
	var locator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
	var service = locator.getws_bpmObj();
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigoMoneda1"); 
	newDataset.addColumn("codigoMoneda2"); 
	newDataset.addColumn("cotizacion"); 
	newDataset.addColumn("fechaUltimaActualizacion");	
	
	var result = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfbuscarCotizacion_opttRowHolder");	      	                       
	
	var codigoMoneda1 = getContraint(constraints, "codigoMoneda1")? getContraint(constraints, "codigoMoneda1").initialValue : "pes";
	var codigoMoneda2 = getContraint(constraints, "codigoMoneda2")? getContraint(constraints, "codigoMoneda2").initialValue : "USD";
		
	service.buscarCotizacion("RAFFO",codigoMoneda1,codigoMoneda2,result);
	
	var dateParser = new java.text.SimpleDateFormat("dd/MM/yyyy");
		
	for (var i=0; i<result.value.length; i++) {
		var cotizacion = result.value[i];
		var fechaUltimaActualizacion = cotizacion.getFechaUltimaActualizacion()? dateParser.format(cotizacion.getFechaUltimaActualizacion()) : "";
		newDataset.addRow(new Array(codigoMoneda1, codigoMoneda2, cotizacion.getCotizacion(), fechaUltimaActualizacion)); 	
	}
	
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