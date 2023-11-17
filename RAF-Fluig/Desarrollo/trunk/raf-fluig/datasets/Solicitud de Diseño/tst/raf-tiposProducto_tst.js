/**
 * Codigo: raf-tipos
 * Descripcion: Dataset asincrónico de tipos de producto hardcodeados.
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

	newDataset.addRow(["1", "TipoProd 1"]); 	
	newDataset.addRow(["2", "TipoProd 2"]); 	
	newDataset.addRow(["3", "TipoProd 3"]);
	newDataset.addRow(["4", "TipoProd 4"]);
	newDataset.addRow(["5", "TipoProd 5"]);
	newDataset.addRow(["6", "TipoProd 6"]);
	
	return newDataset;
}