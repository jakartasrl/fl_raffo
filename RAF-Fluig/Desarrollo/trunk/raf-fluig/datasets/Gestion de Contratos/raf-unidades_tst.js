/**
 * Codigo: raf-unidades
 * Descripcion: Consulta de Unidades de Medida al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 
	
	for (var i=1; i<6; i++) {
		newDataset.addRow(["UM"+i,"Unidad de Medida " + i]); 	
	}
	
	return newDataset;
	
}