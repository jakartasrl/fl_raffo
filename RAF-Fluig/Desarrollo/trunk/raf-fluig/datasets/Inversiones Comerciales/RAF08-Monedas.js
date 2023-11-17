function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 
	
	newDataset.addRow(["PES","Pesos"]); 	
	newDataset.addRow(["USD","Dolares"]); 	
	newDataset.addRow(["EUR","Euros"]); 	
	
	return newDataset;
	
}