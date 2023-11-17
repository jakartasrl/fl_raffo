/**
 * Codigo: raf-productos-principio-activo
 * Descripcion: Consulta de Productos al ERP con Principios Activos.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigoProducto"); 
	newDataset.addColumn("descripcionProducto"); 
	newDataset.addColumn("productoLocal");	
	newDataset.addColumn("principioActivo");	
	
	for (var i=1; i<6; i++) {
		newDataset.addRow([i, "Producto " + i, "PL"+i, "PA"+i]); 	
	}
	
	return newDataset;
	
}