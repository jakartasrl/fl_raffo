/**
 * Codigo: raf-formas-pago
 * Descripcion: Consulta de Formas de Pago al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var provider = ServiceManager.getServiceInstance("RAF-WS-ERP");
	var locator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
	var service = locator.getws_bpmObj();
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 
	
	var result = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfbuscarFormasPago_opttRowHolder");	                                            
	
	service.buscarFormasPago("mverde",result);
	
	for (var i=0; i<result.value.length; i++) {
		var formaPago = result.value[i];
		newDataset.addRow(new Array(formaPago.getCodigo(), formaPago.getDescripcion())); 	
	}
	
	return newDataset;
	
}