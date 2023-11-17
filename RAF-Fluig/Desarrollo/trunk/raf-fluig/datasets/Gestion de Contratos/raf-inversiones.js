/**
 * Codigo: raf-inversiones
 * Descripcion: Consulta de C�digos de Inversi�n al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var provider = ServiceManager.getServiceInstance("RAF-QAD-PAR");
	var locator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
	var service = locator.getws_bpmObj();
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 
	newDataset.addColumn("activo"); 
	
	var result = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfbuscarInversion_opttRowHolder");	                                            
	
	service.buscarInversion("RAFFO",result);
	
	for (var i=0; i<result.value.length; i++) {
		var inversion = result.value[i];
		newDataset.addRow(new Array(inversion.getCodigo(), inversion.getDescripcion(), inversion.getActivo())); 	
	}
	
	return newDataset;
	
}