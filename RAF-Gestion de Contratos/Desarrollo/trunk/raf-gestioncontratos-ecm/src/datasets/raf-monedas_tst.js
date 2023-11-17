/**
 * Codigo: raf-monedas
 * Descripcion: Consulta de Monedas al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 
	
	newDataset.addRow(new Array("ARS","Pesos")); 	
	newDataset.addRow(new Array("USD","Dolares")); 	
	newDataset.addRow(new Array("EUR","Euros")); 	
	
	return newDataset;
	
}