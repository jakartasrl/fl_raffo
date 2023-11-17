/*
 * Dataset que devuelve un listado de Puestos.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("descripcion");	

	newDataset.addRow(new Array('Agente de Propaganda Médica X'));
	newDataset.addRow(new Array('Asistente'));


	return newDataset; 
}