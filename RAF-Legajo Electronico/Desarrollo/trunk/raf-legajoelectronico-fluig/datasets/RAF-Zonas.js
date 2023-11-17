/*
 * Dataset que devuelve un listado de Areas.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("descripcion");	

	newDataset.addRow(new Array('Z1'));
	newDataset.addRow(new Array('Z2'));
	newDataset.addRow(new Array('Z3'));


	return newDataset; 
}