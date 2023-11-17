/**
 * Codigo: raf-proveedores
 * Descripcion: Consulta de Proveedores al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var provider = ServiceManager.getServiceInstance("RAF-QAD-PAR");
	var locator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
	var service = locator.getws_bpmObj();
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigoProveedor"); 
	newDataset.addColumn("razonSocialProveedor"); 
	newDataset.addColumn("estadoProveedor");	
	newDataset.addColumn("codigoFormaPago");	
	newDataset.addColumn("descripcionFormaPago");	
	
	var result = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfbuscarProveedores_opttRowHolder");	      	                       
	
	var textoBusqueda = getContraint(constraints, "textoBusqueda") != ""? getContraint(constraints, "textoBusqueda").initialValue : "";
	var maxLen = 100;
	
	service.buscarProveedores("RAFFO",textoBusqueda,maxLen,result);
	
	for (var i=0; i<result.value.length; i++) {
		var proveedor = result.value[i];
		newDataset.addRow(new Array(proveedor.getCodigoProveedor(), proveedor.getRazonSocialProveedor(), proveedor.getEstadoProveedor(), proveedor.getCodigoFormaPago(), proveedor.getDescripcionFormaPago())); 	
	}
	
	return newDataset;
	
}

function getContraint(constraints, fieldName) {
	if(constraints != null){
		for (var i=0; i<constraints.length; i++){
			if (constraints[i].fieldName == fieldName){
				return constraints[i];
			}
		}
	}
	return "";
}