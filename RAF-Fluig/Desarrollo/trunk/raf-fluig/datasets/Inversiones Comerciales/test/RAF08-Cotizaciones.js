function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigoMoneda1"); 
	newDataset.addColumn("codigoMoneda2"); 
	newDataset.addColumn("cotizacion"); 
	newDataset.addColumn("fechaUltimaActualizacion");	
	
	var dateParser = new java.text.SimpleDateFormat("dd/MM/yyyy");
	
	newDataset.addRow(["PES","Pesos", java.math.BigDecimal.ONE, dateParser.format(new Date())]); 
	
	return newDataset;
	
}
