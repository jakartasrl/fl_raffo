/**
 * Codigo: raf-unidades
 * Descripcion: Consulta de Unidades de Medida al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var provider = ServiceManager.getServiceInstance("RAF-WS-ERP");
	var locator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
	var service = locator.getws_bpmObj();
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 
	
	var result = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfbuscarUnidadesMedida_opttRowHolder");	      	                       
	
	service.buscarUnidadesMedida("mverde",result);
	
	for (var i=0; i<result.value.length; i++) {
		var unidad = result.value[i];
		newDataset.addRow(new Array(unidad.getCodigo(), unidad.getDescripcion())); 	
	}
	
	return newDataset;
	
}