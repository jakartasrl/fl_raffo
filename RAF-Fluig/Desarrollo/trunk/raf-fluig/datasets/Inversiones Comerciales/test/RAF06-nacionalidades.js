function createDataset(fields, constraints, sortFields) {

	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("descripcion"); 
	
		 
	 // Parametros Generales
	 newDataset.addRow(['ARGENTINA']);
	 newDataset.addRow(['CUBANA']);
	 newDataset.addRow(['ECUATORIANA']);
	 newDataset.addRow(['ESPAÑOLA']);
	 newDataset.addRow(['FRANCESA']);
	 newDataset.addRow(['SUECA']);
		 
	 return newDataset;
		 
	}