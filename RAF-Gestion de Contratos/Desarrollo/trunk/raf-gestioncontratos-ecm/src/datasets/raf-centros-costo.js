/**
 * Codigo: raf-centros-costo
 * Descripcion: Consulta de Centros de Costo al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var provider = ServiceManager.getServiceInstance("RAF-WS-ERP");
	var locator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
	var service = locator.getws_bpmObj();
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 
	newDataset.addColumn("activo"); 
	
	var result = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfbuscarCentrosCosto_opttRowHolder");	                                            
	
	service.buscarCentrosCosto("mverde",result);
	
	for (var i=0; i<result.value.length; i++) {
		var centroCosto = result.value[i];
		newDataset.addRow(new Array(centroCosto.getCodigo(), centroCosto.getDescripcion(), centroCosto.getActivo())); 	
	}
	
	return newDataset;
	
}