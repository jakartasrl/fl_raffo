/**
 * Codigo: raf-productos-principio-activo
 * Descripcion: Consulta de Productos al ERP con Principios Activos.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var provider = ServiceManager.getServiceInstance("RAF-QAD-PAR");
	var locator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
	var service = locator.getws_bpmObj();
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigoProducto"); 
	newDataset.addColumn("descripcionProducto"); 
	newDataset.addColumn("productoLocal");	
	newDataset.addColumn("principioActivo");	
	
	var result = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfbuscarProductosTerminados_opttRowHolder");	      	                       
	
	var textoBusqueda = getContraint(constraints, "textoBusqueda") != ""? getContraint(constraints, "textoBusqueda").initialValue : "";
	service.buscarProductosTerminados("RAFFO",textoBusqueda,result);
	
	for (var i=0; i<result.value.length; i++) {
		var producto = result.value[i];
		newDataset.addRow(new Array(producto.getCodigoProducto(), producto.getDescripcionProducto(), 
									producto.getProductoLocal(), producto.getPrincipioActivo())); 	
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