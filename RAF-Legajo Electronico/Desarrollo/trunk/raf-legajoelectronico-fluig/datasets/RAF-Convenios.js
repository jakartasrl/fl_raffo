/*
 * Dataset que devuelve un listado de Convenios.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("descripcion");	

	newDataset.addRow(new Array('Comercio'));
	newDataset.addRow(new Array('Sanidad'));


	return newDataset; 
}