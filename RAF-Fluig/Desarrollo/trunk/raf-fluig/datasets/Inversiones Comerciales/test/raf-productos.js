function createDataset(fields, constraints, sortFields) {

	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigoProducto"); 
	newDataset.addColumn("descripcionProducto"); 
	newDataset.addColumn("estadoProducto"); 
	newDataset.addColumn("codigoUnidadMedida");
	newDataset.addColumn("descUnidadMedida");
		 
	 // Parametros Generales
	newDataset.addRow(['93120', 'PANKREOFLAT X 20 COMP. REC.', 'AC', 'UN', 'Unidades']);
	newDataset.addRow(['90000', 'AEROTINA 10 mg X 30 COMPRIMIDOS', 'AC', 'UN', 'Unidades']);
	newDataset.addRow(['93280', 'PARACETAMOL FORTE X 30 COMPRIMIDOS', 'AC', 'UN', 'Unidades']);
	newDataset.addRow(['93670', 'RAFFOLUTIL 150 MG X  30 COMP. REC.', 'AC', 'UN', 'Unidades']);
		 
	return newDataset;
		 
}


