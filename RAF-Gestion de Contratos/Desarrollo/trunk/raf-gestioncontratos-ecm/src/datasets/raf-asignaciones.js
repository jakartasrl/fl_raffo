/**
 * Codigo: raf-asignaciones
 * Descripcion: Consulta de Claves de Asignación al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var provider = ServiceManager.getServiceInstance("RAF-WS-ERP");
	var locator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
	var service = locator.getws_bpmObj();
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 
	
	var result = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfbuscarAsignacion_opttRowHolder");	                                            
	
	service.buscarAsignacion("mverde",result);
	
	for (var i=0; i<result.value.length; i++) {
		var asignacion = result.value[i];
		newDataset.addRow(new Array(asignacion.getCodigo(), asignacion.getDescripcion())); 	
	}
	
	return newDataset;
	
}