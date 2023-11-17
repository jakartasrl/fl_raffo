/**
 * Codigo: raf-asignaciones
 * Descripcion: Consulta de Claves de Asignación al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 

	for (var i=1; i<6; i++) {
		newDataset.addRow([i,"Clave de Asignación "+i]); 	
	}
	
	return newDataset;
	
}