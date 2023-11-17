/*
 * Dataset que devuelve un listado de Gerencias.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("descripcion");	

	newDataset.addRow(new Array('Gerencia IT'));
	newDataset.addRow(new Array('Gerencia Finanzas'));


	return newDataset; 
}