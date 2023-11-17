/**
 * Codigo: raf-productos
 * Descripcion: Consulta de Productos al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigoProducto"); 
	newDataset.addColumn("descripcionProducto"); 
	newDataset.addColumn("estadoProducto");	
	newDataset.addColumn("codigoUnidadMedida");	
	newDataset.addColumn("descUnidadMedida");	
	
	for (var i=1; i<6; i++) {
		newDataset.addRow([i,"Producto " + i, "Estado " + i, "UM" + i, "DESC"+i]); 	
	}
	
	return newDataset;
	
}
