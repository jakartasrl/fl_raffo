/**
 * Codigo: raf-formasFarmaceuticas
 * Descripcion: Dataset asincrónico de formas farmaceuticas hardcodeados.
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

	newDataset.addRow(["1", "Forma 1"]); 	
	newDataset.addRow(["2", "Forma 2"]); 	
	newDataset.addRow(["3", "Forma 3"]);
	
	return newDataset;
}