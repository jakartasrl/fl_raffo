/**
 * Codigo: raf-sectores
 * Descripcion: Consulta de Sectores al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("nombre"); 

	for (var i=1; i<6; i++) {
		newDataset.addRow(new Array(i,"Sector " + i)); 	
	}
	
	return newDataset;
	
}