/*
 * Dataset que devuelve un listado de Planes.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("descripcion");	

	newDataset.addRow(new Array('A1'));
	newDataset.addRow(new Array('A2'));
	newDataset.addRow(new Array('A3'));


	return newDataset; 
}