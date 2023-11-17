/**
 * Codigo: raf-cuentas-contables
 * Descripcion: Consulta de Cuentas Contables al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var provider = ServiceManager.getServiceInstance("RAF-QAD-PAR");
	var locator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
	var service = locator.getws_bpmObj();
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 
	newDataset.addColumn("activo"); 
	
	var result = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfbuscarCuentasContables_opttRowHolder");	                                            
	
	service.buscarCuentasContables("RAFFO",result);
	
	for (var i=0; i<result.value.length; i++) {
		var cuentaContable = result.value[i];
		newDataset.addRow(new Array(cuentaContable.getCodigo(), cuentaContable.getDescripcion(), cuentaContable.getActivo())); 	
	}
	
	return newDataset;
	
}