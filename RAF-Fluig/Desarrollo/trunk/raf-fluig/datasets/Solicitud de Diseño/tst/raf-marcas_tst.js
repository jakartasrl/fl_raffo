/**
 * Codigo: raf-marcas
 * Descripcion: Dataset asincrónico de marcas hardcodeados.
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

	newDataset.addRow(["1", "Marca 1"]); 	
	newDataset.addRow(["2", "Marca 2"]); 	
	newDataset.addRow(["3", "Marca 3"]);
	
	return newDataset;
}