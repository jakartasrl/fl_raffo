/*
 * Dataset que devuelve un listado de Areas.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("descripcion");	

	newDataset.addRow(new Array('IT'));
	newDataset.addRow(new Array('RRHH'));
	newDataset.addRow(new Array('STAFF'));


	return newDataset; 
}