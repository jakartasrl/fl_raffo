/**
 * Codigo: raf-centros-costo
 * Descripcion: Consulta de Centros de Costo al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 
	newDataset.addColumn("activo"); 
	
	for (var i=1; i<6; i++) {
		newDataset.addRow([i,"Centro de Costo " + i, (i % 2 == 1) ? "SI":"NO"]); 	
	}
	
	return newDataset;
	
}

