/*
 * Dataset que devuelve un listado de Categorias Convenio.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("descripcion");	

	newDataset.addRow(new Array('Cat 1'));
	newDataset.addRow(new Array('Cat 2'));

	return newDataset; 
}