/**
 * Codigo: raf-gruposProducto
 * Descripcion: Dataset asincrónico de grupos de producto hardcodeados.
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

	newDataset.addRow(["1", "Grupo 1"]); 	
	newDataset.addRow(["2", "Grupo 2"]); 	
	newDataset.addRow(["3", "Grupo 3"]);
	
	return newDataset;
}