/*
 * Dataset que devuelve un listado de Aperturas por Sector.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("descripcion");	

	newDataset.addRow(new Array('APS 1'));
	newDataset.addRow(new Array('APS 2'));


	return newDataset; 
}