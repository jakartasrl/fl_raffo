/**
 * Codigo: raf-formas-pago
 * Descripcion: Consulta de Formas de Pago al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 
	
	for (var i=1; i<6; i++) {
		newDataset.addRow(new Array(i,"Forma de Pago " + i)); 	
	}
	
	return newDataset;
	
}