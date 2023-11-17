/*
 * Dataset que devuelve un listado de Carreras.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("descripcion");	

	newDataset.addRow(new Array('Recursos Humanos'));
	newDataset.addRow(new Array('Ingeniería en Sistemas'));
	newDataset.addRow(new Array('Ingeniería Industrial'));

	return newDataset; 
}