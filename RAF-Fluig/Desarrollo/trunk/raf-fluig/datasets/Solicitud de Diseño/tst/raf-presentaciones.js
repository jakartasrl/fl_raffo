/**
 * Codigo: raf-presentaciones
 * Descripcion: Dataset asincrónico de presentaciones hardcodeados.
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

	newDataset.addRow(["1", "Presentación 1"]); 	
	newDataset.addRow(["2", "Presentación 2"]); 	
	newDataset.addRow(["3", "Presentación 3"]);
	
	return newDataset;
}