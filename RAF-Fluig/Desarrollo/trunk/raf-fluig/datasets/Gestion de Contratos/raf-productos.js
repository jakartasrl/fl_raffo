/**
 * Codigo: raf-productos
 * Descripcion: Consulta de Productos al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var provider = ServiceManager.getServiceInstance("RAF-QAD-PAR");
	var locator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
	var service = locator.getws_bpmObj();
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigoProducto"); 
	newDataset.addColumn("descripcionProducto"); 
	newDataset.addColumn("estadoProducto");	
	newDataset.addColumn("codigoUnidadMedida");	
	newDataset.addColumn("descUnidadMedida");	
	
	var result = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfbuscarProductos_opttRowHolder");	      	                       
	
	var textoBusqueda = getContraint(constraints, "textoBusqueda") != ""? getContraint(constraints, "textoBusqueda").initialValue : "";
	var maxLen = 100;
	
	service.buscarProductos("RAFFO",textoBusqueda,maxLen,result);
	
	for (var i=0; i<result.value.length; i++) {
		var producto = result.value[i];
		newDataset.addRow(new Array(producto.getCodigoProducto(), producto.getDescripcionProducto(), producto.getEstadoProducto(), producto.getCodigoUnidadMedida(), producto.getDescUnidadMedida())); 	
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