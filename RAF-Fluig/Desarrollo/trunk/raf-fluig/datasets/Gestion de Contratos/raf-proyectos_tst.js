/**
 * Codigo: raf-proyectos
 * Descripcion: Consulta de Proyectos al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 
	newDataset.addColumn("activo"); 
		
	for (var i=1; i<6; i++) {
		newDataset.addRow([i,"Proyecto " + i, (i % 2 == 1) ? "SI":"NO"]); 	
	}
	
	return newDataset;
	
}