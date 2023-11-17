/**
 * Codigo: raf-principiosActivos
 * Descripcion: Dataset asincrónico de principios activos hardcodeados.
 */
function defineStructure() {
	addColumn("cod"); 
	addColumn("descr"); 
	setKey(["cod"]);
	addIndex(["cod"]);
}

function onSync(lastSyncDate) {
	var newDataset = DatasetBuilder.newDataset(); 
	
	newDataset.addColumn("cod"); 
	newDataset.addColumn("descr"); 

	newDataset.addRow(["1", "Principio Activo 1"]); 	
	newDataset.addRow(["2", "Principio Activo 2"]); 	
	newDataset.addRow(["3", "Principio Activo 3"]);
	
	return newDataset;
}