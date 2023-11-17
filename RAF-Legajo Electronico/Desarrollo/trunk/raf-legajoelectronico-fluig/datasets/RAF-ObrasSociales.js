/*
 * Dataset que devuelve un listado de Obras Sociales.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("descripcion");	

	newDataset.addRow(new Array('Osde'));
	newDataset.addRow(new Array('Galeno'));
	newDataset.addRow(new Array('Osde Neo'));


	return newDataset; 
}