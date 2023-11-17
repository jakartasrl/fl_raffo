/*
 * Dataset que devuelve un listado de Sectores.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("descripcion");	

	newDataset.addRow(new Array('Sector 1'));
	newDataset.addRow(new Array('Sector 2'));


	return newDataset; 
}