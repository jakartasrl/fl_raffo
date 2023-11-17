/*
 * Dataset que devuelve un listado de Centros de Costo.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("descripcion");	

	newDataset.addRow(new Array('Centro 1'));
	newDataset.addRow(new Array('Centro 2'));
	newDataset.addRow(new Array('Centro 3'));


	return newDataset; 
}