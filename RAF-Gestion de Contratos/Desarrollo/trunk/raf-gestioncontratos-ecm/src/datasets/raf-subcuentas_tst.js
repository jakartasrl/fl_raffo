/**
 * Codigo: raf-subcuentas
 * Descripcion: Consulta de SubCuentas al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 
	newDataset.addColumn("activo");	
	
	for (var i=1; i<6; i++) {
		newDataset.addRow(new Array(i,"SubCuenta " + i, i % 2 == 1)); 	
	}
	
	return newDataset;
	
}