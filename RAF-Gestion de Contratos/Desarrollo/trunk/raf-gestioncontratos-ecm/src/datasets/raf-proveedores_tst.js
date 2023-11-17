/**
 * Codigo: raf-proveedores
 * Descripcion: Consulta de Proveedores al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigoProveedor"); 
	newDataset.addColumn("razonSocialProveedor"); 
	newDataset.addColumn("estadoProveedor");	
	newDataset.addColumn("codigoFormaPago");	
	newDataset.addColumn("descripcionFormaPago");	
	
	for (var i=1; i<6; i++) {
		var numFP = ((i-1)%3)+1;
		newDataset.addRow(new Array(i,"Razon Social " + i, ((i%2)==1)?"activo":"no activo", "FP" + numFP, "Forma de Pago" + numFP)); 	
	}
	
	return newDataset;
	
}