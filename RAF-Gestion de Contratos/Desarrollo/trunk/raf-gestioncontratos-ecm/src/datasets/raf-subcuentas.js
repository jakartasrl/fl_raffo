/**
 * Codigo: raf-subcuentas
 * Descripcion: Consulta de SubCuentas al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var provider = ServiceManager.getServiceInstance("RAF-WS-ERP");
	var locator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
	var service = locator.getws_bpmObj();
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 
	newDataset.addColumn("activo");	
		
	var result = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfbuscarSubCuentas_opttRowHolder");	      	                       
	
	var codigoCuentaContable = getContraint(constraints, "codigoCuentaContable")? getContraint(constraints, "codigoCuentaContable").initialValue : "";
	
	service.buscarSubCuentas("mverde",codigoCuentaContable,result);
	
	for (var i=0; i<result.value.length; i++) {
		var subCuenta = result.value[i];
		newDataset.addRow(new Array(subCuenta.getCodigo(), subCuenta.getDescripcion(), subCuenta.getActivo())); 	
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