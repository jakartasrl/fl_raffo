/*
 * Dataset que devuelve un listado de Lineas/Especialidad .
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("descripcion");	

	newDataset.addRow(new Array('Linea 1 / Espe 1'));
	newDataset.addRow(new Array('Linea 2 / Espe 2'));


	return newDataset; 
}