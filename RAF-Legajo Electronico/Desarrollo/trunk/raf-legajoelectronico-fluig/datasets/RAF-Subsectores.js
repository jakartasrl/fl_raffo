/*
 * Dataset que devuelve un listado de Subsectores.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("descripcion");	

	newDataset.addRow(new Array('Subsector 11'));
	newDataset.addRow(new Array('Subsector 22'));


	return newDataset; 
}